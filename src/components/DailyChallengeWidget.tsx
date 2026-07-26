import React, { useEffect, useMemo, useState } from "react";
import Link from "@docusaurus/Link";
import { FiCheckCircle, FiClock, FiTag, FiTarget } from "react-icons/fi";
import { getDailyChallenge } from "../data/dailyChallenge";

const STORAGE_KEY = "daily_challenge_status";

type ChallengeStatus = "solved" | "unsolved";

const DailyChallengeWidget: React.FC = () => {
  const [status, setStatus] = useState<ChallengeStatus>("unsolved");
  const [mounted, setMounted] = useState(false);

  const challenge = useMemo(() => getDailyChallenge(), []);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") {
      return;
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "solved") {
        setStatus("solved");
      }
    } catch {
      // Ignore storage access issues.
    }
  }, []);

  const toggleStatus = () => {
    if (typeof window === "undefined") {
      return;
    }

    const nextStatus = status === "solved" ? "unsolved" : "solved";
    setStatus(nextStatus);
    window.localStorage.setItem(STORAGE_KEY, nextStatus);
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            <FiTarget className="h-3.5 w-3.5" />
            Daily challenge
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{challenge.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{challenge.description}</p>
        </div>
        <button
          type="button"
          onClick={toggleStatus}
          className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            status === "solved"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          <FiCheckCircle className="h-3.5 w-3.5" />
          {status === "solved" ? "Solved" : "Mark as solved"}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
          <FiClock className="h-3.5 w-3.5" />
          {challenge.difficulty}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
          <FiTag className="h-3.5 w-3.5" />
          {challenge.topic}
        </span>
        {challenge.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-1 dark:border-slate-700">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          A fresh challenge rotates every day to keep your practice habit consistent.
        </p>
        <Link
          to={challenge.link}
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
        >
          Open challenge
        </Link>
      </div>
    </section>
  );
};

export default DailyChallengeWidget;
