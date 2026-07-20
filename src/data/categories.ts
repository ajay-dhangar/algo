import { 
  Binary, Share2, Layers3, FolderTree, Braces, BrainCircuit, Repeat, Search,
  Crown, Cpu, BarChart2, LayoutGrid, Building2
} from 'lucide-react';
import React from 'react';


export type VisCategory = {
  title: string;
  description: string;
  to: string;
  Icon: React.ComponentType<{ className?: string }>; 
  colorClass: {
    iconBg: string;
    iconText: string;
    glow: string;
    badge: string;
  };
  featured?: boolean;
  implemented?: boolean;
};

export const categories: VisCategory[] = [
  {
    title: 'Sorting Algorithms',
    description: 'Bubble, Merge, Quick, Insertion, Selection and more. Watch elements rearrange into perfect order.',
    to: '/visualization/sorting',
    Icon: Binary,
    featured: true,
    implemented: false,
    colorClass: {
      iconBg: 'bg-teal-500/10 border-teal-500/20',
      iconText: 'text-teal-600 dark:text-teal-400',
      glow: 'hover:shadow-teal-500/5 hover:border-teal-500/30',
      badge: 'bg-teal-500/10 text-teal-600 dark:text-teal-300 border-teal-500/20'
    },
  },
  {
    title: 'Graph & Pathfinding',
    description: 'Dijkstra, BFS, DFS, A*, Bellman-Ford. Watch pathfinders navigate complex grids and discover shortest paths.',
    to: '/visualization/graphs',
    Icon: Share2,
    colorClass: {
      iconBg: 'bg-sky-500/10 border-sky-500/20',
      iconText: 'text-sky-600 dark:text-sky-400',
      glow: 'hover:shadow-sky-500/5 hover:border-sky-500/30',
      badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-300 border-sky-500/20'
    },
  },
  {
    title: 'Searching Algorithms',
    description: 'Linear, Binary Search, Sliding Window, and Aho-Corasick. Visualize step-by-step target findings.',
    to: '/visualization/searching',
    Icon: Search,
    colorClass: {
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      iconText: 'text-emerald-600 dark:text-emerald-400',
      glow: 'hover:shadow-emerald-500/5 hover:border-emerald-500/30',
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20'
    },
  },
  {
    title: 'Tree Structures',
    description: 'BST, AVL, Red-Black Trees, and Tries. Watch nodes branch, balance, recolor, and flow.',
    to: '/visualization/trees',
    Icon: FolderTree,
    colorClass: {
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      iconText: 'text-amber-600 dark:text-amber-400',
      glow: 'hover:shadow-amber-500/5 hover:border-amber-500/30',
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20'
    },
  },
  {
    title: 'Linked Lists',
    description: 'Singly, Doubly, and Circular lists. Watch pointers update and nodes connect dynamically.',
    to: '/visualization/linked-lists',
    Icon: Layers3,
    implemented: false,
    colorClass: {
      iconBg: 'bg-fuchsia-500/10 border-fuchsia-500/20',
      iconText: 'text-fuchsia-600 dark:text-fuchsia-400',
      glow: 'hover:shadow-fuchsia-500/5 hover:border-fuchsia-500/30',
      badge: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-500/20'
    },
  },
  {
    title: 'Recursion & Backtracking',
    description: 'See function calls stack up and backtrack. Visualize Fibonacci, N-Queens, and Sudoku solvers.',
    to: '/visualization/recursion',
    Icon: Repeat,
    colorClass: {
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      iconText: 'text-rose-600 dark:text-rose-400',
      glow: 'hover:shadow-rose-500/5 hover:border-rose-500/30',
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/20'
    },
  },
  {
    title: 'Data Structures',
    description: 'Stacks, Queues, Hash Tables, and Tries. Watch elements push, pop, enqueue, and hash in real-time.',
    to: '/visualization/data-structures',
    Icon: Braces,
    implemented: false,
    colorClass: {
      iconBg: 'bg-slate-500/10 border-slate-500/20',
      iconText: 'text-slate-600 dark:text-slate-400',
      glow: 'hover:shadow-slate-500/5 hover:border-slate-500/30',
      badge: 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-500/20'
    },
  },
  {
    title: 'Dynamic Programming',
    description: 'Memoization and Tabulation. Watch optimal sub-problems solve complex algorithms efficiently.',
    to: '/visualization/dynamic-programming',
    Icon: BrainCircuit,
    colorClass: {
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
      iconText: 'text-indigo-600 dark:text-indigo-400',
      glow: 'hover:shadow-indigo-500/5 hover:border-indigo-500/30',
      badge: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border-indigo-500/20'
    },
  },
  {
    title: 'N-Queens Problem',
    description: 'Watch the backtracking algorithm place queens, detect row/column/diagonal conflicts, and unwind step-by-step until all solutions are found.',
    to: '/n-queens-visualizer',
    Icon: Crown,
    implemented: true,
    colorClass: {
      iconBg: 'bg-violet-500/10 border-violet-500/20',
      iconText: 'text-violet-600 dark:text-violet-400',
      glow: 'hover:shadow-violet-500/5 hover:border-violet-500/30',
      badge: 'bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/20'
    },
  },
  {
    title: 'Backtracking & Grid Solver',
    description: 'Animate N-Queens placement and Sudoku solving. See conflicts flash red and the recursion physically backtrack on dead ends.',
    to: '/backtracking-visualizer',
    Icon: Repeat,
    implemented: true,
    colorClass: {
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      iconText: 'text-rose-600 dark:text-rose-400',
      glow: 'hover:shadow-rose-500/5 hover:border-rose-500/30',
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/20'
    },
  },
  {
    title: 'Bitwise Operations',
    description: 'Interactive bit-manipulation playground. Watch AND, OR, XOR, NOT, and shift operations transform binary representations in real-time.',
    to: '/bitwise-visualizer',
    Icon: Cpu,
    implemented: true,
    colorClass: {
      iconBg: 'bg-green-500/10 border-green-500/20',
      iconText: 'text-green-600 dark:text-green-400',
      glow: 'hover:shadow-green-500/5 hover:border-green-500/30',
      badge: 'bg-green-500/10 text-green-600 dark:text-green-300 border-green-500/20'
    },
  },
  {
    title: 'Largest Rectangle in Histogram',
    description: 'See a monotonic stack expand and contract as bars are processed, revealing the maximum rectangular area under the histogram.',
    to: '/largest-rectangle-visualizer',
    Icon: BarChart2,
    implemented: true,
    colorClass: {
      iconBg: 'bg-orange-500/10 border-orange-500/20',
      iconText: 'text-orange-600 dark:text-orange-400',
      glow: 'hover:shadow-orange-500/5 hover:border-orange-500/30',
      badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/20'
    },
  },
  {
    title: 'Maximal Rectangle (Matrix)',
    description: 'Watch each row of a binary matrix become a histogram, then apply the stack-based rectangle algorithm to find the maximum all-ones sub-rectangle.',
    to: '/maximal-rectangle-visualizer',
    Icon: LayoutGrid,
    implemented: true,
    colorClass: {
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      iconText: 'text-cyan-600 dark:text-cyan-400',
      glow: 'hover:shadow-cyan-500/5 hover:border-cyan-500/30',
      badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/20'
    },
  },
  {
    title: 'Maximum Building Height',
    description: 'Visualize the two-pass greedy sweep that computes the tallest possible height for each building given a set of height restrictions.',
    to: '/maximum-building-height-visualizer',
    Icon: Building2,
    implemented: true,
    colorClass: {
      iconBg: 'bg-blue-500/10 border-blue-500/20',
      iconText: 'text-blue-600 dark:text-blue-400',
      glow: 'hover:shadow-blue-500/5 hover:border-blue-500/30',
      badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20'
    },
  },
];