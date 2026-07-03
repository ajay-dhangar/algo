import Layout from "@theme/Layout";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface LeaderNode {
  username: string;
  totalScore: number;
  attemptsCount: number;
  avatarUrl: string;
  profileUrl: string;
  rank: number;
  tier: string;
  accentColor: string;
  textColor: string;
}

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<LeaderNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cacheTime, setCacheTime] = useState<number | null>(null);
  const [dataSource, setDataSource] = useState<"live" | "cache" | "mock">("mock");
  const [formattedAge, setFormattedAge] = useState<string>("");

  useEffect(() => {
    if (!cacheTime) return;
    const updateAge = () => {
      const diffMs = Math.max(0, Date.now() - cacheTime);
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHr / 24);

      if (diffSec < 60) {
        setFormattedAge("JUST NOW");
      } else if (diffMin < 60) {
        setFormattedAge(`${diffMin}M AGO`);
      } else if (diffHr < 24) {
        setFormattedAge(`${diffHr}H AGO`);
      } else {
        setFormattedAge(`${diffDay}D AGO`);
      }
    };
    updateAge();
    const interval = setInterval(updateAge, 60000);
    return () => clearInterval(interval);
  }, [cacheTime]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCyberMetrics() {
      try {
        const response = await axios.get<GitHubContributor[]>(
          "https://api.github.com/repos/ajay-dhangar/algo/contributors",
          { params: { per_page: 100 } }
        );

        if (response.data && Array.isArray(response.data) && isMounted) {
          const mappedLeaders: LeaderNode[] = response.data.map((user, idx) => {
            const rank = idx + 1;
            const contributions = user.contributions;
            const totalScore = contributions * 150;
            
            let tier = "PLATINUM";
            let accentColor = "from-cyan-500 to-blue-500";
            let textColor = "text-cyan-600 dark:text-cyan-400";
            
            if (rank === 1) {
              tier = "APEX LEGEND";
              accentColor = "from-amber-400 via-orange-500 to-yellow-500";
              textColor = "text-amber-600 dark:text-amber-400";
            } else if (rank === 2) {
              tier = "GRANDMASTER";
              accentColor = "from-purple-500 via-fuchsia-500 to-pink-500";
              textColor = "text-purple-600 dark:text-purple-400";
            } else if (rank === 3) {
              tier = "MASTER";
              accentColor = "from-emerald-500 to-teal-400";
              textColor = "text-emerald-600 dark:text-emerald-400";
            } else if (totalScore > 3000) {
              tier = "DIAMOND";
              accentColor = "from-blue-500 to-indigo-500";
              textColor = "text-blue-600 dark:text-blue-400";
            }

            return {
              username: user.login,
              totalScore,
              attemptsCount: contributions,
              avatarUrl: user.avatar_url,
              profileUrl: user.html_url,
              rank,
              tier,
              accentColor,
              textColor
            };
          });

          setLeaders(mappedLeaders);
          setIsLive(true);
          setDataSource("live");
          setCacheTime(null);
          try {
            const cacheData = {
              timestamp: Date.now(),
              data: mappedLeaders
            };
            localStorage.setItem("algo_leaderboard_cache", JSON.stringify(cacheData));
          } catch (e) {
            console.error("Failed to cache leaderboard data:", e);
          }
        }
      } catch (error) {
        console.warn("Cyber Terminal offline. Booting simulation profile arrays.", error);
        if (isMounted) {
          let fallback: LeaderNode[] = [];
          let loadedFromCache = false;
          
          try {
            const cached = localStorage.getItem("algo_leaderboard_cache");
            if (cached) {
              const parsed = JSON.parse(cached);
              if (parsed && typeof parsed.timestamp === "number" && !isNaN(parsed.timestamp) && Array.isArray(parsed.data) && parsed.data.length > 0) {
                fallback = parsed.data;
                setCacheTime(parsed.timestamp);
                setDataSource("cache");
                loadedFromCache = true;
              }
            }
          } catch (e) {
            console.error("Failed to parse cached leaderboard:", e);
          }

          if (!loadedFromCache) {
            fallback = [
              { username: "Ajay Dhangar", totalScore: 12500, attemptsCount: 84, avatarUrl: "https://github.com/ajay-dhangar.png", profileUrl: "https://github.com/ajay-dhangar", rank: 1, tier: "APEX LEGEND", accentColor: "from-amber-400 via-orange-500 to-yellow-500", textColor: "text-amber-600 dark:text-amber-400" },
              { username: "Jane_DevOps", totalScore: 8400, attemptsCount: 56, avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", profileUrl: "#", rank: 2, tier: "GRANDMASTER", accentColor: "from-purple-500 via-fuchsia-500 to-pink-500", textColor: "text-purple-600 dark:text-purple-400" },
              { username: "NeonNinja", totalScore: 6150, attemptsCount: 41, avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", profileUrl: "#", rank: 3, tier: "MASTER", accentColor: "from-emerald-500 to-teal-400", textColor: "text-emerald-600 dark:text-emerald-400" },
              { username: "StackOverlord", totalScore: 4200, attemptsCount: 28, avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", profileUrl: "#", rank: 4, tier: "DIAMOND", accentColor: "from-blue-500 to-indigo-500", textColor: "text-blue-600 dark:text-blue-400" }
            ];
            setDataSource("mock");
          }
          setLeaders(fallback);
          setIsLive(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCyberMetrics();
    return () => { isMounted = false; };
  }, []);

  const podiumTopThree = useMemo(() => leaders.slice(0, 3), [leaders]);
  const rosterListing = useMemo(() => {
    return leaders.slice(3).filter(l => l.username.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [leaders, searchQuery]);

  const maximumScoreValue = useMemo(() => {
    if (leaders.length === 0) return 1;
    return Math.max(...leaders.map(l => l.totalScore));
  }, [leaders]);

  return (
    <Layout title="ALGO ARENA // LEADERBOARD" description="High-octane competitive programming ranking matrix tracking real-time codebase operations.">
      <main className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-mono relative overflow-hidden pb-32 transition-colors duration-300 selection:bg-cyan-500 selection:text-black">
        
        {/* Responsive Background Mesh Overlay Components */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293722_1px,transparent_1px),linear-gradient(to_bottom,#1f293722_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-70 dark:opacity-100" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full filter blur-[160px] pointer-events-none" />

        {/* HUD Header Panel Area */}
        <header className="relative z-10 max-w-6xl mx-auto pt-20 px-6 mb-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-semibold tracking-widest mb-6 uppercase text-slate-500 dark:text-neutral-400 shadow-sm dark:shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            {dataSource === "live" ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">ALGO_SERVER_CORE // CONNECTED</span>
              </span>
            ) : dataSource === "cache" ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" />
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  LOCAL_CACHE_BACKUP // {formattedAge || "LOADED"}
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                <span className="text-rose-500 dark:text-rose-400 font-bold">LOCAL_DATABASE_MIRROR // SNAPSHOT</span>
              </span>
            )}
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter uppercase mb-4 text-slate-900 dark:text-white">
            ARENA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-teal-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">RANKINGS</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-xl mx-auto tracking-wider uppercase font-sans">
            Top operator positions compiled directly from processing cycles within <span className="text-slate-800 dark:text-white border-b border-dashed border-slate-300 dark:border-neutral-700 font-mono">ajay-dhangar/algo</span>
          </p>
        </header>

        {/* 3D Holographic Podium Grid Layout */}
        {!loading && podiumTopThree.length > 0 && (
          <section className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end justify-center pt-10">
              
              {/* RANK #02: GRANDMASTER PODIUM */}
              {podiumTopThree[1] && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-neutral-900/60 backdrop-blur-md border border-purple-200 dark:border-purple-500/20 rounded-2xl p-6 text-center shadow-md dark:shadow-[0_0_30px_rgba(168,85,247,0.05)] order-2 md:order-1 relative group transition-colors duration-300"
                >
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-md bg-purple-600 dark:bg-purple-500 text-white dark:text-black text-[10px] font-black tracking-widest uppercase">RANK 02</div>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img src={podiumTopThree[1].avatarUrl} alt="" className="w-full h-full rounded-full object-cover p-1 ring-2 ring-purple-400 dark:ring-purple-500/50 bg-slate-50 dark:bg-neutral-950" />
                  </div>
                  <h3 className="text-base font-bold truncate text-slate-900 dark:text-white mb-1 m-0">{podiumTopThree[1].username}</h3>
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-black tracking-wider mb-4">{podiumTopThree[1].totalScore.toLocaleString()} XP</div>
                  <div className="text-[9px] font-black tracking-widest px-2.5 py-1 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 rounded-lg uppercase inline-block">
                    {podiumTopThree[1].tier}
                  </div>
                </motion.div>
              )}

              {/* RANK #01: THE APEX LEGEND CHAMPION */}
              {podiumTopThree[0] && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1.05, y: -10 }}
                  whileHover={{ scale: 1.07, y: -14 }}
                  className="bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black border-2 border-amber-400 dark:border-amber-500/40 rounded-2xl p-8 text-center shadow-xl dark:shadow-[0_0_50px_rgba(245,158,11,0.15)] order-1 md:order-2 relative group z-20 transition-colors duration-300"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 bg-amber-500 text-white dark:text-black rounded-xl flex items-center justify-center shadow-md dark:shadow-[0_0_20px_rgba(245,158,11,0.4)] font-black text-base transform rotate-45">
                    <span className="transform -rotate-45">👑</span>
                  </div>
                  <div className="relative w-20 h-20 mx-auto mt-2 mb-4">
                    <img src={podiumTopThree[0].avatarUrl} alt="" className="w-full h-full rounded-full object-cover p-1 ring-4 ring-amber-500 bg-slate-50 dark:bg-neutral-950" />
                    <div className="absolute inset-0 rounded-full bg-amber-500/10 dark:bg-amber-500/20 opacity-100 blur-md animate-pulse pointer-events-none" />
                  </div>
                  <h3 className="text-lg font-black tracking-tight truncate text-slate-900 dark:text-white mb-1 m-0">{podiumTopThree[0].username}</h3>
                  <div className="text-base text-amber-600 dark:text-amber-400 font-black tracking-widest mb-4">{podiumTopThree[0].totalScore.toLocaleString()} XP</div>
                  <div className="text-[10px] font-black tracking-widest px-3 py-1 bg-amber-500 text-white dark:text-black rounded-lg shadow-sm dark:shadow-[0_0_15px_rgba(245,158,11,0.3)] uppercase inline-block">
                    {podiumTopThree[0].tier}
                  </div>
                </motion.div>
              )}

              {/* RANK #03: MASTER PODIUM */}
              {podiumTopThree[2] && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-neutral-900/60 backdrop-blur-md border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-6 text-center shadow-md dark:shadow-[0_0_30px_rgba(52,211,153,0.05)] order-3 relative group transition-colors duration-300"
                >
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-md bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black text-[10px] font-black tracking-widest uppercase">RANK 03</div>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img src={podiumTopThree[2].avatarUrl} alt="" className="w-full h-full rounded-full object-cover p-1 ring-2 ring-emerald-400 dark:ring-emerald-500/50 bg-slate-50 dark:bg-neutral-950" />
                  </div>
                  <h3 className="text-base font-bold truncate text-slate-900 dark:text-white mb-1 m-0">{podiumTopThree[2].username}</h3>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400 font-black tracking-wider mb-4">{podiumTopThree[2].totalScore.toLocaleString()} XP</div>
                  <div className="text-[9px] font-black tracking-widest px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-lg uppercase inline-block">
                    {podiumTopThree[2].tier}
                  </div>
                </motion.div>
              )}

            </div>
          </section>
        )}

        {/* Global Competitor Listing Board Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-colors duration-300">
            
            {/* Header / Filter Dashboard Sub-Panel Grid Frame */}
            <div className="p-5 border-b border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/30 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 animate-pulse" />
                <h2 className="text-xs font-black tracking-widest uppercase text-slate-400 dark:text-neutral-500 m-0">ACTIVE_ROSTER_STREAM</h2>
              </div>
              
              <div className="w-full md:max-w-sm relative flex items-center">
                <span className="absolute left-3.5 text-slate-400 dark:text-neutral-600 text-xs font-bold">⚡</span>
                <input 
                  type="text"
                  placeholder="SEARCH COMPETITOR ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs tracking-widest font-mono pl-9 pr-4 py-2.5 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-all uppercase placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                />
              </div>
            </div>

            {/* Processing State Loader View */}
            {loading && (
              <div className="py-24 text-center text-xs tracking-widest font-bold text-slate-400 dark:text-neutral-500">
                <div className="w-6 h-6 border-2 border-blue-500 dark:border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                COMPILING MATRIX REALTIME RANK PLACEMENTS...
              </div>
            )}

            {/* Roster Listing Matrix Map */}
            {!loading && (
              <motion.div layout className="divide-y divide-slate-100 dark:divide-neutral-900 bg-white dark:bg-black transition-colors duration-300">
                <AnimatePresence mode="popLayout">
                  {rosterListing.map((leader) => {
                    const progressRatio = (leader.totalScore / maximumScoreValue) * 100;
                    
                    return (
                      <motion.div
                        key={leader.username}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        layout
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 hover:bg-slate-50/50 dark:hover:bg-neutral-900/20 border-l-2 border-l-transparent hover:border-l-blue-500 dark:hover:border-l-cyan-500 transition-all duration-150 relative group"
                      >
                        {/* Identity Payload Sector */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          
                          <div className="w-8 font-mono text-xs font-black text-slate-300 dark:text-neutral-700 group-hover:text-slate-900 dark:group-hover:text-cyan-400 transition-colors">
                            #{String(leader.rank).padStart(2, "0")}
                          </div>

                          <div className="relative shrink-0">
                            <img src={leader.avatarUrl} alt="" className="w-10 h-10 rounded-xl object-cover bg-slate-100 dark:bg-neutral-900 p-0.5 border border-slate-200 dark:border-neutral-800" />
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <a 
                                href={leader.profileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm font-bold tracking-wide text-slate-800 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors block no-underline hover:no-underline"
                              >
                                {leader.username}
                              </a>
                              
                              <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded bg-gradient-to-r ${leader.accentColor} text-white dark:text-black uppercase`}>
                                {leader.tier}
                              </span>
                            </div>
                            
                            {/* Horizontal Graphic Telemetry Meter */}
                            <div className="w-full max-w-sm h-1 bg-slate-100 dark:bg-neutral-900 rounded-full mt-2 overflow-hidden border border-transparent dark:border-neutral-900 relative hidden sm:block">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progressRatio}%` }}
                                transition={{ duration: 0.6 }}
                                className={`h-full rounded-full bg-gradient-to-r ${leader.accentColor}`} 
                              />
                            </div>
                          </div>
                        </div>

                        {/* Telemetry Metrics Blocks */}
                        <div className="flex items-center justify-between sm:justify-end gap-8 bg-slate-50 dark:bg-neutral-950 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-slate-100 dark:border-neutral-900 sm:border-0 shrink-0 transition-colors duration-300">
                          <div className="text-left sm:text-right">
                            <span className="block text-[9px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">COMMITS</span>
                            <span className="text-xs font-bold text-slate-600 dark:text-neutral-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                              {leader.attemptsCount}
                            </span>
                          </div>
                          
                          <div className="text-right">
                            <span className="block text-[9px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">SCORE VOLUME</span>
                            <span className={`text-sm font-black ${leader.textColor} dark:group-hover:text-cyan-300 transition-all`}>
                              {leader.totalScore.toLocaleString()}
                            </span>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Zero Filter Result Matches Block Container */}
            {!loading && rosterListing.length === 0 && (
              <div className="py-24 text-center border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-black transition-colors duration-300">
                <div className="text-xs font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">
                  CRITICAL_ERROR // NO OPERATORS MATCH PARAMS DETECTED
                </div>
              </div>
            )}

          </div>
        </section>

      </main>
    </Layout>
  );
};

export default Leaderboard;