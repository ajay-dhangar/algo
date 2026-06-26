import React from "react";
import Link from "@docusaurus/Link";

/* ─── Inline SVG Icons (no react-icons dependency) ──────────────────── */
const IconCode = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconBook = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconUsers = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconStar = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconGithub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconZap = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconBookSmall = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconAward = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const IconTerminal = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

/* ─── Hero Section ───────────────────────────────────────────────────── */
const HeroSection = (): JSX.Element => {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

        {/* Aurora Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/25 blur-[180px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/25 blur-[180px] rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
        </div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-12">
            <span className="text-cyan-400"><IconTerminal /></span>
            <span className="text-sm font-medium text-white/70 tracking-wide">
              Trusted by 10,000+ Developers Worldwide
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-black tracking-tighter leading-[0.9]"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
          >
            <span className="text-white">Master</span>
            <br />
            <span
              className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: "text" } as React.CSSProperties}
            >
              Algorithms
            </span>
          </h1>

          {/* Eyebrow */}
          <p
            className="mt-3 text-xs uppercase tracking-[0.25em] font-semibold"
            style={{ color: "rgba(103,232,249,0.7)" }}
          >
            Data Structures · System Design · Problem Solving
          </p>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto mt-8 text-lg md:text-xl text-gray-400 leading-relaxed">
            Production-ready implementations crafted for modern engineers.
            Go from concepts to code that ships.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Link
              to="/docs"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base shadow-[0_20px_60px_rgba(59,130,246,0.35)] hover:scale-105 hover:shadow-[0_24px_70px_rgba(59,130,246,0.5)] transition-all duration-200"
            >
              Start Learning
              <span className="group-hover:translate-x-1.5 transition-transform duration-200 inline-flex">
                <IconArrowRight />
              </span>
            </Link>

            <a
              href="https://github.com/ajay-dhangar/algo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-semibold text-base hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <IconGithub />
              Star on GitHub
            </a>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-16">
            {[
              { icon: <IconZap />, label: "Interactive Playground" },
              { icon: <IconBookSmall />, label: "Step-by-step Guides" },
              { icon: <IconAward />, label: "LeetCode Patterns" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/60"
              >
                <span className="text-cyan-400">{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/40 hover:text-white/80 transition-colors"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          aria-label="Scroll down"
        >
          <IconChevronDown />
        </button>

      </section>

      {/* ─── Statistics Section ──────────────────────────────────────────── */}
      <StatsSection />
    </>
  );
};

/* ─── Stats Data ─────────────────────────────────────────────────────── */
interface StatItem {
  icon: JSX.Element;
  value: string;
  label: string;
  sublabel: string;
  color: string;
  glow: string;
}

const STATS: StatItem[] = [
  {
    icon: <IconCode />,
    value: "500+",
    label: "Algorithms",
    sublabel: "Sorting, Graphs, DP & more",
    color: "from-blue-500 to-cyan-400",
    glow: "rgba(59,130,246,0.25)",
  },
  {
    icon: <IconBook />,
    value: "40+",
    label: "Topics Covered",
    sublabel: "From arrays to system design",
    color: "from-purple-500 to-pink-400",
    glow: "rgba(168,85,247,0.25)",
  },
  {
    icon: <IconUsers />,
    value: "10k+",
    label: "Developers",
    sublabel: "Building with confidence",
    color: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.25)",
  },
  {
    icon: <IconStar />,
    value: "4.9★",
    label: "Community Rating",
    sublabel: "Loved by the dev community",
    color: "from-amber-400 to-orange-400",
    glow: "rgba(245,158,11,0.25)",
  },
];

/* ─── Stats Section ──────────────────────────────────────────────────── */
const StatsSection = (): JSX.Element => {
  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-cyan-400/70 mb-4">
            By the Numbers
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Built for Scale,{" "}
            <span
              className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: "text" } as React.CSSProperties}
            >
              Designed to Learn
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
            Real metrics from a growing community of engineers who&apos;ve leveled up their problem-solving skills.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(({ icon, value, label, sublabel, color, glow }) => (
            <div
              key={label}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col items-start gap-4 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 cursor-default"
              style={{ boxShadow: `0 0 40px ${glow}` }}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color} text-white shadow-lg`}
              >
                {icon}
              </div>

              <div>
                <p
                  className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent leading-none`}
                  style={{ WebkitBackgroundClip: "text" } as React.CSSProperties}
                >
                  {value}
                </p>
                <p className="text-white font-semibold text-lg mt-1">{label}</p>
                <p className="text-gray-500 text-sm mt-1">{sublabel}</p>
              </div>

              <div
                className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${color} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;