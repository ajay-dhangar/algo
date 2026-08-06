import React from 'react';
import Layout from '@theme/Layout';
import { LayoutGrid, ListChecks } from 'lucide-react';
import Link from '@docusaurus/Link';
import CatalogFilterGrid from '../../components/CatalogFilterGrid';
import docsCatalogIndex from '../../data/generated/docsCatalogIndex.json';
import type { DocsCatalogIndex } from '../../data/docsCatalogTypes';

const data = docsCatalogIndex as DocsCatalogIndex;

export default function DocsCatalog() {
  return (
    <Layout
      title="Catalog"
      description={`Browse and filter ${data.count} algorithm and data structure docs by difficulty and topic.`}
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
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>{data.count} Docs Indexed</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-[var(--ifm-heading-color)]">
            Algorithm &amp; Data Structure <span className="text-[var(--ifm-color-primary)]">Catalog</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--ifm-color-emphasis-700)] max-w-2xl m-0 leading-relaxed">
            Browse every algorithm and data structure doc by difficulty and topic — e.g. "all Medium graph
            algorithms" — instead of digging through the sidebar tree.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--ifm-color-primary-lighter)] text-[var(--ifm-color-primary-darker)] dark:bg-[var(--ifm-color-primary-darker)] dark:text-white border border-[var(--ifm-color-primary-light)] font-semibold text-sm">
            <ListChecks className="h-4 w-4" />
            <span>Looking for interview problems instead?</span>
            <Link
              href="/dsa-problems"
              className="font-bold hover:underline ml-1"
              style={{ color: 'currentColor' }}
            >
              Browse DSA Problems →
            </Link>
          </div>
        </div>
      </header>

      <main className="container margin-vert--xl px-4">
        <CatalogFilterGrid data={data} />

        <p className="text-xs text-[var(--ifm-color-emphasis-500)] mt-10 text-center">
          Difficulty marked with ✨ is auto-inferred from the title/topics, not set by the doc's author yet.{' '}
          <a
            href="https://github.com/ajay-dhangar/algo/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--ifm-color-primary)' }}
          >
            Add a <code>difficulty:</code> field to a doc's frontmatter
          </a>{' '}
          to make it official.
        </p>
      </main>
    </Layout>
  );
}
