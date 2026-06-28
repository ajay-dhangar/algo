import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@theme/Layout';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const COMPLEXITIES = [
  { id: 'O(1)', label: ' - Constant', math: 'O(1)', color: '#10b981', fn: (n: number) => 1 },
  { id: 'O(log n)', label: ' - Logarithmic', math: 'O(\\log n)', color: '#3b82f6', fn: (n: number) => Math.log2(n || 1) },
  { id: 'O(n)', label: ' - Linear', math: 'O(n)', color: '#eab308', fn: (n: number) => n },
  { id: 'O(n log n)', label: ' - Linearithmic', math: 'O(n \\log n)', color: '#f97316', fn: (n: number) => n * Math.log2(n || 1) },
  { id: 'O(n^2)', label: ' - Quadratic', math: 'O(n^2)', color: '#ef4444', fn: (n: number) => n * n },
  { id: 'O(2^n)', label: ' - Exponential', math: 'O(2^n)', color: '#d946ef', fn: (n: number) => Math.pow(2, n) },
  { id: 'O(n!)', label: ' - Factorial', math: 'O(n!)', color: '#8b5cf6', fn: (n: number) => {
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
  const padding = 50;

  const activeComplexities = COMPLEXITIES.filter(c => selected.includes(c.id));
  const maxY = useMemo(() => {
    if (activeComplexities.length === 0) return 100;
    let maxVal = 0;
    for (const c of activeComplexities) {
      const val = c.fn(nValue);
      if (val > maxVal) maxVal = val;
    }
    // If it's infinity or too large, cap it so the browser doesn't break rendering
    // Ensure maxY is at least 1 to avoid division by zero when maxVal is 0
    return Math.max(1, Math.min(maxVal, 1e6));
  }, [activeComplexities, nValue]);

  const generatePath = (fn: (n: number) => number) => {
    const points = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const currentN = (i / steps) * nValue;
      const x = padding + (i / steps) * (chartWidth - 2 * padding);
      
      let yVal = fn(currentN);
      if (yVal > maxY) yVal = maxY;

      const y = chartHeight - padding - (yVal / maxY) * (chartHeight - 2 * padding);
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  if (!isClient) return null;

  return (
    <Layout title="Time Complexity Visualizer" description="Interactive Big-O time complexity visualization">
      <main className="container margin-vert--xl" style={{ maxWidth: '1200px' }}>
        
        <div className="text--center margin-bottom--xl">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Time Complexity Visualizer</h1>
          <p className="text--muted" style={{ fontSize: '1.2rem' }}>Interactive Big-O chart to evaluate algorithmic scaling behaviors</p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* Settings Sub-Module Console */}
          <div className="card shadow--md padding--md" style={{ flex: '1 1 320px', borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)' }}>
            <h3 className="margin-bottom--md" style={{ borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: '0.5rem' }}>
              Control Station
            </h3>
            
            <div className="margin-bottom--lg">
              <label className="font-code small text--uppercase text--muted" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Dataset Footprint Scale (N): <span className="text--primary" style={{ fontSize: '1.1rem' }}>{nValue}</span>
              </label>
              <input 
                type="range" 
                min="2" 
                max="100" 
                value={nValue} 
                onChange={(e) => setNValue(Number(e.target.value))}
                style={{ cursor: 'pointer', width: '100%', display: 'block' }}
              />
            </div>

            <div>
              <label className="font-code small text--uppercase text--muted" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 'bold' }}>
                Algorithmic Complexities
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {COMPLEXITIES.map(c => (
                  <label 
                    key={c.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      cursor: 'pointer',
                      userSelect: 'none',
                      padding: '0.35rem 0.5rem',
                      borderRadius: '6px',
                      backgroundColor: selected.includes(c.id) ? 'var(--ifm-color-emphasis-100)' : 'transparent',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={selected.includes(c.id)}
                      onChange={() => toggleSelection(c.id)}
                      style={{ accentColor: c.color, width: '18px', height: '18px', margin: 0, cursor: 'pointer' }}
                    />
                    <span style={{ color: c.color, fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <InlineMath math={c.math} />
                      <span style={{ fontWeight: 'normal', opacity: 0.85, fontSize: '0.85rem' }}>{c.label}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SVG Data Visualization Viewport */}
          <div className="card shadow--md padding--md" style={{ flex: '2 1 600px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--ifm-color-emphasis-200)' }}>
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                width="100%" 
                height="auto" 
                style={{ display: 'block', minWidth: '600px', background: 'var(--ifm-background-surface-color)' }}
              >
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

                <g stroke="var(--ifm-font-color-base)" strokeWidth="2" strokeLinecap="round">
                  <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} />
                  <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} />
                </g>

                <text x={chartWidth / 2} y={chartHeight - 10} fill="var(--ifm-font-color-base)" textAnchor="middle" fontWeight="600" fontSize="13">
                  Elements Input Volume (N)
                </text>
                <text x={18} y={chartHeight / 2} fill="var(--ifm-font-color-base)" textAnchor="middle" fontWeight="600" fontSize="13" transform={`rotate(-90 18 ${chartHeight / 2})`}>
                  Operational Run Overhead (Time)
                </text>
                <text x={chartWidth - padding} y={chartHeight - padding + 22} fill="var(--ifm-color-primary)" fontWeight="700" textAnchor="middle" fontSize="12" className="font-code">
                  N={nValue}
                </text>
                <text x={padding - 12} y={padding + 4} fill="var(--ifm-font-color-base)" textAnchor="end" fontSize="11" className="font-code text--muted">
                  {maxY >= 1e6 ? '1M+' : Math.round(maxY).toLocaleString()}
                </text>

                {activeComplexities.map(c => (
                  <motion.path
                    key={`${c.id}-${nValue}`}
                    d={generatePath(c.fn)}
                    fill="none"
                    stroke={c.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0.4 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
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
