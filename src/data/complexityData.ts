export interface ComplexityItem {
  title: string;
  category: 'Data Structure' | 'Sorting' | 'Searching';
  path: string;
  time_best: string;
  time_average: string;
  time_worst: string;
  space: string;
  efficiency_rating: 'Optimal' | 'Stable' | 'Dangerous';
  concurrency_safe: boolean;
  performance_score: number; // Value from 1 to 100 for the animated bar chart
  notes: string;
}

export const autoComplexities: ComplexityItem[] = [
  {
    title: "Array",
    category: "Data Structure",
    path: "docs/basic-data-structures/array",
    time_best: "O(1)",
    time_average: "O(1)",
    time_worst: "O(n)",
    space: "O(n)",
    efficiency_rating: "Stable",
    concurrency_safe: true,
    performance_score: 75,
    notes: "Direct array access utilizes contiguous physical memory layouts for instant random indexing lookups."
  },
  {
    title: "Hash Map",
    category: "Data Structure",
    path: "docs/basic-data-structures/hash-map",
    time_best: "O(1)",
    time_average: "O(1)",
    time_worst: "O(n)",
    space: "O(n)",
    efficiency_rating: "Optimal",
    concurrency_safe: false,
    performance_score: 95,
    notes: "Amortized constant performance degrades exclusively during high hash collision distribution instances."
  },
  {
    title: "Singly Linked List",
    category: "Data Structure",
    path: "docs/basic-data-structures/linked-list",
    time_best: "O(1)",
    time_average: "O(n)",
    time_worst: "O(n)",
    space: "O(n)",
    efficiency_rating: "Stable",
    concurrency_safe: false,
    performance_score: 55,
    notes: "Highly dynamic element allocation profile; however, sequential traversal pointer overhead limits caching efficiency."
  },
  {
    title: "Binary Search Tree (Balanced)",
    category: "Data Structure",
    path: "docs/basic-data-structures/bst",
    time_best: "O(\\log n)",
    time_average: "O(\\log n)",
    time_worst: "O(\\log n)",
    space: "O(n)",
    efficiency_rating: "Optimal",
    concurrency_safe: false,
    performance_score: 88,
    notes: "Maintains ordered indexing layout. Self-balancing properties ensure reliable algorithmic operational ceilings."
  },
  {
    title: "Binary Search Tree (Unbalanced)",
    category: "Data Structure",
    path: "docs/basic-data-structures/bst-unbalanced",
    time_best: "O(\\log n)",
    time_average: "O(\\log n)",
    time_worst: "O(n)",
    space: "O(n)",
    efficiency_rating: "Dangerous",
    concurrency_safe: false,
    performance_score: 35,
    notes: "Risk of structural degradation into an effective linked list configuration under sequential dataset inputs."
  },
  {
    title: "Bubble Sort",
    category: "Sorting",
    path: "docs/extra/algorithms/sorting-algorithms/bubble-sort",
    time_best: "O(n)",
    time_average: "O(n^2)",
    time_worst: "O(n^2)",
    space: "O(1)",
    efficiency_rating: "Dangerous",
    concurrency_safe: true,
    performance_score: 15,
    notes: "Repeated adjacent element swaps yield heavy resource overhead. Completely unsafe for active production sets."
  },
  {
    title: "Quick Sort",
    category: "Sorting",
    path: "docs/extra/algorithms/sorting-algorithms/quick-sort",
    time_best: "O(n \\log n)",
    time_average: "O(n \\log n)",
    time_worst: "O(n^2)",
    space: "O(\\log n)",
    efficiency_rating: "Stable",
    concurrency_safe: false,
    performance_score: 82,
    notes: "Highly optimized cache-locality mechanics make it incredibly swift in-place, despite poor worst-case pivot distribution scenarios."
  },
  {
    title: "Merge Sort",
    category: "Sorting",
    path: "docs/extra/algorithms/sorting-algorithms/merge-sort",
    time_best: "O(n \\log n)",
    time_average: "O(n \\log n)",
    time_worst: "O(n \\log n)",
    space: "O(n)",
    efficiency_rating: "Stable",
    concurrency_safe: true,
    performance_score: 60,
    notes: "Guaranteed time limits make this highly dependable for processing parallelized distributed records."
  },
  {
    title: "Binary Search",
    category: "Searching",
    path: "docs/extra/algorithms/searching-algorithms/binary-search",
    time_best: "O(1)",
    time_average: "O(\\log n)",
    time_worst: "O(\\log n)",
    space: "O(1)",
    efficiency_rating: "Optimal",
    concurrency_safe: true,
    performance_score: 92,
    notes: "Divide-and-conquer query model executing systematic split intervals over strictly pre-sorted target architectures."
  },
  {
    title: "Linear Search",
    category: "Searching",
    path: "docs/extra/algorithms/searching-algorithms/linear-search",
    time_best: "O(1)",
    time_average: "O(n)",
    time_worst: "O(n)",
    space: "O(1)",
    efficiency_rating: "Stable",
    concurrency_safe: true,
    performance_score: 45,
    notes: "Requires zero prerequisite data orientation mechanics but yields scaling degradation as data collection index sizes increase."
  }
];