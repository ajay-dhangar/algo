import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function HashTablePage() {
  return (
    <VisualizerComingSoon
      title="Hash Table Visualizer"
      algorithmName="Hash Table"
      description="Map keys to values using a hash function. Watch hashing, insertion, collision resolution (chaining / open addressing), and O(1) average lookups happen in real-time."
      facts={[
        { label: 'Insert (Avg)', value: 'O(1)' },
        { label: 'Lookup (Avg)', value: 'O(1)' },
        { label: 'Worst Case', value: 'O(n)' },
      ]}
      categoryHref="/visualization/data-structures"
      categoryLabel="Data Structures"
      accent="slate"
    />
  );
}