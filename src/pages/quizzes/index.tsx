import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlayCircle, FaTerminal, FaLayerGroup, FaSearch, FaFilter } from "react-icons/fa";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

interface QuizCardConfig {
  id: string;
  title: string;
  category: "Linear" | "Non-Linear" | "Balanced Tree" | "Disk Storage";
  description: string;
  path: string;
  questionCount: number;
}

const QUIZZES_CONFIG: QuizCardConfig[] = [
  {
    id: "arrays",
    title: "Quiz on Arrays",
    category: "Linear",
    description: "Evaluate your foundational knowledge on sequential storage, index shifting, allocation footprints, and contiguous multi-dimensional matrices.",
    path: "/quizzes/arrays",
    questionCount: 10
  },
  {
    id: "stacks",
    title: "Quiz on Stacks",
    category: "Linear",
    description: "Analyze LIFO processing infrastructure, recursion execution flow behaviors, frame call stacks, and parentheses balancing validation rules.",
    path: "/quizzes/stack",
    questionCount: 8
  },
  {
    id: "queues",
    title: "Quiz on Queues",
    category: "Linear",
    description: "Challenge your skills on asynchronous FIFO task piping, sliding window architectures, priority schedulers, and circular double-ended buffers.",
    path: "/quizzes/queue",
    questionCount: 16
  },
   {
    id: "linked-lists",
    title: "Quiz on Linked Lists",
    category: "Linear",
    description: "Test your grasp of singly, doubly, and circular linked list structures, pointer-based operations, and traversal/complexity trade-offs.",
    path: "/quizzes/linked-list",
    questionCount: 12
  },
  {
    id: "deques",
    title: "Quiz on Deques",
    category: "Linear",
    description: "Evaluate your understanding of double-ended queue operations, sliding window applications, and front/rear insertion-deletion complexity.",
    path: "/quizzes/deque",
    questionCount: 12
  },
  {
    id: "priority-queues",
    title: "Quiz on Priority Queues",
    category: "Linear",
    description: "Test your knowledge of heap-based priority scheduling, min/max-heap operations, and real-world applications like Dijkstra's algorithm.",
    path: "/quizzes/priority-queue",
    questionCount: 12
  },
  {
    id: "linear-search",
    title: "Quiz on Linear Search",
    category: "Linear",
    description: "Assess your understanding of sequential search mechanics, best/average/worst case analysis, and when linear search is the right tool.",
    path: "/quizzes/linear-search",
    questionCount: 12
  },
  {
    id: "recursion",
    title: "Quiz on Recursion Fundamentals",
    category: "Linear",
    description: "Examine call stack behavior, base and recursive case design, and the time/space complexity implications of recursive algorithms.",
    path: "/quizzes/recursion",
    questionCount: 12
  },
  {
    id: "binary-trees",
    title: "Quiz on Binary Trees",
    category: "Non-Linear",
    description: "Test your parsing logic across hierarchical node trees, DFS/BFS traversal sequences, depth diagnostics, and structural serialization patterns.",
    path: "/quizzes/binary-tree",
    questionCount: 12
  },
  {
    id: "bst",
    title: "Quiz on Binary Search Trees",
    category: "Non-Linear",
    description: "Review specific sorting properties, target node deletion edge-cases, inline predecessor tracking, and computational lookup bounds.",
    path: "/quizzes/binary-search-tree",
    questionCount: 10
  },
  {
    id: "avl-trees",
    title: "Quiz on AVL Trees",
    category: "Balanced Tree",
    description: "Examine self-balancing data structures, compute strict height imbalance factors, and trace complex Single/Double node rotation loops.",
    path: "/quizzes/avl-tree",
    questionCount: 8
  },
  {
    id: "red-black-trees",
    title: "Quiz on Red-Black Trees",
    category: "Balanced Tree",
    description: "Test your understanding of strict node coloring rules, balancing bounds during insertions, recoloring mechanisms, and rotation limits.",
    path: "/quizzes/red-black-tree",
    questionCount: 8
  },

  {
    id: "b-trees",
    title: "Quiz on B-Trees",
    category: "Disk Storage",
    description: "Evaluate external indexing structures, block storage node split workflows, high fan-out properties, and direct multi-way search trees.",
    path: "/quizzes/b-tree",
    questionCount: 10
  },
    {
    id: "bplus-trees",
    title: "Quiz on B+ Trees",
    category: "Disk Storage",
    description: "Test your knowledge of internal vs leaf node organization, range queries, linked leaf nodes, and database indexing applications.",
    path: "/quizzes/bplus-tree",
    questionCount: 12
  },
  {
    id: "isam",
    title: "Quiz on ISAM",
    category: "Disk Storage",
    description: "Evaluate static indexing concepts, overflow pages, search performance trade-offs, and how ISAM compares to dynamic B-Tree structures.",
    path: "/quizzes/isam",
    questionCount: 12
  },
  {
    id: "hash-indexing",
    title: "Quiz on Hash Indexing",
    category: "Disk Storage",
    description: "Test your understanding of static and dynamic hashing, extendible and linear hashing, and collision handling techniques.",
    path: "/quizzes/hash-indexing",
    questionCount: 12
  },
  {
    id: "external-hashing",
    title: "Quiz on External Hashing",
    category: "Disk Storage",
    description: "Assess your knowledge of bucket organization, disk block management, overflow handling, and disk-based performance analysis.",
    path: "/quizzes/external-hashing",
    questionCount: 12
  },
  {
    id: "graphs",
    title: "Quiz on Graphs",
    category: "Non-Linear",
    description: "Test your knowledge of graph types, vertex/edge terminology, adjacency representations, BFS, DFS traversal algorithms, and real-world graph applications.",
    path: "/quizzes/graph",
    questionCount: 12
  },
];

