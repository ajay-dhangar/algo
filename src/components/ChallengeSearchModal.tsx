import React, {

  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useHistory } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import challengeData from "../data/challengeData";
import { useFocusTrap } from "../hooks/useFocusTrap";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Challenge {
  title: string;
  description?: string;
  timeLimit?: string;
  link: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  category?: string;
  tags?: string[];
}

interface ChallengeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_CHALLENGES: Challenge[] = (challengeData as Challenge[]).filter(
  (c) => c.category // only show categorised challenges, skip the old 3 generic ones
);

const DIFF_STYLES = {
  Easy:   { pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/25", dot: "bg-emerald-500" },
  Medium: { pill: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200 dark:border-amber-500/25",       dot: "bg-amber-500" },
  Hard:   { pill: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 border-red-200 dark:border-red-500/25",                   dot: "bg-red-500" },
};

const CATEGORY_ICONS: Record<string, string> = {
  Trees:                "🌳",
  Graphs:               "🕸️",
  "Dynamic Programming": "🧩",
  DP:                   "🧩",
  Greedy:               "⚡",
  Sorting:              "↕️",
};

const CATEGORY_COLORS: Record<string, string> = {
  Trees:                "text-emerald-600 dark:text-emerald-400",
  Graphs:               "text-blue-600 dark:text-blue-400",
  "Dynamic Programming": "text-purple-600 dark:text-purple-400",
  DP:                   "text-purple-600 dark:text-purple-400",
  Greedy:               "text-amber-600 dark:text-amber-400",
  Sorting:              "text-cyan-600 dark:text-cyan-400",
};

const QUICK_FILTERS = [
  { label: "All",    value: "" },
  { label: "🌳 Trees",   value: "Trees" },
  { label: "🕸️ Graphs",  value: "Graphs" },
  { label: "🧩 DP",      value: "DP" },
  { label: "⚡ Greedy",  value: "Greedy" },
  { label: "↕️ Sorting", value: "Sorting" },
  { label: "Easy",   value: "Easy" },
  { label: "Medium", value: "Medium" },
  { label: "Hard",   value: "Hard" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-500/30 text-inherit rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function score(challenge: Challenge, query: string): number {
  const q = query.toLowerCase();
  const title = challenge.title.toLowerCase();
  const cat   = (challenge.category || "").toLowerCase();
  const diff  = (challenge.difficulty || "").toLowerCase();
  const tags  = (challenge.tags || []).join(" ").toLowerCase();
  const desc  = (challenge.description || "").toLowerCase();

  if (title === q)              return 100;
  if (title.startsWith(q))      return 90;
  if (title.includes(q))        return 80;
  if (cat === q || diff === q)  return 75;
  if (cat.includes(q) || diff.includes(q)) return 65;
  if (tags.includes(q))         return 55;
  if (desc.includes(q))         return 40;
  return 0;
}

// ─── Result Row ───────────────────────────────────────────────────────────────

function ResultRow({
  challenge,
  query,
  isActive,
  onHover,
  onClick,
}: {
  challenge: Challenge;
  query: string;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  const diff  = challenge.difficulty;
  const cat   = challenge.category || "";
  const icon  = CATEGORY_ICONS[cat] || "📋";
  const color = CATEGORY_COLORS[cat] || "text-slate-500";
  const ds    = diff ? DIFF_STYLES[diff] : null;

  return (
    <div
      onMouseMove={onHover}
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-100 ${
        isActive
          ? "bg-slate-100 dark:bg-slate-800/80"
          : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
      }`}
    >
      {/* Category icon */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${isActive ? "bg-white dark:bg-slate-700 shadow-sm" : "bg-slate-100 dark:bg-slate-800"}`}>
        {icon}
      </div>

      {/* Title + category */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 dark:text-white m-0 truncate leading-tight">
          {highlight(challenge.title, query)}
        </p>
        <p className={`text-[11px] font-semibold mt-0.5 m-0 ${color}`}>
          {cat}
        </p>
      </div>

      {/* Difficulty badge */}
      {ds && (
        <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${ds.pill}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${ds.dot}`} />
          {diff}
        </span>
      )}

      {/* Arrow — visible on active */}
      <svg
        className={`w-3.5 h-3.5 shrink-0 text-slate-400 transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function ChallengeSearchModal({
  isOpen,
  onClose,
}: ChallengeSearchModalProps) {
  const history = useHistory();
  const [query, setQuery]             = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef  = useRef<HTMLInputElement>(null);
  const listRef   = useRef<HTMLDivElement>(null);

  // ── Focus input when opened ──
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveFilter("");
      setActiveIndex(0);
      // Small delay so the modal has rendered before we focus
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── Filtered + scored results ──
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return ALL_CHALLENGES
      .filter((c) => {
        // Apply quick filter
        if (activeFilter) {
          const isDiff = ["Easy", "Medium", "Hard"].includes(activeFilter);
          if (isDiff) return c.difficulty === activeFilter;
          return c.category === activeFilter || c.tags?.includes(activeFilter);
        }
        return true;
      })
      .map((c) => ({ challenge: c, score: q ? score(c, q) : 50 }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.challenge)
      .slice(0, 12); // max 12 results
  }, [query, activeFilter]);

  // ── Reset active index when results change ──
  useEffect(() => {
    setActiveIndex(0);
  }, [results.length, query, activeFilter]);

  // ── Navigate to a challenge ──
  const navigate = useCallback(
    (challenge: Challenge) => {
      onClose();
      history.push(challenge.link);
    },
    [history, onClose]
  );

  // ── Keyboard navigation ──
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[activeIndex]) {
        navigate(results[activeIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [results, activeIndex, navigate, onClose]
  );

  // ── Scroll active item into view ──
  useEffect(() => {
    if (listRef.current) {
      const active = listRef.current.querySelector("[data-active='true']") as HTMLElement;
      active?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, { isOpen, onClose });

  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9998] flex items-start justify-center pt-[12vh] px-4 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Challenge Search"
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden flex flex-col"
        style={{ maxHeight: "min(600px, 80vh)" }}
      >
        {/* ── Search input ── */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          {/* Search icon */}
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search challenges by name, topic or difficulty…"
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none border-none font-sans"
          />

          {/* Clear button */}
          {hasQuery && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="shrink-0 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          {/* ESC badge */}
          <kbd className="shrink-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400">
            ESC
          </kbd>
        </div>

        {/* ── Quick filters ── */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none">
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setActiveFilter((prev) => prev === f.value ? "" : f.value);
                inputRef.current?.focus();
              }}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                activeFilter === f.value
                  ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Results ── */}
        <div ref={listRef} className="overflow-y-auto flex-1">
          {results.length > 0 ? (
            <>
              {/* Result count */}
              <div className="px-4 pt-2.5 pb-1">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase m-0">
                  {results.length} challenge{results.length !== 1 ? "s" : ""}
                  {activeFilter && <> in <span className="text-slate-600 dark:text-slate-300">{activeFilter}</span></>}
                  {hasQuery && <> matching <span className="text-slate-600 dark:text-slate-300">"{query}"</span></>}
                </p>
              </div>

              {results.map((challenge, i) => (
                <div key={challenge.link} data-active={i === activeIndex}>
                  <ResultRow
                    challenge={challenge}
                    query={query}
                    isActive={i === activeIndex}
                    onHover={() => setActiveIndex(i)}
                    onClick={() => navigate(challenge)}
                  />
                </div>
              ))}
            </>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
              <div className="text-3xl mb-3">🔍</div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 m-0">
                {hasQuery
                  ? `No challenges found for "${query}"`
                  : "No challenges match the selected filter"}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 m-0">
                Try a different keyword, difficulty, or topic
              </p>
              <button
                onClick={() => { setQuery(""); setActiveFilter(""); inputRef.current?.focus(); }}
                className="mt-4 text-xs font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
              >
                Clear filters →
              </button>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[10px] text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center w-4 h-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] font-semibold">↑</kbd>
              <kbd className="inline-flex items-center justify-center w-4 h-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] font-semibold">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center px-1 h-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] font-semibold">↵</kbd>
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center px-1 h-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] font-semibold">esc</kbd>
              close
            </span>
          </div>
          <Link
            to="/challenges"
            onClick={onClose}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors no-underline"
          >
            Browse all challenges →
          </Link>
        </div>
      </div>
    </div>
  );
}
