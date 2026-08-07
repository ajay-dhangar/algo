import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import { Search, ArrowUpRight } from 'lucide-react';
import Link from '@docusaurus/Link';
import docsCatalogIndex from '@site/src/data/generated/docsCatalogIndex.json';

interface DocCatalogItem {
  id: string;
  title: string;
  description: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  tags: string[];
  permalink: string;
}

interface DocsCatalogIndex {
  generatedAt: string;
  items: DocCatalogItem[];
  difficulties: Array<'Easy' | 'Medium' | 'Hard'>;
  topics: string[];
  tags: string[];
}

const data = docsCatalogIndex as DocsCatalogIndex;

const DIFFICULTY_LABELS: Record<string, string> = {
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
};

function formatArray(items: string[]) {
  return items.join(', ');
}

export default function DocsCatalogPage() {
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [sortBy, setSortBy] = useState<'title' | 'difficulty'>('title');

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.items.filter((item) => {
      if (selectedDifficulty && item.difficulty !== selectedDifficulty) {
        return false;
      }
      if (selectedTopic && !item.topics.includes(selectedTopic)) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.topics.some((topic) => topic.toLowerCase().includes(query)) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [search, selectedDifficulty, selectedTopic]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      if (sortBy === 'difficulty') {
        const diffOrder = ['Easy', 'Medium', 'Hard'];
        const aIndex = a.difficulty ? diffOrder.indexOf(a.difficulty) : diffOrder.length;
        const bIndex = b.difficulty ? diffOrder.indexOf(b.difficulty) : diffOrder.length;
        if (aIndex !== bIndex) return aIndex - bIndex;
      }
      return a.title.localeCompare(b.title);
    });
  }, [filteredItems, sortBy]);

  return (
    <Layout title="Docs Catalog" description="Browse algorithm docs by difficulty and topic.">
      <main className="container margin-vert--xl px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight mb-4">Docs Catalog</h1>
          <p className="text-[var(--ifm-color-emphasis-700)] max-w-3xl">
            Browse published algorithm docs by difficulty, topic, and tags. Use search and filters to find the docs you need faster.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end mb-6">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 text-[var(--ifm-color-emphasis-500)] -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search docs by title, tag, or topic..."
              className="w-full rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] py-3 pl-10 pr-4 text-sm text-[var(--ifm-font-color-base)] outline-none focus:border-[var(--ifm-color-primary)] transition-colors"
              type="search"
            />
          </label>

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ifm-color-emphasis-600)] mb-2 block">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] py-3 px-4 text-sm text-[var(--ifm-font-color-base)] outline-none focus:border-[var(--ifm-color-primary)] transition-colors"
              >
                <option value="">All difficulties</option>
                {data.difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>{DIFFICULTY_LABELS[difficulty]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ifm-color-emphasis-600)] mb-2 block">Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] py-3 px-4 text-sm text-[var(--ifm-font-color-base)] outline-none focus:border-[var(--ifm-color-primary)] transition-colors"
              >
                <option value="">All topics</option>
                {data.topics.map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ifm-color-emphasis-600)] mb-2 block">Sort</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'title' | 'difficulty')}
                className="w-full rounded-xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] py-3 px-4 text-sm text-[var(--ifm-font-color-base)] outline-none focus:border-[var(--ifm-color-primary)] transition-colors"
              >
                <option value="title">Title</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {sortedItems.length > 0 ? (
            sortedItems.map((item) => (
              <article key={item.id} className="group rounded-3xl border border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2 text-[var(--ifm-heading-color)]">
                      <Link to={item.permalink} className="hover:text-[var(--ifm-color-primary)]">
                        {item.title}
                      </Link>
                    </h2>
                    <div className="flex flex-wrap gap-2 items-center text-xs text-[var(--ifm-color-emphasis-600)]">
                      {item.difficulty && (
                        <span className="rounded-full border px-3 py-1 uppercase tracking-[0.18em] text-[var(--ifm-color-emphasis-700)]">
                          {item.difficulty}
                        </span>
                      )}
                      {item.topics.length > 0 && (
                        <span className="rounded-full border px-3 py-1 uppercase tracking-[0.18em] text-[var(--ifm-color-emphasis-700)]">
                          {formatArray(item.topics)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--ifm-color-primary)]">
                    <span>View doc</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-4 text-[var(--ifm-color-emphasis-700)] leading-relaxed">{item.description}</p>
                {item.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--ifm-color-emphasis-100)] text-[var(--ifm-color-emphasis-700)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-[var(--ifm-toc-border-color)] bg-[var(--ifm-card-background-color)] p-10 text-center text-[var(--ifm-color-emphasis-700)]">
              No docs match the selected filters.
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
