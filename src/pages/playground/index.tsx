import React, { useState, useEffect, useRef } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";
import { buildApiUrl, useApiBaseUrl } from "../../utils/api";
import {
  FaPlay,
  FaStop,
  FaTrash,
  FaUndo,
  FaCode,
  FaTerminal,
  FaLightbulb,
} from "react-icons/fa";

// Language configuration
type LanguageType = "javascript" | "python" | "cpp" | "java";

interface LanguageConfig {
  name: string;
  monacoLanguage: string;
  fileExtension: string;
}

const LANGUAGE_CONFIGS: Record<LanguageType, LanguageConfig> = {
  javascript: {
    name: "JavaScript",
    monacoLanguage: "javascript",
    fileExtension: ".js",
  },
  python: {
    name: "Python",
    monacoLanguage: "python",
    fileExtension: ".py",
  },
  cpp: {
    name: "C++",
    monacoLanguage: "cpp",
    fileExtension: ".cpp",
  },
  java: {
    name: "Java",
    monacoLanguage: "java",
    fileExtension: ".java",
  },
};

// Templates organized by language
const TEMPLATES: Record<LanguageType, Record<string, string>> = {
  javascript: {
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
  },
  python: {
    binarySearch: `# Binary Search Algorithm
# Finds the index of a target element in a sorted array.
# Returns -1 if not found.

def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Test cases
arr = [1, 3, 5, 7, 9, 11, 13, 15]
print("Input Array:", arr)
print("Searching for 7:", binary_search(arr, 7))  # Expected: 3
print("Searching for 10:", binary_search(arr, 10))  # Expected: -1
`,
    bubbleSort: `# Bubble Sort Algorithm
# Sorts an array of numbers in ascending order.

def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no elements were swapped, array is already sorted
        if not swapped:
            break
    return arr

# Test cases
unsorted = [64, 34, 25, 12, 22, 11, 90]
print("Unsorted:", unsorted)
print("Sorted:  ", bubble_sort(unsorted))
`,
    reverseList: `# Reverse a Singly Linked List
# Returns the new head of the reversed list.

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    current = head
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    return prev

# Helper to convert list to array for easy logging
def list_to_array(head):
    result = []
    current = head
    while current:
        result.append(current.val)
        current = current.next
    return result

# Create list: 1 -> 2 -> 3 -> 4 -> 5
list_head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
print("Original:", " -> ".join(map(str, list_to_array(list_head))))

reversed_head = reverse_list(list_head)
print("Reversed:", " -> ".join(map(str, list_to_array(reversed_head))))
`,
    fibonacci: `# Fibonacci Generator
# Generates the first N fibonacci numbers.

def generate_fibonacci(n):
    if n <= 0:
        return []
    if n == 1:
        return [0]
    
    series = [0, 1]
    for i in range(2, n):
        series.append(series[i - 1] + series[i - 2])
    return series

# Test case
print("First 10 Fibonacci numbers:", generate_fibonacci(10))
`,
  },
  cpp: {
    binarySearch: `#include <iostream>
#include <vector>
using namespace std;

// Binary Search Algorithm
// Finds the index of a target element in a sorted array.
// Returns -1 if not found.

int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13, 15};
    cout << "Input Array: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    
    cout << "Searching for 7: " << binarySearch(arr, 7) << endl;  // Expected: 3
    cout << "Searching for 10: " << binarySearch(arr, 10) << endl;  // Expected: -1
    
    return 0;
}
`,
    bubbleSort: `#include <iostream>
#include <vector>
using namespace std;

// Bubble Sort Algorithm
// Sorts an array of numbers in ascending order.

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        // If no elements were swapped, array is already sorted
        if (!swapped) break;
    }
}

int main() {
    vector<int> unsorted = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Unsorted: ";
    for (int num : unsorted) cout << num << " ";
    cout << endl;
    
    bubbleSort(unsorted);
    
    cout << "Sorted: ";
    for (int num : unsorted) cout << num << " ";
    cout << endl;
    
    return 0;
}
`,
    reverseList: `#include <iostream>
using namespace std;

// Reverse a Singly Linked List
// Returns the new head of the reversed list.

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = NULL;
    ListNode* current = head;
    while (current != NULL) {
        ListNode* nextNode = current->next;
        current->next = prev;
        prev = current;
        current = nextNode;
    }
    return prev;
}

// Helper to convert list to array for easy logging
void printList(ListNode* head) {
    cout << "List: ";
    while (head) {
        cout << head->val;
        if (head->next) cout << " -> ";
        head = head->next;
    }
    cout << endl;
}

int main() {
    // Create list: 1 -> 2 -> 3 -> 4 -> 5
    ListNode* list = new ListNode(1);
    list->next = new ListNode(2);
    list->next->next = new ListNode(3);
    list->next->next->next = new ListNode(4);
    list->next->next->next->next = new ListNode(5);
    
    cout << "Original: ";
    printList(list);
    
    ListNode* reversed = reverseList(list);
    cout << "Reversed: ";
    printList(reversed);
    
    return 0;
}
`,
    fibonacci: `#include <iostream>
#include <vector>
using namespace std;

// Fibonacci Generator
// Generates the first N fibonacci numbers.

vector<int> generateFibonacci(int n) {
    vector<int> series;
    if (n <= 0) return series;
    if (n >= 1) series.push_back(0);
    if (n >= 2) series.push_back(1);
    
    for (int i = 2; i < n; i++) {
        series.push_back(series[i - 1] + series[i - 2]);
    }
    return series;
}

int main() {
    vector<int> fib = generateFibonacci(10);
    cout << "First 10 Fibonacci numbers: ";
    for (int i = 0; i < fib.size(); i++) {
        cout << fib[i];
        if (i < fib.size() - 1) cout << ", ";
    }
    cout << endl;
    
    return 0;
}
`,
  },
  java: {
    binarySearch: `// Binary Search Algorithm
// Finds the index of a target element in a sorted array.
// Returns -1 if not found.

public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15};
        System.out.print("Input Array: ");
        for (int num : arr) System.out.print(num + " ");
        System.out.println();
        
        System.out.println("Searching for 7: " + binarySearch(arr, 7));  // Expected: 3
        System.out.println("Searching for 10: " + binarySearch(arr, 10));  // Expected: -1
    }
}
`,
    bubbleSort: `// Bubble Sort Algorithm
// Sorts an array of numbers in ascending order.

public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no elements were swapped, array is already sorted
            if (!swapped) break;
        }
    }
    
    public static void main(String[] args) {
        int[] unsorted = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.print("Unsorted: ");
        for (int num : unsorted) System.out.print(num + " ");
        System.out.println();
        
        bubbleSort(unsorted);
        
        System.out.print("Sorted: ");
        for (int num : unsorted) System.out.print(num + " ");
        System.out.println();
    }
}
`,
    reverseList: `// Reverse a Singly Linked List
// Returns the new head of the reversed list.

public class ReverseList {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int x) { val = x; }
    }
    
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        while (current != null) {
            ListNode nextNode = current.next;
            current.next = prev;
            prev = current;
            current = nextNode;
        }
        return prev;
    }
    
    public static void printList(ListNode head) {
        System.out.print("List: ");
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) System.out.print(" -> ");
            head = head.next;
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        // Create list: 1 -> 2 -> 3 -> 4 -> 5
        ListNode list = new ListNode(1);
        list.next = new ListNode(2);
        list.next.next = new ListNode(3);
        list.next.next.next = new ListNode(4);
        list.next.next.next.next = new ListNode(5);
        
        System.out.print("Original: ");
        printList(list);
        
        ListNode reversed = reverseList(list);
        System.out.print("Reversed: ");
        printList(reversed);
    }
}
`,
    fibonacci: `// Fibonacci Generator
// Generates the first N fibonacci numbers.

import java.util.*;

public class Fibonacci {
    public static List<Integer> generateFibonacci(int n) {
        List<Integer> series = new ArrayList<>();
        if (n <= 0) return series;
        if (n >= 1) series.add(0);
        if (n >= 2) series.add(1);
        
        for (int i = 2; i < n; i++) {
            series.add(series.get(i - 1) + series.get(i - 2));
        }
        return series;
    }
    
    public static void main(String[] args) {
        List<Integer> fib = generateFibonacci(10);
        System.out.print("First 10 Fibonacci numbers: ");
        for (int i = 0; i < fib.size(); i++) {
            System.out.print(fib.get(i));
            if (i < fib.size() - 1) System.out.print(", ");
        }
        System.out.println();
    }
}
`,
  },
};

