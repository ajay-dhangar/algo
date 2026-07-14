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
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The process is repeated until the list is sorted.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/extra/algorithms/sorting-algorithms/bubble-sort",
  },
  {
    name: "Binary Search",
    category: "Searching",
    description: "Efficiently finds the position of a target value within a sorted array by repeatedly dividing the search interval in half. If the value is less than the middle element, it continues searching in the left half; if greater, it continues in the right half. This process continues until the target value is found or the search interval is empty. Binary Search is much faster than linear search for large sorted datasets, with a logarithmic time complexity.",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/extra/algorithms/searching-algorithms/binary-search",
  },
  {
    name: "Merge Sort",
    category: "Sorting",
    description: "Divides the array into halves, recursively sorts each half, and then merges the sorted halves back together. It is a stable sorting algorithm with a consistent O(n log n) time complexity, making it efficient for large datasets. Merge Sort is particularly effective for sorting linked lists and large files that do not fit into memory, as it can be implemented using an external sorting method.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    docLink: "/docs/extra/algorithms/sorting-algorithms/merge-sort",
  },
  {
    name: "Dijkstra's Algorithm",
    category: "Graph",
    description: "Finds the shortest path from a source node to all other nodes in a weighted graph. It uses a priority queue to explore the graph, always expanding the node with the smallest known distance from the source. Dijkstra's Algorithm is efficient for graphs with non-negative edge weights and has a time complexity of O((V + E) log V) when implemented with a binary heap.",
    timeComplexity: { best: "O((V + E) log V)", average: "O((V + E) log V)", worst: "O((V + E) log V)" },
    spaceComplexity: "O(V)",
    docLink: "/docs/graphs/dijkstra-algorithm",
  },
  {
    name: "Depth First Search",
    category: "Graph",
    description: "Traverses a graph by exploring as far as possible along each branch before backtracking. It uses a stack (either explicitly or via recursion) to keep track of the nodes to visit next. Depth First Search is useful for tasks like topological sorting, cycle detection, and pathfinding in mazes. Its time complexity is O(V + E) for a graph with V vertices and E edges.",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    docLink: "/docs/graphs/dfs-algorithm",
  },
  {
    name: "Breadth First Search",
    category: "Graph",
    description: "Traverses a graph level by level, visiting all neighbors of a node before going deeper. It uses a queue to keep track of the nodes to visit next. Breadth First Search is useful for tasks like finding the shortest path in an unweighted graph, level-order traversal, and web crawling. Its time complexity is O(V + E) for a graph with V vertices and E edges.",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    docLink: "/docs/graphs/bfs-algorithm",
  },
  {
    name: "Quick Sort",
    category: "Sorting",
    description: "Picks a pivot element and partitions the array around it, then recursively sorts each part. It is an efficient sorting algorithm with an average time complexity of O(n log n), but can degrade to O(n²) in the worst case (e.g., when the smallest or largest element is always chosen as the pivot). However, with good pivot selection strategies (like using the median or random pivot), Quick Sort can maintain its O(n log n) performance even in the worst case. It is an in-place sorting algorithm, meaning it requires only a small amount of additional memory.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    docLink: "/docs/extra/algorithms/sorting-algorithms/quick-sort",
  },
  {
    name: "Fibonacci (Dynamic Programming)",
    category: "Dynamic Programming",
    description: "Computes Fibonacci numbers efficiently using memoization to avoid redundant calculations. By storing previously computed values, it reduces the time complexity from exponential O(2^n) to linear O(n). The space complexity is also O(n) due to the memoization storage, but can be optimized to O(1) using an iterative approach with just two variables to keep track of the last two Fibonacci numbers.",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    docLink: "/docs/extra/recursion/fibonacci",
  },
  {
    name: "Knapsack Problem",
    category: "Dynamic Programming",
    description: "Determines the most valuable subset of items that fit within a given weight capacity. It uses a DP table to store the maximum value that can be achieved with a given weight limit and subset of items. The time complexity is O(nW), where n is the number of items and W is the weight capacity, making it efficient for small to medium-sized problems. The space complexity is also O(nW) due to the DP table, but can be optimized to O(W) by using a rolling array technique.",
    timeComplexity: { best: "O(nW)", average: "O(nW)", worst: "O(nW)" },
    spaceComplexity: "O(nW)",
    docLink: "/docs/extra/knapsack-disaster-relief/knapsack-disaster-relief",
  },
  {
    name: "Linear Search",
    category: "Searching",
    description: "Scans each element one by one until the target is found or the list ends. It is a simple search algorithm with a time complexity of O(n) in the worst case, making it inefficient for large datasets. However, it can be useful for small or unsorted lists where the overhead of more complex algorithms is not justified.",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/extra/algorithms/searching-algorithms/linear-search",
  },
  {
    name: "Insertion Sort",
    category: "Sorting",
    description: "Builds the sorted array one element at a time by inserting each into its correct position. It is a simple sorting algorithm with a time complexity of O(n²) in the worst case, but can be efficient for small or nearly sorted datasets. The space complexity is O(1) as it sorts in place.",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/extra/algorithms/sorting-algorithms/insertion-sort",
  },
  {
    name: "Selection Sort",
    category: "Sorting",
    description: "Repeatedly finds the minimum element from the unsorted part and moves it to the front. It is a simple sorting algorithm with a time complexity of O(n²) in the worst case, but can be efficient for small datasets. The space complexity is O(1) as it sorts in place.",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/extra/algorithms/sorting-algorithms/selection-sort",
  },
  {
    name: "Heap Sort",
    category: "Sorting",
    description: "Converts the array into a max-heap, then repeatedly extracts the maximum to sort it. It is an efficient sorting algorithm with a time complexity of O(n log n) in all cases, making it consistent regardless of input. The space complexity is O(1) as it sorts in place, but it is not a stable sorting algorithm.",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    docLink: "/docs/extra/algorithms/sorting-algorithms/heap-sort",
  },
  {
    name: "Floyd-Warshall",
    category: "Graph",
    description: "Finds shortest paths between all pairs of nodes in a weighted graph using dynamic programming. It iteratively updates a distance matrix based on the principle of optimality, where the shortest path from node i to j through an intermediate node k is the minimum of the current known distance and the sum of distances from i to k and k to j. The time complexity is O(V³) due to the three nested loops, making it inefficient for large graphs, while the space complexity is O(V²) for storing the distance matrix.",
    timeComplexity: { best: "O(V³)", average: "O(V³)", worst: "O(V³)" },
    spaceComplexity: "O(V²)",
    docLink: "/docs/graphs/floyd-warshall-algorithm",
  },
  {
    name: "Longest Common Subsequence",
    category: "Dynamic Programming",
    description: "Finds the longest subsequence present in both sequences using a DP table. The time complexity is O(mn), where m and n are the lengths of the two sequences, and the space complexity is also O(mn) due to the DP table.",
    timeComplexity: { best: "O(mn)", average: "O(mn)", worst: "O(mn)" },
    spaceComplexity: "O(mn)",
    docLink: "/docs/extra/dynamic-programming/longest-common-subsequence",
  },
];  