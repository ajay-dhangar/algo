import React, { useState, useEffect, useRef } from 'react';
import { withVisualizerErrorBoundary } from '../../../Visualizing/VisualizerErrorBoundary';
import './BubbleSortVisualization.css';

/**
 * BubbleSortVisualization Component
 * This component visualizes the Bubble Sort algorithm.
 *
 * @returns {JSX.Element} The rendered component
 */
const BubbleSortVisualization: React.FC = () => {
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  // State to store the array of numbers to be sorted
  const [array, setArray] = useState<number[]>([]);
  // State to control the delay for visualization speed
  const [delay, setDelay] = useState<number>(200);
  // State to indicate if sorting is in progress
  const [isSorting, setIsSorting] = useState<boolean>(false);
  // State to store the indices of elements being compared
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);

  // Effect to generate a new array when the component mounts
  useEffect(() => {
    generateArray();
  }, []);

  // Effect to update the CSS transition duration when the delay changes
  useEffect(() => {
    updateMoveDuration();
  }, [delay]);

  /**
   * Generates a new array of random numbers and updates the state.
   */
  const generateArray = () => {
    const newArray = Array.from({ length: 50 }, () => Math.ceil(Math.random() * 100));
    setArray(newArray);
  };

  /**
   * Updates the CSS transition duration for the sorting visualization.
   */
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
        // Cross-origin stylesheet or inaccessible rules — skip
        continue;
      }
    }
  };

  /**
   * Performs the Bubble Sort algorithm on the array with visualization.
   */
  const bubbleSort = async () => {
    if (!isMounted.current) return;
    setIsSorting(true);
    let tempArray = [...array];
    for (let i = 0; i < tempArray.length - 1; i++) {
      for (let j = 0; j < tempArray.length - i - 1; j++) {
        if (!isMounted.current) return;
        setComparingIndices([j, j + 1]);
        await new Promise(resolve => setTimeout(resolve, delay));
        if (!isMounted.current) return;
        if (tempArray[j] > tempArray[j + 1]) {
          let temp = tempArray[j];
          tempArray[j] = tempArray[j + 1];
          tempArray[j + 1] = temp;
          setArray([...tempArray]);
        }
      }
    }
    if (!isMounted.current) return;
    setComparingIndices([]);
    setIsSorting(false);
  };

  return (
    <div className='bubble-sort-visualization'>
      <p>
        <label htmlFor="bubble-sort-speed">Speed:</label> <input id="bubble-sort-speed" type="range" min="10" max="200" value={delay} onChange={e => setDelay(Number(e.target.value))} />
      </p>
      <button onClick={bubbleSort} disabled={isSorting}>Sort</button>
      &nbsp;
      <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
      <br /><br />
      <p>
        <strong>Instructions:</strong> Click the &quot;Sort&quot; button to visualize the Bubble Sort algorithm. You can also adjust the speed of the visualization using the slider.
      </p>
      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${comparingIndices.includes(index) ? 'comparing' : ''}`}
            style={{ height: `${value * 3}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default withVisualizerErrorBoundary(BubbleSortVisualization);
