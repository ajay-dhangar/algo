import React from 'react';
import Layout from '@theme/Layout';
import BitwiseVisualizer from '../components/Visualizing/BitwiseVisualizer';

export default function BitwiseVisualizerPage() {
  return (
    <Layout 
      title="Bitwise Operations & Masking Playground" 
      description="Interactive playground for binary representations, bitwise operators, shifting masks, and real-time bit manipulation recipes."
    >
      <main className="container margin-vert--xl" style={{ maxWidth: '1200px' }}>
        <BitwiseVisualizer />
      </main>
    </Layout>
  );
}
