import React, { useState, useEffect, useRef, useCallback } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { withVisualizerErrorBoundary } from "./VisualizerErrorBoundary";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Sliders, Edit, BookOpen, Info } from "lucide-react";

// --- CSS styles to inject for transitions and flash animations ---
const styles = `
@keyframes flash-conflict {
  0% { background-color: rgba(239, 68, 68, 0.7); transform: scale(1.05); }
  50% { background-color: rgba(234, 179, 8, 0.7); transform: scale(0.98); }
  100% { background-color: rgba(239, 68, 68, 0.7); transform: scale(1.05); }
}
.animate-flash-conflict {
  animation: flash-conflict 0.6s infinite ease-in-out;
  z-index: 10;
  box-shadow: 0 0 12px #ef4444;
}

@keyframes pop-in {
  0% { transform: scale(0.6); opacity: 0.3; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-pop {
  animation: pop-in 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes fade-orange {
  0% { background-color: rgba(249, 115, 22, 0.6); }
  100% { background-color: transparent; }
}
.animate-backtrack-fade {
  animation: fade-orange 0.8s ease-out;
}

.code-line-active {
  background-color: rgba(99, 102, 241, 0.25) !important;
  border-left: 3px solid #6366f1 !important;
  font-weight: bold;
}
`;

