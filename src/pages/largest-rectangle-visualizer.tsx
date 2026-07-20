import React from 'react';
import Layout from '@theme/Layout';
import LargestRectangleInHistogramVisualizer from '../components/Visualizing/largest-rectangle-in-histogram-visualizer';
import { BarChart2, Layers, Zap } from 'lucide-react';

export default function LargestRectanglePage() {
  return (
    <Layout
      title="Largest Rectangle in Histogram Visualizer"
      description="Step through the stack-based algorithm that finds the largest rectangle area in a histogram with animated bar highlights and stack state."
    >
      <main className="bg-slate-50/50 dark:bg-slate-950/20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-orange-200 dark:border-orange-800/50">
              <BarChart2 className="w-3.5 h-3.5" /> Stack Engine
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Largest Rectangle{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">in Histogram</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Watch a monotonic stack expand and contract as bars are pushed and popped, revealing the maximum rectangular area under the histogram at each step.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Bar Scanning</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Animate each histogram bar evaluation.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Stack State</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Watch the monotonic stack live.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Max Area</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Best rectangle highlighted in real-time.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8">
            <LargestRectangleInHistogramVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
