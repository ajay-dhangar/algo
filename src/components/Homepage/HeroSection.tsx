import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center py-16 px-8">
      <div className="max-w-4xl text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Master Algorithms and Data Structures
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Learn, Implement, and Contribute to Open Source Algorithms. Build your
          understanding from the basics to advanced topics.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="https://ajay-dhangar.github.io/algo/docs/"
            className="px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out"
          >
            Explore Algorithms
          </a>
          <a
            href="https://github.com/ajay-dhangar/algo"
            className="px-6 py-3 text-lg font-medium text-blue-600 dark:text-white border-2 border-blue-600 dark:border-white rounded-lg hover:bg-blue-600 dark:hover:bg-white hover:text-white dark:hover:text-blue-600 transition duration-300 ease-in-out"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* Background Circles for Modern Design */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-10 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
