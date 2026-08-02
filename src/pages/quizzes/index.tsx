// @ts-nocheck
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlayCircle, FaTerminal, FaLayerGroup, FaSearch,
  FaTrophy, FaFire, FaChartBar, FaRedo, FaCheckCircle,
  FaClock, FaExclamationTriangle, FaStar, FaCircle,
} from "react-icons/fa";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useQuizProgress, QuizStat, GlobalQuizStats } from "../../hooks/useQuizProgress";
import QuizStreakWidget from "../../components/QuizStreakWidget";
import { QUIZZES_CONFIG, QUESTION_COUNTS, QUIZ_IDS, type QuizCardConfig } from "../../data/quizzesConfig";

const FILTER_CATEGORIES = ["All", "Linear", "Non-Linear", "Balanced Tree", "Disk Storage"] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, string> = {
  Linear:        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  "Non-Linear":  "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  "Balanced Tree":"bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20",
  "Disk Storage":"bg-rose-500/10 text-rose-800 dark:text-rose-400 border-rose-500/20",
};

function scoreColor(pct: number): string {
  if (pct >= 90) return "text-emerald-600 dark:text-emerald-400";
  if (pct >= 70) return "text-blue-600 dark:text-blue-400";
  if (pct >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-red-500 dark:text-red-400";
}

function scoreBg(pct: number): string {
  if (pct >= 90) return "bg-emerald-500";
  if (pct >= 70) return "bg-blue-500";
  if (pct >= 50) return "bg-amber-500";
  return "bg-red-500";
}

function formatPrerequisiteList(prereqIds: string[]) {
  if (prereqIds.length === 0) return "";
  const titles = prereqIds
    .map((id) => QUIZZES_CONFIG.find((quiz) => quiz.id === id)?.title.replace("Quiz on ", "") ?? id);
  if (titles.length === 1) return titles[0];
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`;
  return `${titles.slice(0, -1).join(", ")}, and ${titles[titles.length - 1]}`;
}

function statusIcon(status: string) {
  if (status === "mastered")    return <FaStar    className="text-amber-400 text-xs" />;
  if (status === "passed")      return <FaCheckCircle className="text-emerald-500 text-xs" />;
  if (status === "in-progress") return <FaExclamationTriangle className="text-amber-500 text-xs" />;
  return null;
}

// ─── Progress Dashboard ───────────────────────────────────────────────────────

interface ProgressDashboardProps {
  globalStats: GlobalQuizStats;
  userId: string | null;
  loaded: boolean;
}

function ProgressDashboard({ globalStats, userId, loaded }: ProgressDashboardProps) {
  if (!loaded) return null;

  const progressPct = globalStats.totalQuizzes > 0
    ? Math.round((globalStats.totalCompleted / globalStats.totalQuizzes) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <FaChartBar className="text-blue-500 text-sm" />
            <span className="text-xs font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Your Progress Dashboard
            </span>
            {userId && (
              <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600 hidden sm:block">
                — {userId}
              </span>
            )}
          </div>
          {!userId && (
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 italic">
              Take a quiz to see your scores here
            </span>
          )}
        </div>

        <div className="p-5 sm:p-6">
          {/* Overall progress bar */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Overall Coverage
              </span>
              <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                {globalStats.totalCompleted} / {globalStats.totalQuizzes} quizzes attempted
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              />
            </div>
            <div className="text-right mt-1 text-[10px] font-mono text-slate-400">{progressPct}%</div>
          </div>

          {/* Stat boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: <FaTrophy className="text-amber-500" />,
                label: "Mastered",
                value: globalStats.totalMastered,
                sub: "≥ 90%",
                color: "text-amber-600 dark:text-amber-400",
              },
              {
                icon: <FaCheckCircle className="text-emerald-500" />,
                label: "Passed",
                value: globalStats.totalPassed,
                sub: "≥ 70%",
                color: "text-emerald-600 dark:text-emerald-400",
              },
              {
                icon: <FaFire className="text-blue-500" />,
                label: "Attempted",
                value: globalStats.totalCompleted,
                sub: "started",
                color: "text-blue-600 dark:text-blue-400",
              },
              {
                icon: <FaChartBar className="text-purple-500" />,
                label: "Avg Score",
                value: globalStats.overallAvgPercent > 0
                  ? `${globalStats.overallAvgPercent}%`
                  : "—",
                sub: "best scores",
                color: "text-purple-600 dark:text-purple-400",
              },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-3.5 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">{stat.label}</span>
                </div>
                <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Needs review section */}
          {globalStats.weakTopics.length > 0 && (
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FaExclamationTriangle className="text-amber-500 text-xs" />
                  <span className="text-[10px] font-black tracking-widest text-amber-700 dark:text-amber-400 uppercase">
                    Needs Review
                  </span>
                </div>
                <Link
                  to="/dashboard"
                  className="text-[10px] font-bold text-amber-700 dark:text-amber-400 hover:underline no-underline"
                >
                  View full dashboard →
                </Link>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {globalStats.weakTopics.slice(0, 6).map(id => {
                  const quiz = QUIZZES_CONFIG.find(q => q.id === id);
                  return quiz ? (
                    <Link
                      key={id}
                      to={quiz.path}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30 no-underline hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                    >
                      {quiz.title.replace("Quiz on ", "")}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Quiz card with score badge ───────────────────────────────────────────────

function QuizCard({ quiz, stat, allStats, index }: { quiz: QuizCardConfig; stat?: QuizStat; allStats: Record<string, QuizStat>; index: number }) {
  const hasAttempt = stat && stat.totalAttempts > 0;
  const pct = stat?.bestPercent ?? 0;

  const missedPrereqs = quiz.prerequisites?.filter((prereq) => {
    const prereqStatus = allStats[prereq]?.status ?? "not-started";
    return prereqStatus === "not-started";
  }) ?? [];

  const showPrerequisiteHint = Boolean(
    hasAttempt &&
      pct < 60 &&
      missedPrereqs.length > 0
  );

  const prerequisiteHint = showPrerequisiteHint
    ? `This builds on ${formatPrerequisiteList(missedPrereqs)} — you haven't tried ${missedPrereqs.length === 1 ? "that one" : "those yet"}.`
    : null;

  return (
    <motion.div
      layout
      key={quiz.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between group transition-all relative overflow-hidden"
    >
      {/* Mastery glow */}
      {stat?.status === "mastered" && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-amber-400/30 pointer-events-none" />
      )}

      <div>
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className={`text-[10px] font-mono font-black tracking-wider uppercase px-2.5 py-0.5 rounded border shrink-0 ${CATEGORY_STYLES[quiz.category]}`}>
            {quiz.category}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {hasAttempt && statusIcon(stat.status)}
            <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
              {quiz.questionCount} Q
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white m-0 tracking-tight leading-snug group-hover:text-[var(--ifm-color-primary)] transition-colors">
          {quiz.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-5 leading-relaxed line-clamp-3">
          {quiz.description}
        </p>

        {/* Score section — only shown if attempted */}
        {hasAttempt && (
          <div className="mb-4 space-y-2.5">
            {/* Best score bar */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">Best Score</span>
                <span className={`text-xs font-black font-mono ${scoreColor(pct)}`}>
                  {stat.bestScore}/{stat.totalQuestions} · {pct}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`h-full rounded-full ${scoreBg(pct)}`}
                />
              </div>
            </div>

            {/* Meta row */}
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <FaRedo className="text-[8px]" />
                {stat.totalAttempts} attempt{stat.totalAttempts !== 1 ? "s" : ""}
              </span>
              {stat.latestAttemptAt && (
                <span className="flex items-center gap-1">
                  <FaClock className="text-[8px]" />
                  {new Date(stat.latestAttemptAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              )}
              <span className={`px-1.5 py-0.5 rounded font-black uppercase text-[8px] border ${
                stat.status === "mastered"    ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/30"
                : stat.status === "passed"    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30"
                : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
              }`}>
                {stat.status === "mastered" ? "⭐ Mastered"
                  : stat.status === "passed" ? "✓ Passed"
                  : "In Progress"}
              </span>
            </div>

            {prerequisiteHint && (
              <div className="mt-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-[10px] leading-snug text-slate-700 dark:text-slate-300">
                {prerequisiteHint}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA button */}
      <Link
        to={quiz.path}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-none bg-slate-100 hover:bg-[var(--ifm-color-primary)] dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer no-underline group/btn min-h-[42px]"
      >
        <FaPlayCircle className="text-sm transition-transform duration-200 group-hover/btn:scale-110" />
        <span>{hasAttempt ? "Retake Quiz //" : "Initialize Test //"}</span>
      </Link>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const Quizzes: React.FC = () => {
  const [search, setSearch]           = useState("");
  const [activeFilter, setActiveFilter] = useState<typeof FILTER_CATEGORIES[number]>("All");

  const filteredQuizzes = useMemo(() => {
    return QUIZZES_CONFIG.filter(quiz => {
      const matchesSearch    = quiz.title.toLowerCase().includes(search.toLowerCase()) ||
                               quiz.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory  = activeFilter === "All" || quiz.category === activeFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeFilter]);

  return (
    <Layout
      title="Skill Assessments // Data Structures"
      description="Practice your computer science skills with analytical quizzes focused on structures and optimization parameters."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans pb-32">

        {/* Hero */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/80 py-20 px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.06),transparent_50%)]" />
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold tracking-wider uppercase border border-blue-500/20"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            >
              <FaTerminal className="text-xs" /> diagnostic_assessment_terminal
            </motion.div>
            <motion.h1
              className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight m-0 uppercase"
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            >
              Test Data Structure <span className="text-[var(--ifm-color-primary)]">Skills</span>
            </motion.h1>
            <motion.p
              className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed m-0 font-medium"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.4 }}
            >
              Benchmark your parsing parameters. Evaluate your deep knowledge of linear arrays, memory allocation trees, node link operations, and space/time execution metrics.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="pt-2"
            >
              <Link
                to="/mock-exam"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all no-underline"
              >
                <FaPlayCircle size={16} />
                Try Timed Mock Exam Mode
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Progress dashboard — BrowserOnly since it reads localStorage */}
        <BrowserOnly fallback={null}>
          {() => {
            const Inner = () => {
              const { stats, globalStats, userId, loaded } = useQuizProgress(QUIZ_IDS, QUESTION_COUNTS);
              const [showOnlyWeak, setShowOnlyWeak] = useState(false);
              const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);

              const displayedQuizzes = useMemo(() => {
                return filteredQuizzes.filter(quiz => {
                  if (showOnlyWeak) {
                    const isWeak = globalStats.weakTopics.includes(quiz.id);
                    if (!isWeak) return false;
                  }
                  if (showOnlyIncomplete) {
                    const stat = stats[quiz.id];
                    const isIncomplete = !stat || stat.totalAttempts === 0 || stat.status === "in-progress";
                    if (!isIncomplete) return false;
                  }
                  return true;
                });
              }, [filteredQuizzes, showOnlyWeak, showOnlyIncomplete, stats, globalStats.weakTopics]);

              return (
                <>
                  <div className="max-w-7xl mx-auto px-4 mt-10 mb-2 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                      <ProgressDashboard globalStats={globalStats} userId={userId} loaded={loaded} />
                    </div>
                    <div className="lg:col-span-1">
                      <QuizStreakWidget />
                    </div>
                  </div>

                  {/* Search + filters */}
                  <div className="max-w-7xl mx-auto px-4 mt-8 space-y-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pb-4">
                      <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 text-sm" />
                        <input
                          type="text"
                          placeholder="Search quizzes..."
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          className="w-full py-2.5 pl-10 pr-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[var(--ifm-color-primary)] text-sm font-semibold rounded-xl transition-all"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Link
                          to="/quizzes/dependency-graph"
                          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                        >
                          Dependency Graph
                        </Link>
                      </div>
                      <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none">
                        <div className="flex gap-1.5 flex-wrap" role="group">
                          {FILTER_CATEGORIES.map(cat => (
                            <button
                              key={cat}
                              onClick={() => setActiveFilter(cat)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide border transition-all whitespace-nowrap min-h-[36px] cursor-pointer ${
                                activeFilter === cat
                                  ? "bg-[var(--ifm-color-primary)] border-[var(--ifm-color-primary)] text-white shadow-sm"
                                  : "border-slate-200 bg-white dark:bg-slate-950 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-[var(--ifm-color-primary)] hover:text-[var(--ifm-color-primary)]"
                              }`}
                            >
                              {cat === "All" ? "All Quizzes" : cat}
                            </button>
                          ))}

                          {/* Divider */}
                          <div className="w-px self-stretch bg-slate-200 dark:bg-slate-800 mx-1" />

                          {/* Show only weak topics */}
                          <button
                            onClick={() => setShowOnlyWeak(v => !v)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide border transition-all whitespace-nowrap min-h-[36px] cursor-pointer ${
                              showOnlyWeak
                                ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                                : "border-slate-200 bg-white dark:bg-slate-950 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400"
                            }`}
                            title="Show only topics where your score is below 70%"
                          >
                            <FaExclamationTriangle className="text-[10px]" />
                            Needs Review
                          </button>

                          {/* Show only incomplete */}
                          <button
                            onClick={() => setShowOnlyIncomplete(v => !v)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide border transition-all whitespace-nowrap min-h-[36px] cursor-pointer ${
                              showOnlyIncomplete
                                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                : "border-slate-200 bg-white dark:bg-slate-950 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                            title="Show only quizzes you haven't passed yet"
                          >
                            <FaCircle className="text-[10px]" />
                            Not Completed
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cards grid */}
                  <section className="max-w-7xl mx-auto px-4 mt-6">
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <AnimatePresence mode="popLayout">
                        {displayedQuizzes.map((quiz, index) => (
                          <QuizCard
                            key={quiz.id}
                            quiz={quiz}
                            stat={stats[quiz.id]}
                            allStats={stats}
                            index={index}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>

                    {displayedQuizzes.length === 0 && (
                      <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                        <FaLayerGroup className="text-slate-400 mx-auto text-3xl mb-3" />
                        <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 m-0">No Search Parameters Matched</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto font-medium">
                          Adjust or clear your current structural filters to access operational assessment routines.
                        </p>
                      </div>
                    )}
                  </section>
                </>
              );
            };
            return <Inner />;
          }}
        </BrowserOnly>
      </div>
    </Layout>
  );
};

export default Quizzes;
