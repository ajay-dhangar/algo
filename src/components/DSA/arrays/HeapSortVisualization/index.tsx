import React, { useState, useEffect } from 'react';
import './style.css';

const HeapSortVisualization: React.FC = () => {
  // State variables
  const [array, setArray] = useState<number[]>([]);
  const [delay, setDelay] = useState<number>(300);
  const [heapIndex, setHeapIndex] = useState<number | null>(null);
  const [comparingIndices, setComparingIndices] = useState<[number, number] | null>(null);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  // Generate initial array on mount
  useEffect(() => {
    generateArray();
  }, []);

  // Update transition duration when delay changes
  useEffect(() => {
    updateMoveDuration();
  }, [delay]);

  const generateArray = () => {
    const newArray = Array.from({ length: 40 }, () => Math.ceil(Math.random() * 90) + 10);
    setArray(newArray);
  };

  const updateMoveDuration = () => {
    const stylesheets = document.styleSheets;
    for (const stylesheet of stylesheets) {
      const rules = (stylesheet as CSSStyleSheet).cssRules;
      for (const rule of rules) {
        if ((rule as CSSStyleRule).selectorText === '.v-move') {
          (rule as CSSStyleRule).style.transitionDuration = `${delay}ms`;
          break;
        }
      }
    }
  };

  const delayFunction = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const heapify = async (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    setHeapIndex(i);
    await delayFunction(delay);

    if (left < n) {
      setComparingIndices([largest, left]);
      await delayFunction(delay);
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      setComparingIndices([largest, right]);
      await delayFunction(delay);
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      setComparingIndices([i, largest]);
      await delayFunction(delay);
      // Swap elements
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await heapify(arr, n, largest);
    }
  };

  const heapSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      setComparingIndices([0, i]);
      await delayFunction(delay);
      
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);

      // Heapify reduced heap
      await heapify(arr, i, 0);
    }

    setHeapIndex(null);
    setComparingIndices(null);
    setIsSorting(false);
  };

  const resetArray = () => {
    generateArray();
    setHeapIndex(null);
    setComparingIndices(null);
  };

  return (
    <div className='heap-sort-visualization'>
      <p>Speed: <input 
        type="range" 
        min="50" 
        max="500" 
        value={delay} 
        onChange={e => setDelay(Number(e.target.value))} 
      /></p>
      <button onClick={heapSort} disabled={isSorting}>Sort</button>
      &nbsp;
      <button onClick={resetArray} disabled={isSorting}>Reset</button>
      <br /> <br />
      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${
              index === heapIndex ? 'heap-index' : 
              comparingIndices?.includes(index) ? 'comparing-index' : ''
            }`}
            style={{ height: `${value * 3}px`, transitionDelay: `${delay / 2}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeapSortVisualization;