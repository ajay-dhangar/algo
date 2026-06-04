import React from "react";

export const AhoCorasickVisualizer: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-2">Aho-Corasick Trie & Failure Links Visualizer</h3>
      <p className="text-gray-600 dark:text-gray-400">Interactive automaton visualization of Trie nodes and failure transitions.</p>
    </div>
  );
};
