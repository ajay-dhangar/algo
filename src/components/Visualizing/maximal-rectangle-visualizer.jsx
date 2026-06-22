import React, { useState } from 'react';
import { withVisualizerErrorBoundary } from './VisualizerErrorBoundary';

function MaximalRectangleVisualizer() {
  const [grid, setGrid] = useState([
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0'],
  ]);
  const [result, setResult] = useState(null);

  const toggleCell = (r, c) => {
    setGrid(prevGrid =>
      prevGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === r && colIndex === c) {
            return cell === '1' ? '0' : '1';
          }
          return cell;
        })
      )
    );
    setResult(null); 
  };

  const calculateMaxRectangle = () => {
    if (!grid || grid.length === 0) return;

    const rows = grid.length;
    const cols = grid[0].length;
    const heights = new Array(cols + 1).fill(0);

    let maxArea = 0;
    let bestRect = null; 

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        heights[c] = grid[r][c] === '1' ? heights[c] + 1 : 0;
      }

      const stack = [-1];
      for (let i = 0; i <= cols; i++) {
        while (stack[stack.length - 1] !== -1 && heights[i] < heights[stack[stack.length - 1]]) {
          const h = heights[stack.pop()];
          const w = i - 1 - stack[stack.length - 1];
          const area = h * w;

          if (area > maxArea) {
            maxArea = area;
            bestRect = {
              r1: r - h + 1,
              c1: stack[stack.length - 1] + 1,
              r2: r,
              c2: i - 1,
            };
          }
        }
        stack.push(i);
      }
    }

    setResult({ maxArea, bestRect });
  };

  const isHighlighted = (r, c) => {
    if (!result || !result.bestRect) return false;
    const { r1, c1, r2, c2 } = result.bestRect;
    return r >= r1 && r <= r2 && c >= c1 && c <= c2;
  };

  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 my-6">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Interactive Visualizer</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Click the cells below to toggle between 0 and 1, then calculate to see the maximal rectangle.
        </p>
      </div>

      <div className="flex flex-col gap-1 mb-6 items-center">
        {grid.map((row, r) => (
          <div key={r} className="flex gap-1 justify-center">
            {row.map((cell, c) => {
              const highlight = isHighlighted(r, c);
              return (
                <button
                  key={c}
                  onClick={() => toggleCell(r, c)}
                  className={`w-12 h-12 flex items-center justify-center border-2 font-bold text-lg rounded transition-all duration-200
                    ${
                      cell === '1'
                        ? highlight
                          ? 'bg-green-500 text-white border-green-600 scale-105 shadow-md z-10'
                          : 'bg-blue-500 text-white border-blue-600'
                        : 'bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600'
                    }
                  `}
                >
                  {cell}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
        <button
          onClick={calculateMaxRectangle}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded shadow transition-colors"
        >
          Calculate Rectangle
        </button>
        {result && (
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            Max Area: <span className="text-green-500 text-2xl ml-2">{result.maxArea}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default withVisualizerErrorBoundary(MaximalRectangleVisualizer);