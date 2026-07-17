export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface SortingChallenge {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: "Sorting";
  timeLimit: string;
  description: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  starterCode: string;
  starterCodes?: Record<string, string>;
  solution: string;
  pseudocode?: string[];
  testCases: TestCase[];
  timeComplexity: string;
  spaceComplexity: string;
  hint: string;
}

const SORTING_CHALLENGES: SortingChallenge[] = [
  // ─── Beginner (Easy) ────────────────────────────────────────────────────────
  {
    id: "so-01",
    title: "Implement Bubble Sort",
    slug: "bubble-sort",
    difficulty: "Easy",
    category: "Sorting",
    timeLimit: "15 min",
    description: "Write a function that takes in an array of integers and returns a sorted version of that array using the Bubble Sort algorithm.\n\nBubble Sort works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    examples: [
      { input: "arr = [8, 5, 2, 9, 5, 6, 3]", output: "[2, 3, 5, 5, 6, 8, 9]", explanation: "The array is sorted in ascending order." }
    ],
    constraints: ["1 <= arr.length <= 1000", "-10^4 <= arr[i] <= 10^4"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function bubbleSort(arr) {
  // Write your code here
  
}`,
    starterCodes: {
      python: `def bubble_sort(arr):
    # Write your code here
    pass
`,
      cpp: `#include <vector>
using namespace std;

vector<int> bubbleSort(vector<int>& arr) {
    // Write your code here
    return arr;
}
`
    },
    solution: `function bubbleSort(arr) {
  let isSorted = false;
  let counter = 0;
  
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < arr.length - 1 - counter; i++) {
      if (arr[i] > arr[i + 1]) {
        // Swap
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        isSorted = false;
      }
    }
    counter++;
  }
  
  return arr;
}`,
    testCases: [
      { input: "arr = [8,5,2,9,5,6,3]", expected: "[2,3,5,5,6,8,9]", description: "Standard unsorted array" },
      { input: "arr = [1,2,3]", expected: "[1,2,3]", description: "Already sorted array" }
    ],
    timeComplexity: "O(N^2) — double loop over the array in the worst/average case.",
    spaceComplexity: "O(1) — sorts in place.",
    hint: "Use a boolean flag to keep track of whether any swaps were made in the current pass. If no swaps were made, the array is sorted!"
  },
  {
    id: "so-02",
    title: "Implement Selection Sort",
    slug: "selection-sort",
    difficulty: "Easy",
    category: "Sorting",
    timeLimit: "15 min",
    description: "Write a function that takes in an array of integers and returns a sorted version of that array using the Selection Sort algorithm.\n\nSelection sort divides the input list into two parts: a sorted sublist of items which is built up from left to right, and a sublist of the remaining unsorted items. It proceeds by finding the smallest element in the unsorted sublist, exchanging it with the leftmost unsorted element, and moving the sublist boundaries one element to the right.",
    examples: [
      { input: "arr = [8, 5, 2, 9, 5, 6, 3]", output: "[2, 3, 5, 5, 6, 8, 9]", explanation: "The array is sorted in ascending order." }
    ],
    constraints: ["1 <= arr.length <= 1000", "-10^4 <= arr[i] <= 10^4"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function selectionSort(arr) {
  // Write your code here
  
}`,
    solution: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    
    // Find the minimum element in unsorted array
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
  
  return arr;
}`,
    testCases: [
      { input: "arr = [8,5,2,9,5,6,3]", expected: "[2,3,5,5,6,8,9]", description: "Standard unsorted array" },
      { input: "arr = [9,8,7,6,5]", expected: "[5,6,7,8,9]", description: "Reverse sorted array" }
    ],
    timeComplexity: "O(N^2) — nested loops to find the minimum in the remaining array.",
    spaceComplexity: "O(1) — sorts in place.",
    hint: "For each position, find the index of the minimum element in the rest of the array, then swap."
  },
  {
    id: "so-03",
    title: "Implement Insertion Sort",
    slug: "insertion-sort",
    difficulty: "Easy",
    category: "Sorting",
    timeLimit: "15 min",
    description: "Write a function that takes in an array of integers and returns a sorted version of that array using the Insertion Sort algorithm.\n\nInsertion sort iterates, consuming one input element each repetition, and grows a sorted output list. At each iteration, it removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.",
    examples: [
      { input: "arr = [8, 5, 2, 9, 5, 6, 3]", output: "[2, 3, 5, 5, 6, 8, 9]", explanation: "The array is sorted in ascending order." }
    ],
    constraints: ["1 <= arr.length <= 1000", "-10^4 <= arr[i] <= 10^4"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function insertionSort(arr) {
  // Write your code here
  
}`,
    solution: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    
    // Shift elements to the right to make room for the current element
    while (j > 0 && arr[j] < arr[j - 1]) {
      // Swap
      let temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      j--;
    }
  }
  
  return arr;
}`,
    testCases: [
      { input: "arr = [8,5,2,9,5,6,3]", expected: "[2,3,5,5,6,8,9]", description: "Standard unsorted array" },
      { input: "arr = [5]", expected: "[5]", description: "Single element" }
    ],
    timeComplexity: "O(N^2) worst case, but O(N) if the array is already sorted.",
    spaceComplexity: "O(1) — sorts in place.",
    hint: "Assume the first element is sorted. Take the next element and shift it to the left until it is in its correct sorted position."
  },
  {
    id: "so-04",
    title: "Sort an Array",
    slug: "sort-an-array",
    difficulty: "Easy",
    category: "Sorting",
    timeLimit: "15 min",
    description: "Given an array of integers nums, sort the array in ascending order and return it.\n\nYou must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.",
    examples: [
      { input: "nums = [5,2,3,1]", output: "[1,2,3,5]", explanation: "After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5)." }
    ],
    constraints: ["1 <= nums.length <= 5 * 10^4", "-5 * 10^4 <= nums[i] <= 5 * 10^4"],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArray(nums) {
  // Write your code here
  
}`,
    solution: `function sortArray(nums) {
  // Using Merge Sort for O(N log N) guarantee
  if (nums.length <= 1) return nums;
  
  const mid = Math.floor(nums.length / 2);
  const left = sortArray(nums.slice(0, mid));
  const right = sortArray(nums.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    testCases: [
      { input: "nums = [5,2,3,1]", expected: "[1,2,3,5]", description: "Small array" },
      { input: "nums = [5,1,1,2,0,0]", expected: "[0,0,1,1,2,5]", description: "Array with duplicates" }
    ],
    timeComplexity: "O(N log N) — standard merge sort complexity.",
    spaceComplexity: "O(N) — auxiliary arrays created during merge.",
    hint: "Use a divide and conquer algorithm like Merge Sort or Heap Sort to achieve the O(N log N) time limit."
  },
  {
    id: "so-05",
    title: "Check if an Array is Sorted",
    slug: "check-array-sorted",
    difficulty: "Easy",
    category: "Sorting",
    timeLimit: "10 min",
    description: "Given an array of size n, write a program to check if the given array is sorted in strictly increasing order or not.\n\nReturn true if it is, otherwise false.",
    examples: [
      { input: "arr = [10, 20, 30, 40, 50]", output: "true", explanation: "The array is strictly increasing." },
      { input: "arr = [10, 20, 30, 30, 50]", output: "false", explanation: "It is not strictly increasing because 30 appears twice." }
    ],
    constraints: ["1 <= arr.length <= 10^5", "-10^9 <= arr[i] <= 10^9"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {boolean}
 */
function isSorted(arr) {
  // Write your code here
  
}`,
    solution: `function isSorted(arr) {
  if (arr.length <= 1) return true;
  
  for (let i = 1; i < arr.length; i++) {
    // Check if previous element is greater or equal
    if (arr[i - 1] >= arr[i]) {
      return false;
    }
  }
  
  return true;
}`,
    testCases: [
      { input: "arr = [10, 20, 30, 40, 50]", expected: "true", description: "Strictly sorted" },
      { input: "arr = [10, 20, 30, 30, 50]", expected: "false", description: "Not strictly sorted (duplicates)" }
    ],
    timeComplexity: "O(N) — iterating through the array once.",
    spaceComplexity: "O(1) — constant extra space.",
    hint: "Iterate through the array and check if any element is less than or equal to the previous element."
  },
  // ─── Intermediate (Medium) ──────────────────────────────────────────────────
  {
    id: "so-06",
    title: "Implement Merge Sort",
    slug: "merge-sort",
    difficulty: "Medium",
    category: "Sorting",
    timeLimit: "25 min",
    description: "Write a function that takes in an array of integers and returns a sorted version of that array using the Merge Sort algorithm.\n\nMerge sort works by continuously dividing the array in half until it cannot be further divided. This means that if the array becomes empty or has only one element left, the dividing will stop, i.e. it is the base case to stop the recursion. If the array has multiple elements, split the array into halves and recursively invoke the merge sort on each of the halves. Finally, when both halves are sorted, the merge operation is applied.",
    examples: [
      { input: "arr = [8, 5, 2, 9, 5, 6, 3]", output: "[2, 3, 5, 5, 6, 8, 9]", explanation: "The array is sorted in ascending order." }
    ],
    constraints: ["1 <= arr.length <= 10^5", "-10^4 <= arr[i] <= 10^4"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function mergeSort(arr) {
  // Write your code here
  
}`,
    solution: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const leftHalf = arr.slice(0, mid);
  const rightHalf = arr.slice(mid);
  
  return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

function merge(left, right) {
  const sorted = [];
  let i = 0;
  let j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      sorted.push(left[i]);
      i++;
    } else {
      sorted.push(right[j]);
      j++;
    }
  }
  
  while (i < left.length) sorted.push(left[i++]);
  while (j < right.length) sorted.push(right[j++]);
  
  return sorted;
}`,
    testCases: [
      { input: "arr = [8,5,2,9,5,6,3]", expected: "[2,3,5,5,6,8,9]", description: "Standard unsorted array" },
      { input: "arr = [10,-2,3,-1]", expected: "[-2,-1,3,10]", description: "With negative numbers" }
    ],
    timeComplexity: "O(N log N) — arrays are split logarithmically and merged linearly.",
    spaceComplexity: "O(N) — extra space for the merged arrays.",
    hint: "Write a helper function `merge(left, right)` that takes two sorted arrays and merges them into a single sorted array. Then recursively call mergeSort on the left and right halves."
  },
  {
    id: "so-07",
    title: "Implement Quick Sort",
    slug: "quick-sort",
    difficulty: "Medium",
    category: "Sorting",
    timeLimit: "30 min",
    description: "Write a function that takes in an array of integers and returns a sorted version of that array using the Quick Sort algorithm.\n\nQuick Sort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways.",
    examples: [
      { input: "arr = [8, 5, 2, 9, 5, 6, 3]", output: "[2, 3, 5, 5, 6, 8, 9]", explanation: "The array is sorted in ascending order." }
    ],
    constraints: ["1 <= arr.length <= 10^5", "-10^4 <= arr[i] <= 10^4"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function quickSort(arr) {
  // Write your code here
  
}`,
    solution: `function quickSort(arr) {
  quickSortHelper(arr, 0, arr.length - 1);
  return arr;
}

function quickSortHelper(arr, startIdx, endIdx) {
  if (startIdx >= endIdx) return;
  
  // Choose the first element as pivot (or random/middle to avoid worst-case)
  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  
  while (rightIdx >= leftIdx) {
    if (arr[leftIdx] > arr[pivotIdx] && arr[rightIdx] < arr[pivotIdx]) {
      swap(leftIdx, rightIdx, arr);
    }
    if (arr[leftIdx] <= arr[pivotIdx]) leftIdx++;
    if (arr[rightIdx] >= arr[pivotIdx]) rightIdx--;
  }
  
  swap(pivotIdx, rightIdx, arr);
  
  const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (leftSubarrayIsSmaller) {
    quickSortHelper(arr, startIdx, rightIdx - 1);
    quickSortHelper(arr, rightIdx + 1, endIdx);
  } else {
    quickSortHelper(arr, rightIdx + 1, endIdx);
    quickSortHelper(arr, startIdx, rightIdx - 1);
  }
}

function swap(i, j, arr) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}`,
    testCases: [
      { input: "arr = [8,5,2,9,5,6,3]", expected: "[2,3,5,5,6,8,9]", description: "Standard unsorted array" },
      { input: "arr = [1,2,3,4,5]", expected: "[1,2,3,4,5]", description: "Already sorted array" }
    ],
    timeComplexity: "O(N log N) on average, O(N^2) in the worst case (e.g. sorted array with poor pivot).",
    spaceComplexity: "O(log N) — recursion stack depth.",
    hint: "Pick a pivot. Use two pointers to partition the array so that everything smaller than the pivot is on its left, and everything larger is on its right. Then recursively sort the left and right subarrays."
  },
  {
    id: "so-08",
    title: "Implement Heap Sort",
    slug: "heap-sort",
    difficulty: "Medium",
    category: "Sorting",
    timeLimit: "30 min",
    description: "Write a function that takes in an array of integers and returns a sorted version of that array using the Heap Sort algorithm.\n\nHeap sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining elements.",
    examples: [
      { input: "arr = [8, 5, 2, 9, 5, 6, 3]", output: "[2, 3, 5, 5, 6, 8, 9]", explanation: "The array is sorted in ascending order." }
    ],
    constraints: ["1 <= arr.length <= 10^5", "-10^4 <= arr[i] <= 10^4"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function heapSort(arr) {
  // Write your code here
  
}`,
    solution: `function heapSort(arr) {
  buildMaxHeap(arr);
  for (let endIdx = arr.length - 1; endIdx > 0; endIdx--) {
    swap(0, endIdx, arr);
    siftDown(0, endIdx - 1, arr);
  }
  return arr;
}

function buildMaxHeap(arr) {
  const firstParentIdx = Math.floor((arr.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(currentIdx, arr.length - 1, arr);
  }
}

function siftDown(currentIdx, endIdx, heap) {
  let childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
    let idxToSwap;
    if (childTwoIdx !== -1 && heap[childTwoIdx] > heap[childOneIdx]) {
      idxToSwap = childTwoIdx;
    } else {
      idxToSwap = childOneIdx;
    }
    
    if (heap[idxToSwap] > heap[currentIdx]) {
      swap(currentIdx, idxToSwap, heap);
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      return;
    }
  }
}

function swap(i, j, arr) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}`,
    testCases: [
      { input: "arr = [8,5,2,9,5,6,3]", expected: "[2,3,5,5,6,8,9]", description: "Standard unsorted array" },
      { input: "arr = [3,2,1]", expected: "[1,2,3]", description: "Reverse sorted" }
    ],
    timeComplexity: "O(N log N) — building the heap takes O(N) and sifting down elements takes O(N log N).",
    spaceComplexity: "O(1) — sorts in place.",
    hint: "First, build a max-heap from the array. Then, repeatedly swap the root (max element) with the last element and sift down the new root to restore the heap property."
  },
  {
    id: "so-09",
    title: "Sort Colors",
    slug: "sort-colors",
    difficulty: "Medium",
    category: "Sorting",
    timeLimit: "25 min",
    description: "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function.",
    examples: [
      { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]", explanation: "The 0s, 1s, and 2s are grouped together." },
      { input: "nums = [2,0,1]", output: "[0,1,2]", explanation: "The elements are sorted." }
    ],
    constraints: ["n == nums.length", "1 <= n <= 300", "nums[i] is either 0, 1, or 2."],
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortColors(nums) {
  // Write your code here
  
}`,
    solution: `function sortColors(nums) {
  // Dutch National Flag Algorithm
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;
  
  while (mid <= high) {
    if (nums[mid] === 0) {
      // Swap nums[low] and nums[mid]
      let temp = nums[low];
      nums[low] = nums[mid];
      nums[mid] = temp;
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else if (nums[mid] === 2) {
      // Swap nums[mid] and nums[high]
      let temp = nums[mid];
      nums[mid] = nums[high];
      nums[high] = temp;
      high--;
    }
  }
  
  return nums;
}`,
    testCases: [
      { input: "nums = [2,0,2,1,1,0]", expected: "[0,0,1,1,2,2]", description: "Standard case" },
      { input: "nums = [2,0,1]", expected: "[0,1,2]", description: "One of each" }
    ],
    timeComplexity: "O(N) — Single pass using three pointers.",
    spaceComplexity: "O(1) — Sorts in place.",
    hint: "Use three pointers: low, mid, and high. Move mid through the array and swap 0s to the low end and 2s to the high end."
  },
  {
    id: "so-10",
    title: "Merge Two Sorted Arrays",
    slug: "merge-two-sorted-arrays",
    difficulty: "Medium",
    category: "Sorting",
    timeLimit: "25 min",
    description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\n\nMerge nums1 and nums2 into a single array sorted in non-decreasing order. The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n.",
    examples: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]", explanation: "The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6]." }
    ],
    constraints: ["nums1.length == m + n", "nums2.length == n", "0 <= m, n <= 200", "-10^9 <= nums1[i], nums2[j] <= 10^9"],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {number[]} Return nums1 after modification
 */
function mergeSortedArrays(nums1, m, nums2, n) {
  // Write your code here
  
}`,
    solution: `function mergeSortedArrays(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;
  
  // Traverse backwards to avoid overwriting elements in nums1
  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }
  
  // If there are leftover elements in nums2
  while (p2 >= 0) {
    nums1[p] = nums2[p2];
    p2--;
    p--;
  }
  
  return nums1;
}`,
    testCases: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", expected: "[1,2,2,3,5,6]", description: "Standard merge" },
      { input: "nums1 = [1], m = 1, nums2 = [], n = 0", expected: "[1]", description: "Second array empty" }
    ],
    timeComplexity: "O(m + n) — traversing both arrays once.",
    spaceComplexity: "O(1) — merging in-place.",
    hint: "Start filling the array from the end (index m + n - 1) by comparing the largest elements of both arrays."
  },
  {
    id: "so-11",
    title: "Kth Largest Element in an Array",
    slug: "kth-largest-element",
    difficulty: "Medium",
    category: "Sorting",
    timeLimit: "30 min",
    description: "Given an integer array nums and an integer k, return the kth largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.\n\nCan you solve it without sorting?",
    examples: [
      { input: "nums = [3,2,1,5,6,4], k = 2", output: "5", explanation: "The sorted array is [1,2,3,4,5,6]. The 2nd largest element is 5." },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4", explanation: "The sorted array is [1,2,2,3,3,4,5,5,6]. The 4th largest element is 4." }
    ],
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
  // Write your code here
  
}`,
    solution: `function findKthLargest(nums, k) {
  // Quickselect approach
  const targetIdx = nums.length - k;
  
  function quickSelect(left, right) {
    const pivot = nums[right];
    let p = left;
    
    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        // Swap nums[p] and nums[i]
        const temp = nums[p];
        nums[p] = nums[i];
        nums[i] = temp;
        p++;
      }
    }
    
    // Swap pivot to its correct position
    const temp = nums[p];
    nums[p] = nums[right];
    nums[right] = temp;
    
    if (p > targetIdx) {
      return quickSelect(left, p - 1);
    } else if (p < targetIdx) {
      return quickSelect(p + 1, right);
    } else {
      return nums[p];
    }
  }
  
  return quickSelect(0, nums.length - 1);
}`,
    testCases: [
      { input: "nums = [3,2,1,5,6,4], k = 2", expected: "5", description: "Standard array" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", expected: "4", description: "Array with duplicates" }
    ],
    timeComplexity: "O(N) on average using Quickselect. Worst case is O(N^2).",
    spaceComplexity: "O(log N) for the recursion stack.",
    hint: "You can use Quickselect (similar to Quicksort) to partition the array and only recursively search the side that contains the Kth element."
  },
  {
    id: "so-12",
    title: "Relative Sort Array",
    slug: "relative-sort-array",
    difficulty: "Medium",
    category: "Sorting",
    timeLimit: "25 min",
    description: "Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.\n\nSort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. Elements that do not appear in arr2 should be placed at the end of arr1 in ascending order.",
    examples: [
      { input: "arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]", output: "[2,2,2,1,4,3,3,9,6,7,19]", explanation: "The items are sorted according to the order in arr2, and remaining items are sorted normally at the end." }
    ],
    constraints: ["1 <= arr1.length, arr2.length <= 1000", "0 <= arr1[i], arr2[i] <= 1000"],
    starterCode: `/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
