import React, { useMemo } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaCheckCircle,
  FaAward,
  FaExclamationTriangle,
  FaBook,
  FaChevronRight,
  FaFire,
  FaHistory,
} from "react-icons/fa";
import { FiRepeat, FiArrowRight } from "react-icons/fi";

import WeakTopicsChart from "../components/WeakTopicsChart";
import { useQuizProgress } from "../hooks/useQuizProgress";
import { QUIZZES_CONFIG, QUESTION_COUNTS, QUIZ_IDS } from "../data/quizzesConfig";
import { rankWeakTopics } from "../utils/weakTopics";
import {
  getSpacedRepetitionQueue,
  getDueItems,
  syncMissedQuestionsFromHistory,
} from "../utils/spacedRepetition";

function DashboardContent() {
  const { stats, globalStats, userId, loaded } = useQuizProgress(QUIZ_IDS, QUESTION_COUNTS);

  const weakEntries = useMemo(() => {
    return rankWeakTopics(stats, QUIZZES_CONFIG);
  }, [stats]);

  const queue = useMemo(() => {
    const synced = syncMissedQuestionsFromHistory(stats, userId);
    return synced;
  }, [stats, userId]);

  const dueItems = useMemo(() => {
    return getDueItems(queue);
  }, [queue]);

  if (!loaded) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin text-blue-600 dark:text-blue-400 text-3xl mb-4 inline-block">
          <FiRepeat />
        </div>
        <p className="text-slate-500 font-semibold">Loading your learning dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold">
              <FaChartBar size={12} />
              DSA Learning Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white m-0">
              Welcome Back, Learner
            </h1>
            <p className="text-indigo-200 text-sm max-w-xl m-0">
              Track your performance, resurface weak concepts with spaced repetition, and master algorithms.
            </p>
          </div>

          <Link
            to="/quizzes/review"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold no-underline transition-all transform hover:-translate-y-0.5 shadow-lg shrink-0"
          >
            <FiRepeat className="text-lg" />
            Start Spaced Review ({dueItems.length} Due)
          </Link>
        </div>
      </div>

      {/* Global Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Attempted</span>
            <FaBook className="text-blue-500" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-900 dark:text-slate-100">
            {globalStats.totalCompleted} <span className="text-sm font-semibold text-slate-400">/ {globalStats.totalQuizzes}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Quizzes tried at least once</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Mastered</span>
            <FaAward className="text-amber-500" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-500">
            {globalStats.totalMastered}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Quizzes with ≥ 90% score</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Average Score</span>
            <FaChartBar className="text-emerald-500" />
          </div>
          <div className="text-3xl font-black font-mono text-emerald-500">
            {globalStats.overallAvgPercent}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Across all attempted topics</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Review Queue</span>
            <FiRepeat className="text-indigo-500" />
          </div>
          <div className="text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400">
            {dueItems.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Questions due for spaced review</div>
        </div>
      </div>

      {/* Main Grid: Spaced Repetition + Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Weak Topics Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 m-0 flex items-center gap-2">
                  <FaExclamationTriangle className="text-amber-500 text-sm" />
                  Weak Topics Analysis
                </h2>
                <p className="text-xs text-slate-500 m-0 mt-0.5">
                  Topics needing practice based on low scores and error history.
                </p>
              </div>
              <Link
                to="/quizzes"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline no-underline"
              >
                All Quizzes →
              </Link>
            </div>

            <WeakTopicsChart entries={weakEntries} dueCount={dueItems.length} />
          </div>
        </div>

        {/* Right Column: Spaced Repetition Widget & Quick Actions */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-600 text-white">
                <FiRepeat size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-100 m-0">
                  Spaced Repetition Review
                </h3>
                <p className="text-xs text-indigo-700 dark:text-indigo-300 m-0">
                  Scientific memory scheduling
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0">
              Resurface missed questions at expanding intervals (1d, 3d, 7d, 14d) to convert short-term errors into long-term recall.
            </p>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Questions Due Now:</span>
              <span className="font-mono text-sm font-black text-indigo-600 dark:text-indigo-400">
                {dueItems.length}
              </span>
            </div>

            <Link
              to="/quizzes/review"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold no-underline transition-colors shadow-sm"
            >
              Start Review Session
              <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 flex items-center gap-2">
              <FaHistory className="text-blue-500" />
              Quick Practice Shortcuts
            </h3>
            <div className="space-y-2">
              {QUIZZES_CONFIG.slice(0, 4).map((quiz) => (
                <Link
                  key={quiz.id}
                  to={quiz.path}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 no-underline transition-colors"
                >
                  <span>{quiz.title.replace("Quiz on ", "")}</span>
                  <FaChevronRight className="text-slate-400" size={10} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Layout
      title="Learning Dashboard — Weak Topics & Spaced Repetition | Algo"
      description="Track your DSA quiz progress, identify weak topics, and master algorithms with scheduled spaced repetition."
    >
      <BrowserOnly fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
        {() => <DashboardContent />}
      </BrowserOnly>
    </Layout>
  );
}
