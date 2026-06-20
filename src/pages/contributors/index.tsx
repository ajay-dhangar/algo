import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Layout from "@theme/Layout";
import axios from "axios";
import {
  FiCrosshair, FiTerminal, FiSearch, FiSliders,
  FiGithub, FiActivity, FiTarget, FiAlertTriangle,
  FiUsers, FiGitCommit, FiGitPullRequest, FiZap, FiBarChart2, FiFilter
} from "react-icons/fi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

type SortKey = "score" | "alpha" | "active";
type TierFilter = "ALL" | "MYTHIC" | "DIAMOND" | "PLATINUM" | "GOLD";

// ─── Tier Config ──────────────────────────────────────────────────────────────

const TIERS = {
  MYTHIC: {
    label: "🏆 MYTHIC DEV",
    min: 100,
    color: "text-purple-400",
    border: "border-purple-500/40",
    bg: "bg-purple-500/10",
    glow: "rgba(168,85,247,0.25)",
    glowHover: "rgba(168,85,247,0.45)",
    bar: "from-purple-500 to-fuchsia-500",
  },
  DIAMOND: {
    label: "💎 DIAMOND ELITE",
    min: 40,
    color: "text-cyan-400",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
    glow: "rgba(6,182,212,0.25)",
    glowHover: "rgba(6,182,212,0.45)",
    bar: "from-cyan-500 to-blue-500",
  },
  PLATINUM: {
    label: "⚡ PLATINUM PRO",
    min: 15,
    color: "text-emerald-400",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    glow: "rgba(52,211,153,0.2)",
    glowHover: "rgba(52,211,153,0.4)",
    bar: "from-emerald-500 to-teal-400",
  },
  GOLD: {
    label: "🛡️ GOLD CONTRIBUTOR",
    min: 0,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    glow: "rgba(251,191,36,0.15)",
    glowHover: "rgba(251,191,36,0.3)",
    bar: "from-amber-500 to-yellow-400",
  },
} as const;

function getTier(score: number) {
  if (score >= TIERS.MYTHIC.min) return { key: "MYTHIC" as TierFilter, ...TIERS.MYTHIC };
  if (score >= TIERS.DIAMOND.min) return { key: "DIAMOND" as TierFilter, ...TIERS.DIAMOND };
  if (score >= TIERS.PLATINUM.min) return { key: "PLATINUM" as TierFilter, ...TIERS.PLATINUM };
  return { key: "GOLD" as TierFilter, ...TIERS.GOLD };
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    if (value === 0) return;
    const duration = 1400;
    const start = performance.now();
    const from = ref.current;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = Math.round(from + (value - from) * eased);
      setDisplay(cur);
      ref.current = cur;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Background Particles ─────────────────────────────────────────────────────

function BackgroundFX() {
  return (
    <>
      {/* Scanline grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right,#1e293b 1px,transparent 1px),linear-gradient(to bottom,#1e293b 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          animation: "gridPulse 4s ease-in-out infinite",
        }}
      />

      {/* Animated orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-80px", left: "15%",
          width: "520px", height: "520px",
          background: "radial-gradient(circle,rgba(6,182,212,0.13) 0%,transparent 65%)",
          animation: "orbFloat1 9s ease-in-out infinite",
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%", right: "5%",
          width: "480px", height: "480px",
          background: "radial-gradient(circle,rgba(168,85,247,0.11) 0%,transparent 65%)",
          animation: "orbFloat2 12s ease-in-out infinite",
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", left: "30%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle,rgba(59,130,246,0.10) 0%,transparent 65%)",
          animation: "orbFloat3 15s ease-in-out infinite",
          filter: "blur(2px)",
        }}
      />

      {/* Particle dots */}
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0
              ? "rgba(6,182,212,0.5)"
              : i % 3 === 1
              ? "rgba(168,85,247,0.4)"
              : "rgba(251,191,36,0.35)",
            animation: `particleDrift ${8 + Math.random() * 14}s linear infinite`,
            animationDelay: `${Math.random() * -20}s`,
            opacity: 0.6,
          }}
        />
      ))}

      <style>{`
        @keyframes gridPulse {
          0%,100% { opacity: 0.3; }
          50% { opacity: 0.55; }
        }
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-40px) scale(1.05); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-25px,35px) scale(1.08); }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(20px,-30px) scale(1.04); }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0) translateX(0); opacity:0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-120px) translateX(${Math.random() > 0.5 ? "" : "-"}${Math.round(Math.random() * 30)}px); opacity:0; }
        }
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes neonPulse {
          0%,100% { box-shadow: 0 0 8px rgba(6,182,212,0.3); }
          50% { box-shadow: 0 0 20px rgba(6,182,212,0.6); }
        }
      `}</style>
    </>
  );
}

