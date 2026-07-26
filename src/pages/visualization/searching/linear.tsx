import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function LinearSearchPage() {
  return (
    <VisualizerComingSoon
      title="Linear Search Visualizer"
      algorithmName="Linear Search"
      description="Scan each element sequentially from the start until the target is found or the list is exhausted. Works on unsorted data — the baseline every faster search is measured against."
      facts={[
        { label: 'Time (Best)', value: 'O(1)' },
        { label: 'Time (Worst)', value: 'O(n)' },
        { label: 'Space', value: 'O(1)' },
      ]}
      categoryHref="/visualization/searching"
      categoryLabel="Searching Algorithms"
      accent="slate"
    />
  );
}