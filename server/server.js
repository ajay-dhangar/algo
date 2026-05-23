const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
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
      if (userAnswer && userAnswer === correctAnswer) {
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
 * Endpoint: GET /api/leaderboard
 * Computes dynamic leaderboard based on the highest score per user for each quiz.
 * Total points is the sum of highest scores across all quizzes (each correct answer = 100 points, or raw score).
 * Let's award 100 points per correct answer! (e.g. 5 correct answers = 500 points).
 */
app.get("/api/leaderboard", async (req, res) => {
  try {
    const attempts = await QuizAttempt.findAll();

    // Map to find the max score of each user for each quiz, and count attempts
    // Structure: { username: { quizId: maxScore } }
    const userMaxScores = {};
    const userAttemptsCount = {};

    attempts.forEach((attempt) => {
      const username = attempt.userId;
      const qId = attempt.quizId;
      const score = attempt.score;

      // Increment attempt count for user
      userAttemptsCount[username] = (userAttemptsCount[username] || 0) + 1;

      if (!userMaxScores[username]) {
        userMaxScores[username] = {};
      }

      if (userMaxScores[username][qId] === undefined || score > userMaxScores[username][qId]) {
        userMaxScores[username][qId] = score;
      }
    });

    // Compute total points for each user
    // Total Points = Sum of (maxScore * 100) across all quizzes taken
    const leaderboardData = Object.keys(userMaxScores).map((username) => {
      let totalPoints = 0;
      const quizzes = userMaxScores[username];
      Object.keys(quizzes).forEach((qId) => {
        totalPoints += quizzes[qId] * 100; // 100 points per correct answer
      });

      return {
        username: username,
        totalScore: totalPoints,
        attemptsCount: userAttemptsCount[username] || 0
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
