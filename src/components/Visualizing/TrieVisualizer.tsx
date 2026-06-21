import React, { useState, useCallback, useRef } from "react";
import { withVisualizerErrorBoundary } from "./VisualizerErrorBoundary";

// ── Trie data structure ──

interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  id: string; // unique id for SVG keys
}

let nodeCounter = 0;

function createTrieNode(): TrieNode {
  return {
    children: new Map(),
    isEnd: false,
    id: `n${nodeCounter++}`,
  };
}

function cloneTrie(node: TrieNode): TrieNode {
  const clone: TrieNode = {
    children: new Map(),
    isEnd: node.isEnd,
    id: node.id,
  };
  for (const [ch, child] of node.children) {
    clone.children.set(ch, cloneTrie(child));
  }
  return clone;
}

function insertWord(root: TrieNode, word: string): TrieNode {
  const newRoot = cloneTrie(root);
  let current = newRoot;
  for (const ch of word.toLowerCase()) {
    if (!current.children.has(ch)) {
      current.children.set(ch, createTrieNode());
    }
    current = current.children.get(ch)!;
  }
  current.isEnd = true;
  return newRoot;
}

function searchWord(root: TrieNode, word: string): { found: boolean; path: string[] } {
  let current: TrieNode | undefined = root;
  const path: string[] = [current.id];
  for (const ch of word.toLowerCase()) {
    current = current.children.get(ch);
    if (!current) return { found: false, path };
    path.push(current.id);
  }
  return { found: current.isEnd, path };
}

function deleteWord(root: TrieNode, word: string): TrieNode {
  const newRoot = cloneTrie(root);

  function remove(node: TrieNode, idx: number): boolean {
    if (idx === word.length) {
      if (!node.isEnd) return false;
      node.isEnd = false;
      return node.children.size === 0;
    }
    const ch = word[idx].toLowerCase();
    const child = node.children.get(ch);
    if (!child) return false;
    const shouldDelete = remove(child, idx + 1);
    if (shouldDelete) {
      node.children.delete(ch);
      return !node.isEnd && node.children.size === 0;
    }
    return false;
  }

  remove(newRoot, 0);
  return newRoot;
}

function collectWords(node: TrieNode, prefix: string): string[] {
  const words: string[] = [];
  if (node.isEnd) words.push(prefix);
  const sortedKeys = Array.from(node.children.keys()).sort();
  for (const ch of sortedKeys) {
    words.push(...collectWords(node.children.get(ch)!, prefix + ch));
  }
  return words;
}

// ── Layout calculation ──

interface LayoutNode {
  id: string;
  char: string;
  isEnd: boolean;
  x: number;
  y: number;
  children: LayoutNode[];
  parentX?: number;
  parentY?: number;
}

const NODE_RADIUS = 20;
const LEVEL_HEIGHT = 70;

function computeLayout(node: TrieNode, char: string): LayoutNode {
  const sortedKeys = Array.from(node.children.keys()).sort();
  const childLayouts = sortedKeys.map((ch) =>
    computeLayout(node.children.get(ch)!, ch)
  );

  // Assign positions bottom-up using leaf counting
  let leafCounter = { value: 0 };
  const layout: LayoutNode = {
    id: node.id,
    char,
    isEnd: node.isEnd,
    x: 0,
    y: 0,
    children: childLayouts,
  };
  assignPositions(layout, 0, leafCounter);
  return layout;
}

function assignPositions(
  node: LayoutNode,
  depth: number,
  leafCounter: { value: number }
) {
  node.y = depth * LEVEL_HEIGHT + 30;

  if (node.children.length === 0) {
    node.x = leafCounter.value * 55 + 30;
    leafCounter.value++;
    return;
  }

  for (const child of node.children) {
    child.parentX = node.x;
    child.parentY = node.y;
    assignPositions(child, depth + 1, leafCounter);
  }

  // Center parent above its children
  const firstChild = node.children[0];
  const lastChild = node.children[node.children.length - 1];
  node.x = (firstChild.x + lastChild.x) / 2;

  // Re-assign parentX/parentY for children after centering
  for (const child of node.children) {
    child.parentX = node.x;
    child.parentY = node.y;
  }
}

function getLayoutBounds(node: LayoutNode): {
  minX: number;
  maxX: number;
  maxY: number;
} {
  let minX = node.x;
  let maxX = node.x;
  let maxY = node.y;
  for (const child of node.children) {
    const bounds = getLayoutBounds(child);
    minX = Math.min(minX, bounds.minX);
    maxX = Math.max(maxX, bounds.maxX);
    maxY = Math.max(maxY, bounds.maxY);
  }
  return { minX, maxX, maxY };
}

// ── SVG Rendering ──

