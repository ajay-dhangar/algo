import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function BubbleSortPage() {
  return (
    <VisualizerComingSoon
      title="Bubble Sort Visualizer"
      algorithmName="Bubble Sort"
      description="Repeatedly step through the list, compare adjacent elements and swap them if they are in the wrong order. The largest unsorted element 'bubbles' to its correct position each pass."
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