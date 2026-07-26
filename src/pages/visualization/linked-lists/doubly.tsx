import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function DoublyLinkedListPage() {
  return (
    <VisualizerComingSoon
      title="Doubly Linked List Visualizer"
      algorithmName="Doubly Linked List"
      description="Each node holds previous and next pointers, allowing bidirectional traversal. Watch the prev/next links update visually on every insert and delete operation."
      facts={[
        { label: 'Access', value: 'O(n)' },
        { label: 'Prepend', value: 'O(1)' },
        { label: 'Traversal', value: 'Bi-dir' },
      ]}
      categoryHref="/visualization/linked-lists"
      categoryLabel="Linked Lists"
      accent="fuchsia"
    />
  );
}