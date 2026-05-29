import React, { useState, useRef, useEffect } from "react";
import "./graphVisualizer.css";

interface NodeData {
  id: number;
  x: number;
  y: number;
}

interface EdgeData {
  u: number;
  v: number;
}

const initialNodes: NodeData[] = [
  { id: 0, x: 250, y: 50 },
  { id: 1, x: 150, y: 150 },
  { id: 2, x: 350, y: 150 },
  { id: 3, x: 80, y: 250 },
  { id: 4, x: 220, y: 250 },
  { id: 5, x: 280, y: 250 },
  { id: 6, x: 420, y: 250 },
];

// Edge connections
const initialEdges: EdgeData[] = [
  { u: 0, v: 1 },
  { u: 0, v: 2 },
  { u: 1, v: 3 },
  { u: 1, v: 4 },
  { u: 2, v: 5 },
  { u: 2, v: 6 },
  { u: 4, v: 5 }, // Cross edge to make it a general graph
];

const waitforme = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const GraphVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<"BFS" | "DFS">("BFS");
  const [speed, setSpeed] = useState<number>(500);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // States for visualization
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [dataStructure, setDataStructure] = useState<number[]>([]);

  // We need a ref to access the latest speed inside the async function
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const resetGraph = () => {
    setVisitedNodes(new Set());
    setVisitedEdges(new Set());
    setCurrentNode(null);
    setDataStructure([]);
    setIsRunning(false);
  };

  const buildAdjacencyList = () => {
    const adj: Record<number, number[]> = {};
    initialNodes.forEach((n) => (adj[n.id] = []));
    initialEdges.forEach((e) => {
      adj[e.u].push(e.v);
      adj[e.v].push(e.u); // Undirected graph
    });
    // Sort adjacencies for consistent visualization (left to right)
    Object.values(adj).forEach((neighbors) => {
      neighbors.sort((a, b) => a - b);
    });
    return adj;
  };

  const markEdge = (u: number, v: number) => {
    setVisitedEdges((prev) => {
      const next = new Set(prev);
      next.add(`${u}-${v}`);
      next.add(`${v}-${u}`);
      return next;
    });
  };

  const runBFS = async () => {
    const adj = buildAdjacencyList();
    const queue: number[] = [0];
    const visited = new Set<number>();
    
    setDataStructure([...queue]);
    visited.add(0);
    setVisitedNodes(new Set(visited));

    while (queue.length > 0) {
      const curr = queue.shift()!;
      setDataStructure([...queue]);
      setCurrentNode(curr);
      
      await waitforme(speedRef.current);
      
      for (const neighbor of adj[curr]) {
        if (!visited.has(neighbor)) {
          markEdge(curr, neighbor);
          visited.add(neighbor);
          setVisitedNodes(new Set(visited));
          queue.push(neighbor);
          setDataStructure([...queue]);
          await waitforme(speedRef.current);
        }
      }
    }
    setCurrentNode(null);
  };

  const runDFS = async () => {
    const adj = buildAdjacencyList();
    const stack: number[] = [0];
    const visited = new Set<number>();
    
    // We will use iterative DFS for better visualization of stack
    setDataStructure([...stack]);
    
    while (stack.length > 0) {
      const curr = stack.pop()!;
      setDataStructure([...stack]);
      
      if (!visited.has(curr)) {
        visited.add(curr);
        setVisitedNodes(new Set(visited));
        setCurrentNode(curr);
        
        await waitforme(speedRef.current);
        
        // Add neighbors to stack (reverse order for left-to-right traversal)
        const neighbors = [...adj[curr]].reverse();
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
             markEdge(curr, neighbor);
             stack.push(neighbor);
          }
        }
        setDataStructure([...stack]);
        await waitforme(speedRef.current);
      }
    }
    setCurrentNode(null);
  };

  const handleStart = async () => {
    if (isRunning) return;
    resetGraph();
    setIsRunning(true);
    
    if (algorithm === "BFS") {
      await runBFS();
    } else {
      await runDFS();
    }
    
    setIsRunning(false);
  };

  const getNodeClass = (id: number) => {
    if (id === currentNode) return "node-circle node-current";
    if (visitedNodes.has(id)) return "node-circle node-visited";
    return "node-circle node-unvisited";
  };

  const getEdgeClass = (u: number, v: number) => {
    if (visitedEdges.has(`${u}-${v}`) || visitedEdges.has(`${v}-${u}`)) {
      return "edge-line edge-visited";
    }
    return "edge-line edge-unvisited";
  };

  return (
    <div className="graph-visualizer-container">
      <div className="graph-controls">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as "BFS" | "DFS")}
          disabled={isRunning}
        >
          <option value="BFS">Breadth-First Search (BFS)</option>
          <option value="DFS">Depth-First Search (DFS)</option>
        </select>
        
        <div className="speed-control">
          <label htmlFor="speed">Speed:</label>
          <input
            id="speed"
            type="range"
            min="100"
            max="1500"
            step="100"
            value={1600 - speed}
            onChange={(e) => setSpeed(1600 - parseInt(e.target.value))}
            disabled={isRunning}
          />
        </div>

        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={resetGraph} disabled={isRunning}>
          Reset
        </button>
      </div>

      <div className="graph-area">
        <div className="svg-container">
          <svg width="500" height="350">
            {/* Draw edges first so they are behind nodes */}
            {initialEdges.map((e, idx) => {
              const u = initialNodes.find((n) => n.id === e.u)!;
              const v = initialNodes.find((n) => n.id === e.v)!;
              return (
                <line
                  key={`edge-${idx}`}
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  className={getEdgeClass(e.u, e.v)}
                />
              );
            })}
            
            {/* Draw nodes */}
            {initialNodes.map((n) => (
              <g key={`node-${n.id}`}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="20"
                  className={getNodeClass(n.id)}
                />
                <text x={n.x} y={n.y} className="node-text">
                  {n.id}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="ds-container">
          <div className="ds-header">
            {algorithm === "BFS" ? "Queue" : "Stack"}
          </div>
          <div className="ds-items">
            {dataStructure.map((item, idx) => (
              <div key={`${item}-${idx}`} className="ds-item">
                Node {item}
              </div>
            ))}
            {dataStructure.length === 0 && (
              <div style={{ textAlign: "center", color: "var(--ifm-color-emphasis-500)", marginTop: "20px" }}>
                Empty
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
