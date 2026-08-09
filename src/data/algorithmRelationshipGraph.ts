export type NodeCategory =
  | "foundation"
  | "technique"
  | "sorting"
  | "linear-ds"
  | "tree"
  | "graph"
  | "string"
  | "dp-backtracking";

export interface CatalogNode {
  id: string;
  label: string;
  category: NodeCategory;
  /** Doc URL, e.g. "/docs/graphs/bfs-algorithm". Omit for unlinked concept nodes. */
  url?: string;
  blurb: string;
}

export interface CatalogEdge {
  source: string;
  target: string;
  /** Short phrase describing the relationship, shown on hover/selection */
  relation: string;
}

export const CATEGORY_META: Record<NodeCategory, { label: string; color: string }> = {
  foundation: { label: "Foundations", color: "#64748b" },
  technique: { label: "Techniques", color: "#3b82f6" },
  sorting: { label: "Sorting", color: "#22c55e" },
  "linear-ds": { label: "Linear Data Structures", color: "#14b8a6" },
  tree: { label: "Trees & Range Structures", color: "#a855f7" },
  graph: { label: "Graph Algorithms", color: "#f97316" },
  string: { label: "String Algorithms", color: "#ec4899" },
  "dp-backtracking": { label: "DP & Backtracking", color: "#ef4444" },
};

