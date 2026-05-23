import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@theme/Layout";
import { TOPICS } from "../../data/practiceProblems";
import type { Difficulty, Problem, TopicData } from "../../data/practiceProblems";

const LEETCODE_BASE = "https://leetcode.com/problems/";

const DIFFICULTY_CONFIG: Record<Difficulty, { color: string; bg: string; border: string }> = {
  Easy:   { color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0" },
  Medium: { color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  Hard:   { color: "#b91c1c", bg: "#fef2f2", border: "#fecaca" },
};

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

function problemKey(topic: string, problem: Problem) {
  return `${topic}|${problem.id}|${problem.slug}`;
}

function allProblemsForTopic(topic: string, data: TopicData) {
  const seen = new Set<string>();
  const result: { key: string; problem: Problem; difficulty: Difficulty }[] = [];
  for (const diff of DIFFICULTIES) {
    for (const p of data.problems[diff]) {
      const k = problemKey(topic, p);
      if (!seen.has(k)) { seen.add(k); result.push({ key: k, problem: p, difficulty: diff }); }
    }
  }
  return result;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const Sidebar: React.FC<{
  solved: Set<string>;
  onToggle: (key: string) => void;
  onClose: () => void;
}> = ({ solved, onToggle, onClose }) => {
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

  return (
    <motion.aside
      key="sidebar"
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -280, opacity: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      style={{
        width: 268,
        top: "var(--ifm-navbar-height, 60px)",
        height: "calc(100vh - var(--ifm-navbar-height, 60px))",
      }}
      className="flex-shrink-0 sticky overflow-y-auto bg-[var(--ifm-background-color)] border-r border-[var(--ifm-color-emphasis-200)] flex flex-col z-10"
    >
      {/* Header */}
      <div className="px-4 pt-[1.125rem] pb-4 border-b border-[var(--ifm-color-emphasis-200)]">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-[0.9375rem] text-[var(--ifm-color-emphasis-900)]">Progress</span>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="bg-transparent border-none cursor-pointer p-1 text-[var(--ifm-color-emphasis-500)] text-base leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex items-baseline gap-1.5 mb-[0.625rem]">
          <span className="text-[2.25rem] font-extrabold leading-none text-[var(--ifm-color-primary)]">{pct}%</span>
          <span className="text-[0.8125rem] text-[var(--ifm-color-emphasis-500)]">{solvedCount} / {total} solved</span>
        </div>

        <div className="h-1.5 bg-[var(--ifm-color-emphasis-200)] rounded-full overflow-hidden mb-[0.875rem]">
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--ifm-color-primary), #a855f7)" }}
          />
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {([
            { label: "Easy",   s: easySolved, t: easyTotal,  color: "#15803d", bg: "#f0fdf4" },
            { label: "Medium", s: medSolved,  t: medTotal,   color: "#b45309", bg: "#fffbeb" },
            { label: "Hard",   s: hardSolved, t: hardTotal,  color: "#b91c1c", bg: "#fef2f2" },
          ] as const).map(({ label, s, t, color, bg }) => (
            <div key={label} style={{ background: bg }} className="rounded-lg py-1.5 text-center">
              <div style={{ color }} className="text-lg font-bold leading-none">{s}</div>
              <div style={{ color }} className="text-[0.625rem] opacity-75 mt-0.5">{label} / {t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="flex-1 overflow-y-auto py-1.5">
        {Object.entries(TOPICS).map(([topic, data]) => {
          const entries = allProblemsForTopic(topic, data);
          const topicSolvedCount = entries.filter((e) => solved.has(e.key)).length;
          const allDone = topicSolvedCount === entries.length;
          return (
            <div key={topic} className="border-b border-[var(--ifm-color-emphasis-100)]">
              <div className="flex items-center justify-between px-4 pt-2 pb-[0.3rem]">
                <span className="text-[0.6875rem] font-bold uppercase tracking-[0.05em] text-[var(--ifm-color-emphasis-500)]">
                  {data.icon} {topic}
                </span>
                <span
                  className={`text-[0.6875rem] ${allDone ? "text-green-700 font-semibold" : "text-[var(--ifm-color-emphasis-400)] font-normal"}`}
                >
                  {topicSolvedCount}/{entries.length}
                </span>
              </div>
              {entries.map(({ key, problem, difficulty }) => {
                const done = solved.has(key);
                return (
                  <button
                    key={key}
                    onClick={() => onToggle(key)}
                    className={`w-full flex items-start gap-2 py-1 pr-4 pl-3.5 border-none cursor-pointer text-left transition-colors duration-[120ms] ${done ? "bg-green-700/5" : "bg-transparent"}`}
                  >
                    <span
                      className={`w-[15px] h-[15px] rounded-[4px] flex-shrink-0 mt-0.5 inline-flex items-center justify-center transition-all duration-150 ${
                        done ? "bg-green-700 border-0" : "bg-transparent border-[1.5px] border-[var(--ifm-color-emphasis-300)]"
                      }`}
                    >
                      {done && (
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span
                      className={`flex-1 text-[0.775rem] leading-snug ${
                        done
                          ? "text-[var(--ifm-color-emphasis-400)] line-through"
                          : "text-[var(--ifm-color-emphasis-800)]"
                      }`}
                    >
                      <span className="text-[var(--ifm-color-emphasis-400)] mr-0.5">#{problem.id}</span>
                      {problem.title}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[5px] opacity-80"
                      style={{ background: DIFFICULTY_CONFIG[difficulty].color }}
                    />
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
};

// ─── Problem Row ──────────────────────────────────────────────────────────────

const ProblemRow: React.FC<{
  problem: Problem; difficulty: Difficulty; topic: string;
  solved: Set<string>; onToggle: (key: string) => void;
}> = ({ problem, difficulty, topic, solved, onToggle }) => {
  const key  = problemKey(topic, problem);
  const done = solved.has(key);
  const url  = `${LEETCODE_BASE}${problem.slug}/`;
  const cfg  = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="flex items-center gap-1.5 py-0.5">
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(key); }}
        aria-label={done ? "Mark unsolved" : "Mark solved"}
        className={`w-[17px] h-[17px] rounded-[4px] flex-shrink-0 cursor-pointer flex items-center justify-center transition-all duration-150 p-0 ${
          done ? "bg-green-700 border-0" : "bg-transparent border-[1.5px] border-[var(--ifm-color-emphasis-300)]"
        }`}
      >
        {done && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      <motion.a
        href={url} target="_blank" rel="noopener noreferrer"
        whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`group no-underline flex items-center gap-3 flex-1 px-3 py-[0.45rem] rounded-lg hover:bg-[var(--ifm-color-emphasis-100)] cursor-pointer text-inherit transition-colors ${done ? "opacity-50" : "opacity-100"}`}
      >
        <span className="text-xs text-[var(--ifm-color-emphasis-500)] font-mono min-w-[42px]">#{problem.id}</span>
        <span className={`text-[0.9rem] text-[var(--ifm-color-emphasis-800)] flex-1 whitespace-nowrap overflow-hidden text-ellipsis ${done ? "line-through" : ""}`}>
          {problem.title}
        </span>
        <span
          className="text-[0.6875rem] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          {difficulty}
        </span>
        <span className="text-[0.8125rem] font-semibold text-[var(--ifm-color-primary)] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          Solve →
        </span>
      </motion.a>
    </div>
  );
};

// ─── Topic Card ───────────────────────────────────────────────────────────────

const TopicCard: React.FC<{
  name: string; data: TopicData; index: number;
  solved: Set<string>; onToggle: (key: string) => void;
}> = ({ name, data, index, solved, onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const allEntries  = useMemo(() => allProblemsForTopic(name, data), [name, data]);
  const solvedCount = allEntries.filter((e) => solved.has(e.key)).length;
  const topicPct    = allEntries.length > 0 ? Math.round((solvedCount / allEntries.length) * 100) : 0;
  const allDone     = solvedCount === allEntries.length;

  return (
    <motion.div
      className="border border-[var(--ifm-color-emphasis-200)] hover:border-[var(--ifm-color-emphasis-400)] rounded-xl overflow-hidden bg-[var(--ifm-background-color)] transition-colors duration-150"
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 bg-transparent border-none cursor-pointer gap-4 text-inherit"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xl leading-none w-8 h-8 flex items-center justify-center bg-[var(--ifm-color-emphasis-100)] rounded-lg flex-shrink-0"
            aria-hidden="true"
          >
            {data.icon}
          </span>
          <span className="text-base font-semibold text-[var(--ifm-color-emphasis-900)]">{name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-[52px] h-1 bg-[var(--ifm-color-emphasis-200)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-[400ms] ease-out"
                style={{
                  width: `${topicPct}%`,
                  background: allDone ? "#15803d" : "var(--ifm-color-primary)",
                }}
              />
            </div>
            <span
              className={`text-[0.6875rem] min-w-[26px] ${allDone ? "text-green-700 font-semibold" : "text-[var(--ifm-color-emphasis-400)] font-normal"}`}
            >
              {solvedCount}/{allEntries.length}
            </span>
          </div>
          <span
            className={`text-xl text-[var(--ifm-color-emphasis-400)] leading-none inline-block transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
          >
            ›
          </span>
        </div>
      </button>

      {expanded && (
        <motion.div
          className="border-t border-[var(--ifm-color-emphasis-200)] overflow-hidden"
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
        >
          {DIFFICULTIES.map((difficulty, di) => {
            const diffSolved = data.problems[difficulty].filter((p) => solved.has(problemKey(name, p))).length;
            return (
              <div
                key={difficulty}
                className={`px-5 pt-4 ${di === DIFFICULTIES.length - 1 ? "pb-4" : "pb-1"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[0.8125rem] font-bold uppercase tracking-[0.06em]"
                    style={{ color: DIFFICULTY_CONFIG[difficulty].color }}
                  >
                    {difficulty}
                  </span>
                  <span className="text-xs text-[var(--ifm-color-emphasis-500)]">
                    {diffSolved}/{data.problems[difficulty].length} solved
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {data.problems[difficulty].map((problem) => (
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
        </motion.div>
      )}
    </motion.div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Practice: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Difficulty | "All">("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [solved, setSolved] = useState<Set<string>>(() => {
  if (typeof window === "undefined") return new Set();
  try {
    const saved = localStorage.getItem("leetcode_solved");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch {
    return new Set();
  }
});

const toggleSolved = (key: string) => {
  setSolved((prev) => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    localStorage.setItem("leetcode_solved", JSON.stringify([...next]));
    return next;
  });
};

  const filteredTopics = Object.entries(TOPICS).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const PILL_ACTIVE: Record<string, string> = {
    All:    "bg-[var(--ifm-color-primary)] border-[var(--ifm-color-primary)] text-white",
    Easy:   "bg-green-700 border-green-700 text-white",
    Medium: "bg-[#b45309] border-[#b45309] text-white",
    Hard:   "bg-[#b91c1c] border-[#b91c1c] text-white",
  };

  return (
    <Layout title="Practice" description="Practice coding skills with curated LeetCode problems by topic and difficulty.">
      {/* practice-shell */}
      <div className="flex min-h-[calc(100vh-var(--ifm-navbar-height,60px))] items-start">
        <AnimatePresence>
          {sidebarOpen && <Sidebar solved={solved} onToggle={toggleSolved} onClose={() => setSidebarOpen(false)} />}
        </AnimatePresence>

        {/* practice-page */}
        <div className="flex-1 max-w-[860px] mx-auto px-6 pt-12 pb-20 min-w-0">

          {/* Hero */}
          <div className="mb-10">
            <motion.h1
              className="text-[2.25rem] font-bold tracking-[-0.03em] mb-2 text-[var(--ifm-color-emphasis-900)] md:text-[1.75rem]"
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              Practice Problems
            </motion.h1>
            <motion.p
              className="text-base text-[var(--ifm-color-emphasis-600)] m-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
            >
              Curated LeetCode problems by topic and difficulty. Click any problem to open it on LeetCode.
            </motion.p>
          </div>

          {/* Controls */}
          <div className="flex gap-3 mb-6 flex-wrap items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <svg
                width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"
                className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[var(--ifm-color-emphasis-500)] pointer-events-none"
              >
                <path d="M10 6.5C10 8.43 8.43 10 6.5 10C4.57 10 3 8.43 3 6.5C3 4.57 4.57 3 6.5 3C8.43 3 10 4.57 10 6.5ZM9.3 10.01C8.57 10.63 7.58 11 6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 7.58 10.63 8.57 10.01 9.3L13.35 12.65C13.55 12.84 13.55 13.16 13.35 13.35C13.16 13.55 12.84 13.55 12.65 13.35L9.3 10.01Z" fill="currentColor"/>
              </svg>
              <input
                type="text"
                placeholder="Search topics…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search topics"
                className="w-full py-2 pl-9 pr-3 border border-[var(--ifm-color-emphasis-300)] rounded-lg text-sm bg-[var(--ifm-background-color)] text-[var(--ifm-color-emphasis-900)] outline-none transition-colors duration-150 focus:border-[var(--ifm-color-primary)]"
              />
            </div>

            {/* Filter pills */}
            <div className="flex gap-1.5" role="group" aria-label="Filter by difficulty">
              {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setFilter(d)}
                  className={`px-3.5 py-1.5 rounded-full text-[0.8125rem] font-medium cursor-pointer border transition-all duration-150 ${
                    filter === d
                      ? PILL_ACTIVE[d]
                      : "border-[var(--ifm-color-emphasis-300)] bg-transparent text-[var(--ifm-color-emphasis-700)] hover:border-[var(--ifm-color-primary)] hover:text-[var(--ifm-color-primary)]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Progress toggle */}
            {!sidebarOpen && (
              <button
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.8125rem] font-medium cursor-pointer border border-[var(--ifm-color-emphasis-300)] bg-transparent text-[var(--ifm-color-emphasis-700)] hover:border-[var(--ifm-color-primary)] hover:text-[var(--ifm-color-primary)] transition-all duration-150 whitespace-nowrap"
                onClick={() => setSidebarOpen(true)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M4 7L6.5 9.5L10 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Progress
              </button>
            )}
          </div>

          {/* Topics list */}
          <div className="flex flex-col gap-3">
            {filteredTopics.length === 0 ? (
              <div className="text-center py-12 px-4 text-[var(--ifm-color-emphasis-500)] text-[0.9375rem]">
                No topics match your search.
              </div>
            ) : (
              filteredTopics
                .filter(([_, data]) => filter === "All" || data.problems[filter as Difficulty].length > 0)
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
        </div>
      </div>
    </Layout>
  );
};

export default Practice;