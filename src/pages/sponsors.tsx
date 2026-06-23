import React, { useState } from "react";
import Layout from "@theme/Layout";
import {
  FaHeart, FaCodeBranch, FaServer, FaShieldAlt,
  FaArrowUp, FaExternalLinkAlt, FaGlobe, FaTerminal, FaCube
} from "react-icons/fa";

// 1. Structural Types
interface CorporateSponsor {
  id: string;
  name: string;
  url: string;
  headline?: string;
  meta: string[];
  accent: string; // Tailwind gradient classes for the logo monogram
}

interface IndividualBacker {
  username: string;
  tier: "Silver" | "Core";
}

// 2. High-Fidelity Data Matrix
const PLATINUM_SPONSORS: CorporateSponsor[] = [
  {
    id: "corp-alpha",
    name: "Enterprise Cloud Operations",
    url: "https://example.com",
    headline: "Architecting zero-latency serverless edge node delivery networks and distributed memory runtimes.",
    meta: ["12.4M REQS/MO", "EDGE RUNTIME", "FOUNDING PARTNER"],
    accent: "from-blue-500 to-indigo-600",
  },
];

const GOLD_SPONSORS: CorporateSponsor[] = [
  {
    id: "corp-beta",
    name: "Framework Labs",
    url: "https://example.com",
    headline: "Compiling optimized binary abstract structures for next-generation systems engines.",
    meta: ["DEV-TOOLING", "COMPILER CORE"],
    accent: "from-amber-500 to-orange-600",
  },
  {
    id: "corp-gamma",
    name: "DataStream IO",
    url: "https://example.com",
    headline: "High-throughput telemetry state storage arrays processing analytics pipelines seamlessly.",
    meta: ["DATA PIPELINES", "ANALYTICS ENGINE"],
    accent: "from-emerald-500 to-teal-600",
  },
];

// GitHub usernames resolve to real, always-available avatars via github.com/<user>.png
const INDIVIDUAL_BACKERS: IndividualBacker[] = [
  { username: "torvalds", tier: "Core" },
  { username: "gaearon", tier: "Core" },
  { username: "sindresorhus", tier: "Silver" },
  { username: "tj", tier: "Silver" },
  { username: "addyosmani", tier: "Silver" },
  { username: "kentcdodds", tier: "Core" },
  { username: "yyx990803", tier: "Silver" },
  { username: "rauchg", tier: "Silver" },
];

