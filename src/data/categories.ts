import { 
  Binary, Share2, Layers3, FolderTree, Braces, BrainCircuit, Repeat, Search 
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
];