import React, { useState, useEffect } from 'react';
// @ts-ignore
import './style.css';

/**
 * BucketSortVisualization Component
 * This component visualizes the Bucket Sort algorithm.
 */
const BucketSortVisualization: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [delay, setDelay] = useState<number>(300);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeBucketIndex, setActiveBucketIndex] = useState<number | null>(null);
  const [sortingBucketActiveIndices, setSortingBucketActiveIndices] = useState<number[]>([]);
  const [statusText, setStatusText] = useState<string>('Ready to sort');
  const [fadedIndices, setFadedIndices] = useState<Set<number>>(new Set());
  const [buckets, setBuckets] = useState<number[][]>([[], [], [], [], []]);

  // Range and boundaries for 5 buckets:
  // Bucket 0: 10 - 27
  // Bucket 1: 28 - 45
  // Bucket 2: 46 - 63
  // Bucket 3: 64 - 81
  // Bucket 4: 82 - 99
  const bucketLabels = [
    'Bucket 0 (10-27)',
    'Bucket 1 (28-45)',
    'Bucket 2 (46-63)',
    'Bucket 3 (64-81)',
    'Bucket 4 (82-99)',
  ];

  // Helper to get bucket index for a value
  const getBucketIndex = (value: number): number => {
    if (value < 10) return 0;
    if (value > 99) return 4;
    return Math.floor((value - 10) / 18);
  };

  // Generate random array on mount
  useEffect(() => {
    generateArray();
  }, []);

  // Update Move duration for transition animations
  useEffect(() => {
    updateMoveDuration();
  }, [delay]);

  /**
   * Generates a new array of random numbers
   */
  const generateArray = () => {
    const newArray = Array.from({ length: 25 }, () => Math.ceil(Math.random() * 90) + 9);
    setArray(newArray);
    setBuckets([[], [], [], [], []]);
    setFadedIndices(new Set());
    setStatusText('Ready to sort');
    setCurrentIndex(null);
    setActiveBucketIndex(null);
    setSortingBucketActiveIndices([]);
  };

  /**
   * Updates CSS transition duration
   */
  const updateMoveDuration = () => {
    const stylesheets = document.styleSheets;
    for (let i = 0; i < stylesheets.length; i++) {
      try {
        const rules = (stylesheets[i] as CSSStyleSheet).cssRules || (stylesheets[i] as CSSStyleSheet).rules;
        if (!rules) continue;
        for (let j = 0; j < rules.length; j++) {
          if ((rules[j] as CSSStyleRule).selectorText === '.v-move') {
            (rules[j] as CSSStyleRule).style.transitionDuration = `${delay}ms`;
            break;
          }
        }
      } catch (e) {
        // Ignore cross-origin stylesheet errors
      }
    }
  };

  // Helper delay function
  const delayFunction = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  /**
   * Main Bucket Sort Visualizer Function
   */
  const bucketSort = async () => {
    setIsSorting(true);
    const initialArray = [...array];
    const currentBuckets: number[][] = [[], [], [], [], []];

    // --- PHASE 1: DISTRIBUTION ---
    setStatusText('Phase 1: Distributing elements to buckets...');
    for (let i = 0; i < initialArray.length; i++) {
      const val = initialArray[i];
      const bIdx = getBucketIndex(val);

      setCurrentIndex(i);
      setActiveBucketIndex(bIdx);
      setStatusText(`Phase 1: Placing ${val} into ${bucketLabels[bIdx]}`);
      await delayFunction(delay);

      // Add to bucket
      currentBuckets[bIdx].push(val);
      setBuckets(currentBuckets.map(b => [...b]));
      
      // Fade in main array
      setFadedIndices(prev => new Set([...prev, i]));
      await delayFunction(delay);
    }

    setCurrentIndex(null);
    setActiveBucketIndex(null);
    await delayFunction(delay * 2);

    // --- PHASE 2: SORTING BUCKETS ---
    setStatusText('Phase 2: Sorting each bucket individually...');
    for (let bIdx = 0; bIdx < currentBuckets.length; bIdx++) {
      if (currentBuckets[bIdx].length === 0) continue;

      setActiveBucketIndex(bIdx);
      setStatusText(`Phase 2: Sorting ${bucketLabels[bIdx]}`);
      await delayFunction(delay);

      // Perform standard Insertion Sort with visualization inside this bucket
      const bucketArray = currentBuckets[bIdx];
      for (let x = 1; x < bucketArray.length; x++) {
        const key = bucketArray[x];
        let y = x - 1;

        setSortingBucketActiveIndices([x, y]);
        await delayFunction(delay);

        while (y >= 0 && bucketArray[y] > key) {
          bucketArray[y + 1] = bucketArray[y];
          currentBuckets[bIdx] = [...bucketArray];
          setBuckets(currentBuckets.map(b => [...b]));

          y = y - 1;
          setSortingBucketActiveIndices([y + 1, y]);
          await delayFunction(delay);
        }
        bucketArray[y + 1] = key;
        currentBuckets[bIdx] = [...bucketArray];
        setBuckets(currentBuckets.map(b => [...b]));
      }

      setSortingBucketActiveIndices([]);
      await delayFunction(delay);
    }

    setActiveBucketIndex(null);
    await delayFunction(delay * 2);

    // --- PHASE 3: CONCATENATION (MERGING) ---
    setStatusText('Phase 3: Merging sorted buckets back into main array...');
    let writeIdx = 0;
    const workingArray = [...array];

    for (let bIdx = 0; bIdx < currentBuckets.length; bIdx++) {
      setActiveBucketIndex(bIdx);
      await delayFunction(delay);

      while (currentBuckets[bIdx].length > 0) {
        // Take the first item from the bucket
        const val = currentBuckets[bIdx][0];
        
        // Remove from bucket
        currentBuckets[bIdx] = currentBuckets[bIdx].slice(1);
        setBuckets(currentBuckets.map(b => [...b]));

        // Write to main array
        workingArray[writeIdx] = val;
        setArray([...workingArray]);

        // Unfade in main array
        setFadedIndices(prev => {
          const next = new Set(prev);
          next.delete(writeIdx);
          return next;
        });

        setCurrentIndex(writeIdx);
        setStatusText(`Phase 3: Merged ${val} from ${bucketLabels[bIdx]} to index ${writeIdx}`);
        await delayFunction(delay);

        writeIdx++;
      }
    }

    setCurrentIndex(null);
    setActiveBucketIndex(null);
    setStatusText('Sorting Complete! The array is fully sorted.');
    setIsSorting(false);
  };

  /**
   * Resets the visualizer
   */
  const resetArray = () => {
    generateArray();
  };

  return (
    <div className="bucket-sort-visualization">
      <div className="status-text">{statusText}</div>
      <p>
        Speed:{' '}
        <input
          type="range"
          min="100"
          max="1000"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          disabled={isSorting}
        />
      </p>
      <button onClick={bucketSort} disabled={isSorting}>
        Sort
      </button>
      <button onClick={resetArray} disabled={isSorting}>
        Reset
      </button>
      <br />
      <br />

      {/* Main Array Container */}
      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${
              index === currentIndex
                ? 'current-index'
                : fadedIndices.has(index)
                ? 'faded'
                : ''
            }`}
            style={{
              height: `${value * 2}px`,
            }}
          />
        ))}
      </div>

      {/* Buckets Outer Container */}
      <div className="buckets-outer-container">
        <div className="buckets-label">Buckets (Ranges)</div>
        <div className="buckets-container">
          {buckets.map((bucketItems, bIdx) => (
            <div
              key={bIdx}
              className={`bucket-column ${
                bIdx === activeBucketIndex ? 'active-bucket' : ''
              }`}
            >
              <div className="bucket-header">{bucketLabels[bIdx]}</div>
              <div className="bucket-items">
                {bucketItems.map((val, idx) => (
                  <div
                    key={idx}
                    className={`bucket-item-bar ${
                      bIdx === activeBucketIndex &&
                      sortingBucketActiveIndices.includes(idx)
                        ? 'sorting'
                        : ''
                    }`}
                    style={{
                      height: `${val * 1.2}px`,
                    }}
                    title={val.toString()}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BucketSortVisualization;
