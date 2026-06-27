import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@theme/Layout';
import { motion } from 'framer-motion';

const COMPLEXITIES = [
  { id: 'O(1)', label: 'O(1) - Constant', color: '#10b981', fn: (n: number) => 1 },
  { id: 'O(log n)', label: 'O(log n) - Logarithmic', color: '#3b82f6', fn: (n: number) => Math.log2(n || 1) },
  { id: 'O(n)', label: 'O(n) - Linear', color: '#eab308', fn: (n: number) => n },
  { id: 'O(n log n)', label: 'O(n log n) - Linearithmic', color: '#f97316', fn: (n: number) => n * Math.log2(n || 1) },
  { id: 'O(n^2)', label: 'O(n²) - Quadratic', color: '#ef4444', fn: (n: number) => n * n },
  { id: 'O(2^n)', label: 'O(2ⁿ) - Exponential', color: '#d946ef', fn: (n: number) => Math.pow(2, n) },
  { id: 'O(n!)', label: 'O(n!) - Factorial', color: '#8b5cf6', fn: (n: number) => {
      let res = 1;
      for (let i = 2; i <= Math.min(n, 170); i++) res *= i; // cap to avoid infinity too soon
      return res;
    } 
  },
];

export default function ComplexityVisualizer() {
  const [nValue, setNValue] = useState<number>(50);
  const [selected, setSelected] = useState<string[]>(['O(n)', 'O(n log n)', 'O(n^2)']);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSelection = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const chartWidth = 800;
  const chartHeight = 400;
  const padding = 40;

  const activeComplexities = COMPLEXITIES.filter(c => selected.includes(c.id));

  // Determine Max Y for scaling based on active complexities at N = nValue
  // For exponential and factorial, we might want to cap it so others don't look like flat lines if N is too large,
  // but it's also educational to see them squash everything else. 
  // Let's cap Y at a reasonable visual maximum relative to N if factorial/exponential is checked and N is large,
  // or just use the true max and let it squash. We'll use the true max for accuracy, but cap it at a high number if it gets insane.
  const maxY = useMemo(() => {
    if (activeComplexities.length === 0) return 100;
    let maxVal = 0;
    for (const c of activeComplexities) {
      const val = c.fn(nValue);
      if (val > maxVal) maxVal = val;
    }
    // If it's infinity or too large, cap it so the browser doesn't break rendering
    return Math.min(maxVal, 1e6);
  }, [activeComplexities, nValue]);

  const generatePath = (fn: (n: number) => number) => {
    const points = [];
    const steps = 50; // smooth curve
    for (let i = 0; i <= steps; i++) {
      const currentN = (i / steps) * nValue;
      const x = padding + (i / steps) * (chartWidth - 2 * padding);
      
      let yVal = fn(currentN);
      if (yVal > maxY) yVal = maxY; // Clip to max Y

      const y = chartHeight - padding - (yVal / maxY) * (chartHeight - 2 * padding);
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  if (!isClient) return null;

  return (
    <Layout title="Time Complexity Visualizer" description="Interactive Big-O time complexity visualization">
      <main className="container margin-vert--xl">
        <div className="text-center margin-bottom--lg">
          <h1 className="text-4xl font-bold">Time Complexity Visualizer</h1>
          <p className="text-xl opacity-80">Interactive Big-O chart to understand algorithm scalability</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          
          <div className="card shadow--lw padding--md" style={{ flex: '1', minWidth: '300px' }}>
            <h3 className="margin-bottom--md">Settings</h3>
            
            <div className="margin-bottom--lg">
              <label className="font-bold block margin-bottom--sm">
                Dataset Size (N): {nValue}
              </label>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={nValue} 
                onChange={(e) => setNValue(Number(e.target.value))}
                className="w-full"
                style={{ cursor: 'pointer' }}
              />
            </div>

            <div>
              <label className="font-bold block margin-bottom--sm">Complexities to Compare</label>
              <div className="flex flex-col gap-2">
                {COMPLEXITIES.map(c => (
                  <label key={c.id} className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={selected.includes(c.id)}
                      onChange={() => toggleSelection(c.id)}
                      style={{ accentColor: c.color, width: '18px', height: '18px' }}
                    />
                    <span style={{ color: c.color, fontWeight: 'bold' }}>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="card shadow--lw padding--md overflow-hidden" style={{ flex: '2', width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: '600px', display: 'flex', justifyContent: 'center' }}>
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="auto" style={{ maxWidth: '800px', background: 'var(--ifm-background-surface-color)' }}>
                {/* Grid Lines */}
                <g stroke="var(--ifm-color-emphasis-200)" strokeWidth="1" strokeDasharray="4 4">
                  {[...Array(6)].map((_, i) => {
                    const y = padding + (i / 5) * (chartHeight - 2 * padding);
                    return <line key={`h-${i}`} x1={padding} y1={y} x2={chartWidth - padding} y2={y} />;
                  })}
                  {[...Array(6)].map((_, i) => {
                    const x = padding + (i / 5) * (chartWidth - 2 * padding);
                    return <line key={`v-${i}`} x1={x} y1={padding} x2={x} y2={chartHeight - padding} />;
                  })}
                </g>

                {/* Axes */}
                <g stroke="var(--ifm-font-color-base)" strokeWidth="2">
                  <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} />
                  <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} />
                </g>

                {/* Labels */}
                <text x={chartWidth / 2} y={chartHeight - 5} fill="var(--ifm-font-color-base)" textAnchor="middle" fontSize="14">
                  Dataset Size (N)
                </text>
                <text x={15} y={chartHeight / 2} fill="var(--ifm-font-color-base)" textAnchor="middle" fontSize="14" transform={`rotate(-90 15 ${chartHeight / 2})`}>
                  Operations (Time)
                </text>
                <text x={chartWidth - padding} y={chartHeight - padding + 20} fill="var(--ifm-font-color-base)" textAnchor="middle" fontSize="12">
                  {nValue}
                </text>

                {/* Paths */}
                {activeComplexities.map(c => (
                  <motion.path
                    key={c.id}
                    d={generatePath(c.fn)}
                    fill="none"
                    stroke={c.color}
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
