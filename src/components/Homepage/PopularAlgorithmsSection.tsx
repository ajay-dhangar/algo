import React from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import { FaArrowRight, FaTerminal, FaCompass, FaPlay } from "react-icons/fa";

interface Algorithm {
  title: string;
  description: string;
  link: string;
  complexity: string; // Added to dramatically step up technical value/UX
}

const algorithms: Algorithm[] = [
  {
    title: "Binary Search",
    description: "Efficient divide-and-conquer searching protocol built for sorted array tracking.",
    link: "/docs/extra/binary-search/",
    complexity: "O(log n)",
  },
  {
    title: "Merge Sort",
    description: "Stable, divide-and-conquer sorting algorithm that guarantees consistent runtime overhead.",
    link: "/docs/extra/algorithms/sorting-algorithms/merge-sort-algo",
    complexity: "O(n log n)",
  },
  {
    title: "Dijkstra's Algorithm",
    description: "Graph traversal pipeline optimized to calculate single-source paths through non-negative weights.",
    link: "/docs/extra/algorithms/dijkstras-algorithm",
    complexity: "O(V² + E)",
  },
  {
    title: "Quick Sort",
    description: "High-performance in-place partition array sorting methodology optimized for cache locality.",
    link: "/docs/extra/algorithms/sorting-algorithms/quick-sort-algo",
    complexity: "O(n log n)",
  },
  {
    title: "Linked Lists",
    description: "Sequential pointer-connected node maps foundational for lean linear allocation dynamics.",
    link: "/docs/category/linked-list",
    complexity: "O(1) Insertion",
  },
  {
    title: "Recursion",
    description: "Mathematical problem-solving structures built on state-stack self-invocation frameworks.",
    link: "/docs/category/recursive-algorithms",
    complexity: "O(2ⁿ) Max Stack",
  }
];

const PopularAlgorithmsSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-b from-slate-50 to-blue-50/20 dark:from-gray-950 dark:to-gray-900">
      {/* Decorative Structural Glow Elements */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[var(--ifm-color-primary)]/5 blur-[120px] dark:bg-[var(--ifm-color-primary)]/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Clean Header Element */}
        <div className="text-center mb-16 mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Popular{" "}
            <span className="text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">
              Algorithms
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Explore core computational architectures and data models built for enterprise scale, engineering evaluations, and optimized processing layouts.
          </p>
        </div>

        {/* Modular Grid Panel Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.map((algorithm, index) => (
            <Link
              key={index}
              to={algorithm.link}
              className="no-underline hover:no-underline group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ifm-color-primary)]"
            >
              <motion.div
                className="
                  relative flex flex-col justify-between h-full p-6 sm:p-8 
                  bg-white dark:bg-gray-900/40 
                  backdrop-blur-md rounded-2xl 
                  border border-slate-200/80 dark:border-slate-800/80
                  shadow-sm hover:shadow-xl
                  transition-shadow duration-300
                "
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Active Focus Border Overlay Accent */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[var(--ifm-color-primary)]/30 rounded-2xl transition-colors duration-300 pointer-events-none" />

                <div>
                  {/* Card Header Panel */}
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-400 group-hover:text-[var(--ifm-color-primary)] border border-slate-100 dark:border-slate-800/40 transition-colors duration-200">
                      <FaTerminal className="h-4 w-4" />
                    </div>
                    {/* Complexity Badge Tag */}
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30">
                      {algorithm.complexity}
                    </span>
                  </div>

                  {/* Core Card Context */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200">
                    {algorithm.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                    {algorithm.description}
                  </p>
                </div>

                {/* Micro Action Layout Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between text-sm font-bold text-[var(--ifm-color-primary)]">
                  <span>Learn Documentation</span>
                  <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/docs/category/algorithms"
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-2.5
              px-8 py-4 rounded-xl
              border-2 border-transparent
              bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-50
              text-white dark:text-slate-950 font-bold text-base
              shadow-md hover:shadow-xl transition-all duration-200
              no-underline hover:no-underline
            "
          >
            <FaCompass className="text-base" />
            Explore All Algorithms
          </Link>

          <Link
            to="/practice"
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-2.5
              px-8 py-4 rounded-xl
              border-2 border-[var(--ifm-color-primary)]
              bg-transparent hover:bg-[var(--ifm-color-primary)] hover:text-white
              text-[var(--ifm-color-primary)] font-bold text-base
              shadow-md hover:shadow-xl transition-all duration-200
              no-underline hover:no-underline
            "
          >
            <FaPlay className="text-base" />
            Start Practicing
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PopularAlgorithmsSection;
