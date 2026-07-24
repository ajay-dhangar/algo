import React, { useState } from "react";
import styles from "./styles.module.css";

interface NodeItem {
  id: number;
  neighbors: number[];
}

const GRAPH_NODES: NodeItem[] = [
  { id: 0, neighbors: [1, 2] },
  { id: 1, neighbors: [0, 3, 4] },
  { id: 2, neighbors: [0, 5, 6] },
  { id: 3, neighbors: [1] },
  { id: 4, neighbors: [1, 5] },
  { id: 5, neighbors: [2, 4] },
  { id: 6, neighbors: [2] },
];

interface StepState {
  currentNode: number | null;
  stack: number[];
  visited: number[];
  explanation: string;
}

const generateDFSSteps = (): StepState[] => {
  const steps: StepState[] = [];
  const visitedSet = new Set<number>();
  const stack: number[] = [0];

  steps.push({
    currentNode: null,
    stack: [...stack],
    visited: [],
    explanation: "Initialize DFS starting at Node 0. Push Node 0 onto execution stack.",
  });

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (!visitedSet.has(node)) {
      visitedSet.add(node);
      steps.push({
        currentNode: node,
        stack: [...stack],
        visited: Array.from(visitedSet),
        explanation: `Popped Node ${node} from Stack and marked as visited. Exploring deeper branches.`,
      });

      const currentNodeData = GRAPH_NODES.find((n) => n.id === node);
      if (currentNodeData) {
        // push in reverse so leftmost neighbor is visited first
        for (let i = currentNodeData.neighbors.length - 1; i >= 0; i--) {
          const neighbor = currentNodeData.neighbors[i];
          if (!visitedSet.has(neighbor)) {
            stack.push(neighbor);
            steps.push({
              currentNode: node,
              stack: [...stack],
              visited: Array.from(visitedSet),
              explanation: `Pushed neighbor Node ${neighbor} onto Stack for deeper exploration.`,
            });
          }
        }
      }
    }
  }

  steps.push({
    currentNode: null,
    stack: [],
    visited: Array.from(visitedSet),
    explanation: "Stack is empty. DFS traversal complete!",
  });

  return steps;
};

const DFS_STEPS = generateDFSSteps();

export const DFSVisualizer: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(0);

  const currentStep = DFS_STEPS[stepIndex];

  const handleNext = () => {
    if (stepIndex < DFS_STEPS.length - 1) setStepIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex((prev) => prev - 1);
  };

  const handleReset = () => {
    setStepIndex(0);
  };

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>🌲 Interactive Depth-First Search (DFS) Traversal</h3>
        <p className={styles.subtitle}>Explore deep branch trajectories step-by-step using a LIFO Stack / Recursion.</p>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={handlePrev}
          disabled={stepIndex === 0}
        >
          ⬅ Previous Step
        </button>
        <button
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={handleNext}
          disabled={stepIndex === DFS_STEPS.length - 1}
        >
          Next Step ➡
        </button>
        <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleReset}>
          🔄 Reset
        </button>
        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
          Step {stepIndex + 1} of {DFS_STEPS.length}
        </span>
      </div>

      <div className={styles.visualizerArea}>
        <div className={styles.nodesContainer}>
          {GRAPH_NODES.map((node) => {
            let statusClass = styles.nodeUnvisited;
            if (currentStep.currentNode === node.id) {
              statusClass = styles.nodeCurrent;
            } else if (currentStep.visited.includes(node.id)) {
              statusClass = styles.nodeVisited;
            }
            return (
              <div key={node.id} className={`${styles.graphNode} ${statusClass}`}>
                {node.id}
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
          <strong>📚 Execution Stack (LIFO):</strong>{" "}
          {currentStep.stack.length > 0 ? (
            <code>[{currentStep.stack.join(", ")}]</code>
          ) : (
            <em>(Empty)</em>
          )}
        </div>
        <div>
          <strong>✅ Visited Sequence:</strong> <code>[{currentStep.visited.join(" ➔ ")}]</code>
        </div>
      </div>
    </div>
  );
};

export default DFSVisualizer;
