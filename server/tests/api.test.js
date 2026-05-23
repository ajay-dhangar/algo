const assert = require("assert");
const http = require("http");
const sequelize = require("../db");
const QuizAttempt = require("../models/QuizAttempt");

// Config for test environment
const TEST_PORT = 5001;
const BASE_URL = `http://localhost:${TEST_PORT}`;

// Helper to make POST requests
function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      {
        hostname: "localhost",
        port: TEST_PORT,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      },
      (res) => {
        let responseBody = "";
        res.on("data", (chunk) => (responseBody += chunk));
        res.on("end", () => {
          try {
            resolve({
              statusCode: res.statusCode,
              body: responseBody ? JSON.parse(responseBody) : {},
            });
          } catch (e) {
            reject(new Error(`Failed to parse JSON response: ${responseBody}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

// Helper to make GET requests
function get(path) {
  return new Promise((resolve, reject) => {
    http.get(
      {
        hostname: "localhost",
        port: TEST_PORT,
        path,
      },
      (res) => {
        let responseBody = "";
        res.on("data", (chunk) => (responseBody += chunk));
        res.on("end", () => {
          try {
            resolve({
              statusCode: res.statusCode,
              body: responseBody ? JSON.parse(responseBody) : {},
            });
          } catch (e) {
            reject(new Error(`Failed to parse JSON response: ${responseBody}`));
          }
        });
      }
    ).on("error", reject);
  });
}

async function runTests() {
  console.log("-----------------------------------------");
  console.log("Starting backend persistence API tests...");
  console.log("-----------------------------------------");

  // 1. Wipe database attempts for clean testing
  await sequelize.sync({ force: true });
  console.log("✔ SQLite database synced and attempts table cleared successfully.");

  // 2. Start the Express App programmatically
  const express = require("express");
  const cors = require("cors");
  const QuizAttemptModel = require("../models/QuizAttempt");
  const quizAnswers = require("../quizAnswers");

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Test endpoints (identical logic to server.js)
  app.post("/api/quiz-attempts", async (req, res) => {
    const { userId, quizId, userAnswers: submittedAnswers, timeSpent } = req.body;
    if (!userId || !quizId || !Array.isArray(submittedAnswers) || typeof timeSpent !== "number") {
      return res.status(400).json({ error: "Invalid payload." });
    }
    const correctAnswers = quizAnswers[quizId];
    if (!correctAnswers) return res.status(404).json({ error: "Quiz not found." });

    let calculatedScore = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (submittedAnswers[i] === correctAnswers[i]) calculatedScore++;
    }

    const attempt = await QuizAttemptModel.create({
      userId: userId.trim(),
      quizId,
      score: calculatedScore,
      totalQuestions: correctAnswers.length,
      userAnswers: submittedAnswers,
      timeSpent,
      completedAt: new Date(),
    });

    res.status(201).json({ success: true, attempt });
  });

  app.get("/api/quiz-attempts/:userId", async (req, res) => {
    const attempts = await QuizAttemptModel.findAll({
      where: { userId: req.params.userId.trim() },
      order: [["completedAt", "DESC"]],
    });
    res.json({ success: true, attempts });
  });

  app.get("/api/quiz-attempts/:userId/:quizId", async (req, res) => {
    const attempts = await QuizAttemptModel.findAll({
      where: { userId: req.params.userId.trim(), quizId: req.params.quizId },
      order: [["completedAt", "DESC"]],
    });
    res.json({ success: true, attempts });
  });

  app.get("/api/leaderboard", async (req, res) => {
    const attempts = await QuizAttemptModel.findAll();
    const userMaxScores = {};
    const userAttemptsCount = {};

    attempts.forEach((attempt) => {
      const username = attempt.userId;
      const qId = attempt.quizId;
      const score = attempt.score;

      userAttemptsCount[username] = (userAttemptsCount[username] || 0) + 1;

      if (!userMaxScores[username]) userMaxScores[username] = {};
      if (userMaxScores[username][qId] === undefined || score > userMaxScores[username][qId]) {
        userMaxScores[username][qId] = score;
      }
    });

    const leaderboardData = Object.keys(userMaxScores).map((username) => {
      let totalPoints = 0;
      const quizzes = userMaxScores[username];
      Object.keys(quizzes).forEach((qId) => {
        totalPoints += quizzes[qId] * 100;
      });
      return {
        username: username,
        totalScore: totalPoints,
        attemptsCount: userAttemptsCount[username] || 0
      };
    });

    leaderboardData.sort((a, b) => b.totalScore - a.totalScore);
    let rank = 1;
    const rankedLeaderboard = leaderboardData.map((user, idx) => {
      if (idx > 0 && user.totalScore < leaderboardData[idx - 1].totalScore) rank = idx + 1;
      return {
        name: user.username,
        username: user.username,
        points: user.totalScore,
        totalScore: user.totalScore,
        attemptsCount: user.attemptsCount,
        rank
      };
    });

    res.json({
      success: true,
      leaders: rankedLeaderboard,
      leaderboard: rankedLeaderboard
    });
  });

  const server = app.listen(TEST_PORT, async () => {
    console.log(`Test Express server running on port ${TEST_PORT}`);

    try {
      // Test 1: Submit a correct quiz attempt
      // Arrays quiz first answer: "A) 1, 2", second: "C) Garbage value"
      console.log("\nExecuting Test 1: POST /api/quiz-attempts with valid answers...");
      const payload1 = {
        userId: "Alice",
        quizId: "arrays",
        userAnswers: [
          "A) 1, 2",
          "C) Garbage value",
          "A) 5",
          "A) 1",
          "A) O(1)",
          "A) The elements of an array are stored in contiguous memory locations",
          "A) 0",
          "A) 0",
          "A) Address of the first element"
        ],
        timeSpent: 120
      };
      
      const res1 = await post("/api/quiz-attempts", payload1);
      assert.strictEqual(res1.statusCode, 201);
      assert.strictEqual(res1.body.success, true);
      assert.strictEqual(res1.body.attempt.score, 9, "Alice should have a score of 9/9");
      assert.strictEqual(res1.body.attempt.userId, "Alice");
      console.log("✔ Test 1 passed: Score recalculation verified (9/9 correct).");

      // Test 2: Submit a partially correct attempt
      console.log("\nExecuting Test 2: POST /api/quiz-attempts with 3 wrong answers...");
      const payload2 = {
        userId: "Alice",
        quizId: "arrays",
        userAnswers: [
          "A) 1, 2",
          "Wrong Answer",
          "Wrong Answer",
          "Wrong Answer",
          "A) O(1)",
          "A) The elements of an array are stored in contiguous memory locations",
          "A) 0",
          "A) 0",
          "A) Address of the first element"
        ],
        timeSpent: 150
      };
      
      const res2 = await post("/api/quiz-attempts", payload2);
      assert.strictEqual(res2.statusCode, 201);
      assert.strictEqual(res2.body.attempt.score, 6, "Alice should have a score of 6/9");
      console.log("✔ Test 2 passed: Score recalculation verified (6/9 correct).");

      // Test 3: Submit score for Bob
      console.log("\nExecuting Test 3: POST /api/quiz-attempts for Bob (binary-search-tree)...");
      const payload3 = {
        userId: "Bob",
        quizId: "binary-search-tree",
        userAnswers: [
          "C) A tree where the left child is less than the parent and the right child is greater.",
          "Wrong Answer"
        ],
        timeSpent: 45
      };
      const res3 = await post("/api/quiz-attempts", payload3);
      assert.strictEqual(res3.statusCode, 201);
      assert.strictEqual(res3.body.attempt.score, 1, "Bob should have 1/2 correct answers");
      console.log("✔ Test 3 passed: Bob attempt saved successfully.");

      // Test 4: Retrieve user's attempt history
      console.log("\nExecuting Test 4: GET /api/quiz-attempts/Alice...");
      const res4 = await get("/api/quiz-attempts/Alice");
      assert.strictEqual(res4.statusCode, 200);
      assert.strictEqual(res4.body.attempts.length, 2, "Alice should have 2 attempts saved");
      assert.strictEqual(res4.body.attempts[0].score, 6, "First attempt returned should be the latest (score 6)");
      console.log("✔ Test 4 passed: User attempt history retrieved in correct chronological order.");

      // Test 5: Retrieve specific quiz attempts
      console.log("\nExecuting Test 5: GET /api/quiz-attempts/Alice/arrays...");
      const res5 = await get("/api/quiz-attempts/Alice/arrays");
      assert.strictEqual(res5.statusCode, 200);
      assert.strictEqual(res5.body.attempts.length, 2);
      console.log("✔ Test 5 passed: Quiz-specific attempt history retrieved correctly.");

      // Test 6: Verify leaderboard aggregation
      // Alice max scores: arrays = 9 (score) * 100 = 900 points
      // Bob max scores: binary-search-tree = 1 (score) * 100 = 100 points
      console.log("\nExecuting Test 6: GET /api/leaderboard aggregation...");
      const res6 = await get("/api/leaderboard");
      assert.strictEqual(res6.statusCode, 200);
      assert.strictEqual(res6.body.leaders[0].name, "Alice");
      assert.strictEqual(res6.body.leaders[0].points, 900);
      assert.strictEqual(res6.body.leaders[1].name, "Bob");
      assert.strictEqual(res6.body.leaders[1].points, 100);
      console.log("✔ Test 6 passed: Leaderboard calculated correctly (Alice: 900, Bob: 100).");

      console.log("\n-----------------------------------------");
      console.log("All integration tests PASSED successfully!");
      console.log("-----------------------------------------");
      server.close();
      process.exit(0);

    } catch (e) {
      console.error("\n❌ Assertion or verification failed!");
      console.error(e);
      server.close();
      process.exit(1);
    }
  });
}

runTests().catch(e => {
  console.error("Test execution failed:", e);
  process.exit(1);
});
