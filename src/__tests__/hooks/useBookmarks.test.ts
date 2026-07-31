/**
 * Tests for the useBookmarks hook.
 *
 * jsdom provides localStorage, so we can exercise the real persistence path.
 */
import { renderHook, act } from '@testing-library/react';
import { useBookmarks } from '../../hooks/useBookmarks';

const STORAGE_KEY = 'algo.dsa.bookmarks.v1';

beforeEach(() => {
  localStorage.clear();
});

describe('useBookmarks', () => {
  test('starts with an empty bookmark set', () => {
    const { result } = renderHook(() => useBookmarks());
    // After mount the effect fires synchronously in renderHook
    expect(result.current.bookmarks.size).toBe(0);
  });

  test('toggleBookmark adds an ID that was not present', () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.toggleBookmark('two-sum-problem');
    });

    expect(result.current.isBookmarked('two-sum-problem')).toBe(true);
    expect(result.current.bookmarks.size).toBe(1);
  });

  test('toggleBookmark removes an ID that was already bookmarked', () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.toggleBookmark('two-sum-problem');
    });
    act(() => {
      result.current.toggleBookmark('two-sum-problem');
    });

    expect(result.current.isBookmarked('two-sum-problem')).toBe(false);
    expect(result.current.bookmarks.size).toBe(0);
  });

  test('persists bookmarks to localStorage', () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.toggleBookmark('two-sum-problem');
      result.current.toggleBookmark('merge-intervals-problem');
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    expect(stored).toContain('two-sum-problem');
    expect(stored).toContain('merge-intervals-problem');
  });

  test('hydrates from existing localStorage value on mount', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['two-sum-problem']));

    const { result } = renderHook(() => useBookmarks());

    // useEffect fires synchronously in renderHook wrapper
    expect(result.current.isBookmarked('two-sum-problem')).toBe(true);
  });

  test('recovers gracefully from corrupt localStorage value', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{{');

    const { result } = renderHook(() => useBookmarks());

    expect(result.current.bookmarks.size).toBe(0);
    // Corrupt key should be removed
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
