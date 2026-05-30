import React, { useState, useEffect } from 'react';
import './style.css';

const BucketSortVisualization: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [buckets, setBuckets] = useState<number[][]>([[], [], [], [], []]);
  const [delay, setDelay] = useState<number>(400);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [activeElementIndex, setActiveElementIndex] = useState<number | null>(null);
  const [activeBucketIndex, setActiveBucketIndex] = useState<number | null>(null);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    // Generate 15 random numbers between 5 and 95
    const newArray = Array.from({ length: 15 }, () => Math.ceil(Math.random() * 90) + 5);
    setArray(newArray);
    setBuckets([[], [], [], [], []]);
    setActiveElementIndex(null);
    setActiveBucketIndex(null);
    setSortedIndices([]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const bucketSort = async () => {
    setIsSorting(true);
    setSortedIndices([]);
    const tempArray = [...array];
    const n = tempArray.length;
    const bucketCount = 5;

    // Initialize empty buckets
    const localBuckets: number[][] = Array.from({ length: bucketCount }, () => []);
    setBuckets([[], [], [], [], []]);

    // Step 1: Distribute elements into buckets
    for (let i = 0; i < n; i++) {
      setActiveElementIndex(i);
      const val = tempArray[i];
      // Map value 0-100 to bucket 0-4
      const bucketIdx = Math.min(Math.floor(val / 20), bucketCount - 1);
      setActiveBucketIndex(bucketIdx);

      await sleep(delay);

      localBuckets[bucketIdx].push(val);
      setBuckets(localBuckets.map(b => [...b]));

      // Optionally clear the distributed element from the main array view
      tempArray[i] = 0; 
      setArray([...tempArray]);

      await sleep(delay / 2);
    }

    setActiveElementIndex(null);
    setActiveBucketIndex(null);
    await sleep(delay);

    // Step 2: Sort individual buckets (using insertion sort visually)
    for (let b = 0; b < bucketCount; b++) {
      setActiveBucketIndex(b);
      await sleep(delay);

      const bucket = localBuckets[b];
      // Sort the individual bucket
      for (let i = 1; i < bucket.length; i++) {
        const key = bucket[i];
        let j = i - 1;
        while (j >= 0 && bucket[j] > key) {
          bucket[j + 1] = bucket[j];
          j--;
          localBuckets[b] = [...bucket];
          setBuckets(localBuckets.map(bk => [...bk]));
          await sleep(delay / 2);
        }
        bucket[j + 1] = key;
        localBuckets[b] = [...bucket];
        setBuckets(localBuckets.map(bk => [...bk]));
        await sleep(delay / 2);
      }
    }

    setActiveBucketIndex(null);
    await sleep(delay);

    // Step 3: Gather elements back into the main array
    let index = 0;
    const finalArray: number[] = new Array(n).fill(0);
    setArray(finalArray);

    for (let b = 0; b < bucketCount; b++) {
      setActiveBucketIndex(b);
      const bucket = localBuckets[b];

      while (bucket.length > 0) {
        const val = bucket.shift()!;
        setBuckets(localBuckets.map(bk => [...bk]));

        finalArray[index] = val;
        setArray([...finalArray]);
        setSortedIndices(prev => [...prev, index]);

        index++;
        await sleep(delay);
      }
    }

    setActiveBucketIndex(null);
    setIsSorting(false);
  };

  return (
    <div className="bucketsort-visualizer-card">
      <div className="visualizer-controls">
        <div className="slider-wrapper">
          <label htmlFor="bucketsort-speed">Speed:</label>
          <input
            id="bucketsort-speed"
            type="range"
            min="100"
            max="1200"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>
        <div className="button-group">
          <button onClick={bucketSort} disabled={isSorting} className="sort-btn">
            Sort
          </button>
          <button onClick={generateArray} disabled={isSorting} className="generate-btn">
            Generate New Array
          </button>
        </div>
      </div>

      <div className="main-array-label">Main Array:</div>
      <div className="bars-inner-container">
        {array.map((value, index) => {
          let barClass = "visualizer-bar";
          if (index === activeElementIndex) {
            barClass += " bar-comparing";
          } else if (sortedIndices.includes(index)) {
            barClass += " bar-sorted";
          }
          return (
            <div
              key={index}
              className={barClass}
              style={{
                height: value > 0 ? `${value * 2.2}px` : '4px',
                width: `${100 / array.length}%`,
                opacity: value > 0 ? 1 : 0.2,
              }}
            />
          );
        })}
      </div>

      <div className="buckets-container">
        {buckets.map((bucketElements, bucketIdx) => {
          const isBucketActive = activeBucketIndex === bucketIdx;
          const rangeStart = bucketIdx * 20;
          const rangeEnd = rangeStart + 19;

          return (
            <div
              key={bucketIdx}
              className={`bucket-box ${isBucketActive ? 'bucket-active' : ''}`}
            >
              <div className="bucket-header">
                Bucket {bucketIdx + 1}
                <span className="bucket-range">[{rangeStart}-{rangeEnd}]</span>
              </div>
              <div className="bucket-elements">
                {bucketElements.map((elem, idx) => (
                  <div key={idx} className="bucket-element-pill">
                    {elem}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BucketSortVisualization;
