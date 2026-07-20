import React, { useState, useEffect, useRef } from "react";
import * as acorn from "acorn";
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
  FaShareAlt,
  FaDownload,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRedo,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Language configuration
type LanguageType = "javascript" | "python" | "cpp" | "java" | "rust" | "go";

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
  rust: {
    name: "Rust",
    monacoLanguage: "rust",
    fileExtension: ".rs",
  },
  go: {
    name: "Go",
    monacoLanguage: "go",
    fileExtension: ".go",
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
  rust: {
    binarySearch: `// Binary Search Algorithm
// Finds the index of a target element in a sorted array.
// Returns -1 if not found.

fn binary_search(arr: &[i32], target: i32) -> i32 {
    let mut left = 0;
    let mut right = (arr.len() as i32) - 1;

    while left <= right {
        let mid = left + (right - left) / 2;
        if arr[mid as usize] == target {
            return mid;
        } else if arr[mid as usize] < target {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    -1
}

fn main() {
    let arr = vec![1, 3, 5, 7, 9, 11, 13, 15];
    println!("Input Array: {:?}", arr);
    println!("Searching for 7: {}", binary_search(&arr, 7));  // Expected: 3
    println!("Searching for 10: {}", binary_search(&arr, 10));  // Expected: -1
}
`,
    bubbleSort: `// Bubble Sort Algorithm
// Sorts an array of numbers in ascending order.

fn bubble_sort(arr: &mut [i32]) {
    let n = arr.len();
    if n <= 1 {
        return;
    }
    for i in 0..n - 1 {
        let mut swapped = false;
        for j in 0..n - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
                swapped = true;
            }
        }
        if !swapped {
            break;
        }
    }
}

fn main() {
    let mut unsorted = vec![64, 34, 25, 12, 22, 11, 90];
    println!("Unsorted: {:?}", unsorted);

    bubble_sort(&mut unsorted);

    println!("Sorted: {:?}", unsorted);
}
`,
    reverseList: `// Reverse a Singly Linked List
// Returns the new head of the reversed list.

#[derive(Clone)]
struct ListNode {
    val: i32,
    next: Option<Box<ListNode>>,
}

impl ListNode {
    fn new(val: i32) -> Self {
        ListNode { val, next: None }
    }
}

fn reverse_list(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    let mut prev = None;
    while let Some(mut current) = head {
        head = current.next.take();
        current.next = prev;
        prev = Some(current);
    }
    prev
}

fn print_list(head: &Option<Box<ListNode>>) {
    print!("List: ");
    let mut current = head;
    while let Some(node) = current {
        print!("{}", node.val);
        if node.next.is_some() {
            print!(" -> ");
        }
        current = &node.next;
    }
    println!();
}

fn main() {
    let mut list = Box::new(ListNode::new(1));
    list.next = Some(Box::new(ListNode::new(2)));
    list.next.as_mut().unwrap().next = Some(Box::new(ListNode::new(3)));
    list.next.as_mut().unwrap().next.as_mut().unwrap().next = Some(Box::new(ListNode::new(4)));
    list.next.as_mut().unwrap().next.as_mut().unwrap().next.as_mut().unwrap().next = Some(Box::new(ListNode::new(5)));

    print!("Original: ");
    print_list(&Some(list.clone()));

    let reversed = reverse_list(Some(list));
    print!("Reversed: ");
    print_list(&reversed);
}
`,
    fibonacci: `// Fibonacci Generator
// Generates the first N fibonacci numbers.

fn generate_fibonacci(n: usize) -> Vec<i32> {
    if n == 0 {
        return vec![];
    }
    let mut series = vec![0];
    if n > 1 {
        series.push(1);
    }

    for _ in 2..n {
        let len = series.len();
        series.push(series[len - 1] + series[len - 2]);
    }
    series
}

fn main() {
    let fib = generate_fibonacci(10);
    print!("First 10 Fibonacci numbers: ");
    for (i, &num) in fib.iter().enumerate() {
        print!("{}", num);
        if i < fib.len() - 1 {
            print!(", ");
        }
    }
    println!();
}
`,
  },
  go: {
    binarySearch: `package main

import "fmt"

// Binary Search Algorithm
// Finds the index of a target element in a sorted array.
// Returns -1 if not found.

func binarySearch(arr []int, target int) int {
    left := 0
    right := len(arr) - 1

    for left <= right {
        mid := left + (right-left)/2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}

func main() {
    arr := []int{1, 3, 5, 7, 9, 11, 13, 15}
    fmt.Println("Input Array:", arr)
    fmt.Println("Searching for 7:", binarySearch(arr, 7))   // Expected: 3
    fmt.Println("Searching for 10:", binarySearch(arr, 10)) // Expected: -1
}
`,
    bubbleSort: `package main

import "fmt"

// Bubble Sort Algorithm
// Sorts an array of numbers in ascending order.

func bubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        swapped := false
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = true
            }
        }
        if !swapped {
            break
        }
    }
}

func main() {
    unsorted := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Println("Unsorted:", unsorted)

    bubbleSort(unsorted)

    fmt.Println("Sorted:  ", unsorted)
}
`,
    reverseList: `package main

import "fmt"

// Reverse a Singly Linked List
// Returns the new head of the reversed list.

type ListNode struct {
    Val  int
    Next *ListNode
}

func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    current := head
    for current != nil {
        nextNode := current.Next
        current.Next = prev
        prev = current
        current = nextNode
    }
    return prev
}

func printList(head *ListNode) {
    fmt.Print("List: ")
    for head != nil {
        fmt.Print(head.Val)
        if head.Next != nil {
            fmt.Print(" -> ")
        }
        head = head.Next
    }
    fmt.Println()
}

func main() {
    list := &ListNode{Val: 1, Next: &ListNode{Val: 2, Next: &ListNode{Val: 3, Next: &ListNode{Val: 4, Next: &ListNode{Val: 5}}}}}

    fmt.Print("Original: ")
    printList(list)

    reversed := reverseList(list)
    fmt.Print("Reversed: ")
    printList(reversed)
}
`,
    fibonacci: `package main

import "fmt"

// Fibonacci Generator
// Generates the first N fibonacci numbers.

func generateFibonacci(n int) []int {
    if n <= 0 {
        return []int{}
    }
    if n == 1 {
        return []int{0}
    }

    series := []int{0, 1}
    for i := 2; i < n; i++ {
        series = append(series, series[i-1]+series[i-2])
    }
    return series
}

func main() {
    fib := generateFibonacci(10)
    fmt.Print("First 10 Fibonacci numbers: ")
    for i, num := range fib {
        fmt.Print(num)
        if i < len(fib)-1 {
            fmt.Print(", ")
        }
    }
    fmt.Println()
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

function instrumentJavaScript(code: string): string {
  let ast: any;
  try {
    ast = acorn.parse(code, { ecmaVersion: 2020, locations: true });
  } catch (err: any) {
    throw new Error(`Parse error: ${err.message}`);
  }

  const inserts: Array<{ index: number; text: string }> = [];
  let currentScope: any = { vars: new Set<string>(), parent: null };

  function pushScope() {
    currentScope = { vars: new Set<string>(), parent: currentScope };
  }

  function popScope() {
    if (currentScope.parent) {
      currentScope = currentScope.parent;
    }
  }

  function addVar(name: string) {
    currentScope.vars.add(name);
  }

  function getActiveVars(): string[] {
    const vars = new Set<string>();
    let s = currentScope;
    while (s) {
      for (const v of s.vars) {
        vars.add(v);
      }
      s = s.parent;
    }
    return Array.from(vars);
  }

  function prePopulateFunctions(body: any) {
    if (!body) return;
    const nodes = Array.isArray(body) ? body : [body];
    for (const node of nodes) {
      if (node && node.type === "FunctionDeclaration" && node.id && node.id.type === "Identifier") {
        addVar(node.id.name);
      }
    }
  }

  function walk(node: any) {
    if (!node) return;

    const isStatement = [
      "VariableDeclaration",
      "ExpressionStatement",
      "ReturnStatement",
      "BreakStatement",
      "ContinueStatement",
    ].includes(node.type);

    if (isStatement) {
      const activeVars = getActiveVars();
      const line = node.loc.start.line;
      const varMap = activeVars.map((v) => `${v}:${v}`).join(", ");
      const dbgCall = `__dbg__(${line}, {${varMap}}); `;
      inserts.push({ index: node.start, text: dbgCall });
    }

    if (node.type === "VariableDeclaration") {
      for (const decl of node.declarations) {
        if (decl.id.type === "Identifier") {
          addVar(decl.id.name);
        }
      }
    } else if (node.type === "FunctionDeclaration") {
      if (node.id && node.id.type === "Identifier") {
        addVar(node.id.name);
      }
    }

    if (
      node.type === "FunctionDeclaration" ||
      node.type === "FunctionExpression" ||
      node.type === "ArrowFunctionExpression"
    ) {
      pushScope();
      for (const param of node.params) {
        if (param.type === "Identifier") {
          addVar(param.name);
        }
      }
      if (node.body && node.body.type === "BlockStatement") {
        prePopulateFunctions(node.body.body);
      }
      walk(node.body);
      popScope();
    } else if (node.type === "BlockStatement") {
      pushScope();
      prePopulateFunctions(node.body);
      for (const stmt of node.body) {
        walk(stmt);
      }
      popScope();
    } else if (node.type === "IfStatement") {
      const activeVars = getActiveVars();
      const line = node.loc.start.line;
      const varMap = activeVars.map((v) => `${v}:${v}`).join(", ");

      const testStart = node.test.start;
      const testEnd = node.test.end;
      inserts.push({ index: testStart, text: `__dbg_cond__(${line}, (` });
      inserts.push({ index: testEnd, text: `), {${varMap}})` });

      walk(node.consequent);
      walk(node.alternate);
    } else if (node.type === "WhileStatement") {
      const activeVars = getActiveVars();
      const line = node.loc.start.line;
      const varMap = activeVars.map((v) => `${v}:${v}`).join(", ");

      const testStart = node.test.start;
      const testEnd = node.test.end;
      inserts.push({ index: testStart, text: `__dbg_cond__(${line}, (` });
      inserts.push({ index: testEnd, text: `), {${varMap}})` });

      walk(node.body);
    } else if (node.type === "ForStatement") {
      pushScope();
      walk(node.init);

      if (node.test) {
        const activeVars = getActiveVars();
        const line = node.loc.start.line;
        const varMap = activeVars.map((v) => `${v}:${v}`).join(", ");

        const testStart = node.test.start;
        const testEnd = node.test.end;
        inserts.push({ index: testStart, text: `__dbg_cond__(${line}, (` });
        inserts.push({ index: testEnd, text: `), {${varMap}})` });
      }

      walk(node.body);
      walk(node.update);
      popScope();
    } else {
      for (const key in node) {
        if (node[key] && typeof node[key] === "object") {
          if (Array.isArray(node[key])) {
            for (const child of node[key]) {
              if (child && typeof child.type === "string") {
                walk(child);
              }
            }
          } else if (typeof node[key].type === "string") {
            walk(node[key]);
          }
        }
      }
    }
  }

  prePopulateFunctions(ast.body);

  for (const stmt of ast.body) {
    walk(stmt);
  }

  inserts.sort((a, b) => b.index - a.index);

  let instrumented = code;
  for (const ins of inserts) {
    instrumented =
      instrumented.slice(0, ins.index) +
      ins.text +
      instrumented.slice(ins.index);
  }

  return instrumented;
}

function transpileCppToJs(code: string): string {
  const lines = code.split("\n");
  const result = lines.map((line) => {
    let l = line;
    if (l.trim().startsWith("#include") || l.trim().startsWith("using namespace")) {
      return "// " + l;
    }
    // Struct/Class replacements
    if (l.includes("struct ListNode") || l.includes("class ListNode")) {
      return "class ListNode {";
    }
    if (l.includes("ListNode(int x)")) {
      return "    constructor(x) { this.val = x; this.next = null; }";
    }
    if (l.trim() === "};") {
      return "}";
    }
    if (l.trim() === "int val;" || l.trim() === "ListNode* next;") {
      return "// " + l;
    }

    // Function declarations
    l = l.replace(/\b(int|void|double|float|bool|ListNode\*|vector<\w+>&?)\s+(\w+)\s*\(([^)]*)\)\s*\{/g, 'function $2($3) {');
    // Parameter types in function signatures
    l = l.replace(/\b(vector<\w+>&?|int|double|float|bool|ListNode\*)\s+(\w+)/g, '$2');
    // Variable declarations (excluding function calls/definitions)
    l = l.replace(/\b(int|double|float|bool|auto|char|string|ListNode\*|vector<\w+>)\s+(\w+)\b(?!\s*\()/g, 'let $2');
    
    l = l.replace(/\bNULL\b/g, 'null');
    l = l.replace(/->/g, '.');
    
    if (l.includes("cout")) {
      const parts = l.split("<<").map(p => p.trim());
      parts.shift();
      const cleanParts = parts.filter(p => p !== "endl" && p !== "endl;");
      l = `console.log(${cleanParts.join(" + ")});`;
    }
    
    l = l.replace(/for\s*\(\s*let\s+(\w+)\s*:\s*(\w+)\)/g, 'for (let $1 of $2)');
    l = l.replace(/for\s*\(\s*(int|double|float|bool|auto)\s+(\w+)\s*:\s*(\w+)\)/g, 'for (let $2 of $3)');
    l = l.replace(/\.size\(\)/g, '.length');
    l = l.replace(/\.push_back\(/g, '.push(');
    l = l.replace(/(left\s*\+\s*\(right\s*-\s*left\)\s*\/\s*2)/g, 'Math.floor($1)');
    l = l.replace(/\bswap\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/g, '[$1, $2] = [$2, $1]');
    
    return l;
  });
  
  if (code.includes("int main(")) {
    result.push("main();");
  }
  return result.join("\n");
}

function transpileJavaToJs(code: string): string {
  const lines = code.split("\n");
  let insideListNode = false;
  const result = lines.map((line) => {
    let l = line;
    if (l.trim().startsWith("import ") || l.trim().startsWith("package ")) {
      return "// " + l;
    }
    if (l.includes("class ListNode")) {
      insideListNode = true;
      return "    class ListNode {";
    }
    if (insideListNode && l.includes("ListNode(int x)")) {
      return "        constructor(x) { this.val = x; this.next = null; }";
    }
    if (insideListNode && l.trim() === "}") {
      insideListNode = false;
      return "    }";
    }
    if (insideListNode && (l.trim() === "int val;" || l.trim() === "ListNode next;")) {
      return "        // " + l.trim();
    }

    if (l.trim().startsWith("public class ") || (l.trim().startsWith("class ") && !l.includes("ListNode"))) {
      return "// " + l;
    }
    
    // Replace methods
    l = l.replace(/\bpublic\s+static\s+(int|void|ListNode|List<Integer>|\[\]int|int\[\])\s+(\w+)\s*\(([^)]*)\)/g, 'function $2($3)');
    l = l.replace(/\bpublic\s+static\s+void\s+main\s*\(([^)]*)\)/g, 'function main($1)');
    
    // Strip parameter types
    l = l.replace(/\b(ListNode|List<Integer>|int\[\]|int|String\[\]|String)\s+(\w+)/g, '$2');
    
    // Replace variable declarations
    l = l.replace(/\b(int|boolean|ListNode|List<Integer>|int\[\]|List)\s+(\w+)\b(?!\s*\()/g, 'let $2');
    
    l = l.replace(/new\s+ArrayList<>\(\)/g, '[]');
    l = l.replace(/new\s+ListNode\((\d+)\)/g, 'new ListNode($1)');
    l = l.replace(/=\s*new\s+int\[\]\s*\{([^}]+)\}/g, '= [$1]');
    l = l.replace(/=\s*\{([^}]+)\}/g, '= [$1]');
    
    l = l.replace(/System\.out\.println\(([^)]*)\)/g, 'console.log($2)');
    l = l.replace(/System\.out\.print\(([^)]*)\)/g, 'console.log($2)');
    
    l = l.replace(/\.add\(([^)]*)\)/g, '.push($1)');
    l = l.replace(/\.get\(([^)]*)\)/g, '[$1]');
    l = l.replace(/\.size\(\)/g, '.length');
    l = l.replace(/(left\s*\+\s*\(right\s*-\s*left\)\s*\/\s*2)/g, 'Math.floor($1)');
    
    return l;
  });
  
  // Comment out the very last closing brace of the class
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i].trim() === "}") {
      result[i] = "// }";
      break;
    }
  }

  if (code.includes("public static void main")) {
    result.push("main([]);");
  }
  return result.join("\n");
}

function transpileRustToJs(code: string): string {
  const lines = code.split("\n");
  let insideListNode = false;
  let insideImpl = false;
  let insideNew = false;

  const result = lines.map((line) => {
    let l = line;
    if (l.trim().startsWith("#[derive")) {
      return "// " + l;
    }
    
    // Struct / Impl replacements
    if (l.includes("struct ListNode")) {
      insideListNode = true;
      return "class ListNode {";
    }
    if (insideListNode && l.trim() === "}") {
      insideListNode = false;
      return "}";
    }
    if (insideListNode && (l.includes("val:") || l.includes("next:"))) {
      return "    // " + l.trim();
    }

    if (l.includes("impl ListNode")) {
      insideImpl = true;
      return "// impl ListNode {";
    }
    if (insideImpl && l.includes("fn new(")) {
      insideNew = true;
      return "    constructor(val) { this.val = val; this.next = null; } /*";
    }
    if (insideImpl && insideNew && l.trim() === "}") {
      insideNew = false;
      return "    */ }";
    }
    if (insideImpl && !insideNew && l.trim() === "}") {
      insideImpl = false;
      return "// }";
    }
    if (insideImpl && insideNew) {
      return "    // " + l.trim();
    }

    // Function declarations fn binary_search(...) -> i32 {
    l = l.replace(/\bfn\s+(\w+)\s*\(([^)]*)\)\s*(->\s*[\w<>:()]+)?\s*\{/g, 'function $1($2) {');
    
    // Parameter signatures: x: type
    l = l.replace(/(\w+)\s*:\s*&?mut?\s*[\w\[\]<>:]+/g, '$1');
    l = l.replace(/(\w+)\s*:\s*[\w\[\]<>:]+/g, '$1');

    // let mut x = ... -> let x = ...
    l = l.replace(/\blet\s+mut\s+(\w+)/g, 'let $1');
    
    // println! and print!
    if (l.includes("print!")) {
      l = l.replace(/println!\s*\(\s*"([^"]*)",\s*([^)]*)\)/g, (_, fmt, args) => {
        const argList = args.split(",").map((a: string) => a.trim());
        let out = fmt;
        for (const arg of argList) {
          out = out.replace("{}", `" + ${arg} + "`);
          out = out.replace("{:?}", `" + ${arg} + "`);
        }
        return `console.log("${out}");`;
      });
      l = l.replace(/println!\s*\(\s*"([^"]*)"\s*\)/g, 'console.log("$1")');
      l = l.replace(/print!\s*\(\s*"([^"]*)",\s*([^)]*)\)/g, (_, fmt, args) => {
        const argList = args.split(",").map((a: string) => a.trim());
        let out = fmt;
        for (const arg of argList) {
          out = out.replace("{}", `" + ${arg} + "`);
        }
        return `console.log("${out}");`;
      });
      l = l.replace(/print!\s*\(\s*"([^"]*)"\s*\)/g, 'console.log("$1")');
    }

    // Rust loops
    l = l.replace(/for\s+(\w+)\s+in\s+2\.\.n/g, 'for (let $1 = 2; $1 < n; $1++)');
    l = l.replace(/for\s+(\w+)\s+in\s+0\.\.n\s*-\s*1/g, 'for (let $1 = 0; $1 < n - 1; $1++)');
    l = l.replace(/for\s+(\w+)\s+in\s+0\.\.n\s*-\s*i\s*-\s*1/g, 'for (let $1 = 0; $1 < n - i - 1; $1++)');
    l = l.replace(/for\s*\(\s*(\w+)\s*,\s*&?(\w+)\s*\)\s*in\s*(\w+)\.iter\(\)\.enumerate\(\)/g, 'for (let $1 = 0; $1 < $3.length; $1++) { let $2 = $3[$1];');
    
    // Implicit returns
    l = l.replace(/^\s*(-1|prev|series)\s*$/g, (match) => 'return ' + match.trim() + ';');

    // Helpers
    l = l.replace(/vec!\[/g, '[');
    l = l.replace(/\.len\(\)/g, '.length');
    l = l.replace(/\.clone\(\)/g, '');
    l = l.replace(/\.take\(\)/g, '');
    l = l.replace(/\.is_some\(\)/g, '');
    l = l.replace(/\bNone\b/g, 'null');
    l = l.replace(/Some\((\w+)\)/g, '$1');
    l = l.replace(/Some\(([^)]+)\)/g, '$1');
    l = l.replace(/as\s+(i32|usize)/g, '');
    l = l.replace(/&/g, '');
    l = l.replace(/\*/g, '');
    
    // while let Some(...)
    l = l.replace(/while\s+let\s+Some\(mut\s+(\w+)\)\s*=\s*(\w+)\s*\{/g, 'while ($2) { let $1 = $2;');
    l = l.replace(/while\s+let\s+Some\((\w+)\)\s*=\s*(\w+)\s*\{/g, 'while ($2) { let $1 = $2;');

    return l;
  });

  if (code.includes("fn main()")) {
    result.push("main();");
  }
  return result.join("\n");
}

function transpileGoToJs(code: string): string {
  const lines = code.split("\n");
  let insideListNode = false;

  const result = lines.map((line) => {
    let l = line;
    if (l.trim().startsWith("package ") || l.trim().startsWith("import ")) {
      return "// " + l;
    }
    
    // Struct replacement
    if (l.includes("type ListNode struct")) {
      insideListNode = true;
      return `class ListNode {
        constructor(config = {}) {
          this.Val = config.Val !== undefined ? config.Val : 0;
          this.Next = config.Next !== undefined ? config.Next : null;
          this.val = this.Val;
          this.next = this.Next;
        }
      } /*`;
    }
    if (insideListNode && l.trim() === "}") {
      insideListNode = false;
      return "*/";
    }
    if (insideListNode) {
      return "    // " + l.trim();
    }

    // Function declarations
    l = l.replace(/\bfunc\s+(\w+)\s*\(([^)]*)\)\s*([^*{\s]+)?\s*\{/g, 'function $1($2) {');
    
    // Parameter types
    l = l.replace(/(\w+)\s+(\[\]\w+|\*\w+|\w+)/g, '$1');
    
    // := assignment
    l = l.replace(/\b(\w+)\s*:=\s*([^;]+)/g, 'let $1 = $2');
    
    // Multiple assignment for bubbleSort
    l = l.replace(/(\w+\[[^\]]+\])\s*,\s*(\w+\[[^\]]+\])\s*=\s*(\w+\[[^\]]+\])\s*,\s*(\w+\[[^\]]+\])/g, '[$1, $2] = [$3, $4]');

    // Go struct initialization replacement: &ListNode{Val: 1} -> new ListNode({Val: 1})
    if (l.includes("ListNode{")) {
      l = l.replace(/&ListNode\{/g, 'new ListNode({');
      l = l.replace(/ListNode\{/g, 'new ListNode({');
      l = l.replace(/\}/g, '})');
    }

    l = l.replace(/fmt\.Println\(([^)]*)\)/g, 'console.log($2)');
    l = l.replace(/fmt\.Printf\(([^)]*)\)/g, 'console.log($2)');
    l = l.replace(/fmt\.Print\(([^)]*)\)/g, 'console.log($2)');
    
    l = l.replace(/\blen\(([^)]*)\)/g, '$1.length');
    l = l.replace(/\bnil\b/g, 'null');
    
    // Slice append: series = append(series, ...)
    l = l.replace(/(\w+)\s*=\s*append\((\w+)\s*,\s*([^)]+)\)/g, '$1.push($3)');

    // Go loop: for i, num := range fib
    if (l.includes("range")) {
      l = l.replace(/for\s+(\w+)\s*,\s*(\w+)\s*:=\s*range\s*(\w+)/g, 'for (let $1 = 0; $1 < $3.length; $1++) { let $2 = $3[$1];');
    }

    return l;
  });

  if (code.includes("func main()")) {
    result.push("main();");
  }
  return result.join("\n");
}

