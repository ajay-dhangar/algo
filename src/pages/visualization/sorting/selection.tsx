import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function SelectionSortPage() {
  return (
    <VisualizerComingSoon
      title="Selection Sort Visualizer"
      algorithmName="Selection Sort"
      description="Find the minimum element in the unsorted portion and place it at the beginning, growing the sorted region by one element per pass. Simple and makes at most n−1 swaps."
      facts={[
        { label: 'Time', value: 'O(n²)' },
        { label: 'Space', value: 'O(1)' },
        { label: 'Swaps', value: 'O(n)' },
      ]}
      categoryHref="/visualization/sorting"
      categoryLabel="Sorting Algorithms"
      accent="teal"
    />
  );
}