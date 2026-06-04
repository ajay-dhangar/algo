import React from "react";

export const RedBlackTreeVisualizer: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 mt-6">
      <h3 className="text-xl font-bold mb-2">Red-Black Tree Interactive Visualizer</h3>
      <p className="text-gray-600 dark:text-gray-400">Insert and delete tree nodes and observe real-time balancing, rotations, and node recoloring.</p>
    </div>
  );
};
