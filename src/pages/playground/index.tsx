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
  FaPython,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
    if (!swapped) break;
  }
  return arr;
}

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
  const [activeTab, setActiveTab] = useState<"sandbox" | "python" | "benchmark">("sandbox");

  // JS Sandbox State
  const [language, setLanguage] = useState<LanguageType>("javascript");
  const [code, setCode] = useState<string>(TEMPLATES.javascript.binarySearch);
  const [template, setTemplate] = useState<string>("binarySearch");
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [execTime, setExecTime] = useState<number | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const consolePanelRef = useRef<HTMLDivElement | null>(null);

  // Python WASM State
  const [pyCode, setPyCode] = useState<string>(PYTHON_TEMPLATE);
  const [pyLogs, setPyLogs] = useState<string[]>([]);
  const [isPyRunning, setIsPyRunning] = useState<boolean>(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState<boolean>(false);

  // Benchmark State
  const [benchmarkSize, setBenchmarkSize] = useState<number>(1000);
  const [isBenchmarking, setIsBenchmarking] = useState<boolean>(false);
  const [benchmarkData, setBenchmarkData] = useState<any[]>([]);

  const consoleEndRef = useRef<HTMLDivElement | null>(null);
  const pyConsoleEndRef = useRef<HTMLDivElement | null>(null);
  const { colorMode } = useColorMode();
  const apiBaseUrl = useApiBaseUrl();

  // Scroll to bottom helper
  useEffect(() => {
    if (activeTab === "sandbox" && consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeTab === "python" && pyConsoleEndRef.current) {
      pyConsoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, pyLogs, activeTab]);
  // Scroll to bottom of console logs on update only during execution
  useEffect(() => {
    if (consolePanelRef.current && isRunning) {
      // Scroll within the console panel only, don't scroll the page
      consolePanelRef.current.scrollTop = consolePanelRef.current.scrollHeight;
    }
  }, [logs, isRunning]);

  useEffect(() => {
    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

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

    // Use array join for safe code transfer — avoids breakage when user code contains backticks
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
      // Intercept stdout
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

  // ── Tab 3: ALGORITHM BENCHMARKER (WEB WORKERS) ──────────────
  const runBenchmark = () => {
    if (isBenchmarking) return;
    setIsBenchmarking(true);
    setBenchmarkData([]);

    const sizes = [100, 500, 1000, 2000, 5000];
    const dataPoints: any[] = [];

    // Helper algorithms for benchmark
    const bubbleSortStr = `
      function bubbleSort(arr) {
        let len = arr.length;
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
              let temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
            }
          }
        }
      }
    `;

    const insertionSortStr = `
      function insertionSort(arr) {
        let len = arr.length;
        for (let i = 1; i < len; i++) {
          let key = arr[i];
          let j = i - 1;
          while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
          }
          arr[j + 1] = key;
        }
      }
    `;

    const quickSortStr = `
      function quickSort(arr, left = 0, right = arr.length - 1) {
        if (left < right) {
          let pivotIndex = partition(arr, left, right);
          quickSort(arr, left, pivotIndex - 1);
          quickSort(arr, pivotIndex + 1, right);
        }
        return arr;
      }
      function partition(arr, left, right) {
        let pivot = arr[right];
        let i = left - 1;
        for (let j = left; j < right; j++) {
          if (arr[j] < pivot) {
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
        let temp = arr[i + 1];
        arr[i + 1] = arr[right];
        arr[right] = temp;
        return i + 1;
      }
    `;

    const benchmarkWorkerCode = `
      ${bubbleSortStr}
      ${insertionSortStr}
      ${quickSortStr}

      self.onmessage = function(e) {
        const sizes = e.data;
        const results = [];

        sizes.forEach(size => {
          // Generate same arrays
          const baseArray = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));

          // 1. Bubble Sort
          const arrBubble = [...baseArray];
          const t0 = performance.now();
          bubbleSort(arrBubble);
          const timeBubble = performance.now() - t0;

          // 2. Insertion Sort
          const arrInsertion = [...baseArray];
          const t1 = performance.now();
          insertionSort(arrInsertion);
          const timeInsertion = performance.now() - t1;

          // 3. Quick Sort
          const arrQuick = [...baseArray];
          const t2 = performance.now();
          quickSort(arrQuick);
          const timeQuick = performance.now() - t2;

          results.push({
            size,
            "Bubble Sort (O(N^2))": parseFloat(timeBubble.toFixed(2)),
            "Insertion Sort (O(N^2))": parseFloat(timeInsertion.toFixed(2)),
            "Quick Sort (O(N log N))": parseFloat(timeQuick.toFixed(2))
          });
        });

        self.postMessage(results);
      };
    `;

    const blob = new Blob([benchmarkWorkerCode], { type: "text/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = (e) => {
      setBenchmarkData(e.data);
      setIsBenchmarking(false);
      worker.terminate();
    };

    worker.postMessage(sizes);
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
          <button
            onClick={() => setActiveTab("benchmark")}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all border-none flex items-center gap-2 ${
              activeTab === "benchmark"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-white hover:bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            }`}
          >
            <FaChartLine className="text-green-500" /> Visual Benchmarker
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
<<<<<<< HEAD
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
                <div className="flex-grow p-4 overflow-y-auto font-mono text-sm text-gray-300 space-y-1 bg-black">
                  {logs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>
=======
>>>>>>> upstream/main
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

        {/* ── TAB 3: ALGORITHM BENCHMARKER (REAL-TIME CHART) ────────── */}
        {activeTab === "benchmark" && (
          <div className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaCogs className="text-green-500" /> Time Complexity Analyzer (Web Workers)
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Run standard sorting algorithms on random arrays of sizes `N = 100` up to `N = 5000` inside background Web Workers to prevent main thread freezing.
                </p>
              </div>
              <button
                onClick={runBenchmark}
                disabled={isBenchmarking}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold border-none cursor-pointer transition transform active:scale-95 flex items-center gap-2 shrink-0 shadow-md"
              >
                <FaPlay /> {isBenchmarking ? "Computing..." : "Start Benchmark"}
              </button>
            </div>

            {/* Line Chart Panel */}
            <div className="h-[450px] bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/40">
              {isBenchmarking ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                    Executing algorithms in parallel Web Workers...
                  </span>
                </div>
              ) : benchmarkData.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
                  <FaChartLine className="text-4xl text-slate-300 dark:text-slate-700" />
                  <span className="text-sm text-slate-400">
                    No benchmark data available. Click "Start Benchmark" to record times.
                  </span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="size" stroke="#94a3b8" label={{ value: "Array Size (N)", position: "bottom", offset: 0 }} />
                    <YAxis stroke="#94a3b8" label={{ value: "Execution Time (ms)", angle: -90, position: "left", offset: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "1rem", border: "1px solid #334155" }} />
                    <Legend />
                    <Line type="monotone" dataKey="Bubble Sort (O(N^2))" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Insertion Sort (O(N^2))" stroke="#f59e0b" strokeWidth={3} />
                    <Line type="monotone" dataKey="Quick Sort (O(N log N))" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              )}
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