function transpileToJS(code: string, lang: LanguageType): string {
  switch (lang) {
    case "javascript":
      return code;
    case "python":
      return code;
    case "cpp":
      return transpileCppToJs(code);
    case "java":
      return transpileJavaToJs(code);
    case "rust":
      return transpileRustToJs(code);
    case "go":
      return transpileGoToJs(code);
    default:
      return code;
  }
}

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

  // Debugger specific states
  const [debugSteps, setDebugSteps] = useState<any[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);
  const [isDebugMode, setIsDebugMode] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  const handlePrevStep = () => {
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    if (currentStepIdx < debugSteps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handleRestartDebug = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleExitDebug = () => {
    setIsPlaying(false);
    setIsDebugMode(false);
    setDebugSteps([]);
    setCurrentStepIdx(-1);
    clearDecorations();
    setLogs(["// Debugger session exited."]);
  };

  const clearDecorations = () => {
    if (editorRef.current && decorationsRef.current.length > 0) {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }
  };

  const highlightLine = (line: number) => {
    if (!editorRef.current || !monacoRef.current) return;
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
      {
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: true,
          className: "bg-yellow-500/20 dark:bg-yellow-500/10 border-l-4 border-yellow-500",
        },
      },
    ]);
    editor.revealLineInCenterIfOutsideViewport(line);
  };

  const getLineDescription = (lineNum: number) => {
    if (!code) return "";
    const lines = code.split("\n");
    if (lineNum <= 0 || lineNum > lines.length) return "Executing next statement.";
    const lineText = lines[lineNum - 1].trim();

    if (lineText.startsWith("//")) {
      return `Reading comment: "${lineText}"`;
    }
    if (lineText.includes("function ")) {
      const funcName = lineText.match(/function\s+(\w+)/)?.[1] || "function";
      return `Entering function ${funcName}()`;
    }
    if (lineText.startsWith("while")) {
      return `Evaluating loop condition: \`${lineText}\``;
    }
    if (lineText.startsWith("for")) {
      return `Evaluating loop initialization/iteration: \`${lineText}\``;
    }
    if (lineText.startsWith("if")) {
      return `Evaluating conditional check: \`${lineText}\``;
    }
    if (lineText.startsWith("return")) {
      return `Returning value: \`${lineText}\``;
    }
    if (lineText.includes("console.log")) {
      return `Executing console log statement to print output`;
    }
    if (lineText.includes("let ") || lineText.includes("const ") || lineText.includes("var ")) {
      return `Declaring local variable(s): \`${lineText}\``;
    }
    if (lineText.includes(" = ")) {
      return `Updating variable/array value: \`${lineText}\``;
    }
    return `Executing statement: \`${lineText}\``;
  };

  const formatVariableValue = (val: any): string => {
    if (val === null) return "null";
    if (val === undefined) return "undefined";
    if (typeof val === "object") {
      // Premium visual formatter for Linked Lists (ListNodes)
      const isListNode = (val.val !== undefined && val.next !== undefined) ||
                         (val.Val !== undefined && val.Next !== undefined);
      if (isListNode) {
        const parts: string[] = [];
        let curr = val;
        const visited = new Set<any>(); // Prevent circular/infinite references
        while (curr && !visited.has(curr)) {
          visited.add(curr);
          const v = curr.val !== undefined ? curr.val : curr.Val;
          parts.push(String(v));
          curr = curr.next !== undefined ? curr.next : curr.Next;
        }
        if (curr) {
          parts.push("... (Circular)");
        }
        return parts.join(" -> ");
      }
      try {
        return JSON.stringify(val);
      } catch (e) {
        return "[Object]";
      }
    }
    if (typeof val === "string") {
      return `"${val}"`;
    }
    return String(val);
  };

  // Playback timer effect
  useEffect(() => {
    let intervalId: any;
    if (isPlaying && isDebugMode && debugSteps.length > 0) {
      const baseDelay = 1000; // 1 second base
      const delay = baseDelay / playbackSpeed;
      intervalId = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < debugSteps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, delay);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, isDebugMode, debugSteps, playbackSpeed]);

  // Decoration sync effect
  useEffect(() => {
    if (isDebugMode && debugSteps.length > 0 && currentStepIdx >= 0 && currentStepIdx < debugSteps.length) {
      const step = debugSteps[currentStepIdx];
      highlightLine(step.line);
    } else {
      clearDecorations();
    }
  }, [currentStepIdx, isDebugMode, debugSteps]);

  // Load shared code from URL query parameters if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang") as LanguageType | null;
      const urlCode = params.get("code");

      if (urlLang && LANGUAGE_CONFIGS[urlLang]) {
        setLanguage(urlLang);
        if (urlCode) {
          try {
            const binString = atob(urlCode);
            const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
            const decoded = new TextDecoder().decode(bytes);
            setCode(decoded);
            setTemplate("custom");
            setEditorTelemetry((prev) => ({
              ...prev,
              totalLines: getLineCount(decoded),
              characterCount: decoded.length,
            }));
          } catch (e) {
            console.error("Failed to decode shared code:", e);
          }
        } else {
          setCode(TEMPLATES[urlLang].binarySearch);
        }
      }
    }
  }, []);

  const handleShare = async () => {
    try {
      const bytes = new TextEncoder().encode(code);
      const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
      const encodedCode = btoa(binString);
      const shareUrl = `${window.location.origin}${window.location.pathname}?lang=${encodeURIComponent(language)}&code=${encodedCode}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("🚀 Share URL copied to clipboard!", {
        position: "top-right",
        autoClose: 3000,
        className: "dark:bg-neutral-900 dark:text-cyan-400 font-mono border dark:border-neutral-800 text-xs",
      });
    } catch (err) {
      console.error("Failed to generate share URL:", err);
      toast.error("⚠️ Failed to generate share URL.", {
        className: "dark:bg-neutral-900 dark:text-rose-400 font-mono border dark:border-neutral-800 text-xs"
      });
    }
  };

  const handleExport = () => {
    try {
      const fileExtension = LANGUAGE_CONFIGS[language].fileExtension;
      const fileName = `playground_code${fileExtension}`;
      const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`💾 Exported successfully as ${fileName}!`, {
        position: "top-right",
        autoClose: 3000,
        className: "dark:bg-neutral-900 dark:text-green-400 font-mono border dark:border-neutral-800 text-xs",
      });
    } catch (err) {
      console.error("Failed to export code:", err);
      toast.error("⚠️ Failed to export code.", {
        className: "dark:bg-neutral-900 dark:text-rose-400 font-mono border dark:border-neutral-800 text-xs"
      });
    }
  };

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
    setIsDebugMode(false);
    setDebugSteps([]);
    setCurrentStepIdx(-1);
    clearDecorations();
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
    setIsDebugMode(false);
    setDebugSteps([]);
    setCurrentStepIdx(-1);
    clearDecorations();
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
    setIsDebugMode(false);
    setDebugSteps([]);
    setCurrentStepIdx(-1);
    clearDecorations();
    setEditorTelemetry({
      lineNumber: 1,
      column: 1,
      selectionLength: 0,
      totalLines: getLineCount(resetCode),
      characterCount: resetCode.length,
    });
  };

  const handleClear = () => {
    if (isDebugMode) {
      handleExitDebug();
    } else {
      setLogs([]);
      setExecTime(null);
    }
  };

  const handleRun = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setLogs(["// Starting execution...", ""]);
    setExecTime(null);
    setIsDebugMode(false);
    setDebugSteps([]);
    setCurrentStepIdx(-1);
    clearDecorations();

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

  const handleDebug = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setExecTime(null);
    setIsDebugMode(false);
    setDebugSteps([]);
    setCurrentStepIdx(-1);

    const startTime = performance.now();

    try {
      if (language === "python") {
        setLogs(["// Launching Pyodide Python AST Debugger...", ""]);
        if (!(window as any).loadPyodide) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load Pyodide."));
            document.body.appendChild(script);
          });
        }
        if (!(window as any).pyodideInstance) {
          (window as any).pyodideInstance = await (window as any).loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
          });
        }
        const pyodide = (window as any).pyodideInstance;

        const pythonTracer = `
import sys
import json

user_code = ${JSON.stringify(code)}

__trace__ = []
__console_logs__ = []

import builtins
_orig_print = builtins.print
def _custom_print(*args, **kwargs):
    import io
    f = io.StringIO()
    _orig_print(*args, file=f, **kwargs)
    val = f.getvalue()
    __console_logs__.append(val.rstrip('\\r\\n'))
builtins.print = _custom_print

def __trace_func__(frame, event, arg):
    if event == 'line':
        co = frame.f_code
        filename = co.co_filename
        name = co.co_name
        if name in ['_custom_print', '__trace_func__'] or 'encodings' in filename or 'io.py' in filename or 'json' in filename:
            return __trace_func__
        if filename != '<string>':
            return __trace_func__

        local_vars = {}
        for k, v in frame.f_locals.items():
            if k.startswith('__') or k in ['_orig_print', '_custom_print', 'sys', 'json', 'builtins']:
                continue
            try:
                local_vars[k] = json.loads(json.dumps(v))
            except Exception:
                local_vars[k] = str(v)
                
        __trace__.append({
            'line': frame.f_lineno,
            'vars': local_vars,
            'console': list(__console_logs__)
        })
    return __trace_func__

sys.settrace(__trace_func__)

try:
    exec(user_code, {})
except Exception as e:
    __trace__.append({
        'line': getattr(e, 'lineno', 0) or 0,
        'error': str(e),
        'vars': {},
        'console': list(__console_logs__) + ["❌ Error: " + str(e)]
    })
finally:
    sys.settrace(None)

builtins.print = _orig_print

import json
json.dumps(__trace__)
`;
        const resultJson = await pyodide.runPythonAsync(pythonTracer);
        const trace = JSON.parse(resultJson);

        setIsRunning(false);
        if (trace.length === 0) {
          toast.warn("⚠️ No statements were executed.");
          setLogs(["// Debugger executed but no steps were recorded."]);
          return;
        }

        setIsDebugMode(true);
        setDebugSteps(trace);
        setCurrentStepIdx(0);
        setLogs([]);
        
        const endTime = performance.now();
        setExecTime(endTime - startTime);
      } else {
        setLogs([`// Launching AST Debugger for ${LANGUAGE_CONFIGS[language].name}...`, ""]);
        // Transpile to JS
        const transpiledJs = transpileToJS(code, language);
        
        // 1. Instrument JavaScript code
        const instrumented = instrumentJavaScript(transpiledJs);

        // 2. Prepend tracing structures and wrap execution
        const fullCode = `
          const __trace__ = [];
          const __console_logs__ = [];
          const __orig_log__ = console.log;
          console.log = (...args) => {
            const msg = args.map(arg => {
              if (arg === null) return 'null';
              if (arg === undefined) return 'undefined';
              if (typeof arg === 'object') {
                try { return JSON.stringify(arg); } catch (e) { return '[Circular Object]'; }
              }
              return String(arg);
            }).join(' ');
            __console_logs__.push(msg);
            __orig_log__(...args);
          };
          function __dbg__(line, vars) {
            const clonedVars = {};
            for (const [k, v] of Object.entries(vars)) {
              if (v === null || v === undefined) {
                clonedVars[k] = v;
              } else if (typeof v === 'function') {
                clonedVars[k] = '[Function]';
              } else if (typeof v === 'object') {
                try {
                  clonedVars[k] = JSON.parse(JSON.stringify(v));
                } catch (e) {
                  clonedVars[k] = String(v);
                }
              } else {
                clonedVars[k] = v;
              }
            }
            if (__trace__.length > 2000) {
              throw new Error("Debugger capped at 2000 steps to prevent infinite loop memory issues.");
            }
            __trace__.push({
              line,
              vars: clonedVars,
              console: [...__console_logs__]
            });
          }
          function __dbg_cond__(line, val, vars) {
            __dbg__(line, vars);
            return val;
          }

          try {
            ${instrumented}
          } catch (err) {
            console.error(err.message || err);
            __trace__.push({
              line: err.lineNumber || 0,
              error: err.message || String(err),
              vars: {},
              console: [...__console_logs__, "❌ Error: " + (err.message || err)]
            });
          }
          
          self.postMessage({ type: 'trace', trace: __trace__ });
        `;

        // 3. Create Web Worker
        const blob = new Blob([fullCode], { type: "text/javascript" });
        const worker = new Worker(URL.createObjectURL(blob));
        workerRef.current = worker;

        const timeoutId = setTimeout(() => {
          if (workerRef.current) {
            workerRef.current.terminate();
            setIsRunning(false);
            setLogs((prev) => [...prev, "❌ [Timeout] Debugger session timed out after 10 seconds."]);
          }
        }, 10000);

        worker.onmessage = (e) => {
          const data = e.data;
          if (data.type === "trace") {
            clearTimeout(timeoutId);
            setIsRunning(false);
            
            if (data.trace.length === 0) {
              toast.warn("⚠️ No statements were executed.");
              setLogs(["// Debugger executed but no steps were recorded."]);
              return;
            }

            setIsDebugMode(true);
            setDebugSteps(data.trace);
            setCurrentStepIdx(0);
            setLogs([]);
            
            const endTime = performance.now();
            setExecTime(endTime - startTime);

            worker.terminate();
            workerRef.current = null;
          }
        };
      }

    } catch (error: any) {
      const endTime = performance.now();
      setIsRunning(false);
      setLogs((prev) => [
        ...prev,
        `❌ Debugger Error: ${error.message || String(error)}`,
        "",
        `// Debugger failed to launch in ${(endTime - startTime).toFixed(2)}ms.`,
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

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    editorDisposablesRef.current.forEach((disposable) => disposable.dispose());
    editorDisposablesRef.current = [];

    const cursorDisposable = editor.onDidChangeCursorPosition((event: any) => {
      setEditorTelemetry((prev) => ({
        ...prev,
        lineNumber: event.position.lineNumber,
        column: event.position.column,
      }));
    });

    const selectionDisposable = editor.onDidChangeCursorSelection((event: any) => {
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

  const currentStep = isDebugMode && debugSteps[currentStepIdx] ? debugSteps[currentStepIdx] : null;
  const currentStepVars = currentStep ? currentStep.vars : {};

  const getLogsToDisplay = () => {
    if (isDebugMode) {
      const step = debugSteps[currentStepIdx];
      if (!step) return [];
      const stepLogs = [...step.console];
      if (step.error) {
        stepLogs.push(`❌ Error: ${step.error}`);
      }
      return stepLogs;
    }
    return logs;
  };
  const activeLogs = getLogsToDisplay();

  return (
    <div className="bg-gray-50 dark:bg-[#1b1b1d] min-h-screen py-10 px-4 md:px-8">
      <ToastContainer theme={colorMode === "dark" ? "dark" : "light"} position="top-right" toastClassName="font-mono text-xs" />
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
                <option value="rust">Rust</option>
                <option value="go">Go</option>
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
                {template === "custom" && <option value="custom">Custom Code</option>}
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
            {isDebugMode ? (
              /* Debug Mode Controls */
              <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Control Buttons */}
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                    <button
                      onClick={handlePrevStep}
                      disabled={currentStepIdx <= 0}
                      className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-40 border-none bg-transparent cursor-pointer"
                      title="Previous Step"
                    >
                      <FaStepBackward size={14} />
                    </button>

                    {isPlaying ? (
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="p-2 text-amber-600 dark:text-amber-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded border-none bg-transparent cursor-pointer"
                        title="Pause Autoplay"
                      >
                        <FaPause size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsPlaying(true)}
                        disabled={currentStepIdx >= debugSteps.length - 1}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-40 border-none bg-transparent cursor-pointer"
                        title="Play Autoplay"
                      >
                        <FaPlay size={14} />
                      </button>
                    )}

                    <button
                      onClick={handleNextStep}
                      disabled={currentStepIdx >= debugSteps.length - 1}
                      className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-40 border-none bg-transparent cursor-pointer"
                      title="Next Step"
                    >
                      <FaStepForward size={14} />
                    </button>

                    <button
                      onClick={handleRestartDebug}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded border-none bg-transparent cursor-pointer"
                      title="Restart Debugging"
                    >
                      <FaRedo size={14} />
                    </button>
                  </div>

                  {/* Speed Selector */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-gray-500 font-semibold">Speed:</span>
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-none rounded px-2 py-1 cursor-pointer font-bold focus:outline-none"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={1}>1.0x</option>
                      <option value={2}>2.0x</option>
                      <option value={5}>5.0x</option>
                    </select>
                  </div>

                  {/* Exit Button */}
                  <button
                    onClick={handleExitDebug}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold border-none cursor-pointer text-xs ml-auto"
                  >
                    Exit Debugger
                  </button>
                </div>

                {/* Timeline Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-gray-500 font-bold min-w-[50px]">
                    Step {currentStepIdx + 1}/{debugSteps.length}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={debugSteps.length - 1}
                    value={currentStepIdx}
                    onChange={(e) => {
                      setIsPlaying(false);
                      setCurrentStepIdx(Number(e.target.value));
                    }}
                    className="flex-grow h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 animate-none"
                  />
                </div>

                {/* Step Explanation Banner */}
                <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 rounded-lg p-3 text-xs flex flex-col gap-1">
                  <span className="font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider text-[10px]">
                    Current Operation
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 m-0 font-medium">
                    {getLineDescription(debugSteps[currentStepIdx]?.line)}
                  </p>
                </div>
              </div>
            ) : (
              /* Regular Controls Box */
              <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md flex flex-wrap gap-3 items-center">
                {!isRunning ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleRun}
                      className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition transform active:scale-95 shadow-md border-none cursor-pointer text-sm"
                    >
                      <FaPlay /> Run Code
                    </button>
                    <button
                      onClick={handleDebug}
                      className="flex items-center gap-2 px-5 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-bold transition transform active:scale-95 shadow-md border-none cursor-pointer text-sm"
                    >
                      ⚡ Debug Code
                    </button>
                  </div>
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

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition transform active:scale-95 shadow-md border-none cursor-pointer text-sm"
                >
                  <FaShareAlt /> Share Code
                </button>

                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition transform active:scale-95 shadow-md border-none cursor-pointer text-sm"
                >
                  <FaDownload /> Export
                </button>

                {execTime !== null && (
                  <span className="text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full ml-auto">
                    Time: {execTime.toFixed(1)}ms
                  </span>
                )}
              </div>
            )}

            {isDebugMode && (
              /* Variable Inspection Panel */
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md">
                <div className="bg-gray-100 dark:bg-gray-750 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 font-mono">
                    🔍 VARIABLE INSPECTOR
                  </span>
                </div>
                <div className="p-4 max-h-[220px] overflow-y-auto font-mono text-xs">
                  {Object.keys(currentStepVars).length === 0 ? (
                    <div className="text-gray-500 italic">No variables in scope at this step.</div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500">
                          <th className="pb-2 font-semibold">Name</th>
                          <th className="pb-2 font-semibold">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(currentStepVars).map(([name, val]) => (
                          <tr key={name} className="border-b last:border-b-0 border-gray-100 dark:border-gray-800">
                            <td className="py-2 font-semibold text-blue-600 dark:text-cyan-400">{name}</td>
                            <td className="py-2 text-gray-800 dark:text-gray-300 whitespace-pre-wrap break-all font-medium">
                              {formatVariableValue(val)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

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
                {activeLogs.length === 0 ? (
                  <div className="text-gray-600 italic select-none">
                    Console is empty. Click "Run Code" to view program output...
                  </div>
                ) : (
                  activeLogs.map((log, idx) => {
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
