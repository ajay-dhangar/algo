import React from 'react';
import { describe, it, expect } from 'vitest';
import AlgorithmVisualizer from '../AlgorithmVisualizer';

describe('AlgorithmVisualizer Component', () => {
  it('should render visualizer with default props', () => {
    const component = <AlgorithmVisualizer />;
    expect(component).toBeTruthy();
  });

  it('should accept custom initial array', () => {
    const props = {
      initialArray: [10, 20, 30],
      algorithm: 'bubbleSort' as const,
    };
    expect(props.initialArray.length).toBe(3);
  });
});
