import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import { FaGraduationCap, FaNetworkWired, FaSlidersH, FaSearch } from "react-icons/fa";
import QuizCard from "../../components/QuizCard";
import quizData from "../../data/quizData";
import ScrollBottomToTop from "../../components/Scroller/BottomToTop/BottomToTop";
import ScrollTopToBottom from "../../components/Scroller/TopToBottom/TopToBottom";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 120, damping: 16 } 
  },
};

const Quizes: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Common DSA taxonomic buckets for quiz grouping
  const categories = ["All", "Linear", "Trees", "Graphs", "Algorithms"];

  // Compound pipeline logic handling sorting selection and real-time query inputs
  const filteredQuizzes = useMemo(() => {
    return quizData.filter((quiz: any) => {
      const matchesCategory = activeCategory === "All" || 
        quiz.category?.toLowerCase() === activeCategory.toLowerCase() ||
        quiz.tags?.some((t: string) => t.toLowerCase() === activeCategory.toLowerCase());
        
      const matchesSearch = quiz.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <Layout
      title="Algorithmic Quizzes"
      description="Validate runtime calculations, trace operations tree pathways, and review detailed data structural logic."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300">
        
        {/* Engineering Hero Subheader Section */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 py-16 px-6 md:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/[0.03] dark:bg-red-500/[0.06] blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold text-red-600 bg-red-500/10 rounded-full border border-red-500/20">
                <FaGraduationCap className="text-sm" /> ASSESSMENT_ENGINE: RUNNING
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                DSA Assessments
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Test your conceptual knowledge of core data structures and algorithm paradigms. Complete individual diagnostic sets to isolate runtime flaws, verify balancing criteria, and access structural compiler insights.
              </p>
            </div>

            {/* Quick Filter Info Panel */}
            <div className="hidden lg:flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 text-xs font-mono font-bold text-slate-400 uppercase">
              <FaSlidersH className="text-red-500" /> Metrics tracked dynamically via user engine
            </div>
          </div>
        </div>

        {/* Evaluation Control Toolbar Panel */}
        <div className="py-12 px-6 md:px-12 max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
            
            {/* Horizontal Filter Navigation */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all border border-transparent cursor-pointer ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white dark:bg-red-600 shadow-md shadow-red-500/10"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Micro Filter Search Wrapper */}
            <div className="relative max-w-md w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <FaSearch className="text-xs" />
              </span>
              <input
                type="text"
                placeholder="Search matrices modules (e.g., Red-Black Tree)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Cards Render Manifest Grid */}
          {filteredQuizzes.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredQuizzes.map((quiz, index) => (
                <motion.div key={index} variants={cardVariants} className="h-full">
                  <QuizCard
                    title={quiz.title}
                    description={quiz.description}
                    link={quiz.link}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900">
              <FaNetworkWired className="text-4xl text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
                No matching testing modules discovered in your active registry path.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating System Utilities */}
      <ScrollBottomToTop />
      <ScrollTopToBottom />
    </Layout>
  );
};

export default Quizes;