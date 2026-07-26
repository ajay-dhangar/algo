import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function AVLTreePage() {
  return (
    <VisualizerComingSoon
      title="AVL Tree Visualizer"
      algorithmName="AVL Tree"
      description="A self-balancing BST that keeps height at O(log n) via single and double rotations after each insert or delete. Watch balance factors update and rotations trigger automatically."
      facts={[
        { label: 'Height', value: 'O(log n)' },
        { label: 'Search', value: 'O(log n)' },
        { label: 'Rotations', value: '4 types' },
      ]}
      categoryHref="/visualization/trees"
      categoryLabel="Tree Visualizers"
      accent="amber"
    />
  );
}