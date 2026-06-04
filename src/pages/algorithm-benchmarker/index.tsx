import React, { useState, useCallback } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";

import {
  FaPlay,
  FaRedo,
  FaChartLine,
  FaClock,
  FaDatabase,
} from "react-icons/fa";
import styles from "./styles.module.css";

// Sorting Algorithms
const bubbleSort = (arr: number[]): number => {
  const array = [...arr];
  const startTime = performance.now();

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return performance.now() - startTime;
};

const quickSort = (arr: number[]): number => {
  const array = [...arr];
  const startTime = performance.now();

  const partition = (low: number, high: number): number => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  };

  const sort = (low: number, high: number): void => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };

  sort(0, array.length - 1);
  return performance.now() - startTime;
};

const mergeSort = (arr: number[]): number => {
  const array = [...arr];
  const startTime = performance.now();

  const merge = (left: number, mid: number, right: number): void => {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        array[k++] = leftArr[i++];
      } else {
        array[k++] = rightArr[j++];
      }
    }

    while (i < leftArr.length) array[k++] = leftArr[i++];
    while (j < rightArr.length) array[k++] = rightArr[j++];
  };

  const sort = (left: number, right: number): void => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      sort(left, mid);
      sort(mid + 1, right);
      merge(left, mid, right);
    }
  };

  sort(0, array.length - 1);
  return performance.now() - startTime;
};

const heapSort = (arr: number[]): number => {
  const array = [...arr];
  const startTime = performance.now();

  const heapify = (n: number, i: number): void => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      heapify(n, largest);
    }
  };

  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array.length, i);
  }

  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapify(i, 0);
  }

  return performance.now() - startTime;
};

interface BenchmarkResult {
  size: number;
  bubbleSort?: number;
  quickSort?: number;
  mergeSort?: number;
  heapSort?: number;
}

