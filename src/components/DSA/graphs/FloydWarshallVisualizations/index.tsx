import React, { useState, useEffect } from "react";

const FloydWarshallVisualizations: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(4);
  const [grid, setGrid] = useState<number[][]>([]);
  const [distances, setDistances] = useState<number[][]>([]);
  const [currentStep, setCurrentStep] = useState<[number, number, number] | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepDelay, setStepDelay] = useState<number>(500);

  useEffect(() => {
    generateGrid();
  }, [gridSize]);

  const generateGrid = () => {
    const newGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => (Math.random() < 0.3 ? Infinity : Math.floor(Math.random() * 10) + 1))
    );
    for (let i = 0; i < gridSize; i++) {
      newGrid[i][i] = 0; 
    }
    setGrid(newGrid);
    resetAlgorithmState(newGrid);
  };

  const resetAlgorithmState = (newGrid: number[][]) => {
    setDistances(newGrid.map(row => [...row]));
    setCurrentStep([0, 0, 0]); 
    setIsRunning(false);
  };

  const nextStep = () => {
    let [k, i, j] = currentStep!;

    const updatedDistances = [...distances];

    if (updatedDistances[i][k] + updatedDistances[k][j] < updatedDistances[i][j]) {
      updatedDistances[i][j] = updatedDistances[i][k] + updatedDistances[k][j];
    }

    setDistances(updatedDistances);

    if (j < gridSize - 1) {
      setCurrentStep([k, i, j + 1]);
    } else if (i < gridSize - 1) {
      setCurrentStep([k, i + 1, 0]);
    } else if (k < gridSize - 1) {
      setCurrentStep([k + 1, 0, 0]);
    } else {
      setIsRunning(false); 
    }
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        nextStep();
      }, stepDelay);
      return () => clearTimeout(timer);
    }
  }, [isRunning, currentStep]);

  const handleStartClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      setCurrentStep([0, 0, 0]);
    }
  };

  const handleResetClick = () => {
    generateGrid();
    setIsRunning(false);
  };

  return (
    <div className="p-5 border border-blue-500 rounded-md shadow-md dark:border-gray-100 dark:bg-gray-800">
      <div className="flex justify-center items-center mb-4">
        <button
          onClick={handleStartClick}
          disabled={isRunning}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 border border-blue-700"
        >
          Start Floyd-Warshall
        </button>
        <button
          onClick={handleResetClick}
          disabled={isRunning}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 border border-green-700"
        >
          Reset Grid
        </button>
      </div>
      <div className="grid gap-2">
        {distances.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-4 gap-1">
            {row.map((value, colIndex) => {
              const [k, i, j] = currentStep || [];
              const isCurrent = i === rowIndex && j === colIndex;
              const isInvolvedInCurrentStep = rowIndex === i || colIndex === j || rowIndex === k;

              const cellColor = isCurrent
                ? "bg-purple-500"
                : isInvolvedInCurrentStep
                ? "bg-blue-300"
                : "bg-gray-300";

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-16 h-16 flex items-center justify-center ${cellColor} border border-gray-500`}
                >
                  {value === Infinity ? "∞" : value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloydWarshallVisualizations;
