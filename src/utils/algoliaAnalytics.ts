import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export interface AlgoliaAnalyticsConfig {
  appId: string;
  apiKey: string;
  indexName: string;
}

export const useAlgoliaAnalyticsConfig = (): AlgoliaAnalyticsConfig | null => {
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields ?? {};

  const appId = (customFields.algoliaAnalyticsAppId as string) || '';
  const apiKey = (customFields.algoliaAnalyticsApiKey as string) || '';
  const indexName = (customFields.algoliaAnalyticsIndexName as string) || '';

  if (!appId || !apiKey || !indexName) {
    return null;
  }

  return {
    appId,
    apiKey,
    indexName,
  };
};

export type TrendingSearchHit = {
  query: string;
  count?: number;
  avgHits?: number;
};

const normalizeAnalyticsHit = (hit: Record<string, unknown>): TrendingSearchHit | null => {
  const query =
    typeof hit.query === 'string'
      ? hit.query
      : typeof hit.search === 'string'
      ? hit.search
      : typeof hit.term === 'string'
      ? hit.term
      : typeof hit.q === 'string'
      ? hit.q
      : typeof hit.name === 'string'
      ? hit.name
      : null;

  if (!query || query.trim().length === 0) {
    return null;
  }

  const count =
    typeof hit.nbSearches === 'number'
      ? hit.nbSearches
      : typeof hit.nbHits === 'number'
      ? hit.nbHits
      : typeof hit.searches === 'number'
      ? hit.searches
      : typeof hit.nb_clicks === 'number'
      ? hit.nb_clicks
      : undefined;

  const avgHits =
    typeof hit.avgHits === 'number'
      ? hit.avgHits
      : typeof hit.averageHits === 'number'
      ? hit.averageHits
      : undefined;

  return {
    query: query.trim(),
    count,
    avgHits,
  };
};

export const parseTrendingSearches = (response: unknown): TrendingSearchHit[] => {
  if (!response || typeof response !== 'object') {
    return [];
  }

  const json = response as Record<string, unknown>;
  const hits = Array.isArray(json.hits)
    ? json.hits
    : Array.isArray(json.items)
    ? json.items
    : [];

  return hits
    .flatMap((hit) => {
      if (typeof hit !== 'object' || hit === null) {
        return [];
      }
      const normalized = normalizeAnalyticsHit(hit as Record<string, unknown>);
      return normalized ? [normalized] : [];
    })
    .filter((item, index, all) => {
      return all.findIndex((candidate) => candidate.query === item.query) === index;
    })
    .slice(0, 8);
};

export const buildTrendingSearchesUrl = (config: AlgoliaAnalyticsConfig): string => {
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const endDate = new Date().toISOString().slice(0, 10);
  const params = new URLSearchParams({
    indexName: config.indexName,
    sort: 'searches',
    startDate,
    endDate,
    hitsPerPage: '8',
    page: '0',
  });
  return `https://analytics.algolia.com/2/searches?${params.toString()}`;
};

export const buildTrendingSearchesHeaders = (config: AlgoliaAnalyticsConfig): Record<string, string> => ({
  'x-algolia-application-id': config.appId,
  'x-algolia-api-key': config.apiKey,
  'Content-Type': 'application/json',
});
