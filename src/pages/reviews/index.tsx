<<<<<<< HEAD
import React, { useState } from "react";
import { testimonials } from "../../data/testimonialsData";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const ReviewsPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: 5,
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For now: just log (later connect backend/Firebase/API)
    console.log("New Review:", form);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        role: "",
        rating: 5,
        feedback: "",
      });
    }, 2000);
  };

  return (
    <main className="relative py-24 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-gray-950 dark:via-gray-900/30 dark:to-gray-950 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 right-0 -z-10 h-96 w-96 rounded-full bg-[var(--ifm-color-primary)]/5 blur-[120px]" />
      <div className="absolute bottom-20 left-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px]" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            User Reviews & Testimonials
          </h1>
          <p className="text-slate-600 dark:text-gray-400">
            Share your experience and see what others say.
          </p>
        </div>

        {/* ⭐ REVIEW FORM */}
        <div className="mb-20 bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Write a Review
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white"
            />

            {/* Role */}
            <input
              type="text"
              name="role"
              placeholder="Your Role (Developer, Student, etc.)"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white"
            />

            {/* Rating */}
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            {/* Feedback */}
            <textarea
              name="feedback"
              placeholder="Write your experience..."
              value={form.feedback}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white"
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Submit Review
            </button>

            {/* Success Message */}
            {submitted && (
              <p className="text-green-500 text-center font-medium">
                ✅ Review submitted successfully!
              </p>
            )}
          </form>
        </div>

        {/* ⭐ EXISTING REVIEWS */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl"
            >
              <FaQuoteLeft className="absolute top-6 right-6 text-5xl text-slate-100 dark:text-gray-800" />

              {/* Rating */}
              <div className="flex gap-1 text-yellow-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Feedback */}
              <p className="italic text-slate-700 dark:text-slate-300 mb-6">
                "{t.feedback}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-sm text-[var(--ifm-color-primary)]">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReviewsPage;
=======
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
>>>>>>> upstream/main
