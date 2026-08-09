import React from "react";
import { FaFire, FaChevronRight, FaClock, FaSignal } from "react-icons/fa";
import Link from "@docusaurus/Link";
import type { Recommendation } from "../utils/recommendations";

interface RecommendedNextCardProps {
  recommendation: Recommendation | null;
}

export default function RecommendedNextCard({ recommendation }: RecommendedNextCardProps) {
  if (!recommendation) {
    return (
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 m-0 inline-flex items-center gap-2">
              <FaFire className="text-rose-500" />
              Recommended next
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Personalized guidance appears once you've started a few quiz attempts.
            </p>
          </div>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Begin a quiz to unlock a tailored recommendation ranked by your weakest topics, recent activity, and progression.
        </div>
      </div>
    );
  }

  const { quiz, stat, reasons } = recommendation;
  const practicedAgo = stat.latestAttemptAt
    ? `${Math.round((Date.now() - new Date(stat.latestAttemptAt).getTime()) / (1000 * 60 * 60 * 24))} day${Math.round((Date.now() - new Date(stat.latestAttemptAt).getTime()) / (1000 * 60 * 60 * 24)) === 1 ? "" : "s"}`
    : "never";

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 m-0 inline-flex items-center gap-2">
            <FaFire className="text-rose-500" />
            Recommended next
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Personalized suggestion from your quiz history and recent practice.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold dark:bg-rose-500/10 dark:text-rose-200">
          {quiz.category}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 m-0">
            {quiz.title.replace("Quiz on ", "")}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {quiz.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-600 dark:text-slate-300">
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-700">
            <div className="font-semibold text-slate-900 dark:text-slate-100">Best score</div>
            <div className="mt-2 text-xl font-black text-slate-900 dark:text-slate-100">
              {stat.totalAttempts === 0 ? "—" : `${stat.bestPercent}%`}
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-700">
            <div className="font-semibold text-slate-900 dark:text-slate-100">Last practiced</div>
            <div className="mt-2 flex items-center gap-2 text-xl font-black text-slate-900 dark:text-slate-100">
              <FaClock className="text-slate-400" />
              {practicedAgo}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 p-4">
          <div className="text-xs uppercase tracking-[0.18em] font-bold text-slate-500 dark:text-slate-400 mb-3">
            Why this is next
          </div>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            {reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link
            to={quiz.path}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold no-underline transition-colors shadow-sm"
          >
            Open Quiz
            <FaChevronRight size={12} />
          </Link>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Use this recommendation to keep your skill progression balanced and avoid repeating mastered topics.
          </div>
        </div>
      </div>
    </div>
  );
}
