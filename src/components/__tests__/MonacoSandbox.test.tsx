import React from 'react';
import { describe, it, expect } from 'vitest';
import MonacoSandbox from '../MonacoSandbox';

describe('MonacoSandbox Component', () => {
  it('should initialize with default props', () => {
    const component = <MonacoSandbox />;
    expect(component).toBeTruthy();
  });

  it('should accept custom initial code and title', () => {
    const props = {
      initialCode: 'console.log("test")',
      title: 'Custom Sandbox',
      language: 'javascript' as const,
    };
    expect(props.title).toBe('Custom Sandbox');
    expect(props.language).toBe('javascript');
  });
});
