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
    for (let i = 0; i < stylesheets.length; i++) {
      try {
        const rules = (stylesheets[i] as any).cssRules || (stylesheets[i] as any).rules;
        if (!rules) continue;
        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j] as CSSStyleRule;
          if (rule && rule.selectorText === '.v-move') {
            rule.style.transitionDuration = `${delay}ms`;
            return;
          }
        }
      } catch (e) {
        continue;
      }
    }
  };

  const delayFunction = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const medianOfThree = async (arr: number[], low: number, high: number) => {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[low] > arr[mid]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
    if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
    if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];
    [arr[mid], arr[high]] = [arr[high], arr[mid]];
    setArray([...arr]);
    await delayFunction(delay);
    return arr[high];
  };

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = await medianOfThree(arr, low, high);
    setPivotIndex(high);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setComparingIndices([j, high]);
      await delayFunction(delay);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);

    return i + 1;
  };

  const quickSortHelper = async (arr: number[], low: number, high: number) => {
    while (low < high) {
      const pi = await partition(arr, low, high);
      // Tail recursion optimization: sort smaller partition first
      if (pi - low < high - pi) {
        await quickSortHelper(arr, low, pi - 1);
        low = pi + 1;
      } else {
        await quickSortHelper(arr, pi + 1, high);
        high = pi - 1;
      }
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
      <p><label htmlFor="quick-sort-speed">Speed:</label> <input
        id="quick-sort-speed"
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
