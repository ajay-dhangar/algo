import {
  calculateNextReview,
  getSpacedRepetitionQueue,
  saveSpacedRepetitionQueue,
  recordQuestionReview,
  recordTopicReview,
  getDueItems,
  getQuestionsForReviewSession,
  convertRatingToQuality,
  convertQualityToDifficulty,
} from "../../utils/spacedRepetition";
import type { QuizStat } from "../../hooks/useQuizProgress";

describe("spacedRepetition", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("convertRatingToQuality & convertQualityToDifficulty", () => {
    test("converts recall difficulty labels to numeric quality score", () => {
      expect(convertRatingToQuality("Again")).toBe(1);
      expect(convertRatingToQuality("Hard")).toBe(3);
      expect(convertRatingToQuality("Good")).toBe(4);
      expect(convertRatingToQuality("Easy")).toBe(5);
      expect(convertRatingToQuality(true)).toBe(4);
      expect(convertRatingToQuality(false)).toBe(1);
    });

    test("maps quality score to difficulty string", () => {
      expect(convertQualityToDifficulty(1)).toBe("Again");
      expect(convertQualityToDifficulty(3)).toBe("Hard");
      expect(convertQualityToDifficulty(4)).toBe("Good");
      expect(convertQualityToDifficulty(5)).toBe("Easy");
    });
  });

  describe("calculateNextReview", () => {
    test("calculates interval for first correct attempt", () => {
      const now = new Date("2026-08-01T12:00:00Z");
      const result = calculateNextReview({}, true, now);
      expect(result.repetitions).toBe(1);
      expect(result.intervalDays).toBe(1);
      expect(result.easeFactor).toBe(2.5);
      expect(result.nextReviewDate).toBe(new Date("2026-08-02T12:00:00Z").toISOString());
    });

    test("calculates interval for second correct attempt", () => {
      const now = new Date("2026-08-01T12:00:00Z");
      const result = calculateNextReview({ repetitions: 1, intervalDays: 1, easeFactor: 2.5 }, true, now);
      expect(result.repetitions).toBe(2);
      expect(result.intervalDays).toBe(3);
      expect(result.nextReviewDate).toBe(new Date("2026-08-04T12:00:00Z").toISOString());
    });

    test("calculates interval using self-reported recall ratings", () => {
      const now = new Date("2026-08-01T12:00:00Z");
      
      // "Easy" rating (quality = 5) increases ease factor
      const easyResult = calculateNextReview({ repetitions: 2, intervalDays: 3, easeFactor: 2.5 }, "Easy", now);
      expect(easyResult.repetitions).toBe(3);
      expect(easyResult.easeFactor).toBeGreaterThan(2.5);
      expect(easyResult.difficultyRating).toBe("Easy");

      // "Again" rating (quality = 1) resets repetitions to 0
      const againResult = calculateNextReview({ repetitions: 3, intervalDays: 8, easeFactor: 2.5 }, "Again", now);
      expect(againResult.repetitions).toBe(0);
      expect(againResult.intervalDays).toBe(1);
      expect(againResult.difficultyRating).toBe("Again");
    });

    test("ease factor does not drop below minimum bound of 1.3", () => {
      const now = new Date("2026-08-01T12:00:00Z");
      const result = calculateNextReview({ repetitions: 0, intervalDays: 1, easeFactor: 1.3 }, "Again", now);
      expect(result.easeFactor).toBe(1.3);
    });
  });

  describe("queue storage and recording", () => {
    test("reads and writes queue to localStorage and unified store", () => {
      const mockQueue = {
        arrays_1: {
          uniqueId: "arrays_1",
          topicId: "arrays",
          questionId: 1,
          nextReviewDate: new Date().toISOString(),
          intervalDays: 1,
          interval: 1,
          easeFactor: 2.5,
          repetitions: 0,
          missedCount: 1,
        },
      };
      saveSpacedRepetitionQueue(mockQueue, "user123");
      const loaded = getSpacedRepetitionQueue("user123");
      expect(loaded["arrays_1"]).toBeDefined();
      expect(loaded["arrays_1"].uniqueId).toBe("arrays_1");
    });

    test("records question review with recall rating", () => {
      const item = recordQuestionReview("arrays_1", "arrays", 1, "Good", "user123");
      expect(item.uniqueId).toBe("arrays_1");
      expect(item.repetitions).toBe(1);
      expect(item.difficultyRating).toBe("Good");

      const queue = getSpacedRepetitionQueue("user123");
      expect(queue["arrays_1"]).toBeDefined();
    });

    test("records topic review correctly", () => {
      const item = recordTopicReview("graphs", "Hard", "user123");
      expect(item.uniqueId).toBe("topic_graphs");
      expect(item.topicId).toBe("graphs");
      expect(item.difficultyRating).toBe("Hard");
    });

    test("filters due items correctly", () => {
      const past = new Date("2026-01-01T00:00:00Z").toISOString();
      const future = new Date("2026-12-31T00:00:00Z").toISOString();
      const queue = {
        arrays_1: {
          uniqueId: "arrays_1",
          topicId: "arrays",
          questionId: 1,
          nextReviewDate: past,
          intervalDays: 1,
          interval: 1,
          easeFactor: 2.5,
          repetitions: 0,
          missedCount: 1,
        },
        arrays_2: {
          uniqueId: "arrays_2",
          topicId: "arrays",
          questionId: 2,
          nextReviewDate: future,
          intervalDays: 5,
          interval: 5,
          easeFactor: 2.5,
          repetitions: 2,
          missedCount: 1,
        },
      };

      const due = getDueItems(queue, new Date("2026-08-01T00:00:00Z"));
      expect(due.length).toBe(1);
      expect(due[0].uniqueId).toBe("arrays_1");
    });
  });

  describe("getQuestionsForReviewSession", () => {
    test("returns questions from due items when present", () => {
      const past = new Date("2026-01-01T00:00:00Z").toISOString();
      saveSpacedRepetitionQueue(
        {
          arrays_1: {
            uniqueId: "arrays_1",
            topicId: "arrays",
            questionId: 1,
            nextReviewDate: past,
            intervalDays: 1,
            interval: 1,
            easeFactor: 2.5,
            repetitions: 0,
            missedCount: 1,
          },
        },
        "testUser"
      );

      const mockStats: Record<string, QuizStat> = {};
      const session = getQuestionsForReviewSession(mockStats, "testUser");
      expect(session.source).toBe("due");
      expect(session.questions.length).toBeGreaterThan(0);
      expect(session.questions[0].uniqueId).toBe("arrays_1");
    });

    test("falls back to weak topics questions when no items are due", () => {
      const mockStats: Record<string, QuizStat> = {
        arrays: {
          quizId: "arrays",
          attempts: [],
          bestScore: 2,
          bestPercent: 20,
          latestScore: 2,
          latestPercent: 20,
          latestAttemptAt: new Date().toISOString(),
          totalAttempts: 1,
          totalQuestions: 10,
          averagePercent: 20,
          status: "in-progress",
        },
      };

      const session = getQuestionsForReviewSession(mockStats, "testUser");
      expect(session.questions.length).toBeGreaterThan(0);
      expect(["due", "weak-topics", "all"]).toContain(session.source);
    });
  });
});
