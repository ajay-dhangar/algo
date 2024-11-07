import React, { useState, useEffect } from 'react';
import './style.css'; 

const InsertionSortVisualization: React.FC = () => {
  // State variables
  const [array, setArray] = useState<number[]>([]); // Holds the array of numbers
  const [delay, setDelay] = useState<number>(300); // Controls the delay for visualization
  const [minIndex, setMinIndex] = useState<number | null>(null); // Index of the last inserted position
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Current index being evaluated
  const [isSorting, setIsSorting] = useState<boolean>(false); // Indicates if the array is being sorted

  // Generates a new array when the component mounts
  useEffect(() => {
    generateArray();    
  }, []);

  // Updates the transition duration whenever the delay changes
  useEffect(() => {
    updateMoveDuration();
  }, [delay]);

  // Function to generate a new array with random values
  const generateArray = () => {
    const newArray = Array.from({ length: 40 }, () => Math.ceil(Math.random() * 90) + 10);
    setArray(newArray);
  };

  // Function to update the transition duration for CSS animations
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

  // Function to perform insertion sort on the array
  const insertionSort = async () => {
    setIsSorting(true);
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      setCurrentIndex(i);
      while (j >= 0 && array[j] > key) {
        await delayFunction(delay);
        array[j + 1] = array[j];
        setArray([...array]);
        j = j - 1;
      }
      array[j + 1] = key;
      setArray([...array]);
      setMinIndex(j + 1);
    }
    setIsSorting(false);
  };

  // Function to reset the array to new random values
  const resetArray = () => {
    generateArray();
    setMinIndex(null);
    setCurrentIndex(null);
  };

  // Helper function to create a delay
  const delayFunction = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  return (
    <div className='insertion-sort-visualization'>
      <p>Speed: <input type="range" min="50" max="500" value={delay} onChange={e => setDelay(Number(e.target.value))} /></p>
      <button onClick={insertionSort} disabled={isSorting}>Sort</button>
      &nbsp;
      <button onClick={resetArray} disabled={isSorting}>Reset</button>
      <br /> <br />
      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-bar ${index === currentIndex ? 'current-index' : index === minIndex ? 'min-index' : ''}`}
            style={{ height: `${value * 3}px`, transitionDelay: `${delay / 2}ms` }}
           />
        ))}
      </div>      
    </div>
  );
};

export default InsertionSortVisualization;
