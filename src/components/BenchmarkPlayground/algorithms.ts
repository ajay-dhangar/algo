export type AlgoCategory = "sort" | "search";

export interface AlgoMeta {
  id: string;
  name: string;
  category: AlgoCategory;
  timeComplexity: string;
  /** Big-O growth class used to pick a reference curve on the chart. */
  timeClass: "n" | "logn" | "nlogn" | "n2";
  spaceComplexity: string;
  color: string;
  description: string;
}

/**
 * Metadata for every algorithm the playground can benchmark.
 * The *actual* runnable implementations live in `workerSource.ts` so they
 * can run inside a Web Worker without pulling in bundler/module machinery.
 * Keep the `id`s here in sync with the `id`s used in that file.
 */
export const ALGORITHMS: AlgoMeta[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "sort",
    timeComplexity: "O(n²)",
    timeClass: "n2",
    spaceComplexity: "O(1)",
    color: "#ef4444",
    description: "Repeatedly swaps adjacent out-of-order elements until the array is sorted.",
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "sort",
    timeComplexity: "O(n²)",
    timeClass: "n2",
    spaceComplexity: "O(1)",
    color: "#f97316",
    description: "Selects the smallest remaining element and moves it into place each pass.",
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "sort",
    timeComplexity: "O(n²)",
    timeClass: "n2",
    spaceComplexity: "O(1)",
    color: "#eab308",
    description: "Builds a sorted prefix by inserting each new element into its correct spot.",
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    category: "sort",
    timeComplexity: "O(n log n)",
    timeClass: "nlogn",
    spaceComplexity: "O(n)",
    color: "#3b82f6",
    description: "Divide-and-conquer sort that splits, sorts halves, then merges them.",
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "sort",
    timeComplexity: "O(n log n) avg",
    timeClass: "nlogn",
    spaceComplexity: "O(log n)",
    color: "#22c55e",
    description: "Divide-and-conquer sort that partitions around a pivot.",
  },
  {
    id: "linear-search",
    name: "Linear Search",
    category: "search",
    timeComplexity: "O(n)",
    timeClass: "n",
    spaceComplexity: "O(1)",
    color: "#a855f7",
    description: "Scans every element in order until the target is found (worst case here).",
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "search",
    timeComplexity: "O(log n)",
    timeClass: "logn",
    spaceComplexity: "O(1)",
    color: "#06b6d4",
    description: "Halves the search range every step. Requires a sorted array.",
  },
];

export function getAlgoMeta(id: string): AlgoMeta | undefined {
  return ALGORITHMS.find((a) => a.id === id);
}

/** The four sizes the task asked for, plus two extra log-scale stops for a smoother slider/chart. */
export const SIZE_STEPS = [10, 100, 1_000, 10_000, 100_000, 1_000_000];

export function formatSize(n: number): string {
  if (n >= 1_000_000) return `${n / 1_000_000}M`;
  if (n >= 1_000) return `${n / 1_000}K`;
  return `${n}`;
}
