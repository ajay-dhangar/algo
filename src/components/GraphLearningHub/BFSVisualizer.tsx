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
  queue: number[];
  visited: number[];
  explanation: string;
}

const generateBFSSteps = (): StepState[] => {
  const steps: StepState[] = [];
  const visitedSet = new Set<number>();
  const queue: number[] = [0];
  visitedSet.add(0);

  steps.push({
    currentNode: null,
    queue: [...queue],
    visited: Array.from(visitedSet),
    explanation: "Start BFS from Node 0. Push Node 0 into Queue and mark as visited.",
  });

  while (queue.length > 0) {
    const node = queue.shift()!;
    steps.push({
      currentNode: node,
      queue: [...queue],
      visited: Array.from(visitedSet),
      explanation: `Dequeue Node ${node}. Inspecting its adjacent neighbors.`,
    });

    const currentNodeData = GRAPH_NODES.find((n) => n.id === node);
    if (currentNodeData) {
      for (const neighbor of currentNodeData.neighbors) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          queue.push(neighbor);
          steps.push({
            currentNode: node,
            queue: [...queue],
            visited: Array.from(visitedSet),
            explanation: `Discovered unvisited neighbor Node ${neighbor}. Enqueue Node ${neighbor}.`,
          });
        }
      }
    }
  }

  steps.push({
    currentNode: null,
    queue: [],
    visited: Array.from(visitedSet),
    explanation: "Queue is empty. BFS traversal complete!",
  });

  return steps;
};

const BFS_STEPS = generateBFSSteps();

export const BFSVisualizer: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(0);

  const currentStep = BFS_STEPS[stepIndex];

  const handleNext = () => {
    if (stepIndex < BFS_STEPS.length - 1) setStepIndex((prev) => prev + 1);
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
        <h3 className={styles.title}>🌐 Interactive Breadth-First Search (BFS) Traversal</h3>
        <p className={styles.subtitle}>Step through level-order traversal using a FIFO Queue.</p>
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
          disabled={stepIndex === BFS_STEPS.length - 1}
        >
          Next Step ➡
        </button>
        <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleReset}>
          🔄 Reset
        </button>
        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
          Step {stepIndex + 1} of {BFS_STEPS.length}
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
          <strong>📥 FIFO Queue Status:</strong>{" "}
          {currentStep.queue.length > 0 ? (
            <code>[{currentStep.queue.join(", ")}]</code>
          ) : (
            <em>(Empty)</em>
          )}
        </div>
        <div>
          <strong>✅ Visited Nodes Set:</strong> <code>[{currentStep.visited.join(", ")}]</code>
        </div>
      </div>
    </div>
  );
};

export default BFSVisualizer;
