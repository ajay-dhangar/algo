import React, { useState, useRef, useCallback } from 'react';

type AlgorithmType = 'bubbleSort' | 'quickSort' | 'mergeSort' | 'binarySearch';

interface VisualizerSandboxProps {
  initialArray?: number[];
  algorithm?: AlgorithmType;
}

interface Step {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  found?: number;
  searching?: number[];
}

/** Generate steps for Bubble Sort */
function generateBubbleSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...arr];
  const sorted: number[] = [];
  const n = a.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted] });
      if (a[j] > a[j + 1]) {
        steps.push({ array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted] });
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted] });
      }
    }
    sorted.unshift(n - 1 - i);
    steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted] });
  }
  return steps;
}

/** Generate steps for Quick Sort (Lomuto partition, iterative via stack) */
function generateQuickSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...arr];
  const sorted: number[] = [];

  function partitionSteps(lo: number, hi: number) {
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...a], comparing: [j, hi], swapping: [], sorted: [...sorted] });
      if (a[j] <= pivot) {
        steps.push({ array: [...a], comparing: [], swapping: [i, j], sorted: [...sorted] });
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted] });
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    sorted.push(i);
    steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted] });
    return i;
  }

  const stack: [number, number][] = [[0, a.length - 1]];
  while (stack.length) {
    const [lo, hi] = stack.pop()!;
    if (lo < hi) {
      const p = partitionSteps(lo, hi);
      stack.push([lo, p - 1], [p + 1, hi]);
    } else if (lo === hi) {
      sorted.push(lo);
      steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted] });
    }
  }
  return steps;
}

/** Generate steps for Merge Sort */
function generateMergeSortSteps(arr: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...arr];
  const sorted: number[] = [];

  function merge(lo: number, mid: number, hi: number) {
    const left = a.slice(lo, mid + 1);
    const right = a.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      steps.push({ array: [...a], comparing: [lo + i, mid + 1 + j], swapping: [], sorted: [...sorted] });
      if (left[i] <= right[j]) { a[k] = left[i]; i++; }
      else { a[k] = right[j]; j++; }
      steps.push({ array: [...a], comparing: [], swapping: [k], sorted: [...sorted] });
      k++;
    }
    while (i < left.length) { a[k++] = left[i++]; }
    while (j < right.length) { a[k++] = right[j++]; }
    for (let x = lo; x <= hi; x++) sorted.push(x);
    steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted] });
  }

  function mergeSort(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    mergeSort(lo, mid);
    mergeSort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  mergeSort(0, a.length - 1);
  return steps;
}

/** Generate steps for Binary Search */
function generateBinarySearchSteps(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const sorted = [...arr].sort((a, b) => a - b);
  let lo = 0, hi = sorted.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({
      array: sorted,
      comparing: [mid],
      swapping: [],
      sorted: [],
      searching: Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
    });
    if (sorted[mid] === target) {
      steps.push({ array: sorted, comparing: [], swapping: [], sorted: [], found: mid, searching: [] });
      break;
    } else if (sorted[mid] < target) { lo = mid + 1; }
    else { hi = mid - 1; }
  }
  return steps;
}

