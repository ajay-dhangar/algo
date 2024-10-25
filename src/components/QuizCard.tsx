import React from "react";
import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import Link from "@docusaurus/Link";

interface QuizCardProps {
  title: string;
  description: string;
  link: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ title, description, link }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-left hover:shadow-xl transform transition-transform duration-300"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 mt-2">{description}</p>
    <Link
      to={link}
      className="mt-4 inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 hover:text-gray-100"
    >
      <FaPlayCircle className="w-5 h-5" />
      <span>See Solutions</span>
    </Link>
  </motion.div>
);

export default QuizCard;