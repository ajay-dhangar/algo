import React from 'react';
import Layout from '@theme/Layout';
import { ListChecks, BookOpen } from 'lucide-react';
import Link from '@docusaurus/Link';
import ProblemFilterGrid from '../../components/ProblemFilterGrid';
import dsaProblemsIndex from '../../data/generated/dsaProblemsIndex.json';
import type { DsaProblemsIndex } from '../../data/dsaProblemsTypes';

const data = dsaProblemsIndex as DsaProblemsIndex;

export default function DsaProblemsBrowser() {
  return (
    <Layout
      title="Browse DSA Problems"
      description={`Filter and search ${data.count} DSA problems by difficulty and topic.`}
    >
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
            <ListChecks className="h-3.5 w-3.5" />
            <span>{data.count} Problems Indexed</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[var(--ifm-heading-color)]">
            Browse <span className="text-[var(--ifm-color-primary)]">DSA Problems</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--ifm-color-emphasis-700)] max-w-2xl m-0 leading-relaxed">
            Search by title, filter by difficulty, and narrow down by topic to find the problem you want to
            practice next.
          </p>

          {/* CTA to Company Tracks */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--ifm-color-primary-lighter)] text-[var(--ifm-color-primary-darker)] dark:bg-[var(--ifm-color-primary-darker)] dark:text-white border border-[var(--ifm-color-primary-light)] font-semibold text-sm">
            <BookOpen className="h-4 w-4" />
            <span>Looking for a structured path?</span>
            <Link
              href="/dsa-problems/tracks"
              className="font-bold hover:underline ml-1"
              style={{ color: 'currentColor' }}
            >
              Explore Company Tracks →
            </Link>
          </div>
        </div>
      </header>

      <main className="container margin-vert--xl px-4">
        <ProblemFilterGrid data={data} />
      </main>
    </Layout>
  );
}
