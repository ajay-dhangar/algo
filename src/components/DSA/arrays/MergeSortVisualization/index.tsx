// index.tsx
import React, { useState, useEffect, useRef } from 'react';
import './style.css';

interface ArrayBar {
  value: number;
  color: string;
}

const MergeSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [speed, setSpeed] = useState<number>(100);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timeouts = useRef<number[]>([]);

  const generateRandomArray = (size: number = 30) => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 500) + 10,
        color: '#3498db'
      });
    }
    setArray(newArray);
    clearTimeouts();
  };

  const clearTimeouts = () => {
    timeouts.current.forEach(timeout => clearTimeout(timeout));
    timeouts.current = [];
  };

  const sleep = (ms: number) => {
    return new Promise(resolve => {
      const timeout = window.setTimeout(resolve, ms);
      timeouts.current.push(timeout);
    });
  };

  async function* mergeSortGenerator(
    arr: ArrayBar[],
    start: number = 0,
    end: number = arr.length - 1
  ): AsyncGenerator<ArrayBar[]> {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    
    // Highlight division
    const newArray = [...arr];
    for (let i = start; i <= end; i++) {
      newArray[i] = { ...newArray[i], color: '#e74c3c' };
    }
    yield newArray;
    await sleep(speed);

    // Recursively sort left half
    yield* mergeSortGenerator(arr, start, mid);
    
    // Recursively sort right half
    yield* mergeSortGenerator(arr, mid + 1, end);

    // Merge process
    const leftArray = arr.slice(start, mid + 1);
    const rightArray = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < leftArray.length && j < rightArray.length) {
      // Highlight comparison
      arr[k] = { 
        value: leftArray[i].value <= rightArray[j].value ? leftArray[i].value : rightArray[j].value,
        color: '#2ecc71'
      };
      
      if (leftArray[i].value <= rightArray[j].value) {
        i++;
      } else {
        j++;
      }
      k++;
      yield [...arr];
      await sleep(speed);
    }

    while (i < leftArray.length) {
      arr[k] = { value: leftArray[i].value, color: '#2ecc71' };
      i++;
      k++;
      yield [...arr];
      await sleep(speed);
    }

    while (j < rightArray.length) {
      arr[k] = { value: rightArray[j].value, color: '#2ecc71' };
      j++;
      k++;
      yield [...arr];
      await sleep(speed);
    }

    // Reset colors
    for (let i = start; i <= end; i++) {
      arr[i] = { ...arr[i], color: '#3498db' };
    }
    yield [...arr];
  }

  const startMergeSort = async () => {
    setIsRunning(true);
    const generator = mergeSortGenerator([...array]);
    
    for await (const newArray of generator) {
      setArray(newArray);
    }
    
    // Final array with sorted color
    setArray(prev => prev.map(item => ({ ...item, color: '#2ecc71' })));
    setIsRunning(false);
  };

  useEffect(() => {
    generateRandomArray();
    return () => clearTimeouts();
  }, []);

  return (
    <div className="visualizer-container">
      <div className="controls">
        <button 
          onClick={() => generateRandomArray()}
          disabled={isRunning}
        >
          Generate New Array
        </button>
        <button 
          onClick={startMergeSort}
          disabled={isRunning}
        >
          Start Merge Sort
        </button>
        <div className="speed-control">
          <label>Speed:</label>
          <input
            type="range"
            min="10"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(200 - parseInt(e.target.value))}
            disabled={isRunning}
          />
        </div>
      </div>
      <div className="array-container">
        {array.map((bar, idx) => (
          <div
            key={idx}
            className="array-bar"
            style={{
              height: `${bar.value}px`,
              backgroundColor: bar.color,
              width: `${100 / array.length}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MergeSortVisualizer;