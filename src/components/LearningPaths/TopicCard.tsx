/**
 * Topic Card Component
 * Displays individual topic metadata including difficulty, time, prerequisites, and relevance
 */

import React from "react";
import { motion } from "framer-motion";
import { TopicMetadata, getDifficultyColor, getRelevanceStars } from "../../data/learningPaths";
import Link from "@docusaurus/Link";

interface TopicCardProps {
  topic: TopicMetadata;
  index: number;
  isCompleted?: boolean;
  isInProgress?: boolean;
  onToggleComplete?: (id: string) => void;
  onToggleInProgress?: (id: string) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  index,
  isCompleted = false,
  isInProgress = false,
  onToggleComplete,
  onToggleInProgress,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.05 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={`rounded-lg border-2 p-4 transition-all duration-300 ${
        isCompleted
          ? "border-green-500/50 bg-green-50 dark:bg-green-900/20"
          : isInProgress
            ? "border-blue-500/50 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50"
      } hover:shadow-lg hover:border-blue-500/70 dark:hover:border-blue-400/70`}
    >
      {/* Status Badge */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{topic.icon}</span>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {topic.title}
          </h4>
        </div>
        {isCompleted && (
          <span className="inline-flex items-center rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
            ✓ Completed
          </span>
        )}
        {isInProgress && (
          <span className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
            In Progress
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
        {topic.description}
      </p>

      {/* Metadata Grid */}
      <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Difficulty:
          </span>
          <span
            className={`inline-block rounded px-2 py-1 text-xs font-medium ${getDifficultyColor(
              topic.difficulty
            )}`}
          >
            {topic.difficulty === "Easy" && "🟢"}
            {topic.difficulty === "Medium" && "🟡"}
            {topic.difficulty === "Hard" && "🔴"}
            {" "}
            {topic.difficulty}
          </span>
        </div>

        {/* Estimated Time */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Time:
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            ⏱️ {topic.estimatedTime}h
          </span>
        </div>

        {/* Interview Relevance */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Relevance:
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {getRelevanceStars(topic.interviewRelevance)}
          </span>
        </div>

        {/* Prerequisites */}
        {topic.prerequisites.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Prerequisites:
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {topic.prerequisites.length} topic(s)
            </span>
          </div>
        )}
      </div>

      {/* Prerequisites Details (if any) */}
      {topic.prerequisites.length > 0 && (
        <div className="mb-3 rounded bg-gray-100 p-2 dark:bg-gray-700/50">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
            📋 Prerequisites:
          </p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Requires knowledge from {topic.prerequisites.length} previous topics
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onToggleComplete?.(topic.id)}
          className={`flex-1 rounded border-2 py-2 text-xs font-medium transition-colors ${
            isCompleted
              ? "border-green-500 bg-green-500 text-white hover:bg-green-600 dark:border-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              : "border-gray-300 text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
          }`}
        >
          {isCompleted ? "✓ Completed" : "Mark Complete"}
        </button>

        <Link
          to={topic.docLink || "/docs"}
          onClick={() => {
            if (!isCompleted && !isInProgress) {
              onToggleInProgress?.(topic.id);
            }
          }}
          className="flex-1 flex justify-center items-center rounded bg-blue-500 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-600 hover:no-underline"
        >
          {isCompleted ? "Review" : isInProgress ? "Continue Learning" : "Start Learning"}
        </Link>
      </div>
    </motion.div>
  );
};

export default React.memo(TopicCard);
