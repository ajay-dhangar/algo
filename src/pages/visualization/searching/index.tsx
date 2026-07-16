import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { ArrowLeft, Search, Layers, Spline } from "lucide-react";

type SearchEntry = {
  title: string;
  description: string;
  to: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
  badge: string;
};

const entries: SearchEntry[] = [
  {
    title: "Binary Search",
    description: "Classic divide-and-conquer search on sorted arrays. Watch the search space halve with each comparison.",
    to: "/visualization/searching/binary",
    Icon: Search,
    accent: "from-emerald-500 to-teal-400",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20",
  },
  {
    title: "Linear Search",
    description: "Sequential scan through unsorted data. The baseline every faster algorithm is measured against.",
    to: "/visualization/searching/linear",
    Icon: Search,
    accent: "from-slate-500 to-gray-400",
    badge: "bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/20",
  },
  {
    title: "Sliding Window",
    description: "Move a window over an array to solve subarray problems in O(n). Watch bounds shift and the running sum update.",
    to: "/visualization/searching/sliding-window",
    Icon: Layers,
    accent: "from-teal-500 to-cyan-400",
    badge: "bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-500/20",
  },
  {
    title: "Aho-Corasick",
    description: "Multi-pattern string matching with failure links. Find all patterns simultaneously in a single O(n+m+z) pass.",
    to: "/visualization/searching/aho-corasick",
    Icon: Spline,
    accent: "from-fuchsia-500 to-pink-400",
    badge: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-500/20",
  },
];

export default function SearchingVisualizationHub() {
  return (
    <Layout
      title="Searching Algorithm Visualizers"
      description="Explore Binary Search, Linear Search, Sliding Window, and Aho-Corasick through live interactive visualizations."
    >
      <header className="relative border-b border-[var(--ifm-toc-border-color)] overflow-hidden bg-[var(--ifm-background-surface-color)]">
        <div
          className="absolute inset-0 opacity-[0.25] dark:opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, var(--ifm-toc-border-color) 1px, transparent 1px),
                              linear-gradient(to bottom, var(--ifm-toc-border-color) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container py-14 px-4 md:py-20 text-center flex flex-col items-center relative z-10">
          <Link
            to="/visualization"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ifm-color-emphasis-600)] hover:text-[var(--ifm-color-primary)] no-underline hover:no-underline mb-5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Hub
          </Link>
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 px-3 py-1 rounded-full font-bold text-xs mb-4 border border-emerald-500/20">
            <Search className="h-3.5 w-3.5" /> Searching Algorithms
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[var(--ifm-heading-color)]">
            Searching <span className="text-[var(--ifm-color-primary)]">Visualizers</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--ifm-color-emphasis-700)] max-w-2xl m-0 leading-relaxed">
            From a brute-force linear scan to multi-pattern automata — pick a sandbox to step through the algorithm live.
          </p>
        </div>
      </header>

      <main className="container margin-vert--xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {entries.map((entry) => {
            const EntryIcon = entry.Icon;
            return (
              <Link
                key={entry.to}
                to={entry.to}
                className="group flex flex-col gap-4 p-6 rounded-2xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-background-surface-color)] hover:border-[var(--ifm-color-primary-light)] transition-all duration-200 no-underline hover:no-underline shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${entry.accent} bg-opacity-10 text-white`}>
                    <EntryIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${entry.badge}`}>
                    Live
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-bold m-0 text-[var(--ifm-heading-color)] group-hover:text-[var(--ifm-color-primary)] transition-colors">
                    {entry.title}
                  </h2>
                  <p className="text-sm text-[var(--ifm-color-emphasis-600)] mt-1 m-0 leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}