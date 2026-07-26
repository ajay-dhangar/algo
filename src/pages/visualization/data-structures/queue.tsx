import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function QueuePage() {
  return (
    <VisualizerComingSoon
      title="Queue Visualizer"
      algorithmName="Queue (FIFO)"
      description="A First-In First-Out data structure. Elements enqueue at the rear and dequeue from the front. The backbone of BFS, task schedulers, and message queues."
      facts={[
        { label: 'Enqueue', value: 'O(1)' },
        { label: 'Dequeue', value: 'O(1)' },
        { label: 'Order', value: 'FIFO' },
      ]}
      categoryHref="/visualization/data-structures"
      categoryLabel="Data Structures"
      accent="slate"
    />
  );
}