import React, { useState, useEffect } from 'react';

interface VisualizerProps {
  initialArray?: number[];
  algorithm?: 'bubbleSort' | 'binarySearch';
}

export default function AlgorithmVisualizer({
  initialArray = [45, 12, 89, 34, 67, 23, 90, 11],
  algorithm = 'bubbleSort',
}: VisualizerProps) {
  const [array, setArray] = useState<number[]>(initialArray);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const resetArray = () => {
    setArray(initialArray);
    setComparing([]);
    setSwapping([]);
    setSortedIndices([]);
    setIsRunning(false);
  };

  const runBubbleSort = async () => {
    setIsRunning(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        await new Promise((r) => setTimeout(r, 200));

        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await new Promise((r) => setTimeout(r, 200));
        }
        setSwapping([]);
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setComparing([]);
    setIsRunning(false);
  };

  return (
    <div className="algorithm-visualizer-box my-6 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">
          Algorithm Visualizer ({algorithm === 'bubbleSort' ? 'Bubble Sort' : 'Binary Search'})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={runBubbleSort}
            disabled={isRunning}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 rounded transition"
          >
            {isRunning ? 'Sorting...' : 'Start Visualizer'}
          </button>
          <button
            onClick={resetArray}
            disabled={isRunning}
            className="px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex items-end justify-center h-48 gap-2 p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
        {array.map((val, idx) => {
          let bgColor = 'bg-blue-500 dark:bg-blue-600';
          if (comparing.includes(idx)) bgColor = 'bg-yellow-500 dark:bg-yellow-400';
          if (swapping.includes(idx)) bgColor = 'bg-red-500 dark:bg-red-600';
          if (sortedIndices.includes(idx)) bgColor = 'bg-green-500 dark:bg-green-600';

          return (
            <div key={idx} className="flex flex-col items-center flex-1 max-w-[40px]">
              <div
                style={{ height: `${val * 1.8}px` }}
                className={`w-full rounded-t ${bgColor} transition-all duration-200`}
              />
              <span className="mt-1 text-xs font-mono text-gray-600 dark:text-gray-400">{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
