import React from "react";
import { LayoutGroup, motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import Layout from "@theme/Layout";

const Quizes: React.FC = () => {
  return (
    <Layout title="Quizzes" description="Practice your coding skills with quizzes on data structures and algorithms.">
    <section className="relative bg-gray-100 dark:bg-gray-900 py-16 px-8">
      <div className="container mx-auto text-center max-w-4xl">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Test Your Data Structures Skills
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Sharpen your data structures knowledge with quizzes from basic to advanced topics.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Array Quiz Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Quiz on Arrays
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Test your knowledge on array operations and algorithms.
            </p>
            <button
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
  onClick={() => window.location.href = "/algo/quizes/arrays"}
>
  <FaPlayCircle className="w-5 h-5" />
  <span>Start Quiz</span>
</button>
          </motion.div>

          {/* Stack Quiz Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Quiz on Stacks
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Evaluate your understanding of stack operations and applications.
            </p>
            <button
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
  onClick={() => window.location.href = "/algo/quizes/stack"}
>
  <FaPlayCircle className="w-5 h-5" />
  <span>Start Quiz</span>
</button>
          </motion.div>

          {/* Queue Quiz Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Quiz on Queues
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Challenge your knowledge on queue implementations and their use cases.
            </p>
            

             <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
             onClick={() => window.location.href = "/algo/quizes/queues"}>
              <FaPlayCircle className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>

          </motion.div>

          {/* Binary Tree Quiz Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Quiz on Binary Trees
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Test your understanding of Binary Tree structures and traversals.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
            onClick={() => window.location.href = "/algo/quizes/BinaryTree"}>
              <FaPlayCircle className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>
          </motion.div>

          {/* Binary Search Tree Quiz Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Quiz on Binary Search Trees (BST)
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Evaluate your knowledge of Binary Search Tree properties and operations.
            </p>
            <button className="mt-4 border-none text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 bg-blue-600"
            onClick={() => window.location.href = "/algo/quizes/BinarySearchTree"}>
              <FaPlayCircle className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>
          </motion.div>

          {/* AVL Tree Quiz Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Quiz on AVL Trees
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Test your skills on the balancing properties of AVL Trees.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
            onClick={() => window.location.href = "/algo/quizes/AVLtree"}>
              <FaPlayCircle className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>
          </motion.div>

          {/* Red-Black Tree Quiz Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Quiz on Red-Black Trees
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Challenge your understanding of the properties and algorithms of Red-Black Trees.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
            onClick={() => window.location.href = "/algo/quizes/RedBlackTree"}>
              <FaPlayCircle className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>
          </motion.div>

          {/* B-Tree Quiz Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Quiz on B-Trees
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Test your understanding of B-Tree properties and their applications.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none"
            onClick={() => window.location.href = "/algo/quizes/BTree"}>
              <FaPlayCircle className="w-5 h-5" />
              <span>Start Quiz</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default Quizes;