function relativeSortArray(arr1, arr2) {
  // Write your code here
  
}`,
    solution: `function relativeSortArray(arr1, arr2) {
  const map = new Map();
  arr2.forEach((val, idx) => map.set(val, idx));
  
  arr1.sort((a, b) => {
    const aInArr2 = map.has(a);
    const bInArr2 = map.has(b);
    
    if (aInArr2 && bInArr2) {
      return map.get(a) - map.get(b);
    } else if (aInArr2) {
      return -1; // a comes first
    } else if (bInArr2) {
      return 1; // b comes first
    } else {
      return a - b; // both not in arr2, sort ascending
    }
  });
  
  return arr1;
}`,
    testCases: [
      { input: "arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]", expected: "[2,2,2,1,4,3,3,9,6,7,19]", description: "Standard mapping" },
      { input: "arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]", expected: "[22,28,8,6,17,44]", description: "With extra elements" }
    ],
    timeComplexity: "O(N log N) using a custom sort comparator.",
    spaceComplexity: "O(N) for the map storing arr2 indices.",
    hint: "Store the indices of arr2 in a Hash Map. Use a custom comparator function to sort arr1 based on the Hash Map values."
  },
  // ─── Advanced (Hard) ────────────────────────────────────────────────────────
  {
    id: "so-13",
    title: "Count Inversions in an Array",
    slug: "count-inversions",
    difficulty: "Hard",
    category: "Sorting",
    timeLimit: "45 min",
    description: "Inversion Count for an array indicates how far the array is from being sorted. If the array is already sorted, then the inversion count is 0. If an array is sorted in the reverse order, then the inversion count is the maximum.\n\nFormally, two elements a[i] and a[j] form an inversion if a[i] > a[j] and i < j.",
    examples: [
      { input: "arr = [2, 4, 1, 3, 5]", output: "3", explanation: "The inversions are (2,1), (4,1), and (4,3)." }
    ],
    constraints: ["1 <= arr.length <= 10^5", "1 <= arr[i] <= 10^6"],
    starterCode: `/**
 * @param {number[]} arr
 * @return {number}
 */
