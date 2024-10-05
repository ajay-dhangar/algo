import Link from '@docusaurus/Link';
import React from 'react';
import { FaGithub, FaCodeBranch, FaFileCode } from 'react-icons/fa';

const ContributeSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Want to <span className="text-indigo-500 dark:text-yellow-400">Contribute?</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Join us in building an amazing open-source project. Whether you're a seasoned developer or a beginner, we welcome all contributions. Here's how you can get involved.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Fork the Repository */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
            <FaGithub className="text-4xl text-indigo-500 dark:text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Fork the Repository</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start by forking the repository to your GitHub account. This will allow you to work on your own copy of the project.
            </p>
          </div>

          {/* Create a New Branch */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
            <FaCodeBranch className="text-4xl text-indigo-500 dark:text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Create a New Branch</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Once forked, create a new branch for your feature or bug fix. This ensures that your changes can be reviewed independently.
            </p>
          </div>

          {/* Submit a Pull Request */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
            <FaFileCode className="text-4xl text-indigo-500 dark:text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Submit a Pull Request</h3>
            <p className="text-gray-600 dark:text-gray-400">
              After making your changes, submit a pull request. Our team will review your contribution and get back to you soon.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="https://github.com/ajay-dhangar/algo"
            className="inline-block px-8 py-4 bg-indigo-500 dark:bg-yellow-400 hover:text-white text-white dark:text-gray-900 rounded-full font-semibold transition hover:bg-indigo-600 dark:hover:bg-yellow-500"
          >
            Contribute on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContributeSection;