/**
 * RealWorldUsesTab.tsx
 *
 * Inline "Real-World Uses" panel for challenge layouts.
 * Maps a challenge title / category keyword → AlgorithmUseCases key,
 * shows the relevant applications inline, and offers a deep-link to
 * /applications?algo=<key> for the full interactive page.
 */
import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { getCanonicalAlgoKey, toCanonicalSlug, type AlgoKey } from "../utils/slugUtils";
import {
  FiCompass,
  FiExternalLink,
  FiCpu,
  FiFolder,
  FiShare2,
  FiSearch,
  FiMap,
  FiDatabase,
  FiCode,
  FiGlobe,
  FiGitCommit,
  FiLayers,
} from "react-icons/fi";

/* ── AlgoKey type is imported from ../utils/slugUtils ──────────── */

/* ── Map challenge title keywords → AlgoKey ────────────────────── */
const TITLE_MAP: { pattern: RegExp; key: AlgoKey }[] = [
  // Tree challenges
  { pattern: /tree traversals \(inorder, preorder, postorder\)/i, key: "Trees" },
  { pattern: /maximum depth of binary tree/i,              key: "Trees" },
  { pattern: /count leaf nodes/i,                         key: "Trees" },
  { pattern: /sum of all nodes/i,                         key: "Trees" },
  { pattern: /level order traversal/i,                    key: "Trees" },
  { pattern: /lowest common ancestor/i,                   key: "Trees" },
  { pattern: /validate binary search tree/i,              key: "Trees" },
  { pattern: /diameter of binary tree/i,                  key: "Trees" },
  { pattern: /left view \/ right view of binary tree/i,   key: "Trees" },
  { pattern: /serialize and deserialize binary tree/i,    key: "Trees" },
  { pattern: /vertical order traversal/i,                 key: "Trees" },
  { pattern: /construct tree from traversal arrays/i,     key: "Trees" },
  { pattern: /binary tree maximum path sum/i,             key: "Trees" },
  { pattern: /recover binary search tree/i,               key: "Trees" },
  { pattern: /symmetric tree/i,                           key: "Trees" },

  // Graph challenges
  { pattern: /graph representation \(adjacency list & matrix\)/i, key: "Graphs" },
  { pattern: /depth first search \(dfs\)/i,                         key: "DFS" },
  { pattern: /breadth first search \(bfs\)/i,                       key: "BFS" },
  { pattern: /number of connected components/i,                      key: "Graphs" },
  { pattern: /find path between two nodes/i,                         key: "DFS" },
  { pattern: /detect cycle in an undirected graph/i,                 key: "DFS" },
  { pattern: /detect cycle in a directed graph/i,                    key: "DFS" },
  { pattern: /topological sort/i,                                    key: "DFS" },
  { pattern: /bipartite graph check/i,                               key: "BFS" },
  { pattern: /shortest path in unweighted graph/i,                    key: "BFS" },
  { pattern: /dijkstra's algorithm/i,                                key: "Dijkstra Algorithm" },
  { pattern: /bellman-ford algorithm/i,                              key: "Dijkstra Algorithm" },
  { pattern: /floyd-warshall algorithm/i,                            key: "Dijkstra Algorithm" },
  { pattern: /minimum spanning tree \(kruskal's & prim's\)/i,       key: "Graphs" },
  { pattern: /strongly connected components \(kosaraju\/tarjan\)/i, key: "DFS" },

  // Greedy challenges
  { pattern: /assign cookies/i,                                      key: "Greedy Algorithms" },
  { pattern: /maximum number of meetings/i,                         key: "Greedy Algorithms" },
  { pattern: /lemonade change/i,                                    key: "Greedy Algorithms" },
  { pattern: /can place flowers/i,                                  key: "Greedy Algorithms" },
  { pattern: /minimum absolute difference/i,                        key: "Greedy Algorithms" },
  { pattern: /activity selection problem/i,                          key: "Greedy Algorithms" },
  { pattern: /fractional knapsack/i,                                key: "Greedy Algorithms" },
  { pattern: /jump game/i,                                           key: "Greedy Algorithms" },
  { pattern: /gas station/i,                                         key: "Greedy Algorithms" },
  { pattern: /non-overlapping intervals/i,                          key: "Greedy Algorithms" },
  { pattern: /minimum number of arrows to burst balloons/i,         key: "Greedy Algorithms" },
  { pattern: /partition labels/i,                                    key: "Greedy Algorithms" },
  { pattern: /job sequencing with deadlines/i,                      key: "Greedy Algorithms" },
  { pattern: /huffman coding/i,                                      key: "Greedy Algorithms" },
  { pattern: /minimum platforms required/i,                         key: "Greedy Algorithms" },
  { pattern: /minimum cost to connect ropes/i,                       key: "Greedy Algorithms" },
  { pattern: /reorganize string/i,                                   key: "Greedy Algorithms" },
  { pattern: /remove k digits/i,                                     key: "Greedy Algorithms" },
  { pattern: /course schedule iii/i,                                key: "Greedy Algorithms" },

  { pattern: /bubble sort/i,           key: "Bubble Sort" },
  { pattern: /merge sort/i,            key: "Merge Sort" },
  { pattern: /quick sort/i,            key: "Quick Sort" },
  { pattern: /heap sort/i,             key: "Heaps" },
  { pattern: /binary search/i,         key: "Binary Search" },
  { pattern: /\bdfs\b|depth.first/i,   key: "DFS" },
  { pattern: /\bbfs\b|breadth.first/i, key: "BFS" },
  { pattern: /dijkstra/i,              key: "Dijkstra Algorithm" },
  { pattern: /backtrack/i,             key: "Backtracking" },
  { pattern: /greedy/i,                key: "Greedy Algorithms" },
  { pattern: /dynamic prog|knapsack|coin change|fibonacci|lcs|longest/i, key: "Dynamic Programming" },
  { pattern: /\btree\b|bst|binary tree|inorder|preorder|postorder/i, key: "Trees" },
  { pattern: /\bgraph\b/i,             key: "Graphs" },
  { pattern: /\bheap\b|priority queue/i, key: "Heaps" },
  { pattern: /\btrie\b/i,              key: "Tries" },
  { pattern: /linked list/i,           key: "Linked List" },
  { pattern: /\bstack\b/i,             key: "Stack" },
  { pattern: /\bqueue\b/i,             key: "Queue" },
  { pattern: /recurs/i,                key: "Recursion" },
  { pattern: /sort/i,                  key: "Quick Sort" },
];

/* ── Category → AlgoKey fallback ───────────────────────────────── */
const CATEGORY_MAP: Record<string, AlgoKey> = {
  sorting:            "Quick Sort",
  graph:              "Graphs",
  graphs:             "Graphs",
  dp:                 "Dynamic Programming",
  "dynamic-programming": "Dynamic Programming",
  greedy:             "Greedy Algorithms",
  tree:               "Trees",
  trees:              "Trees",
  backtracking:       "Backtracking",
  heap:               "Heaps",
  heaps:              "Heaps",
  trie:               "Tries",
  tries:              "Tries",
  "linked-list":      "Linked List",
  stack:              "Stack",
  queue:              "Queue",
  recursion:          "Recursion",
};

/* ── Icon map ───────────────────────────────────────────────────── */
const ICON_MAP: Record<AlgoKey, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  Trees:                { icon: FiFolder,    color: "text-green-500" },
  Graphs:               { icon: FiShare2,    color: "text-blue-500" },
  "Binary Search":      { icon: FiSearch,    color: "text-cyan-500" },
  "Dijkstra Algorithm": { icon: FiMap,       color: "text-orange-500" },
  "Linked List":        { icon: FiDatabase,  color: "text-pink-500" },
  BFS:                  { icon: FiGlobe,     color: "text-indigo-500" },
  DFS:                  { icon: FiGlobe,     color: "text-indigo-500" },
  Backtracking:         { icon: FiCode,      color: "text-red-500" },
  "Greedy Algorithms":  { icon: FiCompass,   color: "text-yellow-500" },
  Heaps:                { icon: FiLayers,    color: "text-purple-500" },
  Tries:                { icon: FiGitCommit, color: "text-emerald-500" },
  "Bubble Sort":        { icon: FiCpu,       color: "text-slate-400" },
  "Merge Sort":         { icon: FiCpu,       color: "text-blue-400" },
  "Quick Sort":         { icon: FiCpu,       color: "text-orange-400" },
  Stack:                { icon: FiLayers,    color: "text-amber-500" },
  Queue:                { icon: FiLayers,    color: "text-teal-500" },
  Recursion:            { icon: FiCode,      color: "text-violet-500" },
  "Dynamic Programming":{ icon: FiCpu,       color: "text-sky-500" },
};

