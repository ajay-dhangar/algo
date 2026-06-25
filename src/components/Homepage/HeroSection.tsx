import React from "react";
import { FaGithub, FaArrowRight, FaChevronDown } from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import { default as Link } from "@docusaurus/Link"; // Fixed import statement for Link

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
  
  {/* Aurora Background */}
  <div className="absolute inset-0">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/30 blur-[150px] rounded-full animate-pulse" />
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/30 blur-[150px] rounded-full animate-pulse" />
  </div>

  {/* Grid */}
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }}
  />

  <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

    {/* Badge */}
    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
      <FiCode className="text-cyan-400" />
      <span className="text-sm text-white/80">
        Trusted by 10,000+ Developers
      </span>
    </div>

    {/* Heading */}
    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
      <span className="text-white">
        Master
      </span>
      <br />
      <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
        Algorithms
      </span>
    </h1>

    {/* Subtitle */}
    <p className="max-w-3xl mx-auto mt-8 text-xl text-gray-400 leading-relaxed">
      Learn data structures, algorithms, system design, and problem solving
      through production-ready implementations crafted for modern engineers.
    </p>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">

      <Link
        to="/docs"
        className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg shadow-[0_20px_60px_rgba(59,130,246,0.4)] hover:scale-105 transition"
      >
        <span className="flex items-center">
          Start Learning
          <FaArrowRight className="ml-3 group-hover:translate-x-2 transition" />
        </span>
      </Link>

      <a
        href="https://github.com/ajay-dhangar/algo"
        target="_blank"
        rel="noreferrer"
        className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 transition"
      >
        <span className="flex items-center">
          <FaGithub className="mr-3" />
          Star on GitHub
        </span>
      </a>

    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
        <h3 className="text-4xl font-bold text-white">500+</h3>
        <p className="text-gray-400 mt-2">Algorithms</p>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
        <h3 className="text-4xl font-bold text-white">40+</h3>
        <p className="text-gray-400 mt-2">Topics Covered</p>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
        <h3 className="text-4xl font-bold text-white">10k+</h3>
        <p className="text-gray-400 mt-2">Developers</p>
      </div>

    </div>

  </div>

  {/* Scroll */}
  <button
    className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hover:text-white"
    onClick={() =>
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      })
    }
  >
    <FaChevronDown size={30} />
  </button>

</section>
  );
};

export default HeroSection;
