import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { CatalogDoc } from '../data/docsCatalogTypes';

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

const CATEGORY_LABELS: Record<string, string> = {
  graphs: 'Graphs',
  extra: 'Algorithms & Data Structures',
  'basic-data-structures': 'Basic Data Structures',
  'data-structures': 'Data Structures',
  'programming-fundamentals': 'Programming Fundamentals',
};

const MAX_VISIBLE_TAGS = 3;

interface CatalogCardProps {
  doc: CatalogDoc;
  tagLabels: Map<string, string>;
}

export default function CatalogCard({ doc, tagLabels }: CatalogCardProps) {
  const visibleTags = doc.tags.slice(0, MAX_VISIBLE_TAGS);
  const extraTagCount = doc.tags.length - visibleTags.length;

  return (
    <Link
      to={doc.url}
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
                'text-[10px] font-bold px-2.5 py-0.5 rounded-md border tracking-wider uppercase inline-flex items-center gap-1',
                DIFFICULTY_STYLES[doc.difficulty],
              )}
            >
              {doc.difficulty}
              {doc.difficultySource === 'inferred' && (
                <Sparkles
                  className="h-2.5 w-2.5 opacity-60"
                  aria-label="Difficulty auto-inferred, not author-set"
                />
              )}
            </span>

            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--ifm-color-emphasis-100)] text-[var(--ifm-color-emphasis-600)] whitespace-nowrap">
              {CATEGORY_LABELS[doc.category] ?? doc.category}
            </span>
          </div>

          <h3 className="m-0 text-base font-bold tracking-tight transition-colors text-[var(--ifm-heading-color)] group-hover:text-[var(--ifm-color-primary)]">
            {doc.title}
          </h3>

          {doc.description && (
            <p className="m-0 mt-2 text-[var(--ifm-color-emphasis-700)] text-sm leading-relaxed line-clamp-2">
              {doc.description}
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
        </div>

        <div className="flex items-center gap-1 font-semibold text-xs transition-colors text-[var(--ifm-color-emphasis-600)] group-hover:text-[var(--ifm-color-primary)]">
          <span>Read doc</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
