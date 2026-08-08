import { buildJudgeCases, parseJudgeInput } from "../utils/challengeJudge";

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
});
