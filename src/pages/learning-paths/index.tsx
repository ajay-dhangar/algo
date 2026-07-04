/**
 * Learning Paths Page Component
 * Main page showcasing all available learning paths
 */

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import {
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";
import { learningPaths } from "../../data/learningPaths";
import PathCard from "../../components/LearningPaths/PathCard";

interface FilterState {
  difficulty: "All" | "Beginner" | "Intermediate" | "Advanced";
  sortBy: "newest" | "duration" | "difficulty";
}

import { useHistory } from "@docusaurus/router";

export const LearningPathsPage: React.FC = () => {
  const history = useHistory();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    difficulty: "All",
    sortBy: "newest",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort paths
  const filteredPaths = useMemo(() => {
    let paths = [...learningPaths];

    // Apply difficulty filter
    if (filters.difficulty !== "All") {
      paths = paths.filter((p) => p.difficulty === filters.difficulty);
    }

    // Apply search
    if (searchQuery) {
      paths = paths.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.targetAudience
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "duration":
        return paths.sort((a, b) => a.totalHours - b.totalHours);
      case "difficulty":
        const diffOrder = { Beginner: 0, Intermediate: 1, Advanced: 2 };
        return paths.sort(
          (a, b) =>
            diffOrder[a.difficulty as keyof typeof diffOrder] -
            diffOrder[b.difficulty as keyof typeof diffOrder]
        );
      case "newest":
      default:
        return paths;
    }
  }, [filters, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <Layout
      title="Learning Paths - Algo"
      description="Structured learning paths for DSA mastery based on your goals and experience level"
    >
      <main className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 dark:bg-blue-900/30">
                <span>🎯</span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                  Structured Learning Paths
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                Your Personalized{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h1>

              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Choose your path based on your learning goals and experience
                level. Each path is carefully curated with structured topics,
                estimated learning time, and interview-focused content.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
                  <span className="text-xl">📚</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {learningPaths.length} Paths
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
                  <span className="text-xl">💡</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {learningPaths.reduce((sum, p) => sum + p.topics.length, 0)}{" "}
                    Topics
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm dark:bg-gray-800">
                  <span className="text-xl">⏱️</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {learningPaths.reduce((sum, p) => sum + p.totalHours, 0)}+
                    Hours
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="border-b border-gray-200 bg-white px-4 py-8 dark:border-gray-700 dark:bg-gray-800/50 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              {/* Search */}
              <div className="sm:col-span-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search learning paths..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <select
                value={filters.difficulty}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    difficulty: e.target.value as FilterState["difficulty"],
                  })
                }
                className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-2">
              {(["newest", "duration", "difficulty"] as const).map((sort) => (
                <button
                  key={sort}
                  onClick={() => setFilters({ ...filters, sortBy: sort })}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filters.sortBy === sort
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                >
                  {sort === "newest" && "📅 Newest"}
                  {sort === "duration" && "⏱️ Duration"}
                  {sort === "difficulty" && "📈 Difficulty"}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Paths Grid Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {filteredPaths.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-8 md:grid-cols-2"
              >
                {filteredPaths.map((path, index) => (
                  <PathCard
                    key={path.id}
                    path={path}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-600 dark:bg-gray-800/30"
              >
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  No learning paths found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      difficulty: "All",
                      sortBy: "newest",
                    });
                  }}
                  className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-gray-200 bg-gray-50 px-4 py-16 dark:border-gray-700 dark:bg-gray-800/50 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Why Choose Our Learning Paths?
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: "🎯",
                  title: "Goal-Oriented",
                  description:
                    "Each path is designed for specific learning objectives and career goals",
                },
                {
                  icon: "📊",
                  title: "Metadata-Rich",
                  description:
                    "Every topic includes difficulty, time estimates, prerequisites, and relevance metrics",
                },
                {
                  icon: "🚀",
                  title: "Progressive Learning",
                  description:
                    "Topics are ordered logically with prerequisite tracking for smooth progression",
                },
                {
                  icon: "⭐",
                  title: "Interview-Focused",
                  description:
                    "Content selected based on actual interview frequency and importance",
                },
                {
                  icon: "💼",
                  title: "Expert Curated",
                  description:
                    "Paths created by experienced engineers and interview experts",
                },
                {
                  icon: "📈",
                  title: "Track Progress",
                  description:
                    "Monitor your learning journey with completion tracking and statistics",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
                >
                  <div className="mb-3 text-4xl">{feature.icon}</div>
                  <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Choose a path that matches your goals and start learning today
            </p>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-transform duration-300 hover:scale-105"
            >
              Explore All Paths
              <FaArrowRight />
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default LearningPathsPage;
