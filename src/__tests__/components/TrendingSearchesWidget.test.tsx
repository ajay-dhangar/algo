import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as algoliaAnalytics from '../../utils/algoliaAnalytics';
import TrendingSearchesWidget from '../../components/Homepage/TrendingSearchesWidget';

jest.mock('@docusaurus/Link', () =>
  ({ to, children, ...rest }: { to: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={to} {...rest}>{children}</a>
  )
);

const mockResponse = {
  hits: [
    { query: 'binary search', nbSearches: 142 },
    { query: 'merge sort', nbSearches: 105 },
    { query: 'dijkstra algorithm', nbSearches: 84 },
  ],
};

beforeEach(() => {
  (global as any).fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockResponse,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
  delete (global as any).fetch;
});

describe('TrendingSearchesWidget', () => {
  it('renders trending searches chips when analytics returns results', async () => {
    jest.spyOn(algoliaAnalytics, 'useAlgoliaAnalyticsConfig').mockReturnValue({
      appId: 'T0I3F584D5',
      apiKey: 'test-analytics-key',
      indexName: 'ajay-dhangario',
    });

    render(<TrendingSearchesWidget />);

    await waitFor(() => {
      expect(screen.getByText('Trending searches on Algo')).toBeInTheDocument();
    });

    expect(screen.getByText('binary search')).toBeInTheDocument();
    expect(screen.getByText('merge sort')).toBeInTheDocument();
    expect(screen.getByText('dijkstra algorithm')).toBeInTheDocument();
  });

  it('does not render when no config is available', () => {
    jest.spyOn(algoliaAnalytics, 'useAlgoliaAnalyticsConfig').mockReturnValue(null);

    const { container } = render(<TrendingSearchesWidget />);
    expect(container.firstChild).toBeNull();
  });
});
