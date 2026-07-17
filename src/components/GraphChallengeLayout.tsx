/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-nocheck

import React, { useState, useCallback, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import {
  FaArrowLeft, FaLightbulb, FaPlay, FaCheck,
  FaEye, FaEyeSlash, FaClock, FaChevronRight,
  FaProjectDiagram,
} from "react-icons/fa";
import type { GraphChallenge } from "../data/graphChallengesData";
import useConsoleCapture from "../hooks/useConsoleCapture";
import ComplexityDeepDive from "./ComplexityDeepDive";
import PseudocodeTab from "./PseudocodeTab";
import { readAlgoProgress, writeAlgoProgress } from "../utils/safeStorage";

import DijkstraVisualizations from "./DSA/graphs/DijkstraVisualizations";
import FloydWarshallVisualizations from "./DSA/graphs/FloydWarshallVisualizations";

// ─── Difficulty badge colours ─────────────────────────────────────────────────
const DIFF_COLORS = {
  Easy:   "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10  text-amber-500  border-amber-500/20",
  Hard:   "bg-red-500/10    text-red-500    border-red-500/20",
};

// ─── Which challenges get a dedicated visualizer ──────────────────────────────
const DEDICATED_VISUALIZER: Record<string, React.FC> = {
  "graph-11": DijkstraVisualizations,
  "graph-13": FloydWarshallVisualizations,
};

// ─── Generic interactive graph visualizer ────────────────────────────────────
// Used for every challenge that doesn't have a dedicated component.
// Lets users build a graph by clicking (add node), clicking two nodes
// (add edge), and running a simple BFS walk to animate traversal.

interface GNode { id: number; x: number; y: number; label: string; }
interface GEdge { from: number; to: number; }

function GenericGraphVisualizer({ challenge }: { challenge: GraphChallenge }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<GNode[]>([]);
  const [edges, setEdges] = useState<GEdge[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [frontier, setFrontier] = useState<Set<number>>(new Set());
  const [animating, setAnimating] = useState(false);
  const [message, setMessage] = useState("Click the canvas to add nodes. Click two nodes to connect them.");
  const nodeIdRef = useRef(0);

  // Seed with a small example graph that matches the challenge
  useEffect(() => {
    const seed = buildSeedGraph(challenge.id);
    setNodes(seed.nodes);
    setEdges(seed.edges);
    setVisited(new Set());
    setFrontier(new Set());
    setSelected(null);
    setMessage("Click a node to start BFS traversal, or click the canvas to add nodes.");
    nodeIdRef.current = seed.nodes.length;
  }, [challenge.id]);

  // Add node on canvas click
  const handleSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (animating) return;
    const rect = svgRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Don't add node if click was on a node circle
    const target = e.target as SVGElement;
    if (target.tagName === "circle" || target.tagName === "text") return;
    const id = nodeIdRef.current++;
    setNodes(prev => [...prev, { id, x, y, label: String.fromCharCode(65 + (id % 26)) }]);
    setSelected(null);
    setMessage("Node added. Click another node to select it, or click two nodes to add an edge.");
  }, [animating]);

  // Select node / add edge between two selected nodes
  const handleNodeClick = useCallback((e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (animating) {
      // While animating, a node click = BFS from that node
      runBFS(id);
      return;
    }
    setSelected(prev => {
      if (prev === null) {
        setMessage(`Node ${nodes.find(n => n.id === id)?.label} selected. Click another node to add an edge.`);
        return id;
      }
      if (prev === id) {
        setMessage("Deselected. Click a node to select it.");
        return null;
      }
      // Add edge prev → id (undirected: add both)
      const exists = edges.some(e => (e.from === prev && e.to === id) || (e.from === id && e.to === prev));
      if (!exists) {
        const fromLabel = nodes.find(n => n.id === prev)?.label;
        const toLabel   = nodes.find(n => n.id === id)?.label;
        setEdges(prev2 => [...prev2, { from: prev, to: id }]);
        setMessage(`Edge ${fromLabel} — ${toLabel} added.`);
      } else {
        setMessage("Edge already exists.");
      }
      return null;
    });
  }, [animating, nodes, edges]);

  // BFS animation
  const runBFS = useCallback((startId?: number) => {
    const start = startId ?? (nodes[0]?.id ?? 0);
    if (nodes.length === 0) { setMessage("Add some nodes first!"); return; }
    setAnimating(true);
    setVisited(new Set());
    setFrontier(new Set());

    const adjList: Record<number, number[]> = {};
    nodes.forEach(n => { adjList[n.id] = []; });
    edges.forEach(e => {
      adjList[e.from]?.push(e.to);
      adjList[e.to]?.push(e.from);
    });

    const queue = [start];
    const seen  = new Set([start]);
    const steps: { frontier: number[]; visited: number[] }[] = [];
    const visitedAcc: number[] = [];

    while (queue.length) {
      const curr = queue.shift()!;
      visitedAcc.push(curr);
      steps.push({ frontier: [...queue], visited: [...visitedAcc] });
      (adjList[curr] || []).forEach(nb => {
        if (!seen.has(nb)) { seen.add(nb); queue.push(nb); }
      });
    }
    steps.push({ frontier: [], visited: [...visitedAcc] });

    let i = 0;
    const tick = () => {
      if (i >= steps.length) {
        setAnimating(false);
        setFrontier(new Set());
        setMessage("BFS complete! Click a node to restart, or reset to try again.");
        return;
      }
      const step = steps[i++];
      setVisited(new Set(step.visited));
      setFrontier(new Set(step.frontier));
      setTimeout(tick, 420);
    };
    tick();
  }, [nodes, edges]);

  const reset = () => {
    const seed = buildSeedGraph(challenge.id);
    setNodes(seed.nodes);
    setEdges(seed.edges);
    nodeIdRef.current = seed.nodes.length;
    setVisited(new Set());
    setFrontier(new Set());
    setSelected(null);
    setAnimating(false);
    setMessage("Reset. Click a node to start BFS, or click the canvas to add nodes.");
  };

  const clearAll = () => {
    setNodes([]);
    setEdges([]);
    nodeIdRef.current = 0;
    setVisited(new Set());
    setFrontier(new Set());
    setSelected(null);
    setAnimating(false);
    setMessage("Canvas cleared. Click to add nodes.");
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 select-none">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex-wrap">
        <span className="text-xs font-mono text-slate-400 mr-1">Interactive Graph</span>
        <button
          onClick={() => runBFS()}
          disabled={animating || nodes.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 disabled:text-blue-700 text-white rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer"
        >
          <FaPlay className="text-[9px]" /> Run BFS
        </button>
        <button
          onClick={reset}
          disabled={animating}
          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={clearAll}
          disabled={animating}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer"
        >
          Clear
        </button>
        <div className="ml-auto flex items-center gap-3 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"/>visited</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"/>frontier</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"/>selected</span>
        </div>
      </div>

      {/* Status message */}
      <div className="px-4 py-1.5 bg-slate-900/60 border-b border-slate-800/60">
        <p className="text-[11px] font-mono text-slate-400 m-0 truncate">{message}</p>
      </div>

      {/* SVG canvas */}
      <svg
        ref={svgRef}
        className="flex-1 w-full cursor-crosshair"
        onClick={handleSvgClick}
        style={{ minHeight: 320 }}
      >
        {/* Edges */}
        {edges.map((e, i) => {
          const from = nodes.find(n => n.id === e.from);
          const to   = nodes.find(n => n.id === e.to);
          if (!from || !to) return null;
          const bothVisited = visited.has(e.from) && visited.has(e.to);
          return (
            <line
              key={i}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke={bothVisited ? "#3b82f6" : "#334155"}
              strokeWidth={bothVisited ? 2.5 : 1.5}
              strokeDasharray={bothVisited ? "none" : "5,3"}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(n => {
          const isVisited  = visited.has(n.id);
          const isFrontier = frontier.has(n.id);
          const isSelected = selected === n.id;
          const fill = isSelected ? "#34d399"
                     : isFrontier ? "#fbbf24"
                     : isVisited  ? "#3b82f6"
                     : "#1e293b";
          const stroke = isSelected ? "#10b981"
                       : isFrontier ? "#f59e0b"
                       : isVisited  ? "#2563eb"
                       : "#475569";
          return (
            <g
              key={n.id}
              onClick={e => handleNodeClick(e, n.id)}
              className="cursor-pointer"
            >
              <circle
                cx={n.x} cy={n.y} r={22}
                fill={fill} stroke={stroke}
                strokeWidth={isSelected ? 3 : 2}
                className="transition-all duration-300"
              />
              <text
                x={n.x} y={n.y}
                textAnchor="middle" dominantBaseline="central"
                fontSize={13} fontWeight="bold" fill="white"
                fontFamily="monospace"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex gap-4">
        <span>Click canvas → add node</span>
        <span>Click 2 nodes → add edge</span>
        <span>Click node during BFS → traverse from it</span>
      </div>
    </div>
  );
}

// ─── Seed graphs per challenge ────────────────────────────────────────────────
function buildSeedGraph(id: string): { nodes: GNode[]; edges: GEdge[] } {
  const layouts: Record<string, { nodes: [number, number, string][]; edges: [number, number][] }> = {
    "graph-01": {
      nodes: [[120,80,"A"],[280,80,"B"],[200,180,"C"],[120,280,"D"],[280,280,"E"]],
      edges: [[0,1],[0,2],[1,2],[2,3],[2,4],[3,4]],
    },
    "graph-02": {
      nodes: [[200,60,"A"],[100,160,"B"],[300,160,"C"],[60,270,"D"],[140,270,"E"],[340,270,"F"]],
      edges: [[0,1],[0,2],[1,3],[1,4],[2,5]],
    },
    "graph-03": {
      nodes: [[200,60,"A"],[100,160,"B"],[300,160,"C"],[60,270,"D"],[140,270,"E"],[340,270,"F"]],
      edges: [[0,1],[0,2],[1,3],[1,4],[2,5]],
    },
    "graph-04": {
      nodes: [[80,100,"A"],[200,100,"B"],[320,100,"C"],[80,220,"D"],[200,220,"E"]],
      edges: [[0,1],[0,3],[3,4]],
    },
    "graph-05": {
      nodes: [[60,150,"S"],[180,80,"B"],[180,220,"C"],[310,150,"T"]],
      edges: [[0,1],[0,2],[1,3],[2,3]],
    },
    "graph-06": {
      nodes: [[200,60,"A"],[80,180,"B"],[320,180,"C"],[200,300,"D"]],
      edges: [[0,1],[1,2],[2,3],[3,0]],
    },
    "graph-07": {
      nodes: [[80,120,"A"],[220,60,"B"],[360,120,"C"],[220,240,"D"]],
      edges: [[0,1],[1,2],[2,3],[3,1]],
    },
    "graph-08": {
      nodes: [[60,200,"A"],[180,80,"B"],[180,200,"C"],[300,80,"D"],[300,200,"E"],[420,200,"F"]],
      edges: [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]],
    },
    "graph-09": {
      nodes: [[100,100,"A"],[300,100,"B"],[100,280,"C"],[300,280,"D"]],
      edges: [[0,1],[1,2],[2,3],[3,0]],
    },
    "graph-10": {
      nodes: [[60,180,"S"],[180,80,"B"],[180,280,"C"],[320,80,"D"],[320,280,"E"],[440,180,"T"]],
      edges: [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[1,4]],
    },
    "graph-14": {
      nodes: [[80,80,"A"],[280,80,"B"],[80,280,"C"],[280,280,"D"],[180,180,"E"]],
      edges: [[0,1],[0,2],[0,4],[1,3],[1,4],[2,3],[2,4],[3,4]],
    },
    "graph-15": {
      nodes: [[80,100,"A"],[220,60,"B"],[360,100,"C"],[80,260,"D"],[220,300,"E"],[360,260,"F"]],
      edges: [[0,1],[1,2],[2,0],[3,4],[4,5],[5,3],[1,4]],
    },
  };

  const layout = layouts[id];
  if (!layout) {
    // Fallback: 5-node ring
    const n = 5;
    const cx = 200, cy = 180, r = 120;
    const nodes = Array.from({ length: n }, (_, i) => ({
      id: i,
      x: cx + r * Math.cos((2 * Math.PI * i) / n - Math.PI / 2),
      y: cy + r * Math.sin((2 * Math.PI * i) / n - Math.PI / 2),
      label: String.fromCharCode(65 + i),
    }));
    const edges = nodes.map((_, i) => ({ from: i, to: (i + 1) % n }));
    return { nodes, edges };
  }

  return {
    nodes: layout.nodes.map(([x, y, label], id) => ({ id, x, y, label })),
    edges: layout.edges.map(([from, to]) => ({ from, to })),
  };
}

// ─── Visualize tab content ────────────────────────────────────────────────────
function VisualizeTab({ challenge }: { challenge: GraphChallenge }) {
  const Dedicated = DEDICATED_VISUALIZER[challenge.id];

  return (
    <div className="flex flex-col h-full">
      {/* Header explaining what's shown */}
      <div className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <FaProjectDiagram className="text-blue-500 text-sm" />
          <h2 className="text-sm font-black text-slate-900 dark:text-white m-0">
            {Dedicated ? `${challenge.title} — Step Visualizer` : "Interactive Graph Explorer"}
          </h2>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">
          {Dedicated
            ? "Watch the algorithm run step-by-step on a live graph. Use the controls below to start, step, or reset."
            : "Build your own graph and animate BFS traversal. Use this to visualize what your code does on custom inputs."}
        </p>
      </div>

      {/* Visualization */}
      <div className="flex-1 overflow-auto">
        {Dedicated ? (
          <div className="p-4">
            <Dedicated />
          </div>
        ) : (
          <GenericGraphVisualizer challenge={challenge} />
        )}
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props { challenge: GraphChallenge; }

// ─── Main layout ──────────────────────────────────────────────────────────────
export default function GraphChallengeLayout({ challenge }: Props) {
  const [code, setCode]             = useState(challenge.starterCode);
  const [output, setOutput]         = useState<string[]>([]);
  const [showHint, setShowHint]     = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [running, setRunning]       = useState(false);
  const [activeTab, setActiveTab]   = useState<"problem" | "visualize" | "solution" | "pseudocode">("problem");
  const { runWithCapture }          = useConsoleCapture();

  const hasDedicated = Boolean(DEDICATED_VISUALIZER[challenge.id]);

  const runCode = useCallback(async () => {
    setRunning(true);
    setOutput([]);
    const logs = await runWithCapture(code);
    setOutput(logs);
    setRunning(false);
  }, [code, runWithCapture]);

  const TABS: { key: "problem" | "visualize" | "solution" | "pseudocode"; label: string }[] = [
    { key: "problem",    label: "Problem" },
    { key: "visualize", label: hasDedicated ? "Visualize ✨" : "Visualize" },
    { key: "solution",  label: "Solution" },
    { key: "pseudocode", label: "Pseudocode" },
  ];

  return (
    <Layout title={challenge.title} description={challenge.description}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19]">

        {/* ── Top navigation bar ── */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center gap-4">
          <Link
            to="/challenges"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-mono transition-colors no-underline"
          >
            <FaArrowLeft /> Back to Challenges
          </Link>
          <FaChevronRight className="text-slate-300 dark:text-slate-700 text-xs" />
          <span className="text-slate-700 dark:text-slate-300 text-sm font-mono font-bold truncate">
            {challenge.title}
          </span>
<button
  onClick={() => {
    const progress = readAlgoProgress();
    progress[challenge.id] = true;
    progress[`${challenge.id}_title`] = challenge.title;
    progress[`${challenge.id}_updatedAt`] = new Date().toISOString();
    writeAlgoProgress(progress);
    alert("Marked as solved!");
  }}
  className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
>
  <FaCheck /> Mark as Solved ✅
</button>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${DIFF_COLORS[challenge.difficulty]}`}>
            {challenge.difficulty}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <FaClock /> {challenge.timeLimit}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(100vh-112px)]">

          {/* ── Left panel ── */}
          <div className="w-full lg:w-[45%] overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">

            {/* Three-tab switcher */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 shrink-0">
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === key
                      ? "border-b-2 border-blue-500 text-blue-500 dark:text-blue-400"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Problem tab ── */}
            {activeTab === "problem" && (
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                <h1 className="text-xl font-black text-slate-900 dark:text-white">{challenge.title}</h1>

                <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                  {challenge.description.split("\n").map((line, i) => (
                    <p key={i} className="my-1">{line}</p>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Examples</h3>
                  <div className="space-y-3">
                    {challenge.examples.map((ex, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-sm font-mono">
                        <div><span className="text-slate-400">Input:</span> <span className="text-slate-800 dark:text-slate-200">{ex.input}</span></div>
                        <div><span className="text-slate-400">Output:</span> <span className="text-emerald-600 dark:text-emerald-400">{ex.output}</span></div>
                        <div className="text-slate-500 mt-1 text-xs">{ex.explanation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Constraints</h3>
                  <ul className="space-y-1">
                    {challenge.constraints.map((c, i) => (
                      <li key={i} className="text-sm font-mono text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Complexity Analysis</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 border border-blue-200/50 dark:border-blue-800/30">
                      <div className="text-xs font-mono text-blue-400 mb-1">Time</div>
                      <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{challenge.timeComplexity.split("—")[0].trim()}</div>
                      <div className="text-xs text-slate-500 mt-1">{challenge.timeComplexity.split("—")[1]}</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-3 border border-purple-200/50 dark:border-purple-800/30">
                      <div className="text-xs font-mono text-purple-400 mb-1">Space</div>
                      <div className="text-sm font-bold text-purple-700 dark:text-purple-300">{challenge.spaceComplexity.split("—")[0].trim()}</div>
                      <div className="text-xs text-slate-500 mt-1">{challenge.spaceComplexity.split("—")[1]}</div>
                    </div>
                  </div>
                </div>

                <ComplexityDeepDive
                  timeComplexity={challenge.timeComplexity}
                  spaceComplexity={challenge.spaceComplexity}
                  challengeTitle={challenge.title}
                />

                <div>
                  <button
                    onClick={() => setShowHint(v => !v)}
                    className="flex items-center gap-2 text-amber-500 text-sm font-mono font-bold cursor-pointer hover:text-amber-600"
                  >
                    <FaLightbulb /> {showHint ? "Hide Hint" : "Show Hint"}
                  </button>
                  {showHint && (
                    <div className="mt-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300">
                      {challenge.hint}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Test Cases</h3>
                  <div className="space-y-2">
                    {challenge.testCases.map((tc, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                        <div className="text-slate-500 mb-1">#{i + 1} — {tc.description}</div>
                        <div><span className="text-slate-400">Input:</span> <span className="text-slate-700 dark:text-slate-300">{tc.input}</span></div>
                        <div><span className="text-slate-400">Expected:</span> <span className="text-emerald-600 dark:text-emerald-400">{tc.expected}</span></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nudge towards Visualize tab */}
                <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-900/10 p-4 flex items-start gap-3">
                  <FaProjectDiagram className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-300 m-0 mb-1">
                      {hasDedicated ? "Step-by-step visualizer available!" : "Interactive graph explorer available!"}
                    </p>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 m-0">
                      {hasDedicated
                        ? "Switch to the Visualize ✨ tab to watch this algorithm run step-by-step on a live graph before you code."
                        : "Switch to the Visualize tab to build a custom graph and animate BFS traversal to test your intuition."}
                    </p>
                    <button
                      onClick={() => setActiveTab("visualize")}
                      className="mt-2 text-[11px] font-bold text-blue-500 hover:text-blue-600 cursor-pointer"
                    >
                      Open Visualizer →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Visualize tab ── */}
            {activeTab === "visualize" && (
              <div className="flex-1 overflow-hidden flex flex-col">
                <BrowserOnly fallback={<div className="flex-1 flex items-center justify-center text-slate-400 text-xs font-mono">Loading visualizer…</div>}>
                  {() => <VisualizeTab challenge={challenge} />}
                </BrowserOnly>
              </div>
            )}

            {/* ── Solution tab ── */}
            {activeTab === "solution" && (
              <div className="p-6 space-y-4 flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between shrink-0">
                  <h2 className="text-lg font-black text-slate-900 dark:text-white m-0">Solution</h2>
                  <button
                    onClick={() => setShowSolution(v => !v)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-white text-xs font-mono cursor-pointer"
                  >
                    {showSolution ? <><FaEyeSlash /> Hide</> : <><FaEye /> Reveal</>}
                  </button>
                </div>
                {showSolution ? (
                  <div className="flex-1 flex flex-col overflow-hidden min-h-[500px]">
                    <p className="text-sm text-slate-600 dark:text-slate-400 shrink-0">{challenge.hint}</p>
                    <div className="flex-1 mt-2 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col">
                      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800 shrink-0">
                        <span className="text-xs font-mono text-slate-400">Your Code (Left) vs Solution (Right)</span>
                      </div>
                      <div className="flex-1 relative">
                        <BrowserOnly fallback={<div className="p-4 text-slate-400 text-xs font-mono">Loading diff editor...</div>}>
                          {() => {
                            const { DiffEditor } = require("@monaco-editor/react");
                            return (
                              <DiffEditor
                                original={code || ""}
                                modified={challenge.solution}
                                language="javascript"
                                theme="vs-dark"
                                options={{
                                  readOnly: true,
                                  minimap: { enabled: false },
                                  fontSize: 13,
                                  renderSideBySide: true,
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            );
                          }}
                        </BrowserOnly>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400 text-sm font-mono shrink-0">
                    Click "Reveal" to see the solution after attempting the problem.
                  </div>
                )}
              </div>
            )}

            {/* ── Pseudocode tab ── */}
            {activeTab === "pseudocode" && (
              <div className="p-6 flex-1 overflow-y-auto">
                <PseudocodeTab solution={challenge.solution} customPseudocode={challenge.pseudocode} />
              </div>
            )}
          </div>

          {/* ── Right panel: Monaco editor + output ── */}
          <div className="w-full lg:w-[55%] flex flex-col">

            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">JavaScript</span>
              <button
                onClick={runCode}
                disabled={running}
                className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                <FaPlay /> {running ? "Running..." : "Run Code"}
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <BrowserOnly
                fallback={
                  <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="w-full h-full bg-slate-950 text-slate-200 font-mono text-sm p-4 resize-none border-none outline-none"
                    spellCheck={false}
                  />
                }
              >
                {() => {
                  const Editor = require("@monaco-editor/react").default;
                  return (
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      value={code}
                      onChange={val => setCode(val ?? "")}
                      theme="vs-dark"
                      options={{
                        fontSize: 13,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        lineNumbers: "on",
                        tabSize: 2,
                        automaticLayout: true,
                      }}
                    />
                  );
                }}
              </BrowserOnly>
            </div>

            <div className="h-48 bg-slate-950 border-t border-slate-800 flex flex-col">
              <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">Output</span>
                {output.length > 0 && (
                  <button onClick={() => setOutput([])} className="text-xs text-slate-600 hover:text-slate-400 ml-auto cursor-pointer">
                    Clear
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                {output.length === 0 ? (
                  <span className="text-slate-600 text-xs">Click "Run Code" to see output here...</span>
                ) : (
                  output.map((line, i) => (
                    <div key={i} className={`leading-relaxed ${line.startsWith("❌") ? "text-red-400" : "text-emerald-400"}`}>
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
