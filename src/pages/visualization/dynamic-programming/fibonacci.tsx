import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function FibonacciDPPage() {
  return (
    <VisualizerComingSoon
      title="Fibonacci DP Visualizer"
      algorithmName="Fibonacci — Dynamic Programming"
      description="Compute Fibonacci numbers using bottom-up tabulation. Watch each cell fill with F(n-1)+F(n-2) and see how memoization eliminates exponential redundancy to achieve linear time."
      facts={[
        { label: 'Naive', value: 'O(2ⁿ)' },
        { label: 'DP Time', value: 'O(n)' },
        { label: 'DP Space', value: 'O(n)' },
      ]}
      categoryHref="/visualization/dynamic-programming"
      categoryLabel="Dynamic Programming"
      accent="indigo"
    />
  );
}