function countInversions(arr) {
  // Write your code here
  
}`,
    solution: `function countInversions(arr) {
  let count = 0;
  
  function mergeSortAndCount(left, right) {
    if (left >= right) return [arr[left]];
    
    const mid = Math.floor((left + right) / 2);
    const leftArr = mergeSortAndCount(left, mid);
    const rightArr = mergeSortAndCount(mid + 1, right);
    
    return mergeAndCount(leftArr, rightArr);
  }
  
  function mergeAndCount(leftArr, rightArr) {
    let result = [];
    let i = 0, j = 0;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        result.push(leftArr[i]);
        i++;
      } else {
        // If left > right, then all remaining elements in left 
        // are greater than rightArr[j]
        count += leftArr.length - i;
        result.push(rightArr[j]);
        j++;
      }
    }
    
    while (i < leftArr.length) result.push(leftArr[i++]);
    while (j < rightArr.length) result.push(rightArr[j++]);
    
    return result;
  }
  
  mergeSortAndCount(0, arr.length - 1);
  return count;
}`,
    testCases: [
      { input: "arr = [2,4,1,3,5]", expected: "3", description: "Standard case" },
      { input: "arr = [5,4,3,2,1]", expected: "10", description: "Reversed array" }
    ],
    timeComplexity: "O(N log N) — modifies Merge Sort.",
    spaceComplexity: "O(N) — auxiliary arrays during merge.",
    hint: "Use a modified Merge Sort algorithm. While merging, if an element from the right array is picked, it forms an inversion with all remaining elements in the left array."
  },
  {
    id: "so-14",
    title: "External Sorting Concepts",
    slug: "external-sorting",
    difficulty: "Hard",
    category: "Sorting",
    timeLimit: "50 min",
    description: "External sorting handles massive amounts of data that don't fit in memory. To simulate this, you are given an array of k fully sorted 'chunks' (arrays). You must merge them into a single sorted array. (This is conceptually equivalent to merging chunks from disk).\n\nMerge the k sorted arrays into one sorted array.",
    examples: [
      { input: "chunks = [[1,4,5], [1,3,4], [2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "Merging the sorted chunks gives the final sorted list." }
    ],
    constraints: ["1 <= chunks.length <= 10^4", "1 <= chunks[i].length <= 500", "-10^4 <= chunks[i][j] <= 10^4"],
    starterCode: `/**
 * @param {number[][]} chunks
 * @return {number[]}
 */