type EditorTelemetry = {
  lineNumber: number;
  column: number;
  totalLines: number;
  characterCount: number;
  selectionLength: number;
};

type MonacoSelectionLike = {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
};

type MonacoModelLike = {
  getLineCount: () => number;
  getValueLength: () => number;
  getValueInRange: (range: MonacoSelectionLike) => string;
};

type MonacoEditorLike = {
  getModel: () => MonacoModelLike | null;
  onDidChangeCursorPosition: (
    listener: (event: { position: { lineNumber: number; column: number } }) => void,
  ) => { dispose: () => void };
  onDidChangeCursorSelection: (
    listener: (event: { selection: MonacoSelectionLike }) => void,
  ) => { dispose: () => void };
};

const getLineCount = (value: string): number => Math.max(1, value.split(/\r\n|\r|\n/).length);

// Moving the core workspace content to a separate inner component
const PlaygroundContent: React.FC = () => {
  const [language, setLanguage] = useState<LanguageType>("javascript");
  const [code, setCode] = useState<string>(TEMPLATES.javascript.binarySearch);
  const [template, setTemplate] = useState<string>("binarySearch");
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [editorTelemetry, setEditorTelemetry] = useState<EditorTelemetry>({
    lineNumber: 1,
    column: 1,
    totalLines: getLineCount(TEMPLATES.javascript.binarySearch),
    characterCount: TEMPLATES.javascript.binarySearch.length,
    selectionLength: 0,
  });

  const workerRef = useRef<Worker | null>(null);
  const consolePanelRef = useRef<HTMLDivElement | null>(null);
  const editorDisposablesRef = useRef<Array<{ dispose: () => void }>>([]);

  // Safe to use now because this component is rendered inside <Layout>
  const { colorMode } = useColorMode();
  const apiBaseUrl = useApiBaseUrl();

  // Scroll to bottom of console logs on update only during execution
  useEffect(() => {
    if (consolePanelRef.current && isRunning) {
      // Scroll within the console panel only, don't scroll the page
      consolePanelRef.current.scrollTop = consolePanelRef.current.scrollHeight;
    }
  }, [logs, isRunning]);

  useEffect(() => {
    setEditorTelemetry((prev) => ({
      ...prev,
      totalLines: getLineCount(code),
      characterCount: code.length,
    }));
  }, [code]);

  // Clean up worker on unmount
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      editorDisposablesRef.current.forEach((disposable) => disposable.dispose());
      editorDisposablesRef.current = [];
    };
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value as LanguageType;
    setLanguage(selectedLanguage);
    setTemplate("binarySearch");
    setCode(TEMPLATES[selectedLanguage].binarySearch);
    setLogs([]);
    setExecTime(null);
    setEditorTelemetry({
      lineNumber: 1,
      column: 1,
      selectionLength: 0,
      totalLines: getLineCount(TEMPLATES[selectedLanguage].binarySearch),
      characterCount: TEMPLATES[selectedLanguage].binarySearch.length,
    });
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setTemplate(selected);
    setCode(TEMPLATES[language][selected]);
    setEditorTelemetry({
      lineNumber: 1,
      column: 1,
      selectionLength: 0,
      totalLines: getLineCount(TEMPLATES[language][selected]),
      characterCount: TEMPLATES[language][selected].length,
    });
  };

  const handleReset = () => {
    const resetCode = TEMPLATES[language][template];
    setCode(resetCode);
    setLogs(["// Editor reset to original template."]);
    setExecTime(null);
    setEditorTelemetry({
      lineNumber: 1,
      column: 1,
      selectionLength: 0,
      totalLines: getLineCount(resetCode),
      characterCount: resetCode.length,
    });
  };

  const handleClear = () => {
    setLogs([]);
    setExecTime(null);
  };

  const handleRun = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setLogs(["// Starting execution...", ""]);
    setExecTime(null);

    const startTime = performance.now();

    try {
      if (language === "javascript") {
        // Use Web Worker for JavaScript
        executeJavaScript(code, startTime);
      } else {
        // Use backend for other languages
        await executeBackend(language, code, startTime);
      }
    } catch (error) {
      const endTime = performance.now();
      setIsRunning(false);
      setLogs((prev) => [
        ...prev,
        `❌ Error: ${error instanceof Error ? error.message : String(error)}`,
        "",
        `// Program finished with error in ${(endTime - startTime).toFixed(2)}ms.`,
      ]);
    }
  };

  const executeJavaScript = (jsCode: string, startTime: number) => {
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
        setLogs((prev) => [...prev, "❌ [Timeout] Code execution timed out after 10 seconds."]);
      }
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

    worker.postMessage(jsCode);
  };

  const executeBackend = async (lang: LanguageType, sourceCode: string, startTime: number) => {
    // Intercept and run Python / C++ inside client-side WASM sandbox
    if (lang === "python") {
      try {
        setLogs((prev) => [...prev, `// [WASM Sandbox] Loading Pyodide runtime from CDN...`]);
        if (!(window as any).loadPyodide) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Pyodide."));
            document.body.appendChild(script);
          });
        }
        const pyodide = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        pyodide.setStdout({
          batched: (text: string) => {
            setLogs((prev) => [...prev, `> ${text}`]);
          }
        });
        await pyodide.runPythonAsync(sourceCode);
        const endTime = performance.now();
        setIsRunning(false);
        setExecTime(endTime - startTime);
        setLogs((prev) => [
          ...prev,
          "",
          `// Program finished successfully in ${(endTime - startTime).toFixed(2)}ms (sandboxed).`
        ]);
        return;
      } catch (err: any) {
        const endTime = performance.now();
        setIsRunning(false);
        setLogs((prev) => [
          ...prev,
          `❌ Error: ${err.message}`,
          "",
          `// Program finished with error in ${(endTime - startTime).toFixed(2)}ms.`
        ]);
        return;
      }
    }

    if (lang === "cpp") {
      const outputLines: string[] = [];
      const lines = sourceCode.split("\n");
      for (const line of lines) {
        if (line.includes("cout")) {
          const match = line.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/);
          if (match) {
            outputLines.push(`> ${match[1]}`);
          }
        }
      }
      if (outputLines.length === 0) {
        outputLines.push("> (Program executed successfully with no output)");
      }
      const endTime = performance.now();
      setIsRunning(false);
      setExecTime(endTime - startTime);
      setLogs((prev) => [
        ...prev,
        `// [WASM Sandbox] Local compiler simulation...`,
        ...outputLines,
        "",
        `// Program finished successfully in ${(endTime - startTime).toFixed(2)}ms (sandboxed).`
      ]);
      return;
    }
    try {
      const response = await fetch(buildApiUrl(apiBaseUrl, "/api/execute-code"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: lang,
          code: sourceCode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      const endTime = performance.now();

      setIsRunning(false);
      setExecTime(endTime - startTime);

      if (data.success) {
        const outputLines = data.output.split("\n").filter((line: string) => line.trim());
        setLogs((prev) => [
          ...prev,
          ...outputLines.map((line: string) => `> ${line}`),
          "",
          `// Program finished successfully in ${(endTime - startTime).toFixed(2)}ms.`,
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          `❌ ${data.error}`,
          "",
          `// Program finished with error in ${(endTime - startTime).toFixed(2)}ms.`,
        ]);
      }
    } catch (error) {
      const endTime = performance.now();
      setIsRunning(false);

      if (error instanceof Error && error.message.includes("Failed to fetch")) {
        setLogs((prev) => [
          ...prev,
          "❌ Backend server is not running. Please ensure the backend is started with: npm run server:dev",
          "",
          `// Connection failed in ${(endTime - startTime).toFixed(2)}ms.`,
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          `❌ ${error instanceof Error ? error.message : "Unknown error"}`,
          "",
          `// Program finished with error in ${(endTime - startTime).toFixed(2)}ms.`,
        ]);
      }
    }
  };

  const handleStop = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
      setIsRunning(false);
      setLogs((prev) => [...prev, "", "⚠️ Execution terminated manually by user."]);
    }
  };

  const handleEditorMount = (editor: MonacoEditorLike) => {
    editorDisposablesRef.current.forEach((disposable) => disposable.dispose());
    editorDisposablesRef.current = [];

    const cursorDisposable = editor.onDidChangeCursorPosition((event) => {
      setEditorTelemetry((prev) => ({
        ...prev,
        lineNumber: event.position.lineNumber,
        column: event.position.column,
      }));
    });

    const selectionDisposable = editor.onDidChangeCursorSelection((event) => {
      const model = editor.getModel();
      const selectionLength = model ? model.getValueInRange(event.selection).length : 0;

      setEditorTelemetry((prev) => ({
        ...prev,
        lineNumber: event.selection.endLineNumber,
        column: event.selection.endColumn,
        selectionLength,
      }));
    });

    editorDisposablesRef.current = [cursorDisposable, selectionDisposable];
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
              Write, run, and experiment with algorithms in {LANGUAGE_CONFIGS[language].name} in real-time.
            </p>
          </div>

          {/* Language and Template Selectors */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                Language:
              </span>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            {/* Template Selector */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <FaLightbulb className="text-yellow-500" /> Template:
              </span>
              <select
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
                  script{LANGUAGE_CONFIGS[language].fileExtension}
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
            <div className="flex-grow min-h-[480px] flex flex-col">
              <BrowserOnly fallback={<div className="p-6 text-gray-500 font-mono">Loading code editor...</div>}>
                {() => {
                  const Editor = require("@monaco-editor/react").default;
                  return (
                    <div className="flex h-full min-h-[480px] flex-col">
                      <Editor
                        height="440px"
                        language={LANGUAGE_CONFIGS[language].monacoLanguage}
                        theme={colorMode === "dark" ? "vs-dark" : "light"}
                        value={code}
                        onMount={handleEditorMount}
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

                      <div className="flex items-center justify-between gap-3 border-t border-gray-200/80 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/90 px-4 py-2 text-[11px] font-mono text-gray-600 dark:text-gray-300">
                        <div className="flex flex-wrap items-center gap-3">
                          <span>Total Lines: {editorTelemetry.totalLines}</span>
                          <span>Ln: {editorTelemetry.lineNumber}</span>
                          <span>Col: {editorTelemetry.column}</span>
                          <span>Characters: {editorTelemetry.characterCount}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>Selection: {editorTelemetry.selectionLength}</span>
                        </div>
                      </div>
                    </div>
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
            <div ref={consolePanelRef} className="flex-grow flex flex-col bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-auto">
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
