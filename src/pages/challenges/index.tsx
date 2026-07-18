import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@theme/Layout";
import {
  FaCode, FaTerminal, FaFire, FaTrophy, FaLayerGroup,
  FaTree, FaFilter, FaSearch, FaBrain, FaSortAmountUp,
  FaProjectDiagram, FaCoins,
} from "react-icons/fa";
import ChallengeCard from "../../components/ChallengeCard";
import challengeData from "../../data/challengeData";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

const CATEGORIES = ["All", "Trees", "DP", "Graphs", "Greedy", "Sorting"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

const DIFF_PILL: Record<string, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

const Challenges: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeDifficulty, setActiveDifficulty] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const treeChallenges = useMemo(
    () => (challengeData as any[]).filter((c) => c.category === "Trees"),
    []
  );
  const treeEasy = treeChallenges.filter((c) => c.difficulty === "Easy").length;
  const treeMedium = treeChallenges.filter((c) => c.difficulty === "Medium").length;
  const treeHard = treeChallenges.filter((c) => c.difficulty === "Hard").length;

  const dpChallenges = useMemo(
    () => (challengeData as any[]).filter((c) => c.category === "DP"),
    []
  );
  const dpEasy = dpChallenges.filter((c) => c.difficulty === "Easy").length;
  const dpMedium = dpChallenges.filter((c) => c.difficulty === "Medium").length;
  const dpHard = dpChallenges.filter((c) => c.difficulty === "Hard").length;

  const sortingChallenges = useMemo(
    () => (challengeData as any[]).filter((c) => c.category === "Sorting"),
    []
  );
  const sortingEasy = sortingChallenges.filter((c) => c.difficulty === "Easy").length;
  const sortingMedium = sortingChallenges.filter((c) => c.difficulty === "Medium").length;
  const sortingHard = sortingChallenges.filter((c) => c.difficulty === "Hard").length;

  const graphsChallenges = useMemo(
    () => (challengeData as any[]).filter((c) => c.category === "Graphs"),
    []
  );
  const graphsEasy = graphsChallenges.filter((c) => c.difficulty === "Easy").length;
  const graphsMedium = graphsChallenges.filter((c) => c.difficulty === "Medium").length;
  const graphsHard = graphsChallenges.filter((c) => c.difficulty === "Hard").length;

  const greedyChallenges = useMemo(
    () => (challengeData as any[]).filter((c) => c.category === "Greedy"),
    []
  );
  const greedyEasy = greedyChallenges.filter((c) => c.difficulty === "Easy").length;
  const greedyMedium = greedyChallenges.filter((c) => c.difficulty === "Medium").length;
  const greedyHard = greedyChallenges.filter((c) => c.difficulty === "Hard").length;

  const filtered = useMemo(() => {
    return (challengeData as any[]).filter((item) => {
      const matchCat =
        activeCategory === "All" ||
        item.category?.toLowerCase() === activeCategory.toLowerCase() ||
        item.tags?.some((t: string) => t.toLowerCase() === activeCategory.toLowerCase());
      const matchDiff =
        activeDifficulty === "All" ||
        item.difficulty?.toLowerCase() === activeDifficulty.toLowerCase();
      const matchSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchDiff && matchSearch;
    });
  }, [activeCategory, activeDifficulty, search]);

  return (
    <Layout
      title="Coding Arenas & Challenges"
      description="Engage in algorithmic sandboxes, optimize runtime metrics, and scale the structural ranks."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300">

        {/* Hero */}
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
                Push your limits with hand-crafted algorithmic challenges. Solve problems across Trees, Graphs, Dynamic Programming, and more — with interactive code editors and real test cases.
              </p>
            </div>

            {/* Stats Dashboard */}
            <div className="flex items-stretch gap-0 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden w-full md:w-auto">
              <div className="px-5 py-4 border-r border-slate-200 dark:border-slate-800">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Total</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <FaCode className="text-red-500 text-sm" /> {challengeData.length}
                </span>
              </div>
              <div className="px-5 py-4 border-r border-slate-200 dark:border-slate-800">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Trees</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <FaTree className="text-emerald-500 text-sm" /> {treeChallenges.length}
                </span>
              </div>
              <div className="px-5 py-4 border-r border-slate-200 dark:border-slate-800">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">DP</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <FaBrain className="text-violet-500 text-sm" /> {dpChallenges.length}
                </span>
              </div>
              <div className="px-5 py-4 border-r border-slate-200 dark:border-slate-800">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Sorting</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <FaSortAmountUp className="text-indigo-500 text-sm" /> {sortingChallenges.length}
                </span>
              </div>
              <div className="px-5 py-4 border-r border-slate-200 dark:border-slate-800">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Graphs</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <FaProjectDiagram className="text-cyan-500 text-sm" /> {graphsChallenges.length}
                </span>
              </div>
              <div className="px-5 py-4 border-r border-slate-200 dark:border-slate-800">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Greedy</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <FaCoins className="text-amber-400 text-sm" /> {greedyChallenges.length}
                </span>
              </div>
              <div className="px-5 py-4">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Streak</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  <FaFire className="text-amber-500 text-sm" /> 5 <span className="text-xs text-slate-400 font-normal">days</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trees Banner */}
        {(activeCategory === "All" || activeCategory === "Trees") && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 md:px-12 py-4">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <FaTree className="text-white text-xl" />
                <div>
                  <span className="text-white font-bold text-sm">🌳 Trees Track Now Live!</span>
                  <span className="text-emerald-100 text-xs ml-2">{treeChallenges.length} new challenges added</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: "Easy", count: treeEasy, style: "bg-emerald-500/30 text-white border-emerald-400/30" },
                  { label: "Medium", count: treeMedium, style: "bg-amber-500/30 text-white border-amber-400/30" },
                  { label: "Hard", count: treeHard, style: "bg-red-500/30 text-white border-red-400/30" },
                ].map((d) => (
                  <span key={d.label} className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${d.style}`}>
                    {d.label}: {d.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DP Banner */}
        {(activeCategory === "All" || activeCategory === "DP") && (
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 md:px-12 py-4">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <FaBrain className="text-white text-xl" />
                <div>
                  <span className="text-white font-bold text-sm">🧩 Dynamic Programming Track Now Live!</span>
                  <span className="text-violet-100 text-xs ml-2">{dpChallenges.length} new challenges added</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: "Easy", count: dpEasy, style: "bg-emerald-500/30 text-white border-emerald-400/30" },
                  { label: "Medium", count: dpMedium, style: "bg-amber-500/30 text-white border-amber-400/30" },
                  { label: "Hard", count: dpHard, style: "bg-red-500/30 text-white border-red-400/30" },
                ].map((d) => (
                  <span key={d.label} className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${d.style}`}>
                    {d.label}: {d.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sorting Banner */}
        {(activeCategory === "All" || activeCategory === "Sorting") && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 md:px-12 py-4">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <FaSortAmountUp className="text-white text-xl" />
                <div>
                  <span className="text-white font-bold text-sm">📊 Sorting Algorithms Track Now Live!</span>
                  <span className="text-indigo-100 text-xs ml-2">{sortingChallenges.length} new challenges added</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: "Easy", count: sortingEasy, style: "bg-emerald-500/30 text-white border-emerald-400/30" },
                  { label: "Medium", count: sortingMedium, style: "bg-amber-500/30 text-white border-amber-400/30" },
                  { label: "Hard", count: sortingHard, style: "bg-red-500/30 text-white border-red-400/30" },
                ].map((d) => (
                  <span key={d.label} className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${d.style}`}>
                    {d.label}: {d.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Graphs Banner */}
        {activeCategory === "Graphs" && (
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 md:px-12 py-4">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <FaProjectDiagram className="text-white text-xl" />
                <div>
                  <span className="text-white font-bold text-sm">🕸️ Graphs Track Now Live!</span>
                  <span className="text-cyan-100 text-xs ml-2">{graphsChallenges.length} new challenges added</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: "Easy", count: graphsEasy, style: "bg-emerald-500/30 text-white border-emerald-400/30" },
                  { label: "Medium", count: graphsMedium, style: "bg-amber-500/30 text-white border-amber-400/30" },
                  { label: "Hard", count: graphsHard, style: "bg-red-500/30 text-white border-red-400/30" },
                ].map((d) => (
                  <span key={d.label} className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${d.style}`}>
                    {d.label}: {d.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Greedy Banner */}
        {(activeCategory === "All" || activeCategory === "Greedy") && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 md:px-12 py-4">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <FaCoins className="text-white text-xl" />
                <div>
                  <span className="text-white font-bold text-sm">💰 Greedy Algorithms Track Now Live!</span>
                  <span className="text-amber-100 text-xs ml-2">{greedyChallenges.length} new challenges added</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: "Easy", count: greedyEasy, style: "bg-emerald-500/30 text-white border-emerald-400/30" },
                  { label: "Medium", count: greedyMedium, style: "bg-amber-500/30 text-white border-amber-400/30" },
                  { label: "Hard", count: greedyHard, style: "bg-red-500/30 text-white border-red-400/30" },
                ].map((d) => (
                  <span key={d.label} className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${d.style}`}>
                    {d.label}: {d.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <section className="py-10 px-6 md:px-12 max-w-6xl mx-auto space-y-6">

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
              <span className="text-slate-400 text-[10px] font-mono uppercase font-bold shrink-0 flex items-center gap-1">
                <FaLayerGroup /> Topic:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shrink-0 border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white dark:bg-red-600 dark:text-white border-transparent shadow-md"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {cat === "Trees" ? "🌳 " : cat === "DP" ? "🧩 " : cat === "Sorting" ? "📊 " : cat === "Graphs" ? "🕸️ " : cat === "Greedy" ? "💰 " : ""}{cat}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
              <span className="text-slate-400 text-[10px] font-mono uppercase font-bold shrink-0 flex items-center gap-1">
                <FaFilter /> Level:
              </span>
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDifficulty(d)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold tracking-wider shrink-0 border transition-all cursor-pointer ${
                    activeDifficulty === d
                      ? d === "Easy"
                        ? "bg-emerald-500 text-white border-transparent"
                        : d === "Medium"
                        ? "bg-amber-500 text-white border-transparent"
                        : d === "Hard"
                        ? "bg-red-500 text-white border-transparent"
                        : "bg-slate-900 text-white dark:bg-red-600 border-transparent"
                      : d !== "All"
                      ? `border ${DIFF_PILL[d]} bg-transparent`
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-slate-700 dark:text-slate-300 font-bold">{filtered.length}</span> challenge{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && <> in <span className="text-emerald-500">{activeCategory}</span></>}
            {activeDifficulty !== "All" && <> · <span className={activeDifficulty === "Easy" ? "text-emerald-500" : activeDifficulty === "Medium" ? "text-amber-500" : "text-red-500"}>{activeDifficulty}</span></>}
          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${activeDifficulty}-${search}`}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((challenge, i) => (
                  <motion.div key={`${challenge.link}-${i}`} variants={itemVariants} className="h-full">
                    <ChallengeCard
                      title={challenge.title}
                      description={challenge.description}
                      timeLimit={challenge.timeLimit}
                      link={challenge.link}
                      difficulty={(challenge as any).difficulty}
                      category={(challenge as any).category}
                      tags={(challenge as any).tags}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900"
              >
                <FaTrophy className="text-4xl text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
                  No challenges match your filters.
                </p>
                <button
                  onClick={() => { setActiveCategory("All"); setActiveDifficulty("All"); setSearch(""); }}
                  className="mt-4 text-xs font-mono text-red-500 hover:text-red-400 cursor-pointer"
                >
                  Clear filters →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </Layout>
  );
};

export default Challenges;