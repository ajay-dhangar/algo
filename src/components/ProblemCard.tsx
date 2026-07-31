import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { ArrowUpRight, Star } from 'lucide-react';
import type { DsaProblem } from '../data/dsaProblemsTypes';

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

const MAX_VISIBLE_TAGS = 3;

interface ProblemCardProps {
  problem: DsaProblem;
  tagLabels: Map<string, string>;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export default function ProblemCard({ problem, tagLabels, isBookmarked, onToggleBookmark }: ProblemCardProps) {
  const visibleTags = problem.tags.slice(0, MAX_VISIBLE_TAGS);
  const extraTagCount = problem.tags.length - visibleTags.length;

  return (
    <Link
      to={problem.url}
      className={clsx(
        'group relative block rounded-2xl border p-5 h-full transition-all duration-300',
        'text-inherit hover:text-inherit no-underline hover:no-underline overflow-hidden',
        'bg-[var(--ifm-card-background-color)] border-[var(--ifm-toc-border-color)] shadow-sm',
        'hover:shadow-md hover:-translate-y-0.5',
      )}
    >
      <div className="flex flex-col h-full justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <span
              className={clsx(
                'text-[10px] font-bold px-2.5 py-0.5 rounded-md border tracking-wider uppercase',
                DIFFICULTY_STYLES[problem.difficulty],
              )}
            >
              {problem.difficulty}
            </span>

            {/* Bookmark star — stops the Link navigation */}
            <button
              type="button"
              aria-label={isBookmarked ? `Remove ${problem.title} from bookmarks` : `Bookmark ${problem.title}`}
              aria-pressed={isBookmarked}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleBookmark(problem.id);
              }}
              className={clsx(
                'flex-shrink-0 p-0.5 rounded transition-colors',
                isBookmarked
                  ? 'text-amber-400'
                  : 'text-[var(--ifm-color-emphasis-400)] hover:text-amber-400',
              )}
            >
              <Star
                className="h-4 w-4 transition-transform duration-150 group-hover:scale-100"
                fill={isBookmarked ? 'currentColor' : 'none'}
                strokeWidth={2}
              />
            </button>
          </div>

          <h3 className="m-0 text-base font-bold tracking-tight transition-colors text-[var(--ifm-heading-color)] group-hover:text-[var(--ifm-color-primary)]">
            {problem.title}
          </h3>

          {problem.description && (
            <p className="m-0 mt-2 text-[var(--ifm-color-emphasis-700)] text-sm leading-relaxed line-clamp-2">
              {problem.description}
            </p>
          )}

          {visibleTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[var(--ifm-color-emphasis-100)] text-[var(--ifm-color-emphasis-700)]"
                >
                  {tagLabels.get(tag) ?? tag}
                </span>
              ))}
              {extraTagCount > 0 && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[var(--ifm-color-emphasis-100)] text-[var(--ifm-color-emphasis-600)]">
                  +{extraTagCount}
                </span>
              )}
            </div>
          )}

          {problem.companies && problem.companies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {problem.companies.map((company) => (
                <span
                  key={company}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                >
                  {company}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 font-semibold text-xs transition-colors text-[var(--ifm-color-emphasis-600)] group-hover:text-[var(--ifm-color-primary)]">
          <span>Solve problem</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
