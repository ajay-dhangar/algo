import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "@theme/Layout";
import "../../css/visualiezer.css";

interface BarData {
  value: number;
  color: string;
}

const DEFAULT_COLOR = "cyan";
const COMPARE_COLOR = "blue";
const SWAP_COLOR = "red";
const SORTED_COLOR = "green";

const DSARoadmap: React.FC = () => {
  const [bars, setBars] = useState<BarData[]>([]);
  const [arraySize, setArraySize] = useState<number>(40);
  const [speed, setSpeed] = useState<number>(100);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Derive delay from speed: speed is 20-300. Max delay should be smaller for higher speed.
  const getDelay = () => 320 - speed;

  const waitforme = (millis: number, signal: AbortSignal): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (signal.aborted) return reject(new Error("aborted"));
      const onAbort = () => {
        clearTimeout(timeout);
        reject(new Error("aborted"));
      };
      const timeout = setTimeout(() => {
        signal.removeEventListener("abort", onAbort);
        resolve();
      }, millis);
      signal.addEventListener("abort", onAbort);
    });
  };

  const createNewArray = useCallback((size: number) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newBars: BarData[] = [];
    for (let i = 0; i < size; i++) {
      newBars.push({
        value: Math.floor(250 * Math.random()) + 1,
        color: DEFAULT_COLOR,
      });
    }
    setBars(newBars);
    setIsSorting(false);
  }, []);

  useEffect(() => {
    createNewArray(arraySize);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [createNewArray, arraySize]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    setArraySize(newSize);
    createNewArray(newSize);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value));
  };

  const startSort = (sortFn: (barsCopy: BarData[], signal: AbortSignal) => Promise<void>) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newController = new AbortController();
    abortControllerRef.current = newController;
    setIsSorting(true);

    const barsCopy = bars.map(b => ({ ...b, color: DEFAULT_COLOR }));
    setBars(barsCopy);

    sortFn(barsCopy, newController.signal)
      .then(() => setIsSorting(false))
      .catch((err) => {
        if (err.message !== "aborted") {
          console.error(err);
        }
        setIsSorting(false);
      });
  };

  // --- BUBBLE SORT ---
  const bubbleSort = async (arr: BarData[], signal: AbortSignal) => {
    const delay = getDelay();
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = COMPARE_COLOR;
        arr[j + 1].color = COMPARE_COLOR;
        setBars([...arr]);
        await waitforme(delay, signal);

        if (arr[j].value > arr[j + 1].value) {
          const temp = arr[j].value;
          arr[j].value = arr[j + 1].value;
          arr[j + 1].value = temp;
          setBars([...arr]);
        }
        arr[j].color = DEFAULT_COLOR;
        arr[j + 1].color = DEFAULT_COLOR;
      }
      arr[arr.length - 1 - i].color = SORTED_COLOR;
      setBars([...arr]);
    }
    if (arr.length > 0) {
      arr[0].color = SORTED_COLOR;
      setBars([...arr]);
    }
  };

  // --- INSERTION SORT ---
  const insertionSort = async (arr: BarData[], signal: AbortSignal) => {
    const delay = getDelay();
    if (arr.length > 0) {
      arr[0].color = SORTED_COLOR;
      setBars([...arr]);
    }
    for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      const key = arr[i].value;
      arr[i].color = COMPARE_COLOR;
      setBars([...arr]);
      await waitforme(delay, signal);

      while (j >= 0 && arr[j].value > key) {
        arr[j].color = COMPARE_COLOR;
        arr[j + 1].value = arr[j].value;
        setBars([...arr]);
        await waitforme(delay, signal);
        j--;
      }
      arr[j + 1].value = key;
      for (let k = i; k >= 0; k--) {
        arr[k].color = SORTED_COLOR;
      }
      setBars([...arr]);
    }
  };

  // --- MERGE SORT ---
  const merge = async (arr: BarData[], left: number, mid: number, right: number, signal: AbortSignal) => {
    const delay = getDelay();
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    for (let i = 0; i < n1; i++) {
      await waitforme(delay, signal);
      arr[left + i].color = "orange";
      leftArr[i] = arr[left + i].value;
      setBars([...arr]);
    }
    for (let j = 0; j < n2; j++) {
      await waitforme(delay, signal);
      arr[mid + 1 + j].color = "yellow";
      rightArr[j] = arr[mid + 1 + j].value;
      setBars([...arr]);
    }
    await waitforme(delay, signal);

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
      await waitforme(delay, signal);
      if (leftArr[i] <= rightArr[j]) {
        arr[k].value = leftArr[i];
        arr[k].color = "lightgreen";
        i++;
      } else {
        arr[k].value = rightArr[j];
        arr[k].color = "lightgreen";
        j++;
      }
      k++;
      setBars([...arr]);
    }
    while (i < n1) {
      await waitforme(delay, signal);
      arr[k].value = leftArr[i];
      arr[k].color = "lightgreen";
      i++;
      k++;
      setBars([...arr]);
    }
    while (j < n2) {
      await waitforme(delay, signal);
      arr[k].value = rightArr[j];
      arr[k].color = "lightgreen";
      j++;
      k++;
      setBars([...arr]);
    }
  };

  const mergeSortHelper = async (arr: BarData[], left: number, right: number, signal: AbortSignal) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(arr, left, mid, signal);
    await mergeSortHelper(arr, mid + 1, right, signal);
    await merge(arr, left, mid, right, signal);
  };

  const mergeSort = async (arr: BarData[], signal: AbortSignal) => {
    await mergeSortHelper(arr, 0, arr.length - 1, signal);
    // Color them all green when done
    for (let i = 0; i < arr.length; i++) {
      arr[i].color = SORTED_COLOR;
    }
    setBars([...arr]);
  };

  // --- QUICK SORT ---
  const partitionLomuto = async (arr: BarData[], low: number, high: number, signal: AbortSignal) => {
    const delay = getDelay();
    let pivot = arr[high].value;
    let i = low - 1;
    arr[high].color = "red";
    setBars([...arr]);
    
    for (let j = low; j <= high - 1; j++) {
      arr[j].color = "yellow";
      setBars([...arr]);
      await waitforme(delay, signal);
      
      if (arr[j].value < pivot) {
        i++;
        const temp = arr[i].value;
        arr[i].value = arr[j].value;
        arr[j].value = temp;
        
        arr[i].color = "orange";
        if (i !== j) arr[j].color = "orange";
        setBars([...arr]);
        await waitforme(delay, signal);
      } else {
        arr[j].color = "pink";
        setBars([...arr]);
      }
    }
    i++;
    await waitforme(delay, signal);
    const temp = arr[i].value;
    arr[i].value = arr[high].value;
    arr[high].value = temp;
    
    arr[high].color = "pink";
    arr[i].color = SORTED_COLOR;
    setBars([...arr]);
    await waitforme(delay, signal);
    
    for (let k = 0; k < arr.length; k++) {
      if (arr[k].color !== SORTED_COLOR) arr[k].color = DEFAULT_COLOR;
    }
    setBars([...arr]);
    return i;
  };

  const quickSortHelper = async (arr: BarData[], low: number, high: number, signal: AbortSignal) => {
    if (low < high) {
      const pi = await partitionLomuto(arr, low, high, signal);
      await quickSortHelper(arr, low, pi - 1, signal);
      await quickSortHelper(arr, pi + 1, high, signal);
    } else if (low >= 0 && high >= 0 && low < arr.length && high < arr.length) {
      arr[high].color = SORTED_COLOR;
      arr[low].color = SORTED_COLOR;
      setBars([...arr]);
    }
  };

  const quickSort = async (arr: BarData[], signal: AbortSignal) => {
    await quickSortHelper(arr, 0, arr.length - 1, signal);
    for (let i = 0; i < arr.length; i++) {
      arr[i].color = SORTED_COLOR;
    }
    setBars([...arr]);
  };

  // --- SELECTION SORT ---
  const selectionSort = async (arr: BarData[], signal: AbortSignal) => {
    const delay = getDelay();
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      arr[i].color = COMPARE_COLOR;
      setBars([...arr]);
      
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].color = SWAP_COLOR;
        setBars([...arr]);
        await waitforme(delay, signal);
        
        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) arr[minIdx].color = DEFAULT_COLOR;
          minIdx = j;
        } else {
          arr[j].color = DEFAULT_COLOR;
        }
        setBars([...arr]);
      }
      await waitforme(delay, signal);
      
      const temp = arr[minIdx].value;
      arr[minIdx].value = arr[i].value;
      arr[i].value = temp;
      
      arr[minIdx].color = DEFAULT_COLOR;
      arr[i].color = SORTED_COLOR;
      setBars([...arr]);
    }
  };

  return (
    <Layout
      title="Visual Format Of Sorting Algorithms"
      description="Visualize Sorting Algorithms"
    >
      <div className="min-h-screen bg-dark text-white">
        <div className="container mx-auto py-8 px-6">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Sorting Visualizer</h1>
          <nav>
            <div className="row">
              <div className="col gap-2 d-sm-flex">
                <button
                  type="button"
                  className="btn btn-outline-success btn-dark"
                  onClick={() => createNewArray(arraySize)}
                  disabled={isSorting}
                  aria-label="Generate new array"
                >
                  New Array
                </button>
              </div>
              <div className="col">
                <label htmlFor="arr_sz">
                  Size
                  <input
                    id="arr_sz"
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={arraySize}
                    onChange={handleSizeChange}
                    disabled={isSorting}
                    aria-label="Adjust array size"
                  />
                </label>
                <label htmlFor="speed_input">
                  Speed
                  <input
                    id="speed_input"
                    type="range"
                    min="20"
                    max="300"
                    step="10"
                    value={speed}
                    onChange={handleSpeedChange}
                    disabled={isSorting}
                    aria-label="Adjust sorting speed"
                  />
                </label>
              </div>
              <div className="col gap-2 d-sm-flex justify-content-end">
                <button 
                  type="button" 
                  className="btn btn-outline-primary btn-dark"
                  onClick={() => startSort(bubbleSort)}
                  disabled={isSorting}
                  aria-label="Start Bubble Sort"
                >
                  Bubble Sort
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-primary btn-dark"
                  onClick={() => startSort(selectionSort)}
                  disabled={isSorting}
                  aria-label="Start Selection Sort"
                >
                  Selection Sort
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-primary btn-dark"
                  onClick={() => startSort(insertionSort)}
                  disabled={isSorting}
                  aria-label="Start Insertion Sort"
                >
                  Insertion Sort
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-primary btn-dark"
                  onClick={() => startSort(quickSort)}
                  disabled={isSorting}
                  aria-label="Start Quick Sort"
                >
                  Quick Sort
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-primary btn-dark"
                  onClick={() => startSort(mergeSort)}
                  disabled={isSorting}
                  aria-label="Start Merge Sort"
                >
                  Merge Sort
                </button>
              </div>
            </div>
          </nav>
          <div id="bars" className="flex-container">
            {bars.map((bar, idx) => (
              <div
                key={idx}
                className={`bar flex-item barNo${idx}`}
                style={{ height: `${1.5 * bar.value}px`, background: bar.color }}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DSARoadmap;