export const CATALOG_NODES: CatalogNode[] = [
  // Foundations
  { id: "arrays", label: "Arrays", category: "foundation", blurb: "Contiguous, indexable storage — the base most techniques below build on." },
  { id: "strings", label: "Strings", category: "foundation", blurb: "Character sequences; a specialization of arrays with its own algorithm family." },
  { id: "recursion", label: "Recursion", category: "foundation", blurb: "A function calling itself on smaller subproblems — the root idea behind divide-and-conquer, backtracking, and DP." },

  // Techniques
  { id: "two-pointers", label: "Two Pointers", category: "technique", url: "/docs/extra/algorithms/Two-Pointers/introduction-to-two-pointers", blurb: "Two indices scanning an array, often from both ends or at different speeds." },
  { id: "sliding-window", label: "Sliding Window", category: "technique", url: "/docs/extra/Sliding-Window/introduction-to-sliding-window", blurb: "A two-pointer variant that maintains a contiguous window with some invariant." },
  { id: "binary-search", label: "Binary Search", category: "technique", url: "/docs/extra/binary-search/binary-search", blurb: "Halves the search space each step on sorted or monotonic data." },
  { id: "kadane", label: "Kadane's Algorithm", category: "technique", url: "/docs/extra/basic-dsa/array/Kadane-Algorithm", blurb: "Maximum-subarray-sum in one linear pass using local vs. global running sums." },

  // Sorting
  { id: "merge-sort", label: "Merge Sort", category: "sorting", url: "/docs/extra/sortings/merge-sort", blurb: "Divide-and-conquer sort: split, sort halves, merge — stable, O(n log n) worst case." },
  { id: "quick-sort", label: "Quick Sort", category: "sorting", url: "/docs/extra/sortings/quick-sort", blurb: "Divide-and-conquer sort via pivot partitioning — fast average case, in-place." },
  { id: "heap-sort", label: "Heap Sort", category: "sorting", url: "/docs/extra/basic-dsa/array/heap-sort", blurb: "Builds a heap, then repeatedly extracts the max — O(n log n), in-place." },

  // Linear data structures
  { id: "stack", label: "Stack", category: "linear-ds", url: "/docs/extra/Stack/introduction-to-stack", blurb: "LIFO structure — mirrors what the call stack does during recursion." },
  { id: "queue", label: "Queue", category: "linear-ds", url: "/docs/extra/Queue/priority-queue", blurb: "FIFO structure — the engine behind level-order traversal and BFS." },
  { id: "linked-list", label: "Linked List", category: "linear-ds", url: "/docs/extra/linked-list/floyds-cycle-detection", blurb: "Node-and-pointer chain — O(1) insert/delete at a known position, no random access." },
  { id: "hash-table", label: "Hash Table", category: "linear-ds", url: "/docs/extra/hash/hash-tables", blurb: "Amortized O(1) lookup via hashing — underlies rolling-hash string matching." },

  // Trees & range structures
  { id: "bst", label: "Binary Search Tree", category: "tree", url: "/docs/extra/Trees/binary-search-tree", blurb: "Ordered binary tree — binary search generalized into a dynamic structure." },
  { id: "avl-tree", label: "AVL Tree", category: "tree", url: "/docs/extra/binary-search-tree/avl-tree", blurb: "A self-balancing BST that bounds height to O(log n) via rotations." },
  { id: "red-black-tree", label: "Red-Black Tree", category: "tree", url: "/docs/extra/red-black-tree", blurb: "Another self-balancing BST — looser balance than AVL, cheaper rebalancing." },
  { id: "heap", label: "Heap / Priority Queue", category: "tree", url: "/docs/extra/Queue/priority-queue", blurb: "Complete binary tree with a heap-order property — powers heap sort and Dijkstra." },
  { id: "trie", label: "Trie", category: "tree", url: "/docs/extra/trie-data-structure", blurb: "Prefix tree over strings — fast prefix search, autocomplete, dictionary matching." },
  { id: "segment-tree", label: "Segment Tree", category: "tree", url: "/docs/extra/advance-data-structure/segment-tree", blurb: "Binary tree over an array enabling O(log n) range queries and updates." },
  { id: "fenwick-tree", label: "Fenwick Tree", category: "tree", url: "/docs/extra/advance-data-structure/fenwick-tree", blurb: "A leaner structure for prefix-sum-style range queries — simpler than a segment tree." },
  { id: "sqrt-decomposition", label: "Sqrt Decomposition", category: "tree", url: "/docs/extra/advance-data-structure/sqrt-decomposition", blurb: "Blocks of size √n trade a bit of speed for a much simpler implementation than a segment tree." },
  { id: "persistent-segment-tree", label: "Persistent Segment Tree", category: "tree", url: "/docs/extra/advance-data-structure/persistent-segment-tree", blurb: "A segment tree that keeps every past version accessible after an update." },
  { id: "heavy-light-decomposition", label: "Heavy-Light Decomposition", category: "tree", url: "/docs/extra/advance-data-structure/heavy-light-decomposition", blurb: "Breaks a tree into chains so a segment tree can answer path queries in O(log² n)." },
  { id: "disjoint-set", label: "Disjoint Set (Union-Find)", category: "tree", url: "/docs/extra/advance-data-structure/disjoint-set", blurb: "Tracks connected components with near-O(1) union/find — the core of Kruskal's MST." },

  // Graph algorithms
  { id: "bfs", label: "BFS", category: "graph", url: "/docs/graphs/bfs-algorithm", blurb: "Level-by-level graph traversal using a queue — finds shortest paths in unweighted graphs." },
  { id: "dfs", label: "DFS", category: "graph", url: "/docs/graphs/dfs-algorithm", blurb: "Depth-first graph traversal using a stack (or recursion) — the base for many graph algorithms." },
  { id: "topological-sort", label: "Topological Sort", category: "graph", url: "/docs/graphs/topological-sort", blurb: "Linear ordering of a DAG's nodes so every edge points forward." },
  { id: "kahns-algorithm", label: "Kahn's Algorithm", category: "graph", url: "/docs/graphs/kahns-algorithm", blurb: "BFS-based topological sort using in-degree counting." },
  { id: "cycle-detection", label: "Cycle Detection", category: "graph", url: "/docs/graphs/cycle-detection-undirected", blurb: "Detects cycles via DFS back-edges (or a failed topological sort in a DAG)." },
  { id: "dijkstra", label: "Dijkstra's Algorithm", category: "graph", url: "/docs/graphs/dijkstra-algorithm", blurb: "Greedy shortest path from one source, using a priority queue — requires non-negative weights." },
  { id: "astar", label: "A* Search", category: "graph", url: "/docs/graphs/astar-search-algorithm", blurb: "Dijkstra plus a heuristic that guides the search toward the goal faster." },
  { id: "bellman-ford", label: "Bellman-Ford", category: "graph", url: "/docs/graphs/bellman-ford-algorithm", blurb: "Slower than Dijkstra but handles negative edge weights and detects negative cycles." },
  { id: "floyd-warshall", label: "Floyd-Warshall", category: "graph", url: "/docs/graphs/floyd-warshall-algorithm", blurb: "All-pairs shortest paths via dynamic programming over intermediate nodes." },
  { id: "kosaraju", label: "Kosaraju's Algorithm", category: "graph", url: "/docs/graphs/kosaraju-algorithm", blurb: "Finds strongly connected components using two passes of DFS." },
  { id: "tarjan", label: "Tarjan's Algorithm", category: "graph", url: "/docs/graphs/tarjans-algorithm", blurb: "Finds strongly connected components in a single DFS pass using low-link values." },
  { id: "kruskal", label: "Kruskal's Algorithm", category: "graph", url: "/docs/extra/graphs/kruskal-algorithm", blurb: "Greedy minimum spanning tree — sorts edges, unions components with Disjoint Set." },
  { id: "prim", label: "Prim's Algorithm", category: "graph", url: "/docs/extra/graphs/prims-algorithm", blurb: "Greedy minimum spanning tree — grows one tree outward using a priority queue." },

  // String algorithms
  { id: "kmp", label: "KMP Algorithm", category: "string", url: "/docs/extra/algorithms/string-algorithms/kmp-algorithm", blurb: "Linear-time string matching using a precomputed failure function to avoid re-scanning." },
  { id: "rabin-karp", label: "Rabin-Karp", category: "string", url: "/docs/extra/algorithms/string-algorithms/rabin-karp-algorithms", blurb: "String matching via rolling hash — compares hashes before falling back to a full check." },

  // DP & backtracking
  { id: "backtracking", label: "Backtracking", category: "dp-backtracking", blurb: "Recursion that explores choices and undoes ('backtracks') ones that fail a constraint." },
  { id: "dynamic-programming", label: "Dynamic Programming", category: "dp-backtracking", url: "/docs/extra/dynamic-programming/approaches", blurb: "Recursion plus memoization — caches subproblem answers to avoid recomputation." },
  { id: "lcs", label: "Longest Common Subsequence", category: "dp-backtracking", url: "/docs/extra/dynamic-programming/longest_common_subsequence", blurb: "A classic 2D DP problem — the template for many string/sequence DP problems." },
];

