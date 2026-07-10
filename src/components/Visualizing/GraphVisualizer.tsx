import React, { useState, useRef, useEffect } from "react";
import { withVisualizerErrorBoundary } from "./VisualizerErrorBoundary";
import "./graphVisualizer.css";

interface NodeData {
  id: number;
  x: number;
  y: number;
}

interface EdgeData {
  u: number;
  v: number;
  weight: number;
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

const initialEdges: EdgeData[] = [
  { u: 0, v: 1, weight: 2 },
  { u: 0, v: 2, weight: 5 },
  { u: 1, v: 3, weight: 1 },
  { u: 1, v: 4, weight: 4 },
  { u: 2, v: 5, weight: 3 },
  { u: 2, v: 6, weight: 7 },
  { u: 4, v: 5, weight: 2 },
];

const waitforme = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const GraphVisualizer: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [edges, setEdges] = useState<EdgeData[]>(initialEdges);
  const [algorithm, setAlgorithm] = useState<"BFS" | "DFS" | "Dijkstra" | "A_STAR" | "Prim">("BFS");
  const [speed, setSpeed] = useState<number>(500);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<"view" | "edit">("view");

  // Selection & drag states
  const [startNode, setStartNode] = useState<number>(0);
  const [targetNode, setTargetNode] = useState<number>(6);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [draggingNode, setDraggingNode] = useState<number | null>(null);

  // Visualization tracking states
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [visitedEdges, setVisitedEdges] = useState<Set<string>>(new Set());
  const [shortestPathEdges, setShortestPathEdges] = useState<Set<string>>(new Set());
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [dataStructure, setDataStructure] = useState<string[]>([]);

