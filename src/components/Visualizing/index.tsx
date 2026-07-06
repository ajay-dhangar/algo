import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import type { AlgorithmType } from './algorithms/types';

interface AlgorithmVisualizerWrapperProps {
  algorithm: AlgorithmType;
}

/**
 * Client-only wrapper for AlgorithmVisualizer to prevent SSR issues during build.
 * The AlgorithmVisualizer uses browser-only APIs (timers, intervals) that are not
 * available during server-side rendering.
 */
export default function AlgorithmVisualizerWrapper({ algorithm }: AlgorithmVisualizerWrapperProps) {
  return (
    <BrowserOnly fallback={<div>Loading visualizer...</div>}>
      {() => {
        // Dynamic import only happens in the browser
        const AlgorithmVisualizer = require('./AlgorithmVisualizer').default;
        return <AlgorithmVisualizer algorithm={algorithm} />;
      }}
    </BrowserOnly>
  );
}
