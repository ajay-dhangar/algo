// @ts-nocheck
/**
 * WeeklyChallengeSpotlight
 * ─────────────────────────
 * Selects one challenge per ISO calendar week from challengeData.ts,
 * shows a live countdown to Monday 00:00 UTC (next rotation),
 * and persists "solved this week" using a date-keyed localStorage entry
 * so the solved state resets automatically each new week.
 *
 * SSG-safe: all localStorage and Date logic runs inside useEffect.
 */

import React, { useState, useEffect, useCallback } from "react";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy, FaClock, FaFire, FaTag, FaCheckCircle,
  FaChevronRight, FaCalendarWeek, FaBolt,
} from "react-icons/fa";
import challengeData from "../data/challengeData";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WeeklyChallenge {
  title: string;
  description: string;
  timeLimit: string;
  link: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  category?: string;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY_PREFIX = "weekly_challenge_solved_";

const DIFF_CONFIG = {
  Easy:   { pill: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25", dot: "bg-emerald-500", glow: "shadow-emerald-500/20" },
  Medium: { pill: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25",        dot: "bg-amber-500",   glow: "shadow-amber-500/20"   },
  Hard:   { pill: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/25",                dot: "bg-red-500",    glow: "shadow-red-500/20"     },
};

const CATEGORY_ICONS: Record<string, string> = {
  Trees: "🌳", Graphs: "🕸️", DP: "🧩",
  "Dynamic Programming": "🧩", Greedy: "⚡", Sorting: "↕️",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** ISO week number — consistent with the "week" in the storage key */
function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // ISO week: Thursday of the week determines the year
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getISOYear(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  return d.getUTCFullYear();
}

/** Storage key is unique per ISO year+week, so it auto-resets each Monday */
function weeklyStorageKey(date: Date): string {
  return `${STORAGE_KEY_PREFIX}${getISOYear(date)}_W${String(getISOWeek(date)).padStart(2, "0")}`;
}

/** Pick a challenge for the given date's ISO week (deterministic) */
function getWeeklyChallenge(date: Date): WeeklyChallenge {
  const eligible = (challengeData as WeeklyChallenge[]).filter(
    (c) => c.category && c.difficulty
  );
  const seed = getISOYear(date) * 100 + getISOWeek(date);
  const idx = seed % eligible.length;
  return eligible[idx];
}

/** Milliseconds until next Monday 00:00 UTC */
function msUntilNextMonday(now: Date): number {
  const dayOfWeek = now.getUTCDay(); // 0=Sun … 6=Sat
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  const nextMonday = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysUntilMonday
  ));
  return nextMonday.getTime() - now.getTime();
}

function msToCountdown(ms: number): Countdown {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days:    Math.floor(total / 86400),
    hours:   Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

// ─── Countdown display ────────────────────────────────────────────────────────

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
          className="text-lg font-black font-mono text-slate-900 dark:text-white leading-none"
        >
          {pad(value)}
        </motion.span>
      </AnimatePresence>
      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
        {label}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const WeeklyChallengeSpotlight: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [challenge, setChallenge] = useState<WeeklyChallenge | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [weekLabel, setWeekLabel] = useState("");
  const [justMarked, setJustMarked] = useState(false);

  // Initialise on mount (SSG-safe)
  useEffect(() => {
    const now = new Date();
    const weekly = getWeeklyChallenge(now);
    const storageKey = weeklyStorageKey(now);

    setChallenge(weekly);
    setWeekLabel(`Week ${getISOWeek(now)} · ${now.getUTCFullYear()}`);

    try {
      const saved = localStorage.getItem(storageKey);
      setIsSolved(saved === "solved");
    } catch { /* ignore */ }

    // Kick off the countdown ticker
    const tick = () => {
      setCountdown(msToCountdown(msUntilNextMonday(new Date())));
    };
    tick();
    const iv = setInterval(tick, 1000);
    setMounted(true);
    return () => clearInterval(iv);
  }, []);

  const handleToggleSolved = useCallback(() => {
    if (!challenge) return;
    const storageKey = weeklyStorageKey(new Date());
    const next = !isSolved;
    setIsSolved(next);
    try {
      if (next) {
        localStorage.setItem(storageKey, "solved");
        setJustMarked(true);
        setTimeout(() => setJustMarked(false), 2200);
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch { /* ignore */ }
  }, [isSolved, challenge]);

  if (!mounted || !challenge) return null;

  const diff = challenge.difficulty;
  const dc = diff ? DIFF_CONFIG[diff] : null;
  const catIcon = CATEGORY_ICONS[challenge.category ?? ""] ?? "📋";

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-2xl border bg-white dark:bg-slate-900 ${
          isSolved
            ? "border-emerald-400/40 dark:border-emerald-600/30 shadow-lg shadow-emerald-500/10"
            : "border-amber-400/40 dark:border-amber-600/30 shadow-lg shadow-amber-500/10"
        }`}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
          isSolved
            ? "bg-gradient-to-br from-emerald-50/60 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900"
            : "bg-gradient-to-br from-amber-50/60 via-white to-white dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900"
        }`} />

        {/* Top accent bar */}
        <div className={`h-1 w-full transition-colors duration-700 ${
          isSolved
            ? "bg-gradient-to-r from-emerald-400 to-teal-400"
            : "bg-gradient-to-r from-amber-400 to-orange-400"
        }`} />

        <div className="relative z-10 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">

            {/* Left — main content */}
            <div className="flex-1 min-w-0">
              {/* Header row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {/* Weekly badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  <FaCalendarWeek className="text-[9px]" />
                  Challenge of the Week
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  {weekLabel}
                </span>
                {/* Solved badge — animates in */}
                <AnimatePresence>
                  {isSolved && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    >
                      <FaCheckCircle className="text-[9px]" /> Completed this week
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Title */}
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl mt-0.5 shrink-0">{catIcon}</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug m-0">
                  {challenge.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {challenge.description}
              </p>

              {/* Meta pills */}
              <div className="flex flex-wrap items-center gap-2">
                {dc && (
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${dc.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dc.dot}`} />
                    {diff}
                  </span>
                )}
                {challenge.category && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    <FaTag className="text-[8px]" /> {challenge.category}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  <FaClock className="text-[9px]" /> {challenge.timeLimit}
                </span>
                {isSolved && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30">
                    <FaFire className="text-[9px]" /> Streak builder
                  </span>
                )}
              </div>
            </div>

            {/* Right — countdown + actions */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-3 shrink-0">

              {/* Countdown */}
              <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3">
                <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase mb-2 flex items-center gap-1">
                  <FaBolt className="text-amber-400 text-[9px]" /> Resets in
                </span>
                <div className="flex items-start gap-2">
                  <CountdownUnit value={countdown.days}    label="d" />
                  <span className="text-slate-400 font-black text-sm leading-none mt-0.5">:</span>
                  <CountdownUnit value={countdown.hours}   label="h" />
                  <span className="text-slate-400 font-black text-sm leading-none mt-0.5">:</span>
                  <CountdownUnit value={countdown.minutes} label="m" />
                  <span className="text-slate-400 font-black text-sm leading-none mt-0.5">:</span>
                  <CountdownUnit value={countdown.seconds} label="s" />
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Link
                  to={challenge.link}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-amber-500 dark:hover:bg-amber-400 dark:hover:text-white no-underline transition-all duration-200 group"
                >
                  Solve Now
                  <FaChevronRight className="text-[9px] group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  onClick={handleToggleSolved}
                  className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono border transition-all duration-200 cursor-pointer ${
                    isSolved
                      ? "bg-emerald-500 text-white border-emerald-600 hover:bg-red-500 hover:border-red-600"
                      : "bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                  title={isSolved ? "Click to unmark" : "Mark as solved"}
                >
                  <FaCheckCircle className={`text-[10px] transition-transform ${justMarked ? "scale-125" : ""}`} />
                  {isSolved ? "Solved ✅" : "Mark Solved"}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom hint */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
              A new challenge spotlight rotates every <strong>Monday 00:00 UTC</strong>. Solving it counts toward your weekly streak.
            </p>
            {isSolved && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-black text-emerald-500 font-mono whitespace-nowrap"
              >
                +1 this week 🎉
              </motion.span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeeklyChallengeSpotlight;
