import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import { FaCode, FaTerminal, FaFire, FaTrophy, FaLayerGroup } from "react-icons/fa";
import ChallengeCard from "../../components/ChallengeCard";
import challengeData from "../../data/challengeData";

// Animation configs for staggered layout loading
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

const Challenges: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string>("All");

  // Dynamically extract distinct tags/categories if present in data array, otherwise use defaults
  const categories = ["All", "Trees", "Graphs", "DP", "Greedy", "Sorting"];

  // Filter logic (assumes challenge objects may contain a category or tags array field)
  const filteredChallenges = useMemo(() => {
    if (selectedTags === "All") return challengeData;
    return challengeData.filter((item: any) => 
      item.category?.toLowerCase() === selectedTags.toLowerCase() || 
      item.tags?.some((t: string) => t.toLowerCase() === selectedTags.toLowerCase())
    );
  }, [selectedTags]);

  return (
    <Layout
      title="Coding Arenas & Challenges"
      description="Engage in algorithmic sandboxes, optimize runtime metrics, and scale the structural ranks."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300">
        
        {/* Immersive Hero Header Panel */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 py-16 px-6 md:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 dark:bg-red-500/10 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold text-red-600 bg-red-500/10 dark:bg-red-500/20 rounded-full border border-red-500/20">
                <FaTerminal className="text-[10px]" /> SYSTEM_ARENA: ONLINE
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Coding Challenges
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Push compilation bounds, refactor operational complex paths, and solve complex structural algorithmic problems under timed intervals.
              </p>
            </div>

            {/* Platform Quick Stats Dashboard View */}
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 w-full md:w-auto">
              <div className="px-4 border-r border-slate-200 dark:border-slate-800">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Total Tracks</span>
                <span className="text-xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <FaCode className="text-red-500 text-sm" /> {challengeData.length}
                </span>
              </div>
              <div className="px-4">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Active Streaks</span>
                <span className="text-xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <FaFire className="text-amber-500 text-sm" /> 5 <span className="text-xs text-slate-400 font-normal">days</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section Area */}
        <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto space-y-8">
          
          {/* Taxonomy Filters bar */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/40 dark:border-slate-800/40">
            <div className="text-slate-400 dark:text-slate-500 p-1 flex items-center gap-1.5 text-xs uppercase font-mono font-bold shrink-0">
              <FaLayerGroup /> Sort Paradigm:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTags(cat)}
                className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all tracking-wider shrink-0 border border-transparent cursor-pointer ${
                  selectedTags === cat
                    ? "bg-slate-900 text-white dark:bg-red-600 dark:text-white shadow-md shadow-red-500/10"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Manifest displaying targeted algorithm challenges */}
          {filteredChallenges.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredChallenges.map((challenge, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <ChallengeCard
                    title={challenge.title}
                    description={challenge.description}
                    timeLimit={challenge.timeLimit}
                    link={challenge.link}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900">
              <FaTrophy className="text-4xl text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
                No active operational sandboxes found matching criteria.
              </p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Challenges;