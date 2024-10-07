import React from "react";
import { LayoutGroup, motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import Layout from "@theme/Layout";

const Practice: React.FC = () => {
  return (
    <Layout title="Practice" description="Practice your coding skills with hundreds of algorithm problems.">
    <section className="relative bg-gray-100 dark:bg-gray-900 py-16 px-8">
      <div className="container mx-auto text-center max-w-4xl">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Practice Your Skills
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Sharpen your coding skills with hundreds of algorithm problems to practice.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example Practice Problem */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Problem 1: Two Sum
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Given an array of integers, return indices of the two numbers such that they add up to a specific target.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300">
              <FaPlayCircle className="w-5 h-5" />
              <span>Start Solving</span>
            </button>
          </motion.div>

          {/* Example Problem 2 */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Problem 2: Longest Substring Without Repeating Characters
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Find the length of the longest substring without repeating characters.
            </p>
            <button className="mt-4 border-1 border-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300">
              <FaPlayCircle className="w-5 h-5" />
              <span>Start Solving</span>
            </button>
          </motion.div>

          {/* Add more problems as needed */}
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default Practice;