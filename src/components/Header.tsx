import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <div className="container mx-auto text-center max-w-4xl">
    <motion.h1
      className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h1>
    <motion.p
      className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      {description}
    </motion.p>
  </div>
);

export default SectionHeader;
