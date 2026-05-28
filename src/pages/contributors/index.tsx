import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@theme/Layout";
import axios from "axios";
import { 
  FiCrosshair, FiTerminal, FiSearch, FiSliders, 
  FiAward, FiGithub, FiActivity, FiZap, FiTarget, FiAlertTriangle 
} from "react-icons/fi";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
};

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"score" | "alpha">("score");

  useEffect(() => {
    let isMounted = true;
    
    async function fetchAllContributors() {
      try {
        // Safer approach: Fetch first page to assess total project density safely
        const response = await axios.get(
          `https://api.github.com/repos/ajay-dhangar/algo/contributors`,
          { params: { per_page: 100, page: 1 } }
        );
        
        if (isMounted) {
          setContributors(response.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError("MAINFRAME_SYNC_ERROR: GitHub API rate bounds or network drop detected.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAllContributors();
    return () => { isMounted = false; };
  }, []);

  // Compute stats logic safely based on max contribution records
  const maxContributions = useMemo(() => {
    if (contributors.length === 0) return 1;
    return Math.max(...contributors.map(c => c.contributions));
  }, [contributors]);

  const getGamerTier = (score: number) => {
    if (score >= 100) return { label: "🏆 MYTHIC DEV", color: "border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]" };
    if (score >= 40) return { label: "💎 DIAMOND ELITE", color: "border-cyan-500/40 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]" };
    if (score >= 15) return { label: "⚡ PLATINUM PRO", color: "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" };
    return { label: "🛡️ GOLD CONTRIBUTOR", color: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5" };
  };

  const processedContributors = useMemo(() => {
    const filtered = contributors.filter(c => 
      c.login.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortBy === "alpha") {
      return [...filtered].sort((a, b) => a.login.localeCompare(b.login));
    }
    return [...filtered].sort((a, b) => b.contributions - a.contributions);
  }, [contributors, searchQuery, sortBy]);

  return (
    <Layout title="Lobby Dashboard" description="Esports-grade open source developer database framework mapping active roster nodes.">
      <main className="w-full min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-800 dark:text-slate-100 font-mono relative overflow-hidden pb-32 transition-colors duration-300">
        
        {/* Dynamic Scanline Grid & Ambient Background FX */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-80 dark:opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_60%)] pointer-events-none" />

        {/* Pro Esports Main HUD Banner Section */}
        <header className="relative z-10 max-w-7xl mx-auto pt-20 px-4 mb-14 text-center">
          <motion.div 
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-blue-500/30 dark:border-cyan-500/40 bg-white dark:bg-black text-blue-600 dark:text-cyan-400 text-xs font-black tracking-widest uppercase mb-6 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <FiCrosshair className="w-4 h-4 text-rose-500 animate-spin [animation-duration:8s]" />
            LIVE CONTORL HUBS: ALGO REPOSITORY ROSTER
          </motion.div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase mb-4 text-slate-900 dark:text-white select-none">
            DEVELOPER <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-blue-500">LOADOUTS</span>
          </h1>
          
          <p className="text-xs sm:text-sm font-sans font-bold max-w-2xl mx-auto text-slate-500 dark:text-neutral-400 leading-relaxed uppercase tracking-widest m-0">
            Analyzing algorithmic code commit metrics mapped from local machine operations branches.
          </p>
        </header>

        {/* Dynamic Control Deck Matrix Panel */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 mb-10">
          <div className="bg-white/80 dark:bg-neutral-900/90 border-2 border-slate-200 dark:border-neutral-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
            
            {/* Search Execution Terminal Interface */}
            <div className="w-full md:max-w-md relative flex items-center">
              <FiSearch className="absolute left-4 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="PROBE OPERATOR ID MATCH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-neutral-950 border border-slate-300 dark:border-neutral-800 text-slate-900 dark:text-white font-mono text-xs font-bold pl-11 pr-4 py-3.5 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all placeholder:text-slate-400 dark:placeholder:text-neutral-600 uppercase"
              />
            </div>

            {/* Sorting Systems View Vector */}
            <div className="w-full md:w-auto flex items-center justify-end gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-neutral-500 text-xs font-black uppercase tracking-wider">
                <FiSliders className="w-4 h-4" />
                SORT LOGIC:
              </div>
              <div className="bg-slate-100 dark:bg-neutral-950 p-1 rounded-lg border border-slate-200 dark:border-neutral-800 flex items-center gap-1">
                <button
                  onClick={() => setSortBy("score")}
                  className={`px-4 py-2 rounded-md text-xs font-black uppercase tracking-wider cursor-pointer border-none transition-all ${sortBy === "score" ? "bg-blue-600 dark:bg-cyan-500 text-white dark:text-neutral-950 shadow-md" : "bg-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"}`}
                >
                  HIGH SCORE
                </button>
                <button
                  onClick={() => setSortBy("alpha")}
                  className={`px-4 py-2 rounded-md text-xs font-black uppercase tracking-wider cursor-pointer border-none transition-all ${sortBy === "alpha" ? "bg-blue-600 dark:bg-cyan-500 text-white dark:text-neutral-950 shadow-md" : "bg-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"}`}
                >
                  ALPHABETICAL
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Core Roster Grid Frame */}
        <section className="relative z-10 max-w-6xl mx-auto px-4">
          
          {/* Custom CSS Animation Fallback Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-48 h-1.5 bg-slate-200 dark:bg-neutral-900 rounded-full overflow-hidden relative border border-slate-300 dark:border-neutral-800">
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                  style={{
                    width: "40%",
                    animation: "loading-slide 1.5s infinite ease-in-out"
                  }}
                />
              </div>
              <style>{`
                @keyframes loading-slide {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(250%); }
                }
              `}</style>
              <p className="text-[11px] tracking-widest text-blue-600 dark:text-cyan-400 uppercase font-black animate-pulse m-0">SYNCHRONIZING REPOSITORY LOBBY STATS...</p>
            </div>
          )}

          {/* Exception Handler Error Notification */}
          {!loading && error && (
            <div className="max-w-md mx-auto bg-rose-500/10 border-2 border-rose-500/30 rounded-xl p-5 flex items-start gap-3 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <FiAlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-rose-600 dark:text-rose-400 m-0 mb-1 uppercase tracking-wider">Lobby Error Intercepted</h4>
                <p className="text-[11px] font-bold text-slate-600 dark:text-neutral-400 m-0">{error}</p>
              </div>
            </div>
          )}

          {/* Player Cards Display Pipeline */}
          {!loading && !error && (
            <motion.div 
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {processedContributors.map((c) => {
                  const tier = getGamerTier(c.contributions);
                  // Compute progression bar fill metric against top platform high scores
                  const statPercentage = Math.max(8, Math.min(100, (c.contributions / maxContributions) * 100));

                  return (
                    <motion.div
                      key={c.id}
                      layout
                      variants={cardVariants}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="group bg-white dark:bg-neutral-900 border-2 border-slate-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-cyan-500 rounded-xl p-5 shadow-sm dark:shadow-md transition-all duration-200 relative overflow-hidden flex flex-col justify-between hover:shadow-[0_5px_25px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                    >
                      {/* Tactical HUD Target Sight Markers */}
                      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-slate-300 dark:border-neutral-700 group-hover:border-blue-500 dark:group-hover:border-cyan-400 transition-colors" />
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-slate-300 dark:border-neutral-700 group-hover:border-blue-500 dark:group-hover:border-cyan-400 transition-colors" />

                      <div>
                        {/* Upper Card Grid Row: Avatar & Profile Bio Identification */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative shrink-0">
                            <div className="absolute inset-0 rounded-full border border-dashed border-slate-300 dark:border-neutral-700 group-hover:border-blue-500 dark:group-hover:border-cyan-500 group-hover:rotate-90 transition-transform duration-1000" />
                            <img 
                              src={c.avatar_url} 
                              alt={`${c.login} profile loadout matrix`}
                              className="w-14 h-14 rounded-full object-cover p-1 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 relative z-10"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            {/* Esports Badge Class Tag Row */}
                            <div className={`inline-block px-2 py-0.5 rounded text-[9px] font-black tracking-wider border mb-1.5 ${tier.color}`}>
                              {tier.label}
                            </div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight m-0 truncate group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                              {c.login}
                            </h3>
                          </div>
                        </div>

                        {/* Middle Card Content Row: Performance Bar Stat Progression Modules */}
                        <div className="space-y-3 bg-slate-50 dark:bg-neutral-950/60 rounded-lg p-3 border border-slate-200 dark:border-neutral-800/80 mb-4">
                          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                            <span className="flex items-center gap-1"><FiTarget className="w-3.5 h-3.5 text-blue-500" /> COMMIT POWER</span>
                            <span className="text-slate-800 dark:text-slate-200 font-extrabold">{c.contributions} XP</span>
                          </div>
                          
                          {/* Live Stat Bar Gauge Track */}
                          <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-500 transition-all duration-500 group-hover:brightness-110"
                              style={{ width: `${statPercentage}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Lower Card Action Link Portal Row */}
                      <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-neutral-800/60">
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
                          <FiActivity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                          <span className="text-emerald-500">PING: OK</span>
                        </div>
                        
                        <a 
                          href={c.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-900 dark:bg-neutral-950 dark:hover:bg-cyan-500 border border-slate-200 dark:border-neutral-800 hover:border-slate-900 dark:hover:border-cyan-400 text-slate-500 hover:text-white dark:text-neutral-400 dark:hover:text-neutral-950 font-black text-[10px] transition-all no-underline hover:no-underline group-hover:translate-x-0.5"
                          aria-label={`Open link target data profiles`}
                        >
                          <FiGithub className="w-3.5 h-3.5" />
                          VIEW PROFILE
                        </a>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Query Match Alternative Flag Fallback */}
          {!loading && processedContributors.length === 0 && (
            <div className="bg-slate-100/50 dark:bg-neutral-900/30 border-2 border-dashed border-slate-300 dark:border-neutral-800 rounded-2xl p-14 text-center max-w-md mx-auto shadow-inner">
              <FiTerminal className="w-6 h-6 text-slate-400 dark:text-neutral-600 mx-auto mb-3" />
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-neutral-400 m-0 mb-1">ZERO SEARCH MATCHES</h4>
              <p className="text-[11px] text-slate-400 dark:text-neutral-500 m-0 leading-relaxed">No network player active inside this lobby instance satisfies the current lookup query parameters.</p>
            </div>
          )}

        </section>
      </main>
    </Layout>
  );
};

export default Contributors;