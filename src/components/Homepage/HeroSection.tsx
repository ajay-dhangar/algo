import React from "react";
import { FaGithub, FaArrowRight, FaChevronDown } from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import { default as Link } from "@docusaurus/Link"; // Fixed import statement for Link

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 px-8 noise-bg">
      <div className="max-w-4xl text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
          <FiCode className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
          <span>v2.0 Architecture</span>
          <span className="h-3 w-[1px] bg-slate-200 dark:bg-gray-800" />
          <span className="text-blue-600 dark:text-blue-400">Open Source</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Data Structures & Algorithms
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Learn, implement, and contribute to production-grade data structures and algorithms. 
          Accelerate your computer science proficiency from fundamental roots to production execution.
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

      <button 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer text-slate-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors duration-300 z-20 bg-transparent border-0 p-0 focus:outline-none"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll down"
        title="Scroll down"
      >
        <FaChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
