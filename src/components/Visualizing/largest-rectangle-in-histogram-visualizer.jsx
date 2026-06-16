import React, { useState, useEffect, useRef, useCallback } from 'react';

const LargestRectangleInHistogramVisualizer = () => {
  const [heights, setHeights] = useState([2, 1, 5, 6, 2, 3]);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationSteps, setSimulationSteps] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const speed = 1000; 
  const intervalRef = useRef(null);

  const generateSimulationSteps = useCallback((hArray) => {
    const steps = [];
    const stack = [];
    let maxArea = 0;
    const currentHeights = [...hArray];
    currentHeights.push(0); 

    const addStep = (type, description, highlightData = {}) => {
      steps.push({
        type,
        stack: [...stack],
        maxArea,
        currentHeights: [...currentHeights],
        description,
        ...highlightData,
      });
    };

    addStep('initial', 'Start. We conceptually append a 0 to the end of the heights array to ensure we process all bars.');

    for (let i = 0; i < currentHeights.length; i++) {
      const h = currentHeights[i];
      addStep('processing_bar', `Examining bar at index ${i} with height ${h}.`, { currentI: i });

      while (stack.length > 0 && h < currentHeights[stack[stack.length - 1]]) {
        addStep('pop_and_calculate_condition', `Current height ${h} < top of stack height ${currentHeights[stack[stack.length - 1]]}. We must pop.`, { currentI: i });
        
        const poppedIndex = stack.pop();
        const height = currentHeights[poppedIndex];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        const area = height * width;
        const oldMaxArea = maxArea;
        maxArea = Math.max(maxArea, area);

        const highlightRect = {
          x: stack.length === 0 ? 0 : stack[stack.length - 1] + 1,
          y: Math.max(...currentHeights) - height, 
          width,
          height,
          color: 'bg-green-300' 
        };

        let calculationDesc = `Popped index ${poppedIndex} (height ${height}). This is our rectangle's height. Width is ${width}. Area = ${height} * ${width} = ${area}.`;
        if (maxArea > oldMaxArea) {
           calculationDesc += ` This is a new max area!`;
        }

        addStep('calculate_area', calculationDesc, { poppedIndex, highlightRect });
      }

      if (i < hArray.length) {
        stack.push(i);
        addStep('push_to_stack', `Pushed index ${i} to the stack. Heights are increasing.`, { currentI: i });
      }
    }
    currentHeights.pop(); 
    addStep('finished', `Simulation finished. The largest rectangle area found is ${maxArea}.`, {highlightRect: simulationSteps[simulationSteps.length-1]?.highlightRect}); // Highlight best result
    return steps;
  }, []);

  useEffect(() => {
    setSimulationSteps(generateSimulationSteps(heights));
    setCurrentStep(0);
    setIsPaused(true); 
  }, [heights, generateSimulationSteps]);

  useEffect(() => {
    if (!isPaused && simulationSteps.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < simulationSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current);
            setIsPaused(true);
            return prev;
          }
        });
      }, speed);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, simulationSteps]);

  const step = simulationSteps[currentStep] || {};


  const renderHistogram = () => {
    const maxH = Math.max(...heights, 1);
    const scale = 150 / maxH; 

    return (
      <div className="flex items-end gap-1 border-b-2 border-gray-400 dark:border-gray-600 h-48 relative px-4">
        {step.currentHeights?.slice(0, heights.length)?.map((h, i) => {
          const isCurrentI = step.currentI === i;
          const isStackTop = step.stack?.[step.stack.length - 1] === i;
          let barColor = 'bg-blue-500';

          if (isCurrentI) barColor = 'bg-yellow-500'; 
          if (isStackTop) barColor = 'bg-orange-500';

          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-10 rounded-t transition-all duration-300 ${barColor}`}
                style={{ height: `${h * scale}px` }}
              ></div>
              <span className="text-sm font-semibold mt-1">{h}</span>
              <span className="text-xs text-gray-500">{i}</span>
            </div>
          );
        })}
        {step.highlightRect && (
          <div
            className={`absolute border-2 border-green-600 rounded transition-all duration-300 opacity-70 ${step.highlightRect.color}`}
            style={{
              left: `${step.highlightRect.x * 44 + 16}px`, 
              bottom: '31px',
              width: `${step.highlightRect.width * 44 - 4}px`,
              height: `${step.highlightRect.height * scale}px`,
            }}
          />
        )}
      </div>
    );
  };

  const renderStack = () => (
    <div className="flex items-center gap-2 mt-4 text-sm">
      <div className="font-bold text-gray-700 dark:text-gray-300">Stack (indices):</div>
      <div className="flex gap-1">
        {step.stack?.length === 0 && <span className="text-gray-500">[empty]</span>}
        {step.stack?.map((idx, sIdx) => (
          <span key={sIdx} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 font-mono rounded">
            {idx}
          </span>
        ))}
      </div>
    </div>
  );

  const renderControls = () => {
    const handleArrayChange = (e) => {
        try {
            const newHeights = JSON.parse(e.target.value);
            if (Array.isArray(newHeights) && newHeights.every(h => typeof h === 'number' && h >= 0)) {
                setHeights(newHeights);
            }
        } catch (err) { /* Invalid JSON input, ignore */ }
    }

    return (
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 my-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <input 
                    type="text" 
                    defaultValue={JSON.stringify(heights)}
                    onKeyPress={(e) => { if (e.key === 'Enter') handleArrayChange(e); }}
                    onBlur={handleArrayChange}
                    className="flex-grow p-2 text-sm font-mono border rounded w-full sm:w-auto"
                />
                <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentStep(0)} className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Reset</button>
                    <button onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} disabled={currentStep === 0} className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Prev</button>
                    <button onClick={() => setIsPaused(!isPaused)} className="px-6 py-1.5 text-sm font-bold bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition-colors">{isPaused ? 'Play' : 'Pause'}</button>
                    <button onClick={() => setCurrentStep(prev => Math.min(simulationSteps.length - 1, prev + 1))} disabled={currentStep >= simulationSteps.length - 1} className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Next</button>
                </div>
            </div>
            {renderHistogram()}
            {renderStack()}
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 mt-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                <div className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                    <div className="font-bold mb-2">Step {currentStep + 1} of {simulationSteps.length}:</div>
                    <p className="min-h-16 font-mono">{step.description}</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <div className="text-xl font-bold text-green-700 dark:text-green-300">Max Area</div>
                    <div className="text-4xl font-extrabold text-green-600">{step.maxArea}</div>
                </div>
            </div>
        </div>
    );
  };

  return <>{renderControls()}</>;
};

export default LargestRectangleInHistogramVisualizer;