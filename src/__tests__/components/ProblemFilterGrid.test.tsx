import React from 'react';
import { render, screen } from '../testUtils';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProblemFilterGrid from '../../components/ProblemFilterGrid';
import type { DsaProblemsIndex } from '../../data/dsaProblemsTypes';

const mockData: DsaProblemsIndex = {
  generatedAt: '2026-01-01T00:00:00.000Z',
  count: 3,
  difficulties: ['Easy', 'Medium', 'Hard'],
  tags: [
    { value: 'array', label: 'Array' },
    { value: 'graph', label: 'Graph' },
    { value: 'dp', label: 'DP' },
  ],
  companies: [],
  problems: [
    {
      id: 'two-sum',
      title: 'Two Sum',
      description: 'Find two numbers that add up to a target.',
      difficulty: 'Easy',
      tags: ['array'],
      companies: [],
      url: '/docs/dsa-problems/easy/two-sum',
    },
    {
      id: 'course-schedule',
      title: 'Course Schedule',
      description: 'Determine if you can finish all courses given prerequisites.',
      difficulty: 'Medium',
      tags: ['graph'],
      companies: [],
      url: '/docs/dsa-problems/medium/course-schedule',
    },
    {
      id: 'edit-distance',
      title: 'Edit Distance',
      description: 'Find the minimum number of operations to convert one string to another.',
      difficulty: 'Hard',
      tags: ['dp', 'array'],
      companies: [],
      url: '/docs/dsa-problems/hard/edit-distance',
    },
  ],
};

describe('ProblemFilterGrid', () => {
  test('renders all problems by default', () => {
    render(<ProblemFilterGrid data={mockData} />);

    expect(screen.getByText('Two Sum')).toBeInTheDocument();
    expect(screen.getByText('Course Schedule')).toBeInTheDocument();
    expect(screen.getByText('Edit Distance')).toBeInTheDocument();
    expect(screen.getByText(/showing/i)).toHaveTextContent('Showing 3 of 3 problems');
  });

  test('filters by difficulty', async () => {
    const user = userEvent.setup();
    render(<ProblemFilterGrid data={mockData} />);

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Easy' }));
    });

    expect(screen.getByText('Two Sum')).toBeInTheDocument();
    expect(screen.queryByText('Course Schedule')).not.toBeInTheDocument();
    expect(screen.queryByText('Edit Distance')).not.toBeInTheDocument();
  });

  test('filters by topic tag', async () => {
    const user = userEvent.setup();
    render(<ProblemFilterGrid data={mockData} />);

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Graph' }));
    });

    expect(screen.getByText('Course Schedule')).toBeInTheDocument();
    expect(screen.queryByText('Two Sum')).not.toBeInTheDocument();
    expect(screen.queryByText('Edit Distance')).not.toBeInTheDocument();
  });

  test('combines difficulty, tag, and search filters', async () => {
    const user = userEvent.setup();
    render(<ProblemFilterGrid data={mockData} />);

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Hard' }));
      await user.click(screen.getByRole('button', { name: 'DP' }));
      await user.type(screen.getByPlaceholderText(/search problems/i), 'Edit');
    });

    expect(screen.getByText('Edit Distance')).toBeInTheDocument();
    expect(screen.queryByText('Two Sum')).not.toBeInTheDocument();
    expect(screen.queryByText('Course Schedule')).not.toBeInTheDocument();
  });

  test('shows an empty state and can clear filters', async () => {
    const user = userEvent.setup();
    render(<ProblemFilterGrid data={mockData} />);

    await act(async () => {
      await user.type(screen.getByPlaceholderText(/search problems/i), 'nonexistent problem');
    });

    expect(screen.getByText(/no problems match these filters/i)).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getAllByRole('button', { name: /clear filters/i })[0]);
    });

    expect(screen.getByText('Two Sum')).toBeInTheDocument();
    expect(screen.getByText('Course Schedule')).toBeInTheDocument();
    expect(screen.getByText('Edit Distance')).toBeInTheDocument();
  });
});
