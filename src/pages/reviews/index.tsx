import React from "react";
import Layout from "@theme/Layout";
import { testimonials } from "../../data/testimonialsData";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import Link from "@docusaurus/Link";

const Reviews: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 70, damping: 18 } 
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.215, 0.610, 0.355, 1.000],
      },
    },
  };

  return (
    <Layout
      title="User Reviews & Testimonials"
      description="Discover what our users say about their experience with Algo. Read real success stories and feedback from developers, students, and engineers."
    >
      <div className="min-h-screen bg-slate-50/50 dark:bg-[#0e0e10] relative overflow-hidden transition-colors duration-300">
        
        {/* Advanced Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] h-96 w-96 rounded-full bg-[var(--ifm-color-primary)] blur-[140px] mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute top-[10%] right-[20%] h-96 w-96 rounded-full bg-indigo-500 blur-[140px] mix-blend-multiply dark:mix-blend-screen" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-24 pb-12 px-2 mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-[var(--ifm-color-primary)] border border-blue-100 dark:border-blue-900/50 mb-4">
              Community Voices
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.15]">
              What Our <span className="relative inline-block text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent py-4">Users Say</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-zinc-400 mx-auto font-medium leading-relaxed">
              Discover how developers, students, and open-source contributors optimize their theoretical engineering implementations using our codebase.
            </p>
          </motion.div>
        </section>

        {/* Reviews Grid */}
        <section className="max-w-6xl mx-auto px-4 py-12 relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                className="relative h-full group"
              >
                <div className="
                  relative h-full flex flex-col justify-between
                  bg-white dark:bg-zinc-900/40
                  backdrop-blur-md rounded-2xl p-6 sm:p-8
                  border border-slate-200/60 dark:border-zinc-800/80
                  shadow-sm group-hover:shadow-xl group-hover:border-slate-300 dark:group-hover:border-zinc-700/80
                  transition-all duration-300 ease-out
                ">
                  <div>
                    {/* Top Meta Details */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--ifm-color-primary)] to-indigo-500 opacity-25 blur-sm transition-opacity group-hover:opacity-40" />
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          loading="lazy"
                          className="relative w-14 h-14 rounded-full object-cover border-2 border-white dark:border-zinc-900 shadow-sm"
                        />
                      </div>
                      <FaQuoteLeft className="text-3xl text-slate-200 dark:text-zinc-800 transition-colors group-hover:text-blue-500/20" />
                    </div>

                    {/* Feedback Text */}
                    <p className="text-[15px] sm:text-base text-slate-700 dark:text-zinc-300 font-medium leading-relaxed mb-6">
                      "{testimonial.feedback}"
                    </p>
                  </div>

                  {/* User Badge Footer */}
                  <div className="border-t border-slate-100 dark:border-zinc-800/80 pt-4 mt-auto">
                    <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-0.5">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--ifm-color-primary)] dark:text-blue-400 m-0">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Call to Action Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative bg-white dark:bg-zinc-900/30 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-zinc-800/80 shadow-xl overflow-hidden"
          >
            {/* CTA Background Highlight Accent */}
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[var(--ifm-color-primary)]/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 mb-8 font-medium leading-relaxed">
                Join thousands of developers who are mastering algorithms and data structures with Algo.
              </p>
              <Link
                to="/docs/"
                className="inline-flex items-center gap-2 bg-[var(--ifm-color-primary)] hover:bg-[var(--ifm-color-primary-dark)] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 no-underline group/btn text-base"
              >
                <span>Get Started Now</span>
                <FaArrowRight className="text-sm transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default Reviews;