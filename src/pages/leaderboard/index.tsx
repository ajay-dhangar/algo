// @ts-nocheck
import Layout from "@theme/Layout";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

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

interface ChallengePlayer {
  username: string;
  avatarUrl: string;
  profileUrl: string;
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  xp: number;
  accuracy: number;
  streak: number;
  rank: number;
  tier: string;
  accentColor: string;
  textColor: string;
  categories: string[];
  lastActive: string;
}

// ─── XP weights ───────────────────────────────────────────────────────────────
const XP = { Easy: 100, Medium: 250, Hard: 500 };

// ─── Tiers ────────────────────────────────────────────────────────────────────
function getTier(xp: number, rank: number): Pick<ChallengePlayer, "tier" | "accentColor" | "textColor"> {
  if (rank === 1)  return { tier: "APEX LEGEND",  accentColor: "from-amber-400 via-orange-500 to-yellow-500", textColor: "text-amber-500 dark:text-amber-400" };
  if (rank === 2)  return { tier: "GRANDMASTER",  accentColor: "from-purple-500 via-fuchsia-500 to-pink-500",  textColor: "text-purple-500 dark:text-purple-400" };
  if (rank === 3)  return { tier: "MASTER",        accentColor: "from-emerald-500 to-teal-400",                textColor: "text-emerald-500 dark:text-emerald-400" };
  if (xp >= 8000)  return { tier: "DIAMOND",       accentColor: "from-blue-500 to-indigo-500",                 textColor: "text-blue-500 dark:text-blue-400" };
  if (xp >= 4000)  return { tier: "PLATINUM",      accentColor: "from-cyan-500 to-blue-500",                   textColor: "text-cyan-600 dark:text-cyan-400" };
  if (xp >= 1500)  return { tier: "GOLD",          accentColor: "from-yellow-500 to-amber-400",                textColor: "text-yellow-600 dark:text-yellow-400" };
  return              { tier: "SILVER",        accentColor: "from-slate-400 to-slate-500",                textColor: "text-slate-500 dark:text-slate-400" };
}

// ─── Mock challenge players (realistic demo data) ─────────────────────────────
const MOCK_CHALLENGE_PLAYERS: Omit<ChallengePlayer, "rank" | "tier" | "accentColor" | "textColor">[] = [
  { username: "ajay-dhangar",  avatarUrl: "https://github.com/ajay-dhangar.png",    profileUrl: "https://github.com/ajay-dhangar",   solved: 68, easy: 25, medium: 28, hard: 15, xp: 68*250,  accuracy: 94, streak: 21, categories: ["Trees","Graphs","DP"],     lastActive: "2 hours ago" },
  { username: "codeNinja_47",  avatarUrl: "https://github.com/gaearon.png",         profileUrl: "https://github.com/gaearon",         solved: 55, easy: 22, medium: 23, hard: 10, xp: 55*210,  accuracy: 91, streak: 14, categories: ["Greedy","Sorting"],        lastActive: "5 hours ago" },
  { username: "leetmaster_x",  avatarUrl: "https://github.com/sindresorhus.png",    profileUrl: "https://github.com/sindresorhus",    solved: 49, easy: 20, medium: 20, hard: 9,  xp: 49*195,  accuracy: 88, streak: 9,  categories: ["DP","Trees"],             lastActive: "1 day ago" },
  { username: "algo_wizard",   avatarUrl: "https://github.com/tj.png",              profileUrl: "https://github.com/tj",              solved: 41, easy: 18, medium: 17, hard: 6,  xp: 41*170,  accuracy: 85, streak: 6,  categories: ["Graphs","DP"],            lastActive: "1 day ago" },
  { username: "graph_lord",    avatarUrl: "https://github.com/addyosmani.png",      profileUrl: "https://github.com/addyosmani",      solved: 36, easy: 15, medium: 16, hard: 5,  xp: 36*155,  accuracy: 83, streak: 5,  categories: ["Graphs"],                 lastActive: "2 days ago" },
  { username: "dp_queen",      avatarUrl: "https://github.com/kentcdodds.png",      profileUrl: "https://github.com/kentcdodds",      solved: 30, easy: 14, medium: 12, hard: 4,  xp: 30*140,  accuracy: 80, streak: 3,  categories: ["DP","Sorting"],           lastActive: "2 days ago" },
  { username: "sortingHat99",  avatarUrl: "https://github.com/yyx990803.png",       profileUrl: "https://github.com/yyx990803",       solved: 25, easy: 12, medium: 10, hard: 3,  xp: 25*125,  accuracy: 79, streak: 2,  categories: ["Sorting","Greedy"],       lastActive: "3 days ago" },
  { username: "tree_traverser",avatarUrl: "https://github.com/rauchg.png",          profileUrl: "https://github.com/rauchg",          solved: 19, easy: 10, medium: 7,  hard: 2,  xp: 19*110,  accuracy: 76, streak: 1,  categories: ["Trees"],                  lastActive: "4 days ago" },
];

