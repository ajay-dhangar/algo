import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaExclamationCircle,
  FaRedo,
  FaBrain,
} from "react-icons/fa";
import { FiRepeat, FiArrowRight } from "react-icons/fi";
import {
  recordQuestionReview,
  recordTopicReview,
  getDueItems,
  type SpacedRepetitionItem,
  type RecallDifficulty,
} from "../utils/spacedRepetition";
import { QUIZZES_CONFIG } from "../data/quizzesConfig";

interface SpacedRepetitionWidgetProps {
  queue: Record<string, SpacedRepetitionItem>;
  userId?: string | null;
  className?: string;
  onReviewRated?: (itemId: string, rating: RecallDifficulty) => void;
}

export default function SpacedRepetitionWidget({
  queue,
  userId,
  className = "",
  onReviewRated,
}: SpacedRepetitionWidgetProps) {
  const [localQueue, setLocalQueue] = useState<Record<string, SpacedRepetitionItem>>(queue);
  const dueItems = getDueItems(localQueue);
  const [ratedItemFeedback, setRatedItemFeedback] = useState<{
    id: string;
    rating: RecallDifficulty;
    nextDays: number;
  } | null>(null);

  // Map topicId to human-friendly title
  const getTopicTitle = (topicId: string) => {
    const config = QUIZZES_CONFIG.find((q) => q.id === topicId);
    if (config) return config.title.replace(/^Quiz on\s+/i, "");
    return topicId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const handleRateItem = (item: SpacedRepetitionItem, rating: RecallDifficulty) => {
    let updatedItem: SpacedRepetitionItem;
    if (item.questionId && item.questionId > 0) {
      updatedItem = recordQuestionReview(
        item.uniqueId,
        item.topicId,
        item.questionId,
        rating,
        userId
      );
    } else {
      updatedItem = recordTopicReview(item.topicId, rating, userId);
    }

    setLocalQueue((prev) => ({
      ...prev,
      [item.uniqueId]: updatedItem,
    }));

    setRatedItemFeedback({
      id: item.uniqueId,
      rating,
      nextDays: updatedItem.intervalDays,
    });

    setTimeout(() => {
      setRatedItemFeedback(null);
    }, 3000);

    if (onReviewRated) {
      onReviewRated(item.uniqueId, rating);
    }
  };

  return (
    <div
      className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 transition-all ${className}`}
      data-testid="spaced-repetition-widget"
    >
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
            <FaBrain size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
                Topics Due for Review Today
              </h2>
              {dueItems.length > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold shadow-sm">
                  {dueItems.length}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-0.5">
              SuperMemo SM-2 Spaced Repetition Queue
            </p>
          </div>
        </div>

        <Link
          to="/quizzes/review"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold no-underline transition-all shadow-sm shrink-0"
        >
          <FiRepeat size={14} />
          Start Review Session
          <FiArrowRight size={12} />
        </Link>
      </div>

      {/* Rated Feedback Alert */}
      <AnimatePresence>
        {ratedItemFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              Rated as <strong className="capitalize">{ratedItemFeedback.rating}</strong>!
            </span>
            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
              Next review in {ratedItemFeedback.nextDays}{" "}
              {ratedItemFeedback.nextDays === 1 ? "day" : "days"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Queue Content */}
      {dueItems.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-slate-50/70 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-700/60 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl">
            <FaCheckCircle />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 m-0">
              All Caught Up for Today!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-1 max-w-sm mx-auto">
              No DSA topics or questions are currently due for review. Great job maintaining your memory retention!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {dueItems.slice(0, 4).map((item) => {
            const title = getTopicTitle(item.topicId);
            return (
              <div
                key={item.uniqueId}
                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {title}
                    </span>
                    {item.questionId > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        Q#{item.questionId}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <FaClock className="text-indigo-500" size={10} />
                      Interval: {item.intervalDays || item.interval || 1}d
                    </span>
                    <span>•</span>
                    <span>EF: {item.easeFactor ?? 2.5}</span>
                    {item.missedCount > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-rose-500 font-bold">
                          Missed: {item.missedCount}x
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Self-Reported Recall Rating Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleRateItem(item, "Again")}
                    className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 text-[11px] font-bold border-0 cursor-pointer transition-colors"
                    title="Recall failed - Reset interval (1 day)"
                  >
                    Again
                  </button>
                  <button
                    onClick={() => handleRateItem(item, "Hard")}
                    className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900 text-amber-700 dark:text-amber-300 text-[11px] font-bold border-0 cursor-pointer transition-colors"
                    title="Recalled with effort"
                  >
                    Hard
                  </button>
                  <button
                    onClick={() => handleRateItem(item, "Good")}
                    className="px-2.5 py-1 rounded-lg bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold border-0 cursor-pointer transition-colors"
                    title="Normal recall"
                  >
                    Good
                  </button>
                  <button
                    onClick={() => handleRateItem(item, "Easy")}
                    className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border-0 cursor-pointer transition-colors"
                    title="Perfect recall"
                  >
                    Easy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
