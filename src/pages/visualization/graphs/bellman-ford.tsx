import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import BellmanFordVisualizer from "../../../components/Visualizing/BellmanFordVisualizer";
import { ArrowLeft, AlertTriangle, RefreshCw, Sigma } from "lucide-react";

export default function BellmanFordVisualizerPage() {
  return (
    <Layout
      title="Bellman-Ford Algorithm Visualizer"
      description="Step through the Bellman-Ford shortest-path algorithm on a weighted directed graph. Watch edge relaxations, distance updates, and negative-cycle detection unfold in real-time."
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
            <span className="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-orange-200 dark:border-orange-800/50">
              <RefreshCw className="w-3.5 h-3.5" /> Edge Relaxation Engine
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Bellman-Ford <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Algorithm</span> Visualizer
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlike Dijkstra's, Bellman-Ford handles <strong>negative-weight edges</strong> by relaxing every edge <em>|V|−1</em> times. Watch distance tables update after each relaxation pass and see negative-cycle detection in action.
            </p>
          </div>

          {/* Info ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Edge Relaxation</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Iterates |V|−1 times over all edges.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Negative Cycles</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Detects unreachable optimal states.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Sigma className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">O(VE) Complexity</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Slower than Dijkstra, more general.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6">
            <BellmanFordVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
