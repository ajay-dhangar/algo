/**
 * Company Interview Tracks
 * 
 * Curated, ordered sequences of DSA problems organized by company interview patterns.
 * These tracks serve as structured learning paths for interview preparation, ordered by:
 * 1. Prerequisite dependencies (concepts that must be learned first)
 * 2. Difficulty progression (easy → medium → hard)
 * 3. Frequency in actual interviews
 * 4. Problem novelty (unique patterns not covered by earlier problems)
 * 
 * Each track is intentionally focused and finite to maintain clarity and achievability.
 * Users can supplement with the general problem browser for additional practice.
 */

export interface CompanyTrack {
  /** Unique company identifier (lowercase, no spaces) */
  id: string;
  /** Display name of the company */
  name: string;
  /** Marketing tagline for the track */
  tagline: string;
  /** Detailed description of the track focus */
  description: string;
  /** Company logo or emoji for visual identity */
  icon: string;
  /** Ordered list of problem IDs in this track */
  problemIds: string[];
  /** Estimated hours to complete this track */
  estimatedHours: number;
  /** Color theme for the track (for UI differentiation) */
  color: 'blue' | 'purple' | 'amber' | 'rose' | 'emerald' | 'cyan' | 'indigo' | 'pink';
  /** Featured/highlighted tracks show at the top */
  featured?: boolean;
}

/**
 * Master list of company interview tracks.
 * Problem IDs match indexed problems in docs/dsa-problems/{easy,medium,hard}/*.mdx
 */
