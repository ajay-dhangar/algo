import React from 'react';
import Layout from '@theme/Layout';
import NQueensVisualizer from '../components/Visualizing/n-queens-visualizer';
import { Crown, Grid, Zap } from 'lucide-react';

export default function NQueensVisualizerPage() {
  return (
    <Layout
      title="N-Queens Backtracking Visualizer"
      description="Step through the N-Queens problem with animated queen placements, conflict highlighting, and live backtracking steps."
    >
      <main className="bg-slate-50/50 dark:bg-slate-950/20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-violet-200 dark:border-violet-800/50">
              <Crown className="w-3.5 h-3.5" /> Backtracking Engine
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              N-Queens <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">Visualizer</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Watch the backtracking algorithm place queens one row at a time, detect conflicts in real-time, and unwind when a dead end is reached — until all valid solutions are found.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Queen Placement</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">See each row decision animate live.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                <Grid className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Conflict Detection</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Invalid cells highlighted in red.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Backtracking Steps</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Watch recursion unwind on failure.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8">
            <NQueensVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
