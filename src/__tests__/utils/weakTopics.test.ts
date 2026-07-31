import { rankWeakTopics, MIN_WEAK_TOPICS, MAX_WEAK_TOPICS } from "../../utils/weakTopics";
import type { QuizCardConfig } from "../../data/quizzesConfig";
import type { QuizStat } from "../../hooks/useQuizProgress";

const mockQuizzes: QuizCardConfig[] = [
  { id: "arrays", title: "Quiz on Arrays", category: "Linear", description: "", path: "/quizzes/arrays", questionCount: 10 },
  { id: "graphs", title: "Quiz on Graphs", category: "Non-Linear", description: "", path: "/quizzes/graph", questionCount: 12 },
  { id: "sorting", title: "Quiz on Sorting Algorithms", category: "Linear", description: "", path: "/quizzes/sorting", questionCount: 12 },
  { id: "recursion", title: "Quiz on Recursion Fundamentals", category: "Linear", description: "", path: "/quizzes/recursion", questionCount: 12 },
  { id: "bst", title: "Quiz on Binary Search Trees", category: "Non-Linear", description: "", path: "/quizzes/binary-search-tree", questionCount: 10 },
  { id: "isam", title: "Quiz on ISAM", category: "Disk Storage", description: "", path: "/quizzes/isam", questionCount: 12 },
];

function makeStat(overrides: Partial<QuizStat> & { quizId: string }): QuizStat {
  return {
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

describe("rankWeakTopics", () => {
  test("ranks attempted topics by ascending best score", () => {
    const stats: Record<string, QuizStat> = {
      arrays: makeStat({ quizId: "arrays", totalAttempts: 2, bestPercent: 90, status: "mastered" }),
      graphs: makeStat({ quizId: "graphs", totalAttempts: 1, bestPercent: 30, status: "in-progress" }),
      sorting: makeStat({ quizId: "sorting", totalAttempts: 3, bestPercent: 55, status: "in-progress" }),
      recursion: makeStat({ quizId: "recursion", totalAttempts: 1, bestPercent: 70, status: "passed" }),
      bst: makeStat({ quizId: "bst", totalAttempts: 0 }),
      isam: makeStat({ quizId: "isam", totalAttempts: 0 }),
    };

    const result = rankWeakTopics(stats, mockQuizzes);

    // Weakest attempted topic first.
    expect(result[0].quiz.id).toBe("graphs");
    expect(result[1].quiz.id).toBe("sorting");
    expect(result[2].quiz.id).toBe("recursion");
    expect(result[3].quiz.id).toBe("arrays");
    // All 4 attempted topics are returned since that's >= MIN_WEAK_TOPICS.
    expect(result).toHaveLength(4);
  });

  test("pads with never-attempted topics when fewer than MIN_WEAK_TOPICS were attempted", () => {
    const stats: Record<string, QuizStat> = {
      arrays: makeStat({ quizId: "arrays", totalAttempts: 1, bestPercent: 40 }),
      graphs: makeStat({ quizId: "graphs", totalAttempts: 0 }),
      sorting: makeStat({ quizId: "sorting", totalAttempts: 0 }),
      recursion: makeStat({ quizId: "recursion", totalAttempts: 0 }),
      bst: makeStat({ quizId: "bst", totalAttempts: 0 }),
      isam: makeStat({ quizId: "isam", totalAttempts: 0 }),
    };

    const result = rankWeakTopics(stats, mockQuizzes);

    expect(result.length).toBeGreaterThanOrEqual(MIN_WEAK_TOPICS);
    expect(result[0].quiz.id).toBe("arrays");
    // The rest should be never-attempted topics (totalAttempts === 0).
    result.slice(1).forEach((entry) => expect(entry.stat.totalAttempts).toBe(0));
  });

  test("never returns more than MAX_WEAK_TOPICS entries", () => {
    const stats: Record<string, QuizStat> = Object.fromEntries(
      mockQuizzes.map((q, i) => [q.id, makeStat({ quizId: q.id, totalAttempts: 1, bestPercent: i * 10 })]),
    );

    const result = rankWeakTopics(stats, mockQuizzes);

    expect(result.length).toBeLessThanOrEqual(MAX_WEAK_TOPICS);
  });

  test("skips quizzes with no stat entry at all", () => {
    const stats: Record<string, QuizStat> = {
      arrays: makeStat({ quizId: "arrays", totalAttempts: 1, bestPercent: 40 }),
    };

    const result = rankWeakTopics(stats, mockQuizzes);

    // Only "arrays" has a stat; everything else is missing from `stats`
    // entirely (simulating a partial/loading state) and should be skipped
    // rather than crashing.
    expect(result.every((entry) => entry.quiz.id === "arrays")).toBe(true);
  });

  test("returns an empty array when there is no data at all", () => {
    expect(rankWeakTopics({}, mockQuizzes)).toEqual([]);
  });
});
