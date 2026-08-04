import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import { FiArrowRight, FiRepeat } from "react-icons/fi";
import type { WeakTopicEntry } from "../utils/weakTopics";
import type { QuizStat } from "../hooks/useQuizProgress";
import { downloadQuizData } from "../utils/exportQuizData";

export interface WeakTopicsChartProps {
  entries: WeakTopicEntry[];
  onStartReview?: () => void;
  dueCount?: number;
}

function barColor(bestPercent: number, hasAttempts: boolean): string {
  if (!hasAttempts) return "bg-slate-300 dark:bg-slate-700";
  if (bestPercent < 40) return "bg-rose-500";
  if (bestPercent < 60) return "bg-amber-500";
  return "bg-blue-500";
}

export default function WeakTopicsChart({ entries, onStartReview, dueCount }: WeakTopicsChartProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
        <p className="text-slate-500 dark:text-slate-400 font-semibold m-0">
          No quiz history yet — take a quiz to see your weak topics here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 gap-3">
        <div className="flex items-center gap-2">
          <FiRepeat className="text-indigo-600 dark:text-indigo-400 text-base" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
              Spaced Repetition Review Mode
              {dueCount !== undefined && dueCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-mono font-black rounded-full bg-amber-500 text-white">
                  {dueCount} questions due
                </span>
              )}
            </span>
            <span className="text-[11px] text-indigo-700 dark:text-indigo-300">
              Resurface missed questions on an adaptive schedule to boost long-term retention.
            </span>
          </div>
        </div>
        <Link
          to="/quizzes/review"
          onClick={onStartReview}
          className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white no-underline transition-colors shadow-sm shrink-0"
        >
          Review weak topics
          <FiArrowRight size={14} />
        </Link>
      </div>
      {entries.map((entry, index) => {
        const hasAttempts = entry.stat.totalAttempts > 0;
        const pct = hasAttempts ? entry.stat.bestPercent : 0;

        return (
          <div key={entry.quiz.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="sm:w-48 shrink-0">
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {entry.quiz.title.replace("Quiz on ", "")}
              </div>
              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                {hasAttempts
                  ? `${entry.stat.totalAttempts} attempt${entry.stat.totalAttempts === 1 ? "" : "s"}`
                  : "Not attempted yet"}
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                  className={`h-full rounded-full ${barColor(pct, hasAttempts)}`}
                />
              </div>
              <span className="w-10 text-right text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                {hasAttempts ? `${pct}%` : "—"}
              </span>
            </div>

            <Link
              to={entry.quiz.path}
              className="inline-flex items-center gap-1 shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 no-underline hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              Practice this
              <FiArrowRight size={12} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
