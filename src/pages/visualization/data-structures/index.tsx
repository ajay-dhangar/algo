import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function DataStructuresHub() {
  return (
    <VisualizerComingSoon
      title="Data Structures Visualizer"
      algorithmName="Data Structures Visualizer"
      description="Interactive sandboxes for Stacks, Queues, Hash Tables, and Tries. Watch elements push, pop, enqueue, dequeue, and hash in real-time with a live operation log."
      facts={[
        { label: 'Types', value: '4+' },
        { label: 'Stack Push', value: 'O(1)' },
        { label: 'Hash Lookup', value: 'O(1)' },
      ]}
      categoryHref="/visualization"
      categoryLabel="Visualization Hub"
      accent="slate"
    />
  );
}