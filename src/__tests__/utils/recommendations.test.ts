import { getRecommendedNextQuiz } from "../../utils/recommendations";
import type { QuizCardConfig } from "../../data/quizzesConfig";
import type { QuizStat } from "../../hooks/useQuizProgress";
import { QUIZZES_CONFIG } from "../../data/quizzesConfig";

function makeStat(overrides: Partial<QuizStat> & { quizId: string }): QuizStat {
  return {
    quizId: overrides.quizId,
    attempts: [],
    bestScore: 0,
    bestPercent: 0,
    latestScore: 0,
    latestPercent: 0,
    latestAttemptAt: null,
    totalAttempts: 0,
    totalQuestions: 10,
    averagePercent: 0,
    status: "not-started",
    ...overrides,
  };
}

describe("getRecommendedNextQuiz", () => {
  test("returns null when there is no quiz practice history", () => {
    const stats = QUIZZES_CONFIG.reduce((acc, quiz) => {
      acc[quiz.id] = makeStat({ quizId: quiz.id, totalAttempts: 0 });
      return acc;
    }, {} as Record<string, QuizStat>);

    expect(getRecommendedNextQuiz(stats)).toBeNull();
  });

  test("recommends the weakest unmastered quiz with some recent history", () => {
    const stats = QUIZZES_CONFIG.reduce((acc, quiz) => {
      acc[quiz.id] = makeStat({ quizId: quiz.id, totalAttempts: 1, bestPercent: 100, status: "mastered" });
      return acc;
    }, {} as Record<string, QuizStat>);

    stats.arrays = makeStat({ quizId: "arrays", totalAttempts: 2, bestPercent: 45, latestAttemptAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), status: "in-progress" });
    stats.graphs = makeStat({ quizId: "graphs", totalAttempts: 3, bestPercent: 55, latestAttemptAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), status: "in-progress" });
    stats.sorting = makeStat({ quizId: "sorting", totalAttempts: 1, bestPercent: 80, latestAttemptAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), status: "passed" });

    const recommendation = getRecommendedNextQuiz(stats);

    expect(recommendation).not.toBeNull();
    expect(recommendation?.quiz.id).toBe("graphs");
    expect(recommendation?.stat.bestPercent).toBe(55);
  });

  test("skips quizzes already mastered and prefers newer weak topics", () => {
    const stats = QUIZZES_CONFIG.reduce((acc, quiz) => {
      acc[quiz.id] = makeStat({ quizId: quiz.id, totalAttempts: 1, bestPercent: 100, status: "mastered" });
      return acc;
    }, {} as Record<string, QuizStat>);

    stats.arrays = makeStat({ quizId: "arrays", totalAttempts: 1, bestPercent: 50, latestAttemptAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: "in-progress" });
    stats.graphs = makeStat({ quizId: "graphs", totalAttempts: 1, bestPercent: 40, latestAttemptAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), status: "in-progress" });

    const recommendation = getRecommendedNextQuiz(stats);

    expect(recommendation).not.toBeNull();
    expect(recommendation?.quiz.id).toBe("graphs");
  });
});