const AlgorithmBenchmarker: React.FC = () => {
  const { colorMode } = useColorMode();
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState({
    bubbleSort: true,
    quickSort: true,
    mergeSort: true,
    heapSort: true,
  });
  const [startSize, setStartSize] = useState(100);
  const [endSize, setEndSize] = useState(5000);
  const [step, setStep] = useState(500);

  const generateRandomArray = (size: number): number[] => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
  };

  const runBenchmark = useCallback(async () => {
    const start = Math.max(10, startSize);
    const end = Math.max(start + 1, endSize);
    const currentStep = Math.max(1, step);
    setIsRunning(true);
    const newResults: BenchmarkResult[] = [];

    for (let size = start; size <= end; size += currentStep) {
      // Yield control back to browser event loop to keep the UI responsive
      await new Promise((resolve) => setTimeout(resolve, 0));
      const array = generateRandomArray(size);
      const result: BenchmarkResult = { size };

      if (selectedAlgorithms.bubbleSort) {
        result.bubbleSort = bubbleSort(array);
      }
      if (selectedAlgorithms.quickSort) {
        result.quickSort = quickSort(array);
      }
      if (selectedAlgorithms.mergeSort) {
        result.mergeSort = mergeSort(array);
      }
      if (selectedAlgorithms.heapSort) {
        result.heapSort = heapSort(array);
      }

      newResults.push(result);
    }

    setResults(newResults);
    setIsRunning(false);
  }, [selectedAlgorithms, startSize, endSize, step]);

  const handleAlgorithmToggle = (algo: keyof typeof selectedAlgorithms) => {
    setSelectedAlgorithms((prev) => ({
      ...prev,
      [algo]: !prev[algo],
    }));
  };

  const isDark = colorMode === "dark";

  return (
    <Layout title="Algorithm Benchmarker" description="Compare sorting algorithms performance">
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const {
            LineChart,
            Line,
            XAxis,
            YAxis,
            CartesianGrid,
            Tooltip,
            Legend,
            ResponsiveContainer,
          } = require("recharts");
          return (
            <main className={styles.container}>
            <div className={styles.header}>
              <h1>
                <FaChartLine style={{ marginRight: "10px" }} />
                Algorithm Benchmarker
              </h1>
              <p>Visualize and compare sorting algorithm performance in real-time</p>
            </div>

            <div className={styles.controlPanel}>
              <div className={styles.section}>
                <h3>
                  <FaDatabase /> Select Algorithms
                </h3>
                <div className={styles.algorithmGrid}>
                  {Object.entries(selectedAlgorithms).map(([algo, selected]) => (
                    <label key={algo} className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                          handleAlgorithmToggle(
                            algo as keyof typeof selectedAlgorithms
                          )
                        }
                        disabled={isRunning}
                      />
                      <span>
                        {algo === "bubbleSort"
                          ? "Bubble Sort"
                          : algo === "quickSort"
                          ? "Quick Sort"
                          : algo === "mergeSort"
                          ? "Merge Sort"
                          : "Heap Sort"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3>
                  <FaClock /> Test Range
                </h3>
                <div className={styles.rangeInputs}>
                  <div className={styles.inputGroup}>
                    <label>Start Size:</label>
                    <input
                      type="number"
                      value={startSize}
                      onChange={(e) => setStartSize(Number(e.target.value))}
                      disabled={isRunning}
                      min="10"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>End Size:</label>
                    <input
                      type="number"
                      value={endSize}
                      onChange={(e) => setEndSize(Number(e.target.value))}
                      disabled={isRunning}
                      min={startSize + 1}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Step:</label>
                    <input
                      type="number"
                      value={step}
                      onChange={(e) => setStep(Number(e.target.value))}
                      disabled={isRunning}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  onClick={runBenchmark}
                  disabled={isRunning || !Object.values(selectedAlgorithms).some((v) => v)}
                  className={styles.runButton}
                >
                  <FaPlay /> {isRunning ? "Running..." : "Run Benchmark"}
                </button>
                <button
                  onClick={() => setResults([])}
                  disabled={isRunning || results.length === 0}
                  className={styles.resetButton}
                >
                  <FaRedo /> Reset
                </button>
              </div>
            </div>

            {results.length > 0 && (
              <div className={styles.chartContainer}>
                <h2>Performance Results</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={results} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="size"
                      stroke={isDark ? "#ccc" : "#333"}
                      label={{ value: "Array Size", position: "insideBottomRight", offset: -5 }}
                    />
                    <YAxis
                      stroke={isDark ? "#ccc" : "#333"}
                      label={{ value: "Time (ms)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1a1a1a" : "#fff",
                        border: `1px solid ${isDark ? "#444" : "#ccc"}`,
                      }}
                      labelStyle={{ color: isDark ? "#fff" : "#000" }}
                    />
                    <Legend />
                    {selectedAlgorithms.bubbleSort && (
                      <Line
                        type="monotone"
                        dataKey="bubbleSort"
                        stroke="#ff7300"
                        name="Bubble Sort"
                        dot={false}
                        strokeWidth={2}
                      />
                    )}
                    {selectedAlgorithms.quickSort && (
                      <Line
                        type="monotone"
                        dataKey="quickSort"
                        stroke="#82ca9d"
                        name="Quick Sort"
                        dot={false}
                        strokeWidth={2}
                      />
                    )}
                    {selectedAlgorithms.mergeSort && (
                      <Line
                        type="monotone"
                        dataKey="mergeSort"
                        stroke="#8884d8"
                        name="Merge Sort"
                        dot={false}
                        strokeWidth={2}
                      />
                    )}
                    {selectedAlgorithms.heapSort && (
                      <Line
                        type="monotone"
                        dataKey="heapSort"
                        stroke="#ffc658"
                        name="Heap Sort"
                        dot={false}
                        strokeWidth={2}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>

                <div className={styles.statsGrid}>
                  <div className={styles.stat}>
                    <h4>Tested Array Sizes</h4>
                    <p>{results.length} different sizes</p>
                  </div>
                  <div className={styles.stat}>
                    <h4>Range</h4>
                    <p>
                      {results[0]?.size} - {results[results.length - 1]?.size}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.infoSection}>
              <h2>About Algorithm Benchmarking</h2>
              <p>
                This tool allows you to visualize and compare the performance of different sorting algorithms
                on various input sizes. You can see how execution time changes as the array size increases,
                helping you understand the practical impact of time complexity.
              </p>
              <div className={styles.algorithmInfo}>
                <div className={styles.algoCard}>
                  <h4>Bubble Sort</h4>
                  <p><strong>Time Complexity:</strong> O(n²)</p>
                  <p>Repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order.</p>
                </div>
                <div className={styles.algoCard}>
                  <h4>Quick Sort</h4>
                  <p><strong>Time Complexity:</strong> O(n log n) average</p>
                  <p>Divides the array using a pivot element and recursively sorts the sub-arrays.</p>
                </div>
                <div className={styles.algoCard}>
                  <h4>Merge Sort</h4>
                  <p><strong>Time Complexity:</strong> O(n log n)</p>
                  <p>Divides the array in half, sorts each half, then merges them back together.</p>
                </div>
                <div className={styles.algoCard}>
                  <h4>Heap Sort</h4>
                  <p><strong>Time Complexity:</strong> O(n log n)</p>
                  <p>Uses a heap data structure to sort the array efficiently.</p>
                </div>
              </div>
            </div>
          </main>
          );
        }}
      </BrowserOnly>
    </Layout>
  );
};

export default AlgorithmBenchmarker;
