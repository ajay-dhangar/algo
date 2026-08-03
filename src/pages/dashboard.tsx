import React, { useMemo } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { motion } from "framer-motion";
import { FaChartBar, FaExclamationTriangle } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { useQuizProgress } from "../hooks/useQuizProgress";
import { QUIZZES_CONFIG, QUESTION_COUNTS, QUIZ_IDS } from "../data/quizzesConfig";
import { rankWeakTopics } from "../utils/weakTopics";
import WeakTopicsChart from "../components/WeakTopicsChart";
import QuizStreakWidget from "../components/QuizStreakWidget";
import { downloadQuizData } from "../utils/exportQuizData";

function DashboardContent() {
  const { stats, globalStats, userId, loaded } = useQuizProgress(QUIZ_IDS, QUESTION_COUNTS);

  const weakTopicEntries = useMemo(() => {
    return rankWeakTopics(stats, QUIZZES_CONFIG);
  }, [stats]);

  if (!loaded) {
    return (
      <div className="py-16 text-center text-slate-400 font-mono text-sm">
        Loading quiz history & weak topics dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-widest">
            <FaExclamationTriangle size={12} />
            Weak Topics Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white m-0">
            Target Your Weak Spots & Track Progress
          </h1>
          <p className="text-slate-400 text-sm m-0 leading-relaxed">
            Review the topics where your quiz scores are lowest, practice tailored questions, or export your serialized stats to track interview prep progress in your own spreadsheet.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => downloadQuizData(stats, "csv")}
            aria-label="Download my data"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer border-0"
          >
            <FiDownload size={16} />
            Download my data (CSV)
          </button>
          <button
            type="button"
            onClick={() => downloadQuizData(stats, "json")}
            aria-label="Download JSON data"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all cursor-pointer"
          >
            Export JSON
          </button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Columns: Weak Topics Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <FaExclamationTriangle className="text-amber-500 text-sm" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
                  Weak Topics Analysis
                </h2>
              </div>
            </div>
            <WeakTopicsChart entries={weakTopicEntries} stats={stats} showExport={true} />
          </div>
        </div>

        {/* Right Column: Quiz Streak Widget */}
        <div className="lg:col-span-1 space-y-6">
          <QuizStreakWidget />
        </div>
      </div>
    </div>
  );
}

export default function WeakTopicsDashboardPage() {
  return (
    <Layout
      title="Weak Topics Dashboard"
      description="Track quiz progress, target weak data structure topics, and download history for interview prep spreadsheets."
    >
      <BrowserOnly fallback={<div className="py-16 text-center text-slate-400 font-mono">Loading dashboard...</div>}>
        {() => <DashboardContent />}
      </BrowserOnly>
    </Layout>
  );
}
