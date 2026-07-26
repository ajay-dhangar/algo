import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function QuickSortPage() {
  return (
    <VisualizerComingSoon
      title="Quick Sort Visualizer"
      algorithmName="Quick Sort"
      description="Select a pivot, partition elements into those less than and greater than the pivot, then recursively sort each partition. Average O(n log n) with excellent cache performance."
      facts={[
        { label: 'Time (Avg)', value: 'O(n log n)' },
        { label: 'Time (Worst)', value: 'O(n²)' },
        { label: 'Space', value: 'O(log n)' },
      ]}
      categoryHref="/visualization/sorting"
      categoryLabel="Sorting Algorithms"
      accent="teal"
    />
  );
}