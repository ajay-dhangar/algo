import React, { useState, useCallback, useRef } from "react";

const CELL_SIZE = 24;

const CELL_EMPTY = 0;
const CELL_WALL = 1;
const CELL_START = 2;
const CELL_END = 3;
const CELL_OPEN = 4;
const CELL_CLOSED = 5;
const CELL_PATH = 6;

const MODES = {
  START: "start",
  END: "end",
  WALL: "wall",
  ERASE: "erase",
};

function createEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(CELL_EMPTY));
}

function heuristic(a, b, allowDiagonal) {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  if (allowDiagonal) {
    return dx + dy + (Math.SQRT2 - 2) * Math.min(dx, dy);
  }
  return dx + dy;
}

function getNeighbors(row, col, grid, rows, cols, allowDiagonal) {
  const neighbors = [];
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  if (allowDiagonal) {
    dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
  }
  for (const [dr, dc] of dirs) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== CELL_WALL) {
      neighbors.push([nr, nc]);
    }
  }
  return neighbors;
}

function reconstructPath(cameFrom, current) {
  const path = [];
  let key = `${current[0]},${current[1]}`;
  while (cameFrom.has(key)) {
    const node = cameFrom.get(key);
    path.unshift(node);
    key = `${node[0]},${node[1]}`;
  }
  return path;
}

function getCellColor(cell) {
  switch (cell) {
    case CELL_WALL:
      return "#334155";
    case CELL_START:
      return "#22c55e";
    case CELL_END:
      return "#ef4444";
    case CELL_OPEN:
      return "#38bdf8";
    case CELL_CLOSED:
      return "#6366f1";
    case CELL_PATH:
      return "#facc15";
    default:
      return "var(--ifm-color-emphasis-100)";
  }
}

function getCellBorder(cell) {
  switch (cell) {
    case CELL_START:
      return "2px solid #16a34a";
    case CELL_END:
      return "2px solid #dc2626";
    case CELL_PATH:
      return "2px solid #eab308";
    default:
      return "1px solid var(--ifm-color-emphasis-200)";
  }
}

function getCellSymbol(cell) {
  switch (cell) {
    case CELL_START:
      return "S";
    case CELL_END:
      return "E";
    case CELL_PATH:
      return "★";
    default:
      return "";
  }
}

