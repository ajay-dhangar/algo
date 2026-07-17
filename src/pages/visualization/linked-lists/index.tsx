import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function LinkedListsHub() {
  return (
    <VisualizerComingSoon
      title="Linked List Visualizer"
      algorithmName="Linked List Visualizer"
      description="Interactive sandboxes for Singly, Doubly, and Circular Linked Lists. Watch node pointers update, insert at head/tail/index, and see deletions ripple through the chain."
      facts={[
        { label: 'Access', value: 'O(n)' },
        { label: 'Insert Head', value: 'O(1)' },
        { label: 'Types', value: '3' },
      ]}
      categoryHref="/visualization"
      categoryLabel="Visualization Hub"
      accent="fuchsia"
    />
  );
}