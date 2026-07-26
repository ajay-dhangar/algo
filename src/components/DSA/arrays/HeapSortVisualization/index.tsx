import React, { useState, useEffect, useRef } from 'react';
import { withVisualizerErrorBoundary } from '../../../Visualizing/VisualizerErrorBoundary';
import './style.css';

const HeapSortVisualization: React.FC = () => {
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
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
    if (!isMounted.current) return Promise.reject(new Error("unmounted"));
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (isMounted.current) {
          resolve(null);
        } else {
          reject(new Error("unmounted"));
        }
      }, ms);
    });
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
    if (!isMounted.current) return;
    setIsSorting(true);
    try {
      const arr = [...array];
      const n = arr.length;

      // Build max heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
      }

      // Extract elements from heap one by one
      for (let i = n - 1; i > 0; i--) {
        if (!isMounted.current) return;
        setComparingIndices([0, i]);
        await delayFunction(delay);
        
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        if (!isMounted.current) return;
        setArray([...arr]);

        // Heapify reduced heap
        await heapify(arr, i, 0);
      }

      if (isMounted.current) {
        setHeapIndex(null);
        setComparingIndices(null);
        setIsSorting(false);
      }
    } catch (e: any) {
      if (e.message !== "unmounted") {
        console.error(e);
      }
    }
  };

  const resetArray = () => {
    generateArray();
    setHeapIndex(null);
    setComparingIndices(null);
  };

  return (
    <div className='heap-sort-visualization'>
      <p><label htmlFor="heap-sort-speed">Speed:</label> <input
        id="heap-sort-speed"
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

export default withVisualizerErrorBoundary(HeapSortVisualization);
