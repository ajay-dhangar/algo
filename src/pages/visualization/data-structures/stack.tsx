import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function StackPage() {
  return (
    <VisualizerComingSoon
      title="Stack Visualizer"
      algorithmName="Stack (LIFO)"
      description="A Last-In First-Out data structure. Watch elements push onto the top and pop off in reverse order. Powers function call stacks, undo systems, and expression parsers."
      facts={[
        { label: 'Push', value: 'O(1)' },
        { label: 'Pop', value: 'O(1)' },
        { label: 'Order', value: 'LIFO' },
      ]}
      categoryHref="/visualization/data-structures"
      categoryLabel="Data Structures"
      accent="slate"
    />
  );
}