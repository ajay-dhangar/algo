import React from "react";
import Layout from "@theme/Layout";
import DPVisualizer from "../../../components/Visualizing/DPVisualizer";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function DPVisualizerPage() {
  return (
    <Layout
      title="Dynamic Programming (DP) Grid Visualizer"
      description="Visualize dynamic programming tabulation grids, state transitions, recurrence relations, and step-by-step subproblem dependencies in real-time."
    >
      <main className="container margin-vert--xl" style={{ maxWidth: "1280px" }}>
        {/* Header Section */}
        <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontWeight: "800", fontSize: "2.75rem", marginBottom: "0.5rem" }}>
            Dynamic Programming Grid Visualizer
          </h1>
          <p style={{ color: "var(--ifm-color-emphasis-700)", fontSize: "1.15rem", maxWidth: "800px", margin: "0 auto" }}>
            Watch the bottom-up DP table assemble step-by-step. Hover over any cell to see its recurrence formula, subproblem inputs, and exact dependencies.
          </p>
        </header>

        {/* Interactive Visualizer Component */}
        <section style={{ marginBottom: "4rem" }}>
          <DPVisualizer />
        </section>

        <hr style={{ backgroundColor: "var(--ifm-hr-border-color)", height: "1px", border: "none", margin: "3rem 0" }} />

        {/* Educational Info Section */}
        <section style={{ margin: "0 auto", lineHeight: "1.6" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "1rem" }}>
            What is Dynamic Programming (DP)?
          </h2>
          <p>
            <strong>Dynamic Programming</strong> is a powerful algorithmic technique used to solve complex problems by breaking them down into simpler subproblems. It is highly effective for optimization problems where you want to find the <em>maximum</em> or <em>minimum</em> value under specific constraints.
          </p>
          <p>
            DP relies on two core properties:
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
            <li><strong>Overlapping Subproblems:</strong> The problem can be broken down into smaller subproblems which are reused multiple times (e.g., computing <InlineMath math="F(n-1)" /> and <InlineMath math="F(n-2)" /> to find a Fibonacci number).</li>
            <li><strong>Optimal Substructure:</strong> The optimal solution to the global problem can be constructed efficiently from the optimal solutions of its subproblems.</li>
          </ul>

          <h3 style={{ fontSize: "1.4rem", fontWeight: "600", marginTop: "2rem", marginBottom: "0.75rem" }}>
            The Two Approaches to DP
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ padding: "1.25rem", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "8px", backgroundColor: "var(--ifm-background-color-color)" }}>
              <h4 style={{ margin: "0 0 0.5rem 0", color: "var(--ifm-color-primary)" }}>1. Top-Down (Memoization)</h4>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                Starts with the main problem and recursively breaks it down. Solutions to subproblems are stored in a table (cache) so they are never computed twice.
              </p>
            </div>
            <div style={{ padding: "1.25rem", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "8px", backgroundColor: "var(--ifm-background-color-color)" }}>
              <h4 style={{ margin: "0 0 0.5rem 0", color: "var(--ifm-color-primary)" }}>2. Bottom-Up (Tabulation)</h4>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                Starts by solving the smallest possible subproblems first (base cases) and iteratively fills a table (grid) to build up to the final solution. <strong>This visualizer focuses on Tabulation.</strong>
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: "1.4rem", fontWeight: "600", marginBottom: "0.75rem" }}>
            How to Use This Visualizer
          </h3>
          <ol style={{ paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem" }}><strong>Select a Problem:</strong> Choose a classic DP paradigm (like the Knapsack problem, Longest Common Subsequence, or Grid Paths).</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Trace the Dependencies:</strong> Use the controls to step through execution. Cells light up to show which prior states (<InlineMath math="DP[i-1][j]" />, etc.) are active inputs for the current cell.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Inspect the Math:</strong> Hover over any filled cell to view the exact state transition equation applied at that specific moment.</li>
          </ol>
        </section>
      </main>
    </Layout>
  );
}