function renderEdges(node: LayoutNode, offsetX: number): JSX.Element[] {
  const edges: JSX.Element[] = [];
  for (const child of node.children) {
    edges.push(
      <line
        key={`edge-${node.id}-${child.id}`}
        x1={node.x + offsetX}
        y1={node.y}
        x2={child.x + offsetX}
        y2={child.y}
        stroke="#6b7280"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
    );
    edges.push(...renderEdges(child, offsetX));
  }
  return edges;
}

function renderNodes(
  node: LayoutNode,
  offsetX: number,
  highlightedIds: Set<string>,
  animatingId: string | null
): JSX.Element[] {
  const elements: JSX.Element[] = [];

  const isHighlighted = highlightedIds.has(node.id);
  const isAnimating = animatingId === node.id;

  let fillColor = "#1e293b"; // default dark
  let strokeColor = "#475569";

  if (node.isEnd) {
    fillColor = "#059669";
    strokeColor = "#34d399";
  }
  if (isHighlighted) {
    fillColor = "#f59e0b";
    strokeColor = "#fbbf24";
  }
  if (isAnimating) {
    fillColor = "#3b82f6";
    strokeColor = "#60a5fa";
  }

  elements.push(
    <g key={`node-${node.id}`}>
      <circle
        cx={node.x + offsetX}
        cy={node.y}
        r={NODE_RADIUS}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2.5"
        style={{
          transition: "fill 0.3s ease, stroke 0.3s ease",
          filter: isAnimating ? "drop-shadow(0 0 8px #3b82f6)" : "none",
        }}
      />
      <text
        x={node.x + offsetX}
        y={node.y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ffffff"
        fontSize="14"
        fontWeight="bold"
        fontFamily="monospace"
      >
        {node.char === "root" ? "∅" : node.char}
      </text>
      {node.isEnd && (
        <circle
          cx={node.x + offsetX + NODE_RADIUS - 4}
          cy={node.y - NODE_RADIUS + 4}
          r="5"
          fill="#10b981"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
      )}
    </g>
  );

  for (const child of node.children) {
    elements.push(...renderNodes(child, offsetX, highlightedIds, animatingId));
  }

  return elements;
}

// ── Main Component ──

const TrieVisualizerComponent: React.FC = () => {
  const [root, setRoot] = useState<TrieNode>(createTrieNode);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("Insert words to build the Trie.");
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const runIdRef = useRef(0);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const animatePath = useCallback(
    async (ids: string[], localRunId: number) => {
      for (const id of ids) {
        if (runIdRef.current !== localRunId) return;
        setAnimatingId(id);
        setHighlightedIds((prev) => new Set(prev).add(id));
        await sleep(400);
      }
      setAnimatingId(null);
    },
    []
  );

  const handleInsert = useCallback(async () => {
    const word = input.trim().toLowerCase();
    if (!word || running) return;
    if (!/^[a-z]+$/.test(word)) {
      setStatus("⚠️ Only lowercase letters (a–z) are allowed.");
      return;
    }

    runIdRef.current++;
    const localRunId = runIdRef.current;
    setRunning(true);
    setHighlightedIds(new Set());
    setAnimatingId(null);

    // Perform insert
    const newRoot = insertWord(root, word);
    setRoot(newRoot);
    setInput("");

    // Animate the inserted path
    const { path } = searchWord(newRoot, word);
    await animatePath(path, localRunId);

    if (runIdRef.current === localRunId) {
      setStatus(`✅ Inserted "${word}"`);
      setLog((prev) => [...prev, `INSERT "${word}"`]);
      setRunning(false);
      setTimeout(() => {
        setHighlightedIds(new Set());
      }, 800);
    }
  }, [input, root, running, animatePath]);

  const handleSearch = useCallback(async () => {
    const word = input.trim().toLowerCase();
    if (!word || running) return;
    if (!/^[a-z]+$/.test(word)) {
      setStatus("⚠️ Only lowercase letters (a–z) are allowed.");
      return;
    }

    runIdRef.current++;
    const localRunId = runIdRef.current;
    setRunning(true);
    setHighlightedIds(new Set());
    setAnimatingId(null);

    const { found, path } = searchWord(root, word);
    await animatePath(path, localRunId);

    if (runIdRef.current === localRunId) {
      if (found) {
        setStatus(`✅ "${word}" found in the Trie!`);
        setLog((prev) => [...prev, `SEARCH "${word}" → Found`]);
      } else {
        setStatus(`❌ "${word}" not found in the Trie.`);
        setLog((prev) => [...prev, `SEARCH "${word}" → Not Found`]);
      }
      setRunning(false);
      setTimeout(() => {
        setHighlightedIds(new Set());
      }, 1200);
    }
  }, [input, root, running, animatePath]);

  const handleDelete = useCallback(async () => {
    const word = input.trim().toLowerCase();
    if (!word || running) return;
    if (!/^[a-z]+$/.test(word)) {
      setStatus("⚠️ Only lowercase letters (a–z) are allowed.");
      return;
    }

    runIdRef.current++;
    const localRunId = runIdRef.current;
    setRunning(true);
    setHighlightedIds(new Set());

    // First animate the path
    const { found, path } = searchWord(root, word);
    await animatePath(path, localRunId);

    if (runIdRef.current !== localRunId) return;

    if (found) {
      const newRoot = deleteWord(root, word);
      setRoot(newRoot);
      setStatus(`🗑️ Deleted "${word}" from the Trie.`);
      setLog((prev) => [...prev, `DELETE "${word}"`]);
    } else {
      setStatus(`❌ "${word}" not found — cannot delete.`);
      setLog((prev) => [...prev, `DELETE "${word}" → Not Found`]);
    }

    setInput("");
    setRunning(false);
    setHighlightedIds(new Set());
  }, [input, root, running, animatePath]);

  const handleClear = useCallback(() => {
    nodeCounter = 0;
    runIdRef.current++;
    setRoot(createTrieNode());
    setInput("");
    setHighlightedIds(new Set());
    setAnimatingId(null);
    setLog([]);
    setRunning(false);
    setStatus("Trie cleared. Insert words to begin.");
  }, []);

  const handleLoadExample = useCallback(() => {
    if (running) return;
    nodeCounter = 0;
    let newRoot = createTrieNode();
    const words = ["apple", "app", "ape", "bat", "ball", "bar"];
    for (const w of words) {
      newRoot = insertWord(newRoot, w);
    }
    setRoot(newRoot);
    setLog(words.map((w) => `INSERT "${w}"`));
    setStatus(`Loaded example words: ${words.join(", ")}`);
    setHighlightedIds(new Set());
    setAnimatingId(null);
  }, [running]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInsert();
    }
  };

  // Build SVG layout
  const layout = computeLayout(root, "root");
  const bounds = getLayoutBounds(layout);
  const padding = 40;
  const svgWidth = Math.max(bounds.maxX - bounds.minX + padding * 2, 200);
  const svgHeight = bounds.maxY + padding + 20;
  const offsetX = -bounds.minX + padding;

  const words = collectWords(root, "");

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 mt-6">
      <h3 className="text-xl font-bold mb-1 text-emerald-600 dark:text-emerald-400">
        Trie (Prefix Tree) Interactive Visualizer
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Insert, search, and delete words to see how a Trie works. Green dots mark end-of-word nodes.
      </p>

      {/* Input & Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a word (a–z)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={running}
          className="px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm flex-1 min-w-[150px]"
        />
        <button
          onClick={handleInsert}
          disabled={running || !input.trim()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition"
        >
          Insert
        </button>
        <button
          onClick={handleSearch}
          disabled={running || !input.trim()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition"
        >
          Search
        </button>
        <button
          onClick={handleDelete}
          disabled={running || !input.trim()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition"
        >
          Delete
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleLoadExample}
          disabled={running}
          className="px-3 py-1.5 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 disabled:opacity-50 rounded-lg text-xs font-medium transition"
        >
          📚 Load Example
        </button>
        <button
          onClick={handleClear}
          className="px-3 py-1.5 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-lg text-xs font-medium transition"
        >
          🗑️ Clear All
        </button>
      </div>

      {/* Trie SVG Visualization */}
      {root.children.size > 0 ? (
        <div className="w-full flex justify-center border border-gray-100 dark:border-zinc-800 rounded-xl py-4 bg-gray-50/50 dark:bg-zinc-950/20 overflow-x-auto mb-4">
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            style={{ minWidth: svgWidth }}
          >
            {renderEdges(layout, offsetX)}
            {renderNodes(layout, offsetX, highlightedIds, animatingId)}
          </svg>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm mb-4">
          The Trie is empty. Insert words or load the example to visualize.
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: "#1e293b", border: "2px solid #475569" }}
          />
          Internal Node
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: "#059669", border: "2px solid #34d399" }}
          />
          End of Word
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: "#f59e0b", border: "2px solid #fbbf24" }}
          />
          Highlighted Path
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: "#3b82f6", border: "2px solid #60a5fa" }}
          />
          Currently Traversing
        </div>
      </div>

      {/* Words in Trie */}
      {words.length > 0 && (
        <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-lg">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Words in Trie ({words.length}):
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {words.map((w) => (
              <span
                key={w}
                className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 rounded text-xs font-mono"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 text-sm font-medium mb-4">
        {status}
      </div>

      {/* Operation Log */}
      {log.length > 0 && (
        <div>
          <h4 className="font-semibold text-xs mb-2 text-gray-500 uppercase tracking-wider">
            Operation Log
          </h4>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1.5 max-h-40 overflow-y-auto font-mono text-xs text-gray-600 dark:text-gray-400">
            {log.map((entry, index) => (
              <div
                key={index}
                className="leading-relaxed border-b border-zinc-100 dark:border-zinc-800 pb-1 last:border-0 last:pb-0"
              >
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TrieVisualizer = withVisualizerErrorBoundary(TrieVisualizerComponent);
