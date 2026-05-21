import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginModal from "./LoginModal";

const CallToActionSection: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-700 via-indigo-700 to-cyan-600 dark:from-gray-950 dark:via-blue-950 dark:to-cyan-950">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />

      {/* Floating Shapes */}
      <div className="absolute top-20 left-20 w-16 h-16 border border-white/20 rounded-full animate-pulse" />
      <div className="absolute bottom-16 right-24 w-24 h-24 border border-white/10 rounded-2xl rotate-12 animate-bounce" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Ready to Master Algorithms?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          Join thousands of learners improving their coding skills with
          interactive challenges, curated roadmaps, and expert guidance.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Primary Button */}
          <motion.a
            href="#"
            whileHover={{
              scale: 1.08,
              y: -4,
            }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-10 py-4 font-semibold text-lg text-blue-700 bg-white shadow-2xl transition-all duration-300"
          >
            <span className="relative z-10"
              onClick={() => setIsLoginOpen(true)}
            >
              Get Started</span>
       
          </motion.a>
          <motion.a
            href="#"
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{ scale: 0.96 }}
            className="px-10 py-4 rounded-2xl border border-white/40 backdrop-blur-md bg-white/10 text-white font-semibold text-lg shadow-lg hover:bg-white hover:text-blue-700 transition-all duration-300"
          >
            Explore Features
          </motion.a>
        </motion.div>
      </div>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </section>
  );
};

export default CallToActionSection;