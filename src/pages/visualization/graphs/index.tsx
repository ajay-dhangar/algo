import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { ArrowLeft, Share2, Map, RefreshCw, Cpu } from "lucide-react";

type GraphEntry = {
  title: string;
  description: string;
  to: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
  badge: string;
};

const entries: GraphEntry[] = [
  {
    title: "Graph Traversal (BFS / DFS)",
    description: "Breadth-First and Depth-First traversals on interactive graphs. Track frontiers and visited sets in real time.",
    to: "/visualization/graphs/bfs-dfs",
    Icon: Share2,
    accent: "from-sky-500 to-blue-400",
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-500/20",
  },
  {
    title: "A* Pathfinding",
    description: "Heuristic grid pathfinder combining g + h costs. Draw walls and watch the frontier expand toward the goal.",
    to: "/visualization/graphs/a-star",
    Icon: Map,
    accent: "from-indigo-500 to-sky-400",
    badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/20",
  },
  {
    title: "Bellman-Ford",
    description: "Shortest paths with negative-weight edges via repeated edge relaxation. Detects negative cycles automatically.",
    to: "/visualization/graphs/bellman-ford",
    Icon: RefreshCw,
    accent: "from-orange-500 to-red-400",
    badge: "bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/20",
  },
  {
    title: "Dijkstra",
    description: "Greedy shortest-path algorithm on non-negative weighted graphs using a priority queue.",
    to: "/visualization/graphs/dijkstra",
    Icon: Cpu,
    accent: "from-teal-500 to-emerald-400",
    badge: "bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-500/20",
  },
];

export default function GraphsVisualizationHub() {
  return (
    <Layout
      title="Graph & Pathfinding Visualizers"
      description="Explore BFS, DFS, A*, Bellman-Ford, and Dijkstra through live interactive visualizations."
    >
      <header className="relative border-b border-[var(--ifm-toc-border-color)] overflow-hidden bg-[var(--ifm-background-surface-color)]">
        <div
          className="absolute inset-0 opacity-[0.25] dark:opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, var(--ifm-toc-border-color) 1px, transparent 1px),
                              linear-gradient(to bottom, var(--ifm-toc-border-color) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container py-14 px-4 md:py-20 text-center flex flex-col items-center relative z-10">
          <Link
            to="/visualization"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ifm-color-emphasis-600)] hover:text-[var(--ifm-color-primary)] no-underline hover:no-underline mb-5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Hub
          </Link>
          <span className="inline-flex items-center gap-1.5 bg-sky-500/10 text-sky-600 dark:text-sky-300 px-3 py-1 rounded-full font-bold text-xs mb-4 border border-sky-500/20">
            <Share2 className="h-3.5 w-3.5" /> Graph & Pathfinding
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[var(--ifm-heading-color)]">
            Graph <span className="text-[var(--ifm-color-primary)]">Visualizers</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--ifm-color-emphasis-700)] max-w-2xl m-0 leading-relaxed">
            Navigate complex graphs and grids with live pathfinding sandboxes. Select an algorithm below to launch its interactive engine.
          </p>
        </div>
      </header>

      <main className="container margin-vert--xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {entries.map((entry) => {
            const EntryIcon = entry.Icon;
            return (
              <Link
                key={entry.to}
                to={entry.to}
                className="group flex flex-col gap-4 p-6 rounded-2xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-background-surface-color)] hover:border-[var(--ifm-color-primary-light)] transition-all duration-200 no-underline hover:no-underline shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${entry.accent} bg-opacity-10 text-white`}>
                    <EntryIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${entry.badge}`}>
                    Live
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-bold m-0 text-[var(--ifm-heading-color)] group-hover:text-[var(--ifm-color-primary)] transition-colors">
                    {entry.title}
                  </h2>
                  <p className="text-sm text-[var(--ifm-color-emphasis-600)] mt-1 m-0 leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}