import React from 'react';
import { render, screen } from '../testUtils';
import AlgorithmOfTheDaySection from '../../components/Homepage/AlgorithmOfTheDaySection';
import { algorithmsData } from '../../data/algorithmsData';

describe('AlgorithmOfTheDaySection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders deterministic daily algorithm and complexity metrics after mounting', () => {
    render(<AlgorithmOfTheDaySection />);

    // Check title and tagline
    expect(screen.getByText('Daily Asynchronous Routine')).toBeInTheDocument();
    expect(screen.getByText(/algorithm of the/i)).toBeInTheDocument();

    // Verify daily selection calculation
    const date = new Date();
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const expectedAlgo = algorithmsData[dayOfYear % algorithmsData.length];

    expect(screen.getByText(expectedAlgo.name)).toBeInTheDocument();
    expect(screen.getByText(expectedAlgo.description)).toBeInTheDocument();
    expect(screen.getByText(expectedAlgo.category)).toBeInTheDocument();

    // Complexity metrics
    expect(screen.getByText('Asymptotic Complexity')).toBeInTheDocument();
    expect(screen.getByText('Best Case')).toBeInTheDocument();
    expect(screen.getByText('Average Case')).toBeInTheDocument();
    expect(screen.getByText('Worst Case')).toBeInTheDocument();
    expect(screen.getByText('Space Bounds')).toBeInTheDocument();

    expect(screen.getAllByText(expectedAlgo.timeComplexity.best).length).toBeGreaterThan(0);
    expect(screen.getAllByText(expectedAlgo.timeComplexity.average).length).toBeGreaterThan(0);
    expect(screen.getAllByText(expectedAlgo.timeComplexity.worst).length).toBeGreaterThan(0);
    expect(screen.getAllByText(expectedAlgo.spaceComplexity).length).toBeGreaterThan(0);

    // Reference link
    const link = screen.getByRole('link', { name: /deep dive reference solutions/i });
    expect(link).toHaveAttribute('href', expectedAlgo.docLink);
  });
});