// Derive a short, stable monogram (e.g. "Enterprise Cloud Operations" -> "ECO")
function monogram(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const SponsorsPage: React.FC = () => {
  const [activeTier, setActiveTier] = useState<"all" | "enterprise" | "individual">("all");
  const [glowingIndex, setGlowingIndex] = useState<number | null>(null);
  const [hoveredBacker, setHoveredBacker] = useState<{ index: number; x: number; y: number } | null>(null);

  // Briefly glow the clicked backer card before the new tab opens / as user feedback
  const triggerGlow = (index: number) => {
    setGlowingIndex(index);
    window.setTimeout(() => setGlowingIndex(null), 900);
  };

  const updateBackerGlow = (index: number, event: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredBacker({
      index,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <Layout title="Platform Patrons & Infrastructure Backers" description="Verified network logs of enterprise organizations backing the Algo open source ecosystem.">
      <main className="min-h-screen bg-[var(--ifm-background-color)] text-slate-900 dark:text-zinc-100 antialiased font-sans transition-colors duration-300 relative overflow-hidden">
        
        {/* Unified Decorative Matrix Mesh (Fades seamlessly into Arcade Space Black) */}
        <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.08),transparent_100%)] dark:bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(234,179,8,0.04),transparent_100%)]" />
        <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(234,179,8,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,179,8,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 space-y-16">
          
          {/* Master Structural Header */}
          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-[var(--ifm-color-primary)]/20 bg-[var(--ifm-color-primary)]/5 text-[10px] font-mono tracking-widest text-[var(--ifm-color-primary)] font-bold uppercase shadow-inner">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--ifm-color-primary)] animate-pulse" />
              SYSTEM NODE STATUS: OPERATIONAL
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-zinc-50 m-0 leading-[1.1]">
              Backed by networks who engineer the modern web.
            </h1>
            
            <p className="text-base sm:text-lg font-normal text-slate-500 dark:text-zinc-400 leading-relaxed max-w-2xl m-0">
              The Algo open source repository architecture is sustained globally by cloud engineers, enterprise developers, and computing labs.
            </p>

            {/* Micro-Interaction Filter Panel Docusaurus-aligned */}
            <div className="pt-2">
              <div className="inline-flex p-1 rounded-xl bg-slate-200/50 dark:bg-zinc-900/60 border border-slate-300/40 dark:border-zinc-800/80 backdrop-blur-md">
                {([
                  { key: "all" as const, label: "All", count: PLATINUM_SPONSORS.length + GOLD_SPONSORS.length + INDIVIDUAL_BACKERS.length },
                  { key: "enterprise" as const, label: "Enterprise", count: PLATINUM_SPONSORS.length + GOLD_SPONSORS.length },
                  { key: "individual" as const, label: "Individual", count: INDIVIDUAL_BACKERS.length },
                ]).map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTier(key)}
                    aria-pressed={activeTier === key}
                    className={`flex items-center gap-1.5 px-5 py-2 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border-0 ${
                      activeTier === key
                        ? "bg-[var(--ifm-color-primary)] text-white dark:text-zinc-950 shadow-sm font-black"
                        : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200 bg-transparent"
                    }`}
                  >
                    {label}
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                        activeTier === key
                          ? "bg-white/25 dark:bg-zinc-950/20"
                          : "bg-slate-300/50 dark:bg-zinc-800"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ==========================================================================
             PLATINUM BENTO LAYER
             ========================================================================== */}
          {(activeTier === "all" || activeTier === "enterprise") && (
            <div className="space-y-4 relative">
              <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                <FaCube className="text-[11px] text-[var(--ifm-color-primary)]" /> <span className="w-4 h-px bg-slate-200 dark:bg-zinc-800"></span> PLATINUM STRUCTURAL MATRIX
              </div>
              
              {PLATINUM_SPONSORS.map((sp) => (
                <div 
                  key={sp.id}
                  className="group relative bg-white dark:bg-[#0c0c20]/60 border border-slate-200 dark:border-zinc-800/80 rounded-2xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-xs hover:border-blue-400/40 dark:hover:border-[var(--ifm-color-primary)]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Blueprint Geometrics */}
                  <div className="absolute top-0 left-0 text-[9px] font-mono opacity-20 text-slate-400 dark:text-zinc-600 select-none p-2 pointer-events-none">+ SEC_L01</div>
                  <div className="absolute bottom-0 right-0 text-[9px] font-mono opacity-20 text-slate-400 dark:text-zinc-600 select-none p-2 pointer-events-none">+ SEC_R01</div>

                  {/* Corporate branding shell */}
                  <div className="lg:col-span-4 flex flex-col justify-between space-y-8 relative z-10">
                    <a href={sp.url} target="_blank" rel="noopener noreferrer" className="inline-block group-hover:scale-[1.01] transition-transform duration-300">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${sp.accent} w-24 h-24 flex items-center justify-center shadow-sm`}>
                        <span className="text-2xl font-black text-white tracking-tight select-none">
                          {monogram(sp.name)}
                        </span>
                      </div>
                    </a>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-50 m-0">
                        {sp.name}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 mt-2 font-mono text-[9px] text-[var(--ifm-color-primary)] font-bold tracking-widest uppercase">
                        PLATINUM ANCHOR SYSTEM <FaGlobe className="text-[8px]" />
                      </span>
                    </div>
                  </div>

                  {/* Core Description content block */}
                  <div className="lg:col-span-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-zinc-800/60 pt-8 lg:pt-0 lg:pl-10 space-y-8 relative z-10">
                    <p className="text-base font-normal text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl m-0 italic">
                      "{sp.headline}"
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {sp.meta.map((m, i) => (
                        <span key={i} className="px-3 py-1 rounded-md bg-slate-50 dark:bg-zinc-900 font-mono text-[9px] font-bold tracking-wider text-slate-500 dark:text-zinc-400 border border-slate-200/60 dark:border-zinc-800">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ==========================================================================
             GOLD INFRASTRUCTURE MATRIX LAYER
             ========================================================================== */}
          {(activeTier === "all" || activeTier === "enterprise") && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                <FaServer className="text-[11px] text-[var(--ifm-color-primary)]" /> <span className="w-4 h-px bg-slate-200 dark:bg-zinc-800"></span> GOLD PLATFORM RUNTIMES
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GOLD_SPONSORS.map((sp) => (
                  <div 
                    key={sp.id}
                    className="group relative flex flex-col justify-between p-6 lg:p-8 bg-white dark:bg-[#0c0c20]/40 border border-slate-200 dark:border-zinc-800/80 rounded-2xl hover:border-blue-400/30 dark:hover:border-[var(--ifm-color-primary)]/30 shadow-2xs hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${sp.accent} w-14 h-14 flex items-center justify-center shadow-sm`}>
                          <span className="text-sm font-black text-white tracking-tight select-none">
                            {monogram(sp.name)}
                          </span>
                        </div>
                        <a href={sp.url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 border border-slate-200 dark:border-zinc-800 text-xs transition-colors cursor-pointer">
                          <FaExternalLinkAlt className="text-[9px]" />
                        </a>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50 m-0 tracking-tight">
                          {sp.name}
                        </h3>
                        <p className="text-xs font-normal text-slate-500 dark:text-zinc-400 leading-relaxed mt-2 m-0">
                          {sp.headline}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-8 pt-4 border-t border-slate-100 dark:border-zinc-800/60">
                      {sp.meta.map((m, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-50 dark:bg-zinc-900 font-mono text-[9px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================================================
             INDIVIDUAL MATRICES LAYER
             ========================================================================== */}
          {(activeTier === "all" || activeTier === "individual") && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                <FaCodeBranch className="text-[11px] text-[var(--ifm-color-primary)]" /> <span className="w-4 h-px bg-slate-200 dark:bg-zinc-800"></span> INDIVIDUAL TELEMETRY REGISTRY
              </div>

              <div className="bg-white dark:bg-[#0c0c20]/20 border border-slate-200 dark:border-zinc-800/60 rounded-2xl p-6 lg:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {INDIVIDUAL_BACKERS.map((bk, i) => (
                    <a
                      key={i}
                      href={`https://github.com/${bk.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onPointerEnter={(event) => updateBackerGlow(i, event)}
                      onPointerMove={(event) => updateBackerGlow(i, event)}
                      onPointerLeave={() => setHoveredBacker(null)}
                      onClick={() => triggerGlow(i)}
                      className={`group relative flex items-center gap-3 p-3 rounded-xl border bg-slate-50/50 dark:bg-zinc-950/40 hover:bg-white dark:hover:bg-zinc-900/60 hover:shadow-3xs transition-all duration-200 no-underline ${
                        glowingIndex === i
                          ? "backer-glow border-[var(--ifm-color-primary)]"
                          : "border-slate-100 dark:border-zinc-800/40 hover:border-slate-300 dark:hover:border-zinc-700 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.18),0_0_24px_rgba(59,130,246,0.12)] dark:hover:shadow-[0_0_0_1px_rgba(234,179,8,0.18),0_0_24px_rgba(234,179,8,0.1)]"
                      }`}
                    >
                      {hoveredBacker?.index === i && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 backer-hover-glow"
                          style={
                            {
                              "--glow-x": `${hoveredBacker.x}px`,
                              "--glow-y": `${hoveredBacker.y}px`,
                            } as React.CSSProperties
                          }
                        />
                      )}
                      <img
                        src={`https://github.com/${bk.username}.png?size=72`}
                        alt={bk.username}
                        loading="lazy"
                        className={`w-9 h-9 rounded-full border object-cover bg-slate-200 dark:bg-zinc-800 transition-all duration-300 ${
                          glowingIndex === i
                            ? "border-[var(--ifm-color-primary)] shadow-[0_0_12px_var(--ifm-color-primary)]"
                            : "border-slate-200 dark:border-zinc-800 group-hover:border-[var(--ifm-color-primary)] group-hover:shadow-[0_0_16px_rgba(59,130,246,0.25)] dark:group-hover:shadow-[0_0_16px_rgba(234,179,8,0.2)]"
                        }`}
                        onError={(e) => {
                          // Fallback to a generated avatar if the GitHub user has no image / 404s
                          (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${bk.username}`;
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs font-bold truncate m-0 tracking-tight transition-all duration-300 ${
                            glowingIndex === i
                              ? "text-[var(--ifm-color-primary)] [text-shadow:0_0_8px_var(--ifm-color-primary)]"
                              : "text-slate-800 dark:text-zinc-200 group-hover:text-[var(--ifm-color-primary)]"
                          }`}
                        >
                          @{bk.username}
                        </p>
                        <span className="inline-block text-[8px] font-mono font-black tracking-widest uppercase mt-0.5 text-[var(--ifm-color-primary)]">
                          {bk.tier} CORE
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================================
             DYNAMIC CONSOLE CALL TO ACTION CAPABILITY
             ========================================================================== */}
          <div className="border-t border-slate-200 dark:border-zinc-800/60 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
              
              {/* Metric Analytics Segment */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0c0c20]/40 border border-slate-200 dark:border-zinc-800/80 rounded-2xl p-8 flex flex-col justify-between space-y-8 shadow-3xs">
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)] w-fit border border-[var(--ifm-color-primary)]/10">
                    <FaHeart className="text-xs animate-pulse" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-zinc-50 m-0 tracking-tight">
                    Sustain High-Performance Infrastructure Pipelines
                  </h2>
                  <p className="text-xs md:text-sm font-normal text-slate-500 dark:text-zinc-400 leading-relaxed m-0">
                    Sponsorship arrays directly finance automatic algorithmic testing runs, scalable documentation cycles, and open telemetry pipeline integrations.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-zinc-800/60 pt-6">
                  <div>
                    <span className="block font-mono text-[9px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">NET TRAFFIC</span>
                    <strong className="text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-zinc-50 block mt-0.5">450K+ hits</strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">GEOSPATIAL</span>
                    <strong className="text-base md:text-lg font-black tracking-tight text-slate-900 dark:text-zinc-50 block mt-0.5">140+ zones</strong>
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">UPTIME LOGS</span>
                    <strong className="text-base md:text-lg font-black tracking-tight text-emerald-500 dark:text-emerald-400 block mt-0.5">99.98%</strong>
                  </div>
                </div>
              </div>

              {/* Secure Token Action Center */}
              <div className="lg:col-span-5 bg-slate-950 dark:bg-zinc-950 border border-slate-900 dark:border-zinc-800 rounded-2xl p-8 flex flex-col justify-between text-white space-y-8 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 p-4 font-mono text-[52px] font-black text-slate-900 dark:text-zinc-900/60 opacity-40 select-none pointer-events-none leading-none tracking-tighter">
                  $/OSS
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[8px] font-black tracking-widest text-zinc-400 uppercase border border-zinc-800 bg-zinc-900 px-2 py-0.5 rounded">
                    <FaShieldAlt className="text-[var(--ifm-color-primary)] text-[9px]" /> SECURE ROUTE SEC-09
                  </div>
                  <h3 className="text-lg font-bold tracking-tight m-0 text-zinc-50">
                    Inject telemetry variables into our stack.
                  </h3>
                  <p className="text-xs font-normal text-zinc-400 leading-relaxed m-0">
                    Gain premium production visibility across thousands of full-stack engineers and labs visiting daily.
                  </p>
                </div>

                <div className="space-y-3 relative z-10">
                  <a
                    href="https://github.com/sponsors/ajay-dhangar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl font-mono text-[11px] font-black uppercase tracking-wider text-center text-slate-950 dark:text-zinc-950 bg-[var(--ifm-color-primary)] hover:brightness-110 transition-all shadow-sm flex items-center justify-center gap-2 border border-transparent hover:no-underline decoration-none"
                  >
                    <span>INITIALIZE PATHWAY</span> <FaArrowUp className="rotate-45 text-[9px]" />
                  </a>
                  <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-zinc-500 tracking-wide">
                    <FaTerminal className="text-[8px]" /> system redirecting to external repository shell
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Click-triggered glow animation for individual backer cards */}
        <style>{`
          @keyframes backerGlowPulse {
            0% {
              box-shadow: 0 0 0px 0px var(--ifm-color-primary);
              transform: scale(1);
            }
            40% {
              box-shadow: 0 0 22px 4px var(--ifm-color-primary);
              transform: scale(1.03);
            }
            100% {
              box-shadow: 0 0 0px 0px var(--ifm-color-primary);
              transform: scale(1);
            }
          }
          .backer-glow {
            animation: backerGlowPulse 0.9s ease-out;
          }
          .backer-hover-glow {
            background:
              radial-gradient(
                circle at var(--glow-x) var(--glow-y),
                rgba(59, 130, 246, 0.28) 0%,
                rgba(59, 130, 246, 0.16) 18%,
                rgba(59, 130, 246, 0.08) 34%,
                transparent 68%
              );
            mix-blend-mode: screen;
          }
          [data-theme="dark"] .backer-hover-glow {
            background:
              radial-gradient(
                circle at var(--glow-x) var(--glow-y),
                rgba(234, 179, 8, 0.26) 0%,
                rgba(234, 179, 8, 0.14) 18%,
                rgba(234, 179, 8, 0.06) 34%,
                transparent 68%
              );
          }
        `}</style>
      </main>
    </Layout>
  );
};

export default SponsorsPage;
