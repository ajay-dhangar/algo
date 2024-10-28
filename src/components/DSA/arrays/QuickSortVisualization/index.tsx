import React, { useState, useEffect } from 'react';
import './style.css';

const QuickSortVisualization: React.FC = () => {
  // State variables
  const [array, setArray] = useState<number[]>([]);
  const [delay, setDelay] = useState<number>(300);
  const [pivotIndex, setPivotIndex] = useState<number | null>(null);
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

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    setPivotIndex(high);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setComparingIndices([j, high]);
      await delayFunction(delay);

      if (arr[j] < pivot) {
        i++;
        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
      }
    }

    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);

    return i + 1;
  };

  const quickSortHelper = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const quickSort = async () => {
    setIsSorting(true);
    await quickSortHelper([...array], 0, array.length - 1);
    setPivotIndex(null);
    setComparingIndices(null);
    setIsSorting(false);
  };

  const resetArray = () => {
    generateArray();
    setPivotIndex(null);
    setComparingIndices(null);
  };

  return (
    <div className='quick-sort-visualization'>
      <p>Speed: <input 
        type="range" 
        min="50" 
        max="500" 
        value={delay} 
        onChange={e => setDelay(Number(e.target.value))} 
      /></p>
      <button onClick={quickSort} disabled={isSorting}>Sort</button>
      &nbsp;
      <button onClick={resetArray} disabled={isSorting}>Reset</button>
      <br /> <br />
      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${
              index === pivotIndex ? 'pivot-index' : 
              comparingIndices?.includes(index) ? 'comparing-index' : ''
            }`}
            style={{ height: `${value * 3}px`, transitionDelay: `${delay / 2}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickSortVisualization;