import React from "react";
import { motion } from "framer-motion";
import { usePracticeActivityHeatmap } from "../hooks/usePracticeActivityHeatmap";

const LEVEL_CLASSES = [
  "bg-slate-200 dark:bg-slate-800",
  "bg-emerald-300 dark:bg-emerald-700",
  "bg-emerald-500 dark:bg-emerald-600",
  "bg-emerald-600 dark:bg-emerald-400 text-white",
];

/** Fixed day-of-week column headers — always Sun → Sat regardless of which
 *  day of the week the 28-day window happens to start on. */
const WEEK_HEADER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getHeatmapClass(count: number, maxCount: number) {
  if (count === 0) {
    return LEVEL_CLASSES[0];
  }
  if (maxCount <= 1) {
    return LEVEL_CLASSES[1];
  }
  const ratio = count / maxCount;
  if (ratio < 0.5) return LEVEL_CLASSES[1];
  if (ratio < 0.85) return LEVEL_CLASSES[2];
  return LEVEL_CLASSES[3];
}

export default function PracticeActivityHeatmapWidget() {
  const heatmap = usePracticeActivityHeatmap(28);
  if (!heatmap.loaded) return null;

  const { days, activeDays, totalAttempts, totalSolved } = heatmap;
  const maxCount = Math.max(...days.map((day) => day.count), 1);
  const weeks = Array.from({ length: Math.ceil(days.length / 7) }, (_, rowIndex) =>
    days.slice(rowIndex * 7, rowIndex * 7 + 7)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border p-5 shadow-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Practice Activity
            </p>
            <h3 className="text-xl font-extrabold" style={{ color: "var(--ifm-heading-color)" }}>
              Recent activity calendar
            </h3>
          </div>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/60 p-3 text-[11px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
            <div className="font-semibold">{activeDays} active days</div>
            {totalAttempts > 0 && (
              <div className="mt-1 text-slate-500 dark:text-slate-400">{totalAttempts} quiz attempt{totalAttempts === 1 ? "" : "s"}</div>
            )}
            {totalSolved > 0 && (
              <div className="mt-1 text-slate-500 dark:text-slate-400">{totalSolved} problem{totalSolved === 1 ? "" : "s"} solved</div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-7 gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            {WEEK_HEADER.map((label) => (
              <span key={label} className="text-center">
                {label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weeks.flatMap((week) =>
              week.map((day) => {
                const parts: string[] = [];
                if (day.quizCount > 0) parts.push(`${day.quizCount} quiz attempt${day.quizCount === 1 ? "" : "s"}`);
                if (day.solvedCount > 0) parts.push(`${day.solvedCount} problem${day.solvedCount === 1 ? "" : "s"} solved`);
                const tooltip = parts.length > 0 ? `${day.date}: ${parts.join(", ")}` : day.date;
                return (
                  <div
                    key={day.date}
                    className={`h-12 rounded-2xl transition-colors duration-200 ${getHeatmapClass(day.count, maxCount)}`}
                    title={tooltip}
                  >
                    <div className="flex h-full items-center justify-center text-[11px] font-semibold">
                      {day.count > 0 ? day.count : ""}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Counts quiz attempts and DSA problems you marked solved. All data stays in your browser.
        </div>
      </div>
    </motion.div>
  );
}
