import React from "react";
import Layout from "@theme/Layout";
import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";
import { testimonials } from "../../data/testimonialsData";
import { 
  FaStar, 
  FaQuoteLeft, 
  FaCommentMedical, 
  FaUsers, 
  FaAward, 
  FaHeart,
  FaTerminal
} from "react-icons/fa";

const ReviewsGiscus: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      id="giscus-reviews"
      repo="ajay-dhangar/algo"
      repoId="R_kgDOK224hg"
      category="Reviews & Feedback"
      categoryId="DIC_kwDOK224hs4C-sTM"
      mapping="pathname"
      term="Welcome to Algo Discussions! Please feel free to ask questions, share ideas, and discuss anything related to Algo."
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={colorMode}
      lang="en"
      loading="lazy"
    />
  );
};

const ReviewsPage: React.FC = () => {
  const forumZoneRef = React.useRef<HTMLDivElement>(null);
  const scrollToDiscussion = () => {
    forumZoneRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <div id="write-review" className="mb-20 bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl max-w-3xl mx-auto">
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
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <span className="flex items-center gap-2 justify-center">
                <FaTerminal className="w-4 h-4 animate-pulse" /> Initialize Review Input
              </span>
            </button>
          </div>

          {/* HUD Metric Analytics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto mb-24 p-2 bg-white/80 dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            <div className="text-center p-5 relative group overflow-hidden rounded-xl hover:bg-slate-100/50 dark:hover:bg-gray-800/30 transition-all duration-300">
              <div className="text-3xl font-black text-[var(--ifm-color-primary)] dark:text-cyan-400 tracking-square">5.0 ★</div>
              <div className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-1">Accuracy Matrix</div>
            </div>
            <div className="text-center p-5 border-t md:border-t-0 md:border-l border-slate-100 dark:border-gray-800/60 relative group overflow-hidden rounded-xl hover:bg-slate-100/50 dark:hover:bg-gray-800/30 transition-all duration-300">
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-square">10K+</div>
              <div className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-1">Active Nodes</div>
            </div>
            <div className="text-center p-5 border-l border-slate-100 dark:border-gray-800/60 relative group overflow-hidden rounded-xl hover:bg-slate-100/50 dark:hover:bg-gray-800/30 transition-all duration-300">
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-square">100%</div>
              <div className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-1">Decentralized</div>
            </div>
            <div className="text-center p-5 border-t md:border-t-0 border-l border-slate-100 dark:border-gray-800/60 relative group overflow-hidden rounded-xl hover:bg-slate-100/50 dark:hover:bg-gray-800/30 transition-all duration-300">
              <div className="text-3xl font-black text-amber-500 dark:text-yellow-400 tracking-square">99.4</div>
              <div className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mt-1">Satisfaction index</div>
            </div>
          </div>

          {/* High-Interactive Gaming Card Grid Layout */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-gray-800/80 rounded-2xl p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 backdrop-blur-md flex flex-col justify-between overflow-hidden"
              >
                {/* Neon Top Laser-line Accent on Card Hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--ifm-color-primary)] via-fuchsia-500 to-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                
                {/* Subtle Geometric Overlay */}
                <div className="absolute -bottom-10 -right-10 text-9xl font-black text-slate-50 dark:text-gray-900/10 select-none pointer-events-none transform group-hover:scale-110 transition-transform duration-500">
                  //
                </div>

                <FaQuoteLeft className="absolute top-6 right-8 text-5xl text-slate-100 dark:text-gray-800/20 pointer-events-none transition-all duration-500 group-hover:text-[var(--ifm-color-primary)]/10 group-hover:rotate-12" />

                <div className="relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 text-[var(--ifm-color-primary)] mb-6 transition-transform duration-300 group-hover:translate-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className="w-3.5 h-3.5 fill-current filter drop-shadow-[0_0_5px_rgba(250,204,21,0.4)] dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]" />
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed font-medium text-[15px] transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-white">
                    "{t.feedback}"
                  </p>
                </div>

                {/* Profile Footer */}
                <div className="flex items-center gap-4 border-t border-slate-100 dark:border-gray-800/50 pt-5 mt-auto relative z-10">
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-14 h-14 rounded-xl object-cover ring-4 ring-slate-100 dark:ring-gray-900/60 group-hover:ring-cyan-500/30 group-hover:rotate-3 transition-all duration-500"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#111625] rounded-full shadow-sm animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-[var(--ifm-color-primary)] mb-2">
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-gray-500 uppercase tracking-widest transition-colors duration-300 group-hover:text-[var(--ifm-color-primary)]/80">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section Break Divider */}
          <div className="relative my-24 flex justify-center items-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dashed border-slate-200 dark:border-gray-800" /></div>
            <span className="relative bg-slate-50 dark:bg-[#0b0f19] px-6 text-[10px] font-black text-slate-400 dark:text-gray-600 uppercase tracking-[0.3em]">System Forum Link</span>
          </div>

          {/* Giscus Container Setup */}
          <div id="forum-zone" className="mx-auto relative z-10">
            <div className="bg-gradient-to-br from-white to-slate-100 dark:from-gray-900/40 dark:to-gray-900/10 border border-slate-200 dark:border-gray-800/80 rounded-2xl p-8 md:p-12 text-center mb-8 shadow-inner transition-all duration-300 hover:border-purple-500/30">
              <div className="inline-flex p-4 rounded-xl bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)] dark:text-cyan-400 dark:bg-cyan-500/10 mb-5 border border-[var(--ifm-color-primary)]/20 dark:border-cyan-500/20 relative group">
                <span className="absolute inset-0 rounded-xl bg-cyan-400/20 scale-100 group-hover:scale-120 animate-ping [animation-duration:2s] opacity-50" />
                <FaCommentMedical className="w-6 h-6 relative z-10" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">
                Establish Direct Transmission
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-0 text-sm md:text-base leading-relaxed font-medium">
                Your console parameters matter. Authorize using a GitHub account handshake down below to post runtime updates or file direct feature recommendations.
              </p>
              <p className="text-slate-500 dark:text-gray-500 mt-4 italic text-xs">
                "The Giscus integration is a game-changer! It allows me to share my thoughts and feedback directly with the developers, fostering a true sense of community." - Jamie L.
              </p>
            </div>

            {/* Live Giscus Shell */}
            <div className="giscus-container bg-white dark:bg-[#0e1322] p-6 md:p-10 rounded-2xl border border-slate-200 dark:border-gray-800/80 shadow-[0_30px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-md relative">
              <div className="absolute top-4 right-4 flex gap-1.5 items-center opacity-40 select-none">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">COMMS_OK</span>
              </div>
              <ReviewsGiscus />
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
};

export default ReviewsPage;