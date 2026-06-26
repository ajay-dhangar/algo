const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const sequelize = require("./db");
const QuizAttempt = require("./models/QuizAttempt");
const quizAnswers = require("./quizAnswers");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Helmet for security headers
app.use(helmet());

// Enable CORS for frontend cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Global Rate Limiter: 100 requests per minute
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per window
  message: { error: "Too many requests from this IP. Please try again after 1 minute." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// Validation Middleware Helper
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Rate Limiting to prevent score-spamming abuse
const scoreSubmitLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 score submissions per window
  message: {
    error: "Too many quiz attempts submitted from this IP. Please try again after 1 minute."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const executeCodeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 code executions per window
  message: {
    error: "Too many code execution requests from this IP. Please try again after 1 minute."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Endpoint: POST /api/quiz-attempts
 * Saves a new quiz attempt. Recalculates and validates the score server-side.
 */
app.post("/api/quiz-attempts", 
  scoreSubmitLimiter,
  [
    body("userId").isString().trim().notEmpty().withMessage("Missing or invalid userId."),
    body("quizId").isString().trim().notEmpty().withMessage("Missing or invalid quizId."),
    body("userAnswers").isArray().withMessage("userAnswers must be a JSON array of string answers."),
    body("timeSpent").isInt({ min: 0 }).withMessage("timeSpent must be a positive integer in seconds.")
  ],
  validateRequest,
  async (req, res) => {
  try {
    const { userId, quizId, userAnswers: submittedAnswers, timeSpent } = req.body;

    // Get correct answers for this specific quiz
    const correctAnswers = quizAnswers[quizId];
    if (!correctAnswers) {
      return res.status(404).json({ error: `Quiz '${quizId}' not found in answer database.` });
    }

    // Server-side score recalculation (don't trust client score)
    let calculatedScore = 0;
    const totalQuestions = correctAnswers.length;

    // Compare each answer. Ensure we handle cases where client sent fewer/more answers gracefully
    for (let i = 0; i < totalQuestions; i++) {
      const userAnswer = submittedAnswers[i];
      const correctAnswer = correctAnswers[i];
      // Compare answers directly — don't skip valid falsy answers like 0 or ""
      if (userAnswer !== undefined && userAnswer === correctAnswer) {
        calculatedScore++;
      }
    }

    // Create the attempt record
    const attempt = await QuizAttempt.create({
      userId: userId.trim(),
      quizId,
      score: calculatedScore,
      totalQuestions,
      userAnswers: submittedAnswers,
      timeSpent,
      completedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Quiz attempt saved successfully.",
      attempt: {
        id: attempt.id,
        userId: attempt.userId,
        quizId: attempt.quizId,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        userAnswers: attempt.userAnswers,
        timeSpent: attempt.timeSpent,
        completedAt: attempt.completedAt,
        createdAt: attempt.createdAt,
      }
    });

  } catch (error) {
    console.error("Error saving quiz attempt:", error);
    return res.status(500).json({ error: "An internal server error occurred while saving attempt." });
  }
});

/**
 * Endpoint: GET /api/quiz-attempts/:userId
 * Retrieves the quiz history for a specific user.
 */
app.get("/api/quiz-attempts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter." });
    }

    const attempts = await QuizAttempt.findAll({
      where: { userId: userId.trim() },
      order: [["completedAt", "DESC"]],
    });

    return res.json({
      success: true,
      count: attempts.length,
      attempts
    });
  } catch (error) {
    console.error("Error retrieving user quiz history:", error);
    return res.status(500).json({ error: "An internal server error occurred while fetching history." });
  }
});

/**
 * Endpoint: GET /api/quiz-attempts/:userId/:quizId
 * Retrieves attempts for a specific user and specific quiz.
 */