function mergeChunks(chunks) {
  // Write your code here
  
}`,
    solution: `function mergeChunks(chunks) {
  // To avoid writing a full MinHeap, we can use divide and conquer
  if (chunks.length === 0) return [];
  
  while (chunks.length > 1) {
    const nextChunks = [];
    for (let i = 0; i < chunks.length; i += 2) {
      if (i + 1 < chunks.length) {
        nextChunks.push(mergeTwoArrays(chunks[i], chunks[i + 1]));
      } else {
        nextChunks.push(chunks[i]);
      }
    }
    chunks = nextChunks;
  }
  
  return chunks[0];
}

function mergeTwoArrays(l1, l2) {
  let res = [];
  let i = 0;
  let j = 0;
  while (i < l1.length && j < l2.length) {
    if (l1[i] < l2[j]) {
      res.push(l1[i++]);
    } else {
      res.push(l2[j++]);
    }
  }
  while (i < l1.length) res.push(l1[i++]);
  while (j < l2.length) res.push(l2[j++]);
  return res;
}`,
    testCases: [
      { input: "chunks = [[1,4,5], [1,3,4], [2,6]]", expected: "[1,1,2,3,4,4,5,6]", description: "Merge 3 arrays" },
      { input: "chunks = [[1]]", expected: "[1]", description: "Single array" }
    ],
    timeComplexity: "O(N log k) where N is total elements, k is the number of chunks.",
    spaceComplexity: "O(N) — storing the merged results.",
    hint: "You can either use a Min-Heap containing the first element of each chunk, or recursively pair up the chunks and merge them (Divide and Conquer)."
  },
  {
    id: "so-15",
    title: "Merge K Sorted Arrays",
    slug: "merge-k-sorted-arrays",
    difficulty: "Hard",
    category: "Sorting",
    timeLimit: "45 min",
    description: "You are given a 2D array representing K sorted arrays. Your task is to merge them into a single sorted array. (Note: this is identical in implementation to the External Sorting simulation problem).",
    examples: [
      { input: "arrays = [[1,2,3], [4,5,6], [7,8,9]]", output: "[1,2,3,4,5,6,7,8,9]", explanation: "Merging sequential sorted arrays." }
    ],
    constraints: ["1 <= arrays.length <= 10^4", "1 <= arrays[i].length <= 500"],
    starterCode: `/**
 * @param {number[][]} arrays
 * @return {number[]}
 */
