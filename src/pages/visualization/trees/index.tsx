import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { ArrowLeft, GitFork, FolderTree, Type } from "lucide-react";

type TreeEntry = {
  title: string;
  description: string;
  to: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: string;
  badge: string;
  implemented?: boolean;
};

const entries: TreeEntry[] = [
  {
    title: "Binary Search Tree (BST)",
    description: "Classic BST insertions, deletions, and in-/pre-/post-order traversals animated step-by-step.",
    to: "/visualization/trees/bst",
    Icon: FolderTree,
    accent: "from-amber-500 to-yellow-400",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20",
    implemented: false,
  },
  {
    title: "AVL Tree",
    description: "Height-balanced BST with automatic left/right rotations to keep height at O(log n).",
    to: "/visualization/trees/avl",
    Icon: GitFork,
    accent: "from-teal-500 to-emerald-400",
    badge: "bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-500/20",
    implemented: false,
  },
  {
    title: "Red-Black Tree",
    description: "Self-balancing BST using color rules and rotations. Watch recolorings restore the invariant on every insert.",
    to: "/visualization/trees/red-black",
    Icon: GitFork,
    accent: "from-red-500 to-rose-400",
    badge: "bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/20",
  },
  {
    title: "Trie (Prefix Tree)",
    description: "Character-by-character prefix tree powering autocomplete. Insert words and search in O(m) time.",
    to: "/visualization/trees/trie",
    Icon: Type,
    accent: "from-violet-500 to-purple-400",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/20",
  },
];

export default function TreesVisualizationHub() {
  return (
    <Layout
      title="Tree Structure Visualizers"
      description="Explore BST, AVL, Red-Black Trees, and Tries through live interactive visualizations."
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
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-300 px-3 py-1 rounded-full font-bold text-xs mb-4 border border-amber-500/20">
            <FolderTree className="h-3.5 w-3.5" /> Tree Structures
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[var(--ifm-heading-color)]">
            Tree <span className="text-[var(--ifm-color-primary)]">Visualizers</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--ifm-color-emphasis-700)] max-w-2xl m-0 leading-relaxed">
            Watch nodes branch, balance, rotate, and recolor. Each sandbox below runs the real algorithm live in your browser.
          </p>
        </div>
      </header>

      <main className="container margin-vert--xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {entries.map((entry) => {
            const EntryIcon = entry.Icon;
            const isComingSoon = entry.implemented === false;
            return (
              <Link
                key={entry.to}
                to={isComingSoon ? '#' : entry.to}
                onClick={(e) => {
                  if (isComingSoon) {
                    e.preventDefault();
                  }
                }}
                className={`group flex flex-col gap-4 p-6 rounded-2xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-background-surface-color)] transition-all duration-200 no-underline hover:no-underline ${isComingSoon ? 'opacity-60 cursor-not-allowed' : 'hover:border-[var(--ifm-color-primary-light)] shadow-sm hover:shadow-md'}`}
                aria-disabled={isComingSoon}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${entry.accent} bg-opacity-10 text-white`}>
                    <EntryIcon className="w-5 h-5" />
                  </div>
                  {isComingSoon ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-gray-500/10 text-gray-500 border-gray-500/20">
                      Coming Soon
                    </span>
                  ) : (
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${entry.badge}`}>
                      Live
                    </span>
                  )}
                </div>
                <div>
                  <h2 className={`text-base font-bold m-0 transition-colors ${isComingSoon ? 'text-[var(--ifm-heading-color)]' : 'text-[var(--ifm-heading-color)] group-hover:text-[var(--ifm-color-primary)]'}`}>
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