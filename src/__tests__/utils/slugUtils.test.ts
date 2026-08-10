import { toCanonicalSlug, slugify, getCanonicalAlgoKey } from '../../utils/slugUtils';

describe('slugUtils', () => {
  describe('toCanonicalSlug', () => {
    it('returns empty string for empty or nullish values', () => {
      expect(toCanonicalSlug('')).toBe('');
      expect(toCanonicalSlug('   ')).toBe('');
    });

    it('converts titles, IDs, and symbols into clean canonical slugs', () => {
      expect(toCanonicalSlug('Binary Search')).toBe('binary-search');
      expect(toCanonicalSlug('Implement Bubble Sort')).toBe('bubble-sort');
      expect(toCanonicalSlug('Quiz on Binary Search Tree')).toBe('binary-search-tree');
      expect(toCanonicalSlug("Dijkstra's Algorithm!")).toBe('dijkstras-algorithm');
      expect(toCanonicalSlug('Depth-First Search (DFS)')).toBe('depth-first-search-dfs');
    });

    it('strips accents and special diacritics', () => {
      expect(toCanonicalSlug('Café Algorithmique')).toBe('cafe-algorithmique');
    });
  });

  describe('slugify', () => {
    it('returns fallback when string is empty or invalid', () => {
      expect(slugify('', 'custom-fallback')).toBe('custom-fallback');
      expect(slugify('   ', 'fallback')).toBe('fallback');
    });

    it('returns slugified string when valid', () => {
      expect(slugify('My Great Quiz')).toBe('my-great-quiz');
    });
  });

  describe('getCanonicalAlgoKey', () => {
    it('resolves canonical AlgoKey from titles, IDs, and slugs', () => {
      expect(getCanonicalAlgoKey('binary-search')).toBe('Binary Search');
      expect(getCanonicalAlgoKey('so-01')).toBeNull(); // ID without slug/title
      expect(getCanonicalAlgoKey('Implement Bubble Sort')).toBe('Bubble Sort');
      expect(getCanonicalAlgoKey('dijkstra')).toBe('Dijkstra Algorithm');
      expect(getCanonicalAlgoKey("dijkstra's algorithm")).toBe('Dijkstra Algorithm');
      expect(getCanonicalAlgoKey('depth-first-search')).toBe('DFS');
      expect(getCanonicalAlgoKey('breadth-first-search')).toBe('BFS');
      expect(getCanonicalAlgoKey('linked-list')).toBe('Linked List');
      expect(getCanonicalAlgoKey('dynamic-programming')).toBe('Dynamic Programming');
    });

    it('resolves category fallback when title/id does not directly match', () => {
      expect(getCanonicalAlgoKey('Custom Unmatched Problem Title', 'sorting')).toBe('Quick Sort');
      expect(getCanonicalAlgoKey(null, 'graph')).toBe('Graphs');
      expect(getCanonicalAlgoKey(undefined, 'dp')).toBe('Dynamic Programming');
      expect(getCanonicalAlgoKey('', 'greedy')).toBe('Greedy Algorithms');
    });

    it('returns null when neither input nor category matches', () => {
      expect(getCanonicalAlgoKey('completely-unknown-topic-xyz', 'unknown-cat')).toBeNull();
    });
  });
});
