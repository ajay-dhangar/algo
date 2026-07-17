import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function MergeSortPage() {
  return (
    <VisualizerComingSoon
      title="Merge Sort Visualizer"
      algorithmName="Merge Sort"
      description="A classic divide-and-conquer algorithm. Recursively splits the array in half, sorts each half, then merges them back together. Stable and guaranteed O(n log n)."
      facts={[
        { label: 'Time', value: 'O(n log n)' },
        { label: 'Space', value: 'O(n)' },
        { label: 'Stable', value: 'Yes' },
      ]}
      categoryHref="/visualization/sorting"
      categoryLabel="Sorting Algorithms"
      accent="teal"
    />
  );
}