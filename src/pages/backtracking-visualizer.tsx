import React from "react";
import Layout from "@theme/Layout";
import BacktrackingVisualizer from "../components/Visualizing/BacktrackingVisualizer";

export default function BacktrackingVisualizerPage() {
  return (
    <Layout
      title="Grid-Based Backtracking Visualizer"
      description="Interactive grid-based backtracking visualizer for the N-Queens problem and Sudoku solver."
    >
      <main className="container margin-vert--xl">
        <h1 style={{ textAlign: "center", fontWeight: 800 }}>Grid-Based Backtracking Visualizer</h1>
        <p style={{ textAlign: "center", marginBottom: "2rem", color: "var(--ifm-color-secondary-darkest)" }}>
          Animate queen placements, highlight invalid moves/conflicts in red, and demonstrate the physical backtracking steps as the recursion winds down.
        </p>
        <BacktrackingVisualizer />
      </main>
    </Layout>
  );
}
