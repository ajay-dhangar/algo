import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowLeft, Clock, GitFork, Cpu } from 'lucide-react';

export interface VisualizerComingSoonProps {
  /** Page <title> shown in browser tab */
  title: string;
  /** Algorithm display name */
  algorithmName: string;
  /** One-sentence description shown as the sub-heading */
  description: string;
  /** Up to 3 key facts (time / space complexity, key property, etc.) */
  facts?: { label: string; value: string }[];
  /** Link back to the category hub page */
  categoryHref: string;
  /** Human-readable name of the category */
  categoryLabel: string;
  /** Accent colour key — controls the pill + border tint */
  accent?: 'teal' | 'sky' | 'emerald' | 'amber' | 'fuchsia' | 'rose' | 'indigo' | 'slate' | 'violet';
}

const accentMap: Record<string, { pill: string; border: string; text: string; glow: string }> = {
  teal:    { pill: 'bg-teal-500/10 border-teal-500/20 text-teal-600 dark:text-teal-300',    border: 'border-teal-500/30',    text: 'text-teal-500',    glow: 'via-teal-500' },
  sky:     { pill: 'bg-sky-500/10 border-sky-500/20 text-sky-600 dark:text-sky-300',        border: 'border-sky-500/30',     text: 'text-sky-500',     glow: 'via-sky-500'  },
  emerald: { pill: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300', border: 'border-emerald-500/30', text: 'text-emerald-500', glow: 'via-emerald-500' },
  amber:   { pill: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-300',  border: 'border-amber-500/30',   text: 'text-amber-500',   glow: 'via-amber-500'  },
  fuchsia: { pill: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-300', border: 'border-fuchsia-500/30', text: 'text-fuchsia-500', glow: 'via-fuchsia-500' },
  rose:    { pill: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-300',      border: 'border-rose-500/30',    text: 'text-rose-500',    glow: 'via-rose-500'   },
  indigo:  { pill: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-300', border: 'border-indigo-500/30',  text: 'text-indigo-500',  glow: 'via-indigo-500' },
  slate:   { pill: 'bg-slate-500/10 border-slate-500/20 text-slate-600 dark:text-slate-300',  border: 'border-slate-500/30',   text: 'text-slate-500',   glow: 'via-slate-500'  },
  violet:  { pill: 'bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-300', border: 'border-violet-500/30',  text: 'text-violet-500',  glow: 'via-violet-500' },
};

export default function VisualizerComingSoon({
  title,
  algorithmName,
  description,
  facts = [],
  categoryHref,
  categoryLabel,
  accent = 'teal',
}: VisualizerComingSoonProps) {
  const colors = accentMap[accent] ?? accentMap.teal;

  return (
    <Layout title={title} description={description}>
      <div className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 overflow-hidden bg-[var(--ifm-background-color)]">

        {/* Grid Backdrop */}
        <div
          className="absolute inset-0 opacity-[0.18] dark:opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, var(--ifm-toc-border-color) 1px, transparent 1px),
                              linear-gradient(to bottom, var(--ifm-toc-border-color) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient glow */}
        <div className="absolute -top-24 left-1/3 w-80 h-80 bg-[var(--ifm-color-primary)] opacity-[0.08] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 right-1/3 w-80 h-80 bg-indigo-500 opacity-[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-2xl z-10">

          {/* Back link */}
          <div className="mb-8 text-center">
            <Link
              to={categoryHref}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ifm-color-emphasis-600)] hover:text-[var(--ifm-color-primary)] no-underline hover:no-underline transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to {categoryLabel}
            </Link>
          </div>

          {/* Card */}
          <div className={`relative p-8 md:p-12 rounded-3xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-background-surface-color)] shadow-xl overflow-hidden hover:${colors.border} transition-colors duration-300`}>

            {/* Top gradient bar */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent ${colors.glow} to-transparent opacity-60`} />

            {/* Status pill */}
            <div className="flex justify-center mb-6">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-tight border ${colors.pill}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
                </span>
                VISUALIZER_UNDER_CONSTRUCTION
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-center text-[var(--ifm-heading-color)]">
              {algorithmName}
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-[var(--ifm-color-emphasis-700)] max-w-lg mx-auto leading-relaxed mb-10 text-center">
              {description}
            </p>

            {/* Complexity / key facts grid */}
            {facts.length > 0 && (
              <div className={`grid grid-cols-${Math.min(facts.length, 3)} gap-3 max-w-md mx-auto mb-10`}>
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] text-center"
                  >
                    <span className={`text-base font-black font-mono ${colors.text}`}>{f.value}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ifm-color-emphasis-600)]">{f.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* What to expect section */}
            <div className="border border-[var(--ifm-toc-border-color)] rounded-2xl p-5 mb-10 bg-[var(--ifm-card-background-color)]">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="h-4 w-4 text-[var(--ifm-color-emphasis-600)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--ifm-color-emphasis-600)]">
                  What the Visualizer Will Show
                </span>
              </div>
              <ul className="m-0 p-0 list-none space-y-2">
                <li className="flex items-start gap-2 text-sm text-[var(--ifm-color-emphasis-700)]">
                  <span className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-current ${colors.text}`} />
                  Step-by-step animated execution of every comparison and swap
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--ifm-color-emphasis-700)]">
                  <span className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-current ${colors.text}`} />
                  Adjustable speed controls and pause / resume
                </li>
                <li className="flex items-start gap-2 text-sm text-[var(--ifm-color-emphasis-700)]">
                  <span className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-current ${colors.text}`} />
                  Live complexity counter and operation log
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[var(--ifm-toc-border-color)] pt-8">
              <Link
                to={categoryHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border border-transparent bg-[var(--ifm-color-primary)] text-white hover:text-white hover:bg-[var(--ifm-color-primary-dark)] no-underline hover:no-underline shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {categoryLabel}
              </Link>

              <Link
                to="https://github.com/Saatvik-GT/xaytheon/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border border-[var(--ifm-toc-border-color)] text-[var(--ifm-color-emphasis-700)] hover:text-[var(--ifm-color-emphasis-900)] bg-transparent hover:bg-[var(--ifm-card-background-color)] no-underline hover:no-underline transition-all"
              >
                <GitFork className="h-4 w-4" />
                Contribute Visualizer
              </Link>

              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--ifm-color-emphasis-500)] select-none">
                <Clock className="h-3.5 w-3.5" />
                <span>In Progress</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
