import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function BinarySearchPage() {
  return (
    <VisualizerComingSoon
      title="Binary Search Visualizer"
      algorithmName="Binary Search"
      description="Repeatedly halve a sorted array's search space by comparing the target to the middle element. O(log n) search — watch the lo/mid/hi pointers converge on the answer."
      facts={[
        { label: 'Time', value: 'O(log n)' },
        { label: 'Space', value: 'O(1)' },
        { label: 'Requirement', value: 'Sorted' },
      ]}
      categoryHref="/visualization/searching"
      categoryLabel="Searching Algorithms"
      accent="emerald"
    />
  );
}