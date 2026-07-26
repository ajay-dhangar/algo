import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { RedBlackTreeVisualizer } from "../../../components/Visualizing/RedBlackTreeVisualizer";
import { ArrowLeft, GitFork, RotateCw, Shield } from "lucide-react";

export default function RedBlackTreeVisualizerPage() {
  return (
    <Layout
      title="Red-Black Tree Visualizer"
      description="Insert nodes and watch the Red-Black Tree automatically rebalance through rotations and color flips to maintain its O(log n) height guarantee."
    >
      <main className="bg-slate-50/50 dark:bg-slate-950/20 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Back navigation */}
          <Link
            to="/visualization/trees"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ifm-color-emphasis-600)] hover:text-[var(--ifm-color-primary)] no-underline hover:no-underline mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Tree Structures
          </Link>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-red-200 dark:border-red-800/50">
              <GitFork className="w-3.5 h-3.5" /> Self-Balancing Tree
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Red-Black Tree <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Visualizer</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              A Red-Black Tree is a self-balancing BST that enforces coloring rules to keep the tree height at most <strong>2·log(n+1)</strong>. Insert values and watch rotations and recolorings restore balance automatically.
            </p>
          </div>

          {/* Info ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Color Properties</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Every node is Red or Black.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                <RotateCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Rotations</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Left/right rotations restore balance.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">O(log n) Ops</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Guaranteed height bound always holds.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6">
            <RedBlackTreeVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