export const CATALOG_EDGES: CatalogEdge[] = [
  { source: "arrays", target: "two-pointers", relation: "applied to" },
  { source: "arrays", target: "sliding-window", relation: "applied to" },
  { source: "two-pointers", target: "sliding-window", relation: "specializes into" },
  { source: "arrays", target: "binary-search", relation: "requires sorted" },
  { source: "arrays", target: "kadane", relation: "applied to" },
  { source: "binary-search", target: "bst", relation: "generalizes into" },

  { source: "recursion", target: "backtracking", relation: "specializes into" },
  { source: "recursion", target: "merge-sort", relation: "powers" },
  { source: "recursion", target: "dynamic-programming", relation: "specializes into" },
  { source: "backtracking", target: "dynamic-programming", relation: "compares with" },
  { source: "stack", target: "recursion", relation: "mirrors the call stack" },

  { source: "merge-sort", target: "quick-sort", relation: "compares with" },
  { source: "arrays", target: "heap-sort", relation: "applied to" },
  { source: "heap-sort", target: "heap", relation: "uses" },

  { source: "queue", target: "bfs", relation: "powers" },
  { source: "stack", target: "dfs", relation: "powers" },
  { source: "bfs", target: "topological-sort", relation: "alternative for" },
  { source: "kahns-algorithm", target: "topological-sort", relation: "implements" },
  { source: "bfs", target: "kahns-algorithm", relation: "underlies" },
  { source: "dfs", target: "topological-sort", relation: "alternative for" },
  { source: "dfs", target: "cycle-detection", relation: "detects via back-edges" },
  { source: "topological-sort", target: "cycle-detection", relation: "fails if a cycle exists" },
  { source: "dfs", target: "kosaraju", relation: "two-pass basis for" },
  { source: "dfs", target: "tarjan", relation: "single-pass basis for" },
  { source: "kosaraju", target: "tarjan", relation: "compares with" },

  { source: "bfs", target: "dijkstra", relation: "generalized (weighted) by" },
  { source: "heap", target: "dijkstra", relation: "used by" },
  { source: "dijkstra", target: "astar", relation: "specializes into" },
  { source: "dijkstra", target: "bellman-ford", relation: "compares with" },
  { source: "bellman-ford", target: "floyd-warshall", relation: "single-source vs. all-pairs" },

  { source: "disjoint-set", target: "kruskal", relation: "used by" },
  { source: "heap", target: "prim", relation: "used by" },
  { source: "kruskal", target: "prim", relation: "both build an MST" },

  { source: "hash-table", target: "rabin-karp", relation: "rolling hash powers" },
  { source: "rabin-karp", target: "kmp", relation: "compares with" },
  { source: "trie", target: "kmp", relation: "both do string matching" },
  { source: "strings", target: "trie", relation: "indexed by" },
  { source: "strings", target: "kmp", relation: "searched with" },

  { source: "bst", target: "avl-tree", relation: "self-balances into" },
  { source: "avl-tree", target: "red-black-tree", relation: "compares with" },
  { source: "segment-tree", target: "fenwick-tree", relation: "compares with" },
  { source: "segment-tree", target: "sqrt-decomposition", relation: "compares with" },
  { source: "segment-tree", target: "persistent-segment-tree", relation: "specializes into" },
  { source: "segment-tree", target: "heavy-light-decomposition", relation: "combined with tree DFS in" },

  { source: "dynamic-programming", target: "lcs", relation: "classic example" },
  { source: "linked-list", target: "stack", relation: "can implement" },
  { source: "linked-list", target: "queue", relation: "can implement" },
];
