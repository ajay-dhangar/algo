import React, { useEffect, useState } from "react";
import { FaGithub, FaArrowRight, FaChevronDown, FaStar, FaCodeBranch } from "react-icons/fa";
import { default as Link } from "@docusaurus/Link";

const HeroSection = () => {
  // Safe static local fallbacks used while the API is loading
  const [stats, setStats] = useState({ stars: 100, forks: 300 });

  useEffect(() => {
    // Corrected target path pointing directly to the official GitHub Developer REST API endpoint
    fetch("https://github.com/ajay-dhangar/algo")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not OK");
        return res.json();
      })
      .then((data) => {
        if (data.stargazers_count !== undefined && data.forks_count !== undefined) {
          setStats({
            stars: data.stargazers_count,
            forks: data.forks_count,
          });
        }
      })
      .catch((err) => console.error("Error fetching live repository metrics:", err));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 px-8 noise-bg bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl text-center z-10">

        {/* Fully Modern Combined Animated Stats & Invite Badge with Animated Gradient Border */}
        <div className="relative inline-flex p-[1.5px] rounded-full overflow-hidden mb-8 group shadow-lg shadow-blue-500/10 dark:shadow-cyan-500/5">

          {/* The Spinning Gradient Background Layer (Acts as the border) */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_40%,#3b82f6_70%,#06b6d4_85%,transparent_100%)] dark:bg-[conic-gradient(from_0deg,transparent_40%,#3b82f6_60%,#a855f7_80%,transparent_100%)] animate-[spin_4s_linear_infinite]" />

          {/* Inner Content Container */}
          <div className="relative inline-flex items-center gap-2 p-1 rounded-full bg-white dark:bg-slate-950 backdrop-blur-xl text-xs font-semibold tracking-wide">

            {/* GitHub Master Branding Sub-badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/5 dark:bg-white/5 border border-slate-900/5 dark:border-white/5 text-slate-800 dark:text-slate-200 shadow-sm">
              <FaGithub className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
              <span>Algo OSS</span>
            </div>

            {/* Star Counter Sub-badge with Hover Call to Action */}
            <Link
              to="https://github.com/ajay-dhangar/algo"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-md text-slate-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-200 hover:scale-105"
              title="Click to star this project!"
            >
              <FaStar className="text-amber-500 dark:text-amber-400 animate-[pulse_2s_infinite]" />
              <span className="font-bold tabular-nums">{stats.stars.toLocaleString()}+</span>
              <span className="text-[10px] uppercase tracking-wider font-medium hidden sm:inline ml-0.5">Star Us</span>
            </Link>

            {/* Decorative Divider */}
            <span className="h-3.5 w-[1px] bg-slate-200 dark:bg-slate-800" />

            {/* Fork Counter Sub-badge */}
            <Link
              to="https://github.com/ajay-dhangar/algo/forks"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-md text-slate-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105 pr-3"
            >
              <FaCodeBranch className="text-blue-500 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="font-bold tabular-nums">{stats.forks.toLocaleString()}+</span>
            </Link>

          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Data Structures & Algorithms
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Learn, implement, and contribute to production-grade data structures and algorithms.
          Accelerate your computer science proficiency from fundamental roots to production execution.
        </p>

        {/* CTA Buttons Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <Link
            to="/docs"
            className="group relative overflow-hidden flex items-center px-6 py-3 text-lg font-medium text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-blue-500/50 hover:shadow-2xl active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 transition duration-300 group-hover:from-blue-800 group-hover:via-blue-700 group-hover:to-cyan-600"></span>
            <span className="relative z-10 flex items-center">
              Explore Algorithms
              <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </Link>

          <Link
            to="https://github.com/ajay-dhangar/algo"
            className="group relative overflow-hidden flex items-center px-6 py-3 text-lg font-medium text-blue-600 dark:text-white border-2 border-blue-600 dark:border-white rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:text-gray-200 hover:shadow-xl hover:shadow-gray-500/40 active:scale-95"
          >
            <span className="absolute inset-0 bg-blue-600 dark:bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10 flex items-center group-hover:text-white dark:group-hover:text-blue-600 transition-colors duration-300">
              View on GitHub
              <FaGithub className="ml-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </span>
          </Link>
        </div>

      </div>

      {/* Ambient Lighting Backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-10 w-72 h-72 bg-blue-500 opacity-20 dark:opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-pink-500 opacity-20 dark:opacity-30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Smooth Navigation Scroll Button */}
      <button
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer text-slate-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors duration-300 z-20 bg-transparent border-0 p-0 focus:outline-none"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        aria-label="Scroll down"
        title="Scroll down"
      >
        <FaChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
