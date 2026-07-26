import React from 'react';
import { render, screen, fireEvent, waitFor } from '../testUtils';
import SortingChallengeLayout from '../../components/SortingChallengeLayout';
import { mockSortingChallenge } from '../testUtils';

describe('SortingChallengeLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders initial problem details, title, difficulty badge, and constraints', () => {
    render(<SortingChallengeLayout challenge={mockSortingChallenge} />);

    expect(screen.getByText('Back to Challenges')).toBeInTheDocument();
    expect(screen.getAllByText(mockSortingChallenge.title).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('heading', { level: 1, name: mockSortingChallenge.title })).toBeInTheDocument();

    const difficultyBadge = screen.getByText('Medium');
    expect(difficultyBadge).toBeInTheDocument();

    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('Sort an array of integers using bubble sort.')).toBeInTheDocument();
    expect(screen.getByText('1 <= arr.length <= 100')).toBeInTheDocument();
    expect(screen.getAllByText('O(N^2)').length).toBeGreaterThan(0);
  });

  test('switches tabs between problem and solution', () => {
    render(<SortingChallengeLayout challenge={mockSortingChallenge} />);

    const problemTab = screen.getByRole('button', { name: /problem/i });
    const solutionTab = screen.getByRole('button', { name: /solution/i });

    expect(problemTab).toHaveClass('border-indigo-500');

    fireEvent.click(solutionTab);
    expect(solutionTab).toHaveClass('border-indigo-500');
    expect(screen.getByRole('heading', { name: /solution/i })).toBeInTheDocument();

    fireEvent.click(problemTab);
    expect(screen.getByText('Sort an array of integers using bubble sort.')).toBeInTheDocument();
  });

  test('toggles hint visibility', () => {
    render(<SortingChallengeLayout challenge={mockSortingChallenge} />);

    const hintButton = screen.getByRole('button', { name: /show hint/i });
    expect(screen.queryByText(mockSortingChallenge.hint)).not.toBeInTheDocument();

    fireEvent.click(hintButton);
    expect(screen.getByText('Hide Hint')).toBeInTheDocument();
    expect(screen.getByText(mockSortingChallenge.hint)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /hide hint/i }));
    expect(screen.queryByText(mockSortingChallenge.hint)).not.toBeInTheDocument();
  });

  test('toggles solution reveal in the Solution tab', () => {
    const { container } = render(<SortingChallengeLayout challenge={mockSortingChallenge} />);

    fireEvent.click(screen.getByRole('button', { name: /solution/i }));

    const revealButton = screen.getByRole('button', { name: /reveal/i });
    expect(container.querySelector('[data-testid="monaco-diff-editor"]')).not.toBeInTheDocument();

    fireEvent.click(revealButton);
    expect(screen.getByRole('button', { name: /hide/i })).toBeInTheDocument();
    expect(container.querySelector('[data-testid="monaco-diff-editor"]')).toBeInTheDocument();
  });

  test('executes code and updates output console', async () => {
    render(<SortingChallengeLayout challenge={mockSortingChallenge} />);

    const runButton = screen.getByRole('button', { name: /run code/i });
    fireEvent.click(runButton);

    await waitFor(() => {
      expect(screen.getByText('Sorting array')).toBeInTheDocument();
    });
  });

  test('clears output console on Clear button click', async () => {
    render(<SortingChallengeLayout challenge={mockSortingChallenge} />);

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));
    await waitFor(() => {
      expect(screen.getByText('Sorting array')).toBeInTheDocument();
    });

    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    expect(screen.queryByText('Sorting array')).not.toBeInTheDocument();
    expect(screen.getByText(/click "run code" to see output here/i)).toBeInTheDocument();
  });

  test('handles arrays with negative numbers, duplicates, and errors', async () => {
    const complexSortingChallenge = {
      ...mockSortingChallenge,
      starterCode: `
        function sortArray(arr) {
          console.log("Input:", JSON.stringify(arr));
          return arr.sort((a, b) => a - b);
        }
        sortArray([-5, 10, -5, 0, 2]);
      `,
    };

    render(<SortingChallengeLayout challenge={complexSortingChallenge} />);

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));
    await waitFor(() => {
      expect(screen.getByText('Input: [-5,10,-5,0,2]')).toBeInTheDocument();
    });
  });

  test('handles code execution runtime errors gracefully', async () => {
    const errorChallenge = {
      ...mockSortingChallenge,
      starterCode: 'throw new Error("Sorting runtime error");',
    };

    render(<SortingChallengeLayout challenge={errorChallenge} />);

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));
    await waitFor(() => {
      expect(screen.getByText(/❌ Error: Sorting runtime error/i)).toBeInTheDocument();
    });
  });

  test('meets accessibility guidelines for buttons and links', () => {
    render(<SortingChallengeLayout challenge={mockSortingChallenge} />);

    const backLink = screen.getByRole('link', { name: /back to challenges/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/challenges');
  });
});
