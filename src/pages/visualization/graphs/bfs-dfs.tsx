import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import GraphVisualizer from "../../../components/Visualizing/GraphVisualizer";
import { ArrowLeft, Share2, Layers, GitMerge } from "lucide-react";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function BfsDfsVisualizerPage() {
  return (
    <Layout
      title="Graph Traversal Visualizer — BFS & DFS"
      description="Interactive BFS and DFS graph traversal visualizer. Track frontiers, visited sets, and traversal trees step-by-step in real-time."
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
              <Share2 className="w-3.5 h-3.5" /> Graph Traversal
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Graph <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">BFS & DFS</span> Visualizer
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Watch Breadth-First Search (BFS) and Depth-First Search (DFS) traverse the graph step-by-step.
              Track frontiers, visited sets, and traversal trees in real-time.
            </p>
          </div>

          {/* Info ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">BFS — Queue</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Level-by-level frontier expansion.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">DFS — Stack</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Dive deep before backtracking.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <GitMerge className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100"><InlineMath math="O(|V|+|E|)" /></h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Both visit every node and edge once.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6">
            <GraphVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
