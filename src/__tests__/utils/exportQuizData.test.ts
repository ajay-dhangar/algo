import {
  serializeQuizStatsToCsv,
  serializeQuizStatsToJson,
  downloadQuizData,
} from "../../utils/exportQuizData";
import type { QuizStat } from "../../hooks/useQuizProgress";

const mockStats: Record<string, QuizStat> = {
  arrays: {
    quizId: "arrays",
    bestScore: 8,
    bestPercent: 80,
    latestScore: 8,
    latestPercent: 80,
    latestAttemptAt: "2026-08-01T10:00:00.000Z",
    totalAttempts: 2,
    totalQuestions: 10,
    averagePercent: 75,
    status: "passed",
    attempts: [
      { score: 7, totalQuestions: 10, timeSpent: 45, completedAt: "2026-07-30T09:00:00.000Z" },
      { score: 8, totalQuestions: 10, timeSpent: 30, completedAt: "2026-08-01T10:00:00.000Z" },
    ],
  },
  graphs: {
    quizId: "graphs",
    bestScore: 3,
    bestPercent: 25,
    latestScore: 3,
    latestPercent: 25,
    latestAttemptAt: "2026-08-02T12:00:00.000Z",
    totalAttempts: 1,
    totalQuestions: 12,
    averagePercent: 25,
    status: "in-progress",
    attempts: [
      { score: 3, totalQuestions: 12, timeSpent: 120, completedAt: "2026-08-02T12:00:00.000Z" },
    ],
  },
};

describe("exportQuizData utility", () => {
  describe("serializeQuizStatsToCsv", () => {
    test("serializes quiz stats into a formatted CSV string with headers", () => {
      const csv = serializeQuizStatsToCsv(mockStats);

      const lines = csv.split("\n");
      expect(lines[0]).toBe(
        "Quiz ID,Best Score,Best Percent (%),Average Percent (%),Total Attempts,Total Questions,Status,Latest Attempt Date,Attempts History"
      );

      // Check arrays row
      expect(lines[1]).toContain("arrays,8,80,75,2,10,passed,2026-08-01T10:00:00.000Z");
      expect(lines[1]).toContain("Score: 7/10");
      expect(lines[1]).toContain("Score: 8/10");

      // Check graphs row
      expect(lines[2]).toContain("graphs,3,25,25,1,12,in-progress,2026-08-02T12:00:00.000Z");
    });
  });

  describe("serializeQuizStatsToJson", () => {
    test("serializes quiz stats into valid formatted JSON", () => {
      const json = serializeQuizStatsToJson(mockStats);
      const parsed = JSON.parse(json);

      expect(parsed).toEqual(mockStats);
    });
  });

  describe("downloadQuizData", () => {
    let originalCreateObjectURL: typeof URL.createObjectURL;
    let originalRevokeObjectURL: typeof URL.revokeObjectURL;

    beforeEach(() => {
      originalCreateObjectURL = URL.createObjectURL;
      originalRevokeObjectURL = URL.revokeObjectURL;
      URL.createObjectURL = jest.fn(() => "blob:mock-url");
      URL.revokeObjectURL = jest.fn();
    });

    afterEach(() => {
      URL.createObjectURL = originalCreateObjectURL;
      URL.revokeObjectURL = originalRevokeObjectURL;
      // Restore all spies (including createElement) so each test starts clean
      jest.restoreAllMocks();
    });

    test("creates Blob and triggers element click for CSV download", () => {
      const appendSpy = jest.spyOn(document.body, "appendChild");
      const removeSpy = jest.spyOn(document.body, "removeChild");

      const realAnchor = document.createElement("a");
      const clickSpy = jest.spyOn(realAnchor, "click").mockImplementation(() => {});
      const setAttributeSpy = jest.spyOn(realAnchor, "setAttribute");
      jest.spyOn(document, "createElement").mockReturnValue(realAnchor);

      downloadQuizData(mockStats, "csv", "test_history.csv");

      expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
      expect(setAttributeSpy).toHaveBeenCalledWith("download", "test_history.csv");
      expect(clickSpy).toHaveBeenCalledTimes(1);
      expect(appendSpy).toHaveBeenCalledWith(realAnchor);
      expect(removeSpy).toHaveBeenCalledWith(realAnchor);
      expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
    });

    test("creates Blob and triggers element click for JSON download", () => {
      const realAnchor = document.createElement("a");
      const clickSpy = jest.spyOn(realAnchor, "click").mockImplementation(() => {});
      const setAttributeSpy = jest.spyOn(realAnchor, "setAttribute");
      jest.spyOn(document, "createElement").mockReturnValue(realAnchor);

      downloadQuizData(mockStats, "json", "test_history.json");

      expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
      expect(setAttributeSpy).toHaveBeenCalledWith("download", "test_history.json");
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });
});