  const speedRef = useRef(speed);
  speedRef.current = speed;
  const isMounted = useRef(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Sync Start/Target node defaults if list of nodes shifts
  useEffect(() => {
    if (nodes.length > 0) {
      const ids = nodes.map((n) => n.id);
      if (!ids.includes(startNode)) {
        setStartNode(ids[0]);
      }
      if (!ids.includes(targetNode)) {
        setTargetNode(ids[ids.length - 1] || ids[0]);
      }
    } else {
      setSelectedNode(null);
    }
  }, [nodes]);

  const resetGraph = () => {
    setVisitedNodes(new Set());
    setVisitedEdges(new Set());
    setShortestPathEdges(new Set());
    setCurrentNode(null);
    setDataStructure([]);
    setIsRunning(false);
  };

  const clearCanvas = () => {
    if (isRunning) return;
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    resetGraph();
  };

  const restoreDefaultGraph = () => {
    if (isRunning) return;
    setNodes(initialNodes);
    setEdges(initialEdges);
    setStartNode(0);
    setTargetNode(6);
    setSelectedNode(null);
    resetGraph();
  };

  // Node operations
  const addNode = (x: number, y: number) => {
    if (mode !== "edit" || isRunning) return;
    const nextId = nodes.length > 0 ? Math.max(...nodes.map((n) => n.id)) + 1 : 0;
    const newNode: NodeData = { id: nextId, x, y };
    setNodes((prev) => [...prev, newNode]);
    resetGraph();
  };

  const deleteNode = (id: number) => {
    if (mode !== "edit" || isRunning) return;
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.u !== id && e.v !== id));
    if (selectedNode === id) setSelectedNode(null);
    resetGraph();
  };

  // Click on canvas
  const handleSvgDoubleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (mode !== "edit" || isRunning || !svgRef.current || e.target !== e.currentTarget) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    // Boundary check padding
    if (x > 25 && x < rect.width - 25 && y > 25 && y < rect.height - 25) {
      addNode(x, y);
    }
  };

  // Node selection and edge drawing logic
  const handleNodeClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (isRunning) return;

    if (mode === "edit") {
      if (selectedNode === null) {
        setSelectedNode(id);
      } else if (selectedNode === id) {
        setSelectedNode(null);
      } else {
        // Draw or toggle edge between selectedNode and this clicked node
        const u = Math.min(selectedNode, id);
        const v = Math.max(selectedNode, id);
        const edgeExists = edges.some((e) => e.u === u && e.v === v);

        if (edgeExists) {
          // Remove edge
          setEdges((prev) => prev.filter((e) => !(e.u === u && e.v === v)));
        } else {
          // Add edge
          setEdges((prev) => [...prev, { u, v, weight: 3 }]);
        }
        setSelectedNode(null);
        resetGraph();
      }
    } else {
      setSelectedNode(id);
    }
  };

  // Drag and Drop implementation
  const handleNodeMouseDown = (e: React.MouseEvent, id: number) => {
    if (isRunning) return;
    setDraggingNode(id);
    setSelectedNode(id);
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (draggingNode === null || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left));
    const y = Math.max(20, Math.min(rect.height - 20, e.clientY - rect.top));

    setNodes((prev) =>
      prev.map((n) => (n.id === draggingNode ? { ...n, x: Math.round(x), y: Math.round(y) } : n))
    );
  };

  const handleSvgMouseUp = () => {
    setDraggingNode(null);
  };

  const handleWeightClick = (e: React.MouseEvent, u: number, v: number) => {
    e.stopPropagation();
    if (mode !== "edit" || isRunning) return;
    const edge = edges.find((edge) => edge.u === u && edge.v === v);
    if (!edge) return;

    const res = prompt(`Enter new weight for Edge ${u}-${v} (1-99):`, edge.weight.toString());
    if (res !== null) {
      const parsed = parseInt(res);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 99) {
        setEdges((prev) =>
          prev.map((edgeItem) =>
            edgeItem.u === u && edgeItem.v === v ? { ...edgeItem, weight: parsed } : edgeItem
          )
        );
        resetGraph();
      }
    }
  };

  // Graph Builders
  const buildAdjacencyList = () => {
    const adj: Record<number, number[]> = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e) => {
      if (adj[e.u] && adj[e.v]) {
        adj[e.u].push(e.v);
        adj[e.v].push(e.u); // Undirected
      }
    });
    // Sort adjacencies sequentially for left-to-right processing visual consistency
    Object.values(adj).forEach((neighbors) => neighbors.sort((a, b) => a - b));
    return adj;
  };

  const getEdgeKey = (u: number, v: number) => {
    const min = Math.min(u, v);
    const max = Math.max(u, v);
    return `${min}-${max}`;
  };

  const getEdgeWeight = (u: number, v: number) => {
    const edge = edges.find((e) => (e.u === u && e.v === v) || (e.u === v && e.v === u));
    return edge ? edge.weight : Infinity;
  };

  // Euclidean heuristic distance for A* using actual canvas positions
  const getHeuristic = (uId: number, targetId: number) => {
    const uNode = nodes.find((n) => n.id === uId);
    const tNode = nodes.find((n) => n.id === targetId);
    if (!uNode || !tNode) return 0;
    const dx = uNode.x - tNode.x;
    const dy = uNode.y - tNode.y;
    // Scaling distance coordinates to ensure the heuristic is admissible (does not overestimate)
    return Math.round(Math.sqrt(dx * dx + dy * dy) / 100);
  };

  const markVisitedEdge = (u: number, v: number) => {
    setVisitedEdges((prev) => {
      const next = new Set(prev);
      next.add(getEdgeKey(u, v));
      return next;
    });
  };

  // ALGORITHMS
  const runBFS = async () => {
    const adj = buildAdjacencyList();
    if (nodes.length === 0 || !adj[startNode]) return;

    const queue: number[] = [startNode];
    const visited = new Set<number>([startNode]);

    setDataStructure(queue.map((q) => `Node ${q}`));
    setVisitedNodes(new Set(visited));

    while (queue.length > 0) {
      if (!isMounted.current) return;
      const curr = queue.shift()!;
      setDataStructure(queue.map((q) => `Node ${q}`));
      setCurrentNode(curr);
      await waitforme(speedRef.current);

      for (const neighbor of adj[curr]) {
        if (!isMounted.current) return;
        if (!visited.has(neighbor)) {
          markVisitedEdge(curr, neighbor);
          visited.add(neighbor);
          setVisitedNodes(new Set(visited));
          queue.push(neighbor);
          setDataStructure(queue.map((q) => `Node ${q}`));
          await waitforme(speedRef.current);
        }
      }
    }
    setCurrentNode(null);
  };

  const runDFS = async () => {
    const adj = buildAdjacencyList();
    if (nodes.length === 0 || !adj[startNode]) return;

    const stack: number[] = [startNode];
    const visited = new Set<number>();

    setDataStructure(stack.map((s) => `Node ${s}`));

    while (stack.length > 0) {
      if (!isMounted.current) return;
      const curr = stack.pop()!;
      setDataStructure(stack.map((s) => `Node ${s}`));

      if (!visited.has(curr)) {
        visited.add(curr);
        setVisitedNodes(new Set(visited));
        setCurrentNode(curr);
        await waitforme(speedRef.current);

        // Process neighbors in reverse for visual consistency
        const neighbors = [...adj[curr]].reverse();
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            markVisitedEdge(curr, neighbor);
            stack.push(neighbor);
          }
        }
        setDataStructure(stack.map((s) => `Node ${s}`));
        await waitforme(speedRef.current);
      }
    }
    setCurrentNode(null);
  };

  const runDijkstra = async () => {
    const adj = buildAdjacencyList();
    if (nodes.length === 0 || !adj[startNode]) return;

    const dist: Record<number, number> = {};
    const prev: Record<number, number | null> = {};
    const unvisited = new Set<number>();

    nodes.forEach((n) => {
      dist[n.id] = Infinity;
      prev[n.id] = null;
      unvisited.add(n.id);
    });
    dist[startNode] = 0;

    const updateDSConsole = () => {
      const sortedQueue = Array.from(unvisited)
        .filter((id) => dist[id] !== Infinity)
        .sort((a, b) => dist[a] - dist[b]);
      setDataStructure(sortedQueue.map((id) => `Node ${id} (dist: ${dist[id]})`));
    };

    updateDSConsole();

    while (unvisited.size > 0) {
      if (!isMounted.current) return;

      // Extract node with min distance
      let curr: number | null = null;
      let minDist = Infinity;
      unvisited.forEach((id) => {
        if (dist[id] < minDist) {
          minDist = dist[id];
          curr = id;
        }
      });

      if (curr === null || dist[curr] === Infinity) break;

      unvisited.delete(curr);
      setCurrentNode(curr);
      setVisitedNodes((prevSet) => new Set([...prevSet, curr!]));
      updateDSConsole();
      await waitforme(speedRef.current);

      if (curr === targetNode) break;

      for (const neighbor of adj[curr]) {
        if (!unvisited.has(neighbor)) continue;

        const weight = getEdgeWeight(curr, neighbor);
        const alt = dist[curr] + weight;

        if (alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = curr;
          markVisitedEdge(curr, neighbor);
          updateDSConsole();
          await waitforme(speedRef.current);
        }
      }
    }

    // Reconstruct shortest path
    const pathEdges = new Set<string>();
    let temp = targetNode;
    while (prev[temp] !== null) {
      const p = prev[temp]!;
      pathEdges.add(getEdgeKey(temp, p));
      temp = p;
    }
    setShortestPathEdges(pathEdges);
    setCurrentNode(null);
  };

  const runAStar = async () => {
    const adj = buildAdjacencyList();
    if (nodes.length === 0 || !adj[startNode]) return;

    const gScore: Record<number, number> = {};
    const fScore: Record<number, number> = {};
    const prev: Record<number, number | null> = {};
    const openSet = new Set<number>([startNode]);
    const visited = new Set<number>();

    nodes.forEach((n) => {
      gScore[n.id] = Infinity;
      fScore[n.id] = Infinity;
      prev[n.id] = null;
    });

    gScore[startNode] = 0;
    fScore[startNode] = getHeuristic(startNode, targetNode);

    const updateDSConsole = () => {
      const sortedQueue = Array.from(openSet).sort((a, b) => fScore[a] - fScore[b]);
      setDataStructure(sortedQueue.map((id) => `Node ${id} (f: ${fScore[id]} = g: ${gScore[id]} + h: ${getHeuristic(id, targetNode)})`));
    };

    updateDSConsole();

    while (openSet.size > 0) {
      if (!isMounted.current) return;

      // Extract node with lowest fScore
      let curr: number | null = null;
      let minF = Infinity;
      openSet.forEach((id) => {
        if (fScore[id] < minF) {
          minF = fScore[id];
          curr = id;
        }
      });

      if (curr === null) break;

      if (curr === targetNode) {
        visited.add(curr);
        setVisitedNodes(new Set(visited));
        setCurrentNode(curr);
        break;
      }

      openSet.delete(curr);
      visited.add(curr);
      setVisitedNodes(new Set(visited));
      setCurrentNode(curr);
      updateDSConsole();
      await waitforme(speedRef.current);

      for (const neighbor of adj[curr]) {
        const tentativeG = gScore[curr] + getEdgeWeight(curr, neighbor);

        if (tentativeG < gScore[neighbor]) {
          prev[neighbor] = curr;
          gScore[neighbor] = tentativeG;
          fScore[neighbor] = tentativeG + getHeuristic(neighbor, targetNode);
          markVisitedEdge(curr, neighbor);

          if (!openSet.has(neighbor)) {
            openSet.add(neighbor);
          }
          updateDSConsole();
          await waitforme(speedRef.current);
        }
      }
    }

    // Path Reconstruction
    const pathEdges = new Set<string>();
    let temp = targetNode;
    while (prev[temp] !== null) {
      const p = prev[temp]!;
      pathEdges.add(getEdgeKey(temp, p));
      temp = p;
    }
    setShortestPathEdges(pathEdges);
    setCurrentNode(null);
  };

  const runPrim = async () => {
    const adj = buildAdjacencyList();
    if (nodes.length === 0 || !adj[startNode]) return;

    const inMST = new Set<number>([startNode]);
    const activeEdges: { u: number; v: number; weight: number }[] = [];
    const mstEdges = new Set<string>();

    const addEdgesOfNode = (nodeId: number) => {
      adj[nodeId].forEach((neighbor) => {
        if (!inMST.has(neighbor)) {
          activeEdges.push({
            u: nodeId,
            v: neighbor,
            weight: getEdgeWeight(nodeId, neighbor),
          });
        }
      });
      // Sort priority queue descending so we pop min
      activeEdges.sort((a, b) => b.weight - a.weight);
    };

    addEdgesOfNode(startNode);
    setVisitedNodes(new Set(inMST));

    const updateDSConsole = () => {
      setDataStructure(activeEdges.map((e) => `Edge ${e.u}-${e.v} (weight: ${e.weight})`));
    };

    updateDSConsole();

    while (inMST.size < nodes.length && activeEdges.length > 0) {
      if (!isMounted.current) return;

      const edge = activeEdges.pop()!;
      updateDSConsole();

      if (inMST.has(edge.v) && inMST.has(edge.u)) continue;

      const nextNode = inMST.has(edge.u) ? edge.v : edge.u;
      inMST.add(nextNode);
      setVisitedNodes(new Set(inMST));
      mstEdges.add(getEdgeKey(edge.u, edge.v));
      setShortestPathEdges(new Set(mstEdges));

      setCurrentNode(nextNode);
      markVisitedEdge(edge.u, edge.v);
      addEdgesOfNode(nextNode);
      updateDSConsole();

      await waitforme(speedRef.current);
    }

    setCurrentNode(null);
  };

  const handleStart = async () => {
    if (isRunning || nodes.length === 0) return;
    resetGraph();
    setIsRunning(true);

    if (algorithm === "BFS") {
      await runBFS();
    } else if (algorithm === "DFS") {
      await runDFS();
    } else if (algorithm === "Dijkstra") {
      await runDijkstra();
    } else if (algorithm === "A_STAR") {
      await runAStar();
    } else if (algorithm === "Prim") {
      await runPrim();
    }

    setIsRunning(false);
  };

  const getNodeClass = (id: number) => {
    let classes = "node-circle";
    if (id === currentNode) classes += " node-current";
    else if (visitedNodes.has(id)) classes += " node-visited";
    else classes += " node-unvisited";

    if (startNode === id) classes += " node-start";
    if (targetNode === id) classes += " node-target";
    if (selectedNode === id) classes += " node-selected";

    return classes;
  };

  const getEdgeClass = (u: number, v: number) => {
    const key = getEdgeKey(u, v);
    if (shortestPathEdges.has(key)) {
      return algorithm === "Prim" ? "edge-line edge-mst" : "edge-line edge-shortest-path";
    }
    if (visitedEdges.has(key)) return "edge-line edge-visited";
    return "edge-line edge-unvisited";
  };

  const getHintMessage = () => {
    if (isRunning) return "Algorithm running... View the step-by-step console.";
    if (mode === "view") {
      return `View Mode: Select start/target node by clicking it. Current Start: Node ${startNode}, Current Target: Node ${targetNode}`;
    }

    if (selectedNode === null) {
      return "Edit Mode: Click any node to select it, or DOUBLE-CLICK empty space to create a Node.";
    }

    return `Edit Mode: Click another Node to connect/toggle an Edge, or use the context panel to modify its settings.`;
  };

  return (
    <div className="graph-visualizer-container">
      {/* Action Mode Toggle Headers */}
      <div className="graph-controls">
        <button
          className={mode === "view" ? "active" : ""}
          onClick={() => {
            setMode("view");
            setSelectedNode(null);
            resetGraph();
          }}
          disabled={isRunning}
        >
          🔍 View / Run Mode
        </button>
        <button
          className={mode === "edit" ? "active" : ""}
          onClick={() => {
            setMode("edit");
            setSelectedNode(null);
            resetGraph();
          }}
          disabled={isRunning}
        >
          🛠 Edit Graph Mode
        </button>

        {mode === "edit" && (
          <>
            <button onClick={restoreDefaultGraph} disabled={isRunning}>
              🔄 Restore Defaults
            </button>
            <button onClick={clearCanvas} disabled={isRunning} style={{ borderColor: "#ff1744", color: "#ff1744" }}>
              🗑 Clear Canvas
            </button>
          </>
        )}
      </div>

      <div className="edit-hint">{getHintMessage()}</div>

      {/* Main Control Panel */}
      <div className="graph-controls">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as any)}
          disabled={isRunning}
        >
          <option value="BFS">Breadth-First Search (BFS)</option>
          <option value="DFS">Depth-First Search (DFS)</option>
          <option value="Dijkstra">Dijkstra's Shortest Path</option>
          <option value="A_STAR">A* Shortest Path</option>
          <option value="Prim">Prim's MST</option>
        </select>

        <div className="speed-control">
          <label htmlFor="speed" className="form-label">
            Speed:
          </label>
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

        <button onClick={handleStart} disabled={isRunning || nodes.length === 0} style={{ backgroundColor: "#4caf50", color: "#fff", borderColor: "#4caf50" }}>
          ▶ Start Simulation
        </button>
        <button onClick={resetGraph} disabled={isRunning}>
          Reset
        </button>
      </div>

      {/* Selected Node Action Context Panel */}
      {selectedNode !== null && !isRunning && (
        <div className="graph-controls" style={{ padding: "10px", backgroundColor: "rgba(255,215,0,0.05)", borderRadius: "8px", border: "1px solid var(--ifm-color-emphasis-200)" }}>
          <span style={{ fontSize: "14px", fontWeight: "bold", marginRight: "10px" }}>Selected Node {selectedNode}:</span>
          <button
            onClick={() => {
              setStartNode(selectedNode);
              setSelectedNode(null);
            }}
            style={{ padding: "4px 10px", fontSize: "12px", borderColor: "#00e5ff" }}
          >
            📍 Set as Start
          </button>
          {algorithm !== "Prim" && (
            <button
              onClick={() => {
                setTargetNode(selectedNode);
                setSelectedNode(null);
              }}
              style={{ padding: "4px 10px", fontSize: "12px", borderColor: "#ff1744" }}
            >
              🎯 Set as Target
            </button>
          )}
          {mode === "edit" && (
            <button
              onClick={() => deleteNode(selectedNode)}
              style={{ padding: "4px 10px", fontSize: "12px", borderColor: "#ff1744", color: "#ff1744" }}
            >
              ❌ Delete Node
            </button>
          )}
        </div>
      )}

      {/* Interactive Visualizer Canvas Grid */}
      <div className="graph-area">
        <div className="svg-container">
          <svg
            ref={svgRef}
            width="auto"
            height="400"
            onDoubleClick={handleSvgDoubleClick}
            onMouseMove={handleSvgMouseMove}
            onMouseUp={handleSvgMouseUp}
            onMouseLeave={handleSvgMouseUp}
            role="application"
            aria-label="Interactive Graph Visualizer Canvas"
          >
            {/* Draw edge lines and weight badges */}
            {edges.map((e, idx) => {
              const u = nodes.find((n) => n.id === e.u);
              const v = nodes.find((n) => n.id === e.v);
              if (!u || !v) return null;

              const midX = (u.x + v.x) / 2;
              const midY = (u.y + v.y) / 2;
              const edgeKey = `edge-${e.u}-${e.v}-${idx}`;

              return (
                <g key={edgeKey}>
                  <line
                    x1={u.x}
                    y1={u.y}
                    x2={v.x}
                    y2={v.y}
                    className={getEdgeClass(e.u, e.v)}
                  />
                  {/* Clickable Edge Weight Badges */}
                  <g
                    onClick={(ev) => handleWeightClick(ev, e.u, e.v)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Edge weight ${e.weight} between node ${e.u} and node ${e.v}`}
                    onKeyDown={(ev) => ev.key === 'Enter' && handleWeightClick(ev, e.u, e.v)}
                    className="clickable-badge"
                  >
                    <rect
                      x={midX - 12}
                      y={midY - 9}
                      width="16"
                      height="12"
                      className="weight-rect"
                    />
                    <text x={midX} y={midY} className="weight-text">
                      {e.weight}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Draw node circles and label text */}
            {nodes.map((n) => (
              <g
                key={`node-group-${n.id}`}
                className="node-group"
                onClick={(e) => handleNodeClick(e, n.id)}
                onMouseDown={(e) => handleNodeMouseDown(e, n.id)}
                role="button"
                tabIndex={0}
                aria-label={`Node ${n.id}`}
                onKeyDown={(e) => e.key === 'Enter' && handleNodeClick(e, n.id)}
              >
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
            {algorithm === "BFS" && "Queue (BFS)"}
            {algorithm === "DFS" && "Stack (DFS)"}
            {algorithm === "Dijkstra" && "Priority Queue (Dijkstra)"}
            {algorithm === "A_STAR" && "Priority Queue (A*)"}
            {algorithm === "Prim" && "Active Edges (Prim's MST)"}
          </div>
          <div className="ds-items">
            {dataStructure.map((item, idx) => (
              <div key={`ds-item-${item}-${idx}`} className="ds-item">
                {item}
              </div>
            ))}

            {dataStructure.length === 0 && (
              <div className="ds-empty-state">
                Empty (Idle)
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default withVisualizerErrorBoundary(GraphVisualizer);
