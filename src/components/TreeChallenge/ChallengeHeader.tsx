import React from "react";
import Link from "@docusaurus/Link";
import { FaArrowLeft, FaChevronRight, FaClock, FaCheck } from "react-icons/fa";
import type { TreeChallenge } from "../../data/treeChallengesData";

const DIFF_COLORS = {
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-500 border-red-500/20",
};

interface ChallengeHeaderProps {
  id: string;
  title: string;
  difficulty: TreeChallenge["difficulty"];
  timeLimit: string;
}

export default function ChallengeHeader({ id, title, difficulty, timeLimit }: ChallengeHeaderProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center gap-4">
      <Link
        to="/challenges"
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-mono transition-colors no-underline"
      >
        <FaArrowLeft /> Back to Challenges
      </Link>
      <FaChevronRight className="text-slate-300 dark:text-slate-700 text-xs" />
      <span className="text-slate-700 dark:text-slate-300 text-sm font-mono font-bold truncate">
        {title}
      </span>
      <button
        onClick={() => {
          const progress = JSON.parse(localStorage.getItem("algo_progress") || "{}");
          progress[id] = true;
          progress[`${id}_title`] = title;
          progress[`${id}_updatedAt`] = new Date().toISOString();
          localStorage.setItem("algo_progress", JSON.stringify(progress));
          alert("Marked as solved!");
        }}
        className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
      >
        <FaCheck /> Mark as Solved ✅
      </button>
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${DIFF_COLORS[difficulty]}`}>
        {difficulty}
      </span>
      <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
        <FaClock /> {timeLimit}
      </span>
    </div>
  );
}