export default function AStarVisualizer() {
  const [numRows, setNumRows] = useState(DEFAULT_ROWS);
  const [numCols, setNumCols] = useState(DEFAULT_COLS);
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [grid, setGrid] = useState(() => createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLS));
  const [mode, setMode] = useState(MODES.WALL);
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("Place a Start (S), End (E), and draw Walls. Then click Visualize.");
  const [stats, setStats] = useState({ visited: 0, pathLen: 0, time: 0 });
  const [speed, setSpeed] = useState(20);
  const isDrawing = useRef(false);
  const runIdRef = useRef(0);

  const handleCellClick = useCallback(
    (r, c) => {
      if (running) return;
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);

        if (mode === MODES.START) {
          // Remove old start
          if (startPos) next[startPos[0]][startPos[1]] = CELL_EMPTY;
          next[r][c] = CELL_START;
          setStartPos([r, c]);
        } else if (mode === MODES.END) {
          // Remove old end
          if (endPos) next[endPos[0]][endPos[1]] = CELL_EMPTY;
          next[r][c] = CELL_END;
          setEndPos([r, c]);
        } else if (mode === MODES.WALL) {
          if (next[r][c] === CELL_EMPTY) {
            next[r][c] = CELL_WALL;
          }
        } else if (mode === MODES.ERASE) {
          if (next[r][c] === CELL_WALL) {
            next[r][c] = CELL_EMPTY;
          } else if (next[r][c] === CELL_START) {
            next[r][c] = CELL_EMPTY;
            setStartPos(null);
          } else if (next[r][c] === CELL_END) {
            next[r][c] = CELL_EMPTY;
            setEndPos(null);
          }
        }
        return next;
      });
    },
    [mode, startPos, endPos, running]
  );

  const handleCellEnter = useCallback(
    (r, c) => {
      if (!isDrawing.current || running) return;
      if (mode === MODES.WALL) {
        setGrid((prev) => {
          if (prev[r][c] !== CELL_EMPTY) return prev;
          const next = prev.map((row) => [...row]);
          next[r][c] = CELL_WALL;
          return next;
        });
      } else if (mode === MODES.ERASE) {
        setGrid((prev) => {
          if (prev[r][c] !== CELL_WALL) return prev;
          const next = prev.map((row) => [...row]);
          next[r][c] = CELL_EMPTY;
          return next;
        });
      }
    },
    [mode, running]
  );

  const clearVisualization = useCallback(() => {
    setGrid((prev) =>
      prev.map((row) =>
        row.map((cell) =>
          cell === CELL_OPEN || cell === CELL_CLOSED || cell === CELL_PATH
            ? CELL_EMPTY
            : cell
        )
      )
    );
    setStats({ visited: 0, pathLen: 0, time: 0 });
  }, []);

  const resetGrid = useCallback(() => {
    runIdRef.current++;
    setGrid(createEmptyGrid(numRows, numCols));
    setStartPos(null);
    setEndPos(null);
    setRunning(false);
    setStatus("Place a Start (S), End (E), and draw Walls. Then click Visualize.");
    setStats({ visited: 0, pathLen: 0, time: 0 });
  }, [numRows, numCols]);

  React.useEffect(() => {
    resetGrid();
  }, [numRows, numCols, resetGrid]);

  const generateMaze = useCallback(() => {
    if (running) return;
    runIdRef.current++;
    
    // Create grid full of walls
    const newGrid = createEmptyGrid(numRows, numCols);
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        newGrid[r][c] = CELL_WALL;
      }
    }
    
    // Carve passages using recursive backtracking
    const stack = [];
    const startR = 1;
    const startC = 1;
    if (numRows > 2 && numCols > 2) {
      newGrid[startR][startC] = CELL_EMPTY;
      stack.push([startR, startC]);
      
      while (stack.length > 0) {
        const [cr, cc] = stack[stack.length - 1];
        const neighbors = [];
        const dirs = [[-2, 0], [2, 0], [0, -2], [0, 2]];
        
        for (const [dr, dc] of dirs) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr > 0 && nr < numRows - 1 && nc > 0 && nc < numCols - 1 && newGrid[nr][nc] === CELL_WALL) {
            neighbors.push([nr, nc, dr, dc]);
          }
        }
        
        if (neighbors.length > 0) {
          const [nr, nc, dr, dc] = neighbors[Math.floor(Math.random() * neighbors.length)];
          newGrid[cr + dr / 2][cc + dc / 2] = CELL_EMPTY;
          newGrid[nr][nc] = CELL_EMPTY;
          stack.push([nr, nc]);
        } else {
          stack.pop();
        }
      }
    } else {
      // Too small to generate maze, just clear it
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          newGrid[r][c] = CELL_EMPTY;
        }
      }
    }
    
    // Find empty cells for start and end
    const emptyCells = [];
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (newGrid[r][c] === CELL_EMPTY) {
          emptyCells.push([r, c]);
        }
      }
    }
    
    let sr = 0, sc = 0, er = 0, ec = 0;
    if (emptyCells.length >= 2) {
      const sIdx = Math.floor(Math.random() * emptyCells.length);
      let eIdx = Math.floor(Math.random() * emptyCells.length);
      while (eIdx === sIdx) {
        eIdx = Math.floor(Math.random() * emptyCells.length);
      }
      [sr, sc] = emptyCells[sIdx];
      [er, ec] = emptyCells[eIdx];
      newGrid[sr][sc] = CELL_START;
      newGrid[er][ec] = CELL_END;
      setStartPos([sr, sc]);
      setEndPos([er, ec]);
    } else {
      setStartPos(null);
      setEndPos(null);
    }
    
    setGrid(newGrid);
    setStatus("Recursive Backtracking Maze generated! Click Visualize.");
    setStats({ visited: 0, pathLen: 0, time: 0 });
  }, [running, numRows, numCols]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const visualize = useCallback(async () => {
    if (!startPos || !endPos) {
      setStatus("⚠️ Please place both a Start and an End node first.");
      return;
    }
    if (running) return;

    runIdRef.current++;
    const localRunId = runIdRef.current;
    setRunning(true);
    clearVisualization();

    // Wait a frame for clearVisualization to apply
    await sleep(50);

    const t0 = performance.now();
    setStatus("Running A* Search...");

    // A* algorithm
    const openSet = new Map(); // key -> { g, f, pos }
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();

    const startKey = `${startPos[0]},${startPos[1]}`;
    const endKey = `${endPos[0]},${endPos[1]}`;

    gScore.set(startKey, 0);
    const startF = heuristic(startPos, endPos, allowDiagonal);
    openSet.set(startKey, { g: 0, f: startF, pos: startPos });

    let visitedCount = 0;

    while (openSet.size > 0) {
      if (localRunId !== runIdRef.current) {
        setRunning(false);
        setStatus("Cancelled.");
        return;
      }

      // Find node with lowest f in openSet
      let currentKey = null;
      let lowestF = Infinity;
      for (const [key, node] of openSet) {
        if (node.f < lowestF) {
          lowestF = node.f;
          currentKey = key;
        }
      }

      const current = openSet.get(currentKey);
      openSet.delete(currentKey);
      closedSet.add(currentKey);

      const [cr, cc] = current.pos;

      // Visualize closed node
      if (currentKey !== startKey && currentKey !== endKey) {
        setGrid((prev) => {
          const next = prev.map((row) => [...row]);
          next[cr][cc] = CELL_CLOSED;
          return next;
        });
        visitedCount++;
      }

      // Check if we reached the end
      if (currentKey === endKey) {
        // Reconstruct and draw path
        const path = reconstructPath(cameFrom, endPos);
        for (let i = 1; i < path.length; i++) {
          if (localRunId !== runIdRef.current) break;
          const [pr, pc] = path[i];
          setGrid((prev) => {
            const next = prev.map((row) => [...row]);
            next[pr][pc] = CELL_PATH;
            return next;
          });
          await sleep(speed);
        }

        const elapsed = (performance.now() - t0).toFixed(1);
        setStats({ visited: visitedCount, pathLen: path.length, time: elapsed });
        setStatus(`✅ Path found! Length: ${path.length} steps, Visited: ${visitedCount} nodes (${elapsed}ms)`);
        setRunning(false);
        return;
      }

      // Explore neighbors
      const neighbors = getNeighbors(cr, cc, grid, allowDiagonal);
      for (const [nr, nc] of neighbors) {
        const neighborKey = `${nr},${nc}`;
        if (closedSet.has(neighborKey)) continue;

        let stepCost = 1;
        if (allowDiagonal && cr !== nr && cc !== nc) {
          stepCost = Math.SQRT2;
        }

        const tentativeG = (gScore.get(currentKey) || 0) + stepCost;

        if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
          cameFrom.set(neighborKey, current.pos);
          gScore.set(neighborKey, tentativeG);
          const f = tentativeG + heuristic([nr, nc], endPos, allowDiagonal);

          openSet.set(neighborKey, { g: tentativeG, f, pos: [nr, nc] });

          // Visualize open node
          if (neighborKey !== startKey && neighborKey !== endKey) {
            setGrid((prev) => {
              const next = prev.map((row) => [...row]);
              if (next[nr][nc] !== CELL_START && next[nr][nc] !== CELL_END) {
                next[nr][nc] = CELL_OPEN;
              }
              return next;
            });
          }
        }
      }

      await sleep(speed);
    }

    const elapsed = (performance.now() - t0).toFixed(1);
    setStats({ visited: visitedCount, pathLen: 0, time: elapsed });
    setStatus(`❌ No path found. Visited ${visitedCount} nodes (${elapsed}ms)`);
    setRunning(false);
  }, [startPos, endPos, running, grid, speed, clearVisualization, allowDiagonal]);

  const modeButtons = [
    { key: MODES.START, label: "🟢 Start", color: "#22c55e" },
    { key: MODES.END, label: "🔴 End", color: "#ef4444" },
    { key: MODES.WALL, label: "🧱 Wall", color: "#334155" },
    { key: MODES.ERASE, label: "🧹 Erase", color: "#94a3b8" },
  ];

  return (
    <div
      style={{
        border: "1px solid var(--ifm-color-emphasis-300)",
        borderRadius: "12px",
        padding: "24px",
        margin: "24px 0",
        background: "var(--ifm-card-background-color)",
        color: "var(--ifm-font-color-base)",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0" }}>A* Search Algorithm Visualizer</h3>
      <p style={{ fontSize: "0.85rem", color: "var(--ifm-color-emphasis-600)", margin: "0 0 16px 0" }}>
        Select a tool below, then click or drag on the grid.
      </p>

      {/* MODE SELECTOR */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
        {modeButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setMode(btn.key)}
            disabled={running}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: mode === btn.key ? `2px solid ${btn.color}` : "1px solid var(--ifm-color-emphasis-300)",
              background: mode === btn.key ? `${btn.color}22` : "var(--ifm-color-emphasis-100)",
              color: "var(--ifm-font-color-base)",
              fontWeight: mode === btn.key ? 700 : 500,
              cursor: running ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
              transition: "all 0.2s ease",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <button
          onClick={visualize}
          disabled={running}
          style={{
            padding: "8px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#3b82f6",
            color: "#ffffff",
            fontWeight: 700,
            cursor: running ? "not-allowed" : "pointer",
            fontSize: "0.9rem",
            transition: "background 0.2s ease",
          }}
        >
          {running ? "Running..." : "▶ Visualize"}
        </button>
        <button
          onClick={generateMaze}
          disabled={running}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid var(--ifm-color-emphasis-300)",
            background: "var(--ifm-color-emphasis-100)",
            color: "var(--ifm-font-color-base)",
            fontWeight: 600,
            cursor: running ? "not-allowed" : "pointer",
            fontSize: "0.85rem",
          }}
        >
          🎲 Random Maze
        </button>
        <button
          onClick={clearVisualization}
          disabled={running}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid var(--ifm-color-emphasis-300)",
            background: "var(--ifm-color-emphasis-100)",
            color: "var(--ifm-font-color-base)",
            fontWeight: 600,
            cursor: running ? "not-allowed" : "pointer",
            fontSize: "0.85rem",
          }}
        >
          Clear Path
        </button>
        <button
          onClick={resetGrid}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid var(--ifm-color-emphasis-300)",
            background: "var(--ifm-color-emphasis-100)",
            color: "var(--ifm-font-color-base)",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          Reset All
        </button>

        {/* Settings */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto", flexWrap: "wrap" }}>
          <label style={{ fontSize: "0.8rem", color: "var(--ifm-color-emphasis-600)", display: "flex", alignItems: "center", gap: "4px" }}>
            Rows:
            <input
              type="number"
              min={10}
              max={50}
              value={numRows}
              onChange={(e) => setNumRows(Number(e.target.value))}
              disabled={running}
              style={{ width: "50px", background: "var(--ifm-color-emphasis-100)", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "4px", color: "var(--ifm-font-color-base)", padding: "2px 4px" }}
            />
          </label>
          <label style={{ fontSize: "0.8rem", color: "var(--ifm-color-emphasis-600)", display: "flex", alignItems: "center", gap: "4px" }}>
            Cols:
            <input
              type="number"
              min={10}
              max={50}
              value={numCols}
              onChange={(e) => setNumCols(Number(e.target.value))}
              disabled={running}
              style={{ width: "50px", background: "var(--ifm-color-emphasis-100)", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "4px", color: "var(--ifm-font-color-base)", padding: "2px 4px" }}
            />
          </label>
          <label style={{ fontSize: "0.8rem", color: "var(--ifm-color-emphasis-600)", display: "flex", alignItems: "center", gap: "4px", cursor: running ? "not-allowed" : "pointer" }}>
            <input
              type="checkbox"
              checked={allowDiagonal}
              onChange={(e) => setAllowDiagonal(e.target.checked)}
              disabled={running}
              style={{ accentColor: "#3b82f6", cursor: running ? "not-allowed" : "pointer" }}
            />
            Diagonal
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <label style={{ fontSize: "0.8rem", color: "var(--ifm-color-emphasis-600)" }}>Speed:</label>
            <input
              type="range"
              min={1}
              max={100}
              value={101 - speed}
              onChange={(e) => setSpeed(101 - Number(e.target.value))}
              disabled={running}
              style={{ width: "70px", accentColor: "#3b82f6" }}
            />
          </div>
        </div>
      </div>

      {/* GRID */}
      <div
        style={{
          overflowX: "auto",
          marginBottom: "16px",
          paddingBottom: "4px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${grid[0]?.length || 0}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${grid.length || 0}, ${CELL_SIZE}px)`,
            gap: "0px",
            width: "fit-content",
            userSelect: "none",
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid var(--ifm-color-emphasis-300)",
          }}
          onMouseDown={() => (isDrawing.current = true)}
          onMouseUp={() => (isDrawing.current = false)}
          onMouseLeave={() => (isDrawing.current = false)}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                onMouseDown={() => handleCellClick(r, c)}
                onMouseEnter={() => handleCellEnter(r, c)}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  background: getCellColor(cell),
                  border: getCellBorder(cell),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: cell === CELL_START || cell === CELL_END || cell === CELL_PATH ? "#fff" : "transparent",
                  cursor: running ? "default" : "pointer",
                  transition: "background 0.15s ease",
                  boxSizing: "border-box",
                }}
              >
                {getCellSymbol(cell)}
              </div>
            ))
          )}
        </div>
      </div>

      {/* LEGEND */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "12px",
          fontSize: "0.75rem",
          color: "var(--ifm-color-emphasis-600)",
        }}
      >
        {[
          { color: "#22c55e", label: "Start" },
          { color: "#ef4444", label: "End" },
          { color: "#334155", label: "Wall" },
          { color: "#38bdf8", label: "Open (frontier)" },
          { color: "#6366f1", label: "Closed (visited)" },
          { color: "#facc15", label: "Shortest Path" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: item.color,
                border: "1px solid var(--ifm-color-emphasis-300)",
              }}
            />
            {item.label}
          </div>
        ))}
      </div>

      {/* STATS */}
      {(stats.visited > 0 || stats.pathLen > 0) && (
        <div
          style={{
            display: "flex",
            gap: "24px",
            padding: "10px 16px",
            background: "var(--ifm-color-emphasis-100)",
            borderRadius: "8px",
            marginBottom: "12px",
            fontSize: "0.85rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong>Visited:</strong> {stats.visited} nodes
          </div>
          <div>
            <strong>Path Length:</strong> {stats.pathLen > 0 ? `${stats.pathLen} steps` : "N/A"}
          </div>
          <div>
            <strong>Time:</strong> {stats.time}ms
          </div>
        </div>
      )}

      {/* STATUS */}
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          background: "var(--ifm-color-emphasis-100)",
          fontSize: "0.85rem",
          fontWeight: 500,
        }}
      >
        {status}
      </div>
    </div>
  );
}
