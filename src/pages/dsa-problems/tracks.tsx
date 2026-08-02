import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { COMPANY_TRACKS, CompanyTrack, getFeaturedTracks, getAllTracks } from '../../data/companyTracks';
import dsaProblemsIndex from '../../data/generated/dsaProblemsIndex.json';
import type { DsaProblemsIndex } from '../../data/dsaProblemsTypes';

const data = dsaProblemsIndex as DsaProblemsIndex;

const COLOR_STYLES: Record<CompanyTrack['color'], string> = {
  blue: 'from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900/50 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
  purple:
    'from-purple-50 to-purple-100/50 dark:from-purple-950 dark:to-purple-900/50 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100',
  amber: 'from-amber-50 to-amber-100/50 dark:from-amber-950 dark:to-amber-900/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
  rose: 'from-rose-50 to-rose-100/50 dark:from-rose-950 dark:to-rose-900/50 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100',
  emerald:
    'from-emerald-50 to-emerald-100/50 dark:from-emerald-950 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100',
  cyan: 'from-cyan-50 to-cyan-100/50 dark:from-cyan-950 dark:to-cyan-900/50 border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-100',
  indigo:
    'from-indigo-50 to-indigo-100/50 dark:from-indigo-950 dark:to-indigo-900/50 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-100',
  pink: 'from-pink-50 to-pink-100/50 dark:from-pink-950 dark:to-pink-900/50 border-pink-200 dark:border-pink-800 text-pink-900 dark:text-pink-100',
};

const BADGE_STYLES: Record<CompanyTrack['color'], string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
};

interface TrackStatsProps {
  track: CompanyTrack;
}

function TrackStats({ track }: TrackStatsProps) {
  const easyCount = track.problemIds.reduce((count, id) => {
    const problem = data.problemsById?.[id];
    return count + (problem?.difficulty === 'Easy' ? 1 : 0);
  }, 0);

  const mediumCount = track.problemIds.reduce((count, id) => {
    const problem = data.problemsById?.[id];
    return count + (problem?.difficulty === 'Medium' ? 1 : 0);
  }, 0);

  const hardCount = track.problemIds.reduce((count, id) => {
    const problem = data.problemsById?.[id];
    return count + (problem?.difficulty === 'Hard' ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-[var(--ifm-heading-color)]">
        {track.problemIds.length} problems
      </div>
      <div className="flex gap-2 flex-wrap">
        {easyCount > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {easyCount} Easy
          </span>
        )}
        {mediumCount > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {mediumCount} Medium
          </span>
        )}
        {hardCount > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> {hardCount} Hard
          </span>
        )}
      </div>
    </div>
  );
}

interface TrackCardProps {
  track: CompanyTrack;
}

function TrackCard({ track }: TrackCardProps) {
  return (
    <Link
      to={`/dsa-problems/track-view?id=${track.id}`}
      className={clsx(
        'group relative block p-6 rounded-2xl border-2 transition-all duration-200',
        'hover:shadow-lg hover:border-opacity-100',
        'bg-gradient-to-br',
        COLOR_STYLES[track.color],
      )}
    >
      {/* Featured badge */}
      {track.featured && (
        <div className="absolute top-4 right-4">
          <span
            className={clsx(
              'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold',
              BADGE_STYLES[track.color],
            )}
          >
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 pr-16">
        <div className="text-3xl mb-2">{track.icon}</div>
        <h3 className="text-xl font-black tracking-tight mb-1">{track.name}</h3>
        <p className="text-sm font-semibold opacity-75">{track.tagline}</p>
      </div>

      {/* Description */}
      <p className="text-sm opacity-90 mb-4 line-clamp-2">{track.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-t border-current border-opacity-20">
        <div className="pt-4">
          <div className="flex items-center gap-1.5 text-sm font-semibold mb-1">
            <Clock className="h-3.5 w-3.5" />
            Est. {track.estimatedHours}h
          </div>
        </div>
        <div className="pt-4">
          <TrackStats track={track} />
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all">
        Start Track
        <ChevronRight className="h-4 w-4" />
      </div>
    </Link>
  );
}

export default function CompanyTracksPage() {
  const [filter, setFilter] = useState<'all' | 'featured'>('featured');
  const tracks = filter === 'featured' ? getFeaturedTracks() : getAllTracks();

  return (
    <Layout
      title="Company Interview Tracks"
      description="Master curated problem sequences designed for tech company interviews. Choose your track and follow a structured learning path."
    >
      {/* Header */}
      <header className="relative border-b border-[var(--ifm-toc-border-color)] overflow-hidden bg-[var(--ifm-background-surface-color)]">
        <div
          className="absolute inset-0 opacity-[0.25] dark:opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, var(--ifm-toc-border-color) 1px, transparent 1px),
                               linear-gradient(to bottom, var(--ifm-toc-border-color) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div className="container py-14 px-4 md:py-20 text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[var(--ifm-color-primary-lightest)] text-[var(--ifm-color-primary-darkest)] dark:bg-[var(--ifm-color-primary-darker)] dark:text-white px-3 py-1 rounded-full font-bold text-xs mb-4 border border-[var(--ifm-color-primary-light)]">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{COMPANY_TRACKS.length} Curated Tracks</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[var(--ifm-heading-color)]">
            Interview <span className="text-[var(--ifm-color-primary)]">Company Tracks</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--ifm-color-emphasis-700)] max-w-2xl m-0 leading-relaxed">
            Follow industry-standard problem sequences designed to prepare you for technical interviews at top tech
            companies. Each track is ordered by learning dependency, difficulty, and real-world frequency.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container margin-vert--xl px-4">
        {/* Filter */}
        <div className="mb-8 flex gap-3">
          <button
            type="button"
            onClick={() => setFilter('featured')}
            aria-pressed={filter === 'featured'}
            className={clsx(
              'px-4 py-2 rounded-lg font-semibold transition-colors text-sm',
              filter === 'featured'
                ? 'bg-[var(--ifm-color-primary)] text-white'
                : 'bg-[var(--ifm-card-background-color)] border border-[var(--ifm-toc-border-color)] text-[var(--ifm-color-emphasis-700)] hover:border-[var(--ifm-color-primary)]',
            )}
          >
            Featured
          </button>
          <button
            type="button"
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
            className={clsx(
              'px-4 py-2 rounded-lg font-semibold transition-colors text-sm',
              filter === 'all'
                ? 'bg-[var(--ifm-color-primary)] text-white'
                : 'bg-[var(--ifm-card-background-color)] border border-[var(--ifm-toc-border-color)] text-[var(--ifm-color-emphasis-700)] hover:border-[var(--ifm-color-primary)]',
            )}
          >
            All Tracks
          </button>
        </div>

        {/* Info box */}
        <div className="mb-8 p-4 rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] text-sm text-[var(--ifm-color-emphasis-700)]">
          <p className="m-0">
            💡 <strong>Pro tip:</strong> Each track combines foundational and advanced problems in a specific order.
            Complete one track to build a solid foundation, then explore other tracks to broaden your perspective.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