export const COMPANY_TRACKS: CompanyTrack[] = [
  {
    id: 'google',
    name: 'Google Interview Track',
    tagline: 'Master problem-solving at scale',
    description:
      'Google interviews emphasize algorithmic thinking and scalable solutions. This track focuses on arrays, strings, trees, graphs, and dynamic programming—the core patterns in Google interview questions.',
    icon: '🔍',
    color: 'blue',
    featured: true,
    estimatedHours: 32,
    problemIds: [
      'contains-duplicate-leetcode-217',
      'two-sum-problem',
      'check-palindrome',
      'longest-substring-without-repeated-characters-problem',
      'merge-intervals-problem',
      'maximum-depth-of-binary-tree',
      'diameter-of-binary-tree',
      'binary-tree-right-side-view',
      'lowest-common-ancestor',
      'number-of-islands',
      'flood-fill',
      'number-of-provinces',
      'house-robber-algorithm',
      'unique-paths',
      'partition-equal-subset-sum',
      'word-search',
      'sliding-window-maximum',
      'largest-rectangle-in-histogram',
      'maximal-rectangle',
    ],
  },

  {
    id: 'meta',
    name: 'Meta Interview Track',
    tagline: 'Build fast, think big, scale it',
    description:
      'Meta (Facebook) interviews reward clarity and iteration. This track emphasizes string/array manipulation, linked lists, tree traversals, and graph algorithms where multiple approaches exist.',
    icon: '📘',
    color: 'purple',
    featured: true,
    estimatedHours: 28,
    problemIds: [
      'two-sum-problem',
      'reverse-linked-list',
      'linked-list-cycle',
      'palindrome-linked-list-problem',
      'odd-even-linked-list',
      'add-two-numbers-as-linked-lists',
      'clone-linked-list-with-random-and-next-pointer',
      'longest-substring-without-repeated-characters-problem',
      'merge-intervals-problem',
      'symmetric-tree',
      'lowest-common-ancestor',
      'number-of-islands',
      'rotten-oranges',
      'surrounded-regions',
      'house-robber-ii',
      'vertical-order-traversal-of-a-binary-tree',
      'n-queens',
    ],
  },

  {
    id: 'amazon',
    name: 'Amazon Interview Track',
    tagline: 'Data structures and scale go hand-in-hand',
    description:
      'Amazon interviews heavily emphasize data structures, heaps, and optimization. This track covers linked lists, graphs, sliding windows, and dynamic programming with a focus on real-world use cases.',
    icon: '📦',
    color: 'amber',
    featured: true,
    estimatedHours: 30,
    problemIds: [
      'contains-duplicate-leetcode-217',
      'two-sum-problem',
      'reverse-linked-list',
      'intersection-of-two-linked-lists',
      'longest-substring-without-repeated-characters-problem',
      'merge-intervals-problem',
      'house-robber-algorithm',
      'combination-sum',
      'size-of-largest-bst-in-binary-tree',
      'number-of-islands',
      'cheapest-flights-within-k-stops',
      'path-with-minimum-effort',
      'sliding-window-maximum',
      'merge-k-sorted-arrays',
      'largest-rectangle-in-histogram',
      'word-ladder',
    ],
  },

  {
    id: 'microsoft',
    name: 'Microsoft Interview Track',
    tagline: 'Enterprise-grade problem solving',
    description:
      'Microsoft interviews test both algorithmic depth and practical engineering sense. This track balances classic DSA (arrays, strings, bitwise logic, trees, graphs) with production-ready problem solving.',
    icon: '🪟',
    color: 'cyan',
    featured: false,
    estimatedHours: 28,
    problemIds: [
      'two-sum-problem',
      'reverse-linked-list',
      'maximum-depth-of-binary-tree',
      'symmetric-tree',
      'Reverse Bits',
      'plus-one',
      'removing-stars-from-string',
      'valid-parenthesis-string',
      'longest-substring-without-repeated-characters-problem',
      'binary-tree-right-side-view',
      'lowest-common-ancestor',
      'number-of-provinces',
      'number-of-operations-to-make-network-connected',
      'house-robber-algorithm',
      'unique-paths',
      'subarrays-with-k-different-integers',
      'word-ladder',
    ],
  },

  {
    id: 'apple',
    name: 'Apple Interview Track',
    tagline: 'Elegant solutions, polished thinking',
    description:
      'Apple interviews value clear, elegant solutions and deep understanding of fundamentals. This track emphasizes trees, math, binary search, and edge-case handling.',
    icon: '🍎',
    color: 'rose',
    featured: false,
    estimatedHours: 24,
    problemIds: [
      'contains-duplicate-leetcode-217',
      'check-palindrome',
      'date-to-binary-conversion',
      'maximum-depth-of-binary-tree',
      'diameter-of-binary-tree',
      'symmetric-tree',
      'cousins-in-binary-tree',
      'reverse-integer',
      'find-a-peak-element-ii',
      'sum-of-subarray-ranges',
      'triangle',
      'word-search',
      'transform-to-chessboard',
    ],
  },

  {
    id: 'netflix',
    name: 'Netflix Interview Track',
    tagline: 'Stream-of-consciousness problem solving',
    description:
      'Netflix interviews focus on practical algorithms and data structure choices that matter at scale. This track emphasizes array optimization, graph BFS/DFS, and dynamic programming.',
    icon: '🎬',
    color: 'rose',
    featured: false,
    estimatedHours: 22,
    problemIds: [
      'contains-duplicate-leetcode-217',
      'two-sum-problem',
      'left-and-right-sum-differences',
      'longest-substring-without-repeated-characters-problem',
      'maximum-points-you-can-obtain-from-cards',
      'number-of-islands',
      'rotten-oranges',
      'find-eventual-safe-states',
      'house-robber-algorithm',
      'unique-paths',
      'sliding-window-maximum',
    ],
  },

  {
    id: 'linkedin',
    name: 'LinkedIn Interview Track',
    tagline: 'Professional graph algorithms and more',
    description:
      'LinkedIn interviews emphasize graphs, linked lists, and practical algorithm design. This track covers linked lists and graph connectivity crucial for social network architectures.',
    icon: '💼',
    color: 'indigo',
    featured: false,
    estimatedHours: 24,
    problemIds: [
      'reverse-linked-list',
      'linked-list-cycle',
      'loop-in-a-linked-list',
      'delete-middle-node-of-a-linked-list',
      'flattening-a-linked-list',
      'clone-linked-list-with-random-and-next-pointer',
      'longest-substring-without-repeated-characters-problem',
      'number-of-islands',
      'number-of-provinces',
      'surrounded-regions',
      'house-robber-algorithm',
      'word-ladder',
    ],
  },

  {
    id: 'startup',
    name: 'Fast-Track Interview Bundle',
    tagline: 'Get interview-ready in 35 hours',
    description:
      'A streamlined curriculum for technical interviews across top tech companies. This track covers essential DSA patterns: arrays, linked lists, trees, graphs, and dynamic programming.',
    icon: '🚀',
    color: 'emerald',
    featured: true,
    estimatedHours: 35,
    problemIds: [
      'two-sum-problem',
      'contains-duplicate-leetcode-217',
      'check-palindrome',
      'reverse-linked-list',
      'linked-list-cycle',
      'maximum-depth-of-binary-tree',
      'longest-substring-without-repeated-characters-problem',
      'merge-intervals-problem',
      'add-two-numbers-as-linked-lists',
      'binary-tree-right-side-view',
      'lowest-common-ancestor',
      'number-of-islands',
      'rotten-oranges',
      'house-robber-algorithm',
      'unique-paths',
      'partition-equal-subset-sum',
      'word-search',
      'sliding-window-maximum',
      'largest-rectangle-in-histogram',
      'n-queens',
    ],
  },
];

export const getTrackById = (id: string): CompanyTrack | undefined => {
  return COMPANY_TRACKS.find((track) => track.id === id);
};

export const getFeaturedTracks = (): CompanyTrack[] => {
  return COMPANY_TRACKS.filter((track) => track.featured).sort((a, b) => a.name.localeCompare(b.name));
};

export const getAllTracks = (): CompanyTrack[] => {
  return [...COMPANY_TRACKS].sort((a, b) => {
    // Featured first, then by name
    if (a.featured !== b.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return a.name.localeCompare(b.name);
  });
};
