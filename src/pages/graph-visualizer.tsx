import React from 'react';
import Layout from '@theme/Layout';
import GraphVisualizer from '../components/Visualizing/GraphVisualizer';

export default function GraphVisualizerPage() {
  return (
    <Layout title="Graph Algorithms Visualizer" description="Interactive Graph Algorithms Visualizer">
      <main className="container margin-vert--xl">
        <h1 style={{textAlign: 'center'}}>Graph Algorithms Visualizer</h1>
        <p style={{textAlign: 'center', marginBottom: '2rem'}}>
          Watch Breadth-First Search (BFS) and Depth-First Search (DFS) traverse the graph step-by-step.
        </p>
        <GraphVisualizer />
      </main>
    </Layout>
  );
}
