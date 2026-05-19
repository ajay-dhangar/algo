export interface Algorithm {
  name: string;
  category: string;
  description: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  docLink: string;
}

export const algorithmsData: Algorithm[] = [
  {
    name: "Bubble Sort",
    category: "Sorting",
    description: "Repeatedly swaps adjacent elements that are in the wrong order until the list is sorted.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/sorting-algorithms/bubble-sort",
  },
  {
    name: "Binary Search",
    category: "Searching",
    description: "Finds a target value in a sorted array by repeatedly halving the search interval.",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/searching-algorithms/binary-search",
  },
  {
    name: "Merge Sort",
    category: "Sorting",
    description: "Divides the array into halves, recursively sorts them, then merges the sorted halves.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    docLink: "/docs/sorting-algorithms/merge-sort",
  },
  {
    name: "Dijkstra's Algorithm",
    category: "Graph",
    description: "Finds the shortest path from a source node to all other nodes in a weighted graph.",
    timeComplexity: { best: "O(V²)", average: "O(V²)", worst: "O(V²)" },
    spaceComplexity: "O(V)",
    docLink: "/docs/graph-algorithms/dijkstra-algorithm",
  },
  {
    name: "Depth First Search",
    category: "Graph",
    description: "Traverses a graph by exploring as far as possible along each branch before backtracking.",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    docLink: "/docs/graph-algorithms/depth-first-search",
  },
  {
    name: "Breadth First Search",
    category: "Graph",
    description: "Traverses a graph level by level, visiting all neighbors of a node before going deeper.",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    docLink: "/docs/graph-algorithms/breadth-first-search",
  },
  {
    name: "Quick Sort",
    category: "Sorting",
    description: "Picks a pivot element and partitions the array around it, then recursively sorts each part.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    docLink: "/docs/sorting-algorithms/quick-sort",
  },
  {
    name: "Fibonacci (Dynamic Programming)",
    category: "Dynamic Programming",
    description: "Computes Fibonacci numbers efficiently using memoization to avoid redundant calculations.",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    docLink: "/docs/dynamic-programming/fibonacci-series",
  },
  {
    name: "Knapsack Problem",
    category: "Dynamic Programming",
    description: "Determines the most valuable subset of items that fit within a given weight capacity.",
    timeComplexity: { best: "O(nW)", average: "O(nW)", worst: "O(nW)" },
    spaceComplexity: "O(nW)",
    docLink: "/docs/dynamic-programming/",
  },
  {
    name: "Linear Search",
    category: "Searching",
    description: "Scans each element one by one until the target is found or the list ends.",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/searching-algorithms/linear-search",
  },
  {
    name: "Insertion Sort",
    category: "Sorting",
    description: "Builds the sorted array one element at a time by inserting each into its correct position.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/sorting-algorithms/insertion-sort",
  },
  {
    name: "Selection Sort",
    category: "Sorting",
    description: "Repeatedly finds the minimum element from the unsorted part and moves it to the front.",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/sorting-algorithms/selection-sort",
  },
  {
    name: "Heap Sort",
    category: "Sorting",
    description: "Converts the array into a max-heap, then repeatedly extracts the maximum to sort it.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/sorting-algorithms/heap-sort",
  },
  {
    name: "Floyd-Warshall",
    category: "Graph",
    description: "Finds shortest paths between all pairs of nodes in a weighted graph using dynamic programming.",
    timeComplexity: { best: "O(V³)", average: "O(V³)", worst: "O(V³)" },
    spaceComplexity: "O(V²)",
    docLink: "/docs/graph-algorithms/floyd-warshall-algorithm",
  },
  {
    name: "Longest Common Subsequence",
    category: "Dynamic Programming",
    description: "Finds the longest subsequence present in both sequences using a DP table.",
    timeComplexity: { best: "O(mn)", average: "O(mn)", worst: "O(mn)" },
    spaceComplexity: "O(mn)",
    docLink: "/docs/dynamic-programming/",
  },
];