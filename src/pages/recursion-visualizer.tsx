import React from "react";
import Layout from "@theme/Layout";
import RecursionVisualizer from "../components/Visualizing/RecursionVisualizer";

export default function RecursionVisualizerPage() {
  return (
    <Layout
      title="Recursion & Call Stack Visualizer"
      description="Step through recursive algorithms to visualize execution flow, the call stack, and the recursion tree in real-time."
    >
      <main className="container margin-vert--xl" style={{ maxWidth: "1280px" }}>
        <h1 style={{ textAlign: "center", fontWeight: "800", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Recursion & Call Stack Visualizer
        </h1>
        <p style={{ textAlign: "center", color: "var(--ifm-color-emphasis-700)", marginBottom: "2rem", fontSize: "1.1rem" }}>
          Visualize activation frames on the Call Stack and watch the Recursion Tree build dynamically step-by-step.
        </p>
        <RecursionVisualizer />
      </main>
    </Layout>
  );
}
