import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { AhoCorasickVisualizer } from "../../../components/Visualizing/AhoCorasickVisualizer";
import { ArrowLeft, Network, Spline, Zap } from "lucide-react";

export default function AhoCorasickVisualizerPage() {
  return (
    <Layout
      title="Aho-Corasick String Matching Visualizer"
      description="Visualize the Aho-Corasick multi-pattern string matching algorithm. Watch the automaton build failure links and efficiently locate all pattern occurrences in a single O(n+m+z) pass."
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
            <span className="inline-flex items-center gap-1.5 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-fuchsia-200 dark:border-fuchsia-800/50">
              <Spline className="w-3.5 h-3.5" /> Multi-Pattern Automaton
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Aho-Corasick <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500">Visualizer</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Aho-Corasick finds <em>all</em> occurrences of multiple patterns simultaneously in a single scan. It builds a finite automaton with <strong>failure links</strong> so mismatches fall back to the longest valid suffix — no backtracking needed.
            </p>
          </div>

          {/* Info ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-950/50 text-fuchsia-600 dark:text-fuchsia-400">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Trie Automaton</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Patterns encoded in a prefix trie.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400">
                <Spline className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Failure Links</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Jump to longest valid suffix on mismatch.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">O(n+m+z)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Linear in text, patterns, and matches.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6">
            <AhoCorasickVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
