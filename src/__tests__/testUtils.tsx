import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import { AriaAnnouncerProvider } from '../contexts/AriaAnnouncerContext';
import type { GraphChallenge } from '../data/graphChallengesData';
import type { SortingChallenge } from '../data/sortingChallengesData';
import type { DPChallenge } from '../data/dpChallengesData';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AriaAnnouncerProvider>{children}</AriaAnnouncerProvider>
    </AuthProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Mock Challenge Data Factories for Testing

export const mockGraphChallenge: GraphChallenge = {
  id: 'graph-test-01',
  title: 'Test Graph Representation',
  slug: 'test-graph-representation',
  difficulty: 'Easy',
  category: 'Graphs',
  timeLimit: '15 min',
  description: 'Build an adjacency list and matrix for graph nodes.',
  examples: [
    {
      input: 'n = 3, edges = [[0, 1], [1, 2]]',
      output: '[[1], [0, 2], [1]]',
      explanation: 'Node 0 is connected to 1; Node 1 is connected to 0 and 2.',
    },
  ],
  constraints: ['1 <= n <= 100', '0 <= edges.length <= 1000'],
  starterCode: `function buildGraph(n, edges) {\n  console.log("Graph initialized");\n  return [];\n}\nbuildGraph(3, [[0,1]]);`,
  testCases: [
    {
      input: '3, [[0,1], [1,2]]',
      expected: '[[1], [0, 2], [1]]',
      description: 'Standard 3-node linear graph',
    },
  ],
  timeComplexity: 'O(V + E) — Graph traversal time complexity',
  spaceComplexity: 'O(V + E) — Graph storage space complexity',
  hint: 'Use a 2D array or object map for adjacency list.',
  solution: `function buildGraph(n, edges) {\n  const adj = Array.from({ length: n }, () => []);\n  for (const [u, v] of edges) {\n    adj[u].push(v);\n    adj[v].push(u);\n  }\n  return adj;\n}`,
};

export const mockSortingChallenge: SortingChallenge = {
  id: 'sort-test-01',
  title: 'Test Bubble Sort',
  slug: 'test-bubble-sort',
  difficulty: 'Medium',
  category: 'Sorting',
  timeLimit: '15 min',
  description: 'Sort an array of integers using bubble sort.',
  examples: [
    {
      input: 'arr = [5, 2, 8, 1]',
      output: '[1, 2, 5, 8]',
      explanation: 'Elements are sorted in ascending order.',
    },
  ],
  constraints: ['1 <= arr.length <= 100', '-100 <= arr[i] <= 100'],
  starterCode: `function bubbleSort(arr) {\n  console.log("Sorting array");\n  return arr;\n}\nbubbleSort([5, 2, 8, 1]);`,
  testCases: [
    {
      input: '[5, 2, 8, 1]',
      expected: '[1, 2, 5, 8]',
      description: 'Unsorted array with positive numbers',
    },
  ],
  timeComplexity: 'O(N^2) — Quadratic time complexity',
  spaceComplexity: 'O(1) — Constant space complexity',
  hint: 'Compare adjacent elements and swap if left is greater than right.',
  solution: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - 1 - i; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}`,
};

export const mockDPChallenge: DPChallenge = {
  id: 'dp-test-01',
  title: 'Test Fibonacci DP',
  slug: 'test-fibonacci-dp',
  difficulty: 'Hard',
  category: 'DP',
  timeLimit: '10 min',
  description: 'Calculate the n-th Fibonacci number using dynamic programming.',
  examples: [
    {
      input: 'n = 5',
      output: '5',
      explanation: 'F(5) = F(4) + F(3) = 3 + 2 = 5.',
    },
  ],
  constraints: ['0 <= n <= 45'],
  starterCode: `function fib(n) {\n  console.log("Calculating fibonacci");\n  return n;\n}\nfib(5);`,
  testCases: [
    {
      input: 'n = 5',
      expected: '5',
      description: 'Fifth fibonacci term',
    },
  ],
  timeComplexity: 'O(N) — Linear time complexity',
  spaceComplexity: 'O(N) — Linear space complexity',
  hint: 'Use memoization or bottom-up tabulation to store subproblem results.',
  solution: `function fib(n) {\n  if (n <= 1) return n;\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}`,
};
