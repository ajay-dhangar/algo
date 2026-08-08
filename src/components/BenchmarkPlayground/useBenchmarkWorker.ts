import { useEffect, useRef, useCallback } from "react";
import { getBenchmarkWorkerSource } from "./workerSource";

export interface BenchmarkDone {
  status: "done";
  timeMs: number;
  comparisons: number;
  memoryEstimateBytes: number;
  liveHeapDeltaBytes: number | null;
}

export interface BenchmarkTimeout {
  status: "timeout";
  elapsedMs: number;
  estimatedTotalMs: number | null;
  comparisons: number;
  comparisonsExpected: number;
  memoryEstimateBytes: number;
}

export interface BenchmarkError {
  status: "error";
  message: string;
}

export type BenchmarkResult = BenchmarkDone | BenchmarkTimeout | BenchmarkError;

type PendingResolver = (result: BenchmarkResult) => void;

/**
 * Runs benchmarks in a dedicated Web Worker so the main thread (and the
 * page's animations/scrolling) never freezes, even when an O(n^2)
 * algorithm is deliberately pushed past its comfortable size.
 */
export function useBenchmarkWorker() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<Map<number, PendingResolver>>(new Map());
  const nextIdRef = useRef(0);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const blob = new Blob([getBenchmarkWorkerSource()], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    objectUrlRef.current = url;
    const worker = new Worker(url);

    worker.onmessage = (e: MessageEvent) => {
      const { id, ...result } = e.data || {};
      const resolver = pendingRef.current.get(id);
      if (resolver) {
        pendingRef.current.delete(id);
        resolver(result as BenchmarkResult);
      }
    };

    worker.onerror = (e: ErrorEvent) => {
      // Reject every still-pending request; a syntax/runtime error in the
      // worker otherwise leaves callers hanging forever.
      pendingRef.current.forEach((resolve) => {
        resolve({ status: "error", message: e.message || "Worker crashed" });
      });
      pendingRef.current.clear();
    };

    workerRef.current = worker;

    return () => {
      worker.terminate();
      workerRef.current = null;
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      pendingRef.current.clear();
    };
  }, []);

  const runBenchmark = useCallback(
    (algorithmId: string, size: number, deadlineMs = 4000): Promise<BenchmarkResult> => {
      return new Promise((resolve) => {
        const worker = workerRef.current;
        if (!worker) {
          resolve({ status: "error", message: "Worker not ready yet" });
          return;
        }
        const id = nextIdRef.current++;
        pendingRef.current.set(id, resolve);
        worker.postMessage({ id, algorithmId, size, deadlineMs });
      });
    },
    []
  );

  return { runBenchmark };
}
