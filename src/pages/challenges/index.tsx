import React from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";
import { FaClock, FaTrophy, FaPlayCircle } from "react-icons/fa";

const Challenges: React.FC = () => {
  return (
    <Layout title="Challenges" description="Participate in coding challenges to earn points and rank up.">
      <section className="relative bg-gray-100 dark:bg-gray-900 py-16 px-8">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Coding Challenges
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Push your coding limits by participating in timed coding challenges.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Challenge 1 Card */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Challenge 1: Data structures-1
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Solve the problem within 30 minutes to earn points and rank up.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <FaClock className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Time Limit: 30 min</span>
              </div>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
                onClick={() => window.location.href = "/algo/challenges/challenge1"}
              >
                <FaPlayCircle className="w-5 h-5" />
                <span>Start Challenge</span>
              </button>
            </motion.div>

            {/* Challenge 2 Card */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Challenge 2: Data structures-2
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Solve this challenging problem within 30 minutes to earn even more points!
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <FaClock className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Time Limit: 30 min</span>
              </div>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
                onClick={() => window.location.href = "/algo/challenges/challenge2"}
              >
                <FaPlayCircle className="w-5 h-5" />
                <span>Start Challenge</span>
              </button>
            </motion.div>
            {/* Challenge 3 Card */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Challenge 3: Advance Data Structures
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Solve this challenging problem within 30 minutes to earn even more points!
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <FaClock className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">Time Limit: 60 min</span>
              </div>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
                onClick={() => window.location.href = "/algo/challenges/challenge3"}
              >
                <FaPlayCircle className="w-5 h-5" />
                <span>Start Challenge</span>
              </button>
            </motion.div>

            {/* More Challenges can be added here */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Challenges;
