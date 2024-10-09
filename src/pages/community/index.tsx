import Layout from "@theme/Layout";
import React from "react";
import { motion } from "framer-motion";
import { FaComment, FaUsers } from "react-icons/fa";

const Community: React.FC = () => {
  return (
    <Layout
      title="Community"
      description="Join the community to engage with fellow learners."
    >
      <section className="relative bg-gray-100 dark:bg-gray-900 py-16 px-8">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join the Community
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Engage with fellow learners, share ideas, and help each other
            improve.
          </motion.p>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaUsers className="text-blue-600 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Become a part of our growing community!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Start discussions, ask questions, and collaborate with others.
            </p>
            <button className="mt-4 border-none px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-white bg-blue-600">
              Join the Forum
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
