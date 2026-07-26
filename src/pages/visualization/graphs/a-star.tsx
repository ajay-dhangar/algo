import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import AStarVisualizer from "../../../components/Visualizing/AStarVisualizer";
import { ArrowLeft, Map, Cpu, GitMerge } from "lucide-react";

export default function AStarVisualizerPage() {
  return (
    <Layout
      title="A* Pathfinding Visualizer"
      description="Watch the A* algorithm find the optimal path on a grid using heuristics. Draw walls, set start/end nodes, and step through the search in real-time."
    >
      <main className="bg-slate-50/50 dark:bg-slate-950/20 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Back navigation */}
          <Link
            to="/visualization/graphs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ifm-color-emphasis-600)] hover:text-[var(--ifm-color-primary)] no-underline hover:no-underline mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Graph & Pathfinding
          </Link>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-sky-200 dark:border-sky-800/50">
              <Map className="w-3.5 h-3.5" /> Pathfinding Engine
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              A* <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">Pathfinding</span> Visualizer
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              The A* algorithm combines the cost-so-far <code>g(n)</code> with a heuristic estimate <code>h(n)</code> to intelligently find the shortest path. Paint walls, move the start/end nodes, and watch the frontier expand.
            </p>
          </div>

          {/* Info ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
                <Map className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Heuristic Search</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Manhattan distance guides the frontier.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Priority Queue</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Lowest f(n) = g + h expanded first.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <GitMerge className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Optimal Path</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Guaranteed shortest on uniform grids.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6">
            <AStarVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
