import { useCallback, useMemo } from "react";
import { buildJudgeCases, parseJudgeInput, type JudgeCase, type JudgeResult } from "../utils/challengeJudge";

type ChallengeLike = {
  testCases?: JudgeCase[];
};

const PISTON_API = "https://emkc.org/api/v2/piston/execute";

export default function useChallengeJudge(challenge: ChallengeLike) {
  const judgeCases = useMemo(() => buildJudgeCases(challenge), [challenge]);

  const runJudge = useCallback(async (source: string, language: string) => {
    const results: JudgeResult[] = [];

    for (const testCase of judgeCases) {
      const startedAt = performance.now();
      try {
        const args = parseJudgeInput(testCase.input);
        const output = await executeSource(source, language, args);
        const normalizedOutput = normalizeOutput(output);
        const expected = normalizeOutput(testCase.expected);
        results.push({
          pass: normalizedOutput === expected,
          output: normalizedOutput,
          expected,
          runtimeMs: Math.max(1, Math.round(performance.now() - startedAt)),
          description: testCase.description,
          error: output.startsWith("[ERROR]") ? output : undefined,
        });
      } catch (error) {
        results.push({
          pass: false,
          output: "",
          expected: normalizeOutput(testCase.expected),
          runtimeMs: Math.max(1, Math.round(performance.now() - startedAt)),
          description: testCase.description,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return results;
  }, [judgeCases]);

  return { judgeCases, runJudge };
}

function executeSource(source: string, language: string, args: unknown[]): Promise<string> {
  if (language === "javascript") {
    return executeJavaScript(source, args);
  }

  if (language === "python") {
    return executePython(source, args);
  }

  if (language === "cpp" || language === "java" || language === "go") {
    return executePiston(language, source, args);
  }

  return "[ERROR] Unsupported language";
}

function executeJavaScript(source: string, args: unknown[]): Promise<string> {
  const entry = inferEntryPoint(source, "javascript");
  const wrapped = `
${source}

const args = ${JSON.stringify(args)};
const result = typeof ${entry} === "function" ? ${entry}(...args) : undefined;
console.log(JSON.stringify(result));
`;

  return new Promise((resolve, reject) => {
    const workerUrl = URL.createObjectURL(new Blob([`
      self.onmessage = () => {
        const logs = [];
        const serialize = (value) => {
          if (value instanceof Error) return value.stack || value.message;
          if (value && typeof value === "object") {
            try { return JSON.stringify(value); } catch { return String(value); }
          }
          return String(value);
        };
        console.log = (...values) => logs.push(values.map(serialize).join(" "));
        console.error = (...values) => logs.push("[ERROR] " + values.map(serialize).join(" "));
        try { new Function(${JSON.stringify(wrapped)})(); } catch (error) { logs.push("[ERROR] " + (error instanceof Error ? error.message : String(error))); }
        self.postMessage(logs.join("\\n"));
      };
    `], { type: "application/javascript" }));

    const worker = new Worker(workerUrl);
    const timeout = window.setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      reject(new Error("Execution timed out"));
    }, 4000);

    worker.onmessage = (event) => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      resolve(String(event.data));
    };

    worker.onerror = () => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      reject(new Error("Worker execution failed"));
    };

    worker.postMessage({});
  });
}

async function executePython(source: string, args: unknown[]): Promise<string> {
  if (!(window as typeof window & { loadPyodide?: any }).loadPyodide) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js";
    document.head.appendChild(script);
    await new Promise((resolve, reject) => {
      script.onload = () => resolve(undefined);
      script.onerror = () => reject(new Error("Failed to load Pyodide"));
    });
  }

  const pyodide = await (window as typeof window & { loadPyodide?: any }).loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/",
  });

  const entry = inferEntryPoint(source, "python");
  const wrapped = `
import json
${source}
args = ${JSON.stringify(args)}
result = ${entry}(*args) if isinstance(args, list) else ${entry}(args)
print(json.dumps(result))
`;

  const logs: string[] = [];
  pyodide.setStdout({ batched: (value: string) => logs.push(value) });
  pyodide.setStderr({ batched: (value: string) => logs.push(value) });
  try {
    await pyodide.runPythonAsync(wrapped);
  } catch (error) {
    logs.push(`[ERROR] ${error instanceof Error ? error.message : String(error)}`);
  }
  return logs.join("\n") || "";
}

async function executePiston(language: string, source: string, args: unknown[]): Promise<string> {
  const entry = inferEntryPoint(source, language);
  const payload = {
    language,
    version: getPistonVersion(language),
    files: [{ name: getFileName(language), content: buildPistonProgram(language, source, entry, args) }],
  };

  const response = await fetch(PISTON_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Execution failed with ${response.status}`);
  }

  const data = await response.json();
  return data.run?.output || data.run?.stderr || "[ERROR] No output";
}

function buildPistonProgram(language: string, source: string, entry: string, args: unknown[]): string {
  if (language === "cpp") {
    const argExpressions = args.map(toCppLiteral).join(", ");
    return `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

${source}

template <typename T>
void printValue(const T& value) { cout << value; }

template <typename T>
void printValue(const vector<T>& value) {
  cout << "[";
  for (size_t i = 0; i < value.size(); ++i) {
    if (i) cout << ",";
    printValue(value[i]);
  }
  cout << "]";
}

int main() {
  auto result = ${entry}(${argExpressions});
  printValue(result);
  return 0;
}
`;
  }

  if (language === "java") {
    return `class Main {
  ${source}
  public static void main(String[] args) {
    System.out.println(${entry}(${args.map(toJavaLiteral).join(", ")}));
  }
}`;
  }

  if (language === "go") {
    return `package main
import "fmt"

${source}

func main() {
  fmt.Println(${entry}(${args.map(toGoLiteral).join(", ")}))
}`;
  }

  return source;
}

function inferEntryPoint(source: string, language: string): string {
  const jsMatch = source.match(/(?:function\s+|const\s+|let\s+)([A-Za-z0-9_$]+)\s*\(/);
  if (jsMatch) return jsMatch[1];
  if (language === "python") {
    const pyMatch = source.match(/def\s+([A-Za-z0-9_]+)\s*\(/);
    if (pyMatch) return pyMatch[1];
  }
  const cppMatch = source.match(/(?:\w+\s+)+([A-Za-z0-9_]+)\s*\(/);
  if (cppMatch) return cppMatch[1];
  return "solution";
}

function toCppLiteral(value: unknown): string {
  if (Array.isArray(value)) {
    return `vector<int>{${value.map((item) => String(item)).join(", ")}}`;
  }
  if (typeof value === "string") {
    return `string(${JSON.stringify(value)})`;
  }
  return String(value);
}

function toJavaLiteral(value: unknown): string {
  if (Array.isArray(value)) {
    return `new int[]{${value.map((item) => String(item)).join(", ")}}`;
  }
  return JSON.stringify(value);
}

function toGoLiteral(value: unknown): string {
  if (Array.isArray(value)) {
    return `[]int{${value.map((item) => String(item)).join(", ")}}`;
  }
  return JSON.stringify(value);
}

function getPistonVersion(language: string): string {
  switch (language) {
    case "cpp": return "10.2.0";
    case "java": return "15.0.2";
    case "go": return "1.21.0";
    default: return "15.0.2";
  }
}

function getFileName(language: string): string {
  switch (language) {
    case "cpp": return "main.cpp";
    case "java": return "Main.java";
    case "go": return "main.go";
    default: return "main.txt";
  }
}

function normalizeOutput(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}