app.get("/api/quiz-attempts/:userId/:quizId", async (req, res) => {
  try {
    const { userId, quizId } = req.params;

    if (!userId || !quizId) {
      return res.status(400).json({ error: "Missing userId or quizId parameters." });
    }

    const attempts = await QuizAttempt.findAll({
      where: {
        userId: userId.trim(),
        quizId: quizId
      },
      order: [["completedAt", "DESC"]],
    });

    return res.json({
      success: true,
      count: attempts.length,
      attempts
    });
  } catch (error) {
    console.error("Error retrieving quiz-specific attempts:", error);
    return res.status(500).json({ error: "An internal server error occurred while fetching attempts." });
  }
});

/**
 * Endpoint: POST /api/execute-code
 * Executes code in different languages (Python, C++, Java)
 * JavaScript is handled client-side
 */
app.post("/api/execute-code",
  executeCodeLimiter,
  [
    body("language").isString().isIn(["python", "cpp", "java", "rust", "go"]).withMessage("Unsupported language. Supported: python, cpp, java, rust, go"),
    body("code").isString().notEmpty().withMessage("Missing or invalid code parameter.")
  ],
  validateRequest,
  async (req, res) => {
  const { language, code } = req.body;

  try {
    const tempDir = os.tmpdir();
    let filename, fileExtension, command;

    // Generate unique filename to avoid conflicts
    const uniqueId = Date.now() + Math.random().toString(36).substr(2, 9);

    switch (language) {
      case "python":
        fileExtension = ".py";
        filename = path.join(tempDir, `script_${uniqueId}${fileExtension}`);
        command = `docker run --rm -v "${tempDir}:/app" -w /app python:3.9-alpine python "/app/${path.basename(filename)}"`;
        break;

      case "cpp":
        fileExtension = ".cpp";
        const sourceFile = path.join(tempDir, `script_${uniqueId}${fileExtension}`);
        filename = sourceFile;
        // Compile and run inside GCC container
        command = `docker run --rm -v "${tempDir}:/app" -w /app gcc:latest sh -c "g++ /app/${path.basename(filename)} -o /app/out && /app/out"`;
        break;

      case "java":
        fileExtension = ".java";
        // Extract class name from code (first public class)
        const classNameMatch = code.match(/public\s+class\s+(\w+)/);
        const className = classNameMatch ? classNameMatch[1] : "Main";
        filename = path.join(tempDir, `${className}${fileExtension}`);
        command = `docker run --rm -v "${tempDir}:/app" -w /app openjdk:17-alpine sh -c "javac /app/${path.basename(filename)} && java ${className}"`;
        break;

      case "rust":
        fileExtension = ".rs";
        const sourceFile2 = path.join(tempDir, `script_${uniqueId}${fileExtension}`);
        filename = sourceFile2;
        // Compile and run inside Rust container
        command = `docker run --rm -v "${tempDir}:/app" -w /app rust:1.70-alpine sh -c "rustc /app/${path.basename(filename)} -o /app/out && /app/out"`;
        break;

      case "go":
        fileExtension = ".go";
        const goSourceFile = path.join(tempDir, `script_${uniqueId}${fileExtension}`);
        filename = goSourceFile;
        // Run inside Go container
        command = `docker run --rm -v "${tempDir}:/app" -w /app golang:1.20-alpine go run "/app/${path.basename(filename)}"`;
        break;

      default:
        return res.status(400).json({ success: false, error: "Unsupported language" });
    }

    // Write code to file asynchronously (Promises)
    await fs.promises.writeFile(filename, code);

    // Execute code with timeout
    exec(command, { timeout: 10000, maxBuffer: 10 * 1024 * 1024 }, async (error, stdout, stderr) => {
      // Clean up temp files asynchronously (Promises)
      try {
        await fs.promises.unlink(filename);
        // Docker might not create executable files on host since we compiled in the container `/app/out`
        // But for java, we might need to check if the .class file was created in tempDir due to javac behavior
        // Actually, docker wrote to `/app`, which maps to tempDir, so let's clean up generic outputs if they exist
        const classFile = path.join(tempDir, `${path.basename(filename, ".java")}.class`);
        if (language === "java" && fs.existsSync(classFile)) {
          await fs.promises.unlink(classFile);
        }
        const outBin = path.join(tempDir, "out");
        if (["cpp", "rust"].includes(language) && fs.existsSync(outBin)) {
          await fs.promises.unlink(outBin);
        }
      } catch (cleanupError) {
        console.warn("Cleanup warning:", cleanupError.message);
      }

      if (error) {
        // Check for timeout
        if (error.killed) {
          return res.json({
            success: false,
            error: "Code execution timed out after 10 seconds",
          });
        }
        // Return compilation or runtime error
        const errorMessage = stderr || error.message;
        return res.json({
          success: false,
          error: errorMessage,
        });
      }

      // Return successful output
      res.json({
        success: true,
        output: stdout,
      });
    });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during code execution",
    });
  }
});