export default function VisualizerSandbox({
  initialArray = [45, 12, 89, 34, 67, 23, 90, 11],
  algorithm = 'bubbleSort',
}: VisualizerSandboxProps) {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmType>(algorithm);
  const [arraySize, setArraySize] = useState(initialArray.length);
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [bsTarget, setBsTarget] = useState(34);
  const [currentArray, setCurrentArray] = useState<number[]>(initialArray);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateNewArray = useCallback((size: number) => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    setCurrentArray(arr);
    setSteps([]);
    setStepIdx(0);
    setIsPlaying(false);
  }, []);

  const buildSteps = useCallback(() => {
    let s: Step[] = [];
    if (selectedAlgo === 'bubbleSort') s = generateBubbleSortSteps(currentArray);
    else if (selectedAlgo === 'quickSort') s = generateQuickSortSteps(currentArray);
    else if (selectedAlgo === 'mergeSort') s = generateMergeSortSteps(currentArray);
    else if (selectedAlgo === 'binarySearch') s = generateBinarySearchSteps(currentArray, bsTarget);
    setSteps(s);
    setStepIdx(0);
    return s;
  }, [selectedAlgo, currentArray, bsTarget]);

  const handlePlay = () => {
    const s = steps.length ? steps : buildSteps();
    if (!s.length) return;
    setIsPlaying(true);

    let idx = stepIdx;
    const tick = () => {
      if (idx >= s.length - 1) { setIsPlaying(false); setStepIdx(s.length - 1); return; }
      idx++;
      setStepIdx(idx);
      timerRef.current = setTimeout(tick, speed);
    };
    timerRef.current = setTimeout(tick, speed);
  };

  const handlePause = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    const s = steps.length ? steps : buildSteps();
    setStepIdx(i => Math.min(i + 1, s.length - 1));
  };

  const handleStepBack = () => {
    setStepIdx(i => Math.max(i - 1, 0));
  };

  const handleReset = () => {
    handlePause();
    setSteps([]);
    setStepIdx(0);
    generateNewArray(arraySize);
  };

  const current = steps[stepIdx] ?? { array: currentArray, comparing: [], swapping: [], sorted: [], found: undefined, searching: [] };
  const displayArr = current.array;

  const algoLabels: Record<AlgorithmType, string> = {
    bubbleSort: 'Bubble Sort',
    quickSort: 'Quick Sort',
    mergeSort: 'Merge Sort',
    binarySearch: 'Binary Search',
  };

  return (
    <div className="visualizer-sandbox my-6 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100">
          🧮 Algorithm Visualizer — {algoLabels[selectedAlgo]}
        </h3>
        <select
          value={selectedAlgo}
          onChange={e => { setSelectedAlgo(e.target.value as AlgorithmType); handleReset(); }}
          className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="quickSort">Quick Sort</option>
          <option value="mergeSort">Merge Sort</option>
          <option value="binarySearch">Binary Search (sorted)</option>
        </select>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
        <button onClick={isPlaying ? handlePause : handlePlay} className={`px-3 py-1.5 font-semibold rounded text-white transition ${isPlaying ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'}`}>
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={handleStepBack} disabled={stepIdx === 0 || isPlaying} className="px-3 py-1.5 font-semibold rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 disabled:opacity-40 transition">
          ⏮ Step Back
        </button>
        <button onClick={handleStepForward} disabled={isPlaying} className="px-3 py-1.5 font-semibold rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 disabled:opacity-40 transition">
          ⏭ Step Fwd
        </button>
        <button onClick={handleReset} disabled={isPlaying} className="px-3 py-1.5 font-semibold rounded bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 disabled:opacity-40 transition">
          🔄 Reset
        </button>
      </div>

      {/* Sliders */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-600 dark:text-gray-400">
        <label className="flex items-center gap-2">
          Array Size: <strong>{arraySize}</strong>
          <input type="range" min={4} max={20} value={arraySize} onChange={e => { const s = Number(e.target.value); setArraySize(s); generateNewArray(s); }} className="w-24" />
        </label>
        <label className="flex items-center gap-2">
          Speed: <strong>{speed}ms</strong>
          <input type="range" min={50} max={800} step={50} value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-24" />
        </label>
        {selectedAlgo === 'binarySearch' && (
          <label className="flex items-center gap-2">
            Target: <strong>{bsTarget}</strong>
            <input type="number" min={1} max={99} value={bsTarget} onChange={e => setBsTarget(Number(e.target.value))} className="w-16 px-1 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
          </label>
        )}
      </div>

      {/* Step counter */}
      {steps.length > 0 && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Step {stepIdx + 1} / {steps.length}
        </div>
      )}

      {/* Bar visualization */}
      <div className="flex items-end justify-center h-48 gap-1 p-4 bg-gray-50 dark:bg-gray-950 rounded-lg">
        {displayArr.map((val, idx) => {
          let bgColor = 'bg-blue-500 dark:bg-blue-600';
          if (current.searching?.includes(idx)) bgColor = 'bg-purple-400 dark:bg-purple-500';
          if (current.comparing.includes(idx)) bgColor = 'bg-yellow-500 dark:bg-yellow-400';
          if (current.swapping.includes(idx)) bgColor = 'bg-red-500 dark:bg-red-400';
          if (current.sorted.includes(idx)) bgColor = 'bg-green-500 dark:bg-green-600';
          if (current.found === idx) bgColor = 'bg-emerald-400 dark:bg-emerald-300';

          return (
            <div key={idx} className="flex flex-col items-center" style={{ flex: '1', maxWidth: '36px' }}>
              <div style={{ height: `${val * 1.6}px` }} className={`w-full rounded-t ${bgColor} transition-all duration-150`} />
              <span className="mt-0.5 text-[9px] font-mono text-gray-500 dark:text-gray-400">{val}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-600 dark:text-gray-400">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" /> Default</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-yellow-500 inline-block" /> Comparing</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> Swapping</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" /> Sorted</span>
        {selectedAlgo === 'binarySearch' && <>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-purple-400 inline-block" /> Search Range</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block" /> Found</span>
        </>}
      </div>
    </div>
  );
}
