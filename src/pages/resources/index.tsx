import React from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";

const resources = [
  { id: 1, title: "Introduction to Algorithms by CLRS", type: "Book", description: "One of the most comprehensive algorithm books.", link: "#" },
  { id: 2, title: "LeetCode", type: "Website", description: "A platform for practicing algorithms with real problems.", link: "#" },
  { id: 3, title: "Coursera: Algorithmic Toolbox", type: "Course", description: "An introductory course for algorithms.", link: "#" },
  // Add more resources
];

const Resources: React.FC = () => {
  return (
    <Layout title="Resources" description="Access resources to learn algorithms and data structures">
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-8">
      <div className="container mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Resources
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {resource.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
              <a
                href={resource.link}
                className="inline-block border-none text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 bg-blue-600 dark:bg-blue-500 hover:text-white"
              >
                Access
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </Layout>
  );
};

export default Resources;
