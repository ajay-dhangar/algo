import React, { useState, useEffect } from 'react';
import './SelectionSortVisualization.css'; 

/**
 * SelectionSortVisualization Component
 * This component visualizes the Selection Sort algorithm.
 * 
 * @returns {JSX.Element} The rendered component
 */
const SelectionSortVisualization: React.FC = () => {
  // State to store the array of numbers to be sorted
  const [array, setArray] = useState<number[]>([]);
  // State to control the delay for visualization speed
  const [delay, setDelay] = useState<number>(300);
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
    const newArray = Array.from({ length: 30 }, () => Math.ceil(Math.random() * 100));
    setArray(newArray);
  };

  /**
   * Updates the CSS transition duration for the sorting visualization.
   */
  const updateMoveDuration = () => {
    const stylesheets = document.styleSheets;
    for (let i = 0; i < stylesheets.length; i++) {
      const rules = (stylesheets[i] as CSSStyleSheet).cssRules || (stylesheets[i] as CSSStyleSheet).rules;
      for (let j = 0; j < rules.length; j++) {
        if ((rules[j] as CSSStyleRule).selectorText === '.v-move') {
          (rules[j] as CSSStyleRule).style.transitionDuration = `${delay}ms`;
          break;
        }
      }
    }
  };

  /**
   * Performs the Selection Sort algorithm on the array with visualization.
   */
  const selectionSort = async () => {
    setIsSorting(true);
    let tempArray = [...array];
    for (let i = 0; i < tempArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < tempArray.length; j++) {
        setComparingIndices([minIndex, j]);
        await new Promise(resolve => setTimeout(resolve, delay));
        if (tempArray[j] < tempArray[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        let temp = tempArray[i];
        tempArray[i] = tempArray[minIndex];
        tempArray[minIndex] = temp;
        setArray([...tempArray]);
      }
    }
    setComparingIndices([]);
    setIsSorting(false);
  };

  return (
    <div className='selection-sort-visualization'>
      <p>
        Speed: <input type="range" min="10" max="200" value={delay} onChange={e => setDelay(Number(e.target.value))} />
      </p>
      <button onClick={selectionSort} disabled={isSorting}>Sort</button>
      &nbsp;
      <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
      <br /><br />
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

export default SelectionSortVisualization;
