/**
 * docQuizData.ts
 *
 * Maps Docusaurus doc page IDs to exactly 3 inline quiz questions.
 * The doc ID mirrors the file path under /docs with slashes replaced by hyphens.
 *
 * Each question shape:
 *   question      – question text
 *   options       – answer choices
 *   correctAnswer – 0-based index into options[]
 *   explanation   – shown after the user answers
 */

export interface DocQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export type DocQuizMap = Record<string, DocQuizQuestion[]>;

const docQuizData: DocQuizMap = {

  /* Merge Sort */
  "extra-algorithms-sorting-algorithms-MergeSort": [
    {
      question: "What is the time complexity of Merge Sort in all cases?",
      options: ["A) O(n2)", "B) O(n log n)", "C) O(n)", "D) O(log n)"],
      correctAnswer: 1,
      explanation: "Merge Sort always divides the array into halves (O(log n) levels) and merges them in O(n) time per level, giving a consistent O(n log n) regardless of input order.",
    },
    {
      question: "Is Merge Sort a stable sorting algorithm?",
      options: [
        "A) No, it swaps equal elements arbitrarily",
        "B) Yes, it preserves the relative order of equal elements",
        "C) It depends on the implementation language",
        "D) Only for integer arrays",
      ],
      correctAnswer: 1,
      explanation: "Merge Sort is stable because during the merge step equal elements from the left sub-array are placed before those from the right, preserving their original relative order.",
    },
    {
      question: "What is the auxiliary space complexity of standard recursive Merge Sort?",
      options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n2)"],
      correctAnswer: 2,
      explanation: "Merge Sort requires O(n) auxiliary space to hold the temporary sub-arrays during each merge step.",
    },
  ],

  /* Bubble Sort */
  "extra-algorithms-sorting-algorithms-bubble-sort": [
    {
      question: "What is the worst-case time complexity of Bubble Sort?",
      options: ["A) O(n)", "B) O(n log n)", "C) O(n2)", "D) O(log n)"],
      correctAnswer: 2,
      explanation: "In the worst case (reverse-sorted input), Bubble Sort performs n(n-1)/2 comparisons and swaps — O(n2).",
    },
    {
      question: "Which optimisation gives Bubble Sort an O(n) best-case?",
      options: [
        "A) Using a min-heap internally",
        "B) Stopping early when no swap occurs in a pass",
        "C) Sorting in reverse first",
        "D) Dividing the array into halves",
      ],
      correctAnswer: 1,
      explanation: "Adding a flag that stops iteration when no swaps happen means an already-sorted array is detected in a single pass.",
    },
    {
      question: "Is Bubble Sort stable?",
      options: [
        "A) No",
        "B) Yes, because only adjacent elements swap and equal elements are never swapped",
        "C) Only when the array has no duplicates",
        "D) It depends on the pivot",
      ],
      correctAnswer: 1,
      explanation: "Bubble Sort only swaps adjacent elements that are strictly out of order, so equal elements retain their relative positions.",
    },
  ],

  /* Quick Sort */
  "extra-algorithms-sorting-algorithms-quick-sort": [
    {
      question: "What is the average-case time complexity of Quick Sort?",
      options: ["A) O(n2)", "B) O(n)", "C) O(n log n)", "D) O(log n)"],
      correctAnswer: 2,
      explanation: "With a good pivot, Quick Sort produces balanced partitions on average, leading to O(n log n) expected performance.",
    },
    {
      question: "When does Quick Sort degrade to O(n2)?",
      options: [
        "A) When the pivot always splits the array into equal halves",
        "B) When the pivot is always the smallest or largest element",
        "C) On arrays containing duplicates",
        "D) When the array has an odd number of elements",
      ],
      correctAnswer: 1,
      explanation: "Choosing the minimum or maximum element as pivot creates maximally unbalanced partitions (0 and n-1), causing O(n2) performance.",
    },
    {
      question: "Quick Sort is preferred over Merge Sort for in-place sorting because:",
      options: [
        "A) Quick Sort has a better worst-case complexity",
        "B) Quick Sort needs only O(log n) stack space and has superior cache locality",
        "C) Quick Sort is always stable",
        "D) Quick Sort never recurses",
      ],
      correctAnswer: 1,
      explanation: "Quick Sort is in-place (O(log n) stack) vs Merge Sort's O(n) auxiliary space, and its sequential memory access patterns exploit CPU caches efficiently.",
    },
  ],

  /* Insertion Sort */
  "extra-algorithms-sorting-algorithms-insertion-sort": [
    {
      question: "What is the best-case time complexity of Insertion Sort?",
      options: ["A) O(n2)", "B) O(n log n)", "C) O(n)", "D) O(1)"],
      correctAnswer: 2,
      explanation: "When the input is already sorted, each element requires only one comparison, giving O(n) time.",
    },
    {
      question: "For which input is Insertion Sort typically preferred?",
      options: [
        "A) Very large arrays (n > 10 000)",
        "B) Small or nearly-sorted arrays",
        "C) Reverse-sorted arrays",
        "D) Randomly shuffled arrays of any size",
      ],
      correctAnswer: 1,
      explanation: "Insertion Sort has low overhead and adapts well to partially sorted input — it is used as a finishing step in hybrid algorithms like Timsort.",
    },
    {
      question: "Is Insertion Sort an in-place algorithm?",
      options: [
        "A) No, it requires O(n) extra space",
        "B) Yes, it sorts by shifting elements within the original array",
        "C) Only when implemented iteratively",
        "D) No, it creates a new sorted array",
      ],
      correctAnswer: 1,
      explanation: "Insertion Sort shifts elements rightward in-place, requiring only O(1) extra space.",
    },
  ],

  /* Heap Sort */
  "extra-algorithms-sorting-algorithms-heap-sort": [
    {
      question: "What is the time complexity of Heap Sort?",
      options: ["A) O(n2)", "B) O(n)", "C) O(n log n)", "D) O(log n)"],
      correctAnswer: 2,
      explanation: "Building the max-heap is O(n); each of the n extract-max operations costs O(log n), giving O(n log n) overall.",
    },
    {
      question: "What additional space does Heap Sort require?",
      options: ["A) O(n)", "B) O(log n)", "C) O(1)", "D) O(n2)"],
      correctAnswer: 2,
      explanation: "Heap Sort heapifies the array in-place and extracts back into the same array, needing only O(1) extra space.",
    },
    {
      question: "Is Heap Sort stable?",
      options: [
        "A) Yes, always stable",
        "B) No, heap operations can reorder equal elements",
        "C) Only when using a min-heap",
        "D) Yes, if heapify is iterative",
      ],
      correctAnswer: 1,
      explanation: "Heap Sort is not stable because the sift-down operations can rearrange equal elements relative to one another.",
    },
  ],

  /* Binary Search */
  "extra-algorithms-searching-algorithms-binary-search": [
    {
      question: "What is the time complexity of Binary Search on n sorted elements?",
      options: ["A) O(n)", "B) O(log n)", "C) O(n log n)", "D) O(1)"],
      correctAnswer: 1,
      explanation: "Binary Search halves the interval each step, taking at most ceil(log2 n)+1 comparisons — O(log n).",
    },
    {
      question: "What is a prerequisite for Binary Search to work correctly?",
      options: [
        "A) The array must contain only integers",
        "B) The array must be sorted",
        "C) The array size must be a power of two",
        "D) The target must be present",
      ],
      correctAnswer: 1,
      explanation: "Binary Search relies on sorted order to decide left/right at each step. On an unsorted array it produces incorrect results.",
    },
    {
      question: "What is the space complexity of iterative Binary Search?",
      options: ["A) O(n)", "B) O(log n)", "C) O(1)", "D) O(n log n)"],
      correctAnswer: 2,
      explanation: "The iterative version maintains only a few pointers (low, high, mid) — O(1) extra space.",
    },
  ],

  /* Linear Search */
  "extra-algorithms-searching-algorithms-linear-search": [
    {
      question: "What is the worst-case time complexity of Linear Search?",
      options: ["A) O(1)", "B) O(log n)", "C) O(n)", "D) O(n2)"],
      correctAnswer: 2,
      explanation: "If the target is last or absent, Linear Search scans every element — O(n).",
    },
    {
      question: "Linear Search can be applied to:",
      options: [
        "A) Only sorted arrays",
        "B) Only integer arrays",
        "C) Any collection regardless of order",
        "D) Only linked lists",
      ],
      correctAnswer: 2,
      explanation: "Unlike Binary Search, Linear Search does not assume ordering, so it works on any sequence.",
    },
    {
      question: "What is the best-case time complexity of Linear Search?",
      options: ["A) O(n)", "B) O(log n)", "C) O(n2)", "D) O(1)"],
      correctAnswer: 3,
      explanation: "If the target is at the first position, Linear Search finds it in one comparison — O(1).",
    },
  ],

  /* BFS */
  "graphs-bfs-algorithm": [
    {
      question: "What data structure does BFS use internally?",
      options: ["A) Stack", "B) Queue", "C) Priority Queue", "D) Hash Map"],
      correctAnswer: 1,
      explanation: "BFS visits vertices in FIFO order — naturally modelled by a queue.",
    },
    {
      question: "What is the time complexity of BFS with V vertices and E edges?",
      options: ["A) O(V2)", "B) O(V + E)", "C) O(E log V)", "D) O(V log V)"],
      correctAnswer: 1,
      explanation: "Each vertex is enqueued/dequeued once (O(V)) and each edge is examined once (O(E)), giving O(V + E).",
    },
    {
      question: "BFS guarantees the shortest path in terms of:",
      options: [
        "A) Weighted edge cost",
        "B) Number of edges (hops) in an unweighted graph",
        "C) Memory usage",
        "D) Alphabetical order of vertex labels",
      ],
      correctAnswer: 1,
      explanation: "BFS explores vertices in increasing hop-distance order, so the first time it reaches a vertex it has used the fewest edges.",
    },
  ],

  /* DFS */
  "graphs-dfs-algorithm": [
    {
      question: "What data structure underpins recursive DFS?",
      options: ["A) Queue", "B) Min-Heap", "C) Call Stack", "D) Hash Table"],
      correctAnswer: 2,
      explanation: "Recursive DFS implicitly uses the call stack — each recursive call processes a deeper node and backtracks on return.",
    },
    {
      question: "What is the time complexity of DFS with V vertices and E edges?",
      options: ["A) O(V x E)", "B) O(V + E)", "C) O(V2)", "D) O(E log V)"],
      correctAnswer: 1,
      explanation: "DFS visits every vertex once and traverses every edge once — O(V + E) with adjacency lists.",
    },
    {
      question: "DFS is commonly used for:",
      options: [
        "A) Finding shortest paths in weighted graphs",
        "B) Topological sorting and cycle detection",
        "C) Finding the minimum spanning tree",
        "D) Level-order traversal",
      ],
      correctAnswer: 1,
      explanation: "DFS explores all paths deeply first, making it ideal for topological sort, cycle detection, and connected components.",
    },
  ],

  /* Dijkstra */
  "graphs-dijkstra-algorithm": [
    {
      question: "What restriction must edge weights satisfy for Dijkstra to give correct results?",
      options: [
        "A) All weights must be equal",
        "B) All weights must be non-negative",
        "C) All weights must be integers",
        "D) The graph must be a tree",
      ],
      correctAnswer: 1,
      explanation: "Dijkstra's greedy relaxation assumes a settled vertex cannot be improved. A negative edge can invalidate settled vertices, producing wrong results.",
    },
    {
      question: "Using a binary min-heap, what is the time complexity of Dijkstra?",
      options: ["A) O(V2)", "B) O(E)", "C) O((V + E) log V)", "D) O(V log E)"],
      correctAnswer: 2,
      explanation: "V extract-min operations (O(log V) each) plus E decrease-key operations (O(log V) each) gives O((V + E) log V).",
    },
    {
      question: "Dijkstra's algorithm is an example of which paradigm?",
      options: ["A) Dynamic Programming", "B) Divide and Conquer", "C) Greedy", "D) Backtracking"],
      correctAnswer: 2,
      explanation: "Dijkstra greedily selects the unvisited vertex with the smallest known distance and permanently settles it.",
    },
  ],

  /* Floyd-Warshall */
  "graphs-floyd-warshall-algorithm": [
    {
      question: "What does Floyd-Warshall compute?",
      options: [
        "A) Single-source shortest paths",
        "B) All-pairs shortest paths",
        "C) Minimum spanning tree",
        "D) Topological order",
      ],
      correctAnswer: 1,
      explanation: "Floyd-Warshall computes shortest paths between every pair of vertices using a dynamic-programming distance matrix.",
    },
    {
      question: "What is the time complexity of Floyd-Warshall?",
      options: ["A) O(V2)", "B) O(V2 log V)", "C) O(V3)", "D) O(E log V)"],
      correctAnswer: 2,
      explanation: "Three nested loops over V vertices each give O(V3) time.",
    },
    {
      question: "How does Floyd-Warshall detect negative cycles?",
      options: [
        "A) If any off-diagonal entry is negative after completion",
        "B) If any diagonal entry dist[i][i] becomes negative",
        "C) By running Bellman-Ford afterwards",
        "D) It cannot detect negative cycles",
      ],
      correctAnswer: 1,
      explanation: "If dist[i][i] < 0 after the algorithm, vertex i is part of a negative-weight cycle.",
    },
  ],

  /* Recursion */
  "extra-Recursion-recursion": [
    {
      question: "What is the role of a base case in recursion?",
      options: [
        "A) It makes the function run faster",
        "B) It stops the recursive calls and prevents infinite recursion",
        "C) It initialises the accumulator variable",
        "D) It converts the recursion to iteration",
      ],
      correctAnswer: 1,
      explanation: "The base case is a condition that terminates recursion. Without it the function calls itself indefinitely, causing a stack overflow.",
    },
    {
      question: "What happens if a recursive function lacks a base case?",
      options: [
        "A) It returns 0 by default",
        "B) It causes a stack overflow due to infinite recursion",
        "C) The compiler rejects it",
        "D) It runs once and exits",
      ],
      correctAnswer: 1,
      explanation: "Without a base case, each call pushes a new frame until memory is exhausted — a stack overflow.",
    },
    {
      question: "Which of the following is an advantage of tail recursion?",
      options: [
        "A) It always runs faster than iteration",
        "B) Compilers can optimise it to avoid growing the call stack",
        "C) It eliminates the need for base cases",
        "D) It automatically memoises results",
      ],
      correctAnswer: 1,
      explanation: "Tail-call optimisation (TCO) reuses the current stack frame for a tail-recursive call, reducing space complexity to O(1).",
    },
  ],

  /* Sortings overview */
  "extra-sortings-Sortings": [
    {
      question: "Which sorting algorithm is NOT stable by default?",
      options: ["A) Merge Sort", "B) Bubble Sort", "C) Quick Sort", "D) Insertion Sort"],
      correctAnswer: 2,
      explanation: "Quick Sort's partition step can move equal elements past each other. Merge Sort, Bubble Sort, and Insertion Sort are stable in their standard implementations.",
    },
    {
      question: "Which algorithm achieves the best average-case for comparison sorts?",
      options: [
        "A) Bubble Sort — O(n2)",
        "B) Selection Sort — O(n2)",
        "C) Merge Sort / Quick Sort — O(n log n)",
        "D) Insertion Sort — O(n2)",
      ],
      correctAnswer: 2,
      explanation: "The lower bound for comparison sorting is Omega(n log n). Merge Sort meets it always; Quick Sort on average.",
    },
    {
      question: "Which sort minimises memory writes, making it suitable when writes are expensive?",
      options: [
        "A) Bubble Sort — O(n2) writes",
        "B) Merge Sort — O(n) writes",
        "C) Selection Sort — O(n) writes",
        "D) Insertion Sort — O(n2) writes",
      ],
      correctAnswer: 2,
      explanation: "Selection Sort performs at most n-1 swaps (one per pass), minimising write operations.",
    },
  ],

  /* LCS / Dynamic Programming */
  "extra-dynamic-programming-longest-common-subsequence": [
    {
      question: "What is the time complexity of the standard DP solution to LCS?",
      options: ["A) O(m + n)", "B) O(m x n)", "C) O(m log n)", "D) O(2^(m+n))"],
      correctAnswer: 1,
      explanation: "The DP table has m x n cells, each filled in O(1) — giving O(m x n) overall.",
    },
    {
      question: "What does 'subsequence' mean, compared to 'substring'?",
      options: [
        "A) Characters must be contiguous",
        "B) Characters can be non-contiguous but must keep their relative order",
        "C) Characters can appear in any order",
        "D) The sequence must be sorted",
      ],
      correctAnswer: 1,
      explanation: "A subsequence preserves relative order but allows skips; a substring requires all characters to be adjacent.",
    },
    {
      question: "LCS has real-world applications in:",
      options: [
        "A) Network routing only",
        "B) DNA sequence alignment, diff tools, and version control",
        "C) Sorting algorithms",
        "D) Hash table collision resolution",
      ],
      correctAnswer: 1,
      explanation: "LCS is fundamental in bioinformatics (DNA/protein alignment), text diff tools, and version control systems like Git.",
    },
  ],
};

export default docQuizData;
