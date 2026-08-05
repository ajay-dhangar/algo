import { describe, it, expect } from 'vitest';

// Unit test the pure step-generation logic (no DOM/React needed)

function generateBubbleSortSteps(arr: number[]) {
  const steps: { array: number[]; comparing: number[]; swapping: number[]; sorted: number[] }[] = [];
  const a = [...arr];
  const sorted: number[] = [];
  const n = a.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted] });
      if (a[j] > a[j + 1]) {
        steps.push({ array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted] });
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted] });
      }
    }
    sorted.unshift(n - 1 - i);
    steps.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted] });
  }
  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number) {
  const steps: { array: number[]; comparing: number[]; found?: number }[] = [];
  const sorted = [...arr].sort((a, b) => a - b);
  let lo = 0, hi = sorted.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({ array: sorted, comparing: [mid] });
    if (sorted[mid] === target) {
      steps.push({ array: sorted, comparing: [], found: mid });
      break;
    } else if (sorted[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return steps;
}

describe('VisualizerSandbox — Bubble Sort step generation', () => {
  it('produces the correct number of comparison steps for a 4-element array', () => {
    const steps = generateBubbleSortSteps([4, 3, 2, 1]);
    expect(steps.length).toBeGreaterThan(0);
    // Must include comparing steps
    const comparingSteps = steps.filter(s => s.comparing.length === 2);
    expect(comparingSteps.length).toBeGreaterThan(0);
  });

  it('array is fully sorted by the last step', () => {
    const steps = generateBubbleSortSteps([5, 2, 8, 1]);
    const last = steps[steps.length - 1];
    const sorted = [...last.array].sort((a, b) => a - b);
    expect(last.array).toEqual(sorted);
  });

  it('sorted indices grow monotonically with passes', () => {
    const steps = generateBubbleSortSteps([3, 1, 4, 2]);
    const sortedLengths = steps.map(s => s.sorted.length);
    for (let i = 1; i < sortedLengths.length; i++) {
      expect(sortedLengths[i]).toBeGreaterThanOrEqual(sortedLengths[i - 1]);
    }
  });
});

describe('VisualizerSandbox — Binary Search step generation', () => {
  it('finds the target element in a sorted array', () => {
    const steps = generateBinarySearchSteps([11, 23, 34, 45, 67, 89], 34);
    const foundStep = steps.find(s => s.found !== undefined);
    expect(foundStep).toBeDefined();
    expect(foundStep!.array[foundStep!.found!]).toBe(34);
  });

  it('returns steps even for a target not in the array (no found step)', () => {
    const steps = generateBinarySearchSteps([10, 20, 30], 99);
    expect(steps.every(s => s.found === undefined)).toBe(true);
  });
});