/**
 * Endpoint: GET /api/leaderboard
 * Computes dynamic leaderboard based on the highest score per user for each quiz.
 * Total points is the sum of highest scores across all quizzes (each correct answer = 100 points, or raw score).
 * Let's award 100 points per correct answer! (e.g. 5 correct answers = 500 points).
 */
app.get("/api/leaderboard", async (req, res) => {
  try {
    // 1. Get the max score per quiz for each user
    const maxScoresPerQuiz = await QuizAttempt.findAll({
      attributes: [
        'userId',
        'quizId',
        [sequelize.fn('MAX', sequelize.col('score')), 'maxScore']
      ],
      group: ['userId', 'quizId'],
      raw: true
    });

    // 2. Get the total attempts count for each user
    const attemptsCount = await QuizAttempt.findAll({
      attributes: [
        'userId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalAttempts']
      ],
      group: ['userId'],
      raw: true
    });

    // Create a map of userId -> attempts count
    const userAttemptsMap = {};
    attemptsCount.forEach(row => {
      userAttemptsMap[row.userId] = parseInt(row.totalAttempts, 10);
    });

    // Compute total points per user
    const userPointsMap = {};
    maxScoresPerQuiz.forEach(row => {
      const username = row.userId;
      const score = parseInt(row.maxScore, 10);
      
      if (!userPointsMap[username]) {
        userPointsMap[username] = 0;
      }
      userPointsMap[username] += score * 100; // 100 points per correct answer
    });

    // Format the leaderboard data
    const leaderboardData = Object.keys(userPointsMap).map((username) => {
      return {
        username: username,
        totalScore: userPointsMap[username],
        attemptsCount: userAttemptsMap[username] || 0
      };
    });

    // Sort descending by total score
    leaderboardData.sort((a, b) => b.totalScore - a.totalScore);

    // Assign ranks (with tie-handling)
    let currentRank = 1;
    const rankedLeaderboard = leaderboardData.map((user, index) => {
      if (index > 0 && user.totalScore < leaderboardData[index - 1].totalScore) {
        currentRank = index + 1;
      }
      return {
        name: user.username,          // compatible with test
        username: user.username,      // compatible with frontend
        points: user.totalScore,      // compatible with test
        totalScore: user.totalScore,  // compatible with frontend
        attemptsCount: user.attemptsCount, // compatible with frontend
        rank: currentRank,
      };
    });

    return res.json({
      success: true,
      count: rankedLeaderboard.length,
      leaders: rankedLeaderboard,     // compatible with test
      leaderboard: rankedLeaderboard // compatible with frontend
    });
  } catch (error) {
    console.error("Error generating leaderboard:", error);
    return res.status(500).json({ error: "An internal server error occurred while generating leaderboard." });
  }
});

// Database Sync and Server Startup
if (require.main === module) {
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Quiz Persistence Backend is running on port ${PORT}`);
    });
  }).catch((err) => {
    console.error("Unable to connect to the SQLite database:", err);
  });
}

module.exports = app;
