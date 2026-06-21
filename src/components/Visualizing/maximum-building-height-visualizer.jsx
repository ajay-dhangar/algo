import React, { useState, useEffect, useRef, useCallback } from 'react';

const MaximumBuildingHeightVisualizer = () => {
  const [n, setN] = useState(5);
  const [restrictions, setRestrictions] = useState([[2, 1], [4, 1]]);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationSteps, setSimulationSteps] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const [error, setError] = useState(null);

  const speed = 1200;
  const intervalRef = useRef(null);

  const getProfile = (resArray, totalN) => {
    const profile = new Array(totalN).fill(0);
    for (let k = 1; k <= totalN; k++) {
      let maxH = totalN; 
      for (const r of resArray) {
        maxH = Math.min(maxH, r[1] + Math.abs(r[0] - k));
      }
      profile[k - 1] = maxH;
    }
    return profile;
  };

  const generateSimulationSteps = useCallback((totalN, initialRes) => {
    const steps = [];
    let maxGlobalHeight = 0;

    let res = JSON.parse(JSON.stringify(initialRes));
    res.push([1, 0]);
    res.push([totalN, totalN - 1]);
    res.sort((a, b) => a[0] - b[0]);

    const addStep = (type, description, data = {}) => {
      steps.push({
        type,
        description,
        resState: JSON.parse(JSON.stringify(res)),
        profile: getProfile(res, totalN),
        maxHeight: maxGlobalHeight,
        ...data,
      });
    };

    addStep('initial', `Start. We conceptually add boundaries [1, 0] and [${totalN}, ${totalN - 1}] to our restrictions and sort them by building ID.`);

    for (let i = 1; i < res.length; i++) {
      const prev = res[i - 1];
      const curr = res[i];
      const oldH = curr[1];
      const newH = Math.min(curr[1], prev[1] + curr[0] - prev[0]);
      curr[1] = newH;

      let desc = `L-to-R Pass: Building ${curr[0]} restricted by Building ${prev[0]}. `;
      if (newH < oldH) {
        desc += `Height limit drops from ${oldH} to ${newH} (prev limit ${prev[1]} + distance ${curr[0] - prev[0]}).`;
      } else {
        desc += `Limit remains ${oldH} (not affected by previous building).`;
      }

      addStep('ltr', desc, { activeIds: [prev[0], curr[0]] });
    }

    for (let i = res.length - 2; i >= 0; i--) {
      const next = res[i + 1];
      const curr = res[i];
      const oldH = curr[1];
      const newH = Math.min(curr[1], next[1] + next[0] - curr[0]);
      curr[1] = newH;

      let desc = `R-to-L Pass: Building ${curr[0]} restricted by Building ${next[0]}. `;
      if (newH < oldH) {
        desc += `Height limit drops from ${oldH} to ${newH} (next limit ${next[1]} + distance ${next[0] - curr[0]}).`;
      } else {
        desc += `Limit remains ${oldH}.`;
      }

      addStep('rtl', desc, { activeIds: [curr[0], next[0]] });
    }

    for (let i = 1; i < res.length; i++) {
      const prev = res[i - 1];
      const curr = res[i];
      const d = curr[0] - prev[0];
      const peak = Math.floor((prev[1] + curr[1] + d) / 2);
      
      const oldMax = maxGlobalHeight;
      maxGlobalHeight = Math.max(maxGlobalHeight, peak);

      let desc = `Calculating peak between Building ${prev[0]} and ${curr[0]}. Formula: (H1 + H2 + dist) / 2 = (${prev[1]} + ${curr[1]} + ${d}) / 2 = ${peak}.`;
      if (maxGlobalHeight > oldMax) {
        desc += ` This is our new global max height!`;
      }
      
      addStep('peak', desc, { activeIds: [prev[0], curr[0]], peakVal: peak });
    }

    addStep('finished', `Simulation finished. The absolute maximum building height possible is ${maxGlobalHeight}.`);

    return steps;
  }, []);

  useEffect(() => {
    setSimulationSteps(generateSimulationSteps(n, restrictions));
    setCurrentStep(0);
    setIsPaused(true);
  }, [n, restrictions, generateSimulationSteps]);

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
    const maxH = Math.max(...(step.profile || []), 1);
    const scale = 150 / maxH; 
    
    return (
      <div className="flex items-end gap-1 border-b-2 border-gray-400 dark:border-gray-600 h-48 relative px-4 overflow-x-auto mt-4">
        {step.profile?.map((h, index) => {
          const buildingId = index + 1;
          const isActive = step.activeIds?.includes(buildingId);
          
          let barColor = 'bg-blue-500';
          if (isActive) barColor = 'bg-yellow-500';

          return (
            <div key={index} className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-10 rounded-t transition-all duration-300 ${barColor}`}
                style={{ height: `${h * scale}px` }}
              ></div>
              <span className="text-sm font-semibold mt-1">{h}</span>
              <span className="text-xs text-gray-500">ID: {buildingId}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderRestrictionsArray = () => (
    <div className="flex items-center gap-2 mt-6 text-sm overflow-x-auto pb-2">
      <div className="font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap">Active Constraints:</div>
      <div className="flex gap-2">
        {step.resState?.map((r, idx) => {
          const isActive = step.activeIds?.includes(r[0]);
          return (
            <span
              key={idx}
              className={`px-3 py-1 font-mono rounded transition-colors duration-300 ${
                isActive
                  ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              [{r[0]}, {r[1]}]
            </span>
          );
        })}
      </div>
    </div>
  );

  const renderControls = () => {
    const handleRestrictionsChange = (e) => {
      try {
        const parsed = JSON.parse(e.target.value);
        if (Array.isArray(parsed) && parsed.every((arr) => Array.isArray(arr) && arr.length === 2)) {
          setRestrictions(parsed);
          setError(null);
        } else {
          setError('Must be a 2D JSON array (e.g., [[2,1],[4,1]])');
        }
      } catch (err) {
        setError('Invalid JSON input');
      }
    };

    const handleNChange = (e) => {
      const val = parseInt(e.target.value, 10);
      if (val >= 2 && val <= 30) {
        setN(val);
      }
    };

    return (
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 my-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          
          <div className="flex-grow w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <div className="flex flex-col w-24">
              <label className="text-xs text-gray-500 mb-1">Total Buildings (n)</label>
              <input
                type="number"
                defaultValue={n}
                onChange={handleNChange}
                min={2}
                max={30}
                className="p-2 text-sm font-mono border rounded"
              />
            </div>
            <div className="flex flex-col flex-grow">
               <label className="text-xs text-gray-500 mb-1">Restrictions Array</label>
              <input
                type="text"
                defaultValue={JSON.stringify(restrictions)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleRestrictionsChange(e); }}
                onBlur={handleRestrictionsChange}
                className={`p-2 text-sm font-mono border rounded w-full ${
                  error ? 'border-red-500 focus:outline-red-500' : ''
                }`}
              />
               {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 md:mt-0 self-end md:self-center">
            <button
              onClick={() => setCurrentStep(0)}
              className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-6 py-1.5 text-sm font-bold bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition-colors"
            >
              {isPaused ? 'Play' : 'Pause'}
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.min(simulationSteps.length - 1, prev + 1))}
              disabled={currentStep >= simulationSteps.length - 1}
              className="px-4 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {renderHistogram()}
        {renderRestrictionsArray()}

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 mt-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <div className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
            <div className="font-bold mb-2">
              Step {currentStep + 1} of {simulationSteps.length}:
            </div>
            <p className="min-h-[4rem] font-mono">{step.description}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg min-w-[120px]">
            <div className="text-xl font-bold text-green-700 dark:text-green-300">Max Height</div>
            <div className="text-4xl font-extrabold text-green-600">{step.maxHeight}</div>
          </div>
        </div>
      </div>
    );
  };

  return <>{renderControls()}</>;
};

export default MaximumBuildingHeightVisualizer;