import {
  createInitialAdaptiveState,
  recordAnswer,
  selectNextQuestion,
  shouldStop,
  getMasteryLevel,
  getConfidencePercent,
  DEFAULT_ADAPTIVE_CONFIG,
  AdaptiveQuestion,
  AdaptiveState,
  AdaptiveConfig,
} from "../../utils/adaptiveQuiz";

const makePool = (n = 30): AdaptiveQuestion[] => {
  const diffs = ["Easy", "Medium", "Hard"] as const;
  return Array.from({ length: n }, (_, i) => ({ id: i, difficulty: diffs[i % 3] }));
};

const runSession = (
  answerFn: (q: AdaptiveQuestion, state: AdaptiveState) => boolean,
  config: AdaptiveConfig = DEFAULT_ADAPTIVE_CONFIG,
  poolSize = 30
) => {
  const pool = makePool(poolSize);
  let state = createInitialAdaptiveState();
  const askedDifficulties: string[] = [];
  let guard = 0;
  while (!shouldStop(state, pool.length, config)) {
    guard++;
    if (guard > 1000) throw new Error("Session did not terminate");
    const q = selectNextQuestion(state, pool);
    if (!q) break;
    askedDifficulties.push(q.difficulty);
    const correct = answerFn(q, state);
    state = recordAnswer(state, q, correct);
  }
  return { state, askedDifficulties };
};

describe("adaptiveQuiz engine", () => {
  test("a learner who always answers correctly ends Advanced, within bounds", () => {
    const { state, askedDifficulties } = runSession(() => true);
    expect(state.history.length).toBeGreaterThanOrEqual(DEFAULT_ADAPTIVE_CONFIG.minQuestions);
    expect(state.history.length).toBeLessThanOrEqual(DEFAULT_ADAPTIVE_CONFIG.maxQuestions);
    expect(getMasteryLevel(state)).toBe("Advanced");
    expect(getConfidencePercent(state)).toBeGreaterThanOrEqual(60);
    expect(askedDifficulties.slice(-2)).toContain("Hard");
  });

  test("a learner who always answers incorrectly ends Developing", () => {
    const { state, askedDifficulties } = runSession(() => false);
    expect(getMasteryLevel(state)).toBe("Developing");
    expect(askedDifficulties.slice(-2)).toContain("Easy");
  });

  test("a learner who aces Easy/Medium but always misses Hard ends Proficient, not Advanced", () => {
    const { state } = runSession((q) => q.difficulty !== "Hard");
    expect(getMasteryLevel(state)).toBe("Proficient");
  });

  test("an adversarial alternating answer pattern still terminates within maxQuestions", () => {
    let i = 0;
    const { state } = runSession(() => {
      i++;
      return i % 2 === 0;
    });
    expect(state.history.length).toBeLessThanOrEqual(DEFAULT_ADAPTIVE_CONFIG.maxQuestions);
  });

  test("an unreachable confidence threshold still stops at the hard maxQuestions ceiling", () => {
    const strictConfig: AdaptiveConfig = {
      minQuestions: 3,
      maxQuestions: 8,
      confidenceThreshold: 0.0001,
      stabilityWindow: 4,
      stabilityTolerance: 0.35,
    };
    const { state } = runSession(() => Math.random() < 0.5, strictConfig);
    expect(state.history.length).toBe(8);
  });

  test("never ends before minQuestions even with a trivially loose confidence threshold", () => {
    const looseConfig: AdaptiveConfig = {
      minQuestions: 6,
      maxQuestions: 20,
      confidenceThreshold: 0.99,
      stabilityWindow: 4,
      stabilityTolerance: 0.35,
    };
    const { state } = runSession(() => true, looseConfig);
    expect(state.history.length).toBeGreaterThanOrEqual(6);
    expect(state.history.length).toBeLessThanOrEqual(20);
  });

  test("a small pool never asks more questions than it has, and asks at least one", () => {
    const { state } = runSession(() => true, DEFAULT_ADAPTIVE_CONFIG, 4);
    expect(state.history.length).toBeLessThanOrEqual(4);
    expect(state.history.length).toBeGreaterThanOrEqual(1);
  });

  test("no question is ever repeated within a single session", () => {
    const { state } = runSession(() => Math.random() < 0.5);
    const ids = state.history.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("selectNextQuestion returns null once every question has been answered", () => {
    const pool = makePool(3);
    let state = createInitialAdaptiveState();
    for (const q of pool) state = recordAnswer(state, q, true);
    expect(selectNextQuestion(state, pool)).toBeNull();
  });

  test("getMasteryLevel and getConfidencePercent are pure functions of state", () => {
    const state = createInitialAdaptiveState();
    expect(getMasteryLevel(state)).toBe("Proficient");
    expect(getConfidencePercent(state)).toBe(0);
  });
});
