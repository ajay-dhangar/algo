import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaPlayCircle, FaTag } from "react-icons/fa";
import Link from "@docusaurus/Link";
import useBaseUrl from '@docusaurus/useBaseUrl';

const resolvedLink = useBaseUrl(Link);
<Link to={resolvedLink}></Link>

type Difficulty = "Easy" | "Medium" | "Hard";

interface ChallengeCardProps {
  title: string;
  description: string;
  timeLimit: string;
  link: string;
  difficulty?: Difficulty;
  category?: string;
  tags?: string[];
}

const DIFF_STYLES: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25",
  Hard: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25",
};

const DIFF_DOT: Record<Difficulty, string> = {
  Easy: "bg-emerald-500",
  Medium: "bg-amber-500",
  Hard: "bg-red-500",
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  timeLimit,
  link,
  difficulty,
  category,
}) => {
  return (
    <motion.div
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Accent line at top */}
      <div
        className={`h-0.5 w-full ${
          difficulty === "Easy"
            ? "bg-emerald-500"
            : difficulty === "Medium"
            ? "bg-amber-500"
            : difficulty === "Hard"
            ? "bg-red-500"
            : "bg-blue-500"
        }`}
      />

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          {difficulty ? (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono shrink-0 ${DIFF_STYLES[difficulty]}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${DIFF_DOT[difficulty]}`} />
              {difficulty}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono shrink-0 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Challenge
            </span>
          )}
          {category && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              <FaTag className="text-[8px]" /> {category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <FaClock className="text-[10px]" />
            {timeLimit}
          </div>
          <Link
            to={link}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold font-mono hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors no-underline border-none"
          >
            <FaPlayCircle className="text-[11px]" />
            Solve
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCard;