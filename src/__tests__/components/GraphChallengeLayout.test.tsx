import React from 'react';
import { render, screen, fireEvent, waitFor } from '../testUtils';
import GraphChallengeLayout from '../../components/GraphChallengeLayout';
import { mockGraphChallenge } from '../testUtils';
import useChallengeJudge from '../../hooks/useChallengeJudge';
import * as safeStorage from '../../utils/safeStorage';

const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

jest.mock('../../hooks/useChallengeJudge', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('GraphChallengeLayout', () => {
  const mockRunJudge = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockRunJudge.mockReset();
    (useChallengeJudge as jest.Mock).mockReturnValue({
      runJudge: mockRunJudge,
      judgeCases: [],
    });
  });

  test('renders initial problem details, title, difficulty badge, and time limit', () => {
    render(<GraphChallengeLayout challenge={mockGraphChallenge} />);

    // Top Navigation Header & Title
    expect(screen.getByText('Back to Challenges')).toBeInTheDocument();
    expect(screen.getAllByText(mockGraphChallenge.title).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('heading', { level: 1, name: mockGraphChallenge.title })).toBeInTheDocument();

    // Difficulty badge
    const difficultyBadge = screen.getByText('Easy');
    expect(difficultyBadge).toBeInTheDocument();

    // Time limit
    expect(screen.getByText('15 min')).toBeInTheDocument();

    // Problem description
    expect(screen.getByText('Build an adjacency list and matrix for graph nodes.')).toBeInTheDocument();

    // Examples & Test Cases
    expect(screen.getAllByText('Input:').length).toBeGreaterThan(0);
    expect(screen.getByText('n = 3, edges = [[0, 1], [1, 2]]')).toBeInTheDocument();
    expect(screen.getAllByText('Output:').length).toBeGreaterThan(0);
    expect(screen.getAllByText('[[1], [0, 2], [1]]').length).toBeGreaterThan(0);

    // Constraints
    expect(screen.getByText('1 <= n <= 100')).toBeInTheDocument();

    // Complexity
    expect(screen.getAllByText('O(V + E)').length).toBeGreaterThan(0);
  });

  test('handles tab switching between Problem and Solution', () => {
    render(<GraphChallengeLayout challenge={mockGraphChallenge} />);

    const problemTabButton = screen.getByRole('button', { name: /problem/i });
    const solutionTabButton = screen.getByRole('button', { name: /solution/i });

    expect(problemTabButton).toHaveClass('border-blue-500');

    // Switch to solution tab
    fireEvent.click(solutionTabButton);
    expect(solutionTabButton).toHaveClass('border-blue-500');
    expect(screen.getByRole('heading', { name: /solution/i })).toBeInTheDocument();

    // Switch back to problem tab
    fireEvent.click(problemTabButton);
    expect(problemTabButton).toHaveClass('border-blue-500');
    expect(screen.getByText('Build an adjacency list and matrix for graph nodes.')).toBeInTheDocument();
  });

  test('toggles hint visibility', () => {
    render(<GraphChallengeLayout challenge={mockGraphChallenge} />);

    const hintButton = screen.getByRole('button', { name: /show hint/i });
    expect(screen.queryByText(mockGraphChallenge.hint)).not.toBeInTheDocument();

    // Show hint
    fireEvent.click(hintButton);
    expect(screen.getByText('Hide Hint')).toBeInTheDocument();
    expect(screen.getByText(mockGraphChallenge.hint)).toBeInTheDocument();

    // Hide hint
    fireEvent.click(screen.getByRole('button', { name: /hide hint/i }));
    expect(screen.queryByText(mockGraphChallenge.hint)).not.toBeInTheDocument();
  });

  test('toggles solution reveal in the Solution tab', () => {
    const { container } = render(<GraphChallengeLayout challenge={mockGraphChallenge} />);

    // Switch to solution tab
    fireEvent.click(screen.getByRole('button', { name: /solution/i }));

    const revealButton = screen.getByRole('button', { name: /reveal/i });
    expect(container.querySelector('[data-testid="monaco-diff-editor"]')).not.toBeInTheDocument();

    // Reveal solution
    fireEvent.click(revealButton);
    expect(screen.getByRole('button', { name: /hide/i })).toBeInTheDocument();
    expect(container.querySelector('[data-testid="monaco-diff-editor"]')).toBeInTheDocument();

    // Hide solution
    fireEvent.click(screen.getByRole('button', { name: /hide/i }));
    expect(container.querySelector('[data-testid="monaco-diff-editor"]')).not.toBeInTheDocument();
  });

  test('executes starter code and displays console output', async () => {
    mockRunJudge.mockResolvedValueOnce([
      { pass: true, output: 'Graph initialized', expected: 'Graph initialized', runtimeMs: 5, description: 'Test Case 1' },
    ]);

    render(<GraphChallengeLayout challenge={mockGraphChallenge} />);

    const runButton = screen.getByRole('button', { name: /run code/i });
    fireEvent.click(runButton);

    await waitFor(() => {
      expect(screen.getByText(/Graph initialized/i)).toBeInTheDocument();
    });
  });

  test('only marks a challenge solved after a successful judge run', async () => {
    const markSpy = jest.spyOn(safeStorage, 'markChallengeSolved');
    mockRunJudge.mockResolvedValueOnce([
      { pass: true, output: 'Graph initialized', expected: 'Graph initialized', runtimeMs: 5, description: 'Test Case 1' },
    ]);

    render(<GraphChallengeLayout challenge={mockGraphChallenge} />);

    const solveButton = screen.getByRole('button', { name: /mark as solved/i });
    expect(solveButton).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));

    await waitFor(() => {
      expect(solveButton).toBeEnabled();
    });

    fireEvent.click(solveButton);

    expect(markSpy).toHaveBeenCalledWith(mockGraphChallenge.id, mockGraphChallenge.title);
    expect(alertSpy).toHaveBeenCalledWith('Marked as solved!');
  });

  test('clears output console when Clear button is clicked', async () => {
    mockRunJudge.mockResolvedValueOnce([
      { pass: true, output: 'Graph initialized', expected: 'Graph initialized', runtimeMs: 5, description: 'Test Case 1' },
    ]);

    render(<GraphChallengeLayout challenge={mockGraphChallenge} />);

    const runButton = screen.getByRole('button', { name: /run code/i });
    fireEvent.click(runButton);

    await waitFor(() => {
      expect(screen.getByText(/Graph initialized/i)).toBeInTheDocument();
    });

    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    expect(screen.queryByText(/Graph initialized/i)).not.toBeInTheDocument();
    expect(screen.getByText(/click "run code" to see output here/i)).toBeInTheDocument();
  });

  test('handles invalid code execution gracefully and displays error log', async () => {
    mockRunJudge.mockRejectedValueOnce(new Error("Syntax runtime failure"));

    const invalidChallenge = {
      ...mockGraphChallenge,
      starterCode: 'throw new Error("Syntax runtime failure");',
    };

    render(<GraphChallengeLayout challenge={invalidChallenge} />);

    const runButton = screen.getByRole('button', { name: /run code/i });
    fireEvent.click(runButton);

    await waitFor(() => {
      expect(screen.getByText(/❌ Syntax runtime failure/i)).toBeInTheDocument();
    });
  });

  test('meets accessibility requirements (roles, labels, and back link)', () => {
    render(<GraphChallengeLayout challenge={mockGraphChallenge} />);

    const backLink = screen.getByRole('link', { name: /back to challenges/i });
    expect(backLink).toHaveAttribute('href', '/challenges');

    const tabs = screen.getAllByRole('button');
    expect(tabs.length).toBeGreaterThan(0);
  });
});
