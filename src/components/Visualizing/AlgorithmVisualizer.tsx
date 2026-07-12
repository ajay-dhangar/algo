import React, { useState, useEffect, useRef } from 'react';

import { AlgorithmType, Step } from './algorithms/types';
import { generateBubbleSortSteps } from './algorithms/bubbleSort';
import { generateBinarySearchSteps } from './algorithms/binarySearch';
import { generateBfsSteps, generateDfsSteps } from './algorithms/graphSearch';

export interface AlgorithmVisualizerProps {
  algorithm: AlgorithmType;
}

export default function AlgorithmVisualizer({ algorithm }: AlgorithmVisualizerProps) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms per step
  const timerRef = useRef<any>(null);

  // Generate steps for the selected algorithm
  useEffect(() => {
    generateSteps();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [algorithm]);

  // Handle autoplay (fixed React state-update anti-pattern)
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (currentStep >= steps.length - 1) {
        setIsPlaying(false);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, currentStep, steps.length]);

  const generateSteps = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    let newSteps: Step[] = [];

    if (algorithm === 'bubble-sort') {
      newSteps = generateBubbleSortSteps();
    } else if (algorithm === 'binary-search') {
      newSteps = generateBinarySearchSteps();
    } else if (algorithm === 'bfs') {
      newSteps = generateBfsSteps();
    } else if (algorithm === 'dfs') {
      newSteps = generateDfsSteps();
    }

    setSteps(newSteps);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const activeStep = steps[currentStep] || { description: '', variables: {} };

  return (
    <div
      style={{
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '12px',
        padding: '24px',
        margin: '24px 0',
        background: 'var(--ifm-card-background-color)',
        color: 'var(--ifm-font-color-base)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, textTransform: 'capitalize' }}>
          {algorithm.replace('-', ' ')} Visualizer
        </h3>
        <button
          onClick={handleReset}
          className="button button--secondary button--sm"
        >
          Reset
        </button>
      </div>

      {/* Main visualization area */}
      <div
        style={{
          minHeight: '220px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--ifm-color-emphasis-100)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        {/* Render arrays for Sorting / Binary Search (Fixed visual range bug) */}
        {(algorithm === 'bubble-sort' || algorithm === 'binary-search') && activeStep.array && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '150px' }}>
            {activeStep.array.map((value, idx) => {
              let bgColor = 'var(--ifm-color-primary)';
              const highlights = activeStep.highlights || {};

              if (algorithm === 'bubble-sort') {
                if (highlights.compared?.includes(idx)) {
                  bgColor = 'var(--ifm-color-warning)';
                } else if (highlights.active?.includes(idx)) {
                  bgColor = 'var(--ifm-color-danger)';
                } else if (highlights.sorted?.includes(idx)) {
                  bgColor = 'var(--ifm-color-success)';
                }
              } else if (algorithm === 'binary-search') {
                const low = highlights.low;
                const high = highlights.high;
                const mid = highlights.mid;
              } else if (algorithm === 'binary-search') {
                const hasRange = highlights.low !== undefined && highlights.high !== undefined;
                if (highlights.mid === idx) {
                  bgColor = 'var(--ifm-color-danger)';
                } else if (idx === highlights.low) {
                  bgColor = 'var(--ifm-color-warning)';
                } else if (idx === highlights.high) {
                  bgColor = 'var(--ifm-color-info)';
                } else if (hasRange && (idx < highlights.low! || idx > highlights.high!)) {
                  bgColor = 'var(--ifm-color-emphasis-400)';
                }
              }

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '45px',
                      height: algorithm === 'bubble-sort' ? `${value * 3}px` : '45px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: bgColor,
                      color: '#fff',
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {value}
                  </div>
                  <span style={{ fontSize: '0.8rem', marginTop: '6px', fontWeight: '500' }}>i={idx}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Render Graph for BFS/DFS with Edges and Structure Direction Labels */}
        {(algorithm === 'bfs' || algorithm === 'dfs') && activeStep.graphState && (
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '220px', height: '140px' }}>
              {/* SVG Edges Layer */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {/* 0 - 1 */}
                <line x1="38" y1="38" x2="118" y2="38" stroke="var(--ifm-color-emphasis-400)" strokeWidth="2" />
                {/* 0 - 3 */}
                <line x1="38" y1="38" x2="38" y2="118" stroke="var(--ifm-color-emphasis-400)" strokeWidth="2" />
                {/* 1 - 2 */}
                <line x1="118" y1="38" x2="198" y2="38" stroke="var(--ifm-color-emphasis-400)" strokeWidth="2" />
                {/* 1 - 4 */}
                <line x1="118" y1="38" x2="118" y2="118" stroke="var(--ifm-color-emphasis-400)" strokeWidth="2" />
                {/* 3 - 4 */}
                <line x1="38" y1="118" x2="118" y2="118" stroke="var(--ifm-color-emphasis-400)" strokeWidth="2" />
              </svg>

              {/* Nodes representing the Graph */}
              {[
                { id: 0, x: 20, y: 20 },
                { id: 1, x: 100, y: 20 },
                { id: 2, x: 180, y: 20 },
                { id: 3, x: 20, y: 100 },
                { id: 4, x: 100, y: 100 },
              ].map((node) => {
                const isVisited = activeStep.graphState?.visited.includes(node.id);
                const isActive = activeStep.graphState?.activeNode === node.id;
                let bgColor = 'var(--ifm-color-emphasis-300)';
                if (isActive) {
                  bgColor = 'var(--ifm-color-danger)';
                } else if (isVisited) {
                  bgColor = 'var(--ifm-color-success)';
                }

                return (
                  <div
                    key={node.id}
                    style={{
                      position: 'absolute',
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: bgColor,
                      color: '#fff',
                      fontWeight: 'bold',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      border: isActive ? '3px solid var(--ifm-color-warning)' : 'none',
                    }}
                  >
                    {node.id}
                  </div>
                );
              })}
            </div>
            {/* Queue/Stack State Visualizer with directional labels */}
            <div style={{ borderLeft: '2px solid var(--ifm-color-emphasis-300)', paddingLeft: '20px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {algorithm === 'bfs' ? 'Queue (FIFO):' : 'Stack (LIFO):'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {algorithm === 'bfs' && activeStep.graphState.structure.length > 0 && (
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--ifm-color-danger)' }}>Front &larr;</span>
                )}
                {algorithm === 'dfs' && activeStep.graphState.structure.length > 0 && (
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--ifm-color-danger)' }}>Top &rarr;</span>
                )}
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  {activeStep.graphState.structure.length === 0 ? (
                    <span style={{ fontStyle: 'italic', color: 'var(--ifm-color-emphasis-600)' }}>Empty</span>
                  ) : (
                    activeStep.graphState.structure.map((val, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: 'var(--ifm-color-primary)',
                          color: '#fff',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                        }}
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>

                {algorithm === 'bfs' && activeStep.graphState.structure.length > 0 && (
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--ifm-color-success)' }}>&larr; Back</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Description text */}
      <div
        style={{
          padding: '16px',
          backgroundColor: 'var(--ifm-color-emphasis-200)',
          borderRadius: '8px',
          marginBottom: '20px',
          fontWeight: '500',
          lineHeight: '1.5',
        }}
      >
        {activeStep.description}
      </div>

      {/* Control panel */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleStepBackward}
            disabled={currentStep === 0}
            className="button button--outline button--primary"
          >
            ⏮️ Step Back
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`button ${isPlaying ? 'button--warning' : 'button--success'}`}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button
            onClick={handleStepForward}
            disabled={currentStep === steps.length - 1}
            className="button button--outline button--primary"
          >
            Step Forward ⏭️
          </button>
        </div>

        {/* Speed slider & Step indicators */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Speed:</label>
            <input
              type="range"
              min="300"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
            Step: {currentStep + 1} / {steps.length}
          </div>
        </div>
      </div>

      {/* Variables Panel */}
      <div
        style={{
          marginTop: '20px',
          padding: '16px',
          border: '1px dashed var(--ifm-color-emphasis-400)',
          borderRadius: '8px',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '0.95rem' }}>📟 State Variables</div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {Object.entries(activeStep.variables).map(([name, val]) => (
            <div key={name} style={{ display: 'flex', gap: '6px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--ifm-color-primary)', fontWeight: 'bold' }}>{name}:</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{String(val)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
