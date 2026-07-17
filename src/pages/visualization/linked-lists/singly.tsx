import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function SinglyLinkedListPage() {
  return (
    <VisualizerComingSoon
      title="Singly Linked List Visualizer"
      algorithmName="Singly Linked List"
      description="Each node holds a value and a single pointer to the next node. Watch insertions at head, tail, and arbitrary index — and see deletions update the next pointers in real-time."
      facts={[
        { label: 'Access', value: 'O(n)' },
        { label: 'Prepend', value: 'O(1)' },
        { label: 'Space', value: 'O(n)' },
      ]}
      categoryHref="/visualization/linked-lists"
      categoryLabel="Linked Lists"
      accent="fuchsia"
    />
  );
}