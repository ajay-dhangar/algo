import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiActivity, FiCheckCircle, FiHelpCircle } from "react-icons/fi";
import { usePracticeActivityHeatmap } from "../hooks/usePracticeActivityHeatmap";

const LEVEL_CLASSES = [
  "bg-[var(--ifm-color-emphasis-200)] text-slate-400 dark:text-slate-500",
  "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
  "bg-emerald-500/50 text-white border border-emerald-500/60 shadow-sm",
  "bg-emerald-600 dark:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20",
];

const WEEK_HEADER = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getHeatmapClass(count: number, maxCount: number) {
  if (count === 0) return LEVEL_CLASSES[0];
  if (maxCount <= 1) return LEVEL_CLASSES[1];
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-3xl border p-6 sm:p-7 shadow-sm transition-colors duration-300 backdrop-blur-md"
      style={{
        backgroundColor: "var(--ifm-card-background-color)",
        borderColor: "var(--ifm-color-emphasis-200)",
      }}
    >
      <div className="flex flex-col gap-6">
        {/* Header and Telemetry Stats */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b pb-5" style={{ borderColor: "var(--ifm-color-emphasis-200)" }}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)]">
                <FiCalendar className="w-4 h-4" />
              </span>
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-[var(--ifm-color-primary)] m-0">
                Practice Telemetry
              </p>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight m-0" style={{ color: "var(--ifm-heading-color)" }}>
              28-Day Activity Matrix
            </h3>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)]">
              <FiActivity className="text-emerald-500 w-4 h-4" />
              <span>{activeDays} Active Days</span>
            </div>
            {totalAttempts > 0 && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)]">
                <FiHelpCircle className="text-amber-500 w-4 h-4" />
                <span>{totalAttempts} Quiz{totalAttempts === 1 ? "" : "zes"}</span>
              </div>
            )}
            {totalSolved > 0 && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)]">
                <FiCheckCircle className="text-blue-500 w-4 h-4" />
                <span>{totalSolved} Solved</span>
              </div>
            )}
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="space-y-3">
          <div className="grid grid-cols-7 gap-2 text-[10px] font-bold uppercase tracking-widest opacity-60 text-center">
            {WEEK_HEADER.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weeks.flatMap((week) =>
              week.map((day) => {
                const parts: string[] = [];
                if (day.quizCount > 0) parts.push(`${day.quizCount} quiz attempt${day.quizCount === 1 ? "" : "s"}`);
                if (day.solvedCount > 0) parts.push(`${day.solvedCount} problem${day.solvedCount === 1 ? "" : "s"} solved`);
                const tooltip = parts.length > 0 ? `${day.date}: ${parts.join(", ")}` : `${day.date}: No activity`;

                return (
                  <motion.div
                    key={day.date}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`h-11 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xs font-bold transition-shadow cursor-pointer ${getHeatmapClass(
                      day.count,
                      maxCount
                    )}`}
                    title={tooltip}
                  >
                    {day.count > 0 ? day.count : ""}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer & Intensity Legend */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-75 pt-2">
          <p className="m-0 text-center sm:text-left font-medium">
            Tracks quiz attempts and DSA problem solutions in local client storage.
          </p>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Less</span>
            {LEVEL_CLASSES.map((cls, idx) => (
              <span key={idx} className={`w-3.5 h-3.5 rounded-md ${cls}`} />
            ))}
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">More</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}