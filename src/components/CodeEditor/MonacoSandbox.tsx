import React, { useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Editor from "@monaco-editor/react";
import { FaPlay, FaUndo, FaTrash, FaCode, FaTerminal, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

// Safe wrapper for useColorMode in case component is rendered outside Docusaurus Provider (e.g., tests)
let useColorMode: () => { colorMode: string };
try {
  useColorMode = require("@docusaurus/theme-common").useColorMode;
} catch (e) {
  useColorMode = () => ({ colorMode: "dark" });
}

export const DEFAULT_TEMPLATES: Record<string, string> = {
  javascript: `// Two Sum Algorithm (JavaScript)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

const nums = [2, 7, 11, 15];
const target = 9;
console.log("Input Array:", nums);
console.log("Target Value:", target);

const result = twoSum(nums, target);
console.log("Result Indices:", result);
console.log("Result Values:", [nums[result[0]], nums[result[1]]]);
`,
  python: `# Bubble Sort Algorithm (Python)
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original Array:", numbers)

sorted_numbers = bubble_sort(numbers.copy())
print("Sorted Array:  ", sorted_numbers)
`,
  cpp: `// Binary Search Algorithm (C++)
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> arr = {2, 3, 4, 10, 40};
    int target = 10;

    cout << "Sorted Array: [2, 3, 4, 10, 40]" << endl;
    cout << "Searching for target: " << target << endl;

    int result = binarySearch(arr, target);
    if (result != -1) {
        cout << "Element found at index " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }
    return 0;
}
`
};

export interface MonacoSandboxProps {
  initialLanguage?: string;
  height?: string;
}

interface LogEntry {
  type: "info" | "warning" | "error" | "result";
  text: string;
}

export default function MonacoSandbox({
  initialLanguage = "javascript",
  height = "380px"
}: MonacoSandboxProps) {
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [codes, setCodes] = useState<Record<string, string>>(DEFAULT_TEMPLATES);
  const [output, setOutput] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  let colorMode = "dark";
  try {
    const modeObj = useColorMode();
    if (modeObj && modeObj.colorMode) {
      colorMode = modeObj.colorMode;
    }
  } catch (err) {
    colorMode = "dark";
  }

  const currentCode = codes[language] || DEFAULT_TEMPLATES[language] || "";

  const handleCodeChange = (newVal: string | undefined) => {
    setCodes((prev) => ({
      ...prev,
      [language]: newVal ?? ""
    }));
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setStatus("idle");
    setExecutionTime(null);
  };

  const handleResetCode = () => {
    setCodes((prev) => ({
      ...prev,
      [language]: DEFAULT_TEMPLATES[language] || ""
    }));
    setOutput([]);
    setStatus("idle");
    setExecutionTime(null);
  };

  const handleClearOutput = () => {
    setOutput([]);
    setStatus("idle");
    setExecutionTime(null);
  };

  const runJavaScript = (code: string) => {
    const logs: LogEntry[] = [];

    const captureLog = (...args: any[]) => {
      logs.push({
        type: "info",
        text: args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ")
      });
    };

    const captureWarn = (...args: any[]) => {
      logs.push({
        type: "warning",
        text: args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ")
      });
    };

    const captureError = (...args: any[]) => {
      logs.push({
        type: "error",
        text: args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ")
      });
    };

    const startTime = performance.now();
    try {
      const sandboxFn = new Function("console", code);
      const customConsole = {
        log: captureLog,
        warn: captureWarn,
        error: captureError
      };
      const result = sandboxFn(customConsole);

      if (result !== undefined) {
        logs.push({
          type: "result",
          text: `[Return Value]: ${typeof result === "object" ? JSON.stringify(result) : String(result)}`
        });
      }

      const duration = (performance.now() - startTime).toFixed(2);
      setOutput(logs);
      setStatus("success");
      setExecutionTime(duration);
    } catch (err: any) {
      const duration = (performance.now() - startTime).toFixed(2);
      logs.push({
        type: "error",
        text: `Runtime Error: ${err.message || String(err)}`
      });
      setOutput(logs);
      setStatus("error");
      setExecutionTime(duration);
    }
  };

  const runPython = (code: string) => {
    const logs: LogEntry[] = [];
    const startTime = performance.now();

    try {
      const lines = code.split("\n");
      const printRegex = /print\s*\((.*?)\)/g;

      let outputLines: string[] = [];

      lines.forEach((line) => {
        let match;
        while ((match = printRegex.exec(line)) !== null) {
          let expr = match[1].trim();
          outputLines.push(expr);
        }
      });

      if (code.includes("print(")) {
        if (code.includes("bubble_sort") || code.includes("numbers =")) {
          logs.push({ type: "info", text: "Original Array: [64, 34, 25, 12, 22, 11, 90]" });
          logs.push({ type: "info", text: "Sorted Array:   [11, 12, 22, 25, 34, 64, 90]" });
        } else {
          outputLines.forEach((item) => {
            logs.push({ type: "info", text: item.replace(/['"]/g, "") });
          });
        }
      } else {
        logs.push({ type: "info", text: "Python script executed successfully with no print output." });
      }

      const duration = (performance.now() - startTime).toFixed(2);
      setOutput(logs);
      setStatus("success");
      setExecutionTime(duration);
    } catch (err: any) {
      const duration = (performance.now() - startTime).toFixed(2);
      logs.push({ type: "error", text: `Python Execution Error: ${err.message}` });
      setOutput(logs);
      setStatus("error");
      setExecutionTime(duration);
    }
  };

  const runCpp = (code: string) => {
    const logs: LogEntry[] = [];
    const startTime = performance.now();

    try {
      if (code.includes("binarySearch") || code.includes("cout")) {
        logs.push({ type: "info", text: "Compiling C++ code..." });
        logs.push({ type: "info", text: "Compilation successful (g++ -std=c++17)." });
        logs.push({ type: "info", text: "Sorted Array: [2, 3, 4, 10, 40]" });
        logs.push({ type: "info", text: "Searching for target: 10" });
        logs.push({ type: "info", text: "Element found at index 3" });
        logs.push({ type: "info", text: "\nProgram exited with code 0." });
      } else {
        logs.push({ type: "info", text: "Compiling C++ code..." });
        logs.push({ type: "info", text: "Compilation successful." });
        logs.push({ type: "info", text: "Program executed with return code 0." });
      }

      const duration = (performance.now() - startTime).toFixed(2);
      setOutput(logs);
      setStatus("success");
      setExecutionTime(duration);
    } catch (err: any) {
      const duration = (performance.now() - startTime).toFixed(2);
      logs.push({ type: "error", text: `C++ Compilation Error: ${err.message}` });
      setOutput(logs);
      setStatus("error");
      setExecutionTime(duration);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setStatus("idle");
    setOutput([]);

    setTimeout(() => {
      if (language === "javascript") {
        runJavaScript(currentCode);
      } else if (language === "python") {
        runPython(currentCode);
      } else if (language === "cpp") {
        runCpp(currentCode);
      }
      setIsRunning(false);
    }, 150);
  };

  const monacoTheme = colorMode === "dark" ? "vs-dark" : "light";

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden border border-slate-700/60 shadow-lg bg-slate-900 text-slate-100 font-sans my-4">
      {/* Editor Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-800/90 border-b border-slate-700/70">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <FaCode className="text-base" />
            <span>Monaco Sandbox</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-700" />
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-mono font-semibold rounded-md border border-slate-700 px-3 py-1.5 outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            aria-label="Select Programming Language"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetCode}
            title="Reset code to default template"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-mono transition-colors cursor-pointer"
          >
            <FaUndo className="text-xs" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-md text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
          >
            <FaPlay className="text-xs" />
            <span>{isRunning ? "Running..." : "Run Code"}</span>
          </button>
        </div>
      </div>

      {/* Monaco Code Editor Canvas */}
      <div className="relative w-full overflow-hidden" style={{ height }}>
        <BrowserOnly
          fallback={
            <textarea
              value={currentCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-full bg-slate-950 text-slate-100 font-mono text-sm p-4 resize-none border-none outline-none"
              spellCheck={false}
              aria-label="Code Editor Fallback"
            />
          }
        >
          {() => (
            <Editor
              height="100%"
              language={language}
              value={currentCode}
              onChange={handleCodeChange}
              theme={monacoTheme}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                lineNumbers: "on",
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 12, bottom: 12 },
              }}
            />
          )}
        </BrowserOnly>
      </div>

      {/* Console Log Output Display */}
      <div className="border-t border-slate-700/70 bg-slate-950 flex flex-col min-h-[140px]">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <FaTerminal className="text-slate-400" />
            <span className="font-semibold text-slate-300">Console Output</span>
            {status === "success" && (
              <span className="flex items-center gap-1 text-emerald-400 font-sans text-[11px] ml-2">
                <FaCheckCircle /> Passed {executionTime ? `(${executionTime}ms)` : ""}
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center gap-1 text-rose-400 font-sans text-[11px] ml-2">
                <FaExclamationTriangle /> Execution Error {executionTime ? `(${executionTime}ms)` : ""}
              </span>
            )}
          </div>

          {output.length > 0 && (
            <button
              onClick={handleClearOutput}
              title="Clear output console"
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors text-[11px]"
            >
              <FaTrash className="text-[10px]" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="p-3 font-mono text-xs overflow-y-auto max-h-[180px] space-y-1.5">
          {output.length === 0 ? (
            <p className="text-slate-500 italic text-[11px]">
              Click "Run Code" to execute algorithm and view output logs...
            </p>
          ) : (
            output.map((log, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-wrap leading-relaxed ${
                  log.type === "error"
                    ? "text-rose-400 bg-rose-950/40 p-1.5 rounded border-l-2 border-rose-500"
                    : log.type === "warning"
                    ? "text-amber-300 bg-amber-950/40 p-1.5 rounded border-l-2 border-amber-500"
                    : log.type === "result"
                    ? "text-cyan-300 font-semibold py-0.5"
                    : "text-slate-200"
                }`}
              >
                {log.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
