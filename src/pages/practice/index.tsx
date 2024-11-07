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
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
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
            <button className="mt-4 border-none text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 bg-blue-600">
              <FaPlayCircle className="w-5 h-5" />
              <span>Start Solving</span>
            </button>
          </motion.div>

          {/* Add more problems as needed */}

          <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Problem 2: Add Two Numbers
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order.
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
        <FaPlayCircle className="w-5 h-5" />
        <span>Start Solving</span>
      </button>
    </motion.div>

          <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Problem 4: Median of Two Sorted Arrays
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Given two sorted arrays, find the median of the two sorted arrays.
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
        <FaPlayCircle className="w-5 h-5" />
        <span>Start Solving</span>
      </button>
    </motion.div>

           <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Problem 5: Longest Palindromic Substring
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Given a string, find the longest palindromic substring in it.
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
        <FaPlayCircle className="w-5 h-5" />
        <span>Start Solving</span>
      </button>
    </motion.div>

          <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Problem 6: Zigzag Conversion
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Convert a string to a zigzag pattern on a given number of rows and read line by line.
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
        <FaPlayCircle className="w-5 h-5" />
        <span>Start Solving</span>
      </button>
    </motion.div>

          <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Problem 7: Reverse Integer
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Given a 32-bit signed integer, reverse its digits.
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
        <FaPlayCircle className="w-5 h-5" />
        <span>Start Solving</span>
      </button>
    </motion.div>

          <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Problem 8: String to Integer (atoi)
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Implement the `atoi` function, which converts a string to an integer.
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
        <FaPlayCircle className="w-5 h-5" />
        <span>Start Solving</span>
      </button>
    </motion.div>

           <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Problem 9: Palindrome Number
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
        <FaPlayCircle className="w-5 h-5" />
        <span>Start Solving</span>
      </button>
    </motion.div>

          <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Problem 10: Regular Expression Matching
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Implement regular expression matching with support for `.` and `*`.
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
        <FaPlayCircle className="w-5 h-5" />
        <span>Start Solving</span>
      </button>
    </motion.div>

    <motion.div
  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
  whileHover={{ scale: 1.05 }}
  transition={{ type: 'spring', stiffness: 200 }}
>
  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
    Problem 11: Rotate List
  </h3>
  <p className="text-gray-500 dark:text-gray-400 mt-2">
    Given the head of a linked list and an integer k, rotate the list to the right by k places.
  </p>
  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none">
    <FaPlayCircle className="w-5 h-5" />
    <span>Start Solving</span>
  </button>
</motion.div>
          
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default Practice;
