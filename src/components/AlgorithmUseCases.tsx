import React, { useState } from "react";
import {
  FiCpu,
  FiCompass,
  FiGitCommit,
  FiFolder,
  FiDatabase,
  FiCode,
  FiSearch,
  FiMap,
  FiGlobe,
  FiShare2,
  FiLayers,
} from "react-icons/fi";

interface AlgorithmDetails {
  applications: string[];
  description: string;
  steps: string[];
}

const algorithmData: Record<string, AlgorithmDetails> = {
  "Binary Search": {
    applications: ["Search engines", "Database indexing", "Dictionary search"],
    description:
      "Binary Search is used to quickly find elements in sorted data. It reduces search time by repeatedly dividing the search space into halves.",
    steps: [
      "Find the middle element",
      "Compare target with middle value",
      "Move left or right accordingly",
      "Repeat until element is found",
    ],
  },

  "Merge Sort": {
    applications: [
      "Big data processing",
      "External sorting",
      "Stable sorting systems",
    ],
    description:
      "Merge Sort is commonly used in large-scale data processing because of its stable and consistent performance on large datasets.",
    steps: [
      "Divide array into smaller halves",
      "Recursively sort both halves",
      "Merge sorted halves together",
      "Repeat until fully sorted",
    ],
  },

  "Bubble Sort": {
    applications: [
      "Educational purposes",
      "Small datasets",
      "Beginner learning",
    ],
    description:
      "Bubble Sort is mainly used for learning sorting concepts because of its simple implementation and easy visualization.",
    steps: [
      "Compare adjacent elements",
      "Swap if elements are in wrong order",
      "Move largest element to the end",
      "Repeat until array becomes sorted",
    ],
  },

  "Quick Sort": {
    applications: [
      "Fast in-memory sorting",
      "Programming libraries",
      "Competitive programming",
    ],
    description:
      "Quick Sort is widely used because of its fast average performance and efficient divide-and-conquer approach.",
    steps: [
      "Choose a pivot element",
      "Partition elements around pivot",
      "Recursively sort left side",
      "Recursively sort right side",
    ],
  },

  DFS: {
    applications: ["Maze solving", "Path finding", "Graph traversal"],
    description:
      "Depth First Search explores nodes deeply before backtracking and is useful in graph traversal and path exploration.",
    steps: [
      "Start from root node",
      "Visit adjacent unvisited node",
      "Move deeper recursively",
      "Backtrack when needed",
    ],
  },

  BFS: {
    applications: [
      "Shortest path in graphs",
      "Social network connections",
      "Web crawling",
    ],
    description:
      "Breadth First Search explores level by level and helps find shortest paths in unweighted graphs.",
    steps: [
      "Start from source node",
      "Visit all neighboring nodes",
      "Add neighbors into queue",
      "Repeat level-by-level",
    ],
  },

  "Dijkstra Algorithm": {
    applications: ["Google Maps", "GPS navigation", "Network routing"],
    description:
      "Dijkstra Algorithm is used to calculate shortest paths efficiently in weighted graphs.",
    steps: [
      "Start from source node",
      "Assign shortest tentative distance",
      "Visit nearest unvisited node",
      "Update neighboring distances",
    ],
  },

  Stack: {
    applications: ["Undo feature", "Expression evaluation", "Browser history"],
    description:
      "Stack follows LIFO order and is commonly used in recursion, browser history, and undo operations.",
    steps: [
      "Push elements into stack",
      "Access top element",
      "Pop top element when needed",
      "Repeat operations in LIFO order",
    ],
  },

  Queue: {
    applications: ["CPU scheduling", "Printer queue", "Task processing"],
    description:
      "Queue follows FIFO order and is widely used in scheduling and resource-sharing systems.",
    steps: [
      "Insert element at rear",
      "Process front element",
      "Remove processed element",
      "Continue in FIFO order",
    ],
  },

  "Linked List": {
    applications: [
      "Music playlists",
      "Memory management",
      "Dynamic data storage",
    ],
    description:
      "Linked Lists allow dynamic memory allocation and flexible insertion or deletion of elements.",
    steps: [
      "Create nodes dynamically",
      "Connect nodes using pointers",
      "Traverse node-by-node",
      "Insert or delete efficiently",
    ],
  },

  Recursion: {
    applications: [
      "Tree traversal",
      "Backtracking problems",
      "Divide and conquer algorithms",
    ],
    description:
      "Recursion solves problems by repeatedly calling the same function with smaller inputs.",
    steps: [
      "Define base condition",
      "Call function recursively",
      "Reduce problem size",
      "Return result after base case",
    ],
  },

  "Dynamic Programming": {
    applications: [
      "Optimization problems",
      "Game development",
      "Resource management",
    ],
    description:
      "Dynamic Programming stores previously computed results to optimize complex recursive problems.",
    steps: [
      "Break problem into subproblems",
      "Store computed results",
      "Reuse stored values",
      "Build final optimized solution",
    ],
  },

  Trees: {
    applications: [
      "File systems and directory structures",
      "Database indexing using B-Trees and AVL Trees",
      "DOM structure in web development",
      "Decision trees in Machine Learning",
      "Expression trees in compilers",
      "Trie structures for autocomplete/search suggestions",
    ],
    description:
      "Trees are hierarchical data structures widely used in operating systems, databases, web development, machine learning, and search systems.",
    steps: [
      "Organize data hierarchically",
      "Connect parent and child nodes",
      "Traverse using DFS or BFS",
      "Perform insertion, deletion, and searching efficiently",
    ],
  },

  Graphs: {
    applications: [
      "Social networks",
      "GPS and shortest path algorithms",
      "Recommendation systems",
      "Network routing",
      "Web crawling and search engines",
      "Dependency graphs in software engineering",
    ],
    description:
      "Graphs represent relationships between entities and are heavily used in networking, navigation systems, recommendation engines, and large-scale web systems.",
    steps: [
      "Represent nodes and connections",
      "Traverse using BFS or DFS",
      "Find shortest or optimal paths",
      "Analyze relationships and connectivity",
    ],
  },

  Backtracking: {
    applications: [
      "N-Queens Problem",
      "Sudoku Solver",
      "Rat in a Maze",
      "Permutations & Combinations",
      "Graph Coloring",
    ],
    description:
      "Backtracking is a problem-solving technique that builds solutions incrementally and backtracks whenever a condition fails.",
    steps: [
      "Choose a possible option",
      "Move recursively to the next step",
      "Check constraints or validity",
      "Backtrack if the solution fails",
    ],
  },

  "Greedy Algorithms": {
    applications: [
      "Activity Selection",
      "Huffman Coding",
      "Fractional Knapsack",
      "Job Sequencing",
      "Minimum Platforms Problem",
    ],
    description:
      "Greedy Algorithms make the locally optimal choice at each step to achieve a globally optimal solution.",
    steps: [
      "Select the best local choice",
      "Optimize the current step",
      "Repeat for the remaining problem",
      "Build the final optimal solution",
    ],
  },

  Heaps: {
    applications: [
      "Priority Queues",
      "Heap Sort",
      "Kth Largest/Smallest Element",
      "Merge K Sorted Arrays/Lists",
      "Median in a Data Stream",
    ],
    description:
      "Heaps are tree-based data structures mainly used for efficient priority management and fast retrieval of minimum or maximum elements.",
    steps: [
      "Insert elements into the heap",
      "Maintain the heap property",
      "Access the highest priority element",
      "Perform extraction or updates efficiently",
    ],
  },

  Tries: {
    applications: [
      "Autocomplete Systems",
      "Spell Checker",
      "Dictionary Search",
      "IP Routing",
      "Word Search Problems",
    ],
    description:
      "Tries are specialized tree structures used for efficient string storage and fast prefix-based searching.",
    steps: [
      "Store characters node-by-node",
      "Build prefix-based paths",
      "Traverse using the input string",
      "Retrieve matching words efficiently",
    ],
  },
};

