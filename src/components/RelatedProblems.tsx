import React from 'react';
import Link from '@docusaurus/Link';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import dsaProblemsIndex from '../data/generated/dsaProblemsIndex.json';
import { toCanonicalSlug } from '../utils/slugUtils';

export interface DsaProblemIndexItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  companies: string[];
  url: string;
}

export interface DsaTagIndexItem {
  value: string;
  label: string;
}

export interface DsaProblemsIndexData {
  generatedAt: string;
  count: number;
  difficulties: string[];
  tags: DsaTagIndexItem[];
  companies: string[];
  problems: DsaProblemIndexItem[];
}

const indexData = dsaProblemsIndex as DsaProblemsIndexData;

// Create tag label lookup map
const TAG_LABEL_MAP: Record<string, string> = {};
(indexData.tags || []).forEach((t) => {
  TAG_LABEL_MAP[t.value] = t.label;
});

export function formatTagLabel(tagValue: string): string {
  if (TAG_LABEL_MAP[tagValue]) return TAG_LABEL_MAP[tagValue];
  return tagValue
    .split('-')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
    .join(' ');
}

function difficultyColor(difficulty: string): { bg: string; text: string; border: string } {
  switch (difficulty) {
    case 'Easy':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-500/20 dark:border-emerald-500/30',
      };
    case 'Hard':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-500/20 dark:border-rose-500/30',
      };
    case 'Medium':
    default:
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-500/20 dark:border-amber-500/30',
      };
  }
}

export function getRelatedDsaProblems(
  currentDoc: {
    id?: string;
    permalink?: string;
    title?: string;
    tags?: Array<{ label?: string; [key: string]: any } | string>;
  },
  data: DsaProblemsIndexData = indexData,
  limit: number = 3
): { problem: DsaProblemIndexItem; sharedTags: string[] }[] {
  if (!currentDoc || !data || !data.problems) return [];

  const permalink = currentDoc.permalink || '';
  const docId = currentDoc.id || '';

  // Check if current doc is a DSA problem doc
  const isDsaProblemDoc =
    permalink.includes('/docs/dsa-problems/') ||
    docId.startsWith('dsa-problems/') ||
    data.problems.some((p) => p.url === permalink || (permalink && permalink.endsWith('/' + p.url.replace(/^\//, ''))));

  if (!isDsaProblemDoc) return [];

  // Match current problem in index
  const currentProblem = data.problems.find(
    (p) =>
      p.url === permalink ||
      (permalink && permalink.endsWith('/' + p.url.replace(/^\//, ''))) ||
      p.id === docId ||
      (docId && docId.endsWith('/' + p.id.replace(/^\//, '')))
  );

  let targetTags: string[] = [];
  if (currentProblem && currentProblem.tags && currentProblem.tags.length > 0) {
    targetTags = currentProblem.tags;
  } else if (currentDoc.tags && Array.isArray(currentDoc.tags)) {
    targetTags = currentDoc.tags
      .map((t) => {
        const raw = typeof t === 'string' ? t : t.label || '';
        return toCanonicalSlug(raw);
      })
      .filter(Boolean);
  }

  if (targetTags.length === 0) return [];

  const currentId = currentProblem ? currentProblem.id : docId;

  const matches: { problem: DsaProblemIndexItem; sharedTags: string[]; score: number }[] = [];

  for (const p of data.problems) {
    if (p.id === currentId || p.url === permalink) continue;

    const shared = p.tags.filter((t) => targetTags.includes(t));
    if (shared.length > 0) {
      let score = shared.length * 10;
      if (currentProblem && p.difficulty === currentProblem.difficulty) {
        score += 2;
      }
      matches.push({
        problem: p,
        sharedTags: shared,
        score,
      });
    }
  }

  matches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.problem.title.localeCompare(b.problem.title);
  });

  return matches.slice(0, limit).map((m) => ({
    problem: m.problem,
    sharedTags: m.sharedTags,
  }));
}

export default function RelatedProblems(): React.ReactElement | null {
  const { metadata } = useDoc();

  const related = getRelatedDsaProblems(metadata);

  if (related.length === 0) return null;

  return (
    <div className="no-print margin-top--lg pt-6 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0 tracking-tight leading-snug">
              Related Practice Problems
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0 font-medium">
              Handpicked problems sharing similar algorithmic topic tags
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map(({ problem, sharedTags }) => {
          const diffStyle = difficultyColor(problem.difficulty);

          return (
            <Link
              key={problem.id}
              to={problem.url}
              className="group relative flex flex-col justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 no-underline decoration-none"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border}`}
                  >
                    {problem.difficulty}
                  </span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {sharedTags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        #{formatTagLabel(tag)}
                      </span>
                    ))}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {problem.title}
                </h4>

                {problem.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 m-0 line-clamp-2 leading-relaxed font-normal">
                    {problem.description}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>Solve Problem</span>
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
