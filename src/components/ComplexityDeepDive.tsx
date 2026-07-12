// @ts-nocheck
/**
 * ComplexityDeepDive
 * ------------------
 * A collapsible "Complexity Deep Dive" panel that embeds directly inside any
 * challenge layout. It:
 *   1. Renders a live SVG chart of input-size vs. operations for the
 *      challenge's time complexity (extracted from complexity-visualizer.tsx)
 *   2. Shows a ComplexityCard with best / average / worst / space values
 *   3. Links to the full /complexity-visualizer page for deeper exploration
 *
 * Props:
 *   timeComplexity  — raw string from challenge data, e.g. "O(n log n) — each node visited once."
 *   spaceComplexity — raw string from challenge data, e.g. "O(h) — recursion stack."
 *   challengeTitle  — shown in the panel header
 */

import React, { useState, useMemo } from "react";
import { FaChartLine, FaChevronDown, FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";

// ─── Big-O function registry ──────────────────────────────────────────────────
const COMPLEXITY_FNS: Record<string, (n: number) => number> = {
  "O(1)":        ()  => 1,
  "O(log n)":    (n) => Math.log2(Math.max(n, 1)),
  "O(n)":        (n) => n,
  "O(n log n)":  (n) => n * Math.log2(Math.max(n, 1)),
  "O(n^2)":      (n) => n * n,
  "O(n²)":       (n) => n * n,
  "O(n^3)":      (n) => n * n * n,
  "O(2^n)":      (n) => Math.min(Math.pow(2, n), 1e6),
  "O(V + E)":    (n) => n + Math.floor(n * 1.5),   // approx edges ≈ 1.5n
  "O(V * E)":    (n) => n * Math.floor(n * 1.5),
  "O(V^2)":      (n) => n * n,
  "O(V^3)":      (n) => n * n * n,
  "O(n * W)":    (n) => n * n,                      // W ≈ n for the plot
  "O(n * sum)":  (n) => n * n,
  "O(E log V)":  (n) => Math.floor(n * 1.5) * Math.log2(Math.max(n, 1)),
  "O(E log E)":  (n) => Math.floor(n * 1.5) * Math.log2(Math.max(n * 1.5, 1)),
  "O(n^2 * 2^n)":(n) => n * n * Math.min(Math.pow(2, n), 1e6),
};

const COMPLEXITY_COLORS: Record<string, string> = {
  "O(1)":        "#10b981",
  "O(log n)":    "#3b82f6",
  "O(n)":        "#eab308",
  "O(n log n)":  "#f97316",
  "O(n^2)":      "#ef4444",
  "O(n²)":       "#ef4444",
  "O(n^3)":      "#d946ef",
  "O(V + E)":    "#eab308",
  "O(V * E)":    "#ef4444",
  "O(V^2)":      "#ef4444",
  "O(V^3)":      "#d946ef",
  "O(E log V)":  "#f97316",
  "O(E log E)":  "#f97316",
  "O(n * W)":    "#f97316",
  "O(n * sum)":  "#f97316",
  "O(2^n)":      "#8b5cf6",
  "O(n^2 * 2^n)":"#8b5cf6",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Extract the O(...) token from a complexity string like "O(n log n) — visit every node." */
function extractBigO(raw: string): string {
  const match = raw?.match(/O\([^)]+\)/);
  return match ? match[0] : "O(n)";
}

/** Find the best matching fn for a complexity string */
function resolveFn(bigO: string): (n: number) => number {
  if (COMPLEXITY_FNS[bigO]) return COMPLEXITY_FNS[bigO];
  // fuzzy fall-through
  if (bigO.includes("n!"))         return (n) => { let r = 1; for (let i = 2; i <= Math.min(n, 12); i++) r *= i; return r; };
  if (bigO.includes("2^n"))        return (n) => Math.min(Math.pow(2, n), 1e6);
  if (bigO.includes("n log n") || bigO.includes("n \\log n")) return (n) => n * Math.log2(Math.max(n, 1));
  if (bigO.includes("n^2") || bigO.includes("n²")) return (n) => n * n;
  if (bigO.includes("log"))        return (n) => Math.log2(Math.max(n, 1));
  if (bigO.includes("n"))          return (n) => n;
  return () => 1;
}

function resolveColor(bigO: string): string {
  if (COMPLEXITY_COLORS[bigO]) return COMPLEXITY_COLORS[bigO];
  if (bigO.includes("2^n") || bigO.includes("n!")) return "#8b5cf6";
  if (bigO.includes("n^2") || bigO.includes("n²")) return "#ef4444";
  if (bigO.includes("n log n"))    return "#f97316";
  if (bigO.includes("log"))        return "#3b82f6";
  if (bigO.includes("n"))          return "#eab308";
  return "#10b981";
}

// ─── Mini SVG Chart ───────────────────────────────────────────────────────────

interface MiniChartProps {
  timeBigO: string;
  spaceBigO: string;
}

function MiniChart({ timeBigO, spaceBigO }: MiniChartProps) {
  const [nValue, setNValue] = useState(40);

  const W = 520, H = 240, PAD = 40;

  const curves = useMemo(() => {
    const entries = [
      { label: timeBigO,  fn: resolveFn(timeBigO),  color: resolveColor(timeBigO),  dash: "none", width: 3 },
      { label: spaceBigO, fn: resolveFn(spaceBigO), color: resolveColor(spaceBigO), dash: "6,3",  width: 2 },
    ].filter((e, i, arr) => arr.findIndex(x => x.label === e.label) === i); // deduplicate if same

    // compute maxY across all curves
    let maxY = 1;
    curves?.forEach(() => {}); // placeholder
    entries.forEach(({ fn }) => {
      const v = fn(nValue);
      if (v > maxY && isFinite(v)) maxY = v;
    });
    maxY = Math.max(maxY, 1);

    return entries.map(({ label, fn, color, dash, width }) => {
      const steps = 50;
      const pts = Array.from({ length: steps + 1 }, (_, i) => {
        const n = (i / steps) * nValue;
        const x = PAD + (i / steps) * (W - 2 * PAD);
        let y = fn(n);
        if (!isFinite(y) || y > maxY) y = maxY;
        const yPx = H - PAD - (y / maxY) * (H - 2 * PAD);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${yPx.toFixed(1)}`;
      });
      return { label, color, dash, width, d: pts.join(" ") };
    });
  }, [timeBigO, spaceBigO, nValue]);

  return (
    <div className="space-y-3">
      {/* N slider */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase shrink-0">Input N:</span>
        <input
          type="range" min={5} max={80} value={nValue}
          onChange={e => setNValue(Number(e.target.value))}
          className="flex-1 cursor-pointer accent-blue-500"
        />
        <span className="text-xs font-mono font-bold text-blue-500 w-6 text-right">{nValue}</span>
      </div>

      {/* SVG chart */}
      <div className="w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 280, display: "block" }}>
          {/* Grid */}
          <g stroke="#1e293b" strokeWidth="1">
            {[0,1,2,3,4,5].map(i => {
              const y = PAD + (i / 5) * (H - 2 * PAD);
              return <line key={`h${i}`} x1={PAD} y1={y} x2={W - PAD} y2={y} />;
            })}
            {[0,1,2,3,4,5].map(i => {
              const x = PAD + (i / 5) * (W - 2 * PAD);
              return <line key={`v${i}`} x1={x} y1={PAD} x2={x} y2={H - PAD} />;
            })}
          </g>

          {/* Axes */}
          <g stroke="#475569" strokeWidth="1.5">
            <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} />
            <line x1={PAD} y1={PAD}     x2={PAD}      y2={H - PAD} />
          </g>

          {/* Axis labels */}
          <text x={W / 2} y={H - 8} fill="#64748b" textAnchor="middle" fontSize={10} fontFamily="monospace">Input size (n)</text>
          <text x={14}    y={H / 2} fill="#64748b" textAnchor="middle" fontSize={10} fontFamily="monospace"
            transform={`rotate(-90 14 ${H / 2})`}>Operations</text>
          <text x={W - PAD} y={H - PAD + 16} fill="#3b82f6" textAnchor="middle" fontSize={10} fontFamily="monospace">n={nValue}</text>

          {/* Curves */}
          {curves.map(({ label, color, dash, width, d }) => (
            <path key={label} d={d} fill="none" stroke={color} strokeWidth={width}
              strokeDasharray={dash} strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {curves.map(({ type, label, color, dash }) => (
          <div key={type} className="flex items-center gap-1.5">
            <svg width={24} height={10}>
              <line x1={0} y1={5} x2={24} y2={5} stroke={color} strokeWidth={2}
                strokeDasharray={dash === "none" ? undefined : dash} />
            </svg>
            <span className="text-[10px] font-mono text-slate-400">
              {type === "time" ? `Time: ${label}` : `Space: ${label}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Complexity rating badge ──────────────────────────────────────────────────

function ComplexityRating({ bigO }: { bigO: string }) {
  const rating = (() => {
    if (bigO.includes("O(1)"))                                return { label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" };
    if (bigO.includes("log n") && !bigO.includes("n log n")) return { label: "Great",     color: "text-blue-500",    bg: "bg-blue-500/10 border-blue-500/20" };
    if (bigO === "O(n)" || bigO === "O(V + E)")               return { label: "Good",      color: "text-yellow-500",  bg: "bg-yellow-500/10 border-yellow-500/20" };
    if (bigO.includes("n log n") || bigO.includes("E log"))   return { label: "Fair",      color: "text-orange-500",  bg: "bg-orange-500/10 border-orange-500/20" };
    if (bigO.includes("n^2") || bigO.includes("n²") || bigO.includes("n * W")) return { label: "Poor", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" };
    if (bigO.includes("2^n") || bigO.includes("n!"))          return { label: "Horrible",  color: "text-purple-500",  bg: "bg-purple-500/10 border-purple-500/20" };
    return { label: "Varies", color: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20" };
  })();

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${rating.bg} ${rating.color}`}>
      {rating.label}
    </span>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────

interface ComplexityDeepDiveProps {
  timeComplexity: string;   // e.g. "O(n log n) — each node visited once."
  spaceComplexity: string;  // e.g. "O(h) — recursion stack."
  challengeTitle: string;
}

export default function ComplexityDeepDive({
  timeComplexity,
  spaceComplexity,
  challengeTitle,
}: ComplexityDeepDiveProps) {
  const [open, setOpen] = useState(false);

  const timeBigO  = extractBigO(timeComplexity);
  const spaceBigO = extractBigO(spaceComplexity);
  const timeParts  = timeComplexity.split("—");
  const spaceParts = spaceComplexity.split("—");

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

      {/* ── Collapsed header (always visible) ── */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-2.5">
          <FaChartLine className="text-blue-500 text-sm shrink-0" />
          <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            Complexity Deep Dive
          </span>
          {/* Quick-glance badges always visible */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">Time:</span>
            <code className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{timeBigO}</code>
            <ComplexityRating bigO={timeBigO} />
            <span className="text-slate-300 dark:text-slate-700 mx-1">·</span>
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">Space:</span>
            <code className="text-[10px] font-bold text-purple-600 dark:text-purple-400">{spaceBigO}</code>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">
            {open ? "Collapse" : "Expand"}
          </span>
          {open
            ? <FaChevronUp  className="text-slate-400 text-xs" />
            : <FaChevronDown className="text-slate-400 text-xs" />
          }
        </div>
      </button>

      {/* ── Expanded body ── */}
      {open && (
        <div className="px-4 py-5 space-y-5 bg-white dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800">

          {/* Complexity cards row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Time */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black tracking-widest text-blue-400 dark:text-blue-500 uppercase">Time Complexity</span>
                <ComplexityRating bigO={timeBigO} />
              </div>
              <code className="block text-xl font-black text-blue-700 dark:text-blue-300">{timeBigO}</code>
              {timeParts[1] && (
                <p className="text-[11px] text-blue-600/70 dark:text-blue-400/60 m-0 leading-relaxed">
                  {timeParts[1].trim()}
                </p>
              )}
            </div>

            {/* Space */}
            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-200/50 dark:border-purple-800/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black tracking-widest text-purple-400 dark:text-purple-500 uppercase">Space Complexity</span>
                <ComplexityRating bigO={spaceBigO} />
              </div>
              <code className="block text-xl font-black text-purple-700 dark:text-purple-300">{spaceBigO}</code>
              {spaceParts[1] && (
                <p className="text-[11px] text-purple-600/70 dark:text-purple-400/60 m-0 leading-relaxed">
                  {spaceParts[1].trim()}
                </p>
              )}
            </div>
          </div>

          {/* Growth rate comparison row */}
          <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
            <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3 m-0">
              Growth Rate Reference
            </h4>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {[
                { label: "n=10",   time: 10 },
                { label: "n=100",  time: 100 },
                { label: "n=1K",   time: 1000 },
                { label: "n=1M",   time: 1_000_000 },
              ].map(({ label, time: n }) => {
                const ops = resolveFn(timeBigO)(n);
                const display = ops >= 1e12 ? ">1T"
                              : ops >= 1e9  ? `${(ops / 1e9).toFixed(0)}B`
                              : ops >= 1e6  ? `${(ops / 1e6).toFixed(0)}M`
                              : ops >= 1e3  ? `${(ops / 1e3).toFixed(0)}K`
                              : Math.round(ops).toString();
                const isBad = ops > 1e8;
                return (
                  <div key={label} className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2">
                    <div className="text-[8px] font-mono text-slate-400 mb-1">{label}</div>
                    <div className={`text-xs font-black font-mono ${isBad ? "text-red-500" : "text-slate-700 dark:text-slate-200"}`}>
                      {display}
                    </div>
                    <div className="text-[8px] text-slate-400 mt-0.5">ops</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live SVG chart */}
          <div>
            <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3 m-0">
              Input Size vs. Operations — Live Chart
            </h4>
            <BrowserOnly fallback={
              <div className="h-40 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 text-xs font-mono">
                Loading chart…
              </div>
            }>
              {() => <MiniChart timeBigO={timeBigO} spaceBigO={spaceBigO} />}
            </BrowserOnly>
          </div>

          {/* Link to full visualizer */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-400 m-0">
              Compare <code className="text-blue-500">{timeBigO}</code> against all Big-O classes on the full visualizer.
            </p>
            <Link
              to="/complexity-visualizer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 rounded-lg border border-slate-200 dark:border-slate-700 no-underline transition-all"
            >
              Full Visualizer <FaExternalLinkAlt className="text-[8px]" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
