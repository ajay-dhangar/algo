import React, { useMemo, useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { ChevronLeft, Clock, AlertCircle, TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import { getTrackById, CompanyTrack } from '../../data/companyTracks';
import dsaProblemsIndex from '../../data/generated/dsaProblemsIndex.json';
import type { DsaProblemsIndex, DsaProblem } from '../../data/dsaProblemsTypes';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useSolvedProblems } from '../../hooks/useSolvedProblems';

const data = dsaProblemsIndex as DsaProblemsIndex;

const COLOR_BADGE: Record<CompanyTrack['color'], string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
};

const DIFFICULTY_PROGRESS_COLOR: Record<string, string> = {
  Easy: 'bg-emerald-500',
  Medium: 'bg-amber-500',
  Hard: 'bg-rose-500',
};

interface ProblemWithIndex extends DsaProblem {
  index: number;
  isAvailable: boolean;
}

export default function TrackViewPage() {
  const location = useLocation();
  const [track, setTrack] = useState<CompanyTrack | null>(null);
  const [notFound, setNotFound] = useState(false);

  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isSolved, toggleSolved } = useSolvedProblems();
  const tagLabels = useMemo(() => new Map(data.tags.map((t) => [t.value, t.label])), []);

  // Extract track ID from URL search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const trackId = params.get('id');
    if (trackId) {
      const foundTrack = getTrackById(trackId);
      if (foundTrack) {
        setTrack(foundTrack);
      } else {
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }
  }, [location.search]);

  const problems: ProblemWithIndex[] = useMemo(() => {
    if (!track) return [];
    return track.problemIds.map((id, index) => {
      const problem = data.problemsById?.[id] || data.problems.find((p) => p.id === id);
      return {
        ...(problem || ({
          id,
          title: `[Problem not found: ${id}]`,
          description: '',
          difficulty: 'Hard' as const,
          tags: [],
          companies: [],
          url: '#',
        } as DsaProblem)),
        index,
        isAvailable: !!problem,
      };
    });
  }, [track]);

  const stats = useMemo(() => {
    const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
    const solvedCount = problems.filter((p) => p.isAvailable && isSolved(p.id)).length;
    const availableCount = problems.filter((p) => p.isAvailable).length;

    problems.forEach((p) => {
      if (p.isAvailable) {
        byDifficulty[p.difficulty]++;
      }
    });

    return {
      total: availableCount,
      solved: solvedCount,
      byDifficulty,
      progressPercentage: availableCount > 0 ? Math.round((solvedCount / availableCount) * 100) : 0,
    };
  }, [problems, isBookmarked, isSolved]);

  if (notFound) {
    return (
      <Layout title="Track Not Found">
        <div className="container margin-vert--xl px-4">
          <div className="text-center py-16 border border-dashed border-[var(--ifm-toc-border-color)] rounded-2xl">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-[var(--ifm-color-emphasis-700)] font-semibold m-0">Track not found.</p>
            <Link href="/dsa-problems/tracks" className="mt-4 inline-block text-[var(--ifm-color-primary)] font-semibold hover:underline">
              Back to Tracks
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!track) {
    return (
      <Layout title="Loading...">
        <div className="container margin-vert--xl px-4 text-center">
          <p>Loading track...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={track.name} description={track.description}>
      {/* Back Button & Header */}
      <header className="relative border-b border-[var(--ifm-toc-border-color)] overflow-hidden bg-[var(--ifm-background-surface-color)]">
        <div
          className="absolute inset-0 opacity-[0.25] dark:opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, var(--ifm-toc-border-color) 1px, transparent 1px),
                               linear-gradient(to bottom, var(--ifm-toc-border-color) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div className="container py-8 px-4 md:py-12 relative z-10">
          <Link href="/dsa-problems/tracks" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ifm-color-primary)] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Tracks
          </Link>

          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{track.icon}</span>
                <span className={clsx('px-3 py-1 rounded-full text-xs font-bold', COLOR_BADGE[track.color])}>
                  {track.name}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-[var(--ifm-heading-color)]">
                {track.tagline}
              </h1>
              <p className="text-base text-[var(--ifm-color-emphasis-700)] max-w-2xl">{track.description}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-[var(--ifm-card-background-color)] border border-[var(--ifm-toc-border-color)]">
              <div className="text-xs font-semibold text-[var(--ifm-color-emphasis-600)] uppercase tracking-wide mb-1">
                Problems
              </div>
              <div className="text-2xl font-black text-[var(--ifm-color-primary)]">{stats.total}</div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--ifm-card-background-color)] border border-[var(--ifm-toc-border-color)]">
              <div className="flex items-center gap-1 text-xs font-semibold text-[var(--ifm-color-emphasis-600)] uppercase tracking-wide mb-1">
                <Clock className="h-3.5 w-3.5" />
                Estimated
              </div>
              <div className="text-2xl font-black text-[var(--ifm-color-primary)]">{track.estimatedHours}h</div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--ifm-card-background-color)] border border-[var(--ifm-toc-border-color)]">
              <div className="text-xs font-semibold text-[var(--ifm-color-emphasis-600)] uppercase tracking-wide mb-1">
                Difficulty
              </div>
              <div className="flex gap-1">
                {stats.byDifficulty.Easy > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    {stats.byDifficulty.Easy}E
                  </span>
                )}
                {stats.byDifficulty.Medium > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400">
                    {stats.byDifficulty.Medium}M
                  </span>
                )}
                {stats.byDifficulty.Hard > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400">
                    {stats.byDifficulty.Hard}H
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[var(--ifm-card-background-color)] border border-[var(--ifm-toc-border-color)]">
              <div className="flex items-center gap-1 text-xs font-semibold text-[var(--ifm-color-emphasis-600)] uppercase tracking-wide mb-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Solved
              </div>
              <div className="text-2xl font-black text-[var(--ifm-color-primary)]">{stats.solved}</div>
            </div>
          </div>

          {/* Progress Bar */}
          {stats.total > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--ifm-color-emphasis-600)]">Track Progress</span>
                <span className="text-xs font-bold text-[var(--ifm-color-primary)]">{stats.solved}/{stats.total} solved · {stats.progressPercentage}%</span>
              </div>
              <div className="h-2 bg-[var(--ifm-toc-border-color)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--ifm-color-primary)] transition-all duration-300"
                  style={{ width: `${stats.progressPercentage}%` }}
                / />
            </div>
          )}
        </div>
      </header>

      {/* Problems List */}
      <main className="container margin-vert--xl px-4">
        {problems.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[var(--ifm-toc-border-color)] rounded-2xl">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-[var(--ifm-color-emphasis-700)] font-semibold m-0">Track has no problems yet.</p>
          </div>
        ) : (
          <>
            {/* Unavailable Problems Warning */}
            {problems.some((p) => !p.isAvailable) && (
              <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-800/40 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100 text-sm">
                <div className="flex gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Note:</strong> Some problems in this track are not yet available. They'll appear as you add
                    more problems to the index.
                  </div>
                </div>
              </div>
            )}

            {/* Problems Grid */}
            <div className="space-y-3">
              {problems.map((problem) => {
                if (!problem.isAvailable) {
                  return (
                    <div
                      key={problem.id}
                      className="p-4 rounded-lg border-2 border-dashed border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] opacity-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--ifm-toc-border-color)] flex items-center justify-center">
                          <span className="text-xs font-bold text-[var(--ifm-color-emphasis-600)]">{problem.index + 1}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--ifm-heading-color)]">{problem.title}</div>
                          <div className="text-xs text-[var(--ifm-color-emphasis-600)]">Coming soon to DSA index</div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={problem.id}
                    className="relative p-4 rounded-lg border-2 border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] hover:border-[var(--ifm-color-primary)] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number */}
                      <div
                        className={clsx(
                          'w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 text-sm',
                          isSolved(problem.id)
                            ? 'bg-emerald-500'
                            : DIFFICULTY_PROGRESS_COLOR[problem.difficulty],
                        )}
                      >
                        {isSolved(problem.id) ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          problem.index + 1
                        )}
                      </div>

                      {/* Problem Info */}
                      <div className="flex-grow min-w-0">
                        <Link href={problem.url} className="block hover:text-[var(--ifm-color-primary)] transition-colors">
                          <div className="font-bold text-[var(--ifm-heading-color)] mb-1 hover:underline">
                            {problem.title}
                          </div>
                        </Link>
                        <p className="text-sm text-[var(--ifm-color-emphasis-600)] mb-2 line-clamp-2">
                          {problem.description}
                        </p>

                        {/* Tags */}
                        {problem.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {problem.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-block text-xs font-medium px-2 py-0.5 rounded-md bg-[var(--ifm-toc-border-color)] text-[var(--ifm-color-emphasis-600)]"
                              >
                                {tagLabels.get(tag) || tag}
                              </span>
                            ))}
                            {problem.tags.length > 3 && (
                              <span className="inline-block text-xs font-medium text-[var(--ifm-color-emphasis-600)]">
                                +{problem.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Difficulty, Solved & Bookmark */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span
                          className={clsx(
                            'text-xs font-bold px-2.5 py-1 rounded-full',
                            problem.difficulty === 'Easy'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                              : problem.difficulty === 'Medium'
                                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                : 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
                          )}
                        >
                          {problem.difficulty}
                        </span>

                        {/* Mark Solved toggle */}
                        <button
                          onClick={() => toggleSolved(problem.id)}
                          aria-pressed={isSolved(problem.id)}
                          className={clsx(
                            'flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-colors',
                            isSolved(problem.id)
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-[var(--ifm-toc-border-color)] text-[var(--ifm-color-emphasis-600)] hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400',
                          )}
                          title={isSolved(problem.id) ? 'Mark as unsolved' : 'Mark as solved'}
                        >
                          {isSolved(problem.id) ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <Circle className="h-3.5 w-3.5" />
                          )}
                          {isSolved(problem.id) ? 'Solved' : 'Solve'}
                        </button>

                        {/* Bookmark (save for later) */}
                        <button
                          onClick={() => toggleBookmark(problem.id)}
                          aria-pressed={isBookmarked(problem.id)}
                          className={clsx(
                            'p-1.5 rounded-lg transition-colors',
                            isBookmarked(problem.id)
                              ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-[var(--ifm-toc-border-color)] text-[var(--ifm-color-emphasis-600)] hover:bg-amber-100 hover:text-amber-600 dark:hover:bg-amber-900/30 dark:hover:text-amber-400',
                          )}
                          title={isBookmarked(problem.id) ? 'Remove from saved' : 'Save for later'}
                        >
                          {isBookmarked(problem.id) ? '🔖' : '☆'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tips Section */}
            <div className="mt-12 p-6 rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)]">
              <h2 className="text-lg font-bold mb-3 text-[var(--ifm-heading-color)]">💡 How to use this track</h2>
              <ul className="space-y-2 text-sm text-[var(--ifm-color-emphasis-700)] m-0 pl-5">
                <li>
                  <strong>Follow the order:</strong> Problems are sequenced by learning prerequisites and difficulty.
                  Don't skip ahead.
                </li>
                <li>
                  <strong>Mark problems solved:</strong> Click the "Solve" button on each problem once you've completed
                  it — this drives your Track Progress bar. Use the bookmark icon to save problems for later review.
                </li>
                <li>
                  <strong>Understand, don't memorize:</strong> Focus on understanding the patterns and approaches rather
                  than memorizing solutions.
                </li>
                <li>
                  <strong>Time yourself:</strong> Once comfortable, try solving problems under time constraints to
                  simulate interviews.
                </li>
                <li>
                  <strong>Return to hard problems:</strong> After completing the track, revisit Hard problems to deepen
                  your mastery.
                </li>
              </ul>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}
