import {
  getAllMockExamQuestions,
  getAvailableQuestionsCount,
  buildMockExamQuestions,
  getRandom30Preset,
  getTopicTitle,
  shuffleArray,
} from "../utils/mockExamData";

describe("mockExamData Utility", () => {
  test("getAllMockExamQuestions returns questions from all 19 topics", () => {
    const questions = getAllMockExamQuestions();
    expect(questions.length).toBeGreaterThan(100);

    const topicIds = new Set(questions.map((q) => q.topicId));
    expect(topicIds.size).toBe(19);
    expect(topicIds.has("arrays")).toBe(true);
    expect(topicIds.has("graphs")).toBe(true);
    expect(topicIds.has("sorting")).toBe(true);
  });

  test("getAvailableQuestionsCount returns correct count for selected topics", () => {
    const avlCount = getAvailableQuestionsCount(["avl-trees"]);
    expect(avlCount).toBeGreaterThan(0);

    const emptyCount = getAvailableQuestionsCount([]);
    expect(emptyCount).toBe(0);

    const combinedCount = getAvailableQuestionsCount(["arrays", "graphs"]);
    expect(combinedCount).toBe(
      getAvailableQuestionsCount(["arrays"]) + getAvailableQuestionsCount(["graphs"])
    );
  });

  test("buildMockExamQuestions filters by selected topics and respects count limit", () => {
    const selectedTopics = ["arrays", "graphs"];
    const count = 10;
    const questions = buildMockExamQuestions(selectedTopics, count);

    expect(questions.length).toBeLessThanOrEqual(count);
    questions.forEach((q) => {
      expect(selectedTopics.includes(q.topicId)).toBe(true);
    });
  });

  test("buildMockExamQuestions caps question count when target count exceeds available questions", () => {
    const selectedTopics = ["avl-trees"];
    const available = getAvailableQuestionsCount(selectedTopics);
    const requestedCount = 30; // higher than available
    const questions = buildMockExamQuestions(selectedTopics, requestedCount);

    expect(questions.length).toBe(available);
    expect(questions.length).toBeLessThan(requestedCount);
  });

  test("getRandom30Preset returns 30 questions across topics", () => {
    const questions = getRandom30Preset();
    expect(questions.length).toBe(30);

    const topicIds = new Set(questions.map((q) => q.topicId));
    expect(topicIds.size).toBeGreaterThan(1);
  });

  test("getTopicTitle maps topic ID to human readable title", () => {
    expect(getTopicTitle("arrays")).toBe("Arrays");
    expect(getTopicTitle("graphs")).toBe("Graphs");
    expect(getTopicTitle("sorting")).toBe("Sorting Algorithms");
  });

  test("shuffleArray produces shuffled copy of array", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const output = shuffleArray(input);
    expect(output.length).toBe(input.length);
    expect(output.sort()).toEqual(input.sort());
  });
});
