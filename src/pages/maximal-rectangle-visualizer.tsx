import React from 'react';
import Layout from '@theme/Layout';
import MaximalRectangleVisualizer from '../components/Visualizing/maximal-rectangle-visualizer';
import { LayoutGrid, Layers, Maximize2 } from 'lucide-react';

export default function MaximalRectanglePage() {
  return (
    <Layout
      title="Maximal Rectangle in Binary Matrix Visualizer"
      description="Visualize how the maximal rectangle problem in a binary matrix is solved by reducing each row to a histogram and applying the largest-rectangle algorithm."
    >
      <main className="bg-slate-50/50 dark:bg-slate-950/20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-cyan-200 dark:border-cyan-800/50">
              <LayoutGrid className="w-3.5 h-3.5" /> Matrix Engine
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Maximal Rectangle{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">Visualizer</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              See how each row of a binary matrix is transformed into a histogram height profile, then watch the stack-based largest-rectangle algorithm find the maximum all-ones sub-rectangle.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Binary Matrix</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Cells highlight as rows are scanned.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Height Profile</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Row → histogram reduction animated.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Max Rectangle</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Optimal region revealed in real-time.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8">
            <MaximalRectangleVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
