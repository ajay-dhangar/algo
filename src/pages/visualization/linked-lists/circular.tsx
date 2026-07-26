import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function CircularLinkedListPage() {
  return (
    <VisualizerComingSoon
      title="Circular Linked List Visualizer"
      algorithmName="Circular Linked List"
      description="A linked list where the last node's next pointer wraps back to the head, forming a ring. Useful for round-robin scheduling — watch the cycle close and traversal loop forever."
      facts={[
        { label: 'Access', value: 'O(n)' },
        { label: 'Insert', value: 'O(1)' },
        { label: 'Cycle', value: 'Always' },
      ]}
      categoryHref="/visualization/linked-lists"
      categoryLabel="Linked Lists"
      accent="fuchsia"
    />
  );
}