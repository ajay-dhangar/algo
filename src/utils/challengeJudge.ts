export interface JudgeCase {
  input: string;
  expected: string;
  description: string;
}

export interface JudgeResult {
  pass: boolean;
  output: string;
  expected: string;
  runtimeMs: number;
  description: string;
  error?: string;
}

export function parseJudgeInput(input: string): unknown[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const segments = trimmed.split(/\s*,\s*(?=(?:[^\[\]]*\[[^\[\]]*\])*[^\[\]]*$)/);
  const values = segments
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const match = segment.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
      const raw = match ? match[2] : segment;
      const normalized = raw.replace(/\s+/g, "");

      if (normalized.startsWith("[") && normalized.endsWith("]")) {
        const inner = normalized.slice(1, -1);
        if (!inner) return [];
        return inner.split(",").map((item) => {
          const num = Number(item);
          return Number.isFinite(num) ? num : item;
        });
      }

      const num = Number(normalized);
      return Number.isFinite(num) ? num : normalized;
    });

  return values;
}

export function canMarkChallengeSolved(results?: JudgeResult[] | null): boolean {
  const resolvedResults = results ?? [];
  return resolvedResults.length > 0 && resolvedResults.every((result) => result.pass);
}

export function buildJudgeCases(challenge: { testCases?: JudgeCase[] }): JudgeCase[] {
  const baseCases = challenge.testCases ?? [];
  const hiddenCases = [
    { input: "10", expected: "55", description: "Hidden case: larger Fibonacci" },
    { input: "15", expected: "610", description: "Hidden case: larger Fibonacci" },
    { input: "g = [1, 2, 3], s = [1, 1]", expected: "1", description: "Hidden case: greedy allocation" },
    { input: "g = [1, 2], s = [1, 2, 3]", expected: "2", description: "Hidden case: extra cookies" },
  ];

  return [...baseCases, ...hiddenCases].slice(0, 8);
}
