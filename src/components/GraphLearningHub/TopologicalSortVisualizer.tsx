import React, { useState } from "react";
import styles from "./styles.module.css";

interface DAGNode {
  id: string;
  name: string;
  prereqs: string[];
}

const DAG_NODES: DAGNode[] = [
  { id: "A", name: "Intro CS", prereqs: [] },
  { id: "B", name: "Data Structures", prereqs: ["A"] },
  { id: "C", name: "Discrete Math", prereqs: ["A"] },
  { id: "D", name: "Algorithms", prereqs: ["B", "C"] },
  { id: "E", name: "Advanced Graphs", prereqs: ["D"] },
];

interface StepState {
  currentNode: string | null;
  inDegrees: Record<string, number>;
  zeroInDegreeQueue: string[];
  topologicalOrder: string[];
  explanation: string;
}

const generateTopoSteps = (): StepState[] => {
  const steps: StepState[] = [];
  const inDegrees: Record<string, number> = { A: 0, B: 1, C: 1, D: 2, E: 1 };
  const queue: string[] = ["A"];
  const topoOrder: string[] = [];

  steps.push({
    currentNode: null,
    inDegrees: { ...inDegrees },
    zeroInDegreeQueue: [...queue],
    topologicalOrder: [],
    explanation: "Calculate initial in-degrees for DAG nodes. Node A has 0 in-degree and is added to the processing queue.",
  });

  const adj: Record<string, string[]> = {
    A: ["B", "C"],
    B: ["D"],
    C: ["D"],
    D: ["E"],
    E: [],
  };

  while (queue.length > 0) {
    const node = queue.shift()!;
    topoOrder.push(node);

    steps.push({
      currentNode: node,
      inDegrees: { ...inDegrees },
      zeroInDegreeQueue: [...queue],
      topologicalOrder: [...topoOrder],
      explanation: `Processed Node ${node} (${DAG_NODES.find((n) => n.id === node)?.name}). Added to topological ordering.`,
    });

    const neighbors = adj[node] || [];
    for (const neighbor of neighbors) {
      inDegrees[neighbor] -= 1;
      steps.push({
        currentNode: node,
        inDegrees: { ...inDegrees },
        zeroInDegreeQueue: [...queue],
        topologicalOrder: [...topoOrder],
        explanation: `Reduced in-degree of Node ${neighbor} to ${inDegrees[neighbor]}.`,
      });

      if (inDegrees[neighbor] === 0) {
        queue.push(neighbor);
        steps.push({
          currentNode: node,
          inDegrees: { ...inDegrees },
          zeroInDegreeQueue: [...queue],
          topologicalOrder: [...topoOrder],
          explanation: `In-degree of Node ${neighbor} reached 0! Enqueued Node ${neighbor}.`,
        });
      }
    }
  }

  steps.push({
    currentNode: null,
    inDegrees: { ...inDegrees },
    zeroInDegreeQueue: [],
    topologicalOrder: [...topoOrder],
    explanation: "All nodes processed successfully! Valid topological order found.",
  });

  return steps;
};

const TOPO_STEPS = generateTopoSteps();

export const TopologicalSortVisualizer: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const currentStep = TOPO_STEPS[stepIndex];

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>🔄 Kahn's Algorithm (Topological Sort Visualizer)</h3>
        <p className={styles.subtitle}>Track in-degrees and zero in-degree queue to order tasks linearly without cycles.</p>
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
          onClick={() => setStepIndex((prev) => Math.min(TOPO_STEPS.length - 1, prev + 1))}
          disabled={stepIndex === TOPO_STEPS.length - 1}
        >
          Next Step ➡
        </button>
        <button className={`${styles.button} ${styles.secondaryButton}`} onClick={() => setStepIndex(0)}>
          🔄 Reset
        </button>
        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
          Step {stepIndex + 1} of {TOPO_STEPS.length}
        </span>
      </div>

      <div className={styles.visualizerArea}>
        <div className={styles.nodesContainer}>
          {DAG_NODES.map((node) => {
            let statusClass = styles.nodeUnvisited;
            if (currentStep.currentNode === node.id) {
              statusClass = styles.nodeCurrent;
            } else if (currentStep.topologicalOrder.includes(node.id)) {
              statusClass = styles.nodeVisited;
            }
            return (
              <div key={node.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className={`${styles.graphNode} ${statusClass}`}>{node.id}</div>
                <span style={{ fontSize: "0.75rem", marginTop: "0.2rem" }}>In-degree: {currentStep.inDegrees[node.id]}</span>
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
          <strong>📥 Zero In-Degree Queue:</strong>{" "}
          {currentStep.zeroInDegreeQueue.length > 0 ? (
            <code>[{currentStep.zeroInDegreeQueue.join(", ")}]</code>
          ) : (
            <em>(Empty)</em>
          )}
        </div>
        <div>
          <strong>✨ Linear Topological Ordering:</strong>{" "}
          <code>[{currentStep.topologicalOrder.join(" ➔ ")}]</code>
        </div>
      </div>
    </div>
  );
};

export default TopologicalSortVisualizer;
