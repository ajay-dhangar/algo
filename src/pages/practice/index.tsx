import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@theme/Layout";
import { TOPICS } from "../../data/practiceProblems";
import type { Difficulty, Problem, TopicData } from "../../data/practiceProblems";
import { safeJsonParse } from "../../utils/safeStorage";
import DailyChallengeWidget from "../../components/DailyChallengeWidget";

const LEETCODE_BASE = "https://leetcode.com/problems/";

const DIFFICULTY_CONFIG: Record<Difficulty, { color: string; bg: string; border: string; rawColor: string }> = {
  Easy:   { color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-900/50", rawColor: "#10b981" },
  Medium: { color: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-900/50", rawColor: "#f59e0b" },
  Hard:   { color: "text-rose-700 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-950/30", border: "border-rose-200 dark:border-rose-900/50", rawColor: "#ef4444" },
};

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

function problemKey(topic: string, problem: Problem) {
  return `${topic}|${problem.id}|${problem.slug}`;
}

function allProblemsForTopic(topic: string, data: TopicData) {
  const seen = new Set<string>();
  const result: { key: string; problem: Problem; difficulty: Difficulty }[] = [];
  for (const diff of DIFFICULTIES) {
    if (data.problems[diff]) {
      for (const p of data.problems[diff]) {
        const k = problemKey(topic, p);
        if (!seen.has(k)) {
          seen.add(k);
          result.push({ key: k, problem: p, difficulty: diff });
        }
      }
    }
  }
  return result;
}

// ─── Sidebar Component ────────────────────────────────────────────────────────

const Sidebar: React.FC<{
  solved: Set<string>;
  onToggle: (key: string) => void;
  onClose: () => void;
  isMobile: boolean;
}> = ({ solved, onToggle, onClose, isMobile }) => {
  const allEntries = useMemo(() =>
    Object.entries(TOPICS).flatMap(([topic, data]) =>
      allProblemsForTopic(topic, data).map((e) => ({ ...e, topic }))
    ), []);

  const total       = allEntries.length;
  const solvedCount = allEntries.filter((e) => solved.has(e.key)).length;
  const pct         = total > 0 ? Math.round((solvedCount / total) * 100) : 0;
  
  const easySolved  = allEntries.filter((e) => e.difficulty === "Easy"   && solved.has(e.key)).length;
  const medSolved   = allEntries.filter((e) => e.difficulty === "Medium" && solved.has(e.key)).length;
  const hardSolved  = allEntries.filter((e) => e.difficulty === "Hard"   && solved.has(e.key)).length;
  
  const easyTotal   = allEntries.filter((e) => e.difficulty === "Easy").length;
  const medTotal    = allEntries.filter((e) => e.difficulty === "Medium").length;
  const hardTotal   = allEntries.filter((e) => e.difficulty === "Hard").length;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--ifm-background-color)]">
      {/* Progress Card Section */}
      <div className="p-5 border-b border-[var(--ifm-color-emphasis-200)] bg-[var(--ifm-color-emphasis-100)]/30">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-sm uppercase tracking-wider text-[var(--ifm-color-emphasis-600)]">Overall Analytics</span>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--ifm-color-emphasis-200)] text-[var(--ifm-color-emphasis-600)] hover:text-[var(--ifm-color-emphasis-900)] transition-colors border-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-extrabold tracking-tight text-[var(--ifm-color-primary)]">{pct}%</span>
          <span className="text-xs font-medium text-[var(--ifm-color-emphasis-500)]">Completed ({solvedCount}/{total})</span>
        </div>

        <div className="h-2 bg-[var(--ifm-color-emphasis-200)] rounded-full overflow-hidden mb-4 shadow-inner">
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Easy", s: easySolved, t: easyTotal, cfg: DIFFICULTY_CONFIG.Easy },
            { label: "Med", s: medSolved, t: medTotal, cfg: DIFFICULTY_CONFIG.Medium },
            { label: "Hard", s: hardSolved, t: hardTotal, cfg: DIFFICULTY_CONFIG.Hard },
          ].map(({ label, s, t, cfg }) => (
            <div key={label} className={`rounded-xl p-2.5 text-center border border-solid ${cfg.border} ${cfg.bg}`}>
              <div className={`text-base font-bold leading-none ${cfg.color}`}>{s}</div>
              <div className={`text-[10px] font-semibold tracking-wide uppercase mt-1 opacity-80 ${cfg.color}`}>{label}: {t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Checklist Tracker */}
      <div className="flex-1 overflow-y-auto divide-y divide-solid divide-[var(--ifm-color-emphasis-100)]">
        {Object.entries(TOPICS).map(([topic, data]) => {
          const entries = allProblemsForTopic(topic, data);
          const topicSolvedCount = entries.filter((e) => solved.has(e.key)).length;
          const allDone = topicSolvedCount === entries.length && entries.length > 0;
          
          return (
            <div key={topic} className="p-3 bg-[var(--ifm-background-color)]">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-xs font-bold text-[var(--ifm-color-emphasis-700)] truncate max-w-[70%]">
                  {data.icon} <span className="ml-1">{topic}</span>
                </span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${allDone ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold" : "bg-[var(--ifm-color-emphasis-100)] text-[var(--ifm-color-emphasis-600)]"}`}>
                  {topicSolvedCount}/{entries.length}
                </span>
              </div>
              <div className="space-y-1">
                {entries.map(({ key, problem, difficulty }) => {
                  const done = solved.has(key);
                  return (
                    <button
                      key={key}
                      onClick={() => onToggle(key)}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-lg border border-solid transition-all duration-150 text-left cursor-pointer min-h-[38px] ${
                        done 
                          ? "bg-emerald-500/5 border-emerald-500/10 hover:bg-emerald-500/10" 
                          : "bg-transparent border-transparent hover:bg-[var(--ifm-color-emphasis-100)]"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${
                        done ? "bg-emerald-600 text-white" : "border-2 border-solid border-[var(--ifm-color-emphasis-400)] bg-transparent"
                      }`}>
                        {done && (
                          <svg width="10" height="8" viewBox="0 0 8 6" fill="none" className="stroke-current">
                            <path d="M1 3L3 5L7 1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`flex-1 text-xs truncate ${done ? "text-[var(--ifm-color-emphasis-400)] line-through" : "text-[var(--ifm-color-emphasis-800)] font-medium"}`}>
                        <span className="opacity-50 mr-1 font-mono">#{problem.id}</span>
                        {problem.title}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: DIFFICULTY_CONFIG[difficulty].rawColor }} />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex md:hidden">
        {/* Backdrop overlay filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-[300px] h-full shadow-2xl z-10 border-r border-solid border-[var(--ifm-color-emphasis-200)] overflow-hidden"
        >
          {sidebarContent}
        </motion.aside>
      </div>
    );
  }

  return (
    <motion.aside
      className="hidden md:flex flex-col sticky w-[300px] shrink-0 border-r border-solid border-[var(--ifm-color-emphasis-200)] bg-[var(--ifm-background-color)]"
      style={{ top: "var(--ifm-navbar-height, 60px)", height: "calc(100vh - var(--ifm-navbar-height, 60px))" }}
    >
      {sidebarContent}
    </motion.aside>
  );
};

// ─── ProblemRow Component ─────────────────────────────────────────────────────

const ProblemRow: React.FC<{
  problem: Problem; difficulty: Difficulty; topic: string;
  solved: Set<string>; onToggle: (key: string) => void;
}> = ({ problem, difficulty, topic, solved, onToggle }) => {
  const key  = problemKey(topic, problem);
  const done = solved.has(key);
  const url  = `${LEETCODE_BASE}${problem.slug}/`;
  const cfg  = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-[var(--ifm-color-emphasis-100)] transition-colors group">
      {/* Larger checkbox interaction boundary zone */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(key); }}
        aria-label={done ? "Mark unsolved" : "Mark solved"}
        className={`w-5 h-5 rounded-md flex-shrink-0 cursor-pointer flex items-center justify-center transition-all p-0 border-solid ${
          done ? "bg-emerald-600 border-transparent text-white" : "bg-transparent border-2 border-[var(--ifm-color-emphasis-300)] hover:border-[var(--ifm-color-primary)]"
        }`}
      >
        {done && (
          <svg width="11" height="9" viewBox="0 0 9 7" fill="none" className="stroke-current">
            <path d="M1 3.5L3.5 6L8 1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      
      <a 
        href={url} target="_blank" rel="noopener noreferrer"
        className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0 no-underline text-inherit transition-opacity ${done ? "opacity-40" : "opacity-100"}`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs font-mono text-[var(--ifm-color-emphasis-400)] shrink-0">#{problem.id}</span>
          <span className={`text-[14px] font-medium text-[var(--ifm-color-emphasis-800)] truncate ${done ? "line-through" : ""}`}>
            {problem.title}
          </span>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md border border-solid ${cfg.bg} ${cfg.color} ${cfg.border}`}>
            {difficulty}
          </span>
          <span className="text-xs font-bold text-[var(--ifm-color-primary)] opacity-0 group-hover:opacity-100 hidden sm:inline-block transition-all duration-150 transform translate-x-2 group-hover:translate-x-0">
            Solve →
          </span>
        </div>
      </a>
    </div>
  );
};

// ─── TopicCard Component ──────────────────────────────────────────────────────

const TopicCard: React.FC<{
  name: string; data: TopicData; index: number;
  solved: Set<string>; onToggle: (key: string) => void;
}> = ({ name, data, index, solved, onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const allEntries  = useMemo(() => allProblemsForTopic(name, data), [name, data]);
  const solvedCount = allEntries.filter((e) => solved.has(e.key)).length;
  const topicPct    = allEntries.length > 0 ? Math.round((solvedCount / allEntries.length) * 100) : 0;
  const allDone     = solvedCount === allEntries.length && allEntries.length > 0;

  return (
    <motion.div
      className="border border-solid border-[var(--ifm-color-emphasis-200)] hover:border-[var(--ifm-color-emphasis-300)] rounded-xl overflow-hidden bg-[var(--ifm-background-color)] shadow-sm hover:shadow-md transition-all duration-200"
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.35 }}
    >
      <button
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-transparent border-none cursor-pointer gap-4 text-inherit min-h-[64px]"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl w-9 h-9 flex items-center justify-center bg-[var(--ifm-color-emphasis-100)] rounded-xl shrink-0" aria-hidden="true">
            {data.icon}
          </span>
          <span className="text-sm sm:text-base font-bold text-[var(--ifm-color-emphasis-900)] truncate text-left">{name}</span>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-16 h-1.5 bg-[var(--ifm-color-emphasis-200)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${topicPct}%`,
                  background: allDone ? "#10b981" : "var(--ifm-color-primary)",
                }}
              />
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-md font-semibold ${allDone ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400" : "bg-[var(--ifm-color-emphasis-100)] text-[var(--ifm-color-emphasis-500)]"}`}>
            {solvedCount}/{allEntries.length}
          </span>
          <span className={`text-lg text-[var(--ifm-color-emphasis-400)] transition-transform duration-200 transform ${expanded ? "rotate-90" : ""}`}>
            ›
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-t border-solid border-[var(--ifm-color-emphasis-200)] bg-[var(--ifm-color-emphasis-100)]/10 overflow-hidden"
          >
            <div className="p-4 sm:p-5 space-y-4 divide-y divide-solid divide-[var(--ifm-color-emphasis-200)]/50">
              {DIFFICULTIES.map((difficulty, di) => {
                const problems = data.problems[difficulty] || [];
                if (problems.length === 0) return null;
                const diffSolved = problems.filter((p) => solved.has(problemKey(name, p))).length;
                
                return (
                  <div key={difficulty} className={di === 0 ? "" : "pt-4"}>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className={`text-[11px] font-bold tracking-wider uppercase ${DIFFICULTY_CONFIG[difficulty].color}`}>
                        {difficulty}
                      </span>
                      <span className="text-xs font-medium text-[var(--ifm-color-emphasis-400)]">
                        • {diffSolved} of {problems.length} completed
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {problems.map((problem) => (
                        <ProblemRow
                          key={`${problem.id}-${problem.slug}`}
                          problem={problem}
                          difficulty={difficulty}
                          topic={name}
                          solved={solved}
                          onToggle={onToggle}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main Practice Page Component ─────────────────────────────────────────────

const Practice: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Difficulty | "All">("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [solved, setSolved] = useState<Set<string>>(new Set());

  // Mount logic to safely bootstrap standard LocalStorage states in dynamic SSR
  useEffect(() => {
    try {
      setSolved(new Set(safeJsonParse<string[]>("leetcode_solved", [])));
    } catch (e) {
      console.error("Failed parsing problem registry context state data:", e);
    }
  }, []);

  const toggleSolved = (key: string) => {
    setSolved((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      localStorage.setItem("leetcode_solved", JSON.stringify([...next]));
      return next;
    });
  };

  const filteredTopics = useMemo(() => {
    return Object.entries(TOPICS).filter(([name]) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Layout title="Practice Platform" description="Track and master curated algorithmic dynamic processing paradigms by structural taxonomy.">
      <div className="flex relative min-w-0 w-full bg-[var(--ifm-background-color)]">
        
        {/* Responsive Drawer & Sidebar Column Assembly */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <Sidebar 
              solved={solved} 
              onToggle={toggleSolved} 
              onClose={() => setSidebarOpen(false)} 
              isMobile={true} 
            />
          )}
        </AnimatePresence>
        
        <Sidebar 
          solved={solved} 
          onToggle={toggleSolved} 
          onClose={() => setSidebarOpen(false)} 
          isMobile={false} 
        />

        {/* Content Workspace Core Wrapper */}
        <main className="flex-1 min-w-0 w-full mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24">
          
          {/* Dashboard Header Banner Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6">
            <div>
              <motion.h1 
                className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5"
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              >
                Problem Matrix
              </motion.h1>
              <p className="text-sm sm:text-base m-0 font-medium">
                Curated programmatic coding structures map index. Pick an execution path to start debugging.
              </p>
            </div>

            {/* Mobile Analytics Indicator Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-solid border-[var(--ifm-color-emphasis-200)] bg-[var(--ifm-color-emphasis-100)] text-sm font-bold text-[var(--ifm-color-emphasis-700)] hover:bg-[var(--ifm-color-emphasis-200)] transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-current">
                <rect x="2" y="2" width="12" height="12" rx="2" strokeWidth="1.5"/>
                <path d="M5 8.5L7 10.5L11 6.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View Analytics
            </button>
          </div>

          <div className="mb-6">
            <DailyChallengeWidget />
          </div>

          {/* Filtering Controls Infrastructure Area */}
          <div className="flex flex-col md:flex-row gap-3.5 mb-6 items-stretch md:items-center justify-between">
            {/* Realtime Regex Engine Filter Box Input */}
            <div className="relative flex-1">
              <svg
                width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ifm-color-emphasis-400)] pointer-events-none"
              >
                <path d="M10 6.5C10 8.43 8.43 10 6.5 10C4.57 10 3 8.43 3 6.5C3 4.57 4.57 3 6.5 3C8.43 3 10 4.57 10 6.5ZM9.3 10.01C8.57 10.63 7.58 11 6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 7.58 10.63 8.57 10.01 9.3L13.35 12.65C13.55 12.84 13.55 13.16 13.35 13.35C13.16 13.55 12.84 13.55 12.65 13.35L9.3 10.01Z" fill="currentColor"/>
              </svg>
              <input
                type="text"
                placeholder="Search topics (e.g., Arrays, Dynamic Programming)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 border border-solid border-[var(--ifm-color-emphasis-300)] rounded-xl text-sm bg-[var(--ifm-background-color)] text-[var(--ifm-color-emphasis-900)] outline-none transition-all focus:border-[var(--ifm-color-primary)] focus:ring-2 focus:ring-[var(--ifm-color-primary)]/20 shadow-sm"
              />
            </div>

            {/* Horizontal Filter Control Pills */}
            <div className="overflow-x-auto pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
              <div className="flex gap-1.5" role="group" aria-label="Filter cards by difficulty index metrics">
                {(["All", "Easy", "Medium", "Hard"] as const).map((d) => {
                  const isActive = filter === d;
                  const activePillClasses: Record<string, string> = {
                    All:    "bg-[var(--ifm-color-primary)] border-[var(--ifm-color-primary)] text-white shadow-sm",
                    Easy:   "bg-emerald-600 border-emerald-600 text-white shadow-sm",
                    Medium: "bg-amber-600 border-amber-600 text-white shadow-sm",
                    Hard:   "bg-rose-600 border-rose-600 text-white shadow-sm",
                  };

                  return (
                    <button
                      key={d}
                      onClick={() => setFilter(d)}
                      className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide cursor-pointer border border-solid transition-all whitespace-nowrap min-h-[36px] ${
                        isActive
                          ? activePillClasses[d]
                          : "border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-background-color)] text-[var(--ifm-color-emphasis-600)] hover:border-[var(--ifm-color-primary)] hover:text-[var(--ifm-color-primary)]"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Core Problem Target Stack Area */}
          <div className="space-y-3">
            {filteredTopics.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-[var(--ifm-color-emphasis-300)] bg-[var(--ifm-color-emphasis-100)]/20">
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="text-base font-bold text-[var(--ifm-color-emphasis-800)] m-0">No Matching Topics Found</h3>
                <p className="text-sm text-[var(--ifm-color-emphasis-500)] mt-1 max-w-xs mx-auto">
                  Adjust your current keywords or clear the search path parameters to retry.
                </p>
              </div>
            ) : (
              filteredTopics
                .filter(([_, data]) => filter === "All" || (data.problems[filter as Difficulty] && data.problems[filter as Difficulty].length > 0))
                .map(([name, data], i) => {
                  const filteredData = filter === "All" ? data : {
                    ...data,
                    problems: {
                      Easy:   filter === "Easy"   ? data.problems.Easy   : [],
                      Medium: filter === "Medium" ? data.problems.Medium : [],
                      Hard:   filter === "Hard"   ? data.problems.Hard   : [],
                    },
                  };
                  return (
                    <TopicCard
                      key={name}
                      name={name}
                      data={filteredData}
                      index={i}
                      solved={solved}
                      onToggle={toggleSolved}
                    />
                  );
                })
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Practice;