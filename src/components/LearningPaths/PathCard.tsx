/**
 * Learning Path Card Component
 * Displays individual learning path with overview and call-to-action
 */

import React from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import { LearningPath } from "../../data/learningPaths";

interface PathCardProps {
  path: LearningPath;
  index: number;
  onExplore?: (pathId: string) => void;
}

export const PathCard: React.FC<PathCardProps> = ({
  path,
  index,
  onExplore,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: index * 0.1,
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -8,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const getGradientClass = (): string => {
    const gradients: Record<string, string> = {
      "from-blue-500 to-cyan-500": "from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20",
      "from-purple-500 to-pink-500": "from-purple-500/10 to-pink-500/10 dark:from-purple-900/20 dark:to-pink-900/20",
      "from-green-500 to-emerald-500": "from-green-500/10 to-emerald-500/10 dark:from-green-900/20 dark:to-emerald-900/20",
      "from-yellow-500 to-orange-500": "from-yellow-500/10 to-orange-500/10 dark:from-yellow-900/20 dark:to-orange-900/20",
    };
    return gradients[path.color] || gradients["from-blue-500 to-cyan-500"];
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      variants={{
        ...cardVariants,
        ...hoverVariants,
      }}
      className={`group rounded-2xl border border-gray-200 p-6 shadow-md transition-all duration-300 dark:border-gray-700 bg-gradient-to-br ${getGradientClass()} hover:shadow-xl dark:shadow-lg`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{path.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {path.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {path.difficulty} Level
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm text-gray-700 dark:text-gray-200">
        {path.description}
      </p>

      {/* Target Audience */}
      <div className="mb-4 inline-block rounded-full bg-blue-100/50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
        👥 {path.targetAudience}
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-white/50 p-3 dark:bg-gray-800/30">
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Topics
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {path.topics.length}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Total Time
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {path.totalHours}h
          </p>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
          💡 Key Benefits
        </p>
        <ul className="space-y-1">
          {path.keyBenefits.slice(0, 2).map((benefit, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
            >
              <span className="mt-1 flex-shrink-0">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
          {path.keyBenefits.length > 2 && (
            <li className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-500">
              <span className="mt-1 flex-shrink-0">•</span>
              <span>+{path.keyBenefits.length - 2} more benefits</span>
            </li>
          )}
        </ul>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => onExplore?.(path.id)}
        className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 dark:from-blue-600 dark:to-blue-700"
      >
        Explore Path →
      </button>
    </motion.div>
  );
};

export default PathCard;
