import React, { useMemo, useState, useEffect } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import CatalogCard from './CatalogCard';
import type { DocsCatalogIndex } from '../data/docsCatalogTypes';

interface CatalogFilterGridProps {
  data: DocsCatalogIndex;
}

const DIFFICULTY_CHIP_STYLES: Record<string, string> = {
  Easy: 'data-[active=true]:bg-emerald-500/15 data-[active=true]:text-emerald-600 data-[active=true]:border-emerald-500/40 dark:data-[active=true]:text-emerald-400',
  Medium:
    'data-[active=true]:bg-amber-500/15 data-[active=true]:text-amber-600 data-[active=true]:border-amber-500/40 dark:data-[active=true]:text-amber-400',
  Hard: 'data-[active=true]:bg-rose-500/15 data-[active=true]:text-rose-600 data-[active=true]:border-rose-500/40 dark:data-[active=true]:text-rose-400',
};

const CATEGORY_LABELS: Record<string, string> = {
  graphs: 'Graphs',
  extra: 'Algorithms & Data Structures',
  'basic-data-structures': 'Basic Data Structures',
  'data-structures': 'Data Structures',
  'programming-fundamentals': 'Programming Fundamentals',
};

const DIFFICULTY_ORDER: Record<string, number> = { Easy: 0, Medium: 1, Hard: 2 };

type SortMode = 'title-asc' | 'difficulty-asc' | 'difficulty-desc';

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: 'title-asc', label: 'Title (A–Z)' },
  { value: 'difficulty-asc', label: 'Difficulty (Easy → Hard)' },
  { value: 'difficulty-desc', label: 'Difficulty (Hard → Easy)' },
];

// Showing 100+ tags at once would overwhelm the filter bar, so only the
// most common ones are visible by default; "Show all tags" reveals the rest.
const DEFAULT_VISIBLE_TAG_COUNT = 16;

export default function CatalogFilterGrid({ data }: CatalogFilterGridProps) {
  const location = useLocation();
  const history = useHistory();

  const initialParams = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(location.search);
    }
    return new URLSearchParams();
  }, [location.search]);

  const [query, setQuery] = useState(initialParams.get('q') || '');
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<string>>(
    new Set(initialParams.get('difficulty')?.split(',').filter(Boolean) || []),
  );
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set(initialParams.get('tags')?.split(',').filter(Boolean) || []),
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(initialParams.get('category')?.split(',').filter(Boolean) || []),
  );
  const [sortMode, setSortMode] = useState<SortMode>((initialParams.get('sort') as SortMode) || 'title-asc');
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedDifficulties.size > 0) params.set('difficulty', Array.from(selectedDifficulties).join(','));
    if (selectedTags.size > 0) params.set('tags', Array.from(selectedTags).join(','));
    if (selectedCategories.size > 0) params.set('category', Array.from(selectedCategories).join(','));
    if (sortMode !== 'title-asc') params.set('sort', sortMode);

    const newSearch = params.toString();
    const currentSearch = location.search.replace(/^\?/, '');

    if (newSearch !== currentSearch) {
      history.replace({ search: newSearch ? `?${newSearch}` : '' });
    }
  }, [query, selectedDifficulties, selectedTags, selectedCategories, sortMode, history, location.search]);

  const tagLabels = useMemo(() => new Map(data.tags.map((t) => [t.value, t.label])), [data.tags]);

  const tagFrequency = useMemo(() => {
    const freq = new Map<string, number>();
    data.docs.forEach((d) => d.tags.forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1)));
    return freq;
  }, [data.docs]);

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

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedDifficulties(new Set());
    setSelectedTags(new Set());
    setSelectedCategories(new Set());
    setSortMode('title-asc');
  };

  const filteredDocs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = data.docs.filter((doc) => {
      if (selectedDifficulties.size > 0 && !selectedDifficulties.has(doc.difficulty)) {
        return false;
      }
      if (selectedTags.size > 0 && !Array.from(selectedTags).every((tag) => doc.tags.includes(tag))) {
        return false;
      }
      if (selectedCategories.size > 0 && !selectedCategories.has(doc.category)) {
        return false;
      }
      if (
        normalizedQuery &&
        !doc.title.toLowerCase().includes(normalizedQuery) &&
        !doc.tags.some((t) => t.includes(normalizedQuery))
      ) {
        return false;
      }
      return true;
    });

    const sorted = [...filtered];
    if (sortMode === 'title-asc') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortMode === 'difficulty-asc') {
      sorted.sort(
        (a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] || a.title.localeCompare(b.title),
      );
    } else if (sortMode === 'difficulty-desc') {
      sorted.sort(
        (a, b) => DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[a.difficulty] || a.title.localeCompare(b.title),
      );
    }

    return sorted;
  }, [data.docs, query, selectedDifficulties, selectedTags, selectedCategories, sortMode]);

  const hasActiveFilters =
    query.trim() !== '' ||
    selectedDifficulties.size > 0 ||
    selectedTags.size > 0 ||
    selectedCategories.size > 0 ||
    sortMode !== 'title-asc';

  return (
    <div>
      {/* Search + sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--ifm-color-emphasis-500)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or topic…"
            aria-label="Search docs by title or topic"
            className="w-full rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] py-2.5 pl-9 pr-3 text-sm text-[var(--ifm-font-color-base)] outline-none focus:border-[var(--ifm-color-primary)] transition-colors"
          />
        </div>

        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as SortMode)}
          aria-label="Sort docs"
          className="rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] py-2.5 px-3 text-sm text-[var(--ifm-font-color-base)] outline-none focus:border-[var(--ifm-color-primary)] transition-colors font-semibold"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
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

      {/* Category chips */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--ifm-color-emphasis-600)] mr-1">
          Section
        </span>
        {data.categories.map((category) => {
          const active = selectedCategories.has(category);
          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => toggleCategory(category)}
              className={clsx(
                'text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors',
                active
                  ? 'bg-[var(--ifm-color-primary)] text-white border-[var(--ifm-color-primary)]'
                  : 'border-[var(--ifm-toc-border-color)] text-[var(--ifm-color-emphasis-700)] hover:border-[var(--ifm-color-primary)]',
              )}
            >
              {CATEGORY_LABELS[category] ?? category}
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
        Showing <strong>{filteredDocs.length}</strong> of {data.count} docs
      </p>

      {/* Grid */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => (
            <CatalogCard key={doc.url} doc={doc} tagLabels={tagLabels} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-[var(--ifm-toc-border-color)] rounded-2xl">
          <p className="text-[var(--ifm-color-emphasis-700)] font-semibold m-0">No docs match these filters.</p>
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