const FILTER_CATEGORIES = ["All", "Linear", "Non-Linear", "Balanced Tree", "Disk Storage"] as const;

const Quizes: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<typeof FILTER_CATEGORIES[number]>("All");

  const getCategoryStyles = (category: QuizCardConfig["category"]) => {
    switch (category) {
      case "Linear": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Non-Linear": return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "Balanced Tree": return "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20";
      case "Disk Storage": return "bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-500/20";
    }
  };

  const filteredQuizzes = useMemo(() => {
    return QUIZZES_CONFIG.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(search.toLowerCase()) || 
                            quiz.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeFilter === "All" || quiz.category === activeFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeFilter]);

  return (
    <Layout 
      title="Skill Assessments // Data Structures" 
      description="Practice your computer science skills with analytical quizzes focused on structures and optimization parameters."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans pb-32">
        
        {/* --- HERO DASHBOARD HEADER SECTION --- */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-solid border-slate-200 dark:border-slate-800/80 py-20 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.06),transparent_50%)]" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold tracking-wider uppercase border border-solid border-blue-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FaTerminal className="text-xs" /> diagnostic_assessment_terminal
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight m-0 uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Test Data Structure <span className="text-[var(--ifm-color-primary)]">Skills</span>
            </motion.h1>

            <motion.p
              className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed m-0 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Benchmark your parsing parameters. Evaluate your deep knowledge of linear arrays, memory allocation trees, node link operations, and space/time execution metrics.
            </motion.p>
          </div>
        </section>

        {/* --- SEARCH & PILL CATEGORY INTERFACE GRID --- */}
        <div className="max-w-7xl mx-auto px-4 mt-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pb-6">
            
            {/* Inline Vector Filter Box */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 text-sm" />
              <input
                type="text"
                placeholder="Search specific structure queries..."
                aria-label="Search specific structure queries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 border border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[var(--ifm-color-primary)] text-sm font-semibold rounded-xl transition-all shadow-xs"
              />
            </div>

            {/* Overflow Scroll Layout Filter Buttons */}
            <div className="overflow-x-auto pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none">
              <div className="flex gap-1.5" role="group" aria-label="Filter test panels by computational taxonomy">
                {FILTER_CATEGORIES.map((cat) => {
                  const isActive = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide border border-solid transition-all whitespace-nowrap min-h-[36px] cursor-pointer ${
                        isActive
                          ? "bg-[var(--ifm-color-primary)] border-[var(--ifm-color-primary)] text-white shadow-sm"
                          : "border-slate-200/80 bg-white dark:bg-slate-950 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-[var(--ifm-color-primary)] hover:text-[var(--ifm-color-primary)]"
                      }`}
                    >
                      {cat === "All" ? "All Quizzes" : cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* --- GRID ASSESSMENT MATRIX CARDS --- */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredQuizzes.map((quiz, index) => (
                <motion.div
                  layout
                  key={quiz.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between group transition-all"
                >
                  <div>
                    {/* Top Meta Tag Row Layout */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className={`text-[10px] font-mono font-black tracking-wider uppercase px-2.5 py-0.5 rounded border border-solid shrink-0 ${getCategoryStyles(quiz.category)}`}>
                        {quiz.category}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 shrink-0">
                        {quiz.questionCount} Modules
                      </span>
                    </div>

                    {/* Structural Heading Token */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white m-0 tracking-tight leading-snug group-hover:text-[var(--ifm-color-primary)] transition-colors">
                      {quiz.title}
                    </h3>

                    {/* Explanatory Narrative Description text block */}
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 mb-6 leading-relaxed m-0 font-medium font-sans">
                      {quiz.description}
                    </p>
                  </div>

                  {/* Tactile Forward Anchor Button */}
                  <Link
                    to={quiz.path}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-none bg-slate-100 hover:bg-[var(--ifm-color-primary)] dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer no-underline group/btn min-h-[42px]"
                  >
                    <FaPlayCircle className="text-sm transition-transform duration-200 group-hover/btn:scale-110" />
                    <span>Initialize Test //</span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Fallback Empty Diagnostics Interface Frame Block */}
          {filteredQuizzes.length === 0 && (
            <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-solid border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/40">
              <div className="text-3xl mb-3"><FaLayerGroup className="text-slate-400 mx-auto" /></div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 m-0">No Search Parameters Matched</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto font-medium font-sans">
                Adjust or clear your current structural filters to access operational assessment routines.
              </p>
            </div>
          )}
        </section>

      </div>
    </Layout>
  );
};

export default Quizes;