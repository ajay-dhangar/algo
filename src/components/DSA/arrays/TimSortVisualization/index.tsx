import React, { useState, useEffect } from 'react';
import './style.css';

const TimSortVisualization: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [delay, setDelay] = useState<number>(300);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 24 }, () => Math.ceil(Math.random() * 90) + 10);
    setArray(newArray);
    setComparingIndices([]);
    setSortedIndices([]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const insertionSort = async (arr: number[], left: number, right: number) => {
    for (let i = left + 1; i <= right; i++) {
      const temp = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > temp) {
        setComparingIndices([j, j + 1]);
        await sleep(delay);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        j--;
      }
      arr[j + 1] = temp;
      setArray([...arr]);
    }
  };

  const merge = async (arr: number[], l: number, m: number, r: number) => {
    const leftPart = arr.slice(l, m + 1);
    const rightPart = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < leftPart.length && j < rightPart.length) {
      setComparingIndices([l + i, m + 1 + j]);
      await sleep(delay);

      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        i++;
      } else {
        arr[k] = rightPart[j];
        j++;
      }
      setArray([...arr]);
      k++;
    }

    while (i < leftPart.length) {
      setComparingIndices([l + i]);
      await sleep(delay);
      arr[k] = leftPart[i];
      i++;
      setArray([...arr]);
      k++;
    }

    while (j < rightPart.length) {
      setComparingIndices([m + 1 + j]);
      await sleep(delay);
      arr[k] = rightPart[j];
      j++;
      setArray([...arr]);
      k++;
    }
  };

  const timSort = async () => {
    setIsSorting(true);
    const tempArray = [...array];
    const n = tempArray.length;
    const RUN = 8; // Small RUN size for visualization

    // Step 1: Sort individual runs of size RUN
    for (let i = 0; i < n; i += RUN) {
      await insertionSort(tempArray, i, Math.min(i + RUN - 1, n - 1));
    }

    // Step 2: Merge runs
    for (let size = RUN; size < n; size = 2 * size) {
      for (let left = 0; left < n; left += 2 * size) {
        const mid = left + size - 1;
        const right = Math.min(left + 2 * size - 1, n - 1);

        if (mid < right) {
          await merge(tempArray, left, mid, right);
        }
      }
    }

    // Finish sorting: mark all as sorted
    setComparingIndices([]);
    const allIndices = Array.from({ length: n }, (_, idx) => idx);
    setSortedIndices(allIndices);
    setIsSorting(false);
  };

  return (
    <div className="timsort-visualizer-card">
      <div className="visualizer-controls">
        <div className="slider-wrapper">
          <label htmlFor="timsort-speed">Speed:</label>
          <input
            id="timsort-speed"
            type="range"
            min="50"
            max="1000"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>
        <div className="button-group">
          <button onClick={timSort} disabled={isSorting} className="sort-btn">
            Sort
          </button>
          <button onClick={generateArray} disabled={isSorting} className="generate-btn">
            Generate New Array
          </button>
        </div>
      </div>

      <div className="bars-inner-container">
        {array.map((value, index) => {
          let barClass = "visualizer-bar";
          if (comparingIndices.includes(index)) {
            barClass += " bar-comparing";
          } else if (sortedIndices.includes(index)) {
            barClass += " bar-sorted";
          }
          return (
            <div
              key={index}
              className={barClass}
              style={{
                height: `${value * 2.2}px`,
                width: `${100 / array.length}%`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TimSortVisualization;
