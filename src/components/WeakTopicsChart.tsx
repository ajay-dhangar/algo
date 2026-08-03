import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import type { WeakTopicEntry } from "../utils/weakTopics";
import type { QuizStat } from "../hooks/useQuizProgress";
import { downloadQuizData } from "../utils/exportQuizData";

export interface WeakTopicsChartProps {
  entries: WeakTopicEntry[];
  stats?: Record<string, QuizStat>;
  showExport?: boolean;
}

function barColor(bestPercent: number, hasAttempts: boolean): string {
  if (!hasAttempts) return "bg-slate-300 dark:bg-slate-700";
  if (bestPercent < 40) return "bg-rose-500";
  if (bestPercent < 60) return "bg-amber-500";
  return "bg-blue-500";
}

export default function WeakTopicsChart({
  entries,
  stats,
  showExport = true,
}: WeakTopicsChartProps) {
  const [exportFormat, setExportFormat] = useState<"csv" | "json">("csv");

  const exportDataMap = useMemo(() => {
    if (stats && Object.keys(stats).length > 0) {
      return stats;
    }
    const map: Record<string, QuizStat> = {};
    entries.forEach((entry) => {
      map[entry.quiz.id] = entry.stat;
    });
    return map;
  }, [stats, entries]);

  const handleDownload = (format: "csv" | "json" = exportFormat) => {
    downloadQuizData(exportDataMap, format);
  };

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
      {showExport && (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Recommended Practice Topics
          </span>
          <div className="flex items-center gap-2">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as "csv" | "json")}
              aria-label="Export format"
              className="text-xs py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium focus:outline-none"
            >
              <option value="csv">CSV (.csv)</option>
              <option value="json">JSON (.json)</option>
            </select>
            <button
              type="button"
              onClick={() => handleDownload()}
              aria-label="Download my data"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <FiDownload size={14} />
              Download my data
            </button>
          </div>
        </div>
      )}

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