// ─── Parse localStorage → ChallengePlayer for the current user ────────────────
function parseLocalProgress(): Omit<ChallengePlayer, "rank" | "tier" | "accentColor" | "textColor"> | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("algo_progress");
    if (!raw) return null;
    const progress = JSON.parse(raw);

    // Get all solved challenge IDs (keys that are true and don't end in _title/_updatedAt)
    const solvedKeys = Object.keys(progress).filter(
      (k) => !k.endsWith("_title") && !k.endsWith("_updatedAt") && progress[k] === true
    );
    if (solvedKeys.length === 0) return null;

    // Figure out difficulty per solved challenge by matching against known challenge data
    // We use simple heuristics: key prefixes identify the track, we score flat for now
    let easy = 0, medium = 0, hard = 0;
    solvedKeys.forEach((key) => {
      // challenge keys written by ProgressTracker have slugs; we check the title key for hints
      const title = (progress[`${key}_title`] || "").toLowerCase();
      if (title.includes("fibonacci") || title.includes("climbing") || title.includes("coin change (min") || title.includes("house robber") || title.includes("min cost") || title.includes("dfs") || title.includes("bfs") || title.includes("connected") || title.includes("find path") || title.includes("traversal") || title.includes("max depth") || title.includes("leaf") || title.includes("sum of") || title.includes("symmetric") || title.includes("assign") || title.includes("lemonade") || title.includes("flowers") || title.includes("absolute")) {
        easy++;
      } else if (title.includes("hard") || title.includes("serialize") || title.includes("vertical") || title.includes("construct") || title.includes("max path") || title.includes("recover") || title.includes("dijkstra") || title.includes("bellman") || title.includes("floyd") || title.includes("spanning") || title.includes("strongly") || title.includes("coin change ii") || title.includes("matrix chain") || title.includes("palindromic") || title.includes("rod cutting") || title.includes("egg") || title.includes("bitmask") || title.includes("job sequencing") || title.includes("huffman") || title.includes("platforms") || title.includes("ropes") || title.includes("reorganize") || title.includes("k digits") || title.includes("course schedule iii")) {
        hard++;
      } else {
        medium++;
      }
    });

    const xp = easy * XP.Easy + medium * XP.Medium + hard * XP.Hard;
    const accuracy = Math.min(99, 70 + Math.floor(solvedKeys.length * 0.4));

    // Get user identity from GitHub auth if available, else use a generic name
    const storedUser = (() => { try { return JSON.parse(localStorage.getItem("algo_user") || "{}"); } catch { return {}; } })();
    const username = storedUser?.login || storedUser?.username || "You";
    const avatarUrl = storedUser?.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${username}`;

    const categories = [...new Set(solvedKeys.map(k => {
      const t = (progress[`${k}_title`] || "").toLowerCase();
      if (t.includes("tree") || t.includes("traversal") || t.includes("bst") || t.includes("leaf") || t.includes("depth")) return "Trees";
      if (t.includes("graph") || t.includes("dfs") || t.includes("bfs") || t.includes("dijkstra") || t.includes("bellman") || t.includes("floyd") || t.includes("spanning") || t.includes("bipartite") || t.includes("topological")) return "Graphs";
      if (t.includes("fibonacci") || t.includes("knapsack") || t.includes("lcs") || t.includes("lis") || t.includes("edit") || t.includes("coin") || t.includes("climbing") || t.includes("robber") || t.includes("decode") || t.includes("unique path")) return "DP";
      if (t.includes("sort") || t.includes("bubble") || t.includes("merge") || t.includes("quick") || t.includes("heap")) return "Sorting";
      if (t.includes("greedy") || t.includes("activity") || t.includes("knapsack frac") || t.includes("lemonade") || t.includes("jump") || t.includes("gas")) return "Greedy";
      return null;
    }).filter(Boolean))];

    return {
      username,
      avatarUrl,
      profileUrl: storedUser?.html_url || "#",
      solved: solvedKeys.length,
      easy, medium, hard,
      xp,
      accuracy,
      streak: (() => { try { return Number(localStorage.getItem("algo_streak") || 0); } catch { return 0; } })(),
      categories: categories.length > 0 ? categories : ["—"],
      lastActive: "Just now",
    };
  } catch {
    return null;
  }
}

// ─── Tab switcher button ───────────────────────────────────────────────────────
function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer ${
        active
          ? "bg-slate-900 dark:bg-cyan-500 text-white dark:text-black border-slate-900 dark:border-cyan-500 shadow-md"
          : "bg-white dark:bg-neutral-900 text-slate-500 dark:text-neutral-400 border-slate-200 dark:border-neutral-800 hover:border-slate-400 dark:hover:border-neutral-600"
      }`}
    >
      {children}
    </button>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-sm font-black font-mono ${color}`}>{value}</div>
      <div className="text-[8px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase mt-0.5">{label}</div>
    </div>
  );
}

// ─── Challenge podium card ─────────────────────────────────────────────────────
function ChallengePodiumCard({ player, position }: { player: ChallengePlayer; position: 1 | 2 | 3 }) {
  const isFirst = position === 1;
  const borderColor = isFirst ? "border-amber-400 dark:border-amber-500/40" : position === 2 ? "border-purple-300 dark:border-purple-500/20" : "border-emerald-300 dark:border-emerald-500/20";
  const ringColor   = isFirst ? "ring-4 ring-amber-500" : position === 2 ? "ring-2 ring-purple-400 dark:ring-purple-500/50" : "ring-2 ring-emerald-400 dark:ring-emerald-500/50";
  const rankLabel   = position === 2 ? "RANK 02" : "RANK 03";
  const rankBg      = position === 2 ? "bg-purple-600 dark:bg-purple-500" : "bg-emerald-600 dark:bg-emerald-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: isFirst ? 20 : 30 }}
      animate={{ opacity: 1, y: isFirst ? -10 : 0, scale: isFirst ? 1.05 : 1 }}
      whileHover={{ y: isFirst ? -14 : -4, scale: isFirst ? 1.07 : 1.02 }}
      className={`relative bg-white dark:bg-neutral-900/60 backdrop-blur-md border-2 ${borderColor} rounded-2xl p-6 text-center shadow-md transition-colors duration-300 ${isFirst ? "z-20 p-8" : ""}`}
    >
      {isFirst && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-md font-black text-base rotate-45">
          <span className="-rotate-45">👑</span>
        </div>
      )}
      {!isFirst && (
        <div className={`absolute -top-3 ${position === 2 ? "left-6" : "right-6"} px-3 py-0.5 rounded-md ${rankBg} text-white text-[10px] font-black tracking-widest uppercase`}>
          {rankLabel}
        </div>
      )}

      <div className={`relative w-20 h-20 mx-auto ${isFirst ? "mt-2 mb-4" : "mb-4"}`}>
        <img src={player.avatarUrl} alt="" className={`w-full h-full rounded-full object-cover p-1 ${ringColor} bg-slate-50 dark:bg-neutral-950`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${player.username}`; }} />
        {isFirst && <div className="absolute inset-0 rounded-full bg-amber-500/10 dark:bg-amber-500/20 blur-md animate-pulse pointer-events-none" />}
      </div>

      <h3 className={`font-black tracking-tight truncate text-slate-900 dark:text-white mb-1 m-0 ${isFirst ? "text-lg" : "text-base"}`}>{player.username}</h3>
      <div className={`font-black tracking-widest mb-3 ${player.textColor} ${isFirst ? "text-base" : "text-sm"}`}>{player.xp.toLocaleString()} XP</div>
      <div className={`text-[9px] font-black tracking-widest px-2.5 py-1 bg-gradient-to-r ${player.accentColor} text-white rounded-lg uppercase inline-block mb-4`}>{player.tier}</div>

      <div className="flex justify-center gap-4 border-t border-slate-100 dark:border-neutral-800 pt-3 mt-1">
        <StatPill label="Solved" value={player.solved} color="text-slate-700 dark:text-white" />
        <StatPill label="Accuracy" value={`${player.accuracy}%`} color="text-emerald-600 dark:text-emerald-400" />
        <StatPill label="Streak" value={`${player.streak}d`} color="text-amber-600 dark:text-amber-400" />
      </div>
    </motion.div>
  );
}

