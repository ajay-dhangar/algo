import React, { useState, useEffect, useRef } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";
import {
  FaPlay,
  FaStop,
  FaTrash,
  FaUndo,
  FaCode,
  FaTerminal,
  FaLightbulb,
  FaPython,
} from "react-icons/fa";

const TEMPLATES = {
  binarySearch: `// Binary Search Algorithm
// Finds the index of a target element in a sorted array.
// Returns -1 if not found.

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// Test cases
const arr = [1, 3, 5, 7, 9, 11, 13, 15];
console.log("Input Array:", arr);
console.log("Searching for 7:", binarySearch(arr, 7)); // Expected: 3
console.log("Searching for 10:", binarySearch(arr, 10)); // Expected: -1
`,
  bubbleSort: `// Bubble Sort Algorithm
// Sorts an array of numbers in ascending order.

function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log("Unsorted:", unsorted);
console.log("Sorted:  ", bubbleSort(unsorted));
`,
};

const PYTHON_TEMPLATE = `# Python WebAssembly (Pyodide) Demo
# Runs completely in your browser locally.

def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + right

unsorted = [3, 6, 8, 10, 1, 2, 1]
print("Python Unsorted:", unsorted)
print("Python Sorted:  ", quick_sort(unsorted))
`;

const PlaygroundContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sandbox" | "python">("sandbox");

  // JS Sandbox State
  const [code, setCode] = useState<string>(TEMPLATES.binarySearch);
  const [template, setTemplate] = useState<keyof typeof TEMPLATES>("binarySearch");
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [execTime, setExecTime] = useState<number | null>(null);
  const workerRef = useRef<Worker | null>(null);

  // Python WASM State
  const [pyCode, setPyCode] = useState<string>(PYTHON_TEMPLATE);
  const [pyLogs, setPyLogs] = useState<string[]>([]);
  const [isPyRunning, setIsPyRunning] = useState<boolean>(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState<boolean>(false);

  const consoleEndRef = useRef<HTMLDivElement | null>(null);
  const pyConsoleEndRef = useRef<HTMLDivElement | null>(null);
  const { colorMode } = useColorMode();

  // Scroll to bottom helper
  useEffect(() => {
    if (activeTab === "sandbox" && consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeTab === "python" && pyConsoleEndRef.current) {
      pyConsoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, pyLogs, activeTab]);

  useEffect(() => {
    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  // ── Tab 1: JS RUNNER ─────────────────────────────────────────
  const handleStopJs = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
      setIsRunning(false);
      setLogs((prev) => [...prev, "", "⛔ Execution stopped by user."]);
    }
  };

  const handleRunJs = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs(["// Starting JS sandbox...", ""]);
    setExecTime(null);

    // Use JSON.parse for safe code transfer — avoids breakage when user code contains backticks
    const workerCode = [
      'self.onmessage = function(e) {',
      '  const code = e.data;',
      '  const customConsole = {',
      '    log: (...args) => {',
      '      const message = args.map(arg => typeof arg === "object" ? JSON.stringify(arg) : String(arg)).join(" ");',
      '      self.postMessage({ type: "log", message });',
      '    },',
      '    error: (...args) => {',
      '      self.postMessage({ type: "error", message: args.join(" ") });',
      '    }',
      '  };',
      '  const start = performance.now();',
      '  try {',
      '    const run = new Function("console", "\"use strict\";\\n" + code);',
      '    run(customConsole);',
      '    self.postMessage({ type: "finish", time: performance.now() - start });',
      '  } catch (err) {',
      '    self.postMessage({ type: "error", message: err.message });',
      '    self.postMessage({ type: "finish", time: performance.now() - start });',
      '  }',
      '};',
    ].join('\n');

    const blob = new Blob([workerCode], { type: "text/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;

    // 10-second execution timeout to prevent infinite loops
    const timeoutId = setTimeout(() => {
      worker.terminate();
      workerRef.current = null;
      setIsRunning(false);
      setLogs((prev) => [...prev, "", "⏱️ Execution timed out after 10 seconds."]);
    }, 10000);

    worker.onmessage = (e) => {
      const data = e.data;
      if (data.type === "log") {
        setLogs((prev) => [...prev, `> ${data.message}`]);
      } else if (data.type === "error") {
        setLogs((prev) => [...prev, `❌ ${data.message}`]);
      } else if (data.type === "finish") {
        clearTimeout(timeoutId);
        setIsRunning(false);
        setExecTime(data.time);
        setLogs((prev) => [...prev, "", `// Execution finished in ${data.time.toFixed(2)}ms.`]);
        worker.terminate();
      }
    };
    worker.postMessage(code);
  };

  // ── Tab 2: PYTHON PYODIDE WASM RUNNER ───────────────────────
  const loadPyodideInstance = async () => {
    if (pyodide) return pyodide;
    setIsPyodideLoading(true);
    setPyLogs(["// Loading Pyodide WASM Runtime from CDN...", "Please wait a moment..."]);
    try {
      // Prevent duplicate script tags — check if Pyodide is already loaded
      if (!(window as any).loadPyodide) {
        const existingScript = document.querySelector('script[src*="pyodide"]');
        if (!existingScript) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
      }
      const py = await (window as any).loadPyodide();
      setPyodide(py);
      setPyLogs(["✅ Pyodide WebAssembly loaded successfully!", "Ready to execute Python code."]);
      setIsPyodideLoading(false);
      return py;
    } catch (e: any) {
      setPyLogs(["❌ Failed to load Pyodide WASM runtime.", e.message]);
      setIsPyodideLoading(false);
      return null;
    }
  };

  const handleRunPython = async () => {
    if (isPyRunning) return;
    const py = await loadPyodideInstance();
    if (!py) return;

    setIsPyRunning(true);
    setPyLogs((prev) => [...prev, "", "🐍 Running Python code..."]);

    try {
      py.setStdout({
        batched: (str: string) => {
          setPyLogs((prev) => [...prev, `> ${str}`]);
        },
      });
      await py.runPythonAsync(pyCode);
      setPyLogs((prev) => [...prev, "", "✅ Python execution completed successfully."]);
    } catch (err: any) {
      setPyLogs((prev) => [...prev, `❌ ${err.message}`]);
    } finally {
      setIsPyRunning(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#1b1b1d] min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* TAB CONTROLLERS */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all border-none flex items-center gap-2 ${
              activeTab === "sandbox"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-white hover:bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            }`}
          >
            <FaCode /> JS Sandbox
          </button>
          <button
            onClick={() => setActiveTab("python")}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all border-none flex items-center gap-2 ${
              activeTab === "python"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-white hover:bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            }`}
          >
            <FaPython className="text-yellow-500" /> Python WASM
          </button>
        </div>

        {/* ── TAB 1: JS SANDBOX VIEW ───────────────────────────────── */}
        {activeTab === "sandbox" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 flex flex-col bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md">
              <div className="bg-gray-100 dark:bg-gray-800/80 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-mono">
                  script.js
                </span>
                <button
                  onClick={() => setCode(TEMPLATES[template])}
                  className="px-2.5 py-1 text-xs font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded border-none cursor-pointer"
                >
                  <FaUndo /> Reset
                </button>
              </div>
              <div className="flex-grow min-h-[480px]">
                <BrowserOnly>
                  {() => {
                    const Editor = require("@monaco-editor/react").default;
                    return (
                      <Editor
                        height="480px"
                        language="javascript"
                        theme={colorMode === "dark" ? "vs-dark" : "light"}
                        value={code}
                        onChange={(val: any) => setCode(val || "")}
                        options={{
                          fontSize: 14,
                          minimap: { enabled: false },
                          automaticLayout: true,
                        }}
                      />
                    );
                  }}
                </BrowserOnly>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex items-center gap-3">
                <button
                  onClick={handleRunJs}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold border-none cursor-pointer"
                >
                  <FaPlay /> Run Sandbox
                </button>
                {isRunning && (
                  <button
                    onClick={handleStopJs}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold border-none cursor-pointer"
                  >
                    <FaStop /> Stop
                  </button>
                )}
                <button
                  onClick={() => setLogs([])}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg border-none cursor-pointer"
                >
                  <FaTrash /> Clear
                </button>
              </div>

              <div className="flex-grow flex flex-col bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden h-[400px] shadow-inner">
                <div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex justify-between items-center text-xs text-gray-400 font-mono">
                  <span>TERMINAL LOGS</span>
                </div>
                <div className="flex-grow p-4 overflow-y-auto font-mono text-sm text-gray-300 bg-black">
                  {logs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: PYTHON PYODIDE WASM VIEW ──────────────────────── */}
        {activeTab === "python" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 flex flex-col bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-md">
              <div className="bg-gray-100 dark:bg-gray-800/80 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-mono">
                  main.py
                </span>
                <button
                  onClick={() => setPyCode(PYTHON_TEMPLATE)}
                  className="px-2.5 py-1 text-xs font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded border-none cursor-pointer"
                >
                  <FaUndo /> Reset
                </button>
              </div>
              <div className="flex-grow min-h-[480px]">
                <BrowserOnly>
                  {() => {
                    const Editor = require("@monaco-editor/react").default;
                    return (
                      <Editor
                        height="480px"
                        language="python"
                        theme={colorMode === "dark" ? "vs-dark" : "light"}
                        value={pyCode}
                        onChange={(val: any) => setPyCode(val || "")}
                        options={{
                          fontSize: 14,
                          minimap: { enabled: false },
                          automaticLayout: true,
                        }}
                      />
                    );
                  }}
                </BrowserOnly>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex items-center gap-3">
                <button
                  onClick={handleRunPython}
                  disabled={isPyRunning || isPyodideLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-bold border-none cursor-pointer"
                >
                  <FaPython /> {isPyodideLoading ? "Loading WASM..." : "Run Python WASM"}
                </button>
                <button
                  onClick={() => setPyLogs([])}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg border-none cursor-pointer"
                >
                  <FaTrash /> Clear
                </button>
              </div>

              <div className="flex-grow flex flex-col bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden h-[400px] shadow-inner">
                <div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex justify-between items-center text-xs text-gray-400 font-mono">
                  <span>PYTHON CONSOLE</span>
                </div>
                <div className="flex-grow p-4 overflow-y-auto font-mono text-sm text-gray-300 bg-black">
                  {pyLogs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                  <div ref={pyConsoleEndRef} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Playground: React.FC = () => {
  return (
    <Layout
      title="Code Playground"
      description="An interactive coding playground to practice data structures and algorithms in your browser."
    >
      <PlaygroundContent />
    </Layout>
  );
};

export default Playground;