function mergeKArrays(arrays) {
  // Write your code here
  
}`,
    solution: `function mergeKArrays(arrays) {
  if (arrays.length === 0) return [];
  
  function mergeTwo(arr1, arr2) {
    let merged = [];
    let i = 0, j = 0;
    while(i < arr1.length && j < arr2.length) {
      if(arr1[i] < arr2[j]) merged.push(arr1[i++]);
      else merged.push(arr2[j++]);
    }
    while(i < arr1.length) merged.push(arr1[i++]);
    while(j < arr2.length) merged.push(arr2[j++]);
    return merged;
  }
  
  function divideAndConquer(start, end) {
    if (start === end) return arrays[start];
    const mid = Math.floor((start + end) / 2);
    const left = divideAndConquer(start, mid);
    const right = divideAndConquer(mid + 1, end);
    return mergeTwo(left, right);
  }
  
  return divideAndConquer(0, arrays.length - 1);
}`,
    testCases: [
      { input: "arrays = [[1,2,3], [4,5,6], [7,8,9]]", expected: "[1,2,3,4,5,6,7,8,9]", description: "Sequential arrays" },
      { input: "arrays = [[2,4,6], [1,3,5]]", expected: "[1,2,3,4,5,6]", description: "Overlapping arrays" }
    ],
    timeComplexity: "O(N log K) — where N is total elements, K is number of arrays.",
    spaceComplexity: "O(N) — memory for the new arrays.",
    hint: "Pair the arrays up, merge the pairs, and repeat the process until only one array remains."
  },
  {
    id: "so-16",
    title: "Merge K Sorted Linked Lists",
    slug: "merge-k-sorted-lists",
    difficulty: "Hard",
    category: "Sorting",
    timeLimit: "50 min",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\n*Note: Since the execution environment uses flat inputs, we will pass arrays representing the linked lists, and you should return an array representing the merged list.*",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "The linked-lists are: 1->4->5, 1->3->4, 2->6. Merged into: 1->1->2->3->4->4->5->6." }
    ],
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500"],
    starterCode: `/**
 * @param {number[][]} lists
 * @return {number[]}
 */
