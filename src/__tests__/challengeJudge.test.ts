import { buildJudgeCases, parseJudgeInput, canMarkChallengeSolved } from "../utils/challengeJudge";

describe("challengeJudge", () => {
  it("builds visible and hidden judge cases from a challenge", () => {
    const challenge = {
      testCases: [{ input: "0", expected: "0", description: "Base case" }],
    } as any;

    const cases = buildJudgeCases(challenge);

    expect(cases.length).toBeGreaterThanOrEqual(2);
    expect(cases[0]).toMatchObject({ input: "0", expected: "0" });
  });

  it("parses arrays and multi-parameter inputs", () => {
    expect(parseJudgeInput("arr = [8, 5, 2]")).toEqual([[8, 5, 2]]);
    expect(parseJudgeInput("g = [1, 2], s = [1, 1]")).toEqual([[1, 2], [1, 1]]);
    expect(parseJudgeInput("n = 4")).toEqual([4]);
  });

  it("evaluates whether a challenge can be marked as solved based on judge results", () => {
    expect(canMarkChallengeSolved(undefined)).toBe(false);
    expect(canMarkChallengeSolved([])).toBe(false);
    expect(canMarkChallengeSolved([
      { pass: true, output: "1", expected: "1", runtimeMs: 5, description: "Test 1" },
      { pass: false, output: "2", expected: "1", runtimeMs: 3, description: "Test 2" },
    ])).toBe(false);
    expect(canMarkChallengeSolved([
      { pass: true, output: "1", expected: "1", runtimeMs: 5, description: "Test 1" },
      { pass: true, output: "2", expected: "2", runtimeMs: 3, description: "Test 2" },
    ])).toBe(true);
  });
});
