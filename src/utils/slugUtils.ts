/**
 * Centralized utility for canonical ID and slug conversion across the application.
 * Unifies title, topic ID, challenge ID, and frontmatter ID handling to avoid mismatched lookups.
 */

export type AlgoKey =
  | "Binary Search"
  | "Merge Sort"
  | "Bubble Sort"
  | "Quick Sort"
  | "DFS"
  | "BFS"
  | "Dijkstra Algorithm"
  | "Stack"
  | "Queue"
  | "Linked List"
  | "Recursion"
  | "Dynamic Programming"
  | "Trees"
  | "Graphs"
  | "Backtracking"
  | "Greedy Algorithms"
  | "Heaps"
  | "Tries";

/**
 * Converts any string (title, id, or slug) into a clean, canonical URL-safe slug.
 */
export function toCanonicalSlug(value: string): string {
  if (!value) return "";
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/^quiz\s+on\s+/i, "")
    .replace(/^implement\s+/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Standardized slugify function with custom default fallback for component exports / share links.
 */
export function slugify(value: string, fallback: string = "cheatsheet"): string {
  const slug = toCanonicalSlug(value);
  return slug || fallback;
}

const ALGO_KEY_BY_CANONICAL_SLUG: Record<string, AlgoKey> = {
  "binary-search": "Binary Search",
  "merge-sort": "Merge Sort",
  "bubble-sort": "Bubble Sort",
  "quick-sort": "Quick Sort",
  "dfs": "DFS",
  "depth-first-search": "DFS",
  "bfs": "BFS",
  "breadth-first-search": "BFS",
  "dijkstra": "Dijkstra Algorithm",
  "dijkstra-algorithm": "Dijkstra Algorithm",
  "dijkstras-algorithm": "Dijkstra Algorithm",
  "bellman-ford": "Dijkstra Algorithm",
  "floyd-warshall": "Dijkstra Algorithm",
  "stack": "Stack",
  "stacks": "Stack",
  "queue": "Queue",
  "queues": "Queue",
  "linked-list": "Linked List",
  "linked-lists": "Linked List",
  "recursion": "Recursion",
  "recurs": "Recursion",
  "dynamic-programming": "Dynamic Programming",
  "dp": "Dynamic Programming",
  "tree": "Trees",
  "trees": "Trees",
  "binary-tree": "Trees",
  "binary-trees": "Trees",
  "bst": "Trees",
  "binary-search-tree": "Trees",
  "graph": "Graphs",
  "graphs": "Graphs",
  "backtracking": "Backtracking",
  "greedy": "Greedy Algorithms",
  "greedy-algorithms": "Greedy Algorithms",
  "heap": "Heaps",
  "heaps": "Heaps",
  "trie": "Tries",
  "tries": "Tries",
};

const CATEGORY_MAP: Record<string, AlgoKey> = {
  sorting: "Quick Sort",
  graph: "Graphs",
  graphs: "Graphs",
  dp: "Dynamic Programming",
  "dynamic-programming": "Dynamic Programming",
  greedy: "Greedy Algorithms",
  tree: "Trees",
  trees: "Trees",
  backtracking: "Backtracking",
  heap: "Heaps",
  heaps: "Heaps",
  trie: "Tries",
  tries: "Tries",
  "linked-list": "Linked List",
  stack: "Stack",
  queue: "Queue",
  recursion: "Recursion",
};

/**
 * Resolves a given identifier (challenge ID, slug, title, or topic) and optional category
 * into the canonical AlgoKey for algorithm use cases.
 */
export function getCanonicalAlgoKey(input?: string | null, category?: string | null): AlgoKey | null {
  if (input) {
    const slug = toCanonicalSlug(input);
    if (ALGO_KEY_BY_CANONICAL_SLUG[slug]) {
      return ALGO_KEY_BY_CANONICAL_SLUG[slug];
    }

    // Secondary substring matches for complex problem titles
    if (slug.includes("binary-search")) return "Binary Search";
    if (slug.includes("merge-sort")) return "Merge Sort";
    if (slug.includes("bubble-sort")) return "Bubble Sort";
    if (slug.includes("quick-sort")) return "Quick Sort";
    if (slug.includes("heap-sort") || slug.includes("priority-queue")) return "Heaps";
    if (slug.includes("dijkstra") || slug.includes("shortest-path")) return "Dijkstra Algorithm";
    if (slug.includes("dfs") || slug.includes("depth-first")) return "DFS";
    if (slug.includes("bfs") || slug.includes("breadth-first")) return "BFS";
    if (slug.includes("tree") || slug.includes("inorder") || slug.includes("preorder") || slug.includes("postorder") || slug.includes("lca")) return "Trees";
    if (slug.includes("graph")) return "Graphs";
    if (slug.includes("trie")) return "Tries";
    if (slug.includes("linked-list")) return "Linked List";
    if (slug.includes("stack")) return "Stack";
    if (slug.includes("queue")) return "Queue";
    if (slug.includes("backtrack")) return "Backtracking";
    if (slug.includes("greedy") || slug.includes("cookie") || slug.includes("knapsack-fractional")) return "Greedy Algorithms";
    if (slug.includes("dp") || slug.includes("dynamic") || slug.includes("knapsack") || slug.includes("lcs") || slug.includes("fibonacci")) return "Dynamic Programming";
    if (slug.includes("recurs")) return "Recursion";
  }

  if (category) {
    const catSlug = toCanonicalSlug(category);
    if (CATEGORY_MAP[catSlug]) {
      return CATEGORY_MAP[catSlug];
    }
  }

  return null;
}
