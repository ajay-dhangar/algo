/**
 * Tests for the SidebarUpdater completion badge matching.
 *
 * Regression coverage for: sidebar completion checkmarks previously used fuzzy
 * substring title matching, so completing "Two Sum" could badge "Two Sum II"
 * (and vice-versa). Matching now uses the sidebar link href -> doc topicId.
 */
import React from 'react';
import { render, act } from '@testing-library/react';
import SidebarUpdater from '../../components/ProgressTracker/SidebarUpdater';

jest.mock('../../utils/safeStorage', () => {
  const actual = jest.requireActual('../../utils/safeStorage');
  return {
    ...actual,
    syncAlgoProgress: jest.fn().mockResolvedValue(undefined),
  };
});

/* ---------- localStorage mock ---------- */
const store: Record<string, string> = {};
const mockLocalStorage: Storage = {
  getItem: (k: string) => store[k] ?? null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
  get length() { return Object.keys(store).length; },
  key: (i: number) => Object.keys(store)[i] ?? null,
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage, writable: true });

/* ---------- helpers ---------- */

function addMenuLink(href: string, label: string): HTMLElement {
  const link = document.createElement('a');
  link.className = 'menu__link';
  link.href = href;
  link.textContent = label;
  document.body.appendChild(link);
  return link;
}

function removeMenuLinks() {
  document.querySelectorAll('.menu__link').forEach((el) => el.remove());
}

function badgeCount(link: HTMLElement): number {
  return link.querySelectorAll('.completion-badge').length;
}

async function renderAndSettle() {
  render(<SidebarUpdater />);
  // Flush the promise chain (syncAlgoProgress.then(load))…
  await act(async () => {});
  // …then run the deferred badge-painting timeout.
  await act(async () => {
    jest.advanceTimersByTime(200);
  });
}

describe('SidebarUpdater', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockLocalStorage.clear();
    removeMenuLinks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('badges the exact sidebar link for a completed doc', async () => {
    store['algo_progress'] = JSON.stringify({
      'dsa-problems-easy-two-sum-problem': true,
      'dsa-problems-easy-two-sum-problem_title': 'Two Sum',
    });

    const twoSum = addMenuLink('/algo/docs/dsa-problems/easy/two-sum-problem', 'Two Sum');
    const twoSumII = addMenuLink('/algo/docs/dsa-problems/medium/two-sum-ii', 'Two Sum II');

    await renderAndSettle();

    expect(badgeCount(twoSum)).toBe(1);
    expect(badgeCount(twoSumII)).toBe(0);
  });

  it('does not badge near-duplicate links (Two Sum II / Subsets II / Path Sum III)', async () => {
    store['algo_progress'] = JSON.stringify({
      'dsa-problems-medium-subsets-ii': true,
      'dsa-problems-medium-subsets-ii_title': 'Subsets II',
      'dsa-problems-easy-path-sum': true,
      'dsa-problems-easy-path-sum_title': 'Path Sum',
      'dsa-problems-hard-path-sum-iii': true,
      'dsa-problems-hard-path-sum-iii_title': 'Path Sum III',
    });

    const subsetsII = addMenuLink('/algo/docs/dsa-problems/medium/subsets-ii', 'Subsets II');
    const subsets = addMenuLink('/algo/docs/dsa-problems/medium/subsets', 'Subsets');
    const pathSum = addMenuLink('/algo/docs/dsa-problems/easy/path-sum', 'Path Sum');
    const pathSumIII = addMenuLink('/algo/docs/dsa-problems/hard/path-sum-iii', 'Path Sum III');

    await renderAndSettle();

    expect(badgeCount(subsetsII)).toBe(1);
    expect(badgeCount(subsets)).toBe(0);
    expect(badgeCount(pathSum)).toBe(1);
    expect(badgeCount(pathSumIII)).toBe(1);
  });

  it('badges links whose sidebar_label differs from the stored title via URL', async () => {
    store['algo_progress'] = JSON.stringify({
      'basic-data-structures-array-arrays-in-dsa': true,
      'basic-data-structures-array-arrays-in-dsa_title': 'Arrays in Data Structures and Algorithms',
    });

    const arrays = addMenuLink('/algo/docs/basic-data-structures/array/arrays-in-dsa', 'Arrays');

    await renderAndSettle();

    expect(badgeCount(arrays)).toBe(1);
  });

  it('does not badge a link whose href does not match any completed doc', async () => {
    store['algo_progress'] = JSON.stringify({
      'graph-11': true,
      'graph-11_title': 'Graph Challenge',
    });

    const unrelated = addMenuLink('/algo/docs/arrays/intro', 'Arrays Intro');

    await renderAndSettle();

    expect(badgeCount(unrelated)).toBe(0);
  });

  it('handles trailing slashes and base-url variations', async () => {
    store['algo_progress'] = JSON.stringify({
      'algorithms-sorting-quick-sort': true,
      'algorithms-sorting-quick-sort_title': 'Quick Sort',
    });

    const trailing = addMenuLink('/algo/docs/algorithms/sorting/quick-sort/', 'Quick Sort');

    await renderAndSettle();

    expect(badgeCount(trailing)).toBe(1);
  });

  it('falls back to exact normalized title equality for legacy keys', async () => {
    // Legacy entry created from a title-derived key rather than the doc id.
    store['algo_progress'] = JSON.stringify({
      'two-sum': true,
      'two-sum_title': 'Two Sum',
    });

    const twoSum = addMenuLink('/algo/docs/dsa-problems/easy/two-sum-problem', 'Two Sum');
    const twoSumII = addMenuLink('/algo/docs/dsa-problems/medium/two-sum-ii', 'Two Sum II');

    await renderAndSettle();

    expect(badgeCount(twoSum)).toBe(1);
    expect(badgeCount(twoSumII)).toBe(0);
  });
});
