import React from 'react';
import Layout from '@theme/Layout';
import TreeSandbox from '../components/Visualizing/TreeSandbox';

export default function TreeSandboxPage() {
  return (
    <Layout 
      title="BST & AVL Tree Sandbox" 
      description="Interactive playground for inserting, searching, and deleting nodes in Binary Search Trees and self-balancing AVL Trees with step-by-step rotation animations."
    >
      <main className="container margin-vert--xl" style={{ maxWidth: '1200px' }}>
        <TreeSandbox />
      </main>
    </Layout>
  );
}
