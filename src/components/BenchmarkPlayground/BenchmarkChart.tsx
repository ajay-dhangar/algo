import React, { useMemo } from "react";
import { SIZE_STEPS, formatSize, AlgoMeta } from "./algorithms";

export interface MeasuredPoint {
  size: number;
  timeMs: number; // may be an extrapolated estimate for timed-out runs
  isEstimate: boolean;
}

interface Props {
  points: MeasuredPoint[];
  algo: AlgoMeta;
  width?: number;
  height?: number;
}

const PADDING = { top: 20, right: 24, bottom: 40, left: 64 };

function log10(v: number) {
  return Math.log(Math.max(v, 1e-9)) / Math.LN10;
}

export default function BenchmarkChart({ points, algo, width = 720, height = 360 }: Props) {
  const innerW = width - PADDING.left - PADDING.right;
  const innerH = height - PADDING.top - PADDING.bottom;

  const xDomain = useMemo(() => {
    const min = log10(SIZE_STEPS[0]);
    const max = log10(SIZE_STEPS[SIZE_STEPS.length - 1]);
    return [min, max] as const;
  }, []);

  const yDomain = useMemo(() => {
    const maxObserved = points.length ? Math.max(...points.map((p) => p.timeMs)) : 1;
    const max = Math.max(1, maxObserved);
    return [0, log10(max * 1.3)] as const;
  }, [points]);

  const xScale = (size: number) =>
    PADDING.left + ((log10(size) - xDomain[0]) / (xDomain[1] - xDomain[0])) * innerW;

  const yScale = (ms: number) =>
    PADDING.top + innerH - (log10(Math.max(ms, 0.001)) / (yDomain[1] - yDomain[0] || 1)) * innerH;

  // Dashed theoretical reference curve, scaled to pass through the first measured point
  // so beginners can see how closely the *shape* of the real data tracks the Big-O class.
  const theoreticalPath = useMemo(() => {
    if (points.length === 0) return "";
    const anchor = points[0];
    const growth = (n: number): number => {
      switch (algo.timeClass) {
        case "logn":
          return Math.log2(Math.max(2, n));
        case "n":
          return n;
        case "nlogn":
          return n * Math.log2(Math.max(2, n));
        case "n2":
        default:
          return n * n;
      }
    };
    const scale = anchor.timeMs / Math.max(growth(anchor.size), 1e-9);
    const steps = 40;
    const [minLog, maxLog] = xDomain;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const logSize = minLog + (i / steps) * (maxLog - minLog);
      const size = Math.pow(10, logSize);
      const ms = growth(size) * scale;
      const x = xScale(size);
      const y = yScale(ms);
      d += `${i === 0 ? "M" : "L"} ${x} ${y} `;
    }
    return d;
  }, [points, algo, xDomain]);

  const sorted = [...points].sort((a, b) => a.size - b.size);
  const linePath = sorted
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.size)} ${yScale(p.timeMs)}`)
    .join(" ");

  // Gridlines / axis ticks at each canonical size step and at nice ms powers of ten.
  const yTicks = useMemo(() => {
    const [minLog, maxLog] = yDomain;
    const ticks: number[] = [];
    const startPow = Math.floor(minLog);
    const endPow = Math.ceil(maxLog);
    for (let p = startPow; p <= endPow; p++) ticks.push(Math.pow(10, p));
    return ticks;
  }, [yDomain]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      role="img"
      aria-label={`Chart of measured runtime versus input size for ${algo.name}`}
      style={{ overflow: "visible" }}
    >
      {/* Y gridlines + labels */}
      {yTicks.map((tickMs) => (
        <g key={tickMs}>
          <line
            x1={PADDING.left}
            x2={width - PADDING.right}
            y1={yScale(tickMs)}
            y2={yScale(tickMs)}
            stroke="var(--ifm-color-emphasis-200)"
            strokeWidth={1}
          />
          <text
            x={PADDING.left - 10}
            y={yScale(tickMs)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={11}
            fill="var(--ifm-color-emphasis-700)"
          >
            {tickMs >= 1000 ? `${(tickMs / 1000).toFixed(tickMs >= 10000 ? 0 : 1)}s` : `${tickMs}ms`}
          </text>
        </g>
      ))}

      {/* X ticks at each canonical size */}
      {SIZE_STEPS.map((size) => (
        <g key={size}>
          <line
            x1={xScale(size)}
            x2={xScale(size)}
            y1={PADDING.top}
            y2={height - PADDING.bottom}
            stroke="var(--ifm-color-emphasis-100)"
            strokeWidth={1}
          />
          <text
            x={xScale(size)}
            y={height - PADDING.bottom + 18}
            textAnchor="middle"
            fontSize={11}
            fill="var(--ifm-color-emphasis-700)"
          >
            {formatSize(size)}
          </text>
        </g>
      ))}

      {/* theoretical reference curve */}
      {theoreticalPath && (
        <path
          d={theoreticalPath}
          fill="none"
          stroke={algo.color}
          strokeWidth={1.5}
          strokeDasharray="5 5"
          opacity={0.45}
        />
      )}

      {/* measured line */}
      {linePath && <path d={linePath} fill="none" stroke={algo.color} strokeWidth={2.5} />}

      {/* measured points */}
      {sorted.map((p) => (
        <circle
          key={p.size}
          cx={xScale(p.size)}
          cy={yScale(p.timeMs)}
          r={5}
          fill={p.isEstimate ? "var(--ifm-background-color)" : algo.color}
          stroke={algo.color}
          strokeWidth={2}
        />
      ))}

      <text
        x={width - PADDING.right}
        y={PADDING.top - 4}
        textAnchor="end"
        fontSize={11}
        fill="var(--ifm-color-emphasis-600)"
      >
        dashed = theoretical {algo.timeComplexity} · hollow dot = estimated (timed out)
      </text>
    </svg>
  );
}
