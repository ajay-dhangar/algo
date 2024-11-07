import React from "react";
import { motion } from "framer-motion";

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-16 bg-blue-600 dark:bg-blue-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Master Algorithms?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Join our community and elevate your skills with comprehensive resources and support!
        </motion.p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <motion.a
            href="#"
            className="px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Sign Up Now
          </motion.a>
          <motion.a
            href="#"
            className="px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-lg transition duration-300 ease-in-out hover:bg-white hover:text-blue-600"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Explore Features
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;