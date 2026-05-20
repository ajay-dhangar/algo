import React from "react";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { default as Link } from "@docusaurus/Link"; // Fixed import statement for Link

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 px-8 noise-bg">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Data Structures & Algorithms
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Learn, Implement, and Contribute to Open Source Algorithms. Build your
          understanding from the basics to advanced topics.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          
          <Link
            to="/docs"
            className="group relative overflow-hidden flex items-center px-6 py-3 text-lg font-medium text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-blue-500/50 hover:shadow-2xl hover:text-gray-100 active:scale-95">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 transition duration-300 group-hover:from-blue-800 group-hover:via-blue-700 group-hover:to-cyan-600"></span>
            <span className="relative z-10 flex items-center">
              Explore Algorithms
            <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </Link>

          <Link
            to="https://github.com/ajay-dhangar/algo"
            className="group relative overflow-hidden flex items-center px-6 py-3 text-lg font-medium text-blue-600 dark:text-white border-2 border-blue-600 dark:border-white rounded-lg transition-all duration-300 ease-in-out hover:scale-110 hover:text-gray-200 hover:shadow-xl hover:shadow-gray-500/40 active:scale-95"
          >
            <span className="absolute inset-0 bg-blue-600 dark:bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

            <span className="relative z-10 flex items-center group-hover:text-white dark:group-hover:text-blue-600 transition-colors duration-300">
              View on GitHub
              <FaGithub className="ml-2 transition-transform duration-300 group-hover:rotate-18 group-hover:scale-125" />
            </span>
          </Link>

        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-10 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </section>
  );
};

export default HeroSection;