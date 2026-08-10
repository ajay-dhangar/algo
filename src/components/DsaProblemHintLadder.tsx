import React, { useMemo } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useProblemHintLadder, type HintStages } from '../hooks/useProblemHintLadder';

const STAGE_ORDER: Array<keyof HintStages> = ['nudge', 'approach', 'pseudocode', 'fullSolution'];
const STAGE_LABELS: Record<keyof HintStages, string> = {
  nudge: 'Nudge',
  approach: 'Approach Outline',
  pseudocode: 'Pseudocode',
  fullSolution: 'Full Solution',
};

interface StageInfo {
  key: keyof HintStages;
  label: string;
  content: string;
}

function normalizeHintStages(frontMatter: any): HintStages {
  if (!frontMatter || typeof frontMatter !== 'object') return {};

  const rawStages = frontMatter.hintStages;
  if (rawStages && typeof rawStages === 'object' && !Array.isArray(rawStages)) {
    return {
      nudge: typeof rawStages.nudge === 'string' ? rawStages.nudge.trim() : '',
      approach: typeof rawStages.approach === 'string' ? rawStages.approach.trim() : '',
      pseudocode: typeof rawStages.pseudocode === 'string' ? rawStages.pseudocode.trim() : '',
      fullSolution:
        typeof rawStages.fullSolution === 'string'
          ? rawStages.fullSolution.trim()
          : typeof rawStages.full_solution === 'string'
          ? rawStages.full_solution.trim()
          : '',
    };
  }

  // Fallback support for legacy hint frontmatter.
  return {
    nudge: typeof frontMatter.hint === 'string' ? frontMatter.hint.trim() : '',
    approach: typeof frontMatter.approach === 'string' ? frontMatter.approach.trim() : '',
    pseudocode: typeof frontMatter.pseudocode === 'string' ? frontMatter.pseudocode.trim() : '',
    fullSolution:
      typeof frontMatter.fullSolution === 'string'
        ? frontMatter.fullSolution.trim()
        : typeof frontMatter.full_solution === 'string'
        ? frontMatter.full_solution.trim()
        : '',
  };
}

function getProblemId(metadata: any): string {
  if (!metadata) return '';
  const id = metadata.id || metadata.frontMatter?.id || '';
  return String(id).replace(/^dsa-problems\//, '');
}

function isDsaProblemDoc(metadata: any): boolean {
  const permalink = metadata?.permalink || '';
  const id = metadata?.id || '';
  return typeof permalink === 'string'
    ? permalink.includes('/docs/dsa-problems/')
    : typeof id === 'string'
    ? id.startsWith('dsa-problems/')
    : false;
}

function renderHintContent(content: string) {
  return content.split('\n').map((line, index) => (
    <p key={index} className="m-0 leading-relaxed">
      {line}
    </p>
  ));
}

// Inner component — all hooks are called unconditionally at the top level.
// The outer DsaProblemHintLadder guard ensures this only mounts for DSA problem docs.
function DsaProblemHintLadderInner({ metadata }: { metadata: any }) {
  const hintStages = normalizeHintStages(metadata.frontMatter);

  const availableStages: StageInfo[] = useMemo(
    () =>
      STAGE_ORDER.reduce<StageInfo[]>((acc, key) => {
        const content = String(hintStages[key] ?? '').trim();
        if (content) {
          acc.push({ key, label: STAGE_LABELS[key], content });
        }
        return acc;
      }, []),
    [hintStages]
  );

  const problemId = getProblemId(metadata);
  const {
    currentStageIndex,
    canRevealNextStage,
    hasSeenHint,
    isFullyRevealed,
    revealNextStage,
    resetHintLadder,
  } = useProblemHintLadder(problemId, availableStages.length);

  if (availableStages.length === 0) return null;

  const currentStage = currentStageIndex >= 0 ? availableStages[currentStageIndex] : null;
  const nextStage = availableStages[currentStageIndex + 1];

  return (
    <section className="my-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Progressive Hint Ladder
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            {hasSeenHint ? 'Continue your hint path' : 'Need a hint?'}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Reveal guidance in stages to preserve problem-solving practice. Hint usage is tracked separately from solved status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {availableStages.map((stage, index) => (
            <span
              key={stage.key}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                index <= currentStageIndex
                  ? 'border-blue-500 bg-blue-500/10 text-blue-700 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-200'
                  : 'border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${index <= currentStageIndex ? 'bg-blue-500' : 'bg-slate-300'}`} />
              {stage.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {currentStage ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{currentStage.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">What this stage gives you</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Stage {currentStageIndex + 1} / {availableStages.length}
              </span>
            </div>
            <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
              {renderHintContent(currentStage.content)}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 p-5 text-slate-700 dark:text-slate-300">
            <p className="text-sm leading-relaxed">
              Start with a gentle nudge, then reveal additional guidance progressively as you work through the problem.
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={revealNextStage}
            disabled={!canRevealNextStage}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
          >
            {canRevealNextStage
              ? currentStage
                ? `Reveal ${nextStage?.label ?? 'next stage'}`
                : `Reveal ${availableStages[0].label}`
              : 'All hint stages revealed'}
          </button>

          {hasSeenHint && (
            <button
              type="button"
              onClick={resetHintLadder}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-transparent px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
            >
              Reset hint progress
            </button>
          )}
        </div>

        {isFullyRevealed && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You've reached the full solution stage. Try solving the problem again without hints to build stronger unaided recall.
          </p>
        )}
      </div>
    </section>
  );
}

// Outer guard — calls useDoc (the only hook here) unconditionally, then
// delegates to the inner component only when the current doc is a DSA problem.
export default function DsaProblemHintLadder() {
  const { metadata } = useDoc();
  if (!isDsaProblemDoc(metadata)) return null;
  return <DsaProblemHintLadderInner metadata={metadata} />;
}
