import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiActivity, FiCheckSquare } from "react-icons/fi";
import { usePracticeActivityHeatmap } from "../hooks/usePracticeActivityHeatmap";
import { useQuizStreak } from "../hooks/useQuizStreak";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getHeatClass(active: boolean) {
  return active
    ? "bg-emerald-500 dark:bg-emerald-400"
    : "bg-slate-200 dark:bg-slate-800";
}

export default function PracticeActivitySummaryCard() {
  const streak = useQuizStreak();
  const heatmap = usePracticeActivityHeatmap(7);

  if (!streak.loaded || !heatmap.loaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border p-5 shadow-sm bg-[var(--ifm-card-background-color)] border-[var(--ifm-color-emphasis-200)]"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-50 m-0">Practice summary</p>
            <h3 className="mt-2 text-lg font-extrabold" style={{ color: "var(--ifm-heading-color)" }}>
              Streak & activity
            </h3>
          </div>
          <div className="rounded-full bg-slate-100 dark:bg-slate-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-600 dark:text-slate-300 font-semibold">
            Last 7 days
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/70 p-4 border border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-50 m-0">Current streak</p>
            <p className="mt-2 text-3xl font-black" style={{ color: "var(--ifm-color-primary)" }}>
              {streak.currentStreak}
            </p>
            <p className="text-xs opacity-70 mt-2 m-0">Days with at least one quiz attempt.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/70 p-4 border border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-50 m-0">Active days</p>
            <p className="mt-2 text-3xl font-black" style={{ color: "var(--ifm-heading-color)" }}>
              {streak.totalActiveDays}
            </p>
            <p className="text-xs opacity-70 mt-2 m-0">Unique days practiced this week.</p>
          </div>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/70 p-4 border border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-50 m-0">Quiz attempts</p>
            <p className="mt-2 text-3xl font-black" style={{ color: "var(--ifm-heading-color)" }}>
              {heatmap.totalAttempts}
            </p>
            <p className="text-xs opacity-70 mt-2 m-0">Attempts recorded in the last 7 days.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
          <div className="grid grid-cols-7 gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 mb-2">
            {DAY_LABELS.map((label) => (
              <span key={label} className="text-center">{label}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {heatmap.days.map((day) => (
              <div
                key={day.date}
                className={`h-10 rounded-2xl transition-colors duration-200 ${getHeatClass(day.count > 0)}`}
                title={`${day.date}: ${day.count} attempt${day.count === 1 ? "" : "s"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-2">
            <FiCheckSquare className="w-4 h-4 text-emerald-500" />
            {streak.practicedToday ? "You practiced today." : "No activity recorded today yet."}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] font-semibold text-[var(--ifm-color-primary)]">
            Learn more <FiArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
