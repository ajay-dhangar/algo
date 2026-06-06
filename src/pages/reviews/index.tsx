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
