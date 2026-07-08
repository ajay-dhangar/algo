import React from 'react';
import Layout from '@theme/Layout';
import GraphVisualizer from '../../../components/Visualizing/GraphVisualizer';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphVisualizerPage() {
  return (
    <Layout 
      title="Graph Algorithms Visualizer" 
      description="Interactive Graph Algorithms Visualizer demonstrating BFS, DFS, and traversal mechanics step-by-step."
    >
      <main className="container margin-vert--xl" style={{ maxWidth: '1280px' }}>
        
        {/* Header Section */}
        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontWeight: '800', fontSize: '2.75rem', marginBottom: '0.5rem' }}>
            Graph Algorithms Visualizer
          </h1>
          <p style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '1.15rem', maxWidth: '800px', margin: '0 auto' }}>
            Watch Breadth-First Search (BFS) and Depth-First Search (DFS) traverse the graph step-by-step. 
            Track frontiers, visited sets, and traversal trees in real-time.
          </p>
        </header>

        <section>
          <GraphVisualizer />
        </section>

        <hr style={{ backgroundColor: 'var(--ifm-hr-border-color)', height: '1px', border: 'none', margin: '3rem 0' }} />

        {/* Educational Info Section */}
        <section style={{margin: '0 auto', lineHeight: '1.6' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem' }}>
            Understanding Graph Traversals
          </h2>
          <p>
            A graph is mathematically represented as <InlineMath math="G = (V, E)" />, where <InlineMath math="V" /> is the set of vertices (nodes) and <InlineMath math="E" /> is the set of edges connecting them. Searching or traversing a graph means visiting every node exactly once in a systematic order.
          </p>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginTop: '2rem', marginBottom: '0.75rem' }}>
            Core Traversal Strategies
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* BFS Card */}
            <div style={{ padding: '1.25rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px', backgroundColor: 'var(--ifm-background-color-color)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ifm-color-primary)' }}>
                Breadth-First Search (BFS)
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem' }}>
                Explores the graph level-by-level, visiting all immediate neighbors before moving deeper.
              </p>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', margin: 0 }}>
                <li><strong>Data Structure:</strong> Queue (FIFO)</li>
                <li><strong>Time Complexity:</strong> <InlineMath math="O(|V| + |E|)" /></li>
                <li><strong>Use Case:</strong> Finding the shortest path on unweighted graphs.</li>
              </ul>
            </div>

            {/* DFS Card */}
            <div style={{ padding: '1.25rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px', backgroundColor: 'var(--ifm-background-color)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--ifm-color-primary)' }}>
                Depth-First Search (DFS)
              </h4>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem' }}>
                Explores as deep as possible along each branch before backtracking to explore side options.
              </p>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', margin: 0 }}>
                <li><strong>Data Structure:</strong> Stack (LIFO) or Recursion</li>
                <li><strong>Time Complexity:</strong> <InlineMath math="O(|V| + |E|)" /></li>
                <li><strong>Use Case:</strong> Topological sorting, cycle detection, and maze solving.</li>
              </ul>
            </div>
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.75rem' }}>
            How to Analyze the Visualizer
          </h3>
          <ol style={{ paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Observe the State Colors:</strong> Nodes typically change state from <em>Unvisited</em> to <em>Discovered</em> (currently in the queue/stack frontier), and finally to <em>Processed</em>.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Track the Tree Edges:</strong> Notice how the algorithm dynamically highlights the exact edges that form the final traversal tree.
            </li>
          </ol>
        </section>
      </main>
    </Layout>
  );
}