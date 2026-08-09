import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HeroSection from '../../components/Homepage/HeroSection';

jest.mock('@docusaurus/Link', () =>
  ({ to, children, ...rest }: { to: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={to} {...rest}>{children}</a>
  )
);

describe('HeroSection', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    jest.restoreAllMocks();
    global.fetch = originalFetch;
  });

  it('renders hero title and fallback stats initially', () => {
    global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));

    render(<HeroSection />);

    expect(screen.getByText('Data Structures & Algorithms')).toBeInTheDocument();
    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(screen.getByText('300+')).toBeInTheDocument();
  });

  it('fetches live repository metrics from GitHub REST API and updates stats', async () => {
    const mockRepoData = {
      stargazers_count: 1250,
      forks_count: 450,
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockRepoData,
    });

    render(<HeroSection />);

    await waitFor(() => {
      expect(screen.getByText('1,250+')).toBeInTheDocument();
      expect(screen.getByText('450+')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/ajay-dhangar/algo',
      expect.objectContaining({
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
    );
  });

  it('handles fetch error gracefully and keeps fallback stats', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 403,
    });

    render(<HeroSection />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching live repository metrics:',
        expect.any(Error)
      );
    });

    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(screen.getByText('300+')).toBeInTheDocument();
  });
});
