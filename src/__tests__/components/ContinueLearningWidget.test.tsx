/**
 * Unit tests for getLastVisited / recordLastVisited in safeStorage
 * and the ContinueLearningWidget component.
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';

/* ---------- mocks ---------- */

// Mock Docusaurus Link
jest.mock('@docusaurus/Link', () =>
  ({ to, children, ...rest }: { to: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={to} {...rest}>{children}</a>
  )
);

// Minimal localStorage mock
const store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (k: string) => store[k] ?? null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
  get length() { return Object.keys(store).length; },
  key: (i: number) => Object.keys(store)[i] ?? null,
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage, writable: true });

import {
  recordLastVisited,
  getLastVisited,
  safeJsonParse,
} from '../../utils/safeStorage';
import ContinueLearningWidget from '../../components/Homepage/ContinueLearningWidget';

/* ---------- helpers ---------- */

function resetStore() {
  mockLocalStorage.clear();
}

/* ============================= */
/*  safeStorage helper tests     */
/* ============================= */

describe('recordLastVisited / getLastVisited', () => {
  beforeEach(resetStore);

  it('returns null when localStorage is empty', () => {
    expect(getLastVisited()).toBeNull();
  });

  it('round-trips a doc item correctly', () => {
    const now = new Date().toISOString();
    recordLastVisited({
      id: 'arrays',
      title: 'Arrays',
      url: '/docs/arrays',
      type: 'doc',
      readingTime: '3 min read',
      isCompleted: false,
      visitedAt: now,
    });

    const result = getLastVisited();
    expect(result).not.toBeNull();
    if (result === null) throw new Error('expected a last-visited item');
    expect(result.id).toBe('arrays');
    expect(result.title).toBe('Arrays');
    expect(result.type).toBe('doc');
    expect(result.readingTime).toBe('3 min read');
    expect(result.isCompleted).toBe(false);
  });

  it('round-trips a quiz item correctly', () => {
    const now = new Date().toISOString();
    recordLastVisited({
      id: 'graphs',
      title: 'Quiz on Graphs',
      url: '/quizzes/graphs',
      type: 'quiz',
      readingTime: '5 min quiz',
      isCompleted: true,
      visitedAt: now,
    });

    const result = getLastVisited();
    expect(result).not.toBeNull();
    if (result === null) throw new Error('expected a last-visited item');
    expect(result.type).toBe('quiz');
    expect(result.isCompleted).toBe(true);
  });

  it('defaults visitedAt to current time when not provided', () => {
    const before = Date.now();
    recordLastVisited({
      id: 'stacks',
      title: 'Stacks',
      url: '/docs/stacks',
      type: 'doc',
    });
    const after = Date.now();

    const stored = safeJsonParse<{ visitedAt: string }>('algo_last_visited', null as any);
    const ts = new Date(stored.visitedAt).getTime();
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(after);
  });

  it('falls back to algo_progress scan when algo_last_visited is absent', () => {
    const now = new Date().toISOString();
    const progress = {
      arrays: true,
      arrays_title: 'Arrays Deep Dive',
      arrays_updatedAt: now,
    };
    store['algo_progress'] = JSON.stringify(progress);

    const result = getLastVisited();
    expect(result).not.toBeNull();
    if (result === null) throw new Error('expected a last-visited item');
    expect(result.title).toBe('Arrays Deep Dive');
    expect(result.type).toBe('doc');
    expect(result.isCompleted).toBe(true);
  });

  it('falls back to quiz_attempts_* scan when algo_last_visited is absent', () => {
    const now = new Date().toISOString();
    const attempts = [{ score: 8, completedAt: now }];
    store['quiz_attempts_user123_graphs'] = JSON.stringify(attempts);

    const result = getLastVisited();
    expect(result).not.toBeNull();
    if (result === null) throw new Error('expected a last-visited item');
    expect(result.type).toBe('quiz');
  });

  it('picks the most recent item among multiple candidates', () => {
    const older = new Date(Date.now() - 3_600_000).toISOString(); // 1h ago
    const newer = new Date().toISOString();

    // doc from 1h ago
    const progress = {
      sorting: true,
      sorting_title: 'Sorting Algorithms',
      sorting_updatedAt: older,
    };
    store['algo_progress'] = JSON.stringify(progress);

    // last_visited record is newer
    store['algo_last_visited'] = JSON.stringify({
      id: 'queues',
      title: 'Queues',
      url: '/docs/queues',
      type: 'doc',
      readingTime: '4 min read',
      isCompleted: false,
      visitedAt: newer,
    });

    const result = getLastVisited();
    if (result === null) throw new Error('expected a last-visited item');
    expect(result.id).toBe('queues'); // newer one should win
  });
});

/* ============================= */
/*  ContinueLearningWidget tests */
/* ============================= */

describe('ContinueLearningWidget', () => {
  beforeEach(() => {
    resetStore();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders nothing when no last-visited item exists', () => {
    const { container } = render(<ContinueLearningWidget />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the widget when a last-visited item is present', async () => {
    store['algo_last_visited'] = JSON.stringify({
      id: 'binary-trees',
      title: 'Binary Trees',
      url: '/docs/binary-trees',
      type: 'doc',
      readingTime: '5 min read',
      isCompleted: false,
      visitedAt: new Date().toISOString(),
    });

    await act(async () => {
      render(<ContinueLearningWidget />);
    });

    expect(screen.getByText('Binary Trees')).toBeInTheDocument();
    expect(screen.getByText(/5 min read/)).toBeInTheDocument();
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue where you left off/i)).toBeInTheDocument();
  });

  it('shows "Mastered" pill when isCompleted is true', async () => {
    store['algo_last_visited'] = JSON.stringify({
      id: 'graphs',
      title: 'Graph Algorithms',
      url: '/quizzes/graphs',
      type: 'quiz',
      readingTime: '5 min quiz',
      isCompleted: true,
      visitedAt: new Date().toISOString(),
    });

    await act(async () => {
      render(<ContinueLearningWidget />);
    });

    expect(screen.getByText(/Mastered/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Quiz/i).length).toBeGreaterThanOrEqual(1);
  });

  it('links to the correct URL', async () => {
    store['algo_last_visited'] = JSON.stringify({
      id: 'stacks',
      title: 'Stacks',
      url: '/docs/stacks',
      type: 'doc',
      readingTime: '3 min read',
      isCompleted: false,
      visitedAt: new Date().toISOString(),
    });

    await act(async () => {
      render(<ContinueLearningWidget />);
    });

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/docs/stacks');
  });
});
