import React, { useState } from "react";
import styles from "./styles.module.css";

interface Edge {
  u: number;
  v: number;
  weight: number;
}

const ALL_EDGES: Edge[] = [
  { u: 0, v: 1, weight: 2 },
  { u: 1, v: 3, weight: 3 },
  { u: 0, v: 2, weight: 4 },
  { u: 2, v: 3, weight: 5 },
  { u: 1, v: 2, weight: 7 },
];

interface StepState {
  currentEdge: Edge | null;
  mstEdges: Edge[];
  totalCost: number;
  explanation: string;
  status: "inspecting" | "accepted" | "rejected" | "done";
}

const generateKruskalSteps = (): StepState[] => {
  const steps: StepState[] = [];
  const parent = [0, 1, 2, 3];

  const find = (i: number): number => {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  };

  const union = (i: number, j: number): boolean => {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  };

  const sorted = [...ALL_EDGES].sort((a, b) => a.weight - b.weight);
  const mst: Edge[] = [];
  let cost = 0;

  steps.push({
    currentEdge: null,
    mstEdges: [],
    totalCost: 0,
    explanation: "Sorted all edges by weight ascending: [(0-1, w=2), (1-3, w=3), (0-2, w=4), (2-3, w=5), (1-2, w=7)]. Initialized Disjoint Sets.",
    status: "inspecting",
  });

  for (const edge of sorted) {
    const rootU = find(edge.u);
    const rootV = find(edge.v);

    if (rootU !== rootV) {
      union(edge.u, edge.v);
      mst.push(edge);
      cost += edge.weight;
      steps.push({
        currentEdge: edge,
        mstEdges: [...mst],
        totalCost: cost,
        explanation: `Edge (${edge.u} - ${edge.v}, weight=${edge.weight}) connects distinct components (Roots: ${rootU} vs ${rootV}). Accepted into MST!`,
        status: "accepted",
      });
    } else {
      steps.push({
        currentEdge: edge,
        mstEdges: [...mst],
        totalCost: cost,
        explanation: `Edge (${edge.u} - ${edge.v}, weight=${edge.weight}) connects vertices in the SAME component (Root: ${rootU}). Cycle detected! Rejected.`,
        status: "rejected",
      });
    }
  }

  steps.push({
    currentEdge: null,
    mstEdges: [...mst],
    totalCost: cost,
    explanation: `Kruskal's Algorithm complete! Minimum Spanning Tree formed with total weight = ${cost}.`,
    status: "done",
  });

  return steps;
};

const KRUSKAL_STEPS = generateKruskalSteps();

export const KruskalVisualizer: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const currentStep = KRUSKAL_STEPS[stepIndex];

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>🌲 Kruskal's Minimum Spanning Tree (MST) Visualizer</h3>
        <p className={styles.subtitle}>Greedily picks smallest weight edges and uses DSU to prevent cycles.</p>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
          disabled={stepIndex === 0}
        >
          ⬅ Previous Step
        </button>
        <button
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={() => setStepIndex((prev) => Math.min(KRUSKAL_STEPS.length - 1, prev + 1))}
          disabled={stepIndex === KRUSKAL_STEPS.length - 1}
        >
          Next Step ➡
        </button>
        <button className={`${styles.button} ${styles.secondaryButton}`} onClick={() => setStepIndex(0)}>
          🔄 Reset
        </button>
        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
          Step {stepIndex + 1} of {KRUSKAL_STEPS.length}
        </span>
      </div>

      <div className={styles.visualizerArea}>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {ALL_EDGES.sort((a, b) => a.weight - b.weight).map((e, idx) => {
            const isCurrent = currentStep.currentEdge?.u === e.u && currentStep.currentEdge?.v === e.v;
            const isMst = currentStep.mstEdges.some((m) => m.u === e.u && m.v === e.v);
            let color = "var(--ifm-color-emphasis-300, #cccccc)";
            if (isMst) color = "#10b981";
            if (isCurrent && currentStep.status === "rejected") color = "#ef4444";

            return (
              <div
                key={idx}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: `2px solid ${color}`,
                  background: isCurrent ? "rgba(59, 130, 246, 0.1)" : "transparent",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                Edge ({e.u} - {e.v}) | w={e.weight}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.stateBox}>
        <div>
          <strong>📌 Step Explanation:</strong> {currentStep.explanation}
        </div>
        <div>
          <strong>🌲 MST Edges Accepted:</strong>{" "}
          {currentStep.mstEdges.length > 0 ? (
            <code>
              {currentStep.mstEdges.map((e) => `(${e.u}-${e.v}, w=${e.weight})`).join(" + ")}
            </code>
          ) : (
            <em>None yet</em>
          )}
        </div>
        <div>
          <strong>💰 Current Total MST Weight:</strong> <code>{currentStep.totalCost}</code>
        </div>
      </div>
    </div>
  );
};

export default KruskalVisualizer;
