import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { ALGORITHMS, SIZE_STEPS, formatSize, getAlgoMeta } from "./algorithms";
import { useBenchmarkWorker, BenchmarkResult } from "./useBenchmarkWorker";
import BenchmarkChart, { MeasuredPoint } from "./BenchmarkChart";

const DEADLINE_MS = 4000;
const DEBOUNCE_MS = 250;

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms.toFixed(ms < 10 ? 2 : 1)} ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(2)} s`;
  const min = s / 60;
  if (min < 60) return `${min.toFixed(1)} min`;
  const hr = min / 60;
  if (hr < 48) return `${hr.toFixed(1)} hours`;
  const days = hr / 24;
  if (days < 365) return `${days.toFixed(1)} days`;
  return `${(days / 365).toFixed(1)} years`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function BenchmarkPlayground() {
  const [algoId, setAlgoId] = useState<string>("bubble-sort");
  const [sizeIndex, setSizeIndex] = useState<number>(2); // -> 1,000
  const [history, setHistory] = useState<Record<string, MeasuredPoint[]>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [lastResult, setLastResult] = useState<{ size: number; result: BenchmarkResult } | null>(
    null
  );
  const { runBenchmark } = useBenchmarkWorker();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runIdRef = useRef(0);

  const algo = getAlgoMeta(algoId)!;
  const size = SIZE_STEPS[sizeIndex];

  const execute = async () => {
    const myRunId = ++runIdRef.current;
    setIsRunning(true);
    const result = await runBenchmark(algoId, size, DEADLINE_MS);
    if (myRunId !== runIdRef.current) return; // a newer run superseded this one
    setIsRunning(false);
    setLastResult({ size, result });

    if (result.status === "done" || result.status === "timeout") {
      const timeMs = result.status === "done" ? result.timeMs : result.estimatedTotalMs ?? result.elapsedMs;
      const point: MeasuredPoint = { size, timeMs, isEstimate: result.status === "timeout" };
      setHistory((prev) => {
        const list = (prev[algoId] || []).filter((p) => p.size !== size);
        return { ...prev, [algoId]: [...list, point] };
      });
    }
  };

  // Auto-run (debounced) whenever the algorithm or size changes.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      execute();
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algoId, sizeIndex]);

  const points = history[algoId] || [];

  const dangerZone = algo.timeClass === "n2" && sizeIndex >= 4; // 100K+ for O(n^2)

  return (
    <div className="margin-vert--lg">
      <div className="row">
        {/* Controls */}
        <div className="col col--4">
          <div
            className="card padding--md"
            style={{ borderRadius: 12, border: "1px solid var(--ifm-color-emphasis-200)" }}
          >
            <h3 style={{ marginTop: 0 }}>Controls</h3>

            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--ifm-color-emphasis-700)",
                marginBottom: 6,
              }}
            >
              Algorithm
            </label>
            <select
              value={algoId}
              onChange={(e) => setAlgoId(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 8,
                marginBottom: 16,
                border: "1px solid var(--ifm-color-emphasis-300)",
                background: "var(--ifm-background-color)",
                color: "var(--ifm-font-color-base)",
              }}
            >
              <optgroup label="Sorting">
                {ALGORITHMS.filter((a) => a.category === "sort").map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.timeComplexity}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Searching">
                {ALGORITHMS.filter((a) => a.category === "search").map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.timeComplexity}
                  </option>
                ))}
              </optgroup>
            </select>

            <p style={{ fontSize: 13, opacity: 0.8, marginTop: -8, marginBottom: 16 }}>
              {algo.description}
            </p>

            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--ifm-color-emphasis-700)",
                marginBottom: 6,
              }}
            >
              Input size: <span style={{ color: "var(--ifm-color-primary)" }}>{formatSize(size)}</span>{" "}
              elements
            </label>
            <input
              type="range"
              min={0}
              max={SIZE_STEPS.length - 1}
              step={1}
              value={sizeIndex}
              onChange={(e) => setSizeIndex(Number(e.target.value))}
              style={{ width: "100%", cursor: "pointer" }}
              aria-label="Input size"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                opacity: 0.7,
                marginTop: 4,
                marginBottom: 16,
              }}
            >
              {SIZE_STEPS.map((s) => (
                <span key={s}>{formatSize(s)}</span>
              ))}
            </div>

            {dangerZone && (
              <div
                className="alert alert--warning"
                style={{ fontSize: 12, padding: "8px 10px", marginBottom: 16 }}
              >
                ⚠️ {algo.name} is O(n²). At this size it will likely blow through the {DEADLINE_MS / 1000}
                s time budget — you'll get an <em>extrapolated</em> estimate instead of a real
                measurement, which is exactly the point.
              </div>
            )}

            <button
              className="button button--primary button--block"
              onClick={() => {
                if (debounceRef.current) clearTimeout(debounceRef.current);
                execute();
              }}
              disabled={isRunning}
            >
              {isRunning ? "Running…" : "Run now"}
            </button>

            <p style={{ fontSize: 11, opacity: 0.6, marginTop: 10, marginBottom: 0 }}>
              Runs happen off the main thread in a Web Worker, so this page never freezes — even
              when an algorithm is deliberately too slow for its input size.
            </p>
          </div>
        </div>

        {/* Results + chart */}
        <div className="col col--8">
          <div
            className="card padding--md"
            style={{
              borderRadius: 12,
              border: "1px solid var(--ifm-color-emphasis-200)",
              marginBottom: 16,
            }}
          >
            <ResultPanel algo={algo} size={size} isRunning={isRunning} result={lastResult} />
          </div>

          <div
            className="card padding--md"
            style={{ borderRadius: 12, border: "1px solid var(--ifm-color-emphasis-200)" }}
          >
            <h3 style={{ marginTop: 0 }}>Measured runtime vs. input size</h3>
            {points.length === 0 ? (
              <p style={{ opacity: 0.7 }}>Run a benchmark to start plotting points.</p>
            ) : (
              <BenchmarkChart points={points} algo={algo} />
            )}
          </div>
        </div>
      </div>

      <p style={{ fontSize: 13, opacity: 0.75, marginTop: 20 }}>
        Want the theoretical curves without running real code? Check out the{" "}
        <Link to="/complexity-visualizer">Time Complexity Visualizer</Link>.
      </p>
    </div>
  );
}

function ResultPanel({
  algo,
  size,
  isRunning,
  result,
}: {
  algo: ReturnType<typeof getAlgoMeta>;
  size: number;
  isRunning: boolean;
  result: { size: number; result: BenchmarkResult } | null;
}) {
  if (isRunning) {
    return (
      <div>
        <h3 style={{ marginTop: 0 }}>Benchmarking {formatSize(size)} elements…</h3>
        <p style={{ opacity: 0.7 }}>
          Sorting/searching in a Web Worker. Large O(n²) runs may take a few seconds before timing
          out.
        </p>
      </div>
    );
  }

  if (!result || !algo) {
    return <p style={{ opacity: 0.7 }}>Move the slider or pick an algorithm to run a benchmark.</p>;
  }

  const { result: r, size: rSize } = result;

  if (r.status === "error") {
    return <p style={{ color: "var(--ifm-color-danger)" }}>Benchmark failed: {r.message}</p>;
  }

  const stat: React.CSSProperties = { fontSize: 28, fontWeight: 800, lineHeight: 1.2 };
  const label: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "var(--ifm-color-emphasis-700)",
  };

  if (r.status === "timeout") {
    return (
      <div>
        <h3 style={{ marginTop: 0 }}>
          {algo.name} on {formatSize(rSize)} elements
        </h3>
        <div className="row">
          <div className="col col--6">
            <div style={label}>Time complexity</div>
            <div style={stat}>{algo.timeComplexity}</div>
          </div>
          <div className="col col--6">
            <div style={label}>Estimated total time</div>
            <div style={{ ...stat, color: "var(--ifm-color-danger)" }}>
              ≈ {r.estimatedTotalMs != null ? formatDuration(r.estimatedTotalMs) : "unknown"}
            </div>
          </div>
        </div>
        <p style={{ fontSize: 13, opacity: 0.8, marginTop: 12, marginBottom: 0 }}>
          Aborted after {formatDuration(r.elapsedMs)} having completed only{" "}
          {r.comparisonsExpected > 0 ? ((r.comparisons / r.comparisonsExpected) * 100).toFixed(3) : "0"}%
          of the {r.comparisonsExpected.toLocaleString()} comparisons this run needed. The estimate
          above extrapolates from that partial progress — <strong>this is the visceral part</strong>:
          an O(n log n) algorithm finishes this same input size comfortably in milliseconds.
        </p>
        <div style={{ marginTop: 12 }}>
          <div style={label}>Space (estimated)</div>
          <div>
            {algo.spaceComplexity} · ≈ {formatBytes(r.memoryEstimateBytes)} for the input array
          </div>
        </div>
      </div>
    );
  }

  // status === 'done'
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>
        {algo.name} on {formatSize(rSize)} elements
      </h3>
      <div className="row">
        <div className="col col--4">
          <div style={label}>Time complexity</div>
          <div style={stat}>{algo.timeComplexity}</div>
        </div>
        <div className="col col--4">
          <div style={label}>Measured time</div>
          <div style={{ ...stat, color: algo.color }}>{formatDuration(r.timeMs)}</div>
        </div>
        <div className="col col--4">
          <div style={label}>Comparisons</div>
          <div style={stat}>{r.comparisons.toLocaleString()}</div>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={label}>Space (estimated)</div>
        <div>
          {algo.spaceComplexity} · ≈ {formatBytes(r.memoryEstimateBytes)} for the input array
          {algo.id === "merge-sort" ? " + auxiliary buffer" : ""}
          {r.liveHeapDeltaBytes != null && (
            <span style={{ opacity: 0.7 }}>
              {" "}
              (live heap Δ in this browser: {formatBytes(r.liveHeapDeltaBytes)})
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
