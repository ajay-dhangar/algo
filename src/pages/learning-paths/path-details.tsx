/**
 * Path Details Page Component
 * Displays comprehensive information about a specific learning path
 */

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { TopicCard } from "../../components/LearningPaths";
import {
  FaArrowLeft,
  FaClock,
  FaTrophy,
  FaBook,
  FaCheckCircle,
  FaPlayCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { learningPaths, getLearningPathById, getRelevanceStars } from "../../data/learningPaths";

interface PathDetailsPageProps {
  location?: {
    search: string;
  };
}

export const PathDetailsPage: React.FC<PathDetailsPageProps> = ({ location }) => {
  // Get path ID from URL query parameter
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const pathId = searchParams.get("id") || "beginner-programmer";
  const path = getLearningPathById(pathId);

  // State for topic tracking
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [inProgressTopics, setInProgressTopics] = useState<Set<string>>(new Set());
  const [filterDifficulty, setFilterDifficulty] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
  const [sortBy, setSortBy] = useState<"order" | "difficulty" | "time">("order");

  // Computed statistics
  const stats = useMemo(() => {
    const totalTopics = path?.topics.length || 0;
    const completedCount = completedTopics.size;
    const inProgressCount = inProgressTopics.size;
    const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
    const totalHours = path?.totalHours || 0;

    return {
      totalTopics,
      completedCount,
      inProgressCount,
      progressPercent,
      totalHours,
    };
  }, [completedTopics, inProgressTopics, path]);

  // Filter and sort topics
  const filteredTopics = useMemo(() => {
    if (!path) return [];

    let topics = [...path.topics];

    // Apply difficulty filter
    if (filterDifficulty !== "All") {
      topics = topics.filter((t) => t.difficulty === filterDifficulty);
    }

    // Apply sorting
    if (sortBy === "difficulty") {
      const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };
      topics.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
    } else if (sortBy === "time") {
      topics.sort((a, b) => a.estimatedTime - b.estimatedTime);
    }

    return topics;
  }, [path, filterDifficulty, sortBy]);

  // Toggle functions
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

  if (!path) {
    return (
      <Layout title="Path Not Found">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Path Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The learning path you're looking for doesn't exist.</p>
            <Link href="/algo/learning-paths" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Back to Learning Paths
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const gradientClass = `bg-gradient-to-r ${path.color}`;

  return (
    <Layout title={`${path.name} - Learning Path`}>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Back Button */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/algo/learning-paths" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              <FaArrowLeft className="mr-2" />
              Back to All Paths
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${gradientClass} text-white py-16 sm:py-24`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-5xl sm:text-6xl mb-4">{path.icon}</div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">{path.name}</h1>
                <p className="text-lg sm:text-xl opacity-90 mb-4 max-w-2xl">{path.description}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                    {path.difficulty} Level
                  </span>
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                    {path.totalHours}+ Hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FaBook, label: "Total Topics", value: stats.totalTopics },
              { icon: FaClock, label: "Total Time", value: `${stats.totalHours}h` },
              { icon: FaCheckCircle, label: "Completed", value: stats.completedCount },
              {
                icon: FaTrophy,
                label: "Progress",
                value: `${stats.progressPercent}%`,
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
              >
                <stat.icon className="text-2xl text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <motion.div className="mt-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Progress</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.completedCount} of {stats.totalTopics} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.progressPercent}%` }}
                transition={{ duration: 0.8, type: "spring" }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Info Sections */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* About This Path */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 space-y-6"
            >
              {/* About */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Path</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {path.description}
                </p>
              </div>

              {/* Target Audience */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Who Is This For?</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{path.targetAudience}</p>
              </div>

              {/* Key Benefits */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Key Benefits</h3>
                <ul className="space-y-2">
                  {path.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-blue-600 dark:text-blue-400 mr-2 mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Topics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2"
            >
              {/* Controls */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "order" | "difficulty" | "time")}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    >
                      <option value="order">📍 Order</option>
                      <option value="difficulty">📊 Difficulty</option>
                      <option value="time">⏱️ Time</option>
                    </select>
                  </div>

                  {/* Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Filter by Difficulty
                    </label>
                    <select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value as "All" | "Easy" | "Medium" | "Hard")}
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                    >
                      <option value="All">All Levels</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Topics List */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Topics ({filteredTopics.length})
                </h3>
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
  {filteredTopics.map((topic, idx) => (
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
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PathDetailsPage;
