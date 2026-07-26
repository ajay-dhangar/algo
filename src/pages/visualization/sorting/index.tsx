import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function SortingHub() {
  return (
    <VisualizerComingSoon
      title="Sorting Algorithms Visualizer"
      algorithmName="Sorting Algorithms Visualizer"
      description="A unified interactive sandbox for Bubble, Merge, Quick, Insertion, and Selection Sort. Watch elements rearrange in real-time with colour-coded comparisons and swaps."
      facts={[
        { label: 'Best Sort', value: 'O(n log n)' },
        { label: 'Worst Sort', value: 'O(n²)' },
        { label: 'Algorithms', value: '5+' },
      ]}
      categoryHref="/visualization"
      categoryLabel="Visualization Hub"
      accent="teal"
    />
  );
}