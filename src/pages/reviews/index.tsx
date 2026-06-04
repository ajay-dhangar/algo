import React from "react";
import Layout from "@theme/Layout";
import { testimonials } from "../../data/testimonialsData";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import Link from "@docusaurus/Link";

const Reviews: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Layout
      title="User Reviews & Testimonials"
      description="Discover what our users say about their experience with Algo. Read real success stories and feedback from developers, students, and engineers."
    >
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-gray-950 dark:via-gray-900/30 dark:to-gray-950">
        {/* Ambient Background Glows */}
        <div className="absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-[var(--ifm-color-primary)]/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px]" />

        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              What Our <span className="text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">Users Say</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 leading-relaxed">
              Discover how developers, students, and open-source contributors optimize their theoretical engineering implementations using our codebase.
            </p>
          </motion.div>
        </section>

        {/* Reviews Grid */}
        <section className="max-w-6xl mx-auto px-4 py-20 relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative h-full flex flex-col"
              >
                <div className="
                  relative h-full flex flex-col
                  bg-white dark:bg-gray-900/40
                  backdrop-blur-md rounded-3xl p-8
                  border border-slate-200/80 dark:border-slate-800/80
                  shadow-xl shadow-slate-100/40 dark:shadow-none
                  transition-all duration-300 hover:shadow-2xl hover:dark:shadow-none
                "
                >
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-5xl text-slate-100/70 dark:text-gray-800/40 mb-4" />

                  {/* User Image */}
                  <div className="mb-6">
                    <div className="relative group/avatar">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--ifm-color-primary)] to-indigo-500 opacity-20 blur-md" />
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        loading="lazy"
                        className="relative w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-md"
                      />
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <p className="text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic mb-6 flex-grow">
                    "{testimonial.feedback}"
                  </p>

                  {/* User Info */}
                  <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm font-semibold text-[var(--ifm-color-primary)]">
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
            className="bg-white dark:bg-gray-900/40 backdrop-blur-md rounded-3xl p-12 border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-400 mb-8">
              Join thousands of developers who are mastering algorithms and data structures with Algo.
            </p>
            <Link
              to="/docs/"
              className="inline-block bg-[var(--ifm-color-primary)] hover:bg-[var(--ifm-color-primary-dark)] text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg no-underline"
            >
              Get Started Now
            </Link>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default Reviews;
