import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withVisualizerErrorBoundary } from './VisualizerErrorBoundary';

const NQueensVisualizer = () => {
  const [n, setN] = useState(4);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationSteps, setSimulationSteps] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const [error, setError] = useState(null);
  
  const speed = 800;
  const intervalRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const generateSimulationSteps = useCallback((boardSize) => {
    const steps = [];
    const board = Array.from({ length: boardSize }, () => Array(boardSize).fill('.'));
    const cols = new Set();
    const posDiag = new Set(); // r + c
    const negDiag = new Set(); // r - c
    let solutionsCount = 0;

    const addStep = (type, description, activeRow = -1, activeCol = -1) => {
      steps.push({
        type,
        board: board.map(row => [...row]),
        description,
        activeRow,
        activeCol,
        solutionsCount
      });
    };

    addStep('initial', `Start. Preparing to solve N-Queens for N = ${boardSize}.`);

    const backtrack = (r) => {
      if (r === boardSize) {
        solutionsCount++;
        addStep('solution', `Valid board configuration found! Total solutions so far: ${solutionsCount}.`);
        return;
      }

      for (let c = 0; c < boardSize; c++) {
        addStep('evaluating', `Evaluating row ${r}, column ${c}. Checking for conflicts...`, r, c);

        if (cols.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) {
          addStep('conflict', `Conflict detected at row ${r}, column ${c}. A queen is already attacking this square.`, r, c);
          continue;
        }

        // Place queen
        cols.add(c);
        posDiag.add(r + c);
        negDiag.add(r - c);
        board[r][c] = 'Q';

        addStep('placed', `Safe! Placed queen at row ${r}, column ${c}. Moving to row ${r + 1}.`, r, c);

        backtrack(r + 1);

        // Remove queen (backtrack)
        cols.delete(c);
        posDiag.delete(r + c);
        negDiag.delete(r - c);
        board[r][c] = '.';

        addStep('backtrack', `Backtracking. Removed queen from row ${r}, column ${c} to explore other options.`, r, c);
      }
    };

    backtrack(0);
    addStep('finished', `Simulation finished. Found a total of ${solutionsCount} distinct solutions for a ${boardSize}x${boardSize} board.`);

    return steps;
  }, []);

  useEffect(() => {
    setSimulationSteps(generateSimulationSteps(n));
    setCurrentStep(0);
    setIsPaused(true);
  }, [n, generateSimulationSteps]);

  useEffect(() => {
    if (!isPaused && simulationSteps.length > 0) {
      intervalRef.current = setInterval(() => {
        if (!isMounted.current) return;
        setCurrentStep((prev) => {
          if (prev < simulationSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current);
            setIsPaused(true);
            return prev;
          }
        });
      }, speed);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, simulationSteps]);

  const step = simulationSteps[currentStep] || {};

  const renderBoard = () => {
    if (!step.board) return null;

    return (
      <div className="flex flex-col items-center my-6">
        <div className="inline-block border-4 border-gray-800 dark:border-gray-600 rounded">
          {step.board.map((row, r) => (
            <div key={r} className="flex">
              {row.map((cell, c) => {
                const isDark = (r + c) % 2 === 1;
                let cellColor = isDark ? 'bg-gray-400 dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-200';
                let highlightClass = '';

                if (step.activeRow === r && step.activeCol === c) {
                  if (step.type === 'evaluating') highlightClass = 'ring-4 ring-inset ring-yellow-400';
                  else if (step.type === 'conflict') cellColor = 'bg-red-400 dark:bg-red-500';
                  else if (step.type === 'placed') cellColor = 'bg-green-400 dark:bg-green-500';
                  else if (step.type === 'backtrack') cellColor = 'bg-orange-300 dark:bg-orange-400';
                }

                if (step.type === 'solution' && cell === 'Q') {
                    cellColor = 'bg-green-400 dark:bg-green-500';
                    highlightClass = 'animate-pulse';
                }

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl transition-all duration-200 ${cellColor} ${highlightClass}`}
                  >
                    {cell === 'Q' && (
                      <span className="text-black dark:text-gray-900 drop-shadow-md">
                        ♛
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderControls = () => {
    const handleNChange = (e) => {
      const val = parseInt(e.target.value);
      if (isNaN(val) || val < 1 || val > 8) {
        setError('N must be an integer between 1 and 8');
      } else {
        setN(val);
        setError(null);
      }
    };

    return (
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 my-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex-grow w-full sm:w-auto flex flex-col">
            <div className="flex items-center gap-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Board Size (N):</label>
              <input
                type="number"
                min="1"
                max="8"
                defaultValue={n}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNChange(e);
                }}
                onBlur={handleNChange}
                className={`p-2 text-sm font-mono border rounded w-24 bg-white dark:bg-gray-900 dark:text-white ${
                  error ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
            </div>
            {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
            <span className="text-xs text-gray-500 mt-1">Warning: Values above 8 may cause performance issues.</span>
          </div>

          <div className="flex items-center gap-2 mt-1 sm:mt-0 flex-wrap">
            <button
              onClick={() => setCurrentStep(0)}
              className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-6 py-1.5 text-sm font-bold bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition-colors"
            >
              {isPaused ? 'Play' : 'Pause'}
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.min(simulationSteps.length - 1, prev + 1))}
              disabled={currentStep >= simulationSteps.length - 1}
              className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {renderBoard()}

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 mt-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <div className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
            <div className="font-bold mb-2">
              Step {currentStep + 1} of {simulationSteps.length}:
            </div>
            <p className="min-h-16 font-mono">{step.description}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg min-w-[120px]">
            <div className="text-sm font-bold text-indigo-700 dark:text-indigo-300 text-center">Solutions Found</div>
            <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
              {step.solutionsCount || 0}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{renderControls()}</>;
};

export default withVisualizerErrorBoundary(NQueensVisualizer);