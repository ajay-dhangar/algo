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
    // If no elements were swapped, array is already sorted
    if (!swapped) break;
  }
  return arr;
}

// Test cases
const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log("Unsorted:", unsorted);
console.log("Sorted:  ", bubbleSort(unsorted));
`,
  reverseList: `// Reverse a Singly Linked List
// Returns the new head of the reversed list.

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current !== null) {
    let nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }
  return prev;
}

// Helper to convert list to array for easy logging
function listToArray(head) {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// Create list: 1 -> 2 -> 3 -> 4 -> 5
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log("Original:", listToArray(list).join(" -> "));

const reversed = reverseList(list);
console.log("Reversed:", listToArray(reversed).join(" -> "));
`,
  fibonacci: `// Fibonacci Generator
// Generates the first N fibonacci numbers.

function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const series = [0, 1];
  for (let i = 2; i < n; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series;
}

// Test case
console.log("First 10 Fibonacci numbers:", generateFibonacci(10));
`,
};

// Moving the core workspace content to a separate inner component
const PlaygroundContent: React.FC = () => {
  const [code, setCode] = useState<string>(TEMPLATES.binarySearch);
  const [template, setTemplate] = useState<keyof typeof TEMPLATES>("binarySearch");
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [execTime, setExecTime] = useState<number | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const consolePanelRef = useRef<HTMLDivElement | null>(null);

  // Safe to use now because this component is rendered inside <Layout>
  const { colorMode } = useColorMode();

  // Scroll to bottom of console logs on update only during execution
  useEffect(() => {
    if (consolePanelRef.current && isRunning) {
      // Scroll within the console panel only, don't scroll the page
      consolePanelRef.current.scrollTop = consolePanelRef.current.scrollHeight;
    }
  }, [logs, isRunning]);

  // Clean up worker on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as keyof typeof TEMPLATES;
    setTemplate(selected);
    setCode(TEMPLATES[selected]);
  };

  const handleReset = () => {
    setCode(TEMPLATES[template]);
    setLogs(["// Editor reset to original template."]);
    setExecTime(null);
  };

  const handleClear = () => {
    setLogs([]);
    setExecTime(null);
  };

  const handleRun = () => {
    if (isRunning) return;

    setIsRunning(true);
    setLogs(["// Starting execution...", ""]);
    setExecTime(null);

    const workerCode = `
      self.onmessage = function(e) {
        const code = e.data;
        const customConsole = {
          log: (...args) => {
            const message = args.map(arg => {
              if (arg === null) return 'null';
              if (arg === undefined) return 'undefined';
              if (typeof arg === 'object') {
                try { return JSON.stringify(arg); } catch (e) { return '[Circular Object]'; }
              }
              return String(arg);
            }).join(' ');
            self.postMessage({ type: 'log', message });
          },
          error: (...args) => {
            const message = args.join(' ');
            self.postMessage({ type: 'error', message });
          }
        };

        const startTime = performance.now();
        try {
          const run = new Function('console', 'window', 'document', 'self', 'parent', 'global', \`
            'use strict';
            try {
    \${code}
  } catch (err) {
    console.error(err.message || err);
  }
          \`);
          run(customConsole, {}, {}, {}, {}, {}, {});
          const endTime = performance.now();
          self.postMessage({ type: 'finish', success: true, timeSpent: endTime - startTime });
        } catch (err) {
          const endTime = performance.now();
          self.postMessage({ type: 'finish', success: false, error: err.message, timeSpent: endTime - startTime });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: "text/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    workerRef.current = worker;

    const timeoutId = setTimeout(() => {
      if (workerRef.current) {
        workerRef.current.terminate();
        setIsRunning(false);
        setLogs((prev) => [...prev, "❌ [Timeout] Code execution timed out after 5 seconds."]);
      }
    }, 5000);

    worker.onmessage = (e) => {
      const data = e.data;
      if (data.type === "log") {
        setLogs((prev) => [...prev, `> ${data.message}`]);
      } else if (data.type === "error") {
        setLogs((prev) => [...prev, `❌ ${data.message}`]);
      } else if (data.type === "finish") {
        clearTimeout(timeoutId);
        setIsRunning(false);
        setExecTime(data.timeSpent);
        setLogs((prev) => [
          ...prev,
          "",
          `// Program finished successfully in ${data.timeSpent.toFixed(2)}ms.`,
        ]);
        worker.terminate();
        workerRef.current = null;
      }
    };

    worker.postMessage(code);
  };

  const handleStop = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
      setIsRunning(false);
      setLogs((prev) => [...prev, "", "⚠️ Execution terminated manually by user."]);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#1b1b1d] min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-3">
              <FaCode className="text-blue-600 dark:text-blue-500" />
              Algo Playground
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Write, run, and experiment with JavaScript algorithms in real-time.
            </p>
          </div>

          {/* Template Selector */}
          <div className="flex items-center justify-center gap-3">
            <label htmlFor="playground-template" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <FaLightbulb className="text-yellow-500" aria-hidden="true" /> Choose Template:
            </label>
            <select
              id="playground-template"
              value={template}
              onChange={handleTemplateChange}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="binarySearch">Binary Search</option>
              <option value="bubbleSort">Bubble Sort</option>
              <option value="reverseList">Reverse Linked List</option>
              <option value="fibonacci">Fibonacci Series</option>
            </select>
          </div>
        </div>

        {/* Editor and Console Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left side: Code Editor Panel */}
          <div className="lg:col-span-7 flex flex-col bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-850 rounded-xl overflow-hidden shadow-md">
            <div className="bg-gray-100 dark:bg-gray-800/80 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-2 font-mono">
                  script.js
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  title="Reset to original template"
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded transition border-none cursor-pointer"
                >
                  <FaUndo className="text-[10px]" /> Reset
                </button>
              </div>
            </div>

            {/* Monaco Wrapper */}
            <div className="flex-grow min-h-[480px]">
              <BrowserOnly fallback={<div className="p-6 text-gray-500 font-mono">Loading code editor...</div>}>
                {() => {
                  const Editor = require("@monaco-editor/react").default;
                  return (
                    <Editor
                      height="480px"
                      language="javascript"
                      theme={colorMode === "dark" ? "vs-dark" : "light"}
                      value={code}
                      onChange={(val: string | undefined) => setCode(val || "")}
                      options={{
                        fontSize: 14,
                        fontFamily: "Fira Code, Menlo, Monaco, Consolas, monospace",
                        minimap: { enabled: false },
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        tabSize: 2,
                        lineNumbersMinChars: 3,
                        cursorBlinking: "smooth",
                        smoothScrolling: true,
                      }}
                    />
                  );
                }}
              </BrowserOnly>
            </div>
          </div>

          {/* Right side: Execution and Console Output */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Controls Box */}
            <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md flex flex-wrap gap-3 items-center">
              {!isRunning ? (
                <button
                  onClick={handleRun}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition transform active:scale-95 shadow-md border-none cursor-pointer text-sm"
                >
                  <FaPlay /> Run Code
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition transform active:scale-95 shadow-md border-none cursor-pointer text-sm"
                >
                  <FaStop /> Stop Program
                </button>
              )}

              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold transition border-none cursor-pointer text-sm"
              >
                <FaTrash /> Clear
              </button>

              {execTime !== null && (
                <span className="text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full ml-auto">
                  Time: {execTime.toFixed(1)}ms
                </span>
              )}
            </div>

            {/* Console Output Panel */}
            <div className="flex-grow flex flex-col bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-auto">
              <div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 font-mono flex items-center gap-2">
                  <FaTerminal className="text-gray-500" /> CONSOLE TERMINAL
                </span>
                {isRunning && (
                  <span className="flex items-center gap-1.5 text-xs text-green-500 font-semibold font-mono animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    RUNNING
                  </span>
                )}
              </div>

              <div className="flex-grow p-4 overflow-y-auto font-mono text-sm leading-relaxed text-gray-300 bg-gray-950 space-y-1.5 select-text selection:bg-gray-800">
                {logs.length === 0 ? (
                  <div className="text-gray-600 italic select-none">
                    Console is empty. Click "Run Code" to view program output...
                  </div>
                ) : (
                  logs.map((log, idx) => {
                    let colorClass = "text-gray-300";
                    if (log.startsWith("❌")) {
                      colorClass = "text-red-400 font-semibold";
                    } else if (log.startsWith("⚠️") || log.startsWith("Program finished") || log.startsWith("//")) {
                      colorClass = "text-gray-500 italic";
                    } else if (log.startsWith(">")) {
                      colorClass = "text-green-400";
                    }
                    return (
                      <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
                        {log}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Export Component
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
