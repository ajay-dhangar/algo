import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCompass } from "react-icons/fa";
import Link from "@docusaurus/Link";
import LoginModal from "./LoginModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const CallToActionSection: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-gradient-to-br from-indigo-700 via-blue-600 to-indigo-800 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950">
      
      {/* Premium Visual Layering: High-Tech Mesh Pattern Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Cinematic Fluid Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-400/20 dark:bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Subtle Dynamic Context Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-indigo-500/10 border border-white/20 dark:border-indigo-500/20 backdrop-blur-md mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-sky-100 dark:text-indigo-300 tracking-wide uppercase">
              Next Cohort Open
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6"
          >
            Ready to Master <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-200 via-white to-indigo-100 bg-clip-text text-transparent">
              Production Algorithms?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-indigo-100/90 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Join thousands of modern developers leveling up their structural engineering skills with execution sandboxes, clean roadmaps, and peer code reviews.
          </motion.p>

          {/* High-Contrast Actions Cluster */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            {/* Primary Action Button */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="
                group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 
                px-8 py-4 rounded-2xl font-bold text-base md:text-lg text-indigo-900 bg-white 
                shadow-xl shadow-indigo-900/20 hover:shadow-2xl hover:shadow-indigo-900/30
                hover:bg-indigo-50 transition-all duration-200 active:scale-[0.98]
              "
            >
              <span>Get Started Now</span>
              <FaArrowRight className="h-4 w-4 text-indigo-700 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Secondary Action Button */}
            <Link
              to="#"
              className="
                group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 
                px-8 py-4 rounded-2xl font-semibold text-base md:text-lg text-white 
                border border-white/20 hover:border-white/40 backdrop-blur-md bg-white/5 
                hover:bg-white/10 transition-all duration-200 active:scale-[0.98] no-underline hover:no-underline
              "
            >
              <FaCompass className="h-4 w-4 text-sky-200 transition-transform duration-200 group-hover:rotate-12" />
              <span>Explore Platform</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* State Controlled Modal Window */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </section>
  );
};

export default CallToActionSection;