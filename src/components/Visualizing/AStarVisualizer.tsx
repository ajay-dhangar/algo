import React, { useState, useCallback, useRef, useEffect } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { withVisualizerErrorBoundary } from "./VisualizerErrorBoundary";

// Layout Configuration Constants
const CELL_SIZE = 24;
const DEFAULT_ROWS = 20;
const DEFAULT_COLS = 30;

// Cell State Enums
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

// --- Helper Functions ---
function createEmptyGrid(rows: number, cols: number) {
  return Array.from({ length: rows }, () => Array(cols).fill(CELL_EMPTY));
}

function heuristic(a: [number, number], b: [number, number], allowDiagonal: boolean) {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  if (allowDiagonal) {
    return dx + dy + (Math.SQRT2 - 2) * Math.min(dx, dy);
  }
  return dx + dy;
}

function getNeighbors(row: number, col: number, grid: number[][], rows: number, cols: number, allowDiagonal: boolean) {
  const neighbors: [number, number][] = [];
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

function reconstructPath(cameFrom: Map<string, [number, number]>, current: [number, number]) {
  const path: [number, number][] = [];
  let key = `${current[0]},${current[1]}`;
  while (cameFrom.has(key)) {
    const node = cameFrom.get(key)!;
    path.unshift(node);
    key = `${node[0]},${node[1]}`;
  }
  return path;
}

function getCellColor(cell: number, isDark: boolean) {
  switch (cell) {
    case CELL_WALL:
      return isDark ? "#475569" : "#334155"; // Slate colors adjusted for theme
    case CELL_START:
      return "#10b981"; // Emerald 500
    case CELL_END:
      return "#f43f5e"; // Rose 500
    case CELL_OPEN:
      return isDark ? "#0284c7" : "#38bdf8"; // Deeper sky on dark mode
    case CELL_CLOSED:
      return isDark ? "#4f46e5" : "#818cf8"; // Deeper indigo on dark mode
    case CELL_PATH:
      return "#f59e0b"; // Amber 500
    default:
      return "transparent";
  }
}

function getCellSymbol(cell: number) {
  switch (cell) {
    case CELL_START:
      return "S";
    case CELL_END:
      return "E";
    case CELL_PATH:
      return "✦";
    default:
      return "";
  }
}

// --- Main Visualizer Component ---
function AStarVisualizer() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [numRows, setNumRows] = useState(DEFAULT_ROWS);
  const [numCols, setNumCols] = useState(DEFAULT_COLS);
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [grid, setGrid] = useState(() => createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLS));
  const [mode, setMode] = useState(MODES.WALL);
  const [startPos, setStartPos] = useState<[number, number] | null>(null);
  const [endPos, setEndPos] = useState<[number, number] | null>(null);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("Place a Start node, Destination node, draw walls, then launch visualization.");
  const [stats, setStats] = useState({ visited: 0, pathLen: 0, time: 0 });
  const [speed, setSpeed] = useState(20);

  const isDrawing = useRef(false);
  const runIdRef = useRef(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleCellClick = useCallback(
    (r: number, c: number) => {
      if (running) return;
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);

        if (mode === MODES.START) {
          if (startPos) next[startPos[0]][startPos[1]] = CELL_EMPTY;
          next[r][c] = CELL_START;
          setStartPos([r, c]);
        } else if (mode === MODES.END) {
          if (endPos) next[endPos[0]][endPos[1]] = CELL_EMPTY;
          next[r][c] = CELL_END;
          setEndPos([r, c]);
        } else if (mode === MODES.WALL) {
          if (next[r][c] === CELL_EMPTY) next[r][c] = CELL_WALL;
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
    (r: number, c: number) => {
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
          cell === CELL_OPEN || cell === CELL_CLOSED || cell === CELL_PATH ? CELL_EMPTY : cell
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
    setStatus("Setup standard configurations, then hit visualize.");
    setStats({ visited: 0, pathLen: 0, time: 0 });
  }, [numRows, numCols]);

  useEffect(() => {
    resetGrid();
  }, [numRows, numCols, resetGrid]);

  const generateMaze = useCallback(() => {
    if (running) return;
    runIdRef.current++;

    const newGrid = createEmptyGrid(numRows, numCols);
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        newGrid[r][c] = CELL_WALL;
      }
    }

    const stack: [number, number][] = [];
    const startR = 1;
    const startC = 1;
    if (numRows > 2 && numCols > 2) {
      newGrid[startR][startC] = CELL_EMPTY;
      stack.push([startR, startC]);

      while (stack.length > 0) {
        const [cr, cc] = stack[stack.length - 1];
        const neighbors: [number, number, number, number][] = [];
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
      for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
          newGrid[r][c] = CELL_EMPTY;
        }
      }
    }

    const emptyCells: [number, number][] = [];
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (newGrid[r][c] === CELL_EMPTY) emptyCells.push([r, c]);
      }
    }

    if (emptyCells.length >= 2) {
      const sIdx = Math.floor(Math.random() * emptyCells.length);
      let eIdx = Math.floor(Math.random() * emptyCells.length);
      while (eIdx === sIdx) {
        eIdx = Math.floor(Math.random() * emptyCells.length);
      }
      const [sr, sc] = emptyCells[sIdx];
      const [er, ec] = emptyCells[eIdx];
      newGrid[sr][sc] = CELL_START;
      newGrid[er][ec] = CELL_END;
      setStartPos([sr, sc]);
      setEndPos([er, ec]);
    } else {
      setStartPos(null);
      setEndPos(null);
    }

    setGrid(newGrid);
    setStatus("Generated Maze successfully via Recursive Backtracking.");
    setStats({ visited: 0, pathLen: 0, time: 0 });
  }, [running, numRows, numCols]);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const visualize = useCallback(async () => {
    if (!startPos || !endPos) {
      setStatus("⚠️ Missing anchor bounds. Ensure Start and End points are placed safely.");
      return;
    }
    if (running) return;
    if (!isMounted.current) return;

    runIdRef.current++;
    const localRunId = runIdRef.current;
    setRunning(true);
    clearVisualization();

    await sleep(50);

    const t0 = performance.now();
    setStatus("Computing optimal paths with A* Search heuristics...");

    const openSet = new Map<string, { g: number; f: number; pos: [number, number] }>();
    const closedSet = new Set<string>();
    const cameFrom = new Map<string, [number, number]>();
    const gScore = new Map<string, number>();

    const startKey = `${startPos[0]},${startPos[1]}`;
    const endKey = `${endPos[0]},${endPos[1]}`;

    gScore.set(startKey, 0);
    const startF = heuristic(startPos, endPos, allowDiagonal);
    openSet.set(startKey, { g: 0, f: startF, pos: startPos });

    let visitedCount = 0;

    while (openSet.size > 0) {
      if (!isMounted.current || localRunId !== runIdRef.current) {
        if (isMounted.current) {
          setRunning(false);
          setStatus("Process runtime interrupted.");
        }
        return;
      }

      let currentKey = "";
      let lowestF = Infinity;
      for (const [key, node] of openSet) {
        if (node.f < lowestF) {
          lowestF = node.f;
          currentKey = key;
        }
      }

      const current = openSet.get(currentKey)!;
      openSet.delete(currentKey);
      closedSet.add(currentKey);

      const [cr, cc] = current.pos;

      if (currentKey !== startKey && currentKey !== endKey) {
        setGrid((prev) => {
          const next = prev.map((row) => [...row]);
          next[cr][cc] = CELL_CLOSED;
          return next;
        });
        visitedCount++;
      }

      if (currentKey === endKey) {
        const path = reconstructPath(cameFrom, endPos);
        for (let i = 1; i < path.length; i++) {
          if (!isMounted.current || localRunId !== runIdRef.current) break;
          const [pr, pc] = path[i];
          setGrid((prev) => {
            const next = prev.map((row) => [...row]);
            if (i < path.length - 1) next[pr][pc] = CELL_PATH;
            return next;
          });
          await sleep(speed);
        }

        if (!isMounted.current) return;
        const elapsed = (performance.now() - t0).toFixed(1);
        setStats({ visited: visitedCount, pathLen: path.length, time: Number(elapsed) });
        setStatus(`✅ Evaluation Complete. Path resolved inside ${path.length} vertices.`);
        setRunning(false);
        return;
      }

      const neighbors = getNeighbors(cr, cc, grid, numRows, numCols, allowDiagonal);
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

    if (!isMounted.current) return;
    const elapsed = (performance.now() - t0).toFixed(1);
    setStats({ visited: visitedCount, pathLen: 0, time: Number(elapsed) });
    setStatus(`❌ Extraneous Bounds. Grid space isolates Target destination.`);
    setRunning(false);
  }, [startPos, endPos, running, grid, speed, clearVisualization, allowDiagonal, numRows, numCols]);

  const modeButtons = [
    { key: MODES.START, label: "🟢 Start Node", color: "#10b981" },
    { key: MODES.END, label: "🔴 End Node", color: "#f43f5e" },
    { key: MODES.WALL, label: "🧱 Wall Node", color: isDark ? "#64748b" : "#475569" },
    { key: MODES.ERASE, label: "🧹 Eraser Brush", color: "#94a3b8" },
  ];

  return (
    <div
      style={{
        border: "1px solid var(--ifm-color-emphasis-200, #e2e8f0)",
        borderRadius: "16px",
        padding: "24px",
        margin: "24px 0",
        background: "var(--ifm-card-background-color, #ffffff)",
        color: "var(--ifm-font-color-base, #1e293b)",
        boxShadow: isDark 
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)" 
          : "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        fontFamily: 'var(--ifm-font-family-base, system-ui, sans-serif)',
      }}
    >
      <div style={{ borderBottom: "1px solid var(--ifm-color-emphasis-200, #f1f5f9)", paddingBottom: "14px", marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
          A* Search Pathfinding Engine
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--ifm-color-secondary-darkest, #64748b)", margin: 0 }}>
          An interactive dashboard evaluating structural matrices using shortest path node heuristics.
        </p>
      </div>

      {/* TOP CONFIG BAR */}
      <div style={{ 
        display: "flex", 
        gap: "16px", 
        marginBottom: "20px", 
        flexWrap: "wrap", 
        alignItems: "center", 
        background: "var(--ifm-color-emphasis-100, #f8fafc)", 
        padding: "12px 16px", 
        borderRadius: "12px" 
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ifm-font-color-base)", display: "flex", alignItems: "center", gap: "6px" }}>
            Rows
            <input
              type="number"
              min={10}
              max={40}
              value={numRows}
              onChange={(e) => setNumRows(Math.min(40, Number(e.target.value)))}
              disabled={running}
              style={{ 
                width: "55px", 
                border: "1px solid var(--ifm-color-emphasis-300)", 
                borderRadius: "6px", 
                padding: "4px 6px", 
                fontWeight: 600,
                background: "var(--ifm-background-color)",
                color: "var(--ifm-font-color-base)"
              }}
            />
          </label>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ifm-font-color-base)", display: "flex", alignItems: "center", gap: "6px" }}>
            Cols
            <input
              type="number"
              min={10}
              max={50}
              value={numCols}
              onChange={(e) => setNumCols(Math.min(50, Number(e.target.value)))}
              disabled={running}
              style={{ 
                width: "55px", 
                border: "1px solid var(--ifm-color-emphasis-300)", 
                borderRadius: "6px", 
                padding: "4px 6px", 
                fontWeight: 600,
                background: "var(--ifm-background-color)",
                color: "var(--ifm-font-color-base)"
              }}
            />
          </label>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ifm-font-color-base)", display: "flex", alignItems: "center", gap: "6px", cursor: running ? "not-allowed" : "pointer" }}>
            <input
              type="checkbox"
              checked={allowDiagonal}
              onChange={(e) => setAllowDiagonal(e.target.checked)}
              disabled={running}
              style={{ width: "15px", height: "15px", accentColor: "var(--ifm-color-primary, #3b82f6)" }}
            />
            Diagonal Vectors
          </label>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ifm-font-color-base)" }}>Interval Delay</label>
          <input
            type="range"
            min={1}
            max={100}
            value={101 - speed}
            onChange={(e) => setSpeed(101 - Number(e.target.value))}
            disabled={running}
            style={{ width: "90px", accentColor: "var(--ifm-color-primary, #3b82f6)", cursor: "pointer" }}
          />
        </div>
      </div>

      {/* NODE MODES SELECTOR */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {modeButtons.map((btn) => {
          const isActive = mode === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => setMode(btn.key)}
              disabled={running}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: isActive ? `1px solid ${btn.color}` : "1px solid var(--ifm-color-emphasis-300)",
                background: isActive ? btn.color : "var(--ifm-background-color, #ffffff)",
                color: isActive ? "#ffffff" : "var(--ifm-font-color-base)",
                fontWeight: 600,
                cursor: running ? "not-allowed" : "pointer",
                fontSize: "0.825rem",
                boxShadow: isActive ? `0 4px 12px -2px ${btn.color}55` : "none",
                transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* MATRIX ENGINE BOARD */}
      <div
        style={{
          overflowX: "auto",
          marginBottom: "20px",
          border: "1px solid var(--ifm-color-emphasis-300)",
          borderRadius: "12px",
          background: isDark ? "#1e293b" : "#f1f5f9",
          padding: "8px",
          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${grid[0]?.length || 0}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${grid.length || 0}, ${CELL_SIZE}px)`,
            gap: "1px",
            width: "fit-content",
            userSelect: "none",
            background: isDark ? "#334155" : "#cbd5e1",
            borderRadius: "6px",
            overflow: "hidden",
          }}
          onMouseDown={() => (isDrawing.current = true)}
          onMouseUp={() => (isDrawing.current = false)}
          onMouseLeave={() => (isDrawing.current = false)}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const cellColor = getCellColor(cell, isDark);
              const isSpecial = cell === CELL_START || cell === CELL_END || cell === CELL_PATH;
              return (
                <div
                  key={`${r}-${c}`}
                  onMouseDown={() => handleCellClick(r, c)}
                  onMouseEnter={() => handleCellEnter(r, c)}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    background: cellColor === "transparent" ? "var(--ifm-background-color, #ffffff)" : cellColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: isSpecial ? "#ffffff" : "var(--ifm-color-emphasis-400)",
                    cursor: running ? "default" : "pointer",
                    transition: "background 0.08s ease",
                    boxSizing: "border-box",
                  }}
                >
                  {getCellSymbol(cell)}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CORE OPERATIONAL CALLS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <button
          onClick={visualize}
          disabled={running}
          style={{
            padding: "10px 24px",
            borderRadius: "10px",
            border: "none",
            background: running ? "var(--ifm-color-emphasis-400)" : "linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-darker) 100%)",
            color: "#ffffff",
            fontWeight: 700,
            cursor: running ? "not-allowed" : "pointer",
            fontSize: "0.9rem",
            boxShadow: running ? "none" : "0 4px 14px 0 rgba(0, 0, 0, 0.15)",
          }}
        >
          {running ? "Processing Matrix..." : "⚡ Run Visualizer"}
        </button>
        <button
          onClick={generateMaze}
          disabled={running}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "1px solid var(--ifm-color-emphasis-300)",
            background: "var(--ifm-background-color)",
            color: "var(--ifm-font-color-base)",
            fontWeight: 600,
            cursor: running ? "not-allowed" : "pointer",
            fontSize: "0.875rem",
          }}
        >
          🎲 Recursive Maze
        </button>
        <button
          onClick={clearVisualization}
          disabled={running}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "1px solid var(--ifm-color-emphasis-300)",
            background: "var(--ifm-background-color)",
            color: "var(--ifm-font-color-base)",
            fontWeight: 600,
            cursor: running ? "not-allowed" : "pointer",
            fontSize: "0.875rem",
          }}
        >
          Clear Iterations
        </button>
        <button
          onClick={resetGrid}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "1px solid var(--ifm-color-danger-border, #fca5a5)",
            background: isDark ? "#451a03" : "#fef2f2",
            color: isDark ? "#fca5a5" : "#b91c1c",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.875rem",
            marginLeft: "auto",
          }}
        >
          Reset Board
        </button>
      </div>

      {/* METRICS & ANALYSIS PANEL */}
      {(stats.visited > 0 || stats.pathLen > 0) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
            padding: "16px",
            background: "var(--ifm-color-emphasis-100)",
            border: "1px solid var(--ifm-color-emphasis-200)",
            borderRadius: "12px",
            marginBottom: "16px",
          }}
        >
          {[
            { label: "Visited Set", value: `${stats.visited} nodes` },
            { label: "Path Resolution", value: stats.pathLen > 0 ? `${stats.pathLen} units` : "0 null" },
            { label: "Execution Latency", value: `${stats.time} ms` },
          ].map((metric) => (
            <div key={metric.label} style={{ background: "var(--ifm-background-color)", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--ifm-color-emphasis-300)" }}>
              <div style={{ textTransform: "uppercase", fontSize: "0.65rem", fontWeight: 700, color: "var(--ifm-color-emphasis-500)", marginBottom: "4px" }}>{metric.label}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ifm-font-color-base)" }}>{metric.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* REAL-TIME TERMINAL STATUS */}
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "10px",
          background: isDark ? "#020617" : "#0f172a",
          color: "#38bdf8",
          fontSize: "0.85rem",
          fontFamily: "var(--ifm-font-family-monospace, monospace)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <span style={{ color: "#64748b", marginRight: "8px" }}>$ status_log:</span> {status}
      </div>
    </div>
  );
}

export default withVisualizerErrorBoundary(AStarVisualizer);
