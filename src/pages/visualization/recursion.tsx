import React from "react";
import Layout from "@theme/Layout";
import RecursionVisualizer from "../../components/Visualizing/RecursionVisualizer";
// Import lucide-react icons for the quick-guide ribbon items
import { Layers, GitFork, Code2, Repeat } from "lucide-react";

export default function RecursionVisualizerPage() {
  return (
    <Layout
      title="Recursion & Call Stack Visualizer"
      description="Step through recursive algorithms to visualize execution flow, the call stack, and the recursion tree in real-time."
    >
      {/* Premium workspace layout background shell */}
      <main className="bg-slate-50/50 dark:bg-slate-950/20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Context Badge */}
            <span className="inline-flex items-center gap-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-rose-200 dark:border-rose-800/50">
              <Repeat className="w-3.5 h-3.5" /> Engine Dashboard
            </span>
            
            {/* Modern Gradient Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Recursion & <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Call Stack</span> Visualizer
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Step directly into the mechanics of self-referential functions. Watch activation frames stack up, trace algorithmic backtracking loops, and explore structural tree expansions in real-time.
            </p>
          </div>

          {/* Quick Glace UX Guide Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            {/* Item 1 */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">The Call Stack</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Track active memory contexts.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Recursion Tree</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Map execution branches visually.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">State Scopes</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Inspect base cases and returns.</p>
              </div>
            </div>
          </div>

          {/* Premium Visualizer Frame Mount */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8">
            <RecursionVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}