const getIcon = (selected: string) => {
  switch (selected) {
    case "Trees":
      return <FiFolder className="w-5 h-5 text-green-500" />;

    case "Graphs":
      return <FiShare2 className="w-5 h-5 text-blue-500" />;

    case "Binary Search":
      return <FiSearch className="w-5 h-5 text-cyan-500" />;

    case "Dijkstra Algorithm":
      return <FiMap className="w-5 h-5 text-orange-500" />;

    case "Linked List":
      return <FiDatabase className="w-5 h-5 text-pink-500" />;

    case "BFS":
    case "DFS":
      return <FiGlobe className="w-5 h-5 text-indigo-500" />;

    case "Backtracking":
      return <FiCode className="w-5 h-5 text-red-500" />;

    case "Greedy Algorithms":
      return <FiCompass className="w-5 h-5 text-yellow-500" />;

    case "Heaps":
      return <FiLayers className="w-5 h-5 text-purple-500" />;

    case "Tries":
      return <FiGitCommit className="w-5 h-5 text-emerald-500" />;

    default:
      return <FiCpu className="w-5 h-5 text-[var(--ifm-color-primary)]" />;
  }
};

const AlgorithmUseCases: React.FC = () => {
  const keys = Object.keys(algorithmData);

  const [selected, setSelected] = useState<string>(keys[0]);

  const activeData = algorithmData[selected];

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white dark:bg-gray-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md p-4 sm:p-6 lg:p-8 backdrop-blur-md">
        {/* Sidebar Navigation */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/60 pr-0 md:pr-4 scrollbar-none snap-x">
          {keys.map((algo) => {
            const isSelected = selected === algo;

            return (
              <button
                key={algo}
                onClick={() => setSelected(algo)}
                aria-pressed={isSelected}
                className={`
                  snap-center shrink-0 text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border-none cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ifm-color-primary)] relative flex items-center gap-2
                  ${
                    isSelected
                      ? "bg-[var(--ifm-color-primary)] text-white shadow-md shadow-blue-500/10"
                      : "bg-slate-50 dark:bg-gray-950/40 text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800/60"
                  }
                `}
              >
                {isSelected && (
                  <span className="hidden md:block absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r" />
                )}

                {getIcon(algo)}

                <span>{algo}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between min-w-0 animate-fadeIn">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              {getIcon(selected)}

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {selected}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed m-0">
              {activeData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Applications */}
            <div className="bg-slate-50/50 dark:bg-gray-950/30 border border-slate-100 dark:border-slate-800/40 rounded-xl p-5">
              <h3 className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                <FiCompass className="w-4 h-4 text-[var(--ifm-color-primary)]" />
                Real World Applications
              </h3>

              <ul className="list-none p-0 m-0 space-y-3">
                {activeData.applications.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-gray-300"
                  >
                    <span className="h-2 w-2 mt-1.5 rounded-full bg-[var(--ifm-color-primary)] shrink-0" />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="bg-slate-50/50 dark:bg-gray-950/30 border border-slate-100 dark:border-slate-800/40 rounded-xl p-5">
              <h3 className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                <FiCpu className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                Step-by-Step Workflow
              </h3>

              <ol className="list-none p-0 m-0 relative space-y-4">
                {activeData.steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3.5 relative group"
                  >
                    {index !== activeData.steps.length - 1 && (
                      <span className="absolute left-[11px] top-6 bottom-[-20px] w-[2px] bg-slate-200 dark:bg-gray-800 pointer-events-none" />
                    )}

                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-slate-800 text-[10px] font-black text-slate-500 dark:text-gray-400 group-hover:border-indigo-500 dark:group-hover:border-indigo-400 transition-colors z-10">
                      {index + 1}
                    </div>

                    <span className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 font-medium pt-0.5 leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500">
            <FiGitCommit className="w-3.5 h-3.5" />
            Immutable Complexity Target
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmUseCases;
