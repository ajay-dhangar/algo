export interface Section {
  name: string;
  topics: string[];
}

export interface Stage {
  id: number;
  title: string;
  tagline: string;
  sections: Section[];
  studyLinks?: { label: string; url: string }[];
}

export const STAGES: Stage[] = [
  {
    id: 1,
    title: "Foundations",
    tagline: "Understand how data lives in memory",
    studyLinks: [
      { label: "What is DSA?", url: "./what-is-dsa" },
      { label: "Arrays", url: "../basic-data-structures/array/arrays-dsa" },
      { label: "Recursion", url: "../extra/Recursion/recursion" },
    ],
    sections: [
      {
        name: "Arrays",
        topics: [
          "How arrays are stored in memory (contiguous blocks)",
          "Declaring, accessing, inserting, deleting elements",
          "Traversal — linear scan, reverse traversal",
          "Common patterns: frequency count, prefix sum, kadane's algorithm",
          "2D arrays / matrices — row-major traversal, diagonal traversal",
        ],
      },
      {
        name: "Strings",
        topics: [
          "Strings as character arrays, immutability concept",
          "Traversal, reversal, palindrome check",
          "Substring & subsequence — difference matters",
          "Character frequency maps (using hash maps)",
          "String comparison, anagram detection",
        ],
      },
      {
        name: "Recursion",
        topics: [
          "What is a call stack — visualize it",
          "Base case vs recursive case",
          "Simple examples: factorial, fibonacci, power(x,n)",
          "Recursion on arrays: sum, max, reverse",
          "Recursion tree — how to draw and analyze one",
        ],
      },
      {
        name: "Complexity Analysis",
        topics: [
          "Big O, Big Omega, Big Theta — what they mean intuitively",
          "Analyzing loops: O(n), O(n²), O(log n)",
          "Space complexity — stack frames, auxiliary arrays",
          "Comparing brute-force vs optimized for the same problem",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Core Patterns",
    tagline: "The techniques that replace brute-force",
    studyLinks: [
      { label: "Two Pointers", url: "../extra/algorithms/Two-Pointers/introduction-to-two-pointers" },
      { label: "Sliding Window", url: "../extra/Sliding-Window/introduction-to-sliding-window" },
      { label: "Hashing", url: "../extra/Hashing/what-is-hashing" },
    ],
    sections: [
      {
        name: "Hashing",
        topics: [
          "Hash maps & hash sets — when and why",
          "Counting frequencies in O(n)",
          "Two-sum pattern using hash map",
          "Detecting duplicates, finding intersections",
          "Hash collisions — what they are (conceptual)",
        ],
      },
      {
        name: "Two Pointers",
        topics: [
          "Opposite-end pointers (sorted array pair sum)",
          "Same-direction pointers (remove duplicates in-place)",
          "Fast & slow pointer (linked list cycle, middle element)",
          "Three-pointer problems (3Sum, Dutch National Flag)",
        ],
      },
      {
        name: "Sliding Window",
        topics: [
          "Fixed-size window — max sum of subarray of size k",
          "Variable-size window — smallest subarray with sum ≥ target",
          "Window with hash map — longest substring without repeating chars",
          "When to shrink vs expand the window",
        ],
      },
      {
        name: "Prefix Sum & Difference Array",
        topics: [
          "Building a prefix sum array",
          "Range sum queries in O(1)",
          "Subarray sum equals K (prefix sum + hash map combo)",
          "Difference array for range update operations",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Linear Data Structures",
    tagline: "Ordering, pointers, and LIFO/FIFO",
    studyLinks: [
      { label: "Linked List", url: "../../category/linked-list" },
      { label: "Stacks", url: "../../category/stacks" },
      { label: "Queue", url: "../../category/queue" },
    ],
    sections: [
      {
        name: "Linked List",
        topics: [
          "Singly linked list — insert, delete, traverse",
          "Doubly linked list — when you need backward traversal",
          "Reverse a linked list (iterative + recursive)",
          "Detect cycle (Floyd's tortoise & hare)",
          "Merge two sorted linked lists",
          "Find nth node from end (two-pointer trick)",
        ],
      },
      {
        name: "Stack",
        topics: [
          "Push, pop, peek — LIFO principle",
          "Valid parentheses / balanced brackets",
          "Next greater element (monotonic stack)",
          "Evaluate postfix expressions",
          "Min stack — O(1) getMin",
          "Trapping rain water, largest rectangle in histogram",
        ],
      },
      {
        name: "Queue",
        topics: [
          "Enqueue, dequeue — FIFO principle",
          "Circular queue implementation",
          "Deque (double-ended queue) — sliding window maximum",
          "Queue using two stacks",
          "BFS uses a queue — preview for graphs",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Trees",
    tagline: "Hierarchies, recursion in action",
    studyLinks: [
      { label: "Binary Tree", url: "../extra/Trees/binary-tree" },
      { label: "Trie", url: "../extra/Tries/tries-theory" },
      { label: "Heap", url: "../extra/heap/heap-basics" },
    ],
    sections: [
      {
        name: "Binary Trees",
        topics: [
          "Nodes, edges, root, leaf, depth, height",
          "Inorder, preorder, postorder traversal (recursive)",
          "Level-order traversal (BFS with queue)",
          "Height of tree, diameter, max path sum",
          "Symmetric tree, mirror/invert a tree",
          "Lowest Common Ancestor (LCA)",
          "Zigzag / spiral order traversal",
          "Construct tree from inorder + preorder",
        ],
      },
      {
        name: "Binary Search Tree (BST)",
        topics: [
          "BST property — left < root < right",
          "Search, insert, delete in BST",
          "Validate BST (inorder should be sorted)",
          "Kth smallest element in BST",
          "BST from sorted array",
        ],
      },
      {
        name: "Heap / Priority Queue",
        topics: [
          "Min-heap, max-heap — what they guarantee",
          "Heapify, insert, extract-min/max — O(log n)",
          "Kth largest/smallest element",
          "Merge K sorted lists using min-heap",
          "Top-K frequent elements",
          "Heap sort — how it works",
        ],
      },
      {
        name: "Trie (Prefix Tree)",
        topics: [
          "Trie structure — each node is a character",
          "Insert, search, startsWith operations",
          "Autocomplete / prefix matching",
          "Word search in a board (trie + backtracking)",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Searching & Sorting",
    tagline: "Divide, conquer, and find things fast",
    studyLinks: [
      { label: "Binary Search", url: "../extra/algorithms/Searching Algorithms/BinarySearch" },
      { label: "Sorting", url: "../../category/sorting-algorithms" },
    ],
    sections: [
      {
        name: "Binary Search",
        topics: [
          "Classic binary search on sorted array",
          "Lower bound, upper bound — careful with boundaries",
          "Search in rotated sorted array",
          "Find peak element",
          "Binary search on answer (min/max optimization)",
          "Median of two sorted arrays",
          "Allocate minimum pages / split array largest sum",
        ],
      },
      {
        name: "Sorting Algorithms",
        topics: [
          "Bubble, selection, insertion — O(n²) but know them",
          "Merge sort — divide & conquer, stable, O(n log n)",
          "Quick sort — partition logic, average O(n log n)",
          "Counting sort, radix sort — when to use O(n) sorts",
          "Custom comparators for sorting objects",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Greedy & Backtracking",
    tagline: "Local choices and exhaustive exploration",
    studyLinks: [
      { label: "Greedy Theory", url: "../extra/algorithms/greedy-algorithms/greedy-theory" },
      { label: "Backtracking", url: "../../category/backtracking-algorithms" },
    ],
    sections: [
      {
        name: "Greedy Algorithms",
        topics: [
          "Greedy choice property — when greedy works",
          "Activity selection / meeting rooms",
          "Fractional knapsack",
          "Jump game — can you reach the end?",
          "Huffman encoding (conceptual)",
          "Minimum platforms / intervals overlap",
        ],
      },
      {
        name: "Backtracking",
        topics: [
          "Template: choose → explore → unchoose",
          "Generate all subsets, all permutations",
          "N-Queens problem",
          "Sudoku solver",
          "Word search on a grid",
          "Combination sum (with and without repetition)",
          "Pruning — how to cut bad branches early",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Dynamic Programming",
    tagline: "Overlapping subproblems, optimal substructure",
    studyLinks: [
      { label: "Identify DP Problems", url: "../extra/dynamic-programming/how-to-identify" },
    ],
    sections: [
      {
        name: "DP Fundamentals",
        topics: [
          "When to use DP — overlapping subproblems + optimal substructure",
          "Top-down (memoization) vs bottom-up (tabulation)",
          "State definition — the hardest part",
          "Fibonacci, climbing stairs — your first DP problems",
        ],
      },
      {
        name: "1-D DP",
        topics: [
          "House robber (can't pick adjacent)",
          "Coin change — minimum coins to make amount",
          "Longest increasing subsequence (LIS)",
          "Decode ways",
          "Word break",
          "Maximum product subarray",
        ],
      },
      {
        name: "2-D DP",
        topics: [
          "Grid paths — unique paths with obstacles",
          "Longest common subsequence (LCS)",
          "Edit distance (Levenshtein)",
          "0/1 Knapsack",
          "Partition equal subset sum",
          "Longest palindromic subsequence",
        ],
      },
      {
        name: "DP on Other Structures",
        topics: [
          "DP on trees — max path sum, house robber III",
          "DP on strings — wildcard matching, regex matching",
          "Interval DP — matrix chain multiplication, burst balloons",
          "Bitmask DP — travelling salesman (intro level)",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Graphs",
    tagline: "Networks, paths, and connected components",
    studyLinks: [
      { label: "Adjacency List", url: "../extra/graphs/Adjacency-List" },
      { label: "BFS", url: "../extra/graphs/bfs" },
      { label: "Dijkstra", url: "../extra/graphs/shortest-path-algorithms/dijkstra-algorithm" },
    ],
    sections: [
      {
        name: "Graph Basics",
        topics: [
          "Vertices & edges, directed vs undirected",
          "Adjacency list vs adjacency matrix — tradeoffs",
          "Weighted vs unweighted graphs",
          "Convert edge list → adjacency list (must know)",
        ],
      },
      {
        name: "Traversals",
        topics: [
          "BFS — level-by-level, uses queue, shortest path in unweighted",
          "DFS — goes deep first, uses stack/recursion",
          "Connected components (DFS/BFS on unvisited nodes)",
          "Cycle detection — directed (DFS coloring) & undirected",
          "Topological sort — prerequisites, build order",
        ],
      },
      {
        name: "Shortest Path Algorithms",
        topics: [
          "Dijkstra's — non-negative weights, priority queue",
          "Bellman-Ford — handles negative weights",
          "Floyd-Warshall — all pairs shortest path",
          "0-1 BFS — edge weights are only 0 or 1",
        ],
      },
      {
        name: "Advanced Graph",
        topics: [
          "Union-Find / DSU — connected components efficiently",
          "Kruskal's & Prim's — minimum spanning tree",
          "Bridges & articulation points (Tarjan's)",
          "Strongly connected components",
          "Bipartite graph check",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Bit Manipulation & Math",
    tagline: "Low-level tricks and number theory",
    studyLinks: [
      { label: "Bit Manipulation", url: "../../category/bit-manipulation" },
    ],
    sections: [
      {
        name: "Bit Manipulation",
        topics: [
          "AND, OR, XOR, NOT, left shift, right shift",
          "Check if number is power of 2",
          "Count set bits (Brian Kernighan's)",
          "Single number — XOR trick",
          "Subsets generation using bitmask",
        ],
      },
      {
        name: "Math & Number Theory",
        topics: [
          "GCD (Euclidean algorithm), LCM",
          "Sieve of Eratosthenes — find all primes up to n",
          "Modular arithmetic — why (a*b) % MOD matters in CP",
          "Fast exponentiation — power(x, n) in O(log n)",
          "Combinatorics basics — nCr, Pascal's triangle",
        ],
      },
    ],
  },
];
