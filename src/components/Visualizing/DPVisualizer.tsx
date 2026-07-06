import React, { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaUndo,
  FaInfoCircle,
  FaCode,
  FaTable,
  FaExchangeAlt,
  FaBriefcase,
  FaSlidersH
} from "react-icons/fa";
import { withVisualizerErrorBoundary } from "./VisualizerErrorBoundary";

type AlgorithmType = "lcs" | "editDistance" | "knapsack";

interface DPStep {
  matrix: (number | null)[][];
  activeCell: [number, number] | null;
  dependencies: [number, number][];
  description: string;
  formula: string;
  equation: string;
  highlights: {
    stringACharIdx?: number | null;
    stringBCharIdx?: number | null;
    knapsackItemIdx?: number | null;
    knapsackCapacity?: number | null;
  };
}

interface ArrowData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  colorName: "blue" | "green" | "red" | "orange";
  label?: string;
}

function DPVisualizer() {
  const [algo, setAlgo] = useState<AlgorithmType>("lcs");

  // Inputs for LCS & Edit Distance
  const [strA, setStrA] = useState<string>("STONE");
  const [strB, setStrB] = useState<string>("LONGEST");

  // Inputs for Knapsack
  const [knapsackWeights, setKnapsackWeights] = useState<string>("1, 2, 3, 5");
  const [knapsackValues, setKnapsackValues] = useState<string>("1, 6, 18, 22");
  const [knapsackCapacity, setKnapsackCapacity] = useState<number>(5);

  // Trace State
  const [steps, setSteps] = useState<DPStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000); // ms per step
  const [hoveredCell, setHoveredCell] = useState<[number, number] | null>(null);

  // SVG Arrows state
  const [arrows, setArrows] = useState<ArrowData[]>([]);

  // Parse knapsack items helper
  const getKnapsackData = () => {
    const weights = knapsackWeights
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x) && x > 0);
    const values = knapsackValues
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x) && x >= 0);
    return { weights, values };
  };

  // Generate trace based on selected algorithm and inputs
  const generateTrace = () => {
    setIsPlaying(false);
    setHoveredCell(null);

    if (algo === "lcs") {
      setSteps(generateLCSTrace(strA.toUpperCase(), strB.toUpperCase()));
    } else if (algo === "editDistance") {
      setSteps(generateEditDistanceTrace(strA.toLowerCase(), strB.toLowerCase()));
    } else if (algo === "knapsack") {
      const { weights, values } = getKnapsackData();
      if (weights.length === 0 || values.length === 0) {
        setSteps([
          {
            matrix: [[]],
            activeCell: null,
            dependencies: [],
            description: "Please enter valid weights and values (comma-separated).",
            formula: "N/A",
            equation: "N/A",
            highlights: {}
          }
        ]);
      } else {
        const itemLen = Math.min(weights.length, values.length);
        setSteps(
          generateKnapsackTrace(
            weights.slice(0, itemLen),
            values.slice(0, itemLen),
            knapsackCapacity
          )
        );
      }
    }
    setCurrentStepIdx(0);
  };

  // Regeneration on algo or input change
  useEffect(() => {
    generateTrace();
  }, [algo, strA, strB, knapsackWeights, knapsackValues, knapsackCapacity]);

  // Autoplay control
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [isPlaying, steps, speed]);

  // Handle Play/Pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Step Forward
  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  // Step Backward
  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  // Reset
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
    setHoveredCell(null);
  };

  // --- TRACE GENERATORS ---

  function generateLCSTrace(A: string, B: string): DPStep[] {
    const trace: DPStep[] = [];
    const R = A.length + 1;
    const C = B.length + 1;
    let matrix: (number | null)[][] = Array(R)
      .fill(null)
      .map(() => Array(C).fill(null));

    // Base initial state
    trace.push({
      matrix: JSON.parse(JSON.stringify(matrix)),
      activeCell: null,
      dependencies: [],
      description: `Initialize a ${R}x${C} table for matching String A ("${A}") and String B ("${B}").`,
      formula: "dp[i][j] = ...",
      equation: "dp[i][j] = dp[i-1][j-1] + 1  (if A[i-1] == B[j-1]) \nelse max(dp[i-1][j], dp[i][j-1])",
      highlights: {}
    });

    // Row 0 base case
    for (let j = 0; j < C; j++) {
      matrix[0][j] = 0;
      trace.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        activeCell: [0, j],
        dependencies: [],
        description: `Base Case: dp[0][${j}] = 0. An empty prefix of String A has 0 common subsequence with String B prefix "${B.slice(0, j)}".`,
        formula: `dp[0][${j}] = 0`,
        equation: "dp[0][j] = 0",
        highlights: { stringBCharIdx: j - 1 }
      });
    }

    // Col 0 base case
    for (let i = 1; i < R; i++) {
      matrix[i][0] = 0;
      trace.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        activeCell: [i, 0],
        dependencies: [],
        description: `Base Case: dp[${i}][0] = 0. An empty prefix of String B has 0 common subsequence with String A prefix "${A.slice(0, i)}".`,
        formula: `dp[${i}][0] = 0`,
        equation: "dp[i][0] = 0",
        highlights: { stringACharIdx: i - 1 }
      });
    }

    // Fill table
    for (let i = 1; i < R; i++) {
      for (let j = 1; j < C; j++) {
        const charA = A[i - 1];
        const charB = B[j - 1];
        const isMatch = charA === charB;

        const deps: [number, number][] = isMatch
          ? [[i - 1, j - 1]]
          : [
              [i - 1, j],
              [i, j - 1]
            ];

        const stepDescription = isMatch
          ? `Characters match! '${charA}' == '${charB}'. Add 1 to the diagonal subproblem value.`
          : `Characters do not match. '${charA}' != '${charB}'. Take the maximum of excluding '${charA}' (top cell) and excluding '${charB}' (left cell).`;

        const prevVal = matrix[i - 1][j - 1] as number;
        const topVal = matrix[i - 1][j] as number;
        const leftVal = matrix[i][j - 1] as number;

        const formulaStr = isMatch
          ? `dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${prevVal} + 1 = ${prevVal + 1}`
          : `dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = max(${topVal}, ${leftVal}) = ${Math.max(topVal, leftVal)}`;

        const eqStr = isMatch
          ? `dp[i][j] = dp[i-1][j-1] + 1`
          : `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`;

        trace.push({
          matrix: JSON.parse(JSON.stringify(matrix)),
          activeCell: [i, j],
          dependencies: deps,
          description: stepDescription,
          formula: formulaStr,
          equation: eqStr,
          highlights: { stringACharIdx: i - 1, stringBCharIdx: j - 1 }
        });

        matrix[i][j] = isMatch ? prevVal + 1 : Math.max(topVal, leftVal);
      }
    }

    // Final result
    trace.push({
      matrix: JSON.parse(JSON.stringify(matrix)),
      activeCell: null,
      dependencies: [],
      description: `Tabulation complete! The length of the Longest Common Subsequence is ${matrix[R - 1][C - 1]}.`,
      formula: `LCS Length = dp[${R - 1}][${C - 1}] = ${matrix[R - 1][C - 1]}`,
      equation: "dp[M][N]",
      highlights: {}
    });

    return trace;
  }

  function generateEditDistanceTrace(A: string, B: string): DPStep[] {
    const trace: DPStep[] = [];
    const R = A.length + 1;
    const C = B.length + 1;
    let matrix: (number | null)[][] = Array(R)
      .fill(null)
      .map(() => Array(C).fill(null));

    // Base initial state
    trace.push({
      matrix: JSON.parse(JSON.stringify(matrix)),
      activeCell: null,
      dependencies: [],
      description: `Initialize table for calculating minimum Edit Distance to convert "${A}" into "${B}".`,
      formula: "dp[i][j] = ...",
      equation: "dp[i][j] = dp[i-1][j-1] (if match)\nelse 1 + min(Replace, Delete, Insert)",
      highlights: {}
    });

    // Row 0 base case (Insertions)
    for (let j = 0; j < C; j++) {
      matrix[0][j] = j;
      trace.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        activeCell: [0, j],
        dependencies: [],
        description: `Base Case: dp[0][${j}] = ${j}. To build "${B.slice(0, j)}" from empty string requires ${j} insertions.`,
        formula: `dp[0][${j}] = ${j}`,
        equation: "dp[0][j] = j (Insert)",
        highlights: { stringBCharIdx: j - 1 }
      });
    }

    // Col 0 base case (Deletions)
    for (let i = 1; i < R; i++) {
      matrix[i][0] = i;
      trace.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        activeCell: [i, 0],
        dependencies: [],
        description: `Base Case: dp[${i}][0] = ${i}. To convert "${A.slice(0, i)}" to empty string requires ${i} deletions.`,
        formula: `dp[${i}][0] = ${i}`,
        equation: "dp[i][0] = i (Delete)",
        highlights: { stringACharIdx: i - 1 }
      });
    }

    // Fill table
    for (let i = 1; i < R; i++) {
      for (let j = 1; j < C; j++) {
        const charA = A[i - 1];
        const charB = B[j - 1];
        const isMatch = charA === charB;

        const deps: [number, number][] = isMatch
          ? [[i - 1, j - 1]]
          : [
              [i - 1, j - 1], // Replace
              [i - 1, j],     // Delete
              [i, j - 1]      // Insert
            ];

        const stepDescription = isMatch
          ? `Characters match! '${charA}' == '${charB}'. No editing operation is needed here. Carrying over the diagonal cell value.`
          : `Characters mismatch. '${charA}' != '${charB}'. Take 1 + minimum of Replace (diagonal: dp[i-1][j-1]), Delete (top: dp[i-1][j]), and Insert (left: dp[i][j-1]).`;

        const replaceVal = matrix[i - 1][j - 1] as number;
        const deleteVal = matrix[i - 1][j] as number;
        const insertVal = matrix[i][j - 1] as number;
        const minVal = Math.min(replaceVal, deleteVal, insertVal);

        const formulaStr = isMatch
          ? `dp[${i}][${j}] = dp[${i - 1}][${j - 1}] = ${replaceVal}`
          : `dp[${i}][${j}] = 1 + min(Replace: ${replaceVal}, Delete: ${deleteVal}, Insert: ${insertVal}) = 1 + ${minVal} = ${minVal + 1}`;

        const eqStr = isMatch
          ? `dp[i][j] = dp[i-1][j-1]`
          : `dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])`;

        trace.push({
          matrix: JSON.parse(JSON.stringify(matrix)),
          activeCell: [i, j],
          dependencies: deps,
          description: stepDescription,
          formula: formulaStr,
          equation: eqStr,
          highlights: { stringACharIdx: i - 1, stringBCharIdx: j - 1 }
        });

        matrix[i][j] = isMatch ? replaceVal : 1 + minVal;
      }
    }

    // Final result
    trace.push({
      matrix: JSON.parse(JSON.stringify(matrix)),
      activeCell: null,
      dependencies: [],
      description: `Tabulation complete! The minimum Edit Distance is ${matrix[R - 1][C - 1]} operations.`,
      formula: `Edit Distance = dp[${R - 1}][${C - 1}] = ${matrix[R - 1][C - 1]}`,
      equation: "dp[M][N]",
      highlights: {}
    });

    return trace;
  }

  function generateKnapsackTrace(
    weights: number[],
    values: number[],
    capacity: number
  ): DPStep[] {
    const trace: DPStep[] = [];
    const N = weights.length;
    const R = N + 1;
    const C = capacity + 1;
    let matrix: (number | null)[][] = Array(R)
      .fill(null)
      .map(() => Array(C).fill(null));

    // Base initial state
    trace.push({
      matrix: JSON.parse(JSON.stringify(matrix)),
      activeCell: null,
      dependencies: [],
      description: `Initialize a ${R}x${C} table for Knapsack Capacity = ${capacity} with ${N} items.`,
      formula: "dp[i][j] = ...",
      equation: "dp[i][j] = dp[i-1][j] (if wt > j)\nelse max(dp[i-1][j], dp[i-1][j - wt] + val)",
      highlights: {}
    });

    // Row 0 base case (0 items)
    for (let j = 0; j < C; j++) {
      matrix[0][j] = 0;
      trace.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        activeCell: [0, j],
        dependencies: [],
        description: `Base Case: dp[0][${j}] = 0. Selecting from 0 items gives a value of 0.`,
        formula: `dp[0][${j}] = 0`,
        equation: "dp[0][j] = 0",
        highlights: { knapsackCapacity: j }
      });
    }

    // Col 0 base case (0 capacity)
    for (let i = 1; i < R; i++) {
      matrix[i][0] = 0;
      trace.push({
        matrix: JSON.parse(JSON.stringify(matrix)),
        activeCell: [i, 0],
        dependencies: [],
        description: `Base Case: dp[${i}][0] = 0. A knapsack capacity of 0 can hold a maximum value of 0.`,
        formula: `dp[${i}][0] = 0`,
        equation: "dp[i][0] = 0",
        highlights: { knapsackItemIdx: i - 1, knapsackCapacity: 0 }
      });
    }

    // Fill table
    for (let i = 1; i < R; i++) {
      const wt = weights[i - 1];
      const val = values[i - 1];

      for (let j = 1; j < C; j++) {
        const cannotFit = wt > j;

        const deps: [number, number][] = cannotFit
          ? [[i - 1, j]]
          : [
              [i - 1, j],
              [i - 1, j - wt]
            ];

        const stepDescription = cannotFit
          ? `Item ${i} (weight: ${wt}) exceeds capacity ${j}. Carry over the value from excluding this item (top cell).`
          : `Item ${i} (weight: ${wt}, value: ${val}) fits in capacity ${j}. Find max of: Exclude (top cell: dp[i-1][j]) or Include (top cell at capacity ${j - wt} + item value ${val}).`;

        const excludeVal = matrix[i - 1][j] as number;
        const includeVal = cannotFit ? 0 : (matrix[i - 1][j - wt] as number) + val;

        const formulaStr = cannotFit
          ? `dp[${i}][${j}] = dp[${i - 1}][${j}] = ${excludeVal}`
          : `dp[${i}][${j}] = max(Exclude: ${excludeVal}, Include: ${matrix[i - 1][j - wt]} + ${val} = ${includeVal}) = ${Math.max(excludeVal, includeVal)}`;

        const eqStr = cannotFit
          ? `dp[i][j] = dp[i-1][j]`
          : `dp[i][j] = max(dp[i-1][j], dp[i-1][j-wt] + val)`;

        trace.push({
          matrix: JSON.parse(JSON.stringify(matrix)),
          activeCell: [i, j],
          dependencies: deps,
          description: stepDescription,
          formula: formulaStr,
          equation: eqStr,
          highlights: { knapsackItemIdx: i - 1, knapsackCapacity: j }
        });

        matrix[i][j] = cannotFit ? excludeVal : Math.max(excludeVal, includeVal);
      }
    }

    // Final result
    trace.push({
      matrix: JSON.parse(JSON.stringify(matrix)),
      activeCell: null,
      dependencies: [],
      description: `Tabulation complete! The maximum value matching the constraints is ${matrix[R - 1][C - 1]}.`,
      formula: `Max Knapsack Value = dp[${R - 1}][${C - 1}] = ${matrix[R - 1][C - 1]}`,
      equation: "dp[N][Capacity]",
      highlights: {}
    });

    return trace;
  }

  // --- DEPENDENCY RESOLUTION FOR HOVER & CURRENT STEP ---

  const getActiveCellDependencies = (r: number, c: number): [number, number][] => {
    if (r === 0 || c === 0) return [];
    if (algo === "lcs") {
      const isMatch = strA.toUpperCase()[r - 1] === strB.toUpperCase()[c - 1];
      return isMatch ? [[r - 1, c - 1]] : [[r - 1, c], [r, c - 1]];
    } else if (algo === "editDistance") {
      const isMatch = strA.toLowerCase()[r - 1] === strB.toLowerCase()[c - 1];
      return isMatch ? [[r - 1, c - 1]] : [[r - 1, c - 1], [r - 1, c], [r, c - 1]];
    } else {
      const { weights } = getKnapsackData();
      const wt = weights[r - 1] || 0;
      if (wt > c) {
        return [[r - 1, c]];
      } else {
        return [[r - 1, c], [r - 1, c - wt]];
      }
    }
  };

  const getHoveredCellFormula = (r: number, c: number, val: number | null) => {
    if (val === null) return { formula: "", explanation: "Not calculated yet." };
    if (r === 0) {
      if (algo === "knapsack") return { formula: `dp[0][${c}] = 0`, explanation: "No items" };
      if (algo === "editDistance") return { formula: `dp[0][${c}] = ${c}`, explanation: `Insert ${c} characters` };
      return { formula: `dp[0][${c}] = 0`, explanation: "Empty prefix" };
    }
    if (c === 0) {
      if (algo === "knapsack") return { formula: `dp[${r}][0] = 0`, explanation: "Zero capacity" };
      if (algo === "editDistance") return { formula: `dp[${r}][0] = ${r}`, explanation: `Delete ${r} characters` };
      return { formula: `dp[${r}][0] = 0`, explanation: "Empty prefix" };
    }

    const lastStepMatrix = steps[steps.length - 1]?.matrix;
    if (!lastStepMatrix) return { formula: "", explanation: "" };

    if (algo === "lcs") {
      const isMatch = strA.toUpperCase()[r - 1] === strB.toUpperCase()[c - 1];
      if (isMatch) {
        const diagVal = lastStepMatrix[r - 1][c - 1] ?? 0;
        return {
          formula: `dp[${r}][${c}] = dp[${r - 1}][${c - 1}] + 1 = ${diagVal} + 1 = ${val}`,
          explanation: `Match ('${strA[r - 1]}')`
        };
      } else {
        const topVal = lastStepMatrix[r - 1][c] ?? 0;
        const leftVal = lastStepMatrix[r][c - 1] ?? 0;
        return {
          formula: `dp[${r}][${c}] = max(dp[${r - 1}][${c}], dp[${r}][${c - 1}]) = max(${topVal}, ${leftVal}) = ${val}`,
          explanation: `Mismatch ('${strA[r - 1]}' != '${strB[c - 1]}')`
        };
      }
    } else if (algo === "editDistance") {
      const isMatch = strA.toLowerCase()[r - 1] === strB.toLowerCase()[c - 1];
      if (isMatch) {
        const diagVal = lastStepMatrix[r - 1][c - 1] ?? 0;
        return {
          formula: `dp[${r}][${c}] = dp[${r - 1}][${c - 1}] = ${val}`,
          explanation: `Match ('${strA[r - 1]}')`
        };
      } else {
        const replaceVal = lastStepMatrix[r - 1][c - 1] ?? 0;
        const deleteVal = lastStepMatrix[r - 1][c] ?? 0;
        const insertVal = lastStepMatrix[r][c - 1] ?? 0;
        return {
          formula: `dp[${r}][${c}] = 1 + min(Replace: ${replaceVal}, Delete: ${deleteVal}, Insert: ${insertVal}) = ${val}`,
          explanation: `Mismatch ('${strA[r - 1]}' != '${strB[c - 1]}')`
        };
      }
    } else {
      const { weights, values } = getKnapsackData();
      const wt = weights[r - 1] || 0;
      const itemVal = values[r - 1] || 0;
      if (wt > c) {
        const topVal = lastStepMatrix[r - 1][c] ?? 0;
        return {
          formula: `dp[${r}][${c}] = dp[${r - 1}][${c}] = ${val}`,
          explanation: `Item ${r} (weight: ${wt}) cannot fit in capacity ${c}`
        };
      } else {
        const topVal = lastStepMatrix[r - 1][c] ?? 0;
        const subVal = lastStepMatrix[r - 1][c - wt] ?? 0;
        return {
          formula: `dp[${r}][${c}] = max(Exclude: ${topVal}, Include: ${subVal} + ${itemVal} = ${subVal + itemVal}) = ${val}`,
          explanation: `Item ${r} (weight: ${wt}, value: ${itemVal}) fits in capacity ${c}`
        };
      }
    }
  };

  // --- RENDER DYNAMIC SVG ARROWS ON MATRIX CELLS ---

  const currentStep = steps[currentStepIdx] || {
    matrix: [],
    activeCell: null,
    dependencies: [],
    description: "",
    formula: "",
    equation: "",
    highlights: {}
  };

  const activeCell = hoveredCell || currentStep.activeCell;
  const dependencies = hoveredCell
    ? getActiveCellDependencies(hoveredCell[0], hoveredCell[1])
    : currentStep.dependencies;

  useEffect(() => {
    const container = document.getElementById("grid-container");
    if (!container || !activeCell || dependencies.length === 0) {
      setArrows([]);
      return;
    }

    const updateArrows = () => {
      const containerRect = container.getBoundingClientRect();
      const activeEl = document.getElementById(`cell-${activeCell[0]}-${activeCell[1]}`);
      if (!activeEl) return;
      const activeRect = activeEl.getBoundingClientRect();

      const activeX = activeRect.left - containerRect.left + activeRect.width / 2;
      const activeY = activeRect.top - containerRect.top + activeRect.height / 2;

      const newArrows = dependencies
        .map((dep) => {
          const depEl = document.getElementById(`cell-${dep[0]}-${dep[1]}`);
          if (!depEl) return null;
          const depRect = depEl.getBoundingClientRect();

          const depX = depRect.left - containerRect.left + depRect.width / 2;
          const depY = depRect.top - containerRect.top + depRect.height / 2;

          // Adjust starting and ending coordinates so arrows don't overlap the cell contents directly
          const dx = activeX - depX;
          const dy = activeY - depY;
          const len = Math.sqrt(dx * dx + dy * dy);

          if (len === 0) return null;

          // Offset starting point by ~20px from center of source cell, and ending by ~26px from target center
          const startOffset = 22;
          const endOffset = 26;

          const x1 = depX + (dx / len) * startOffset;
          const y1 = depY + (dy / len) * startOffset;
          const x2 = activeX - (dx / len) * endOffset;
          const y2 = activeY - (dy / len) * endOffset;

          // Determine color based on dependency offset
          let color = "#f97316"; // orange
          let colorName: "blue" | "green" | "red" | "orange" = "orange";
          let label = "";

          if (algo === "editDistance") {
            if (dep[0] === activeCell[0] - 1 && dep[1] === activeCell[1] - 1) {
              color = "#3b82f6"; // blue
              colorName = "blue";
              label = "Replace";
            } else if (dep[0] === activeCell[0] - 1 && dep[1] === activeCell[1]) {
              color = "#ef4444"; // red
              colorName = "red";
              label = "Delete";
            } else {
              color = "#10b981"; // green
              colorName = "green";
              label = "Insert";
            }
          } else if (algo === "knapsack") {
            if (dep[1] === activeCell[1]) {
              color = "#ef4444"; // red
              colorName = "red";
              label = "Exclude";
            } else {
              color = "#10b981"; // green
              colorName = "green";
              label = "Include";
            }
          } else if (algo === "lcs") {
            if (dep[0] === activeCell[0] - 1 && dep[1] === activeCell[1] - 1) {
              color = "#10b981"; // green
              colorName = "green";
              label = "Match";
            } else {
              color = "#3b82f6"; // blue
              colorName = "blue";
              label = "Mismatch";
            }
          }

          return { x1, y1, x2, y2, color, colorName, label };
        })
        .filter(Boolean) as ArrowData[];

      setArrows(newArrows);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateArrows();
    });

    resizeObserver.observe(container);
    updateArrows();

    // Re-trigger after slight delay to ensure render complete
    const timeout = setTimeout(updateArrows, 50);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [activeCell, dependencies, algo, currentStepIdx]);

  // --- GRID CELLS DETERMINATION ---

  const getCellClassName = (r: number, c: number) => {
    const isActive =
      currentStep.activeCell &&
      currentStep.activeCell[0] === r &&
      currentStep.activeCell[1] === c;

    const isHovered = hoveredCell && hoveredCell[0] === r && hoveredCell[1] === c;

    const isDependency = dependencies.some((d) => d[0] === r && d[1] === c);

    let base =
      "relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border font-semibold text-sm md:text-base rounded-md transition-all duration-200 cursor-pointer ";

    if (isActive) {
      return (
        base +
        "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500 scale-105 z-10 shadow-md animate-pulse"
      );
    }
    if (isHovered) {
      return (
        base +
        "border-purple-600 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500 scale-105 z-10 shadow-md"
      );
    }
    if (isDependency) {
      // Find what dependency type it is
      let depColor =
        "border-amber-500 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400";
      if (algo === "editDistance") {
        if (r === activeCell![0] - 1 && c === activeCell![1] - 1) {
          depColor =
            "border-blue-500 bg-blue-50/80 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400";
        } else if (r === activeCell![0] - 1 && c === activeCell![1]) {
          depColor =
            "border-red-500 bg-red-50/80 dark:bg-red-950/20 text-red-700 dark:text-red-400";
        } else {
          depColor =
            "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400";
        }
      } else if (algo === "knapsack") {
        if (c === activeCell![1]) {
          depColor =
            "border-red-500 bg-red-50/80 dark:bg-red-950/20 text-red-700 dark:text-red-400";
        } else {
          depColor =
            "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400";
        }
      } else if (algo === "lcs") {
        if (r === activeCell![0] - 1 && c === activeCell![1] - 1) {
          depColor =
            "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400";
        } else {
          depColor =
            "border-blue-500 bg-blue-50/80 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400";
        }
      }
      return base + depColor + " shadow-sm font-bold scale-102";
    }

    const value = currentStep.matrix[r]?.[c];
    if (value !== null && value !== undefined) {
      if (r === 0 || c === 0) {
        return (
          base +
          "border-slate-200 dark:border-slate-800 bg-sky-50/30 dark:bg-sky-950/10 text-sky-700 dark:text-sky-400/80 font-medium"
        );
      }
      return (
        base +
        "border-slate-200 dark:border-slate-800 bg-emerald-50/10 dark:bg-emerald-950/5 text-slate-800 dark:text-slate-200"
      );
    }

    return (
      base +
      "border-dashed border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700"
    );
  };

  // Render headers
  const renderGridHeaders = () => {
    if (algo === "knapsack") {
      const cols = Array.from({ length: knapsackCapacity + 1 }, (_, k) => k);
      const { weights } = getKnapsackData();
      return (
        <thead>
          <tr>
            <th className="p-2 text-center text-xs font-mono text-slate-400">item \ cap</th>
            <th className="p-2 text-center text-xs font-bold text-slate-500 bg-slate-100/50 dark:bg-slate-800/30 rounded-md">
              Idx
            </th>
            {cols.map((c) => (
              <th
                key={c}
                className={`p-2 text-center text-sm font-bold w-12 md:w-14 transition-colors ${
                  currentStep.highlights.knapsackCapacity === c
                    ? "text-indigo-600 dark:text-indigo-400 font-extrabold scale-110"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
      );
    } else {
      const cols = Array.from({ length: strB.length + 1 }, (_, k) => k);
      return (
        <thead>
          <tr>
            <th className="p-2 text-center text-xs font-mono text-slate-400">A \ B</th>
            <th className="p-2 text-center text-xs font-bold text-slate-500 bg-slate-100/50 dark:bg-slate-800/30 rounded-md">
              Idx
            </th>
            <th className="p-2 text-center text-sm font-bold text-slate-500">Ø</th>
            {strB.split("").map((char, idx) => (
              <th
                key={idx}
                className={`p-2 text-center text-sm font-bold w-12 md:w-14 transition-all duration-200 ${
                  currentStep.highlights.stringBCharIdx === idx
                    ? "text-indigo-600 dark:text-indigo-400 font-extrabold scale-120"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {char}
                <span className="block text-[10px] font-normal text-slate-400 font-mono mt-0.5">
                  {idx + 1}
                </span>
              </th>
            ))}
          </tr>
        </thead>
      );
    }
  };

  // Render rows
  const renderGridRows = () => {
    if (algo === "knapsack") {
      const { weights, values } = getKnapsackData();
      const N = Math.min(weights.length, values.length);
      const rows = Array.from({ length: N + 1 }, (_, r) => r);
      const cols = Array.from({ length: knapsackCapacity + 1 }, (_, c) => c);

      return (
        <tbody>
          {rows.map((r) => {
            const isItemRowActive = currentStep.highlights.knapsackItemIdx === r - 1;
            return (
              <tr key={r} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-2 text-left font-semibold text-xs md:text-sm">
                  {r === 0 ? (
                    <span className="text-slate-400 font-normal">No Items</span>
                  ) : (
                    <div
                      className={`flex flex-col p-1 rounded transition-colors ${
                        isItemRowActive
                          ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="font-bold">Item {r}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        wt:{weights[r - 1]}, val:{values[r - 1]}
                      </span>
                    </div>
                  )}
                </td>
                <td className="p-2 text-center text-xs font-mono font-bold bg-slate-100/30 dark:bg-slate-800/10 text-slate-400 rounded-md">
                  {r}
                </td>
                {cols.map((c) => {
                  const val = currentStep.matrix[r]?.[c];
                  return (
                    <td key={c} className="p-1 text-center">
                      <div
                        id={`cell-${r}-${c}`}
                        className={getCellClassName(r, c)}
                        onMouseEnter={() => setHoveredCell([r, c])}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {val === null ? "-" : val}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      );
    } else {
      const rows = Array.from({ length: strA.length + 1 }, (_, r) => r);
      const cols = Array.from({ length: strB.length + 1 }, (_, c) => c);

      return (
        <tbody>
          {rows.map((r) => {
            const isCharRowActive = currentStep.highlights.stringACharIdx === r - 1;
            return (
              <tr key={r} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                <td className="p-2 text-left font-semibold text-xs md:text-sm">
                  {r === 0 ? (
                    <span className="text-slate-400">Ø (Empty)</span>
                  ) : (
                    <div
                      className={`inline-flex flex-col px-2 py-0.5 rounded transition-all duration-200 ${
                        isCharRowActive
                          ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 font-extrabold scale-110"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className="font-bold text-sm">{strA[r - 1]}</span>
                      <span className="text-[9px] font-mono text-slate-400">idx: {r}</span>
                    </div>
                  )}
                </td>
                <td className="p-2 text-center text-xs font-mono font-bold bg-slate-100/30 dark:bg-slate-800/10 text-slate-400 rounded-md">
                  {r}
                </td>
                {cols.map((c) => {
                  const val = currentStep.matrix[r]?.[c];
                  return (
                    <td key={c} className="p-1 text-center">
                      <div
                        id={`cell-${r}-${c}`}
                        className={getCellClassName(r, c)}
                        onMouseEnter={() => setHoveredCell([r, c])}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {val === null ? "-" : val}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      );
    }
  };

  // Hover Overlay Information
  const activeOverlayInfo = hoveredCell
    ? getHoveredCellFormula(
        hoveredCell[0],
        hoveredCell[1],
        steps[steps.length - 1]?.matrix[hoveredCell[0]]?.[hoveredCell[1]] ?? null
      )
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6">
      {/* LEFT COLUMN: CONTROLS & INPUTS */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Configuration Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FaSlidersH className="text-indigo-500 text-lg" />
            <h3 className="text-base font-bold m-0 text-slate-800 dark:text-slate-100">
              Configure Algorithm
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Algorithm Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setAlgo("lcs")}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all ${
                    algo === "lcs"
                      ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "border-slate-200 dark:border-slate-800 bg-transparent text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <FaTable className="text-sm mb-1" />
                  <span className="text-[11px]">LCS</span>
                </button>
                <button
                  onClick={() => setAlgo("editDistance")}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all ${
                    algo === "editDistance"
                      ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "border-slate-200 dark:border-slate-800 bg-transparent text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <FaExchangeAlt className="text-sm mb-1" />
                  <span className="text-[11px] whitespace-nowrap">Edit Dist</span>
                </button>
                <button
                  onClick={() => setAlgo("knapsack")}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all ${
                    algo === "knapsack"
                      ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "border-slate-200 dark:border-slate-800 bg-transparent text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <FaBriefcase className="text-sm mb-1" />
                  <span className="text-[11px] whitespace-nowrap">Knapsack</span>
                </button>
              </div>
            </div>

            {/* Inputs based on algorithm selection */}
            {algo !== "knapsack" ? (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    String A (Rows)
                  </label>
                  <input
                    type="text"
                    maxLength={8}
                    value={strA}
                    onChange={(e) => setStrA(e.target.value.replace(/[^A-Za-z]/g, ""))}
                    placeholder="Enter string A..."
                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-indigo-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Letters only, max 8 chars.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    String B (Cols)
                  </label>
                  <input
                    type="text"
                    maxLength={8}
                    value={strB}
                    onChange={(e) => setStrB(e.target.value.replace(/[^A-Za-z]/g, ""))}
                    placeholder="Enter string B..."
                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:border-indigo-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Letters only, max 8 chars.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    Item Weights (comma list)
                  </label>
                  <input
                    type="text"
                    value={knapsackWeights}
                    onChange={(e) => setKnapsackWeights(e.target.value)}
                    placeholder="e.g. 1, 2, 3, 5"
                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-800 dark:text-slate-200 font-semibold font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    Item Values (comma list)
                  </label>
                  <input
                    type="text"
                    value={knapsackValues}
                    onChange={(e) => setKnapsackValues(e.target.value)}
                    placeholder="e.g. 1, 6, 18, 22"
                    className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-800 dark:text-slate-200 font-semibold font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    Max Capacity (1 to 10): {knapsackCapacity}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={knapsackCapacity}
                    onChange={(e) => setKnapsackCapacity(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Animation & Speed Controls */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold m-0 text-slate-800 dark:text-slate-200">
              Step {currentStepIdx + 1} of {steps.length || 1}
            </h4>
            <span className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold px-2.5 py-0.5 rounded-full">
              {Math.round(((currentStepIdx + 1) / (steps.length || 1)) * 100)}% Complete
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentStepIdx + 1) / (steps.length || 1)) * 100}%`
              }}
            />
          </div>

          {/* Buttons row */}
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={handleStepBackward}
              disabled={currentStepIdx === 0}
              className="p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Previous Step"
            >
              <FaStepBackward className="text-sm" />
            </button>

            <button
              onClick={handlePlayPause}
              disabled={steps.length <= 1}
              className={`p-4 border-none text-white rounded-2xl shadow-md transition-all transform hover:scale-105 active:scale-95 ${
                isPlaying
                  ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200 dark:shadow-none"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none"
              }`}
              title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
            >
              {isPlaying ? <FaPause className="text-base" /> : <FaPlay className="text-base pl-0.5" />}
            </button>

            <button
              onClick={handleStepForward}
              disabled={currentStepIdx >= steps.length - 1}
              className="p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Next Step"
            >
              <FaStepForward className="text-sm" />
            </button>

            <button
              onClick={handleReset}
              className="p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
              title="Reset Simulation"
            >
              <FaUndo className="text-sm" />
            </button>
          </div>

          {/* Speed slider */}
          <div className="mt-2">
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              Playback Interval: {speed}ms
            </label>
            <input
              type="range"
              min={200}
              max={2500}
              step={100}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* Current explanation box */}
        <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <FaInfoCircle className="text-indigo-500" />
            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Execution Logs
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed m-0 min-h-[3.6rem]">
            {currentStep.description}
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: THE GRID & OVERLAYS */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Visualizer Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm relative overflow-hidden">
          {/* Legend and Headers */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <FaTable className="text-indigo-500" />
              <h3 className="text-base font-bold m-0 text-slate-800 dark:text-slate-100">
                DP Tabulation Matrix
              </h3>
            </div>
            {/* Color coding legend */}
            <div className="flex flex-wrap gap-2 md:gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                <span className="w-2.5 h-2.5 rounded bg-indigo-500/20 border border-indigo-500" />
                Active
              </span>
              {algo === "editDistance" ? (
                <>
                  <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <span className="w-2.5 h-2.5 rounded bg-blue-500/20 border border-blue-500" />
                    Replace (Diagonal)
                  </span>
                  <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                    <span className="w-2.5 h-2.5 rounded bg-red-500/20 border border-red-500" />
                    Delete (Top)
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500" />
                    Insert (Left)
                  </span>
                </>
              ) : algo === "knapsack" ? (
                <>
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500" />
                    Include (Item taken)
                  </span>
                  <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                    <span className="w-2.5 h-2.5 rounded bg-red-500/20 border border-red-500" />
                    Exclude (Item skipped)
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500" />
                    Match (+1)
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <span className="w-2.5 h-2.5 rounded bg-blue-500/20 border border-blue-500" />
                    Mismatch (Max)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Grid Container */}
          <div className="overflow-x-auto w-full custom-scrollbar pb-2">
            <div id="grid-container" className="relative inline-block min-w-full p-4">
              {/* Dynamic SVG arrows */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <defs>
                  <marker
                    id="arrow-blue"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#3b82f6" />
                  </marker>
                  <marker
                    id="arrow-green"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#10b981" />
                  </marker>
                  <marker
                    id="arrow-red"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#ef4444" />
                  </marker>
                  <marker
                    id="arrow-orange"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f97316" />
                  </marker>
                </defs>
                {arrows.map((arrow, idx) => (
                  <g key={idx}>
                    <line
                      x1={arrow.x1}
                      y1={arrow.y1}
                      x2={arrow.x2}
                      y2={arrow.y2}
                      stroke={arrow.color}
                      strokeWidth="2.5"
                      strokeDasharray={hoveredCell ? "4 2" : "none"}
                      markerEnd={`url(#arrow-${arrow.colorName})`}
                      className="transition-all duration-300"
                    />
                    {arrow.label && !hoveredCell && (
                      <text
                        x={(arrow.x1 + arrow.x2) / 2}
                        y={(arrow.y1 + arrow.y2) / 2 - 8}
                        fill={arrow.color}
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="bg-white dark:bg-slate-900 px-1 py-0.5 rounded shadow-sm"
                      >
                        {arrow.label}
                      </text>
                    )}
                  </g>
                ))}
              </svg>

              {/* Table */}
              <table className="border-collapse border-spacing-0 mx-auto relative z-0">
                {renderGridHeaders()}
                {renderGridRows()}
              </table>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 mt-2 text-center">
            💡 Hover over any filled cell to inspect its dependency connections and see the formula in the pane below!
          </div>
        </div>

        {/* Dynamic Formula Overlay Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-3.5">
            <FaCode className="text-indigo-500 text-lg" />
            <h4 className="text-sm font-bold m-0 text-slate-800 dark:text-slate-100">
              {activeOverlayInfo ? "Hovered Cell Formula Details" : "Recurrence Formula Overlay"}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* General Formula */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                Core State Equation
              </span>
              <pre className="m-0 font-mono text-xs md:text-sm font-bold text-indigo-600 dark:text-indigo-400 whitespace-pre-line leading-relaxed">
                {currentStep.equation}
              </pre>
            </div>

            {/* Dynamic Instantiation */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                {activeOverlayInfo ? "Hovered Calculation" : "Current Step Calculation"}
              </span>
              <div className="font-mono text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">
                {activeOverlayInfo ? (
                  <>
                    <div className="text-purple-600 dark:text-purple-400 mb-1">
                      {activeOverlayInfo.formula}
                    </div>
                    <div className="text-[11px] font-normal text-slate-400 italic">
                      ({activeOverlayInfo.explanation})
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-indigo-600 dark:text-indigo-400 mb-1">
                      {currentStep.formula}
                    </div>
                    <div className="text-[11px] font-normal text-slate-400">
                      Processing cell [{currentStep.activeCell?.[0] ?? "-"}][
                      {currentStep.activeCell?.[1] ?? "-"}]
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withVisualizerErrorBoundary(DPVisualizer);