// ─── Challenge roster row ──────────────────────────────────────────────────────
function ChallengeRow({ player, maxXp, isMe }: { player: ChallengePlayer; maxXp: number; isMe: boolean }) {
  const progress = (player.xp / maxXp) * 100;

  return (
    <motion.div
      key={player.username}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.99 }}
      layout
      className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-neutral-900/30 border-l-2 transition-all duration-150 relative group ${isMe ? "border-l-cyan-500 bg-cyan-50/30 dark:bg-cyan-500/5" : "border-l-transparent hover:border-l-cyan-500"}`}
    >
      {/* identity */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-8 font-mono text-xs font-black text-slate-300 dark:text-neutral-700 group-hover:text-slate-900 dark:group-hover:text-cyan-400 transition-colors shrink-0">
          #{String(player.rank).padStart(2, "0")}
        </div>

        <div className="relative shrink-0">
          <img src={player.avatarUrl} alt="" className="w-10 h-10 rounded-xl object-cover bg-slate-100 dark:bg-neutral-900 p-0.5 border border-slate-200 dark:border-neutral-800" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${player.username}`; }} />
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <a href={player.profileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-wide text-slate-800 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors no-underline">
              {player.username}
            </a>
            {isMe && <span className="text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded bg-cyan-500 text-white uppercase">YOU</span>}
            <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded bg-gradient-to-r ${player.accentColor} text-white uppercase`}>{player.tier}</span>
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-full max-w-[160px] h-1 bg-slate-100 dark:bg-neutral-900 rounded-full overflow-hidden hidden sm:block">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.7 }} className={`h-full rounded-full bg-gradient-to-r ${player.accentColor}`} />
            </div>
            <div className="flex gap-1 flex-wrap">
              {player.categories.slice(0, 3).map((cat) => (
                <span key={cat} className="text-[7px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-neutral-900 text-slate-500 dark:text-neutral-500 border border-slate-200 dark:border-neutral-800 uppercase">{cat}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* metrics */}
      <div className="flex items-center justify-between sm:justify-end gap-5 bg-slate-50 dark:bg-neutral-950 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-slate-100 dark:border-neutral-900 sm:border-0 shrink-0 transition-colors duration-300">
        <div className="text-center">
          <div className="text-[8px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">Easy</div>
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{player.easy}</div>
        </div>
        <div className="text-center">
          <div className="text-[8px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">Med</div>
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{player.medium}</div>
        </div>
        <div className="text-center">
          <div className="text-[8px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">Hard</div>
          <div className="text-xs font-bold text-red-600 dark:text-red-400">{player.hard}</div>
        </div>
        <div className="text-center hidden sm:block">
          <div className="text-[8px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">Acc.</div>
          <div className="text-xs font-bold text-slate-600 dark:text-neutral-300">{player.accuracy}%</div>
        </div>
        <div className="text-right">
          <div className="text-[8px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">XP Score</div>
          <div className={`text-sm font-black ${player.textColor}`}>{player.xp.toLocaleString()}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const Leaderboard: React.FC = () => {
  // ── GitHub tab state ──
  const [leaders, setLeaders] = useState<LeaderNode[]>([]);
  const [ghLoading, setGhLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cacheTime, setCacheTime] = useState<number | null>(null);
  const [dataSource, setDataSource] = useState<"live" | "cache" | "mock">("mock");
  const [formattedAge, setFormattedAge] = useState<string>("");

  // ── Tab state ──
  const [activeTab, setActiveTab] = useState<"github" | "challenges">("github");

  // ── Challenge tab state ──
  const [challengePlayers, setChallengePlayers] = useState<ChallengePlayer[]>([]);
  const [challengeSearch, setChallengeSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"xp" | "solved" | "accuracy" | "streak">("xp");
  const [filterDiff, setFilterDiff] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
  const [myEntry, setMyEntry] = useState<ChallengePlayer | null>(null);

  // ─── Build challenge leaderboard on mount ──────────────────────────────────
  useEffect(() => {
    const me = parseLocalProgress();

    // Merge real user into mock list if they have progress
    let pool = [...MOCK_CHALLENGE_PLAYERS];
    if (me) {
      // Remove any existing "You" placeholder
      pool = pool.filter((p) => p.username !== "You");
      pool.push(me);
    }

    // Sort by chosen metric (default XP)
    pool.sort((a, b) => b.xp - a.xp);

    // Assign rank and tier
    const ranked: ChallengePlayer[] = pool.map((p, i) => {
      const tierInfo = getTier(p.xp, i + 1);
      return { ...p, rank: i + 1, ...tierInfo };
    });

    setChallengePlayers(ranked);
    if (me) {
      const meRanked = ranked.find((p) => p.username === me.username);
      if (meRanked) setMyEntry(meRanked);
    }
  }, []);

  // ─── Re-sort challenge leaderboard when sortBy changes ─────────────────────
  useEffect(() => {
    if (challengePlayers.length === 0) return;
    const sorted = [...challengePlayers].sort((a, b) => {
      if (sortBy === "xp")       return b.xp - a.xp;
      if (sortBy === "solved")   return b.solved - a.solved;
      if (sortBy === "accuracy") return b.accuracy - a.accuracy;
      if (sortBy === "streak")   return b.streak - a.streak;
      return 0;
    });
    const reranked = sorted.map((p, i) => ({ ...p, rank: i + 1, ...getTier(p.xp, i + 1) }));
    setChallengePlayers(reranked);
    if (myEntry) {
      const me = reranked.find((p) => p.username === myEntry.username);
      if (me) setMyEntry(me);
    }
  }, [sortBy]);

  // ─── GitHub cache age ticker ───────────────────────────────────────────────
  useEffect(() => {
    if (!cacheTime) return;
    const updateAge = () => {
      const diffMs = Math.max(0, Date.now() - cacheTime);
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr  = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHr / 24);
      if (diffSec < 60)  return setFormattedAge("JUST NOW");
      if (diffMin < 60)  return setFormattedAge(`${diffMin}M AGO`);
      if (diffHr < 24)   return setFormattedAge(`${diffHr}H AGO`);
      setFormattedAge(`${diffDay}D AGO`);
    };
    updateAge();
    const iv = setInterval(updateAge, 60000);
    return () => clearInterval(iv);
  }, [cacheTime]);

  // ─── Fetch GitHub contributors ─────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    async function fetchCyberMetrics() {
      try {
        const response = await axios.get<GitHubContributor[]>(
          "https://api.github.com/repos/ajay-dhangar/algo/contributors",
          { params: { per_page: 100 } }
        );
        if (response.data && Array.isArray(response.data) && isMounted) {
          const mapped: LeaderNode[] = response.data.map((user, idx) => {
            const rank = idx + 1;
            const score = user.contributions * 150;
            let tier = "PLATINUM", accent = "from-cyan-500 to-blue-500", text = "text-cyan-600 dark:text-cyan-400";
            if (rank === 1) { tier = "APEX LEGEND"; accent = "from-amber-400 via-orange-500 to-yellow-500"; text = "text-amber-600 dark:text-amber-400"; }
            else if (rank === 2) { tier = "GRANDMASTER"; accent = "from-purple-500 via-fuchsia-500 to-pink-500"; text = "text-purple-600 dark:text-purple-400"; }
            else if (rank === 3) { tier = "MASTER"; accent = "from-emerald-500 to-teal-400"; text = "text-emerald-600 dark:text-emerald-400"; }
            else if (score > 3000) { tier = "DIAMOND"; accent = "from-blue-500 to-indigo-500"; text = "text-blue-600 dark:text-blue-400"; }
            return { username: user.login, totalScore: score, attemptsCount: user.contributions, avatarUrl: user.avatar_url, profileUrl: user.html_url, rank, tier, accentColor: accent, textColor: text };
          });
          setLeaders(mapped);
          setIsLive(true);
          setDataSource("live");
          setCacheTime(null);
          try { localStorage.setItem("algo_leaderboard_cache", JSON.stringify({ timestamp: Date.now(), data: mapped })); } catch {}
        }
      } catch (error) {
        if (!isMounted) return;
        let fallback: LeaderNode[] = [];
        let fromCache = false;
        try {
          const cached = localStorage.getItem("algo_leaderboard_cache");
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed?.timestamp && Array.isArray(parsed?.data) && parsed.data.length > 0) {
              fallback = parsed.data;
              setCacheTime(parsed.timestamp);
              setDataSource("cache");
              fromCache = true;
            }
          }
        } catch {}
        if (!fromCache) {
          fallback = [
            { username: "Ajay Dhangar", totalScore: 12500, attemptsCount: 84, avatarUrl: "https://github.com/ajay-dhangar.png", profileUrl: "https://github.com/ajay-dhangar", rank: 1, tier: "APEX LEGEND", accentColor: "from-amber-400 via-orange-500 to-yellow-500", textColor: "text-amber-600 dark:text-amber-400" },
            { username: "Jane_DevOps",  totalScore: 8400,  attemptsCount: 56, avatarUrl: "https://github.com/gaearon.png",       profileUrl: "#",                               rank: 2, tier: "GRANDMASTER", accentColor: "from-purple-500 via-fuchsia-500 to-pink-500",  textColor: "text-purple-600 dark:text-purple-400" },
            { username: "NeonNinja",    totalScore: 6150,  attemptsCount: 41, avatarUrl: "https://github.com/sindresorhus.png",  profileUrl: "#",                               rank: 3, tier: "MASTER",      accentColor: "from-emerald-500 to-teal-400",                textColor: "text-emerald-600 dark:text-emerald-400" },
            { username: "StackOverlord",totalScore: 4200,  attemptsCount: 28, avatarUrl: "https://github.com/addyosmani.png",   profileUrl: "#",                               rank: 4, tier: "DIAMOND",     accentColor: "from-blue-500 to-indigo-500",                 textColor: "text-blue-600 dark:text-blue-400" },
          ];
          setDataSource("mock");
        }
        setLeaders(fallback);
        setIsLive(false);
      } finally {
        if (isMounted) setGhLoading(false);
      }
    }
    fetchCyberMetrics();
    return () => { isMounted = false; };
  }, []);

  // ─── Derived values ────────────────────────────────────────────────────────
  const ghPodium  = useMemo(() => leaders.slice(0, 3), [leaders]);
  const ghRoster  = useMemo(() => leaders.slice(3).filter(l => l.username.toLowerCase().includes(searchQuery.toLowerCase())), [leaders, searchQuery]);
  const ghMaxScore = useMemo(() => Math.max(...leaders.map(l => l.totalScore), 1), [leaders]);

  const chPodium  = useMemo(() => challengePlayers.slice(0, 3), [challengePlayers]);
  const chRoster  = useMemo(() => {
    return challengePlayers.slice(3).filter(p => {
      const matchSearch = p.username.toLowerCase().includes(challengeSearch.toLowerCase());
      const matchDiff = filterDiff === "All" || (filterDiff === "Easy" && p.easy > 0) || (filterDiff === "Medium" && p.medium > 0) || (filterDiff === "Hard" && p.hard > 0);
      return matchSearch && matchDiff;
    });
  }, [challengePlayers, challengeSearch, filterDiff]);
  const chMaxXp   = useMemo(() => Math.max(...challengePlayers.map(p => p.xp), 1), [challengePlayers]);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <Layout title="ALGO ARENA // LEADERBOARD" description="Competitive rankings for GitHub contributors and challenge solvers.">
      <main className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-mono relative overflow-hidden pb-32 transition-colors duration-300 selection:bg-cyan-500 selection:text-black">

        {/* Background mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293722_1px,transparent_1px),linear-gradient(to_bottom,#1f293722_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-70 dark:opacity-100" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full filter blur-[160px] pointer-events-none" />

        {/* ── Header ── */}
        <header className="relative z-10 max-w-6xl mx-auto pt-20 px-6 mb-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-semibold tracking-widest mb-6 uppercase text-slate-500 dark:text-neutral-400 shadow-sm">
            {activeTab === "github" ? (
              dataSource === "live" ? (
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee] animate-pulse" /><span className="text-cyan-600 dark:text-cyan-400 font-bold">GITHUB_CORE // CONNECTED</span></span>
              ) : dataSource === "cache" ? (
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse" /><span className="text-amber-600 dark:text-amber-400 font-bold">LOCAL_CACHE // {formattedAge || "LOADED"}</span></span>
              ) : (
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" /><span className="text-rose-500 font-bold">SNAPSHOT_MODE</span></span>
              )
            ) : (
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" /><span className="text-emerald-600 dark:text-emerald-400 font-bold">CHALLENGE_MATRIX // LIVE</span></span>
            )}
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter uppercase mb-4 text-slate-900 dark:text-white">
            ARENA{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-teal-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              RANKINGS
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-xl mx-auto tracking-wider uppercase font-sans mb-8">
            GitHub contribution elite meets challenge-solver power rankings
          </p>

          {/* ── Tab switcher ── */}
          <div className="inline-flex gap-2 p-1.5 bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-sm">
            <TabButton active={activeTab === "github"} onClick={() => setActiveTab("github")}>
              <span>⚡</span> GitHub Contributors
            </TabButton>
            <TabButton active={activeTab === "challenges"} onClick={() => setActiveTab("challenges")}>
              <span>🏆</span> Challenge Solvers
            </TabButton>
          </div>
        </header>

        <AnimatePresence mode="wait">

          {/* ════════════════════════════════════════════════════════════════════
              GITHUB TAB
          ════════════════════════════════════════════════════════════════════ */}
          {activeTab === "github" && (
            <motion.div key="github" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

              {/* GitHub podium */}
              {!ghLoading && ghPodium.length > 0 && (
                <section className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-10">
                    {ghPodium[1] && (
                      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} className="bg-white dark:bg-neutral-900/60 backdrop-blur-md border border-purple-200 dark:border-purple-500/20 rounded-2xl p-6 text-center shadow-md order-2 md:order-1 relative group transition-colors duration-300">
                        <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-md bg-purple-600 dark:bg-purple-500 text-white text-[10px] font-black tracking-widest uppercase">RANK 02</div>
                        <div className="relative w-20 h-20 mx-auto mb-4"><img src={ghPodium[1].avatarUrl} alt="" className="w-full h-full rounded-full object-cover p-1 ring-2 ring-purple-400 dark:ring-purple-500/50 bg-slate-50 dark:bg-neutral-950" /></div>
                        <h3 className="text-base font-bold truncate text-slate-900 dark:text-white mb-1 m-0">{ghPodium[1].username}</h3>
                        <div className="text-sm text-purple-600 dark:text-purple-400 font-black tracking-wider mb-4">{ghPodium[1].totalScore.toLocaleString()} XP</div>
                        <div className="text-[9px] font-black tracking-widest px-2.5 py-1 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 rounded-lg uppercase inline-block">{ghPodium[1].tier}</div>
                      </motion.div>
                    )}
                    {ghPodium[0] && (
                      <motion.div initial={{ opacity: 0, scale: 0.98, y: 20 }} animate={{ opacity: 1, scale: 1.05, y: -10 }} whileHover={{ scale: 1.07, y: -14 }} className="bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black border-2 border-amber-400 dark:border-amber-500/40 rounded-2xl p-8 text-center shadow-xl order-1 md:order-2 relative z-20 transition-colors duration-300">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 bg-amber-500 text-white rounded-xl flex items-center justify-center shadow-md font-black text-base rotate-45"><span className="-rotate-45">👑</span></div>
                        <div className="relative w-20 h-20 mx-auto mt-2 mb-4"><img src={ghPodium[0].avatarUrl} alt="" className="w-full h-full rounded-full object-cover p-1 ring-4 ring-amber-500 bg-slate-50 dark:bg-neutral-950" /><div className="absolute inset-0 rounded-full bg-amber-500/10 dark:bg-amber-500/20 blur-md animate-pulse pointer-events-none" /></div>
                        <h3 className="text-lg font-black tracking-tight truncate text-slate-900 dark:text-white mb-1 m-0">{ghPodium[0].username}</h3>
                        <div className="text-base text-amber-600 dark:text-amber-400 font-black tracking-widest mb-4">{ghPodium[0].totalScore.toLocaleString()} XP</div>
                        <div className="text-[10px] font-black tracking-widest px-3 py-1 bg-amber-500 text-white rounded-lg shadow-sm uppercase inline-block">{ghPodium[0].tier}</div>
                      </motion.div>
                    )}
                    {ghPodium[2] && (
                      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} className="bg-white dark:bg-neutral-900/60 backdrop-blur-md border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-6 text-center shadow-md order-3 relative group transition-colors duration-300">
                        <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-md bg-emerald-600 dark:bg-emerald-500 text-white text-[10px] font-black tracking-widest uppercase">RANK 03</div>
                        <div className="relative w-20 h-20 mx-auto mb-4"><img src={ghPodium[2].avatarUrl} alt="" className="w-full h-full rounded-full object-cover p-1 ring-2 ring-emerald-400 dark:ring-emerald-500/50 bg-slate-50 dark:bg-neutral-950" /></div>
                        <h3 className="text-base font-bold truncate text-slate-900 dark:text-white mb-1 m-0">{ghPodium[2].username}</h3>
                        <div className="text-sm text-emerald-600 dark:text-emerald-400 font-black tracking-wider mb-4">{ghPodium[2].totalScore.toLocaleString()} XP</div>
                        <div className="text-[9px] font-black tracking-widest px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-lg uppercase inline-block">{ghPodium[2].tier}</div>
                      </motion.div>
                    )}
                  </div>
                </section>
              )}

              {/* GitHub roster */}
              <section className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-colors duration-300">
                  <div className="p-5 border-b border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-cyan-400 animate-pulse" /><h2 className="text-xs font-black tracking-widest uppercase text-slate-400 dark:text-neutral-500 m-0">GITHUB_ROSTER_STREAM</h2></div>
                    <div className="w-full md:max-w-sm relative flex items-center">
                      <span className="absolute left-3.5 text-slate-400 text-xs font-bold">⚡</span>
                      <input type="text" placeholder="SEARCH CONTRIBUTOR ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs tracking-widest font-mono pl-9 pr-4 py-2.5 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-all uppercase placeholder:text-slate-400 dark:placeholder:text-neutral-600" />
                    </div>
                  </div>
                  {ghLoading && <div className="py-24 text-center text-xs tracking-widest font-bold text-slate-400 dark:text-neutral-500"><div className="w-6 h-6 border-2 border-blue-500 dark:border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />COMPILING MATRIX REALTIME RANK PLACEMENTS...</div>}
                  {!ghLoading && (
                    <motion.div layout className="divide-y divide-slate-100 dark:divide-neutral-900 bg-white dark:bg-black transition-colors duration-300">
                      <AnimatePresence mode="popLayout">
                        {ghRoster.map((leader) => (
                          <motion.div key={leader.username} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.99 }} layout className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 hover:bg-slate-50/50 dark:hover:bg-neutral-900/20 border-l-2 border-l-transparent hover:border-l-blue-500 dark:hover:border-l-cyan-500 transition-all duration-150 relative group">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="w-8 font-mono text-xs font-black text-slate-300 dark:text-neutral-700 group-hover:text-slate-900 dark:group-hover:text-cyan-400 transition-colors">#{String(leader.rank).padStart(2, "0")}</div>
                              <div className="relative shrink-0"><img src={leader.avatarUrl} alt="" className="w-10 h-10 rounded-xl object-cover bg-slate-100 dark:bg-neutral-900 p-0.5 border border-slate-200 dark:border-neutral-800" /><div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black" /></div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                  <a href={leader.profileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-wide text-slate-800 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors no-underline">{leader.username}</a>
                                  <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded bg-gradient-to-r ${leader.accentColor} text-white uppercase`}>{leader.tier}</span>
                                </div>
                                <div className="w-full max-w-sm h-1 bg-slate-100 dark:bg-neutral-900 rounded-full mt-2 overflow-hidden hidden sm:block">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${(leader.totalScore / ghMaxScore) * 100}%` }} transition={{ duration: 0.6 }} className={`h-full rounded-full bg-gradient-to-r ${leader.accentColor}`} />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-8 bg-slate-50 dark:bg-neutral-950 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-slate-100 dark:border-neutral-900 sm:border-0 shrink-0 transition-colors duration-300">
                              <div className="text-left sm:text-right"><span className="block text-[9px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">COMMITS</span><span className="text-xs font-bold text-slate-600 dark:text-neutral-400">{leader.attemptsCount}</span></div>
                              <div className="text-right"><span className="block text-[9px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">SCORE</span><span className={`text-sm font-black ${leader.textColor}`}>{leader.totalScore.toLocaleString()}</span></div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                  {!ghLoading && ghRoster.length === 0 && <div className="py-24 text-center border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-black transition-colors duration-300"><div className="text-xs font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">CRITICAL_ERROR // NO OPERATORS MATCH PARAMS</div></div>}
                </div>
              </section>
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              CHALLENGES TAB
          ════════════════════════════════════════════════════════════════════ */}
          {activeTab === "challenges" && (
            <motion.div key="challenges" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

              {/* "Your rank" banner if local progress found */}
              {myEntry && (
                <div className="relative z-10 max-w-6xl mx-auto px-6 mb-6">
                  <div className="flex flex-wrap items-center gap-4 p-4 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 rounded-2xl">
                    <img src={myEntry.avatarUrl} alt="" className="w-10 h-10 rounded-xl object-cover border border-cyan-300 dark:border-cyan-600" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${myEntry.username}`; }} />
                    <div>
                      <div className="text-[9px] font-black tracking-widest text-cyan-600 dark:text-cyan-400 uppercase mb-0.5">Your Current Rank</div>
                      <div className="text-sm font-black text-slate-800 dark:text-white">#{myEntry.rank} · {myEntry.username} · {myEntry.xp.toLocaleString()} XP · {myEntry.solved} solved</div>
                    </div>
                    <span className={`ml-auto text-[9px] font-black tracking-widest px-2.5 py-1 rounded-lg bg-gradient-to-r ${myEntry.accentColor} text-white uppercase`}>{myEntry.tier}</span>
                  </div>
                </div>
              )}

              {/* Challenge podium */}
              {chPodium.length >= 3 && (
                <section className="relative z-10 max-w-6xl mx-auto px-6 mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-10">
                    {chPodium[1] && <ChallengePodiumCard player={chPodium[1]} position={2} />}
                    {chPodium[0] && <ChallengePodiumCard player={chPodium[0]} position={1} />}
                    {chPodium[2] && <ChallengePodiumCard player={chPodium[2]} position={3} />}
                  </div>
                </section>
              )}

              {/* Challenge roster */}
              <section className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-colors duration-300">

                  {/* Roster header + filters */}
                  <div className="p-5 border-b border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/30 flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><h2 className="text-xs font-black tracking-widest uppercase text-slate-400 dark:text-neutral-500 m-0">CHALLENGE_SOLVER_MATRIX</h2></div>
                      <div className="w-full md:max-w-sm relative flex items-center">
                        <span className="absolute left-3.5 text-slate-400 text-xs font-bold">🔍</span>
                        <input type="text" placeholder="SEARCH SOLVER ID..." value={challengeSearch} onChange={(e) => setChallengeSearch(e.target.value)} className="w-full bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs tracking-widest font-mono pl-9 pr-4 py-2.5 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all uppercase placeholder:text-slate-400 dark:placeholder:text-neutral-600" />
                      </div>
                    </div>

                    {/* Sort + filter controls */}
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className="text-[9px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">Sort:</span>
                      {(["xp", "solved", "accuracy", "streak"] as const).map((key) => (
                        <button key={key} onClick={() => setSortBy(key)} className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase border transition-all cursor-pointer ${sortBy === key ? "bg-emerald-500 text-white border-emerald-500" : "bg-white dark:bg-neutral-900 text-slate-500 dark:text-neutral-500 border-slate-200 dark:border-neutral-800 hover:border-slate-400 dark:hover:border-neutral-600"}`}>
                          {key === "xp" ? "XP Score" : key === "solved" ? "Problems" : key === "accuracy" ? "Accuracy" : "Streak"}
                        </button>
                      ))}
                      <span className="text-[9px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase ml-2">Filter:</span>
                      {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                        <button key={d} onClick={() => setFilterDiff(d)} className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase border transition-all cursor-pointer ${filterDiff === d ? d === "Easy" ? "bg-emerald-500 text-white border-emerald-500" : d === "Medium" ? "bg-amber-500 text-white border-amber-500" : d === "Hard" ? "bg-red-500 text-white border-red-500" : "bg-slate-800 text-white border-slate-800 dark:bg-cyan-500 dark:border-cyan-500 dark:text-black" : "bg-white dark:bg-neutral-900 text-slate-500 dark:text-neutral-500 border-slate-200 dark:border-neutral-800 hover:border-slate-400 dark:hover:border-neutral-600"}`}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column headers */}
                  <div className="hidden sm:flex items-center gap-4 px-5 py-2 bg-slate-50 dark:bg-neutral-900/50 border-b border-slate-100 dark:border-neutral-900 text-[8px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">
                    <div className="w-8">#</div>
                    <div className="flex-1">Solver</div>
                    <div className="w-12 text-center">Easy</div>
                    <div className="w-12 text-center">Med</div>
                    <div className="w-12 text-center">Hard</div>
                    <div className="w-14 text-center">Acc.</div>
                    <div className="w-20 text-right">XP Score</div>
                  </div>

                  {/* Roster rows */}
                  <motion.div layout className="divide-y divide-slate-100 dark:divide-neutral-900 bg-white dark:bg-black transition-colors duration-300">
                    <AnimatePresence mode="popLayout">
                      {chRoster.map((player) => (
                        <ChallengeRow key={player.username} player={player} maxXp={chMaxXp} isMe={myEntry?.username === player.username} />
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {chRoster.length === 0 && (
                    <div className="py-20 text-center border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-black transition-colors duration-300">
                      <div className="text-3xl mb-3">🏆</div>
                      <div className="text-xs font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase mb-2">NO SOLVERS MATCH YOUR FILTER</div>
                      <button onClick={() => { setChallengeSearch(""); setFilterDiff("All"); }} className="text-[10px] font-black text-emerald-500 hover:text-emerald-400 tracking-widest uppercase cursor-pointer mt-1">Clear filters →</button>
                    </div>
                  )}

                  {/* XP legend footer */}
                  <div className="px-5 py-3 border-t border-slate-100 dark:border-neutral-900 bg-slate-50/50 dark:bg-neutral-900/30 flex flex-wrap items-center gap-4">
                    <span className="text-[8px] font-black tracking-widest text-slate-400 dark:text-neutral-600 uppercase">XP Weights:</span>
                    <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400">Easy = {XP.Easy} XP</span>
                    <span className="text-[8px] font-bold text-amber-600 dark:text-amber-400">Medium = {XP.Medium} XP</span>
                    <span className="text-[8px] font-bold text-red-600 dark:text-red-400">Hard = {XP.Hard} XP</span>
                    <span className="text-[8px] text-slate-400 dark:text-neutral-600 ml-auto">Solve challenges to climb the ranks ↑</span>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
};

export default Leaderboard;