/* ── Inline data (mirrors AlgorithmUseCases data) ──────────────── */
interface Application { title: string; industry: string; explanation: string; learnMore: string; }
interface AlgoDetails  { description: string; applications: Application[]; }

const DATA: Record<AlgoKey, AlgoDetails> = {
  "Binary Search": {
    description: "Binary Search efficiently locates items in sorted data by halving the search space each step.",
    applications: [
      { title: "Search Engines", industry: "Google, Bing", explanation: "Quickly locates relevant documents in massive sorted indexes.", learnMore: "Enables logarithmic search time, making billion-record searches extremely fast." },
      { title: "Database Indexing", industry: "MySQL, PostgreSQL", explanation: "Used in B-Tree indexes for rapid record lookup.", learnMore: "Core component behind efficient SQL queries on large tables." },
      { title: "Auto-complete Systems", industry: "VS Code, Google Search", explanation: "Powers fast dictionary and suggestion lookups.", learnMore: "" },
    ],
  },
  "Merge Sort": {
    description: "Merge Sort is commonly used in large-scale data processing because of its stable and consistent performance.",
    applications: [
      { title: "External Sorting", industry: "Hadoop, Apache Spark", explanation: "Sorts data larger than available memory by dividing and merging.", learnMore: "Guarantees O(n log n) performance and is stable." },
      { title: "Database Operations", industry: "MySQL, PostgreSQL", explanation: "Used for sorting large query results efficiently.", learnMore: "" },
      { title: "Big Data Processing", industry: "Data Warehousing", explanation: "Sorting logs and analytics data at scale.", learnMore: "" },
    ],
  },
  "Bubble Sort": {
    description: "Bubble Sort is mainly used for learning sorting concepts due to its simple implementation.",
    applications: [
      { title: "Educational Tools", industry: "Algorithm Visualizers", explanation: "Ideal for teaching sorting concepts due to its simplicity.", learnMore: "Easy to visualize step-by-step swaps." },
      { title: "Small Datasets", industry: "Embedded Systems", explanation: "Used when dataset size is very small and simplicity matters.", learnMore: "" },
    ],
  },
  "Quick Sort": {
    description: "Quick Sort is widely used because of its fast average performance and efficient divide-and-conquer approach.",
    applications: [
      { title: "Language Standard Libraries", industry: "C++, Java, Python", explanation: "Default implementation for efficient in-memory sorting.", learnMore: "Excellent average-case performance with good cache behavior." },
      { title: "Competitive Programming", industry: "LeetCode, Codeforces", explanation: "Fast sorting solution for contest problems.", learnMore: "" },
      { title: "Data Analysis", industry: "Pandas, Excel", explanation: "Used internally for sorting large tabular data.", learnMore: "" },
    ],
  },
  DFS: {
    description: "Depth First Search explores nodes deeply before backtracking and is useful in graph traversal.",
    applications: [
      { title: "Maze Solving & Pathfinding", industry: "Games & Robotics", explanation: "Explores deep paths before backtracking.", learnMore: "Used in puzzle games and AI navigation." },
      { title: "File System Traversal", industry: "Operating Systems", explanation: "Recursively explores directories and files.", learnMore: "" },
      { title: "Cycle Detection", industry: "Graph Databases", explanation: "Detects loops in dependency graphs.", learnMore: "" },
    ],
  },
  BFS: {
    description: "Breadth First Search explores level by level and helps find shortest paths in unweighted graphs.",
    applications: [
      { title: "Shortest Path Finding", industry: "Google Maps, Social Networks", explanation: "Finds minimum number of edges in unweighted graphs.", learnMore: "Basis for friend suggestions and minimum moves problems." },
      { title: "Web Crawling", industry: "Search Engines", explanation: "Explores websites level by level.", learnMore: "" },
      { title: "Network Broadcasting", industry: "Telecom", explanation: "Spreads information efficiently across networks.", learnMore: "" },
    ],
  },
  "Dijkstra Algorithm": {
    description: "Dijkstra Algorithm is used to calculate shortest paths efficiently in weighted graphs.",
    applications: [
      { title: "GPS Navigation", industry: "Google Maps, Uber, Apple Maps", explanation: "Calculates shortest routes with real road weights.", learnMore: "Powers real-time navigation worldwide." },
      { title: "Network Routing", industry: "Internet & Telecom", explanation: "Used in OSPF routing protocols.", learnMore: "" },
      { title: "Game Pathfinding", industry: "Video Games", explanation: "AI finds optimal paths considering obstacles.", learnMore: "" },
    ],
  },
  Stack: {
    description: "Stack follows LIFO order and is commonly used in recursion, browser history, and undo operations.",
    applications: [
      { title: "Undo/Redo Functionality", industry: "VS Code, Photoshop, Word", explanation: "Stores action history for reversal.", learnMore: "" },
      { title: "Browser History", industry: "Chrome, Firefox", explanation: "Manages back and forward navigation.", learnMore: "" },
      { title: "Expression Evaluation", industry: "Compilers", explanation: "Handles parentheses and operator precedence.", learnMore: "" },
    ],
  },
  Queue: {
    description: "Queue follows FIFO order and is widely used in scheduling and resource-sharing systems.",
    applications: [
      { title: "CPU Scheduling", industry: "Operating Systems", explanation: "Manages processes in Round Robin scheduling.", learnMore: "" },
      { title: "Print Spooling", industry: "Printer Systems", explanation: "Handles print jobs in arrival order.", learnMore: "" },
      { title: "Task Processing", industry: "Background Jobs (Celery, Kafka)", explanation: "Processes asynchronous tasks fairly.", learnMore: "" },
    ],
  },
  "Linked List": {
    description: "Linked Lists allow dynamic memory allocation and flexible insertion or deletion of elements.",
    applications: [
      { title: "Music Playlists", industry: "Spotify, Apple Music", explanation: "Efficient song insertion, deletion, and reordering.", learnMore: "Doubly linked lists support seamless next/previous." },
      { title: "Memory Management", industry: "Operating Systems", explanation: "Dynamic allocation of memory blocks.", learnMore: "" },
      { title: "Browser History & Navigation", industry: "Web Browsers", explanation: "Maintains session navigation.", learnMore: "" },
    ],
  },
  Recursion: {
    description: "Recursion solves problems by repeatedly calling the same function with smaller inputs.",
    applications: [
      { title: "Tree & Graph Traversal", industry: "File Systems, Databases", explanation: "Naturally solves hierarchical problems.", learnMore: "" },
      { title: "Backtracking Problems", industry: "AI & Puzzle Solvers", explanation: "Used in Sudoku, N-Queens, etc.", learnMore: "" },
      { title: "Divide and Conquer", industry: "Sorting & Searching", explanation: "Foundation for Merge Sort and Quick Sort.", learnMore: "" },
    ],
  },
  "Dynamic Programming": {
    description: "Dynamic Programming stores previously computed results to optimize complex recursive problems.",
    applications: [
      { title: "Route Optimization", industry: "Amazon, Uber, Logistics", explanation: "Optimal delivery path and cost calculation.", learnMore: "" },
      { title: "Game Development", industry: "Chess Engines, Video Games", explanation: "Minimax with memoization for decision making.", learnMore: "" },
      { title: "Resource Allocation", industry: "Finance & Operations", explanation: "Knapsack and scheduling optimization.", learnMore: "" },
    ],
  },
  Trees: {
    description: "Trees are hierarchical data structures widely used in operating systems, databases, and web development.",
    applications: [
      { title: "File Systems", industry: "Windows, Linux, macOS", explanation: "Represents directory hierarchies.", learnMore: "" },
      { title: "Database Indexing", industry: "MySQL, MongoDB", explanation: "B-Trees and AVL Trees for fast queries.", learnMore: "" },
      { title: "DOM Structure", industry: "Web Browsers", explanation: "HTML document object model.", learnMore: "" },
      { title: "Autocomplete & Search", industry: "Google, IDEs", explanation: "Trie-based trees for suggestions.", learnMore: "" },
    ],
  },
  Graphs: {
    description: "Graphs represent relationships between entities and are heavily used in networking and recommendation engines.",
    applications: [
      { title: "Social Networks", industry: "Facebook, LinkedIn, Twitter", explanation: "Models user connections and recommendations.", learnMore: "" },
      { title: "Recommendation Systems", industry: "Netflix, Amazon", explanation: "Content and product suggestions.", learnMore: "" },
      { title: "GPS & Navigation", industry: "Google Maps", explanation: "Road networks and routing.", learnMore: "" },
      { title: "Dependency Management", industry: "Software Build Systems", explanation: "Package and task dependencies.", learnMore: "" },
    ],
  },
  Backtracking: {
    description: "Backtracking builds solutions incrementally and backtracks whenever a constraint fails.",
    applications: [
      { title: "Sudoku Solver", industry: "Puzzle Games", explanation: "Fills grid while satisfying constraints.", learnMore: "" },
      { title: "N-Queens Problem", industry: "Algorithm Research", explanation: "Places queens without attacking each other.", learnMore: "" },
      { title: "Permutations & Combinations", industry: "Combinatorial Problems", explanation: "Generates all possible arrangements.", learnMore: "" },
    ],
  },
  "Greedy Algorithms": {
    description: "Greedy Algorithms make the locally optimal choice at each step to achieve a globally optimal solution.",
    applications: [
      { title: "Huffman Coding", industry: "Data Compression (ZIP, JPEG, MP3)", explanation: "Creates optimal prefix codes for compression.", learnMore: "" },
      { title: "Job Sequencing", industry: "Operating Systems", explanation: "Schedules jobs to maximize profit.", learnMore: "" },
      { title: "Activity Selection", industry: "Scheduling Systems", explanation: "Selects maximum non-overlapping activities.", learnMore: "" },
    ],
  },
  Heaps: {
    description: "Heaps are tree-based structures for efficient priority management and fast retrieval of min/max elements.",
    applications: [
      { title: "Priority Queues", industry: "Task Schedulers", explanation: "Always processes highest priority item first.", learnMore: "" },
      { title: "Heap Sort", industry: "System Libraries", explanation: "In-place sorting with O(n log n) guarantee.", learnMore: "" },
      { title: "Kth Largest/Smallest Element", industry: "Data Streaming", explanation: "Real-time analytics and monitoring.", learnMore: "" },
    ],
  },
  Tries: {
    description: "Tries are specialized tree structures used for efficient string storage and fast prefix-based searching.",
    applications: [
      { title: "Autocomplete & Search Suggestions", industry: "Google, IDEs, Mobile Keyboards", explanation: "Fast prefix-based word lookup.", learnMore: "Delivers instant suggestions as you type." },
      { title: "Spell Checker", industry: "Word Processors", explanation: "Efficient dictionary storage and validation.", learnMore: "" },
      { title: "IP Routing", industry: "Networking", explanation: "Longest prefix matching for routers.", learnMore: "" },
    ],
  },
};

