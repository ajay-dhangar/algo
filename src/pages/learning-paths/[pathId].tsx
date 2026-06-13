/**
 * Learning Path Detail Page Component
 * Shows detailed view of a single learning path with all topics
 */

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "@docusaurus/router";
import {
  calculateTotalTime,
  getLearningPathById,
} from "../../data/learningPaths";
import { TopicCard } from "../../components/LearningPaths";

interface PathDetailParams {
  pathId?: string;
}

export const PathDetail: React.FC<PathDetailParams> = ({ pathId }) => {
  // Get path ID from URL if not provided
const { pathId: routePathId } = useParams<{ pathId: string }>();

const activePathId = pathId || routePathId;

const path = useMemo(
  () => getLearningPathById(activePathId || ""),
  [activePathId]
);

  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    new Set()
  );
  const [inProgressTopics, setInProgressTopics] = useState<Set<string>>(
    new Set()
  );
  const [sortBy, setSortBy] = useState<"order" | "difficulty" | "time">(
    "order"
  );
  const [filterDifficulty, setFilterDifficulty] = useState<
    "All" | "Easy" | "Medium" | "Hard"
  >("All");

  if (!path) {
    return (
      <Layout title="Path Not Found">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Path Not Found
          </h1>
          <Link href={useBaseUrl("/learning-paths")}>
            ← Back to Learning Paths
          </Link>
        </div>
      </Layout>
    );
  }

  const filteredAndSortedTopics = useMemo(() => {
    let topics = [...path.topics];

    // Filter by difficulty
    if (filterDifficulty !== "All") {
      topics = topics.filter((t) => t.difficulty === filterDifficulty);
    }

    // Sort
    switch (sortBy) {
      case "difficulty":
        const diffOrder = { Easy: 0, Medium: 1, Hard: 2 };
        return topics.sort(
          (a, b) =>
            (diffOrder[a.difficulty as keyof typeof diffOrder] || 0) -
            (diffOrder[b.difficulty as keyof typeof diffOrder] || 0)
        );
      case "time":
        return topics.sort((a, b) => a.estimatedTime - b.estimatedTime);
      case "order":
      default:
        return topics;
    }
  }, [path, sortBy, filterDifficulty]);

  const stats = useMemo(() => {
    return {
      totalTopics: path.topics.length,
      completedCount: completedTopics.size,
      inProgressCount: inProgressTopics.size,
      progressPercent: Math.round(
        (completedTopics.size / path.topics.length) * 100
      ),
      totalHours: calculateTotalTime(path.topics),
    };
  }, [path, completedTopics, inProgressTopics]);

  const toggleCompleted = (topicId: string) => {
    const newSet = new Set(completedTopics);
    if (newSet.has(topicId)) {
      newSet.delete(topicId);
    } else {
      newSet.add(topicId);
      setInProgressTopics((prev) => {
        const updated = new Set(prev);
        updated.delete(topicId);
        return updated;
      });
    }
    setCompletedTopics(newSet);
  };

  const toggleInProgress = (topicId: string) => {
    const newSet = new Set(inProgressTopics);
    if (newSet.has(topicId)) {
      newSet.delete(topicId);
    } else {
      newSet.add(topicId);
      setCompletedTopics((prev) => {
        const updated = new Set(prev);
        updated.delete(topicId);
        return updated;
      });
    }
    setInProgressTopics(newSet);
  };

  const getGradientClass = (): string => {
    const gradients: Record<string, string> = {
      "from-blue-500 to-cyan-500": "from-blue-500/20 to-cyan-500/20 dark:from-blue-900/40 dark:to-cyan-900/40",
      "from-purple-500 to-pink-500": "from-purple-500/20 to-pink-500/20 dark:from-purple-900/40 dark:to-pink-900/40",
      "from-green-500 to-emerald-500": "from-green-500/20 to-emerald-500/20 dark:from-green-900/40 dark:to-emerald-900/40",
      "from-yellow-500 to-orange-500": "from-yellow-500/20 to-orange-500/20 dark:from-yellow-900/40 dark:to-orange-900/40",
    };
    return `bg-gradient-to-r ${gradients[path.color] || gradients["from-blue-500 to-cyan-500"]}`;
  };

  return (
    <Layout
      title={`${path.name} - Learning Path`}
      description={path.description}
    >
      <main className="bg-gray-50 dark:bg-gray-900">
        {/* Back Button */}
        <div className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href={useBaseUrl("/learning-paths")}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaArrowLeft /> Back to Paths
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className={`${getGradientClass()} border-b border-gray-200 dark:border-gray-700 px-4 py-16 sm:px-6 lg:px-8`}>
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-5xl">{path.icon}</span>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                  {path.name}
                </h1>
              </div>

              <p className="mb-6 max-w-2xl text-lg text-gray-700 dark:text-gray-200">
                {path.description}
              </p>

              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  {
                    label: "Topics",
                    value: stats.totalTopics,
                    icon: "📚",
                  },
                  {
                    label: "Total Hours",
                    value: stats.totalHours,
                    icon: "⏱️",
                  },
                  {
                    label: "Completed",
                    value: stats.completedCount,
                    icon: "✓",
                  },
                  {
                    label: "Progress",
                    value: `${stats.progressPercent}%`,
                    icon: "📈",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-white/60 dark:bg-gray-800/60 px-4 py-3 backdrop-blur shadow-sm border border-white/20 dark:border-gray-700"
                  >
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                      <span>{stat.icon}</span>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Progress Bar */}
        <section className="border-b border-gray-200 bg-white px-4 py-6 dark:border-gray-700 dark:bg-gray-800 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Your Progress
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.completedCount} of {stats.totalTopics} completed
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.progressPercent}%` }}
                transition={{ type: "spring", stiffness: 50 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="border-b border-gray-200 bg-white px-4 py-6 dark:border-gray-700 dark:bg-gray-800 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sort:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as typeof sortBy)
                  }
                  className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="order">Learning Order</option>
                  <option value="difficulty">By Difficulty</option>
                  <option value="time">By Time</option>
                </select>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter:
                </label>
                <select
                  value={filterDifficulty}
                  onChange={(e) =>
                    setFilterDifficulty(
                      e.target.value as typeof filterDifficulty
                    )
                  }
                  className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Path Details */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-8 md:grid-cols-3">
              {/* Path Info */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white">
                  📋 About This Path
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {path.description}
                </p>
                <p className="mb-3 text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Target Audience:
                  </span>
                  <br />
                  <span className="text-gray-600 dark:text-gray-400">
                    {path.targetAudience}
                  </span>
                </p>
              </div>

              {/* Key Benefits */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white">
                  💡 Key Benefits
                </h3>
                <ul className="space-y-2">
                  {path.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="flex-shrink-0 text-green-600 dark:text-green-400">
                        ✓
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Stats */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 font-bold text-gray-900 dark:text-white">
                  📊 Path Statistics
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Difficulty Level
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {path.difficulty}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Total Topics
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {stats.totalTopics} topics
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Estimated Time
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {stats.totalHours}+ hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Topics List */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                📚 Topics in This Path
              </h2>

              {filteredAndSortedTopics.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                  {filteredAndSortedTopics.map((topic, idx) => (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      index={idx}
                      isCompleted={completedTopics.has(topic.id)}
                      isInProgress={inProgressTopics.has(topic.id)}
                      onToggleComplete={toggleCompleted}
                      onToggleInProgress={toggleInProgress}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-600 dark:bg-gray-800/30">
                  <p className="text-gray-600 dark:text-gray-400">
                    No topics match the current filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-12 dark:border-gray-700 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Ready to Start Learning?
            </h2>
            <p className="mb-6 text-blue-100">
              Follow this structured path and track your progress as you learn
              DSA
            </p>
            <Link
              href={useBaseUrl("/dsa-roadmap")}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-transform hover:scale-105"
            >
              View Full DSA Roadmap
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default PathDetail;
