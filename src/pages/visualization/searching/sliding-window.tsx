import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import SlidingWindowVisualizer from "../../../components/Visualizing/SlidingWindowVisualizer";
import { ArrowLeft, Layers, Maximize2, Timer } from "lucide-react";

export default function SlidingWindowVisualizerPage() {
  return (
    <Layout
      title="Sliding Window Visualizer"
      description="Watch the sliding window technique shrink and expand over arrays to solve subarray problems in O(n) time. Visualize the window bounds, running sum, and maximum at each step."
    >
      <main className="bg-slate-50/50 dark:bg-slate-950/20 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Back navigation */}
          <Link
            to="/visualization/searching"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ifm-color-emphasis-600)] hover:text-[var(--ifm-color-primary)] no-underline hover:no-underline mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Searching Algorithms
          </Link>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-emerald-200 dark:border-emerald-800/50">
              <Layers className="w-3.5 h-3.5" /> Array Technique
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Sliding Window <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Visualizer</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              The sliding window technique avoids nested loops by maintaining a running aggregate as a window slides over the data. Watch the window shrink and expand to solve maximum-subarray problems in <strong>O(n)</strong>.
            </p>
          </div>

          {/* Info ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Window Bounds</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Left & right pointers define the range.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Max Subarray Sum</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Tracked as the window advances.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">O(n) Time</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Single pass beats brute-force O(n²).</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6">
            <SlidingWindowVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
