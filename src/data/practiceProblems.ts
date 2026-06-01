export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: number;
  title: string;
  slug: string;
}

export interface TopicData {
  icon: string;
  problems: Record<Difficulty, Problem[]>;
}

export const TOPICS: Record<string, TopicData> = {
  Arrays: {
    icon: "▦",
    problems: {
      Easy: [
        { id: 1, title: "Two Sum", slug: "two-sum" },
        { id: 121, title: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock" },
        { id: 217, title: "Contains Duplicate", slug: "contains-duplicate" },
      ],
      Medium: [
        { id: 238, title: "Product of Array Except Self", slug: "product-of-array-except-self" },
        { id: 53, title: "Maximum Subarray", slug: "maximum-subarray" },
        { id: 56, title: "Merge Intervals", slug: "merge-intervals" },
      ],
      Hard: [
        { id: 41, title: "First Missing Positive", slug: "first-missing-positive" },
        { id: 239, title: "Sliding Window Maximum", slug: "sliding-window-maximum" },
        { id: 42, title: "Trapping Rain Water", slug: "trapping-rain-water" },
      ],
    },
  },
  Strings: {
    icon: "≋",
    problems: {
      Easy: [
        { id: 242, title: "Valid Anagram", slug: "valid-anagram" },
        { id: 125, title: "Valid Palindrome", slug: "valid-palindrome" },
        { id: 344, title: "Reverse String", slug: "reverse-string" },
      ],
      Medium: [
        { id: 3, title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters" },
        { id: 49, title: "Group Anagrams", slug: "group-anagrams" },
        { id: 394, title: "Decode String", slug: "decode-string" },
      ],
      Hard: [
        { id: 76, title: "Minimum Window Substring", slug: "minimum-window-substring" },
        { id: 32, title: "Longest Valid Parentheses", slug: "longest-valid-parentheses" },
        { id: 44, title: "Wildcard Matching", slug: "wildcard-matching" },
      ],
    },
  },
  "Bit Manipulation": {
    icon: "⊕",
    problems: {
      Easy: [
        { id: 191, title: "Number of 1 Bits", slug: "number-of-1-bits" },
        { id: 136, title: "Single Number", slug: "single-number" },
        { id: 338, title: "Counting Bits", slug: "counting-bits" },
      ],
      Medium: [
        { id: 137, title: "Single Number II", slug: "single-number-ii" },
        { id: 78, title: "Subsets", slug: "subsets" },
        { id: 1310, title: "XOR Queries of a Subarray", slug: "xor-queries-of-a-subarray" },
      ],
      Hard: [
        { id: 421, title: "Maximum XOR of Two Numbers in an Array", slug: "maximum-xor-of-two-numbers-in-an-array" },
        { id: 982, title: "Triples with Bitwise AND Equal To Zero", slug: "triples-with-bitwise-and-equal-to-zero" },
        { id: 1707, title: "Maximum XOR With an Element From Array", slug: "maximum-xor-with-an-element-from-array" },
      ],
    },
  },
  "Binary Search": {
    icon: "⌖",
    problems: {
      Easy: [
        { id: 704, title: "Binary Search", slug: "binary-search" },
        { id: 35, title: "Search Insert Position", slug: "search-insert-position" },
        { id: 278, title: "First Bad Version", slug: "first-bad-version" },
      ],
      Medium: [
        { id: 33, title: "Search in Rotated Sorted Array", slug: "search-in-rotated-sorted-array" },
        { id: 74, title: "Search a 2D Matrix", slug: "search-a-2d-matrix" },
        { id: 875, title: "Koko Eating Bananas", slug: "koko-eating-bananas" },
      ],
      Hard: [
        { id: 4, title: "Median of Two Sorted Arrays", slug: "median-of-two-sorted-arrays" },
        { id: 154, title: "Find Minimum in Rotated Sorted Array II", slug: "find-minimum-in-rotated-sorted-array-ii" },
        { id: 410, title: "Split Array Largest Sum", slug: "split-array-largest-sum" },
      ],
    },
  },
  "Two Pointers": {
    icon: "⇌",
    problems: {
      Easy: [
        { id: 125, title: "Valid Palindrome", slug: "valid-palindrome" },
        { id: 167, title: "Two Sum II - Input Array Is Sorted", slug: "two-sum-ii-input-array-is-sorted" },
        { id: 283, title: "Move Zeroes", slug: "move-zeroes" },
      ],
      Medium: [
        { id: 11, title: "Container With Most Water", slug: "container-with-most-water" },
        { id: 15, title: "3Sum", slug: "3sum" },
        { id: 80, title: "Remove Duplicates from Sorted Array II", slug: "remove-duplicates-from-sorted-array-ii" },
      ],
      Hard: [
        { id: 42, title: "Trapping Rain Water", slug: "trapping-rain-water" },
        { id: 76, title: "Minimum Window Substring", slug: "minimum-window-substring" },
        { id: 295, title: "Find Median from Data Stream", slug: "find-median-from-data-stream" },
      ],
    },
  },
  "Sliding Window": {
    icon: "⬚",
    problems: {
      Easy: [
        { id: 643, title: "Maximum Average Subarray I", slug: "maximum-average-subarray-i" },
        { id: 219, title: "Contains Duplicate II", slug: "contains-duplicate-ii" },
        { id: 1456, title: "Maximum Number of Vowels in a Substring", slug: "maximum-number-of-vowels-in-a-substring-of-given-length" },
      ],
      Medium: [
        { id: 3, title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters" },
        { id: 424, title: "Longest Repeating Character Replacement", slug: "longest-repeating-character-replacement" },
        { id: 567, title: "Permutation in String", slug: "permutation-in-string" },
      ],
      Hard: [
        { id: 239, title: "Sliding Window Maximum", slug: "sliding-window-maximum" },
        { id: 76, title: "Minimum Window Substring", slug: "minimum-window-substring" },
        { id: 30, title: "Substring with Concatenation of All Words", slug: "substring-with-concatenation-of-all-words" },
      ],
    },
  },
  "Linked List": {
    icon: "⟶",
    problems: {
      Easy: [
        { id: 206, title: "Reverse Linked List", slug: "reverse-linked-list" },
        { id: 21, title: "Merge Two Sorted Lists", slug: "merge-two-sorted-lists" },
        { id: 141, title: "Linked List Cycle", slug: "linked-list-cycle" },
      ],
      Medium: [
        { id: 2, title: "Add Two Numbers", slug: "add-two-numbers" },
        { id: 19, title: "Remove Nth Node From End of List", slug: "remove-nth-node-from-end-of-list" },
        { id: 143, title: "Reorder List", slug: "reorder-list" },
      ],
      Hard: [
        { id: 23, title: "Merge k Sorted Lists", slug: "merge-k-sorted-lists" },
        { id: 25, title: "Reverse Nodes in k-Group", slug: "reverse-nodes-in-k-group" },
        { id: 460, title: "LFU Cache", slug: "lfu-cache" },
      ],
    },
  },
  "Binary Tree": {
    icon: "⋔",
    problems: {
      Easy: [
        { id: 226, title: "Invert Binary Tree", slug: "invert-binary-tree" },
        { id: 104, title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree" },
        { id: 100, title: "Same Tree", slug: "same-tree" },
      ],
      Medium: [
        { id: 102, title: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal" },
        { id: 98, title: "Validate Binary Search Tree", slug: "validate-binary-search-tree" },
        { id: 230, title: "Kth Smallest Element in a BST", slug: "kth-smallest-element-in-a-bst" },
      ],
      Hard: [
        { id: 124, title: "Binary Tree Maximum Path Sum", slug: "binary-tree-maximum-path-sum" },
        { id: 297, title: "Serialize and Deserialize Binary Tree", slug: "serialize-and-deserialize-binary-tree" },
        { id: 99, title: "Recover Binary Search Tree", slug: "recover-binary-search-tree" },
      ],
    },
  },
  Stack: {
    icon: "⊟",
    problems: {
      Easy: [
        { id: 20, title: "Valid Parentheses", slug: "valid-parentheses" },
        { id: 682, title: "Baseball Game", slug: "baseball-game" },
        { id: 844, title: "Backspace String Compare", slug: "backspace-string-compare" },
      ],
      Medium: [
        { id: 739, title: "Daily Temperatures", slug: "daily-temperatures" },
        { id: 150, title: "Evaluate Reverse Polish Notation", slug: "evaluate-reverse-polish-notation" },
        { id: 155, title: "Min Stack", slug: "min-stack" },
      ],
      Hard: [
        { id: 84, title: "Largest Rectangle in Histogram", slug: "largest-rectangle-in-histogram" },
        { id: 85, title: "Maximal Rectangle", slug: "maximal-rectangle" },
        { id: 224, title: "Basic Calculator", slug: "basic-calculator" },
      ],
    },
  },
  BFS: {
    icon: "◎",
    problems: {
      Easy: [
        { id: 733, title: "Flood Fill", slug: "flood-fill" },
        { id: 637, title: "Average of Levels in Binary Tree", slug: "average-of-levels-in-binary-tree" },
        { id: 993, title: "Cousins in Binary Tree", slug: "cousins-in-binary-tree" },
      ],
      Medium: [
        { id: 994, title: "Rotting Oranges", slug: "rotting-oranges" },
        { id: 200, title: "Number of Islands", slug: "number-of-islands" },
        { id: 542, title: "01 Matrix", slug: "01-matrix" },
      ],
      Hard: [
        { id: 127, title: "Word Ladder", slug: "word-ladder" },
        { id: 126, title: "Word Ladder II", slug: "word-ladder-ii" },
        { id: 815, title: "Bus Routes", slug: "bus-routes" },
      ],
    },
  },
  DFS: {
    icon: "↯",
    problems: {
      Easy: [
        { id: 104, title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree" },
        { id: 101, title: "Symmetric Tree", slug: "symmetric-tree" },
        { id: 872, title: "Leaf-Similar Trees", slug: "leaf-similar-trees" },
      ],
      Medium: [
        { id: 200, title: "Number of Islands", slug: "number-of-islands" },
        { id: 547, title: "Number of Provinces", slug: "number-of-provinces" },
        { id: 695, title: "Max Area of Island", slug: "max-area-of-island" },
      ],
      Hard: [
        { id: 37, title: "Sudoku Solver", slug: "sudoku-solver" },
        { id: 212, title: "Word Search II", slug: "word-search-ii" },
        { id: 301, title: "Remove Invalid Parentheses", slug: "remove-invalid-parentheses" },
      ],
    },
  },
};