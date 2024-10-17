import React, { useState, useEffect } from "react";

const DijkstraVisualizations: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(10);
  const [grid, setGrid] = useState<number[][]>([]);
  const [startNode, setStartNode] = useState<[number, number] | null>(null);
  const [endNode, setEndNode] = useState<[number, number] | null>(null);
  const [shortestPath, setShortestPath] = useState<[number, number][]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stepDelay, setStepDelay] = useState<number>(100);
  const [priorityQueue, setPriorityQueue] = useState<Array<[number, number, number]>>([]);
  const [distances, setDistances] = useState<number[][]>([]);
  const [visited, setVisited] = useState<boolean[][]>([]);
  const [previous, setPrevious] = useState<Array<[number, number] | null>>([]);
  const [currentStep, setCurrentStep] = useState<[number, number] | null>(null);

  useEffect(() => {
    generateGrid();
  }, [gridSize]);

  const generateGrid = () => {
    const newGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => Math.floor(Math.random() * 10) + 1)
    );
    setGrid(newGrid);
    setStartNode([0, 0]);
    setEndNode([gridSize - 1, gridSize - 1]);
    resetAlgorithmState();
  };

  const resetAlgorithmState = () => {
    setDistances(Array.from({ length: gridSize }, () => Array(gridSize).fill(Infinity)));
    setVisited(Array.from({ length: gridSize }, () => Array(gridSize).fill(false)));
    setPrevious(Array.from({ length: gridSize }, () => Array(gridSize).fill(null)));
    setPriorityQueue([[0, 0, 0]]); 
    setDistances((prev) => {
      const newDistances = [...prev];
      newDistances[0][0] = 0; // Distance to start node is 0
      return newDistances;
    });
    setShortestPath([]); // Reset the shortest path
    setCurrentStep(null); // Reset the current step
  };

  const nextStep = async () => {
    if (priorityQueue.length === 0) {
      setIsRunning(false);
      return;
    }

    // Always sort the queue to get the minimum distance node
    priorityQueue.sort((a, b) => a[0] - b[0]);
    const [currentDist, x, y] = priorityQueue.shift()!;

    // If this node has already been visited, skip it
    if (visited[x][y]) {
      nextStep();
      return;
    }

    // Mark this node as visited
    setVisited((prevVisited) => {
      const newVisited = prevVisited.map((row) => [...row]);
      newVisited[x][y] = true; 
      return newVisited;
    });

    // Update distances and previous paths
    const directions: [number, number][] = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX >= 0 &&
        newX < gridSize &&
        newY >= 0 &&
        newY < gridSize &&
        !visited[newX][newY]
      ) {
        const newDist = currentDist + grid[newX][newY];
        if (newDist < distances[newX][newY]) {
          distances[newX][newY] = newDist;
          previous[newX][newY] = [x, y];
          priorityQueue.push([newDist, newX, newY]);
        }
      }
    }

    // Set state for distances and previous paths
    setDistances(distances);
    setPrevious(previous);
    setPriorityQueue(priorityQueue);

    // Check if we reached the end node
    if (x === endNode![0] && y === endNode![1]) {
      const path = reconstructPath(previous, startNode, endNode);
      setShortestPath(path);
      setIsRunning(false);
      return;
    }

    setCurrentStep([x, y]); // Store the current step
  };

  const reconstructPath = (
    previous: Array<[number, number] | null>,
    startNode: [number, number],
    endNode: [number, number]
  ) => {
    const path: [number, number][] = [];
    let current: [number, number] | null = endNode;

    while (current) {
      path.unshift(current);
      current = previous[current[0]][current[1]];
    }

    // Ensure the path starts from the startNode
    return path.length > 0 && path[0][0] === startNode[0] && path[0][1] === startNode[1]
      ? path
      : []; 
  };

  const handleStartClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      resetAlgorithmState();
      nextStep(); 
    }
  };

  const handleNextStepClick = () => {
    if (isRunning) {
      nextStep(); 
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
          Start Dijkstra
        </button>
        <button
          onClick={handleNextStepClick}
          disabled={!isRunning}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 border border-yellow-700"
        >
          Next Step
        </button>
        <button
          onClick={handleResetClick}
          disabled={isRunning}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 border border-green-700"
        >
          Reset Grid
        </button>
      </div>
      <div className="grid">
        {/* Render Column Header */}
        <div className="grid grid-cols-11 gap-1">
          <div className="w-10 h-10"></div> {/* Empty corner cell */}
          {Array.from({ length: gridSize }, (_, colIndex) => (
            <div key={`col-${colIndex}`} className="w-10 h-10 flex items-center justify-center bg-gray-200 font-bold">
              {colIndex}
            </div>
          ))}
        </div>
        
        {/* Render Rows with Row Numbers */}
        {grid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-11 gap-1">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 font-bold">
              {rowIndex}
            </div>
            {row.map((value, colIndex) => {
              const isStart = startNode && startNode[0] === rowIndex && startNode[1] === colIndex;
              const isEnd = endNode && endNode[0] === rowIndex && endNode[1] === colIndex;
              const isPath = shortestPath.some((path) => path[0] === rowIndex && path[1] === colIndex);
              const isVisited = visited[rowIndex][colIndex];
              const isCurrent = currentStep && currentStep[0] === rowIndex && currentStep[1] === colIndex;

              const cellColor = isPath
                ? "bg-green-500"
                : isVisited
                ? "bg-blue-500"
                : isCurrent
                ? "bg-purple-500" // Highlight the current step
                : isStart
                ? "bg-red-500"
                : isEnd
                ? "bg-yellow-500"
                : "bg-gray-300";

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 flex items-center justify-center ${cellColor} border border-gray-500`}
                >
                  {isVisited ? distances[rowIndex][colIndex] : value}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DijkstraVisualizations;
