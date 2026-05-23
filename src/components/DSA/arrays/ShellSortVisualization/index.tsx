import React, { useState, useEffect } from 'react';
import './Shellsort.css'; 

/**
 * ShellSortVisualization Component
 * This component visualizes the Shell Sort algorithm.
 * 
 * @returns {JSX.Element} The rendered component
 */
const ShellSortVisualization: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [delay, setDelay] = useState<number>(300);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [comparingIndices, setComparingIndices] = useState<number[]>([]);

  useEffect(() => {
    generateArray();
  }, []);

  useEffect(() => {
    updateMoveDuration();
  }, [delay]);

  const generateArray = () => {
    const newArray = Array.from({ length: 30 }, () => Math.ceil(Math.random() * 100));
    setArray(newArray);
  };

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


  const shellSort = async () => {
    setIsSorting(true);
    let tempArray = [...array];
    let n = tempArray.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = tempArray[i];
        let j = i;

        while (j >= gap && tempArray[j - gap] > temp) {
          setComparingIndices([j, j - gap]);
          await new Promise(resolve => setTimeout(resolve, delay));

          tempArray[j] = tempArray[j - gap];
          setArray([...tempArray]);

          j -= gap;
        }
        tempArray[j] = temp;
        setArray([...tempArray]);
      }
    }

    setComparingIndices([]);
    setIsSorting(false);
  };

  return (
    <div className='shell-sort-visualization'>
      <p>
        Speed: <input type="range" min="10" max="200" value={delay} onChange={e => setDelay(Number(e.target.value))} />
      </p>
      <button onClick={shellSort} disabled={isSorting}>Sort</button>
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

export default ShellSortVisualization;
