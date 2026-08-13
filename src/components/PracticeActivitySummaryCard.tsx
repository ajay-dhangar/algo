import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiCalendar, FiCheckCircle, FiHelpCircle } from "react-icons/fi";
import { usePracticeActivityHeatmap } from "../hooks/usePracticeActivityHeatmap";
import { useQuizStreak } from "../hooks/useQuizStreak";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Dynamic heat map pill generator */
function getHeatPillStyle(count: number) {
  if (count === 0) {
    return "bg-[var(--ifm-color-emphasis-200)] text-[var(--ifm-font-color-base)] opacity-40";
  }
  if (count <= 2) {
    return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold";
  }
  return "bg-emerald-500 text-white font-extrabold shadow-sm shadow-emerald-500/30";
}

export default function PracticeActivitySummaryCard() {
  const streak = useQuizStreak();
  const heatmap = usePracticeActivityHeatmap(7);

  // Real-world safeguard for SSR build steps in Docusaurus
  const isLoaded = useMemo(() => {
    return typeof window !== "undefined" && streak?.loaded && heatmap?.loaded;
  }, [streak?.loaded, heatmap?.loaded]);

  if (!isLoaded) {
    return (
      <div 
        className="rounded-3xl border p-6 animate-pulse"
        style={{
          backgroundColor: "var(--ifm-card-background-color)",
          borderColor: "var(--ifm-color-emphasis-200)",
        }}
      >
        <div className="h-6 w-36 bg-[var(--ifm-color-emphasis-200)] rounded-xl mb-4" />
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="h-24 bg-[var(--ifm-color-emphasis-100)] rounded-2xl" />
          <div className="h-24 bg-[var(--ifm-color-emphasis-100)] rounded-2xl" />
          <div className="h-24 bg-[var(--ifm-color-emphasis-100)] rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border p-5 sm:p-6 shadow-sm backdrop-blur-md transition-colors duration-300"
      style={{
        backgroundColor: "var(--ifm-card-background-color)",
        borderColor: "var(--ifm-color-emphasis-200)",
      }}
    >
      <div className="flex flex-col gap-5">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)]">
                <FiZap className="w-3.5 h-3.5" />
              </span>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--ifm-color-primary)] m-0">
                Telemetry Summary
              </p>
            </div>
            <h3 className="text-xl font-black tracking-tight m-0" style={{ color: "var(--ifm-heading-color)" }}>
              Streak & Activity
            </h3>
          </div>

          <div className="shrink-0 rounded-xl bg-[var(--ifm-color-emphasis-100)] border border-[var(--ifm-color-emphasis-200)] px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold opacity-80">
            Last 7 Days
          </div>
        </div>

        {/* Real-World Stat Cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          {/* Current Streak Stat Card */}
          <div className="rounded-2xl p-4 border bg-[var(--ifm-color-emphasis-100)] border-[var(--ifm-color-emphasis-200)] relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">Current Streak</span>
              <FiZap className={`w-4 h-4 ${streak.currentStreak > 0 ? "text-amber-500 fill-amber-500" : "opacity-40"}`} />
            </div>
            <div className="mt-2">
              <p className="text-3xl font-black m-0 tracking-tight" style={{ color: "var(--ifm-color-primary)" }}>
                {streak.currentStreak} <span className="text-xs font-bold opacity-60">Days</span>
              </p>
              <p className="text-[11px] opacity-70 mt-1 m-0 font-medium">Daily quiz or solution logged.</p>
            </div>
          </div>

          {/* Active Days Stat Card */}
          <div className="rounded-2xl p-4 border bg-[var(--ifm-color-emphasis-100)] border-[var(--ifm-color-emphasis-200)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">Active Days</span>
              <FiCalendar className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2">
              <p className="text-3xl font-black m-0 tracking-tight" style={{ color: "var(--ifm-heading-color)" }}>
                {heatmap.activeDays} <span className="text-xs font-bold opacity-60">/ 7</span>
              </p>
              <p className="text-[11px] opacity-70 mt-1 m-0 font-medium">Unique days active this week.</p>
            </div>
          </div>

          {/* Quiz Attempts Stat Card */}
          <div className="rounded-2xl p-4 border bg-[var(--ifm-color-emphasis-100)] border-[var(--ifm-color-emphasis-200)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-60">Total Activity</span>
              <FiHelpCircle className="w-4 h-4 text-blue-500" />
            </div>
            <div className="mt-2">
              <p className="text-3xl font-black m-0 tracking-tight" style={{ color: "var(--ifm-heading-color)" }}>
                {heatmap.totalAttempts}
              </p>
              <p className="text-[11px] opacity-70 mt-1 m-0 font-medium">Total attempts in current week.</p>
            </div>
          </div>
        </div>

        {/* 7-Day Activity Grid */}
        <div className="rounded-2xl border p-3.5 bg-[var(--ifm-color-emphasis-100)] border-[var(--ifm-color-emphasis-200)]">
          <div className="grid grid-cols-7 gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 text-center mb-2">
            {DAY_LABELS.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {heatmap.days.map((day) => (
              <motion.div
                key={day.date}
                whileHover={{ scale: 1.05 }}
                className={`h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${getHeatPillStyle(
                  day.count
                )}`}
                title={`${day.date}: ${day.count} activity event${day.count === 1 ? "" : "s"}`}
              >
                {day.count > 0 ? day.count : ""}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Status Bar */}
        <div className="flex items-center justify-between gap-3 text-xs pt-1">
          <span className="flex items-center gap-2 font-medium">
            <FiCheckCircle className={`w-4 h-4 ${streak.practicedToday ? "text-emerald-500" : "text-amber-500"}`} />
            <span className="opacity-80">
              {streak.practicedToday ? "Streak maintained today!" : "No activity logged today yet."}
            </span>
          </span>

          <a 
            href="/algo/profile" 
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-extrabold text-[var(--ifm-color-primary)] no-underline hover:no-underline hover:opacity-80 transition-opacity"
          >
            Telemetry <FiArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}