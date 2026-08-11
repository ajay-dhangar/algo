/**
 * QuizStreakWidget
 * ---------------
 * Duolingo-style daily streak counter driven entirely by quiz-attempt
 * timestamps from localStorage.  No new data is written.
 *
 * Shows:
 *  - Flame icon + current streak (days)
 *  - Longest streak
 *  - Total active days
 *  - 7-day mini-heatmap (last 7 calendar days)
 *  - "Practice today" badge when the user has already attempted a quiz today
 */

import React from "react";
import { motion } from "framer-motion";
import { useQuizStreak } from "../hooks/useQuizStreak";

// --- Day labels for the week heatmap -----------------------------------------

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getLastSevenDayLabels(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return DAY_LABELS[d.getDay()];
  });
}

// --- Stat pill ---------------------------------------------------------------

function StatPill({
  value,
  label,
  color,
}: {
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={`text-xl font-black font-mono leading-none ${color}`}>
        {value}
      </span>
      <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">
        {label}
      </span>
    </div>
  );
}

// --- Component ---------------------------------------------------------------

export default function QuizStreakWidget() {
  const streak = useQuizStreak();

  // Don't render until localStorage has been read
  if (!streak.loaded) return null;

  const dayLabels = getLastSevenDayLabels();

  const flameColor = streak.currentStreak === 0
    ? "text-slate-400 dark:text-slate-600"
    : streak.practicedToday
    ? "text-orange-500"
    : "text-amber-400";

  const flameShadow = streak.practicedToday
    ? "drop-shadow(0 0 6px rgba(249,115,22,0.5))"
    : "none";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60">
        <div className="flex items-center gap-2">
          {/* Flame SVG � avoids any icon-library bundle concerns */}
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-4 h-4 ${flameColor} transition-colors duration-300`}
            style={{ filter: flameShadow }}
            aria-hidden="true"
          >
            <path d="M12 2c0 0-4 4-4 8a4 4 0 0 0 8 0c0-1.5-.5-3-1.5-4C14 8 14 10 12 10c-1.1 0-2-.9-2-2 0-2 2-6 2-6zm0 20a6 6 0 0 1-6-6c0-3.3 2.4-6 4-8 .5 1.5.5 3 0 4a4 4 0 0 0 4 4c1.1 0 2.1-.4 2.8-1.1A6 6 0 0 1 12 22z" />
          </svg>
          <span className="text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            Quiz Streak
          </span>
        </div>

        {streak.practicedToday && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/40"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Active Today
          </motion.span>
        )}

        {!streak.practicedToday && streak.currentStreak > 0 && (
          <span className="text-[9px] font-mono text-amber-500 dark:text-amber-400 font-bold">
            Take a quiz to keep it alive!
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4">
        {/* Stats row */}
        <div className="flex items-center justify-around gap-4">
          {/* Big flame + streak number */}
          <div className="flex items-center gap-2.5">
            <motion.svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-10 h-10 ${flameColor} shrink-0`}
              style={{ filter: flameShadow }}
              animate={streak.practicedToday ? { scale: [1, 1.12, 1] } : {}}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <path d="M12 2c0 0-4 4-4 8a4 4 0 0 0 8 0c0-1.5-.5-3-1.5-4C14 8 14 10 12 10c-1.1 0-2-.9-2-2 0-2 2-6 2-6zm0 20a6 6 0 0 1-6-6c0-3.3 2.4-6 4-8 .5 1.5.5 3 0 4a4 4 0 0 0 4 4c1.1 0 2.1-.4 2.8-1.1A6 6 0 0 1 12 22z" />
            </motion.svg>
            <div>
              <div className={`text-3xl font-black font-mono leading-none ${streak.currentStreak > 0 ? "text-orange-500 dark:text-orange-400" : "text-slate-400 dark:text-slate-600"}`}>
                {streak.currentStreak}
              </div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-slate-400 mt-0.5">
                day streak
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-12 bg-slate-100 dark:bg-slate-800 shrink-0" />

          {/* Longest + Active days */}
          <div className="flex gap-5">
            <StatPill
              value={streak.longestStreak}
              label="Best"
              color="text-amber-500 dark:text-amber-400"
            />
            <StatPill
              value={streak.totalActiveDays}
              label="Total Days"
              color="text-blue-500 dark:text-blue-400"
            />
          </div>
        </div>

        {/* 7-day heatmap */}
        <div>
          <div className="flex items-end justify-between gap-1">
            {streak.last7Days.map((active, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  style={{ originY: 1 }}
                  className={`w-full rounded-md transition-colors duration-300 ${
                    i === 6
                      ? active
                        ? "bg-orange-500 h-6 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                        : "bg-slate-200 dark:bg-slate-700 h-6 border-2 border-dashed border-orange-300 dark:border-orange-700"
                      : active
                      ? "bg-amber-400 dark:bg-amber-500 h-5"
                      : "bg-slate-100 dark:bg-slate-800 h-5"
                  }`}
                  title={`${dayLabels[i]}: ${active ? "practiced" : "no quiz"}`}
                />
                <span className={`text-[8px] font-mono font-bold ${i === 6 ? "text-orange-500 dark:text-orange-400" : "text-slate-400"}`}>
                  {dayLabels[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Zero-state nudge */}
        {streak.currentStreak === 0 && streak.totalActiveDays === 0 && (
          <p className="text-center text-[10px] font-medium text-slate-400 dark:text-slate-600 pt-1">
            Complete a quiz to start your streak ??
          </p>
        )}
      </div>
    </motion.div>
  );
}
