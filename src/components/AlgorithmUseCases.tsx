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

interface Application {
  title: string;
  industry: string;
  explanation: string;
  learnMore: string;
}

interface AlgorithmDetails {
  applications: Application[];
  description: string;
  steps: string[];
}

const algorithmData: Record<string, AlgorithmDetails> = {
  "Binary Search": {
    applications: [
      {
        title: "Search Engines",
        industry: "Google, Bing",
        explanation:
          "Quickly locates relevant documents in massive sorted indexes.",
        learnMore:
          "Enables logarithmic search time, making billion-record searches extremely fast.",
      },
      {
        title: "Database Indexing",
        industry: "MySQL, PostgreSQL",
        explanation: "Used in B-Tree indexes for rapid record lookup.",
        learnMore:
          "Core component behind efficient SQL queries on large tables.",
      },
      {
        title: "Auto-complete Systems",
        industry: "VS Code, Google Search",
        explanation: "Powers fast dictionary and suggestion lookups.",
        learnMore: "",
      },
    ],
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
      {
        title: "External Sorting",
        industry: "Hadoop, Apache Spark",
        explanation:
          "Sorts data larger than available memory by dividing and merging.",
        learnMore: "Guarantees O(n log n) performance and is stable.",
      },
      {
        title: "Database Operations",
        industry: "MySQL, PostgreSQL",
        explanation: "Used for sorting large query results efficiently.",
        learnMore: "",
      },
      {
        title: "Big Data Processing",
        industry: "Data Warehousing",
        explanation: "Sorting logs and analytics data at scale.",
        learnMore: "",
      },
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
      {
        title: "Educational Tools",
        industry: "Algorithm Visualizers",
        explanation:
          "Ideal for teaching sorting concepts due to its simplicity.",
        learnMore: "Easy to visualize step-by-step swaps.",
      },
      {
        title: "Small Datasets",
        industry: "Embedded Systems",
        explanation:
          "Used when dataset size is very small and simplicity matters.",
        learnMore: "",
      },
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
      {
        title: "Language Standard Libraries",
        industry: "C++, Java, Python",
        explanation: "Default implementation for efficient in-memory sorting.",
        learnMore:
          "Excellent average-case performance with good cache behavior.",
      },
      {
        title: "Competitive Programming",
        industry: "LeetCode, Codeforces",
        explanation: "Fast sorting solution for contest problems.",
        learnMore: "",
      },
      {
        title: "Data Analysis",
        industry: "Pandas, Excel",
        explanation: "Used internally for sorting large tabular data.",
        learnMore: "",
      },
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
    applications: [
      {
        title: "Maze Solving & Pathfinding",
        industry: "Games & Robotics",
        explanation: "Explores deep paths before backtracking.",
        learnMore: "Used in puzzle games and AI navigation.",
      },
      {
        title: "File System Traversal",
        industry: "Operating Systems",
        explanation: "Recursively explores directories and files.",
        learnMore: "",
      },
      {
        title: "Cycle Detection",
        industry: "Graph Databases",
        explanation: "Detects loops in dependency graphs.",
        learnMore: "",
      },
    ],
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
      {
        title: "Shortest Path Finding",
        industry: "Google Maps, Social Networks",
        explanation: "Finds minimum number of edges in unweighted graphs.",
        learnMore: "Basis for friend suggestions and minimum moves problems.",
      },
      {
        title: "Web Crawling",
        industry: "Search Engines",
        explanation: "Explores websites level by level.",
        learnMore: "",
      },
      {
        title: "Network Broadcasting",
        industry: "Telecom",
        explanation: "Spreads information efficiently across networks.",
        learnMore: "",
      },
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
    applications: [
      {
        title: "GPS Navigation",
        industry: "Google Maps, Uber, Apple Maps",
        explanation: "Calculates shortest routes with real road weights.",
        learnMore: "Powers real-time navigation worldwide.",
      },
      {
        title: "Network Routing",
        industry: "Internet & Telecom",
        explanation: "Used in OSPF routing protocols.",
        learnMore: "",
      },
      {
        title: "Game Pathfinding",
        industry: "Video Games",
        explanation: "AI finds optimal paths considering obstacles.",
        learnMore: "",
      },
    ],
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
    applications: [
      {
        title: "Undo/Redo Functionality",
        industry: "VS Code, Photoshop, Word",
        explanation: "Stores action history for reversal.",
        learnMore: "",
      },
      {
        title: "Browser History",
        industry: "Chrome, Firefox",
        explanation: "Manages back and forward navigation.",
        learnMore: "",
      },
      {
        title: "Expression Evaluation",
        industry: "Compilers",
        explanation: "Handles parentheses and operator precedence.",
        learnMore: "",
      },
    ],
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
    applications: [
      {
        title: "CPU Scheduling",
        industry: "Operating Systems",
        explanation: "Manages processes in Round Robin scheduling.",
        learnMore: "",
      },
      {
        title: "Print Spooling",
        industry: "Printer Systems",
        explanation: "Handles print jobs in arrival order.",
        learnMore: "",
      },
      {
        title: "Task Processing",
        industry: "Background Jobs (Celery, Kafka)",
        explanation: "Processes asynchronous tasks fairly.",
        learnMore: "",
      },
    ],
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
      {
        title: "Music Playlists",
        industry: "Spotify, Apple Music",
        explanation: "Efficient song insertion, deletion, and reordering.",
        learnMore: "Doubly linked lists support seamless next/previous.",
      },
      {
        title: "Memory Management",
        industry: "Operating Systems",
        explanation: "Dynamic allocation of memory blocks.",
        learnMore: "",
      },
      {
        title: "Browser History & Navigation",
        industry: "Web Browsers",
        explanation: "Maintains session navigation.",
        learnMore: "",
      },
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
      {
        title: "Tree & Graph Traversal",
        industry: "File Systems, Databases",
        explanation: "Naturally solves hierarchical problems.",
        learnMore: "",
      },
      {
        title: "Backtracking Problems",
        industry: "AI & Puzzle Solvers",
        explanation: "Used in Sudoku, N-Queens, etc.",
        learnMore: "",
      },
      {
        title: "Divide and Conquer",
        industry: "Sorting & Searching",
        explanation: "Foundation for Merge Sort and Quick Sort.",
        learnMore: "",
      },
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
      {
        title: "Route Optimization",
        industry: "Amazon, Uber, Logistics",
        explanation: "Optimal delivery path and cost calculation.",
        learnMore: "",
      },
      {
        title: "Game Development",
        industry: "Chess Engines, Video Games",
        explanation: "Minimax with memoization for decision making.",
        learnMore: "",
      },
      {
        title: "Resource Allocation",
        industry: "Finance & Operations",
        explanation: "Knapsack and scheduling optimization.",
        learnMore: "",
      },
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
      {
        title: "File Systems",
        industry: "Windows, Linux, macOS",
        explanation: "Represents directory hierarchies.",
        learnMore: "",
      },
      {
        title: "Database Indexing",
        industry: "MySQL, MongoDB",
        explanation: "B-Trees and AVL Trees for fast queries.",
        learnMore: "",
      },
      {
        title: "DOM Structure",
        industry: "Web Browsers",
        explanation: "HTML document object model.",
        learnMore: "",
      },
      {
        title: "Autocomplete & Search",
        industry: "Google, IDEs",
        explanation: "Trie-based trees for suggestions.",
        learnMore: "",
      },
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
      {
        title: "Social Networks",
        industry: "Facebook, LinkedIn, Twitter",
        explanation: "Models user connections and recommendations.",
        learnMore: "",
      },
      {
        title: "Recommendation Systems",
        industry: "Netflix, Amazon",
        explanation: "Content and product suggestions.",
        learnMore: "",
      },
      {
        title: "GPS & Navigation",
        industry: "Google Maps",
        explanation: "Road networks and routing.",
        learnMore: "",
      },
      {
        title: "Dependency Management",
        industry: "Software Build Systems",
        explanation: "Package and task dependencies.",
        learnMore: "",
      },
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
      {
        title: "Sudoku Solver",
        industry: "Puzzle Games",
        explanation: "Fills grid while satisfying constraints.",
        learnMore: "",
      },
      {
        title: "N-Queens Problem",
        industry: "Algorithm Research",
        explanation: "Places queens without attacking each other.",
        learnMore: "",
      },
      {
        title: "Rat in a Maze",
        industry: "Pathfinding",
        explanation: "Finds valid paths through obstacles.",
        learnMore: "",
      },
      {
        title: "Permutations & Combinations",
        industry: "Combinatorial Problems",
        explanation: "Generates all possible arrangements.",
        learnMore: "",
      },
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
      {
        title: "Huffman Coding",
        industry: "Data Compression (ZIP, JPEG, MP3)",
        explanation: "Creates optimal prefix codes for compression.",
        learnMore: "",
      },
      {
        title: "Job Sequencing",
        industry: "Operating Systems",
        explanation: "Schedules jobs to maximize profit.",
        learnMore: "",
      },
      {
        title: "Activity Selection",
        industry: "Scheduling Systems",
        explanation: "Selects maximum non-overlapping activities.",
        learnMore: "",
      },
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
      {
        title: "Priority Queues",
        industry: "Task Schedulers",
        explanation: "Always processes highest priority item first.",
        learnMore: "",
      },
      {
        title: "Heap Sort",
        industry: "System Libraries",
        explanation: "In-place sorting with O(n log n) guarantee.",
        learnMore: "",
      },
      {
        title: "Kth Largest/Smallest Element",
        industry: "Data Streaming",
        explanation: "Real-time analytics and monitoring.",
        learnMore: "",
      },
      {
        title: "Merge K Sorted Lists",
        industry: "Databases & Big Data",
        explanation: "Efficiently combines multiple sorted streams.",
        learnMore: "",
      },
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
      {
        title: "Autocomplete & Search Suggestions",
        industry: "Google, IDEs, Mobile Keyboards",
        explanation: "Fast prefix-based word lookup.",
        learnMore: "Delivers instant suggestions as you type.",
      },
      {
        title: "Spell Checker",
        industry: "Word Processors",
        explanation: "Efficient dictionary storage and validation.",
        learnMore: "",
      },
      {
        title: "IP Routing",
        industry: "Networking",
        explanation: "Longest prefix matching for routers.",
        learnMore: "",
      },
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

const iconMap: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  Trees: { icon: FiFolder, color: "text-green-500" },
  Graphs: { icon: FiShare2, color: "text-blue-500" },
  "Binary Search": { icon: FiSearch, color: "text-cyan-500" },
  "Dijkstra Algorithm": { icon: FiMap, color: "text-orange-500" },
  "Linked List": { icon: FiDatabase, color: "text-pink-500" },
  BFS: { icon: FiGlobe, color: "text-indigo-500" },
  DFS: { icon: FiGlobe, color: "text-indigo-500" },
  Backtracking: { icon: FiCode, color: "text-red-500" },
  "Greedy Algorithms": { icon: FiCompass, color: "text-yellow-500" },
  Heaps: { icon: FiLayers, color: "text-purple-500" },
  Tries: { icon: FiGitCommit, color: "text-emerald-500" },
};

const getIcon = (selected: string, isSelected = false) => {
  const { icon: Icon, color } = iconMap[selected] || {
    icon: FiCpu,
    color: "text-[var(--ifm-color-primary)]",
  };
  return <Icon className={"w-5 h-5 " + (isSelected ? "text-white" : color)} />;
};

const AlgorithmUseCases: React.FC = () => {
  const keys = Object.keys(algorithmData);
  const [selected, setSelected] = useState<string>(keys[0]);
  const [expandedApps, setExpandedApps] = useState<Record<string, boolean>>({});

  const activeData = algorithmData[selected];

  const toggleExpand = (appTitle: string) => {
    setExpandedApps((prev) => ({
      ...prev,
      [`${selected}-${appTitle}`]: !prev[`${selected}-${appTitle}`],
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white dark:bg-gray-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md p-4 sm:p-6 lg:p-8 backdrop-blur-md">
        {/* Sidebar Navigation */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/60 pr-0 md:pr-4 scrollbar-none snap-x md:max-h-[60vh] md:overflow-y-auto">
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
                {getIcon(algo, isSelected)}
                <span>{algo}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-start min-w-0 animate-fadeIn">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              {getIcon(selected)}
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {selected}
              </h2>
            </div>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-gray-400 leading-relaxed m-0">
              {activeData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 items-start">
            {/* Enhanced Real World Applications */}
            <div className="bg-slate-50/50 dark:bg-gray-950/30 border border-slate-100 dark:border-slate-800/40 rounded-xl p-5">
              <h3 className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-6">
                <FiCompass className="w-4 h-4 text-[var(--ifm-color-primary)]" />
                Real World Applications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeData.applications.map((app, index) => {
                  const isExpanded = expandedApps[app.title] || false;
                  return (
                    <div
                      key={index}
                      className="group bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
                            {app.industry}
                          </div>
                          <h4 className="font-semibold text-slate-900 dark:text-white text-[15px] leading-tight">
                            {app.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                        {app.explanation}
                      </p>

                      {app.learnMore && (
                        <>
                          <button
                            onClick={() => toggleExpand(app.title)}
                            className="mt-4 text-xs font-medium text-[var(--ifm-color-primary)] hover:underline flex items-center gap-1"
                          >
                            {isExpanded ? "− Collapse" : "+ Learn More"}
                          </button>
                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-sm text-slate-500 dark:text-gray-400">
                              {app.learnMore}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
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
