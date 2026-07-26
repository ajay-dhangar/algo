import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function BSTPage() {
  return (
    <VisualizerComingSoon
      title="Binary Search Tree (BST) Visualizer"
      algorithmName="Binary Search Tree (BST)"
      description="A node-based binary tree where each node's left subtree has only smaller keys and the right only larger ones. Watch in-order, pre-order, and post-order traversals animate step-by-step."
      facts={[
        { label: 'Search (Avg)', value: 'O(log n)' },
        { label: 'Insert (Avg)', value: 'O(log n)' },
        { label: 'Search (Worst)', value: 'O(n)' },
      ]}
      categoryHref="/visualization/trees"
      categoryLabel="Tree Visualizers"
      accent="amber"
    />
  );
}