import React from "react";

const ContributeSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12">
          Contribute to Algo
        </h2>

        {/* Contribution Pitch */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join us in making algorithmic learning accessible for everyone. We
          welcome contributions of all types—from bug fixes and feature
          additions to creating new educational content. Every contribution
          helps improve Algo and the learning experience for others.
        </p>

        {/* Call to Action Button */}
        <div className="flex justify-center">
          <a
            href="https://github.com/ajay-dhangar/algo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg transition duration-300"
          >
            Start Contributing
          </a>
        </div>

        {/* Contribution Steps */}
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Step 1 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Fork the Repository
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Start by forking the repository to your own GitHub account. This
              allows you to make changes without affecting the original project.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Clone and Setup
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Clone the forked repo locally and install the necessary
              dependencies using{" "}
              <span className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">
                npm install
              </span>
              . Make sure everything is set up for local development.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Add Features or Fix Bugs
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Work on a new feature, fix bugs, or improve documentation. Follow
              the project’s contribution guidelines to ensure a smooth process.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Commit and Push
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              After making your changes, commit your code with meaningful
              messages. Push your changes to your forked repo.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Submit a Pull Request
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Open a pull request to the main repository. Make sure to explain
              your changes thoroughly and link any related issues.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Collaborate and Review
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discuss and collaborate with maintainers to get your pull request
              reviewed. You may need to make some adjustments based on feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributeSection;