// --- Default Sudoku Presets ---
const SUDOKU_PRESETS = {
  easy: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  backtrackShowcase: [
    [0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  blank: Array.from({ length: 9 }, () => Array(9).fill(0))
};

interface NQueensStep {
  type: string;
  board: number[];
  description: string;
  activeRow: number;
  activeCol: number;
  conflicts: [number, number][];
  solutionsCount: number;
  statesVisited: number;
  backtrackCount: number;
}

interface SudokuStep {
  type: string;
  grid: number[][];
  description: string;
  activeRow: number;
  activeCol: number;
  activeVal: number;
  conflicts: [number, number][];
  statesVisited: number;
  backtrackCount: number;
}

function BacktrackingVisualizer() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // Tab State: "nqueens" | "sudoku"
  const [activeTab, setActiveTab] = useState<"nqueens" | "sudoku">("nqueens");

  // N-Queens Configurations
  const [nQueensSize, setNQueensSize] = useState<number>(4);
  const [nQueensSteps, setNQueensSteps] = useState<NQueensStep[]>([]);
  const [nQueensStepIndex, setNQueensStepIndex] = useState<number>(0);

  // Sudoku Configurations
  const [sudokuPreset, setSudokuPreset] = useState<string>("easy");
  const [sudokuInitialGrid, setSudokuInitialGrid] = useState<number[][]>(() => SUDOKU_PRESETS.easy.map(r => [...r]));
  const [sudokuSteps, setSudokuSteps] = useState<SudokuStep[]>([]);
  const [sudokuStepIndex, setSudokuStepIndex] = useState<number>(0);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);

  // Playback Control States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(300); // ms delay per step
  
  const timerRef = useRef<any>(null);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  // --- TRACING ALGORITHMS ---

  // 1. N-Queens Trace Generator
  const generateNQueensTrace = useCallback((n: number) => {
    const steps: NQueensStep[] = [];
    const board = Array(n).fill(-1); // board[r] = c
    let solutionsCount = 0;
    let statesVisited = 0;
    let backtrackCount = 0;

    const addStep = (
      type: string,
      description: string,
      activeRow = -1,
      activeCol = -1,
      conflicts: [number, number][] = []
    ) => {
      steps.push({
        type,
        board: [...board],
        description,
        activeRow,
        activeCol,
        conflicts,
        solutionsCount,
        statesVisited,
        backtrackCount,
      });
    };

    addStep("start", `Board initialized. Preparing to place ${n} Queens on a ${n}x${n} board.`);

    const isSafe = (row: number, col: number): [number, number][] => {
      const conflictsList: [number, number][] = [];
      for (let r = 0; r < row; r++) {
        const c = board[r];
        if (c === col) {
          conflictsList.push([r, c]);
        }
        const diff = Math.abs(r - row);
        if (Math.abs(c - col) === diff) {
          conflictsList.push([r, c]);
        }
      }
      return conflictsList;
    };

    const solve = (row: number) => {
      if (row === n) {
        solutionsCount++;
        addStep("solution", `🎉 Solution #${solutionsCount} found! All ${n} Queens safely configured.`);
        return;
      }

      for (let col = 0; col < n; col++) {
        statesVisited++;
        addStep(
          "evaluating",
          `Evaluating cell (${row + 1}, ${col + 1}). Checking for column and diagonal attacks...`,
          row,
          col
        );

        const conflicts = isSafe(row, col);
        if (conflicts.length > 0) {
          addStep(
            "conflict",
            `Conflict detected at (${row + 1}, ${col + 1}) with existing Queen(s) at: ${conflicts
              .map(([r, c]) => `(${r + 1}, ${c + 1})`)
              .join(", ")}.`,
            row,
            col,
            conflicts
          );
          continue;
        }

        // Place Queen
        board[row] = col;
        addStep(
          "placed",
          `Safe! Placed Queen at (${row + 1}, ${col + 1}). Advancing to Row ${row + 2}.`,
          row,
          col
        );

        solve(row + 1);

        // Backtrack
        board[row] = -1;
        backtrackCount++;
        addStep(
          "backtrack",
          `Backtracking: Removing Queen from (${row + 1}, ${col + 1}) and rewinding state.`,
          row,
          col
        );
      }
    };

    solve(0);
    addStep(
      "finished",
      `Simulation Complete. Explored ${statesVisited} board configurations, backtracked ${backtrackCount} times, and resolved ${solutionsCount} solutions.`
    );
    return steps;
  }, []);

  // 2. Sudoku Trace Generator
  const generateSudokuTrace = useCallback((initialGrid: number[][]) => {
    const steps: SudokuStep[] = [];
    const grid = initialGrid.map(row => [...row]);
    let statesVisited = 0;
    let backtrackCount = 0;
    let stepCount = 0;
    const MAX_STEPS = 1200; // safety ceiling

    const addStep = (
      type: string,
      description: string,
      r = -1,
      c = -1,
      val = 0,
      conflicts: [number, number][] = []
    ) => {
      if (stepCount >= MAX_STEPS) return;
      stepCount++;
      steps.push({
        type,
        grid: grid.map(row => [...row]),
        description,
        activeRow: r,
        activeCol: c,
        activeVal: val,
        conflicts,
        statesVisited,
        backtrackCount,
      });
    };

    addStep("start", "Sudoku solver initialized. Preparing backtracking search.");

    const getConflicts = (row: number, col: number, val: number): [number, number][] => {
      const conflictsList: [number, number][] = [];
      // Row Check
      for (let c = 0; c < 9; c++) {
        if (c !== col && grid[row][c] === val) {
          conflictsList.push([row, c]);
        }
      }
      // Column Check
      for (let r = 0; r < 9; r++) {
        if (r !== row && grid[r][col] === val) {
          conflictsList.push([r, col]);
        }
      }
      // 3x3 Grid Check
      const boxRowStart = Math.floor(row / 3) * 3;
      const boxColStart = Math.floor(col / 3) * 3;
      for (let r = boxRowStart; r < boxRowStart + 3; r++) {
        for (let c = boxColStart; c < boxColStart + 3; c++) {
          if ((r !== row || c !== col) && grid[r][c] === val) {
            conflictsList.push([r, c]);
          }
        }
      }
      return conflictsList;
    };

    const solve = (): boolean => {
      if (stepCount >= MAX_STEPS) return false;

      let row = -1;
      let col = -1;
      let isEmpty = false;

      // Find first empty cell
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (grid[r][c] === 0) {
            row = r;
            col = c;
            isEmpty = true;
            break;
          }
        }
        if (isEmpty) break;
      }

      if (!isEmpty) return true; // No empty cells, board solved!

      for (let val = 1; val <= 9; val++) {
        if (stepCount >= MAX_STEPS) return false;
        statesVisited++;

        addStep(
          "evaluating",
          `Trying digit ${val} at cell (${row + 1}, ${col + 1}). Checking row, column, and subgrid...`,
          row,
          col,
          val
        );

        const conflicts = getConflicts(row, col, val);
        if (conflicts.length > 0) {
          addStep(
            "conflict",
            `Conflict! Digit ${val} violates constraints at: ${conflicts
              .map(([cr, cc]) => `(${cr + 1}, ${cc + 1})`)
              .join(", ")}.`,
            row,
            col,
            val,
            conflicts
          );
          continue;
        }

        // Place value
        grid[row][col] = val;
        addStep(
          "placed",
          `Success! Placed digit ${val} at (${row + 1}, ${col + 1}). Advancing to next empty cell.`,
          row,
          col,
          val
        );

        if (solve()) return true;

        // Backtrack
        grid[row][col] = 0;
        backtrackCount++;
        addStep(
          "backtrack",
          `Backtracking: Digit ${val} at (${row + 1}, ${col + 1}) led to conflict down the tree. Clearing cell.`,
          row,
          col,
          val
        );
      }

      return false;
    };

    const solved = solve();
    if (stepCount >= MAX_STEPS) {
      addStep(
        "finished",
        `Solver suspended: reached maximum simulation step ceiling of ${MAX_STEPS} steps to prevent lag.`
      );
    } else if (solved) {
      addStep(
        "finished",
        `Sudoku Solved! Successfully placed all digits. Explored ${statesVisited} states and backtracked ${backtrackCount} times.`
      );
    } else {
      addStep(
        "finished",
        `Unsolvable Sudoku! Search space exhausted. Explored ${statesVisited} states and backtracked ${backtrackCount} times.`
      );
    }

    return steps;
  }, []);

  // --- RE-CALCULATE AND RERUN TRACE ON INPUT CHANGES ---

  useEffect(() => {
    if (activeTab === "nqueens") {
      const trace = generateNQueensTrace(nQueensSize);
      setNQueensSteps(trace);
      setNQueensStepIndex(0);
      setIsPlaying(false);
    }
  }, [activeTab, nQueensSize, generateNQueensTrace]);

  useEffect(() => {
    if (activeTab === "sudoku") {
      const trace = generateSudokuTrace(sudokuInitialGrid);
      setSudokuSteps(trace);
      setSudokuStepIndex(0);
      setIsPlaying(false);
    }
  }, [activeTab, sudokuInitialGrid, generateSudokuTrace]);

  // --- PLAYBACK ENGINE ---

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        if (activeTab === "nqueens") {
          setNQueensStepIndex((prev) => {
            if (prev < nQueensSteps.length - 1) return prev + 1;
            setIsPlaying(false);
            return prev;
          });
        } else {
          setSudokuStepIndex((prev) => {
            if (prev < sudokuSteps.length - 1) return prev + 1;
            setIsPlaying(false);
            return prev;
          });
        }
      }, playbackSpeed);
    } else {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPlaying, activeTab, nQueensSteps.length, sudokuSteps.length, playbackSpeed]);

  const handlePresetChange = (presetName: string) => {
    setSudokuPreset(presetName);
    const newBoard = SUDOKU_PRESETS[presetName as keyof typeof SUDOKU_PRESETS].map((r: number[]) => [...r]);
    setSudokuInitialGrid(newBoard);
    setSelectedCell(null);
  };

  const handleCellEdit = (row: number, col: number, val: number) => {
    // Validate if edit is illegal before applying
    if (val !== 0) {
      // Row Check
      for (let c = 0; c < 9; c++) {
        if (c !== col && sudokuInitialGrid[row][c] === val) return;
      }
      // Col Check
      for (let r = 0; r < 9; r++) {
        if (r !== row && sudokuInitialGrid[r][col] === val) return;
      }
      // Grid Check
      const br = Math.floor(row / 3) * 3;
      const bc = Math.floor(col / 3) * 3;
      for (let r = br; r < br + 3; r++) {
        for (let c = bc; c < bc + 3; c++) {
          if ((r !== row || c !== col) && sudokuInitialGrid[r][c] === val) return;
        }
      }
    }

    const updatedGrid = sudokuInitialGrid.map((r, ri) =>
      r.map((cell, ci) => (ri === row && ci === col ? val : cell))
    );
    setSudokuInitialGrid(updatedGrid);
  };

  // --- RENDER HELPERS ---

  const currentNQueensStep = nQueensSteps[nQueensStepIndex] || null;
  const currentSudokuStep = sudokuSteps[sudokuStepIndex] || null;

  // Pseudo-code line tracking
  const getNQueensActiveLine = (): number => {
    if (!currentNQueensStep) return 0;
    switch (currentNQueensStep.type) {
      case "start": return 1;
      case "evaluating": return 4;
      case "conflict": return 4;
      case "placed": return 5;
      case "backtrack": return 7;
      case "solution": return 2;
      case "finished": return 10;
      default: return 0;
    }
  };

  const getSudokuActiveLine = (): number => {
    if (!currentSudokuStep) return 0;
    switch (currentSudokuStep.type) {
      case "start": return 1;
      case "evaluating": return 6;
      case "conflict": return 6;
      case "placed": return 7;
      case "backtrack": return 9;
      case "solution": return 3;
      case "finished": return 12;
      default: return 0;
    }
  };

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
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.4)" 
          : "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        fontFamily: "var(--ifm-font-family-base, system-ui, -apple-system, sans-serif)",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* HEADER SECTION */}
      <div
        style={{
          borderBottom: "1px solid var(--ifm-color-emphasis-200, #f1f5f9)",
          paddingBottom: "16px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 4px 0", fontSize: "1.5rem", fontWeight: 800, color: "var(--ifm-color-primary)" }}>
            Backtracking Visualizer
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--ifm-color-secondary-darkest, #64748b)", margin: 0 }}>
            An interactive playground for exploring N-Queens layout searches and Sudoku constraints solvers.
          </p>
        </div>

        {/* TABS SELECTOR */}
        <div style={{ display: "flex", background: "var(--ifm-color-emphasis-100, #f1f5f9)", padding: "4px", borderRadius: "10px" }}>
          <button
            onClick={() => {
              setActiveTab("nqueens");
              setIsPlaying(false);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "nqueens" ? "var(--ifm-card-background-color, #ffffff)" : "transparent",
              color: activeTab === "nqueens" ? "var(--ifm-color-primary, #6366f1)" : "var(--ifm-color-emphasis-700, #475569)",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeTab === "nqueens" ? "0 2px 4px rgba(0,0,0,0.08)" : "none",
              fontSize: "0.85rem",
            }}
          >
            ♛ N-Queens
          </button>
          <button
            onClick={() => {
              setActiveTab("sudoku");
              setIsPlaying(false);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "sudoku" ? "var(--ifm-card-background-color, #ffffff)" : "transparent",
              color: activeTab === "sudoku" ? "var(--ifm-color-primary, #6366f1)" : "var(--ifm-color-emphasis-700, #475569)",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeTab === "sudoku" ? "0 2px 4px rgba(0,0,0,0.08)" : "none",
              fontSize: "0.85rem",
            }}
          >
            🔢 Sudoku Solver
          </button>
        </div>
      </div>

      {/* CORE INTERFACE */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* CONFIGURATION BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            background: "var(--ifm-color-emphasis-100, #f8fafc)",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          {activeTab === "nqueens" ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--ifm-font-color-base)" }}>
                Chessboard Size (N):
              </label>
              <input
                type="range"
                min={4}
                max={8}
                value={nQueensSize}
                onChange={(e) => setNQueensSize(Number(e.target.value))}
                style={{ accentColor: "var(--ifm-color-primary)", cursor: "pointer", width: "120px" }}
              />
              <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--ifm-color-primary)" }}>
                {nQueensSize}x{nQueensSize}
              </span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--ifm-font-color-base)" }}>
                Sudoku Preset:
              </label>
              <select
                value={sudokuPreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--ifm-color-emphasis-300)",
                  background: "var(--ifm-background-color, #ffffff)",
                  color: "var(--ifm-font-color-base)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <option value="easy">Easy Puzzle</option>
                <option value="backtrackShowcase">Backtracking Showcase</option>
                <option value="blank">Custom / Blank Grid</option>
              </select>
              {sudokuPreset === "blank" && (
                <span style={{ fontSize: "0.8rem", color: "var(--ifm-color-emphasis-600)" }}>
                  💡 Select a cell and press digits 1-9 to configure.
                </span>
              )}
            </div>
          )}

          {/* PLAYBACK SPEED CONTROL */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Sliders size={16} color="var(--ifm-color-emphasis-600)" />
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ifm-font-color-base)" }}>
              Speed
            </label>
            <input
              type="range"
              min={50}
              max={1000}
              step={50}
              value={1050 - playbackSpeed}
              onChange={(e) => setPlaybackSpeed(1050 - Number(e.target.value))}
              style={{ accentColor: "var(--ifm-color-primary)", cursor: "pointer", width: "100px" }}
            />
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--ifm-color-emphasis-600)", minWidth: "50px" }}>
              {playbackSpeed}ms
            </span>
          </div>
        </div>

        {/* INTERACTIVE WORKSPACE ROW */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
          
          {/* LEFT: GRID AND CONTROLS COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", flex: "1 1 450px", maxWidth: "450px" }}>
            
            {/* GRID CANVAS */}
            <div
              style={{
                background: isDark ? "#1e293b" : "#f8fafc",
                border: "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.03)",
                width: "100%",
                maxWidth: "450px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {activeTab === "nqueens" ? (
                // --- N-Queens Chessboard ---
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${nQueensSize}, 1fr)`,
                    gap: "1px",
                    background: isDark ? "#475569" : "#cbd5e1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    width: "100%",
                    aspectRatio: "1/1",
                  }}
                >
                  {Array.from({ length: nQueensSize }).map((_, r) =>
                    Array.from({ length: nQueensSize }).map((_, c) => {
                      const isDarkSquare = (r + c) % 2 === 1;
                      const hasQueen = currentNQueensStep?.board[r] === c;
                      
                      // Calculate highlighting
                      let cellColor = isDarkSquare 
                        ? (isDark ? "#334155" : "#94a3b8") 
                        : (isDark ? "#475569" : "#e2e8f0");
                      
                      let highlightClass = "";
                      const isEvaluating = currentNQueensStep?.activeRow === r && currentNQueensStep?.activeCol === c;
                      const isConflict = !!currentNQueensStep?.conflicts?.some(([cr, cc]) => cr === r && cc === c);
                      const isCurrentConflict = isEvaluating && currentNQueensStep?.type === "conflict";

                      if (isEvaluating) {
                        if (currentNQueensStep?.type === "evaluating") {
                          cellColor = "#facc15"; // Yellow searching
                        } else if (currentNQueensStep?.type === "placed") {
                          cellColor = "#22c55e"; // Green placing
                        } else if (currentNQueensStep?.type === "backtrack") {
                          highlightClass = "animate-backtrack-fade";
                        }
                      }

                      if (isConflict || isCurrentConflict) {
                        highlightClass = "animate-flash-conflict";
                      }

                      if (currentNQueensStep?.type === "solution" && hasQueen) {
                        cellColor = "#10b981"; // Success highlight
                      }

                      return (
                        <div
                          key={`${r}-${c}`}
                          className={highlightClass}
                          style={{
                            backgroundColor: cellColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: nQueensSize > 6 ? "2rem" : "2.6rem",
                            cursor: "default",
                            transition: "background-color 0.25s ease",
                            position: "relative",
                          }}
                        >
                          {hasQueen && (
                            <span
                              className="animate-pop"
                              style={{
                                color: isDarkSquare ? "#ffffff" : "#1e293b",
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                              }}
                            >
                              ♛
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              ) : (
                // --- Sudoku Grid ---
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(9, 1fr)",
                      gap: "1px",
                      background: isDark ? "#475569" : "#475569", // Dark border grid
                      borderRadius: "8px",
                      overflow: "hidden",
                      width: "100%",
                      aspectRatio: "1/1",
                      border: `2px solid ${isDark ? "#475569" : "#1e293b"}`,
                    }}
                  >
                    {Array.from({ length: 9 }).map((_, r) =>
                      Array.from({ length: 9 }).map((_, c) => {
                        const cellVal = currentSudokuStep 
                          ? currentSudokuStep.grid[r][c] 
                          : sudokuInitialGrid[r][c];

                        const isPreset = sudokuInitialGrid[r][c] !== 0;

                        // Identify subgrid boundaries for borders
                        const borderBottom = (r === 2 || r === 5) ? `2px solid ${isDark ? "#94a3b8" : "#1e293b"}` : "none";
                        const borderRight = (c === 2 || c === 5) ? `2px solid ${isDark ? "#94a3b8" : "#1e293b"}` : "none";

                        // Define colors
                        let cellBg = isDark ? "#1e293b" : "#ffffff";
                        let textColor = isPreset 
                          ? "var(--ifm-color-primary)" 
                          : (isDark ? "#e2e8f0" : "#475569");

                        let highlightClass = "";

                        const isEvaluating = currentSudokuStep?.activeRow === r && currentSudokuStep?.activeCol === c;
                        const isConflict = !!currentSudokuStep?.conflicts?.some(([cr, cc]) => cr === r && cc === c);
                        const isCurrentConflict = isEvaluating && currentSudokuStep?.type === "conflict";
                        const isSelected = selectedCell !== null && selectedCell[0] === r && selectedCell[1] === c && sudokuPreset === "blank";

                        let cellStyles: React.CSSProperties = {
                          backgroundColor: cellBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.25rem",
                          fontWeight: isPreset ? 800 : 500,
                          color: textColor,
                          cursor: sudokuPreset === "blank" && !isPlaying ? "pointer" : "default",
                          borderBottom,
                          borderRight,
                          userSelect: "none",
                          transition: "background-color 0.15s ease",
                        };

                        if (isEvaluating) {
                          if (currentSudokuStep?.type === "evaluating") {
                            cellBg = "#fef08a"; // Soft yellow
                            textColor = "#000000";
                          } else if (currentSudokuStep?.type === "placed") {
                            cellBg = "#bbf7d0"; // Soft green
                            textColor = "#000000";
                          } else if (currentSudokuStep?.type === "backtrack") {
                            highlightClass = "animate-backtrack-fade";
                          }
                        }

                        if (isConflict || isCurrentConflict) {
                          highlightClass = "animate-flash-conflict";
                          textColor = "#ffffff";
                        }

                        if (isSelected) {
                          cellBg = "rgba(99, 102, 241, 0.2)";
                          cellStyles.boxShadow = "inset 0 0 0 2px #6366f1";
                        }

                        cellStyles.backgroundColor = cellBg;
                        cellStyles.color = textColor;

                        return (
                          <div
                            key={`${r}-${c}`}
                            onClick={() => {
                              if (sudokuPreset === "blank" && !isPlaying) {
                                setSelectedCell([r, c]);
                              }
                            }}
                            className={highlightClass}
                            style={cellStyles}
                          >
                            {cellVal !== 0 ? cellVal : ""}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* NumPad Input Helper for Custom Sudoku */}
                  {sudokuPreset === "blank" && selectedCell && !isPlaying && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        background: "var(--ifm-color-emphasis-100, #f1f5f9)",
                        padding: "10px",
                        borderRadius: "8px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "4px" }}>
                        Assign Digit to cell ({selectedCell[0] + 1}, {selectedCell[1] + 1}):
                      </div>
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "center" }}>
                        {Array.from({ length: 9 }).map((_, idx) => (
                          <button
                            key={idx + 1}
                            onClick={() => selectedCell && handleCellEdit(selectedCell[0], selectedCell[1], idx + 1)}
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "6px",
                              border: "1px solid var(--ifm-color-emphasis-300)",
                              background: "var(--ifm-card-background-color, #ffffff)",
                              color: "var(--ifm-font-color-base)",
                              fontSize: "0.9rem",
                              fontWeight: "bold",
                              cursor: "pointer",
                            }}
                          >
                            {idx + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => selectedCell && handleCellEdit(selectedCell[0], selectedCell[1], 0)}
                          style={{
                            padding: "0 10px",
                            height: "36px",
                            borderRadius: "6px",
                            border: "1px solid var(--ifm-color-danger-border, #fecaca)",
                            background: isDark ? "#451a03" : "#fef2f2",
                            color: isDark ? "#fca5a5" : "#b91c1c",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* TIMELINE CONTROLS BAR */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                maxWidth: "450px",
                background: "var(--ifm-color-emphasis-100, #f8fafc)",
                padding: "14px",
                borderRadius: "12px",
              }}
            >
              {/* Timeline Scrub Slider */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--ifm-color-emphasis-600)", minWidth: "40px" }}>
                  Step {activeTab === "nqueens" ? nQueensStepIndex : sudokuStepIndex}
                </span>
                <input
                  type="range"
                  min={0}
                  max={activeTab === "nqueens" ? nQueensSteps.length - 1 : sudokuSteps.length - 1}
                  value={activeTab === "nqueens" ? nQueensStepIndex : sudokuStepIndex}
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (activeTab === "nqueens") setNQueensStepIndex(idx);
                    else setSudokuStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  style={{ flexGrow: 1, accentColor: "var(--ifm-color-primary)", cursor: "pointer" }}
                />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--ifm-color-emphasis-600)", minWidth: "40px" }}>
                  Total {activeTab === "nqueens" ? nQueensSteps.length - 1 : sudokuSteps.length - 1}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                <button
                  onClick={() => {
                    if (activeTab === "nqueens") setNQueensStepIndex(0);
                    else setSudokuStepIndex(0);
                    setIsPlaying(false);
                  }}
                  title="Reset"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--ifm-color-emphasis-300)",
                    background: "var(--ifm-background-color, #ffffff)",
                    color: "var(--ifm-font-color-base)",
                    cursor: "pointer",
                  }}
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => {
                    if (activeTab === "nqueens") {
                      setNQueensStepIndex((prev) => Math.max(0, prev - 1));
                    } else {
                      setSudokuStepIndex((prev) => Math.max(0, prev - 1));
                    }
                    setIsPlaying(false);
                  }}
                  title="Step Backward"
                  disabled={activeTab === "nqueens" ? nQueensStepIndex === 0 : sudokuStepIndex === 0}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--ifm-color-emphasis-300)",
                    background: "var(--ifm-background-color, #ffffff)",
                    color: "var(--ifm-font-color-base)",
                    cursor: "pointer",
                    opacity: (activeTab === "nqueens" ? nQueensStepIndex === 0 : sudokuStepIndex === 0) ? 0.5 : 1,
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    padding: "8px 24px",
                    borderRadius: "8px",
                    border: "none",
                    background: isPlaying ? "var(--ifm-color-warning)" : "var(--ifm-color-primary)",
                    color: "#ffffff",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.85rem",
                  }}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  onClick={() => {
                    if (activeTab === "nqueens") {
                      setNQueensStepIndex((prev) => Math.min(nQueensSteps.length - 1, prev + 1));
                    } else {
                      setSudokuStepIndex((prev) => Math.min(sudokuSteps.length - 1, prev + 1));
                    }
                    setIsPlaying(false);
                  }}
                  title="Step Forward"
                  disabled={
                    activeTab === "nqueens" 
                      ? nQueensStepIndex === nQueensSteps.length - 1 
                      : sudokuStepIndex === sudokuSteps.length - 1
                  }
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--ifm-color-emphasis-300)",
                    background: "var(--ifm-background-color, #ffffff)",
                    color: "var(--ifm-font-color-base)",
                    cursor: "pointer",
                    opacity: (
                      activeTab === "nqueens" 
                        ? nQueensStepIndex === nQueensSteps.length - 1 
                        : sudokuStepIndex === sudokuSteps.length - 1
                    ) ? 0.5 : 1,
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: ALGORITHM CODE TRACE AND LOG PANEL */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: "1 1 450px", maxWidth: "100%" }}>
            
            {/* STATS & METRICS GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
              }}
            >
              {[
                {
                  label: "States Evaluated",
                  value: activeTab === "nqueens" 
                    ? currentNQueensStep?.statesVisited || 0 
                    : currentSudokuStep?.statesVisited || 0,
                },
                {
                  label: "Backtracks",
                  value: activeTab === "nqueens" 
                    ? currentNQueensStep?.backtrackCount || 0 
                    : currentSudokuStep?.backtrackCount || 0,
                },
                {
                  label: activeTab === "nqueens" ? "Solutions Found" : "Status",
                  value: activeTab === "nqueens"
                    ? currentNQueensStep?.solutionsCount || 0
                    : currentSudokuStep?.type === "finished" ? "Done" : "Solving...",
                  color: "var(--ifm-color-primary)",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--ifm-color-emphasis-100, #f8fafc)",
                    border: "1px solid var(--ifm-color-emphasis-200)",
                    padding: "10px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--ifm-color-emphasis-500)", textTransform: "uppercase", marginBottom: "4px" }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: stat.color || "var(--ifm-font-color-base)" }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* PSEUDO-CODE PANEL */}
            <div
              style={{
                border: "1px solid var(--ifm-color-emphasis-300)",
                borderRadius: "12px",
                overflow: "hidden",
                background: isDark ? "#0f172a" : "#1e293b",
                color: "#f8fafc",
              }}
            >
              <div
                style={{
                  padding: "10px 16px",
                  background: isDark ? "#1e293b" : "#0f172a",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <BookOpen size={16} color="#6366f1" />
                <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>Backtracking Execution Trace</span>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: "12px",
                  fontSize: "0.78rem",
                  lineHeight: "1.6",
                  fontFamily: "var(--ifm-font-family-monospace, Courier, monospace)",
                  background: "transparent",
                  color: "#cbd5e1",
                  overflowX: "auto",
                }}
              >
                {activeTab === "nqueens" ? (
                  <>
                    <div className={getNQueensActiveLine() === 1 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      1: function solveNQueens(row) &#123;
                    </div>
                    <div className={getNQueensActiveLine() === 2 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      2:   if (row === N) return true; // Solution found
                    </div>
                    <div className={getNQueensActiveLine() === 3 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      3:   for (let col = 0; col &lt; N; col++) &#123;
                    </div>
                    <div className={getNQueensActiveLine() === 4 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      4:     if (isSafe(row, col)) &#123;
                    </div>
                    <div className={getNQueensActiveLine() === 5 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      5:       placeQueen(row, col);
                    </div>
                    <div className={getNQueensActiveLine() === 6 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      6:       if (solveNQueens(row + 1)) return true;
                    </div>
                    <div className={getNQueensActiveLine() === 7 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      7:       removeQueen(row, col); // Backtrack
                    </div>
                    <div className={getNQueensActiveLine() === 8 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      8:     &#125;
                    </div>
                    <div className={getNQueensActiveLine() === 9 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      9:   &#125;
                    </div>
                    <div className={getNQueensActiveLine() === 10 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      10:  return false;
                    </div>
                    <div style={{ padding: "1px 8px" }}>11: &#125;</div>
                  </>
                ) : (
                  <>
                    <div className={getSudokuActiveLine() === 1 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      1: function solveSudoku() &#123;
                    </div>
                    <div className={getSudokuActiveLine() === 2 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      2:   let cell = findEmptyCell();
                    </div>
                    <div className={getSudokuActiveLine() === 3 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      3:   if (!cell) return true; // Solved!
                    </div>
                    <div className={getSudokuActiveLine() === 4 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      4:   let [row, col] = cell;
                    </div>
                    <div className={getSudokuActiveLine() === 5 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      5:   for (let num = 1; num &lt;= 9; num++) &#123;
                    </div>
                    <div className={getSudokuActiveLine() === 6 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      6:     if (isSafe(row, col, num)) &#123;
                    </div>
                    <div className={getSudokuActiveLine() === 7 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      7:       grid[row][col] = num;
                    </div>
                    <div className={getSudokuActiveLine() === 8 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      8:       if (solveSudoku()) return true;
                    </div>
                    <div className={getSudokuActiveLine() === 9 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      9:       grid[row][col] = 0; // Backtrack
                    </div>
                    <div className={getSudokuActiveLine() === 10 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      10:    &#125;
                    </div>
                    <div className={getSudokuActiveLine() === 11 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      11:  &#125;
                    </div>
                    <div className={getSudokuActiveLine() === 12 ? "code-line-active" : ""} style={{ padding: "1px 8px" }}>
                      12:  return false;
                    </div>
                    <div style={{ padding: "1px 8px" }}>13: &#125;</div>
                  </>
                )}
              </pre>
            </div>
            
            {/* REAL-TIME TERMINAL / CONSOLE LOG */}
            <div
              style={{
                background: isDark ? "#020617" : "#0f172a",
                color: "#38bdf8",
                padding: "14px 18px",
                borderRadius: "10px",
                fontSize: "0.85rem",
                fontFamily: "var(--ifm-font-family-monospace, monospace)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
              }}
            >
              <Info size={16} color="#64748b" style={{ marginTop: "2px", flexShrink: 0 }} />
              <div>
                <span style={{ color: "#64748b", marginRight: "6px" }}>status:</span>
                <span style={{ color: isDark ? "#38bdf8" : "#60a5fa" }}>
                  {activeTab === "nqueens" 
                    ? currentNQueensStep?.description 
                    : currentSudokuStep?.description}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LEGEND SECTION */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            borderTop: "1px solid var(--ifm-color-emphasis-200, #f1f5f9)",
            paddingTop: "16px",
            marginTop: "8px",
          }}
        >
          {[
            { color: "#22c55e", label: "Queen Placed / Safe Cell" },
            { color: "#facc15", label: "Evaluating / Check" },
            { color: "#ef4444", label: "Constraint Violation / Conflict" },
            { color: "#f97316", label: "Backtracking / Undo cell" },
          ].map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "4px", backgroundColor: item.color }} />
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ifm-color-emphasis-700)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withVisualizerErrorBoundary(BacktrackingVisualizer);
