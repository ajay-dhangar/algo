import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useQuizStreak } from "../hooks/useQuizStreak";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getLastSevenDayLabels(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return DAY_LABELS[d.getDay()];
  });
}

/** Reusable SVG Flame Icon */
function FlameIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flame-grad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <path
        fill="url(#flame-grad)"
        d="M12 2c0 0-4 4-4 8a4 4 0 0 0 8 0c0-1.5-.5-3-1.5-4C14 8 14 10 12 10c-1.1 0-2-.9-2-2 0-2 2-6 2-6zm0 20a6 6 0 0 1-6-6c0-3.3 2.4-6 4-8 .5 1.5.5 3 0 4a4 4 0 0 0 4 4c1.1 0 2.1-.4 2.8-1.1A6 6 0 0 1 12 22z"
      />
    </svg>
  );
}

/** Stat Pill Component */
function StatPill({
  value,
  label,
  colorClass,
}: {
  value: string | number;
  label: string;
  colorClass: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={`text-xl sm:text-2xl font-black font-mono leading-none ${colorClass}`}>
        {value}
      </span>
      <span className="text-[9px] font-extrabold tracking-widest uppercase opacity-60">
        {label}
      </span>
    </div>
  );
}

export default function QuizStreakWidget() {
  const streak = useQuizStreak();

  const isLoaded = useMemo(() => {
    return typeof window !== "undefined" && streak?.loaded;
  }, [streak?.loaded]);

  // Loading skeleton placeholder for SSR & Hydration
  if (!isLoaded) {
    return (
      <div
        className="rounded-3xl border p-5 animate-pulse"
        style={{
          backgroundColor: "var(--ifm-card-background-color)",
          borderColor: "var(--ifm-color-emphasis-200)",
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--ifm-color-emphasis-200)]">
          <div className="h-4 w-28 bg-[var(--ifm-color-emphasis-200)] rounded-lg" />
          <div className="h-4 w-20 bg-[var(--ifm-color-emphasis-200)] rounded-full" />
        </div>
        <div className="my-5 h-12 bg-[var(--ifm-color-emphasis-100)] rounded-2xl" />
        <div className="h-8 bg-[var(--ifm-color-emphasis-100)] rounded-xl" />
      </div>
    );
  }

  const dayLabels = getLastSevenDayLabels();

  const flameShadow = streak.practicedToday
    ? "drop-shadow(0 0 10px rgba(249, 115, 22, 0.6))"
    : "none";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border shadow-sm transition-colors duration-300 overflow-hidden"
      style={{
        backgroundColor: "var(--ifm-card-background-color)",
        borderColor: "var(--ifm-color-emphasis-200)",
      }}
    >
      {/* Widget Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b bg-[var(--ifm-color-emphasis-100)]"
        style={{ borderColor: "var(--ifm-color-emphasis-200)" }}
      >
        <div className="flex items-center gap-2">
          <FlameIcon
            className="w-4 h-4 transition-transform duration-300 hover:scale-110"
            style={{ filter: flameShadow }}
          />
          <span className="text-[10px] font-extrabold tracking-widest text-[var(--ifm-color-primary)] uppercase">
            Streak Engine
          </span>
        </div>

        {streak.practicedToday ? (
          <motion.span
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Active Today
          </motion.span>
        ) : streak.currentStreak > 0 ? (
          <span className="text-[10px] font-bold text-amber-500 animate-pulse">
            Practice today to protect your streak!
          </span>
        ) : null}
      </div>

      {/* Widget Body */}
      <div className="p-5 space-y-5">
        {/* Metric Row */}
        <div className="flex items-center justify-around gap-4 bg-[var(--ifm-color-emphasis-100)] p-4 rounded-2xl border border-[var(--ifm-color-emphasis-200)]">
          {/* Main Counter */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={streak.practicedToday ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <FlameIcon
                className="w-9 h-9 shrink-0"
                style={{ filter: flameShadow }}
              />
            </motion.div>
            <div>
              <div
                className={`text-3xl font-black font-mono leading-none ${
                  streak.currentStreak > 0
                    ? "text-orange-500 dark:text-orange-400"
                    : "opacity-40"
                }`}
              >
                {streak.currentStreak}
              </div>
              <div className="text-[9px] font-extrabold tracking-widest uppercase opacity-60 mt-1">
                Day Streak
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-px h-10 shrink-0"
            style={{ backgroundColor: "var(--ifm-color-emphasis-200)" }}
          />

          {/* Secondary Stats */}
          <div className="flex items-center gap-5">
            <StatPill
              value={streak.longestStreak}
              label="Best"
              colorClass="text-amber-500 dark:text-amber-400"
            />
            <StatPill
              value={streak.totalActiveDays}
              label="Total"
              colorClass="text-blue-500 dark:text-blue-400"
            />
          </div>
        </div>

        {/* 7-Day Activity Bars */}
        <div className="space-y-2">
          <div className="flex items-end justify-between gap-1.5">
            {streak.last7Days.map((active, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  style={{ originY: 1 }}
                  className={`w-full rounded-lg transition-all duration-300 ${
                    i === 6
                      ? active
                        ? "bg-orange-500 h-7 shadow-md shadow-orange-500/30"
                        : "bg-[var(--ifm-color-emphasis-200)] h-7 border-2 border-dashed border-orange-400/50"
                      : active
                      ? "bg-amber-400 dark:bg-amber-500 h-6"
                      : "bg-[var(--ifm-color-emphasis-200)] h-6 opacity-60"
                  }`}
                  title={`${dayLabels[i]}: ${active ? "Quiz completed" : "No activity recorded"}`}
                />
                <span
                  className={`text-[9px] font-mono font-bold ${
                    i === 6
                      ? "text-orange-500 dark:text-orange-400"
                      : "opacity-60"
                  }`}
                >
                  {dayLabels[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Zero State Motivational Note */}
        {streak.currentStreak === 0 && streak.totalActiveDays === 0 && (
          <p className="text-center text-xs font-semibold opacity-60 m-0 pt-1">
            Complete your first quiz to kick off your practice streak 🔥
          </p>
        )}
      </div>
    </motion.div>
  );
}