function mergeKLists(lists) {
  // Write your code here
  
}`,
    solution: `function mergeKLists(lists) {
  // Since inputs are arrays modeling Linked Lists, this is similar to previous problems
  // In a real LL scenario, we'd use pointers. Here we map and sort.
  
  const allNums = [];
  for (const list of lists) {
    for (const num of list) {
      allNums.push(num);
    }
  }
  
  // O(N log N) naive sort. A Priority Queue approach would be O(N log K).
  return allNums.sort((a, b) => a - b);
}`,
    testCases: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]", description: "Standard lists" },
      { input: "lists = []", expected: "[]", description: "Empty lists" }
    ],
    timeComplexity: "O(N log N) using standard sort, or O(N log K) using PQ/Merge.",
    spaceComplexity: "O(N) to store flattened elements.",
    hint: "You can either use a Priority Queue, Divide and Conquer merging, or simply flatten all elements into a single array and sort it (if the constraints allow)."
  },
  {
    id: "so-17",
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    difficulty: "Hard",
    category: "Sorting",
    timeLimit: "40 min",
    description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]", explanation: "1 appears three times, 2 appears two times." }
    ],
    constraints: ["1 <= nums.length <= 10^5", "k is in the range [1, the number of unique elements in the array].", "It is guaranteed that the answer is unique."],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequent(nums, k) {
  // Write your code here
  
}`,
    solution: `function topKFrequent(nums, k) {
  const map = new Map();
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  
  // Bucket sort approach for O(N) time
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  
  for (const [num, freq] of map.entries()) {
    buckets[freq].push(num);
  }
  
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length > 0) {
      result.push(...buckets[i]);
    }
  }
  
  // If we collected more than k (can happen if frequencies match), slice it
  return result.slice(0, k).sort((a,b) => a - b);
}`,
    testCases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", expected: "[1,2]", description: "Standard case" },
      { input: "nums = [1], k = 1", expected: "[1]", description: "Single element" }
    ],
    timeComplexity: "O(N) — using Bucket Sort (array as frequencies).",
    spaceComplexity: "O(N) — hash map and buckets array.",
    hint: "Use a Hash Map to count frequencies, then use Bucket Sort where the index of the bucket is the frequency count."
  },
  {
    id: "so-18",
    title: "Sort Characters by Frequency",
    slug: "sort-characters-by-frequency",
    difficulty: "Hard",
    category: "Sorting",
    timeLimit: "35 min",
    description: "Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.\n\nReturn the sorted string. If there are multiple answers, return any of them.",
    examples: [
      { input: "s = 'tree'", output: "'eert'", explanation: "'e' appears twice while 'r' and 't' both appear once." }
    ],
    constraints: ["1 <= s.length <= 5 * 10^5", "s consists of uppercase and lowercase English letters and digits."],
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
function frequencySort(s) {
  // Write your code here
  
}`,
    solution: `function frequencySort(s) {
  const map = new Map();
  for (let char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  
  // Sort characters by frequency
  const sortedChars = Array.from(map.keys()).sort((a, b) => {
    return map.get(b) - map.get(a);
  });
  
  let result = "";
  for (let char of sortedChars) {
    result += char.repeat(map.get(char));
  }
  
  return result;
}`,
    testCases: [
      { input: "s = 'tree'", expected: "'eert'", description: "Standard word" },
      { input: "s = 'Aabb'", expected: "'bbAa'", description: "Case sensitivity" }
    ],
    timeComplexity: "O(N + K log K) — where K is number of unique characters.",
    spaceComplexity: "O(N) — to store the result and map.",
    hint: "Count the frequencies using a Hash Map, then sort the keys by their counts and reconstruct the string."
  },
  {
    id: "so-19",
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "Hard",
    category: "Sorting",
    timeLimit: "60 min",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2", explanation: "merged array = [1,2,3] and median is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5", explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5." }
    ],
    constraints: ["nums1.length == m", "nums2.length == n", "0 <= m <= 1000", "0 <= n <= 1000", "1 <= m + n <= 2000"],
    starterCode: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
  // Write your code here
  
}`,
    solution: `function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the smaller array to minimize binary search range
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }
  
  let x = nums1.length;
  let y = nums2.length;
  
  let low = 0;
  let high = x;
  
  while (low <= high) {
    let partitionX = Math.floor((low + high) / 2);
    let partitionY = Math.floor((x + y + 1) / 2) - partitionX;
    
    let maxLeftX = (partitionX === 0) ? -Infinity : nums1[partitionX - 1];
    let minRightX = (partitionX === x) ? Infinity : nums1[partitionX];
    
    let maxLeftY = (partitionY === 0) ? -Infinity : nums2[partitionY - 1];
    let minRightY = (partitionY === y) ? Infinity : nums2[partitionY];
    
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      // We have partitioned array at correct place
      if ((x + y) % 2 === 0) {
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
      } else {
        return Math.max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      // We are too far on right side for partitionX. Go on left side.
      high = partitionX - 1;
    } else {
      // We are too far on left side for partitionX. Go on right side.
      low = partitionX + 1;
    }
  }
  
  return 0;
}`,
    testCases: [
      { input: "nums1 = [1,3], nums2 = [2]", expected: "2", description: "Odd length combined" },
      { input: "nums1 = [1,2], nums2 = [3,4]", expected: "2.5", description: "Even length combined" }
    ],
    timeComplexity: "O(log(min(m, n))) — Binary Search on the smaller array.",
    spaceComplexity: "O(1) — constant space.",
    hint: "Use Binary Search. Partition both arrays such that the left half has the same number of elements as the right half, and all elements on the left are smaller than those on the right."
  }
];

export default SORTING_CHALLENGES;
