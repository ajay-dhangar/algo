import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import TrieVisualizer from "../../../components/Visualizing/TrieVisualizer";
import { ArrowLeft, Type, Search, Zap } from "lucide-react";

export default function TrieVisualizerPage() {
  return (
    <Layout
      title="Trie (Prefix Tree) Visualizer"
      description="Insert words and watch a Trie (prefix tree) grow node-by-node. Visualize shared prefixes, end-of-word markers, and autocomplete traversal paths in real-time."
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
            <span className="inline-flex items-center gap-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-violet-200 dark:border-violet-800/50">
              <Type className="w-3.5 h-3.5" /> Prefix Tree Engine
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              Trie <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">(Prefix Tree)</span> Visualizer
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              A Trie stores strings character-by-character, sharing common prefixes to achieve <strong>O(m)</strong> lookup (where m is the key length). Insert words and search to see the structure grow and shrink in real-time.
            </p>
          </div>

          {/* Info ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Shared Prefixes</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Common prefixes share a single path.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">O(m) Search</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Key length — not dictionary size — matters.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-950/50 text-fuchsia-600 dark:text-fuchsia-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm m-0 text-slate-900 dark:text-slate-100">Autocomplete</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">Power behind search suggestions.</p>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6">
            <TrieVisualizer />
          </div>

        </div>
      </main>
    </Layout>
  );
}
