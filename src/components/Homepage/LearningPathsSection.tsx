import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@docusaurus/Link";
import {
  FaGraduationCap,
  FaClock,
  FaStar,
  FaCheckCircle,
  FaRegCircle,
  FaArrowRight,
  FaSearch,
  FaLayerGroup,
  FaBookOpen,
} from "react-icons/fa";
import { LEARNING_PATHS, LearningPath, LearningTopic } from "../../data/learningPathsData";
import { safeJsonParse } from "../../utils/safeStorage";

const STORAGE_KEY = "algo_completed_learning_topics";

const LearningPathsSection: React.FC = () => {
  const [activePathId, setActivePathId] = useState<string>("new-to-programming");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = safeJsonParse<Record<string, boolean>>(STORAGE_KEY, {});
    setCompletedTopics(saved);
  }, []);

  const toggleTopicCompletion = (topicId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = {
      ...completedTopics,
      [topicId]: !completedTopics[topicId],
    };
    setCompletedTopics(updated);
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const activePath: LearningPath =
    LEARNING_PATHS.find((p) => p.id === activePathId) || LEARNING_PATHS[0];

  const filteredTopics: LearningTopic[] = activePath.topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.prerequisites.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const completedCountInPath = activePath.topics.filter(
    (t) => completedTopics[t.id]
  ).length;
  const progressPercent = Math.round(
    (completedCountInPath / activePath.topics.length) * 100
  );

  const getDifficultyBadge = (difficulty: LearningTopic["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Easy
          </span>
        );
      case "Medium":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Medium
          </span>
        );
      case "Hard":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Hard
          </span>
        );
    }
  };

  return (
    <section
      id="learning-paths"
      className="relative overflow-hidden py-24 px-4 bg-slate-50/50 dark:bg-gray-950/80 border-y border-slate-200/60 dark:border-slate-800/60"
    >
      {/* Structural Ambient Background Glows */}
      <div className="absolute top-1/4 left-10 -z-10 h-80 w-80 rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/10" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-extrabold tracking-widest uppercase mb-4">
            <FaGraduationCap className="text-sm" />
            Guided Learning Paths
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Structured{" "}
            <span className="bg-gradient-to-r from-[var(--ifm-color-primary)] via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              DSA Journeys
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Navigate through curated, step-by-step roadmaps aligned with your goals — from learning your very first programming constructs to mastering competitive algorithms.
          </p>
        </div>

        {/* Path Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {LEARNING_PATHS.map((path) => {
            const isActive = path.id === activePathId;
            const pathCompleted = path.topics.filter((t) => completedTopics[t.id]).length;
            const pathTotal = path.topics.length;
            const pct = Math.round((pathCompleted / pathTotal) * 100);

            return (
              <button
                key={path.id}
                onClick={() => {
                  setActivePathId(path.id);
                  setSearchQuery("");
                }}
                className={`
                  relative flex flex-col justify-between p-5 text-left rounded-2xl transition-all duration-300 border cursor-pointer
                  ${
                    isActive
                      ? "bg-white dark:bg-gray-900 border-[var(--ifm-color-primary)] shadow-lg shadow-blue-500/10 dark:shadow-blue-500/5 scale-[1.02]"
                      : "bg-white/60 dark:bg-gray-900/40 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-gray-900/70"
                  }
                `}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{path.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {path.badge}
                    </span>
                  </div>
                  <h3
                    className={`text-base font-bold mb-1 tracking-tight transition-colors ${
                      isActive
                        ? "text-[var(--ifm-color-primary)]"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {path.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-gray-400 line-clamp-2">
                    {path.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-500 dark:text-gray-400">
                    {path.topics.length} Modules
                  </span>
                  {pct > 0 && (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {pct}% Done
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Path Hero Header & Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-md mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activePath.icon}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {activePath.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300">
                {activePath.description}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FaBookOpen className="text-[var(--ifm-color-primary)]" />
                  Target: {activePath.targetAudience}
                </span>
              </div>
            </div>

            {/* Progress Bar & Search Filter */}
            <div className="flex flex-col gap-4 min-w-[280px]">
              {/* Progress Container */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-slate-700 dark:text-gray-300">
                    Path Progress
                  </span>
                  <span className="text-[var(--ifm-color-primary)] font-mono">
                    {completedCountInPath} / {activePath.topics.length} completed ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Search Filter */}
              <div className="relative">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Filter topics or prerequisites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-[var(--ifm-color-primary)] text-slate-900 dark:text-white placeholder-slate-400 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Topic List Grid */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <FaLayerGroup className="mx-auto text-4xl text-slate-300 dark:text-slate-700 mb-3" />
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              No matching topics found
            </p>
            <p className="text-xs text-slate-500 dark:text-gray-400">
              Try adjusting your search query "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTopics.map((topic, index) => {
                const isCompleted = !!completedTopics[topic.id];

                return (
                  <motion.div
                    key={topic.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className={`
                      group relative flex flex-col justify-between p-6 rounded-2xl 
                      bg-white dark:bg-gray-900 
                      border transition-all duration-300 shadow-sm hover:shadow-xl
                      ${
                        isCompleted
                          ? "border-emerald-500/40 dark:border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/10"
                          : "border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/40"
                      }
                    `}
                  >
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-4 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-extrabold border border-blue-500/20">
                            {index + 1}
                          </span>
                          {getDifficultyBadge(topic.difficulty)}
                        </div>

                        {/* Complete Toggle */}
                        <button
                          onClick={(e) => toggleTopicCompletion(topic.id, e)}
                          title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                          className="p-1.5 text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer"
                        >
                          {isCompleted ? (
                            <FaCheckCircle className="text-emerald-500 text-lg" />
                          ) : (
                            <FaRegCircle className="text-slate-300 dark:text-slate-700 text-lg group-hover:text-slate-400" />
                          )}
                        </button>
                      </div>

                      {/* Topic Title & Link */}
                      <Link
                        to={topic.link}
                        className="no-underline hover:no-underline group/link"
                      >
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover/link:text-[var(--ifm-color-primary)] transition-colors">
                          {topic.title}
                        </h4>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                        {topic.description}
                      </p>

                      {/* Prerequisites Pill Container */}
                      {topic.prerequisites && topic.prerequisites.length > 0 && (
                        <div className="mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500 block mb-1.5">
                            Prerequisites
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {topic.prerequisites.map((req, rIdx) => (
                              <span
                                key={rIdx}
                                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-gray-300"
                              >
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Metadata Footer */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                      {/* Estimated Time */}
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400 font-medium">
                        <FaClock className="text-slate-400" />
                        <span>{topic.estimatedTime}</span>
                      </div>

                      {/* Rating Stars */}
                      <div
                        className="flex items-center gap-0.5 text-amber-400"
                        title={`Interview Relevance: ${topic.interviewRelevance}/5`}
                      >
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <FaStar
                            key={sIdx}
                            className={`text-[10px] ${
                              sIdx < topic.interviewRelevance
                                ? "text-amber-400"
                                : "text-slate-200 dark:text-slate-800"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Direct Link CTA */}
                      <Link
                        to={topic.link}
                        className="inline-flex items-center gap-1 font-bold text-[var(--ifm-color-primary)] hover:underline no-underline"
                      >
                        <span>Learn</span>
                        <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningPathsSection;
