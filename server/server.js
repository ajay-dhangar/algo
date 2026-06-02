const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const sequelize = require("./db");
const QuizAttempt = require("./models/QuizAttempt");
const quizAnswers = require("./quizAnswers");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend cross-origin requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Rate Limiting to prevent score-spamming abuse
const scoreSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 score submissions per window
  message: {
    error: "Too many quiz attempts submitted from this IP. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Endpoint: POST /api/quiz-attempts
 * Saves a new quiz attempt. Recalculates and validates the score server-side.
 */
app.post("/api/quiz-attempts", scoreSubmitLimiter, async (req, res) => {
  try {
    const { userId, quizId, userAnswers: submittedAnswers, timeSpent } = req.body;

    // Validate request payload
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Missing or invalid userId." });
    }
    if (!quizId || typeof quizId !== "string") {
      return res.status(400).json({ error: "Missing or invalid quizId." });
    }
    if (!Array.isArray(submittedAnswers)) {
      return res.status(400).json({ error: "userAnswers must be a JSON array of string answers." });
    }
    if (typeof timeSpent !== "number" || timeSpent < 0) {
      return res.status(400).json({ error: "timeSpent must be a positive integer in seconds." });
    }

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
      // Compare answers directly — don't skip valid falsy answers like 0 or ""\n      if (userAnswer !== undefined && userAnswer === correctAnswer) {
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
app.post("/api/execute-code", async (req, res) => {
  const { language, code } = req.body;

  // Validate request
  if (!language || !code) {
    return res.status(400).json({ success: false, error: "Missing language or code parameter." });
  }

  const validLanguages = ["python", "cpp", "java", "rust", "go"];
  if (!validLanguages.includes(language)) {
    return res.status(400).json({ success: false, error: "Unsupported language. Supported: python, cpp, java, rust, go" });
  }

  try {
    const tempDir = os.tmpdir();
    let filename, fileExtension, command;

    // Generate unique filename to avoid conflicts
    const uniqueId = Date.now() + Math.random().toString(36).substr(2, 9);

    switch (language) {
      case "python":
        fileExtension = ".py";
        filename = path.join(tempDir, `script_${uniqueId}${fileExtension}`);
        command = `python "${filename}"`;
        break;

      case "cpp":
        fileExtension = ".cpp";
        const sourceFile = path.join(tempDir, `script_${uniqueId}${fileExtension}`);
        const executableFile = path.join(tempDir, `script_${uniqueId}${process.platform === "win32" ? ".exe" : ""}`);
        filename = sourceFile;
        // Compile and run
        command = `g++ "${sourceFile}" -o "${executableFile}" && "${executableFile}"`;
        break;

      case "java":
        fileExtension = ".java";
        // Extract class name from code (first public class)
        const classNameMatch = code.match(/public\s+class\s+(\w+)/);
        const className = classNameMatch ? classNameMatch[1] : "Main";
        filename = path.join(tempDir, `${className}${fileExtension}`);
        command = `cd "${tempDir}" && javac "${filename}" && java "${className}"`;
        break;

      case "rust":
        fileExtension = ".rs";
        const sourceFile2 = path.join(tempDir, `script_${uniqueId}${fileExtension}`);
        const executableFile2 = path.join(tempDir, `script_${uniqueId}${process.platform === "win32" ? ".exe" : ""}`);
        filename = sourceFile2;
        // Compile and run
        command = `rustc "${sourceFile2}" -o "${executableFile2}" && "${executableFile2}"`;
        break;

      case "go":
        fileExtension = ".go";
        const goSourceFile = path.join(tempDir, `script_${uniqueId}${fileExtension}`);
        filename = goSourceFile;
        // Compile and run
        command = `go run "${goSourceFile}"`;
        break;

      default:
        return res.status(400).json({ success: false, error: "Unsupported language" });
    }

    // Write code to file
    fs.writeFileSync(filename, code);

    // Execute code with timeout
    exec(command, { timeout: 10000, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      // Clean up temp files
      try {
        fs.unlinkSync(filename);
        if (language === "cpp") {
          const executableFile = filename.replace(fileExtension, process.platform === "win32" ? ".exe" : "");
          if (fs.existsSync(executableFile)) {
            fs.unlinkSync(executableFile);
          }
        }
        if (language === "rust") {
          const executableFile = filename.replace(fileExtension, process.platform === "win32" ? ".exe" : "");
          if (fs.existsSync(executableFile)) {
            fs.unlinkSync(executableFile);
          }
        }
        if (language === "java") {
          const classNameMatch = code.match(/public\s+class\s+(\w+)/);
          const className = classNameMatch ? classNameMatch[1] : "Main";
          const classFile = path.join(os.tmpdir(), `${className}.class`);
          if (fs.existsSync(classFile)) {
            fs.unlinkSync(classFile);
          }
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
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Quiz Persistence Backend is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Unable to connect to the SQLite database:", err);
});
