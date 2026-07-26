import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function TreeMapPage() {
  return (
    <VisualizerComingSoon
      title="Tree Map Visualizer"
      algorithmName="Tree Map"
      description="A space-filling visualization technique that uses nested rectangles to represent hierarchical data proportionally. See how values are laid out as tiles within a parent container."
      facts={[
        { label: 'Layout', value: 'O(n log n)' },
        { label: 'Display', value: 'Hierarchical' },
        { label: 'Space', value: 'O(n)' },
      ]}
      categoryHref="/visualization/trees"
      categoryLabel="Tree Visualizers"
      accent="amber"
    />
  );
}