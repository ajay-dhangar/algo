import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaDatabase,
  FaUsers,
  FaGithub,
  FaLock,
} from "react-icons/fa";

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout
      title="Privacy Policy"
      description="Learn how Algo collects, uses, and protects your data."
    >
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <section className="noise-bg py-16 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mt-8 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Privacy{" "}
            <span className="text-blue-600 dark:text-yellow-400">Policy</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4 leading-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            At Algo, your privacy matters to us. This Privacy Policy explains
            how we collect, use, and safeguard information while providing an
            open-source educational platform for developers worldwide.
          </motion.p>
        </section>

        <section className="container mx-auto py-12 px-6 md:px-12">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <FaShieldAlt className="text-blue-600 dark:text-yellow-400 text-3xl" />

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                About Algo
              </h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-8">
              Algo is an open-source educational platform built using
              Docusaurus, React, and MDX. Our mission is to help developers
              learn algorithms, improve problem-solving skills, and contribute
              to collaborative open-source projects in multiple programming
              languages.
            </p>
          </motion.div>
        </section>

        <section className="container mx-auto py-6 px-6 md:px-12">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <FaDatabase className="text-blue-600 dark:text-yellow-400 text-3xl" />

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Information We Collect
              </h2>
            </div>

            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-300 list-disc pl-6">
              <li>Public GitHub profile information and contribution data</li>

              <li>
                Community discussions, comments, and contribution activity
              </li>

              <li>Optional contact details shared through forms or issues</li>

              <li>Analytics and usage data to improve platform experience</li>

              <li>Browser cookies and session preferences</li>
            </ul>
          </motion.div>
        </section>

        <section className="container mx-auto py-6 px-6 md:px-12">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <FaUsers className="text-blue-600 dark:text-yellow-400 text-3xl" />

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                How We Use Your Data
              </h2>
            </div>

            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-300 list-disc pl-6">
              <li>Improve educational content and algorithm resources</li>

              <li>Enhance community collaboration and discussions</li>

              <li>Recognize and highlight contributor achievements</li>

              <li>Maintain website functionality and platform security</li>

              <li>Analyze performance and optimize user experience</li>
            </ul>
          </motion.div>
        </section>

        <section className="container mx-auto py-6 px-6 md:px-12">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <FaGithub className="text-blue-600 dark:text-yellow-400 text-3xl" />

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Open Source & Community
              </h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-8">
              Algo is built around transparency and collaboration. Most
              contributions, pull requests, issues, and discussions are publicly
              visible on GitHub as part of the open-source development process.
              Contributors are encouraged to avoid sharing sensitive personal
              information publicly.
            </p>
          </motion.div>
        </section>

        <section className="container mx-auto py-6 px-6 md:px-12">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <FaLock className="text-blue-600 dark:text-yellow-400 text-3xl" />

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Security & Protection
              </h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-8">
              We do not collect sensitive financial information or passwords
              directly. Algo relies on trusted third-party platforms such as
              GitHub for authentication, collaboration, and contribution
              workflows. We continuously work to maintain a safe and secure
              environment for all contributors and learners.
            </p>
          </motion.div>
        </section>

        <section className="container mx-auto py-12 px-6 md:px-12 text-center">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Contact & Support
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-8">
              If you have questions regarding this Privacy Policy, feel free to
              reach out through our GitHub repository or community discussions.
            </p>

            <a
              href="https://github.com/ajay-dhangar/algo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 dark:bg-yellow-400 text-white dark:text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-yellow-500 transition duration-200"
            >
              Visit GitHub Repository
            </a>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