/* ── Resolve challenge ID, slug, title + category to an AlgoKey ──────────── */
function resolveKey(
  challengeTitle: string,
  category?: string,
  challengeId?: string,
  challengeSlug?: string
): AlgoKey | null {
  const canonical =
    getCanonicalAlgoKey(challengeId, category) ||
    getCanonicalAlgoKey(challengeSlug, category) ||
    getCanonicalAlgoKey(challengeTitle, category);

  if (canonical) return canonical;

  for (const { pattern, key } of TITLE_MAP) {
    if (pattern.test(challengeTitle)) return key;
  }
  if (category) {
    const normalized = toCanonicalSlug(category);
    if (CATEGORY_MAP[normalized]) return CATEGORY_MAP[normalized];
  }
  return null;
}

/* ── Props ──────────────────────────────────────────────────────── */
interface RealWorldUsesTabProps {
  /** Optional challenge ID */
  challengeId?: string;
  /** Optional challenge slug */
  challengeSlug?: string;
  /** Challenge title, used for keyword matching */
  challengeTitle: string;
  /** Optional category hint ("sorting", "graph", "dp", "greedy", etc.) */
  category?: string;
}

/* ── Component ──────────────────────────────────────────────────── */
export default function RealWorldUsesTab({
  challengeId,
  challengeSlug,
  challengeTitle,
  category,
}: RealWorldUsesTabProps) {
  const algoKey = resolveKey(challengeTitle, category, challengeId, challengeSlug);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (!algoKey) {
    return (
      <div className="p-6 flex flex-col items-center justify-center gap-4 text-center">
        <FiCompass className="w-10 h-10 text-slate-300 dark:text-slate-600" />
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
          Real-world use cases for this algorithm are available on the Applications page.
        </p>
        <Link
          to="/applications"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-sm font-mono font-bold transition-colors no-underline"
        >
          <FiExternalLink className="w-4 h-4" />
          View Applications Page
        </Link>
      </div>
    );
  }

  const data = DATA[algoKey];
  const { icon: AlgoIcon, color: iconColor } = ICON_MAP[algoKey] || { icon: FiCpu, color: "text-blue-500" };
  const deepLink = `/applications?algo=${encodeURIComponent(algoKey)}`;

  return (
    <div className="p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <AlgoIcon className={`w-5 h-5 shrink-0 ${iconColor}`} />
          <div className="min-w-0">
            <h2 className="text-sm font-black text-slate-900 dark:text-white m-0">
              {algoKey} — Real-World Uses
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 m-0 leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
        <Link
          to={deepLink}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--ifm-color-primary)]/10 hover:bg-[var(--ifm-color-primary)]/20 text-[var(--ifm-color-primary)] border border-[var(--ifm-color-primary)]/20 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors no-underline"
          title="Open full interactive applications page"
        >
          <FiExternalLink className="w-3 h-3" />
          Full Page
        </Link>
      </div>

      {/* Application cards */}
      <div className="space-y-3">
        <h3 className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest m-0">
          <FiCompass className="w-3.5 h-3.5 text-[var(--ifm-color-primary)]" />
          Industry Applications
        </h3>

        {data.applications.map((app, i) => {
          const isExp = expanded[app.title] ?? false;
          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:shadow-sm hover:-translate-y-px transition-all duration-150"
            >
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold mb-2">
                {app.industry}
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug m-0 mb-1">
                {app.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                {app.explanation}
              </p>
              {app.learnMore && (
                <>
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [app.title]: !isExp }))}
                    className="mt-2 text-[11px] font-medium text-[var(--ifm-color-primary)] hover:underline flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer"
                  >
                    {isExp ? "− Collapse" : "+ Learn More"}
                  </button>
                  {isExp && (
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                      {app.learnMore}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 dark:text-slate-600 font-mono">
          Matched: <strong>{algoKey}</strong>
        </span>
        <Link
          to={deepLink}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--ifm-color-primary)] hover:underline no-underline transition-colors"
        >
          Explore step-by-step on full page
          <FiExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
