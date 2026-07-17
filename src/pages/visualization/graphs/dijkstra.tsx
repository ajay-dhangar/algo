import React from 'react';
import VisualizerComingSoon from '../../../components/VisualizerComingSoon';

export default function DijkstraPage() {
  return (
    <VisualizerComingSoon
      title="Dijkstra's Algorithm Visualizer"
      algorithmName="Dijkstra's Shortest Path"
      description="Greedily extract the lowest-cost unvisited node and relax its neighbours using a priority queue. Watch the shortest-path tree grow and distances converge on a weighted graph."
      facts={[
        { label: 'Time', value: 'O((V+E) log V)' },
        { label: 'Space', value: 'O(V)' },
        { label: 'Negative?', value: 'No' },
      ]}
      categoryHref="/visualization/graphs"
      categoryLabel="Graph Visualizers"
      accent="sky"
    />
  );
}