import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaPlayCircle } from "react-icons/fa";
import Link from "@docusaurus/Link";

interface ChallengeCardProps {
  title: string;
  description: string;
  timeLimit: string;
  link: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, description, timeLimit, link }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        {description}
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <FaClock className="text-gray-500 dark:text-gray-400" />
        <span className="text-gray-700 dark:text-gray-300">Time Limit: {timeLimit}</span>
      </div>
      <Link
        to={link}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-300 border-none hover:text-gray-100"
      >
        <FaPlayCircle className="w-5 h-5" />
        <span>Start Challenge</span>
      </Link>
    </motion.div>
  );
};

export default ChallengeCard;