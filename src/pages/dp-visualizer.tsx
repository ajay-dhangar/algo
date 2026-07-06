import React from "react";
import Layout from "@theme/Layout";
import DPVisualizer from "../components/Visualizing/DPVisualizer";

export default function DPVisualizerPage() {
  return (
    <Layout
      title="Dynamic Programming (DP) Grid Visualizer"
      description="Visualize dynamic programming tabulation grids, state transitions, recurrence relations, and step-by-step subproblem dependencies in real-time."
    >
      <main className="container margin-vert--xl" style={{ maxWidth: "1280px" }}>
        <h1 style={{ textAlign: "center", fontWeight: "800", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Dynamic Programming Grid Visualizer
        </h1>
        <p style={{ textAlign: "center", color: "var(--ifm-color-emphasis-700)", marginBottom: "2rem", fontSize: "1.1rem" }}>
          Watch the bottom-up DP table assemble step-by-step. Hover over any cell to see its recurrence formula, subproblem inputs, and exact dependencies.
        </p>
        <DPVisualizer />
      </main>
    </Layout>
  );
}
