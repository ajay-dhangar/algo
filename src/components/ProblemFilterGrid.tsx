import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import ProblemCard from './ProblemCard';
import type { DsaProblemsIndex } from '../data/dsaProblemsTypes';

interface ProblemFilterGridProps {
  data: DsaProblemsIndex;
}

const DIFFICULTY_CHIP_STYLES: Record<string, string> = {
  Easy: 'data-[active=true]:bg-emerald-500/15 data-[active=true]:text-emerald-600 data-[active=true]:border-emerald-500/40 dark:data-[active=true]:text-emerald-400',
  Medium:
    'data-[active=true]:bg-amber-500/15 data-[active=true]:text-amber-600 data-[active=true]:border-amber-500/40 dark:data-[active=true]:text-amber-400',
  Hard: 'data-[active=true]:bg-rose-500/15 data-[active=true]:text-rose-600 data-[active=true]:border-rose-500/40 dark:data-[active=true]:text-rose-400',
};

// Showing all 50+ tags at once would overwhelm the filter bar, so only the
// most common ones are visible by default; "Show all tags" reveals the rest.
const DEFAULT_VISIBLE_TAG_COUNT = 14;

export default function ProblemFilterGrid({ data }: ProblemFilterGridProps) {
  const [query, setQuery] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [showAllTags, setShowAllTags] = useState(false);

  const tagLabels = useMemo(() => new Map(data.tags.map((t) => [t.value, t.label])), [data.tags]);

  const tagFrequency = useMemo(() => {
    const freq = new Map<string, number>();
    data.problems.forEach((p) => p.tags.forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1)));
    return freq;
  }, [data.problems]);

  const sortedTags = useMemo(
    () => [...data.tags].sort((a, b) => (tagFrequency.get(b.value) ?? 0) - (tagFrequency.get(a.value) ?? 0)),
    [data.tags, tagFrequency],
  );

  const visibleTags = showAllTags ? sortedTags : sortedTags.slice(0, DEFAULT_VISIBLE_TAG_COUNT);

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) => {
      const next = new Set(prev);
      if (next.has(difficulty)) next.delete(difficulty);
      else next.add(difficulty);
      return next;
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedDifficulties(new Set());
    setSelectedTags(new Set());
  };

  const filteredProblems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return data.problems.filter((problem) => {
      if (selectedDifficulties.size > 0 && !selectedDifficulties.has(problem.difficulty)) {
        return false;
      }
      if (selectedTags.size > 0 && !Array.from(selectedTags).every((tag) => problem.tags.includes(tag))) {
        return false;
      }
      if (normalizedQuery && !problem.title.toLowerCase().includes(normalizedQuery)) {
        return false;
      }
      return true;
    });
  }, [data.problems, query, selectedDifficulties, selectedTags]);

  const hasActiveFilters = query.trim() !== '' || selectedDifficulties.size > 0 || selectedTags.size > 0;

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-md mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--ifm-color-emphasis-500)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search problems by title…"
          aria-label="Search problems by title"
          className="w-full rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] py-2.5 pl-9 pr-3 text-sm text-[var(--ifm-font-color-base)] outline-none focus:border-[var(--ifm-color-primary)] transition-colors"
        />
      </div>

      {/* Difficulty chips */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--ifm-color-emphasis-600)] mr-1">
          Difficulty
        </span>
        {data.difficulties.map((difficulty) => {
          const active = selectedDifficulties.has(difficulty);
          return (
            <button
              key={difficulty}
              type="button"
              data-active={active}
              aria-pressed={active}
              onClick={() => toggleDifficulty(difficulty)}
              className={clsx(
                'text-xs font-bold px-3 py-1.5 rounded-full border transition-colors',
                'border-[var(--ifm-toc-border-color)] text-[var(--ifm-color-emphasis-700)]',
                DIFFICULTY_CHIP_STYLES[difficulty],
              )}
            >
              {difficulty}
            </button>
          );
        })}
      </div>

      {/* Tag chips */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--ifm-color-emphasis-600)] mr-1">
          Topic
        </span>
        {visibleTags.map(({ value, label }) => {
          const active = selectedTags.has(value);
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => toggleTag(value)}
              className={clsx(
                'text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors',
                active
                  ? 'bg-[var(--ifm-color-primary)] text-white border-[var(--ifm-color-primary)]'
                  : 'border-[var(--ifm-toc-border-color)] text-[var(--ifm-color-emphasis-700)] hover:border-[var(--ifm-color-primary)]',
              )}
            >
              {label}
            </button>
          );
        })}
        {sortedTags.length > DEFAULT_VISIBLE_TAG_COUNT && (
          <button
            type="button"
            onClick={() => setShowAllTags((v) => !v)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full text-[var(--ifm-color-primary)] hover:underline"
          >
            {showAllTags ? 'Show fewer tags' : `Show all ${sortedTags.length} tags`}
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ifm-color-emphasis-600)] hover:text-[var(--ifm-color-primary)] mt-2 mb-2"
        >
          <X className="h-3.5 w-3.5" />
          Clear filters
        </button>
      )}

      {/* Result count */}
      <p className="text-sm text-[var(--ifm-color-emphasis-600)] mt-4 mb-4">
        Showing <strong>{filteredProblems.length}</strong> of {data.count} problems
      </p>

      {/* Grid */}
      {filteredProblems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProblems.map((problem) => (
            <ProblemCard key={problem.url} problem={problem} tagLabels={tagLabels} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-[var(--ifm-toc-border-color)] rounded-2xl">
          <p className="text-[var(--ifm-color-emphasis-700)] font-semibold m-0">No problems match these filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-[var(--ifm-color-primary)] hover:underline mt-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