// ─── Stats Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  delay: number;
}

function StatCard({ icon, label, value, suffix = "", color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 120 }}
      className="relative bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 flex items-center gap-3 overflow-hidden group hover:border-neutral-600 transition-all duration-300"
      style={{ backdropFilter: "blur(10px)" }}
    >
      {/* Glow accent */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 50%, ${color}18, transparent 70%)` }}
      />
      <div
        className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ background: `${color}18`, border: `1px solid ${color}35` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <div className="text-[9px] font-black tracking-widest uppercase text-neutral-500 mb-0.5">{label}</div>
        <div className="text-lg font-black text-white tabular-nums" style={{ color }}>
          <AnimatedCounter value={value} suffix={suffix} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Contributor Card ─────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 24 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 130, damping: 15 },
  },
  exit: { opacity: 0, scale: 0.88, y: 10 },
};

interface ContributorCardProps {
  c: Contributor;
  maxContributions: number;
  rank: number;
}

function ContributorCard({ c, maxContributions, rank }: ContributorCardProps) {
  const tier = getTier(c.contributions);
  const pct = Math.max(6, Math.min(100, (c.contributions / maxContributions) * 100));
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      variants={cardVariants}
      exit={cardVariants.exit}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col justify-between rounded-xl p-5 overflow-hidden cursor-default"
      style={{
        background: hovered
          ? `linear-gradient(135deg, #0f172a 0%, #111827 100%)`
          : "#0d1117",
        border: hovered
          ? `1.5px solid ${tier.glow.replace("0.25", "0.7")}`
          : "1.5px solid #1e293b",
        boxShadow: hovered
          ? `0 8px 40px ${tier.glowHover}, 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`
          : "0 2px 8px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Corner bracket TL */}
      <span
        className="absolute top-0 left-0 border-t-2 border-l-2 transition-all duration-300"
        style={{
          width: hovered ? 16 : 8, height: hovered ? 16 : 8,
          borderColor: hovered ? tier.glow.replace("0.25", "0.9") : "#334155",
          borderRadius: "2px 0 0 0",
        }}
      />
      {/* Corner bracket BR */}
      <span
        className="absolute bottom-0 right-0 border-b-2 border-r-2 transition-all duration-300"
        style={{
          width: hovered ? 16 : 8, height: hovered ? 16 : 8,
          borderColor: hovered ? tier.glow.replace("0.25", "0.9") : "#334155",
          borderRadius: "0 0 2px 0",
        }}
      />

      {/* Rank badge */}
      <div className="absolute top-3 right-3 text-[9px] font-black tracking-widest text-neutral-600">
        #{String(rank).padStart(2, "0")}
      </div>

      <div>
        {/* Avatar + Identity */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative shrink-0">
            {/* Rotating dashed ring */}
            <div
              className="absolute inset-0 rounded-full border border-dashed transition-all duration-700"
              style={{
                borderColor: hovered ? tier.glow.replace("0.25", "0.8") : "#334155",
                transform: hovered ? "rotate(90deg) scale(1.08)" : "rotate(0deg) scale(1)",
              }}
            />
            {/* Glow ring */}
            {hovered && (
              <div
                className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
                style={{
                  boxShadow: `0 0 16px ${tier.glowHover}`,
                }}
              />
            )}
            <img
              src={c.avatar_url}
              alt={`${c.login} avatar`}
              className="relative z-10 rounded-full object-cover bg-neutral-950 border border-neutral-800"
              style={{
                width: 56, height: 56,
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.3s ease",
                padding: 3,
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            {/* Tier badge */}
            <div
              className={`inline-block px-2 py-0.5 rounded text-[9px] font-black tracking-wider border mb-1.5 ${tier.color} ${tier.border} ${tier.bg}`}
            >
              {tier.label}
            </div>
            <h3
              className="text-base font-black tracking-tight m-0 truncate transition-colors duration-200"
              style={{ color: hovered ? tier.glow.replace("0.25","1").replace("rgba","rgb").replace(",0.25","") : "#f1f5f9" }}
            >
              {c.login}
            </h3>
          </div>
        </div>

        {/* Stat bar */}
        <div className="space-y-2 rounded-lg p-3 mb-4" style={{ background: "#0a0f1a", border: "1px solid #1e293b" }}>
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            <span className="flex items-center gap-1.5">
              <FiTarget className="w-3.5 h-3.5" style={{ color: hovered ? tier.glow.replace("0.25","0.9") : "#38bdf8" }} />
              COMMIT POWER
            </span>
            <span className="font-extrabold" style={{ color: hovered ? "#fff" : "#94a3b8" }}>
              {c.contributions} XP
            </span>
          </div>
          {/* Track */}
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${tier.bar}`}
              style={{
                filter: hovered ? `drop-shadow(0 0 4px ${tier.glowHover})` : "none",
                transition: "filter 0.3s ease",
              }}
            />
            {/* Shimmer */}
            {hovered && (
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.15) 50%,transparent 100%)",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div
        className="flex items-center justify-between gap-3 pt-2"
        style={{ borderTop: "1px solid #1e293b" }}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
          <FiActivity
            className="w-3.5 h-3.5 animate-pulse"
            style={{ color: hovered ? "#34d399" : "#10b981" }}
          />
          <span style={{ color: hovered ? "#34d399" : "#10b981" }}>PING: OK</span>
        </div>

        <a
          href={c.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider no-underline hover:no-underline transition-all duration-200"
          style={{
            background: hovered ? tier.glow.replace("0.25","0.2") : "#0f172a",
            border: `1px solid ${hovered ? tier.glow.replace("0.25","0.6") : "#1e293b"}`,
            color: hovered ? "#fff" : "#64748b",
            boxShadow: hovered ? `0 0 12px ${tier.glowHover}` : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <FiGithub className="w-3.5 h-3.5" />
          VIEW PROFILE
        </a>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const TIER_FILTER_OPTIONS: { key: TierFilter; label: string }[] = [
  { key: "ALL", label: "ALL" },
  { key: "MYTHIC", label: "🏆 MYTHIC" },
  { key: "DIAMOND", label: "💎 DIAMOND" },
  { key: "PLATINUM", label: "⚡ PLATINUM" },
  { key: "GOLD", label: "🛡️ GOLD" },
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "score", label: "HIGH SCORE" },
  { key: "alpha", label: "ALPHABETICAL" },
  { key: "active", label: "MOST ACTIVE" },
];

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortKey>("score");
  const [tierFilter, setTierFilter] = useState<TierFilter>("ALL");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchContributors() {
      try {
        const res = await axios.get(
          "https://api.github.com/repos/ajay-dhangar/algo/contributors",
          { params: { per_page: 100, page: 1 } }
        );
        if (isMounted) setContributors(res.data || []);
      } catch {
        if (isMounted) setError("MAINFRAME_SYNC_ERROR: GitHub API rate limit or network failure.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchContributors();
    return () => { isMounted = false; };
  }, []);

  // ── Derived Stats ─────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalContributors = contributors.length;
    const totalCommits = contributors.reduce((s, c) => s + c.contributions, 0);
    const estPRs = Math.round(totalCommits * 0.38);
    const activeCount = contributors.filter(c => c.contributions >= 5).length;
    const activityScore = totalContributors > 0
      ? Math.min(100, Math.round((totalCommits / 1000) * Math.log(totalContributors + 1) * 4))
      : 0;
    return { totalContributors, totalCommits, estPRs, activeCount, activityScore };
  }, [contributors]);

  const maxContributions = useMemo(() =>
    contributors.length === 0 ? 1 : Math.max(...contributors.map(c => c.contributions)),
    [contributors]
  );

  // ── Processed List ────────────────────────────────────────────────────────
  const processedContributors = useMemo(() => {
    let list = contributors.filter(c =>
      c.login.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (tierFilter !== "ALL") {
      list = list.filter(c => getTier(c.contributions).key === tierFilter);
    }
    if (sortBy === "alpha") return [...list].sort((a, b) => a.login.localeCompare(b.login));
    if (sortBy === "active") return [...list].sort((a, b) => b.contributions - a.contributions).filter(c => c.contributions >= 5);
    return [...list].sort((a, b) => b.contributions - a.contributions);
  }, [contributors, searchQuery, sortBy, tierFilter]);

  return (
    <Layout
      title="Contribution Tracker // Developer Loadouts"
      description="Esports-grade open source developer leaderboard tracking real-time codebase operations for ajay-dhangar/algo."
    >
      <main
        className="w-full min-h-screen font-mono relative overflow-hidden pb-32 transition-colors duration-300"
        style={{ background: "#060a10", color: "#e2e8f0" }}
      >
        <BackgroundFX />

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <header className="relative z-10 max-w-7xl mx-auto pt-20 px-4 mb-10 text-center">
          <motion.div
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-black tracking-widest uppercase mb-6"
            style={{
              border: "1px solid rgba(6,182,212,0.35)",
              background: "rgba(6,182,212,0.06)",
              color: "#22d3ee",
              boxShadow: "0 0 20px rgba(6,182,212,0.15)",
              animation: "neonPulse 3s ease-in-out infinite",
            }}
          >
            <FiCrosshair className="w-4 h-4 text-rose-500 animate-spin [animation-duration:8s]" />
            LIVE CONTROL HUB: ALGO REPOSITORY ROSTER
          </motion.div>

          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08, type: "spring" }}
            className="text-4xl sm:text-6xl font-black tracking-tighter uppercase mb-4 select-none"
            style={{ color: "#f8fafc" }}
          >
            DEVELOPER{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#22d3ee,#6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 18px rgba(34,211,238,0.3))",
              }}
            >
              LOADOUTS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-xs sm:text-sm font-sans font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-widest m-0"
            style={{ color: "#64748b" }}
          >
            Analyzing algorithmic code commit metrics mapped from live repository operations.
          </motion.p>
        </header>

        {/* ── Stats Dashboard ─────────────────────────────────────────────── */}
        {!loading && !error && (
          <section className="relative z-10 max-w-6xl mx-auto px-4 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <StatCard
                icon={<FiUsers className="w-4 h-4" />}
                label="Total Contributors"
                value={stats.totalContributors}
                color="#22d3ee"
                delay={0.1}
              />
              <StatCard
                icon={<FiGitCommit className="w-4 h-4" />}
                label="Total Commits"
                value={stats.totalCommits}
                color="#818cf8"
                delay={0.18}
              />
              <StatCard
                icon={<FiGitPullRequest className="w-4 h-4" />}
                label="Est. Pull Requests"
                value={stats.estPRs}
                color="#34d399"
                delay={0.26}
              />
              <StatCard
                icon={<FiZap className="w-4 h-4" />}
                label="Active Contributors"
                value={stats.activeCount}
                color="#f59e0b"
                delay={0.34}
              />
              <StatCard
                icon={<FiBarChart2 className="w-4 h-4" />}
                label="Activity Score"
                value={stats.activityScore}
                suffix="/100"
                color="#f43f5e"
                delay={0.42}
              />
            </div>
          </section>
        )}

        {/* ── Control Deck ────────────────────────────────────────────────── */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 mb-8">
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
              background: "rgba(15,23,42,0.9)",
              border: "1.5px solid #1e293b",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Row 1: Search + Sort */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Search */}
              <div className="w-full md:max-w-md relative flex items-center">
                <FiSearch className="absolute left-4 w-4 h-4" style={{ color: "#475569" }} />
                <input
                  type="text"
                  placeholder="PROBE OPERATOR ID MATCH..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full font-mono text-xs font-bold pl-11 pr-4 py-3.5 rounded-lg outline-none uppercase transition-all"
                  style={{
                    background: "#060a10",
                    border: "1px solid #1e293b",
                    color: "#f1f5f9",
                  }}
                  onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(34,211,238,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.border = "1px solid #1e293b")}
                />
              </div>

              {/* Sort + Filter toggle */}
              <div className="w-full md:w-auto flex items-center justify-end gap-3 shrink-0 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider" style={{ color: "#475569" }}>
                  <FiSliders className="w-4 h-4" />
                  SORT:
                </div>
                <div
                  className="flex items-center gap-1 p-1 rounded-lg"
                  style={{ background: "#060a10", border: "1px solid #1e293b" }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setSortBy(opt.key)}
                      className="px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider cursor-pointer border-none transition-all"
                      style={{
                        background: sortBy === opt.key
                          ? "linear-gradient(135deg,#0891b2,#6366f1)"
                          : "transparent",
                        color: sortBy === opt.key ? "#fff" : "#475569",
                        boxShadow: sortBy === opt.key ? "0 0 12px rgba(34,211,238,0.3)" : "none",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowFilters((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer border-none transition-all"
                  style={{
                    background: showFilters ? "rgba(34,211,238,0.15)" : "#060a10",
                    border: `1px solid ${showFilters ? "rgba(34,211,238,0.4)" : "#1e293b"}`,
                    color: showFilters ? "#22d3ee" : "#475569",
                  }}
                >
                  <FiFilter className="w-3.5 h-3.5" />
                  FILTER
                </button>
              </div>
            </div>

            {/* Row 2: Tier filter chips (collapsible) */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="pt-3 flex flex-wrap items-center gap-2"
                    style={{ borderTop: "1px solid #1e293b" }}
                  >
                    <span className="text-[9px] font-black tracking-widest uppercase" style={{ color: "#475569" }}>
                      RANK TIER:
                    </span>
                    {TIER_FILTER_OPTIONS.map((opt) => {
                      const tierData = opt.key !== "ALL" ? TIERS[opt.key] : null;
                      const active = tierFilter === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => setTierFilter(opt.key)}
                          className="px-3 py-1 rounded-full text-[9px] font-black tracking-wider uppercase cursor-pointer border-none transition-all"
                          style={{
                            background: active
                              ? tierData
                                ? `${tierData.glow.replace("0.25","0.3")}`
                                : "rgba(34,211,238,0.2)"
                              : "#0f172a",
                            border: active
                              ? `1px solid ${tierData ? tierData.glow.replace("0.25","0.7") : "rgba(34,211,238,0.5)"}`
                              : "1px solid #1e293b",
                            color: active
                              ? tierData
                                ? "#fff"
                                : "#22d3ee"
                              : "#475569",
                            boxShadow: active && tierData ? `0 0 10px ${tierData.glowHover}` : "none",
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                    {/* Count badge */}
                    <span
                      className="ml-auto text-[9px] font-black tracking-widest uppercase"
                      style={{ color: "#334155" }}
                    >
                      {processedContributors.length} OPERATORS
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── Cards Grid ──────────────────────────────────────────────────── */}
        <section className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div
                className="w-48 h-1.5 rounded-full overflow-hidden relative"
                style={{ background: "#0f172a", border: "1px solid #1e293b" }}
              >
                <div
                  className="absolute top-0 bottom-0 left-0 rounded-full"
                  style={{
                    width: "40%",
                    background: "linear-gradient(90deg,#22d3ee,#6366f1)",
                    animation: "loading-slide 1.5s infinite ease-in-out",
                  }}
                />
              </div>
              <p
                className="text-[11px] tracking-widest uppercase font-black animate-pulse m-0"
                style={{ color: "#22d3ee" }}
              >
                SYNCHRONIZING REPOSITORY LOBBY STATS...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className="max-w-md mx-auto rounded-xl p-5 flex items-start gap-3"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "2px solid rgba(239,68,68,0.3)",
                boxShadow: "0 0 24px rgba(239,68,68,0.1)",
              }}
            >
              <FiAlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4
                  className="text-xs font-black m-0 mb-1 uppercase tracking-wider"
                  style={{ color: "#f87171" }}
                >
                  Lobby Error Intercepted
                </h4>
                <p className="text-[11px] font-bold m-0" style={{ color: "#94a3b8" }}>{error}</p>
              </div>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && (
            <motion.div
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {processedContributors.map((c, i) => (
                  <ContributorCard
                    key={c.id}
                    c={c}
                    maxContributions={maxContributions}
                    rank={i + 1}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && !error && processedContributors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl p-14 text-center max-w-md mx-auto"
              style={{
                background: "rgba(15,23,42,0.5)",
                border: "2px dashed #1e293b",
              }}
            >
              <FiTerminal className="w-6 h-6 mx-auto mb-3" style={{ color: "#334155" }} />
              <h4
                className="text-xs font-black uppercase tracking-widest m-0 mb-1"
                style={{ color: "#475569" }}
              >
                ZERO SEARCH MATCHES
              </h4>
              <p className="text-[11px] m-0 leading-relaxed" style={{ color: "#334155" }}>
                No operators match the current query or tier filter parameters.
              </p>
            </motion.div>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default Contributors;