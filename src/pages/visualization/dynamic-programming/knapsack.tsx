import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function KnapsackDPPage() {
  return (
    <VisualizerComingSoon
      title="0/1 Knapsack DP Visualizer"
      algorithmName="0/1 Knapsack — Dynamic Programming"
      description="Maximise the total value of items packed into a knapsack with a fixed weight capacity. Watch the 2D DP table fill row-by-row and trace back the optimal item selection."
      facts={[
        { label: 'Time', value: 'O(n·W)' },
        { label: 'Space', value: 'O(n·W)' },
        { label: 'Type', value: 'Tabulation' },
      ]}
      categoryHref="/visualization/dynamic-programming"
      categoryLabel="Dynamic Programming"
      accent="indigo"
    />
  );
}