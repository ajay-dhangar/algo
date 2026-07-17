import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function InsertionSortPage() {
  return (
    <VisualizerComingSoon
      title="Insertion Sort Visualizer"
      algorithmName="Insertion Sort"
      description="Build the sorted list one item at a time by inserting each new element into its correct position among the already-sorted elements. Excellent for nearly-sorted data."
      facts={[
        { label: 'Time (Best)', value: 'O(n)' },
        { label: 'Time (Worst)', value: 'O(n²)' },
        { label: 'Space', value: 'O(1)' },
      ]}
      categoryHref="/visualization/sorting"
      categoryLabel="Sorting Algorithms"
      accent="teal"
    />
  );
}