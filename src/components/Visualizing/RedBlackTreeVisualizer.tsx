import React, { useState } from "react";
import { withVisualizerErrorBoundary } from "./VisualizerErrorBoundary";

interface RBNode {
  value: number;
  color: "RED" | "BLACK";
  left: RBNode | null;
  right: RBNode | null;
  parent: RBNode | null;
}

const RedBlackTreeVisualizerComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [root, setRoot] = useState<RBNode | null>(null);
  const [log, setLog] = useState<string[]>([]);

  // Rotations & Balancing Logic
  const rotateLeft = (node: RBNode, currentRoot: RBNode | null): RBNode | null => {
    const rightChild = node.right!;
    node.right = rightChild.left;
    if (rightChild.left !== null) {
      rightChild.left.parent = node;
    }
    rightChild.parent = node.parent;
    if (node.parent === null) {
      currentRoot = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    rightChild.left = node;
    node.parent = rightChild;
    return currentRoot;
  };

  const rotateRight = (node: RBNode, currentRoot: RBNode | null): RBNode | null => {
    const leftChild = node.left!;
    node.left = leftChild.right;
    if (leftChild.right !== null) {
      leftChild.right.parent = node;
    }
    leftChild.parent = node.parent;
    if (node.parent === null) {
      currentRoot = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    leftChild.right = node;
    node.parent = leftChild;
    return currentRoot;
  };

  const balanceTree = (newNode: RBNode, currentRoot: RBNode | null): RBNode | null => {
    let curr = newNode;
    while (curr !== currentRoot && curr.parent !== null && curr.parent.color === "RED") {
      const grandParent = curr.parent.parent!;
      if (curr.parent === grandParent.left) {
        const uncle = grandParent.right;
        if (uncle !== null && uncle.color === "RED") {
          // Case 1: Uncle is Red -> Recolor
          curr.parent.color = "BLACK";
          uncle.color = "BLACK";
          grandParent.color = "RED";
          curr = grandParent;
          setLog((prev) => [...prev, `Recolored: Node ${curr.value}'s parent and uncle to BLACK, grandparent to RED.`]);
        } else {
          // Case 2: Uncle is Black (or null)
          if (curr === curr.parent.right) {
            curr = curr.parent;
            currentRoot = rotateLeft(curr, currentRoot);
            setLog((prev) => [...prev, `Rotated Left at node ${curr.value}.`]);
          }
          // Case 3
          curr.parent!.color = "BLACK";
          grandParent.color = "RED";
          currentRoot = rotateRight(grandParent, currentRoot);
          setLog((prev) => [...prev, `Rotated Right at grandparent ${grandParent.value}.`]);
        }
      } else {
        const uncle = grandParent.left;
        if (uncle !== null && uncle.color === "RED") {
          curr.parent.color = "BLACK";
          uncle.color = "BLACK";
          grandParent.color = "RED";
          curr = grandParent;
          setLog((prev) => [...prev, `Recolored: Node ${curr.value}'s parent and uncle to BLACK, grandparent to RED.`]);
        } else {
          if (curr === curr.parent.left) {
            curr = curr.parent;
            currentRoot = rotateRight(curr, currentRoot);
            setLog((prev) => [...prev, `Rotated Right at node ${curr.value}.`]);
          }
          curr.parent!.color = "BLACK";
          grandParent.color = "RED";
          currentRoot = rotateLeft(grandParent, currentRoot);
          setLog((prev) => [...prev, `Rotated Left at grandparent ${grandParent.value}.`]);
        }
      }
    }
    if (currentRoot !== null) {
      currentRoot.color = "BLACK";
    }
    return currentRoot;
  };

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    setLog((prev) => [...prev, `Inserting node: ${val}`]);

    const newNode: RBNode = {
      value: val,
      color: "RED",
      left: null,
      right: null,
      parent: null
    };

    if (root === null) {
      newNode.color = "BLACK";
      setRoot(newNode);
      setInputValue("");
      setLog((prev) => [...prev, `Root initialized with value ${val} (BLACK).`]);
      return;
    }

    let curr: RBNode | null = root;
    let parentNode: RBNode | null = null;
    while (curr !== null) {
      parentNode = curr;
      if (val < curr.value) {
        curr = curr.left;
      } else if (val > curr.value) {
        curr = curr.right;
      } else {
        setLog((prev) => [...prev, `Node ${val} already exists. Skipping insertion.`]);
        setInputValue("");
        return;
      }
    }

    newNode.parent = parentNode!;
    if (val < parentNode!.value) {
      parentNode!.left = newNode;
    } else {
      parentNode!.right = newNode;
    }

    const balancedRoot = balanceTree(newNode, root);
    setRoot(balancedRoot);
    setInputValue("");
  };

  const handleClear = () => {
    setRoot(null);
    setLog([]);
  };

  // Render SVG nodes helper
  const renderSVGNodes = (
    node: RBNode | null,
    x: number,
    y: number,
    offset: number
  ): JSX.Element[] => {
    if (node === null) return [];

    const elements: JSX.Element[] = [];

    // Left child branch
    if (node.left !== null) {
      elements.push(
        <line
          key={`l-${node.value}`}
          x1={x}
          y1={y}
          x2={x - offset}
          y2={y + 60}
          stroke="#9ca3af"
          strokeWidth="2"
        />
      );
      elements.push(...renderSVGNodes(node.left, x - offset, y + 60, offset / 1.7));
    }

    // Right child branch
    if (node.right !== null) {
      elements.push(
        <line
          key={`r-${node.value}`}
          x1={x}
          y1={y}
          x2={x + offset}
          y2={y + 60}
          stroke="#9ca3af"
          strokeWidth="2"
        />
      );
      elements.push(...renderSVGNodes(node.right, x + offset, y + 60, offset / 1.7));
    }

    // Node Circle
    elements.push(
      <g key={`g-${node.value}`}>
        <circle
          cx={x}
          cy={y}
          r="18"
          fill={node.color === "RED" ? "#ef4444" : "#18181b"}
          stroke={node.color === "RED" ? "#fca5a5" : "#3f3f46"}
          strokeWidth="2"
        />
        <text
          x={x}
          y={y + 4}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="11"
          fontWeight="bold"
        >
          {node.value}
        </text>
      </g>
    );

    return elements;
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 mt-6">
      <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
        Red-Black Tree Interactive Visualizer
      </h3>
      
      <form onSubmit={handleInsert} className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Insert integer value..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
        >
          Insert Node
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
        >
          Clear
        </button>
      </form>

      {root ? (
        <div className="w-full flex justify-center border border-gray-100 dark:border-zinc-800 rounded-xl py-6 bg-gray-50/50 dark:bg-zinc-950/20 overflow-x-auto">
          <svg width="450" height="280">
            {renderSVGNodes(root, 225, 30, 95)}
          </svg>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm mb-6">
          The Red-Black tree is currently empty. Insert values to visualize tree balancing.
        </div>
      )}

      {log.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-xs mb-2 text-gray-500 uppercase tracking-wider">
            Rebalancing Action Logs
          </h4>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1.5 max-h-40 overflow-y-auto font-mono text-xs text-gray-600 dark:text-gray-400">
            {log.map((entry, index) => (
              <div key={index} className="leading-relaxed border-b border-zinc-100 dark:border-zinc-800 pb-1 last:border-0 last:pb-0">
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const RedBlackTreeVisualizer = withVisualizerErrorBoundary(RedBlackTreeVisualizerComponent);
