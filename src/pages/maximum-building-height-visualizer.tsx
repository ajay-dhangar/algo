import React from 'react';
import Layout from '@theme/Layout';
import MaximumBuildingHeightVisualizer from '../components/Visualizing/maximum-building-height-visualizer';
import { Building2, TrendingUp, Zap } from 'lucide-react';

export default function MaximumBuildingHeightPage() {
  return (
    <Layout
      title="Maximum Building Height Visualizer"
      description="Visualize the greedy two-pass algorithm that computes the tallest possible building heights given a set of height restrictions."
    >
      <main className="bg-slate-50/50 dark:bg-slate-950/20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-blue-200 dark:border-blue-800/50">
              <Building2 className="w-3.5 h-3.5" /> Greedy Engine
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Maximum Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Height</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Watch a forward and backward greedy sweep compute the maximum possible height at each building position subject to a set of restriction constraints — visualized step by step.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Restrictions</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Height caps displayed per building.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Two-Pass Sweep</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Forward + backward passes animated.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Optimal Heights</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Final max profile revealed live.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8">
            <MaximumBuildingHeightVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
