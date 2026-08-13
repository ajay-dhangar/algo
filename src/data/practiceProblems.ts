export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Problem {
  id: number;
  title: string;
  slug: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  category?: string;
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
        { id: 1, title: "Two Sum", slug: "two-sum", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 121, title: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 217, title: "Contains Duplicate", slug: "contains-duplicate", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Medium: [
        { id: 238, title: "Product of Array Except Self", slug: "product-of-array-except-self", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 53, title: "Maximum Subarray", slug: "maximum-subarray", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 56, title: "Merge Intervals", slug: "merge-intervals", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
      ],
      Hard: [
        { id: 41, title: "First Missing Positive", slug: "first-missing-positive", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 315, title: "Count of Smaller Numbers After Self", slug: "count-of-smaller-numbers-after-self", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
        { id: 57, title: "Insert Interval", slug: "insert-interval", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
    },
  },
  Strings: {
    icon: "≋",
    problems: {
      Easy: [
        { id: 242, title: "Valid Anagram", slug: "valid-anagram", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 125, title: "Valid Palindrome", slug: "valid-palindrome", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 344, title: "Reverse String", slug: "reverse-string", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 5, title: "Longest Palindromic Substring", slug: "longest-palindromic-substring", timeComplexity: "O(n^2)", spaceComplexity: "O(1)" },
        { id: 49, title: "Group Anagrams", slug: "group-anagrams", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 394, title: "Decode String", slug: "decode-string", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Hard: [
        { id: 68, title: "Text Justification", slug: "text-justification", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 32, title: "Longest Valid Parentheses", slug: "longest-valid-parentheses", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 44, title: "Wildcard Matching", slug: "wildcard-matching", timeComplexity: "O(n^2)", spaceComplexity: "O(n)" },
      ],
    },
  },
  "Bit Manipulation": {
    icon: "⊕",
    problems: {
      Easy: [
        { id: 191, title: "Number of 1 Bits", slug: "number-of-1-bits", timeComplexity: "O(1)", spaceComplexity: "O(1)" },
        { id: 136, title: "Single Number", slug: "single-number", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 338, title: "Counting Bits", slug: "counting-bits", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 137, title: "Single Number II", slug: "single-number-ii", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 78, title: "Subsets", slug: "subsets", timeComplexity: "O(2^n)", spaceComplexity: "O(2^n)" },
        { id: 1310, title: "XOR Queries of a Subarray", slug: "xor-queries-of-a-subarray", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Hard: [
        { id: 421, title: "Maximum XOR of Two Numbers in an Array", slug: "maximum-xor-of-two-numbers-in-an-array", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 982, title: "Triples with Bitwise AND Equal To Zero", slug: "triples-with-bitwise-and-equal-to-zero", timeComplexity: "O(n^2)", spaceComplexity: "O(n^2)" },
        { id: 1707, title: "Maximum XOR With an Element From Array", slug: "maximum-xor-with-an-element-from-array", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
      ],
    },
  },
  "Binary Search": {
    icon: "⌖",
    problems: {
      Easy: [
        { id: 704, title: "Binary Search", slug: "binary-search", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
        { id: 35, title: "Search Insert Position", slug: "search-insert-position", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
        { id: 278, title: "First Bad Version", slug: "first-bad-version", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 33, title: "Search in Rotated Sorted Array", slug: "search-in-rotated-sorted-array", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
        { id: 74, title: "Search a 2D Matrix", slug: "search-a-2d-matrix", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
        { id: 875, title: "Koko Eating Bananas", slug: "koko-eating-bananas", timeComplexity: "O(n log n)", spaceComplexity: "O(1)" },
      ],
      Hard: [
        { id: 4, title: "Median of Two Sorted Arrays", slug: "median-of-two-sorted-arrays", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
        { id: 154, title: "Find Minimum in Rotated Sorted Array II", slug: "find-minimum-in-rotated-sorted-array-ii", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 410, title: "Split Array Largest Sum", slug: "split-array-largest-sum", timeComplexity: "O(n log n)", spaceComplexity: "O(1)" },
      ],
    },
  },
  "Two Pointers": {
    icon: "⇌",
    problems: {
      Easy: [
        { id: 26, title: "Remove Duplicates from Sorted Array", slug: "remove-duplicates-from-sorted-array", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 167, title: "Two Sum II - Input Array Is Sorted", slug: "two-sum-ii-input-array-is-sorted", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 283, title: "Move Zeroes", slug: "move-zeroes", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 11, title: "Container With Most Water", slug: "container-with-most-water", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 15, title: "3Sum", slug: "3sum", timeComplexity: "O(n^2)", spaceComplexity: "O(1)" },
        { id: 80, title: "Remove Duplicates from Sorted Array II", slug: "remove-duplicates-from-sorted-array-ii", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Hard: [
        { id: 42, title: "Trapping Rain Water", slug: "trapping-rain-water", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 828, title: "Count Unique Characters of All Substrings", slug: "count-unique-characters-of-all-substrings-of-a-given-string", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 295, title: "Find Median from Data Stream", slug: "find-median-from-data-stream", timeComplexity: "O(log n)", spaceComplexity: "O(n)" },
      ],
    },
  },
  "Sliding Window": {
    icon: "⬚",
    problems: {
      Easy: [
        { id: 643, title: "Maximum Average Subarray I", slug: "maximum-average-subarray-i", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 219, title: "Contains Duplicate II", slug: "contains-duplicate-ii", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 1456, title: "Maximum Number of Vowels in a Substring", slug: "maximum-number-of-vowels-in-a-substring-of-given-length", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 3, title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 424, title: "Longest Repeating Character Replacement", slug: "longest-repeating-character-replacement", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 567, title: "Permutation in String", slug: "permutation-in-string", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Hard: [
        { id: 239, title: "Sliding Window Maximum", slug: "sliding-window-maximum", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 76, title: "Minimum Window Substring", slug: "minimum-window-substring", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 30, title: "Substring with Concatenation of All Words", slug: "substring-with-concatenation-of-all-words", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
    },
  },
  "Linked List": {
    icon: "⟶",
    problems: {
      Easy: [
        { id: 206, title: "Reverse Linked List", slug: "reverse-linked-list", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 21, title: "Merge Two Sorted Lists", slug: "merge-two-sorted-lists", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 141, title: "Linked List Cycle", slug: "linked-list-cycle", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 2, title: "Add Two Numbers", slug: "add-two-numbers", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 19, title: "Remove Nth Node From End of List", slug: "remove-nth-node-from-end-of-list", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 143, title: "Reorder List", slug: "reorder-list", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Hard: [
        { id: 23, title: "Merge k Sorted Lists", slug: "merge-k-sorted-lists", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
        { id: 25, title: "Reverse Nodes in k-Group", slug: "reverse-nodes-in-k-group", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 460, title: "LFU Cache", slug: "lfu-cache", timeComplexity: "O(1)", spaceComplexity: "O(n)" },
      ],
    },
  },
  "Binary Tree": {
    icon: "⋔",
    problems: {
      Easy: [
        { id: 226, title: "Invert Binary Tree", slug: "invert-binary-tree", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 104, title: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 100, title: "Same Tree", slug: "same-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Medium: [
        { id: 102, title: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 98, title: "Validate Binary Search Tree", slug: "validate-binary-search-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 230, title: "Kth Smallest Element in a BST", slug: "kth-smallest-element-in-a-bst", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Hard: [
        { id: 124, title: "Binary Tree Maximum Path Sum", slug: "binary-tree-maximum-path-sum", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 297, title: "Serialize and Deserialize Binary Tree", slug: "serialize-and-deserialize-binary-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 99, title: "Recover Binary Search Tree", slug: "recover-binary-search-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
    },
  },
  Stack: {
    icon: "⊟",
    problems: {
      Easy: [
        { id: 20, title: "Valid Parentheses", slug: "valid-parentheses", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 682, title: "Baseball Game", slug: "baseball-game", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 844, title: "Backspace String Compare", slug: "backspace-string-compare", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 739, title: "Daily Temperatures", slug: "daily-temperatures", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 150, title: "Evaluate Reverse Polish Notation", slug: "evaluate-reverse-polish-notation", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 155, title: "Min Stack", slug: "min-stack", timeComplexity: "O(1)", spaceComplexity: "O(n)" },
      ],
      Hard: [
        { id: 84, title: "Largest Rectangle in Histogram", slug: "largest-rectangle-in-histogram", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 85, title: "Maximal Rectangle", slug: "maximal-rectangle", timeComplexity: "O(n^2)", spaceComplexity: "O(n)" },
        { id: 224, title: "Basic Calculator", slug: "basic-calculator", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
    },
  },
  BFS: {
    icon: "◎",
    problems: {
      Easy: [
        { id: 733, title: "Flood Fill", slug: "flood-fill", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 637, title: "Average of Levels in Binary Tree", slug: "average-of-levels-in-binary-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 993, title: "Cousins in Binary Tree", slug: "cousins-in-binary-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Medium: [
        { id: 994, title: "Rotting Oranges", slug: "rotting-oranges", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 200, title: "Number of Islands", slug: "number-of-islands", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 542, title: "01 Matrix", slug: "01-matrix", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Hard: [
        { id: 127, title: "Word Ladder", slug: "word-ladder", timeComplexity: "O(n^2)", spaceComplexity: "O(n^2)" },
        { id: 126, title: "Word Ladder II", slug: "word-ladder-ii", timeComplexity: "O(n^2)", spaceComplexity: "O(n^2)" },
        { id: 815, title: "Bus Routes", slug: "bus-routes", timeComplexity: "O(n^2)", spaceComplexity: "O(n^2)" },
      ],
    },
  },
  DFS: {
    icon: "↯",
    problems: {
      Easy: [
        { id: 112, title: "Path Sum", slug: "path-sum", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 101, title: "Symmetric Tree", slug: "symmetric-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 872, title: "Leaf-Similar Trees", slug: "leaf-similar-trees", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Medium: [
        { id: 417, title: "Pacific Atlantic Water Flow", slug: "pacific-atlantic-water-flow", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 130, title: "Surrounded Regions", slug: "surrounded-regions", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 695, title: "Max Area of Island", slug: "max-area-of-island", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Hard: [
        { id: 37, title: "Sudoku Solver", slug: "sudoku-solver", timeComplexity: "O(2^n)", spaceComplexity: "O(n)" },
        { id: 212, title: "Word Search II", slug: "word-search-ii", timeComplexity: "O(2^n)", spaceComplexity: "O(n)" },
        { id: 301, title: "Remove Invalid Parentheses", slug: "remove-invalid-parentheses", timeComplexity: "O(2^n)", spaceComplexity: "O(2^n)" },
      ],
    },
  },
  Trees: {
    icon: "⟁",
    problems: {
      Easy: [
        { id: 94, title: "Binary Tree Inorder Traversal", slug: "binary-tree-inorder-traversal", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 110, title: "Balanced Binary Tree", slug: "balanced-binary-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 700, title: "Search in a Binary Search Tree", slug: "search-in-a-binary-search-tree", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 105, title: "Construct Binary Tree from Preorder and Inorder Traversal", slug: "construct-binary-tree-from-preorder-and-inorder-traversal", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 236, title: "Lowest Common Ancestor of a Binary Tree", slug: "lowest-common-ancestor-of-a-binary-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 450, title: "Delete Node in a BST", slug: "delete-node-in-a-bst", timeComplexity: "O(log n)", spaceComplexity: "O(1)" },
      ],
      Hard: [
        { id: 129, title: "Sum Root to Leaf Numbers", slug: "sum-root-to-leaf-numbers", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 337, title: "House Robber III", slug: "house-robber-iii", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 987, title: "Vertical Order Traversal of a Binary Tree", slug: "vertical-order-traversal-of-a-binary-tree", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
      ],
    },
  },
  Graphs: {
    icon: "↔",
    problems: {
      Easy: [
        { id: 997, title: "Find the Town Judge", slug: "find-the-town-judge", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 797, title: "All Paths From Source to Target", slug: "all-paths-from-source-to-target", timeComplexity: "O(2^n)", spaceComplexity: "O(2^n)" },
        { id: 133, title: "Clone Graph", slug: "clone-graph", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
      Medium: [
        { id: 261, title: "Graph Valid Tree", slug: "graph-valid-tree", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 207, title: "Course Schedule", slug: "course-schedule", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 547, title: "Number of Provinces", slug: "number-of-provinces", timeComplexity: "O(n^2)", spaceComplexity: "O(n)" },
      ],
      Hard: [
        { id: 210, title: "Course Schedule II", slug: "course-schedule-ii", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 329, title: "Longest Increasing Path in a Matrix", slug: "longest-increasing-path-in-a-matrix", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 310, title: "Minimum Height Trees", slug: "minimum-height-trees", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
      ],
    },
  },
  "Dynamic Programming": {
    icon: "Δ",
    problems: {
      Easy: [
        { id: 70, title: "Climbing Stairs", slug: "climbing-stairs", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 746, title: "Min Cost Climbing Stairs", slug: "min-cost-climbing-stairs", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 198, title: "House Robber", slug: "house-robber", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 62, title: "Unique Paths", slug: "unique-paths", timeComplexity: "O(n^2)", spaceComplexity: "O(n)" },
        { id: 221, title: "Maximal Square", slug: "maximal-square", timeComplexity: "O(n^2)", spaceComplexity: "O(n)" },
        { id: 300, title: "Longest Increasing Subsequence", slug: "longest-increasing-subsequence", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
      ],
      Hard: [
        { id: 10, title: "Regular Expression Matching", slug: "regular-expression-matching", timeComplexity: "O(n^2)", spaceComplexity: "O(n^2)" },
        { id: 72, title: "Edit Distance", slug: "edit-distance", timeComplexity: "O(n^2)", spaceComplexity: "O(n)" },
        { id: 1143, title: "Longest Common Subsequence", slug: "longest-common-subsequence", timeComplexity: "O(n^2)", spaceComplexity: "O(n)" },
      ],
    },
  },
  Greedy: {
    icon: "⚡",
    problems: {
      Easy: [
        { id: 455, title: "Assign Cookies", slug: "assign-cookies", timeComplexity: "O(n log n)", spaceComplexity: "O(1)" },
        { id: 605, title: "Can Place Flowers", slug: "can-place-flowers", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
        { id: 860, title: "Lemonade Change", slug: "lemonade-change", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Medium: [
        { id: 435, title: "Non-overlapping Intervals", slug: "non-overlapping-intervals", timeComplexity: "O(n log n)", spaceComplexity: "O(1)" },
        { id: 452, title: "Minimum Number of Arrows to Burst Balloons", slug: "minimum-number-of-arrows-to-burst-balloons", timeComplexity: "O(n log n)", spaceComplexity: "O(1)" },
        { id: 621, title: "Task Scheduler", slug: "task-scheduler", timeComplexity: "O(n)", spaceComplexity: "O(1)" },
      ],
      Hard: [
        { id: 135, title: "Candy", slug: "candy", timeComplexity: "O(n)", spaceComplexity: "O(n)" },
        { id: 502, title: "IPO", slug: "ipo", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
        { id: 630, title: "Course Schedule III", slug: "course-schedule-iii", timeComplexity: "O(n log n)", spaceComplexity: "O(n)" },
      ],
    },
  },
};
