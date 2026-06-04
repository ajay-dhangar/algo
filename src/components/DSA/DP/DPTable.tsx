import React from "react";

export const DPTable: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-2">Interactive DP Table</h3>
      <p className="text-gray-600 dark:text-gray-400">Hover over cells to highlight parent state dependencies dynamically.</p>
    </div>
  );
};
