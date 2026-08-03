import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useAlgoliaAnalyticsConfig, buildTrendingSearchesUrl, buildTrendingSearchesHeaders, parseTrendingSearches, TrendingSearchHit } from '../../utils/algoliaAnalytics';

const TrendingSearchesWidget: React.FC = () => {
  const config = useAlgoliaAnalyticsConfig();
  const [items, setItems] = useState<TrendingSearchHit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!config) {
      setError('Trending searches are unavailable.');
      return;
    }

    const controller = new AbortController();
    const url = buildTrendingSearchesUrl(config);

    setLoading(true);
    fetch(url, {
      method: 'GET',
      headers: buildTrendingSearchesHeaders(config),
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Analytics fetch failed (${response.status})`);
        }
        const json = await response.json();
        return json;
      })
      .then((json) => {
        const parsed = parseTrendingSearches(json);
        if (parsed.length === 0) {
          throw new Error('No trending queries were found.');
        }
        setItems(parsed);
      })
      .catch((fetchError: Error) => {
        if (controller.signal.aborted) return;
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [config]);

  if (!config || error) {
    return null;
  }

  if (loading && items.length === 0) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-10 px-4 bg-white dark:bg-gray-950 rounded-[32px] border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            People are searching for…
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Trending searches on Algo
          </h2>
        </div>
        <Link
          to="/docs/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-900"
        >
          Browse docs
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <Link
            key={item.query}
            to={`/docs/search?query=${encodeURIComponent(item.query)}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            <span>{item.query}</span>
            {item.count !== undefined && (
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[0.7rem] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {item.count}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingSearchesWidget;
