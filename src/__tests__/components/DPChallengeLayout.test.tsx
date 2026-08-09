import React from 'react';
import { render, screen, fireEvent, waitFor } from '../testUtils';
import DPChallengeLayout from '../../components/DPChallengeLayout';
import { mockDPChallenge } from '../testUtils';
import useChallengeJudge from '../../hooks/useChallengeJudge';
import * as safeStorage from '../../utils/safeStorage';

const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

jest.mock('../../hooks/useChallengeJudge', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('DPChallengeLayout', () => {
  const mockRunJudge = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockRunJudge.mockReset();
    (useChallengeJudge as jest.Mock).mockReturnValue({
      runJudge: mockRunJudge,
      judgeCases: [],
    });
  });

  test('renders initial DP challenge details, difficulty badge, and complexity analysis', () => {
    render(<DPChallengeLayout challenge={mockDPChallenge} />);

    expect(screen.getByText('Back to Challenges')).toBeInTheDocument();
    expect(screen.getAllByText(mockDPChallenge.title).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('heading', { level: 1, name: mockDPChallenge.title })).toBeInTheDocument();

    const difficultyBadge = screen.getByText('Hard');
    expect(difficultyBadge).toBeInTheDocument();

    expect(screen.getByText('10 min')).toBeInTheDocument();
    expect(
      screen.getByText('Calculate the n-th Fibonacci number using dynamic programming.')
    ).toBeInTheDocument();
    expect(screen.getByText('0 <= n <= 45')).toBeInTheDocument();
    expect(screen.getAllByText('O(N)').length).toBeGreaterThan(0);
  });

  test('handles tab switching between Problem and Solution views', () => {
    render(<DPChallengeLayout challenge={mockDPChallenge} />);

    const problemTab = screen.getByRole('button', { name: /problem/i });
    const solutionTab = screen.getByRole('button', { name: /solution/i });

    expect(problemTab).toHaveClass('border-red-500');

    fireEvent.click(solutionTab);
    expect(solutionTab).toHaveClass('border-red-500');
    expect(screen.getByRole('heading', { name: /solution/i })).toBeInTheDocument();

    fireEvent.click(problemTab);
    expect(
      screen.getByText('Calculate the n-th Fibonacci number using dynamic programming.')
    ).toBeInTheDocument();
  });

  test('toggles hint visibility', () => {
    render(<DPChallengeLayout challenge={mockDPChallenge} />);

    const hintButton = screen.getByRole('button', { name: /show hint/i });
    expect(screen.queryByText(mockDPChallenge.hint)).not.toBeInTheDocument();

    fireEvent.click(hintButton);
    expect(screen.getByText('Hide Hint')).toBeInTheDocument();
    expect(screen.getByText(mockDPChallenge.hint)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /hide hint/i }));
    expect(screen.queryByText(mockDPChallenge.hint)).not.toBeInTheDocument();
  });

  test('toggles solution reveal in the Solution tab', () => {
    const { container } = render(<DPChallengeLayout challenge={mockDPChallenge} />);

    fireEvent.click(screen.getByRole('button', { name: /solution/i }));

    const revealButton = screen.getByRole('button', { name: /reveal/i });
    expect(container.querySelector('[data-testid="monaco-diff-editor"]')).not.toBeInTheDocument();

    fireEvent.click(revealButton);
    expect(screen.getByRole('button', { name: /hide/i })).toBeInTheDocument();
    expect(container.querySelector('[data-testid="monaco-diff-editor"]')).toBeInTheDocument();
  });

  test('executes code and displays console output', async () => {
    mockRunJudge.mockResolvedValueOnce([
      { pass: true, output: 'Calculating fibonacci', expected: 'Calculating fibonacci', runtimeMs: 5, description: 'DP Case 1' },
    ]);

    render(<DPChallengeLayout challenge={mockDPChallenge} />);

    const runButton = screen.getByRole('button', { name: /run code/i });
    fireEvent.click(runButton);

    await waitFor(() => {
      expect(screen.getByText(/Calculating fibonacci/i)).toBeInTheDocument();
    });
  });

  test('only marks a challenge solved after a successful judge run', async () => {
    const markSpy = jest.spyOn(safeStorage, 'markChallengeSolved');
    mockRunJudge.mockResolvedValueOnce([
      { pass: true, output: 'Calculating fibonacci', expected: 'Calculating fibonacci', runtimeMs: 5, description: 'DP Case 1' },
    ]);

    render(<DPChallengeLayout challenge={mockDPChallenge} />);

    const solveButton = screen.getByRole('button', { name: /mark as solved/i });
    expect(solveButton).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));

    await waitFor(() => {
      expect(solveButton).toBeEnabled();
    });

    fireEvent.click(solveButton);

    expect(markSpy).toHaveBeenCalledWith(mockDPChallenge.id, mockDPChallenge.title);
    expect(alertSpy).toHaveBeenCalledWith('Marked as solved!');
  });

  test('clears output console on Clear button click', async () => {
    mockRunJudge.mockResolvedValueOnce([
      { pass: true, output: 'Calculating fibonacci', expected: 'Calculating fibonacci', runtimeMs: 5, description: 'DP Case 1' },
    ]);

    render(<DPChallengeLayout challenge={mockDPChallenge} />);

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));
    await waitFor(() => {
      expect(screen.getByText(/Calculating fibonacci/i)).toBeInTheDocument();
    });

    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    expect(screen.getByText(/click "run code" to see output here/i)).toBeInTheDocument();
  });

  test('handles DP runtime code errors gracefully', async () => {
    mockRunJudge.mockRejectedValueOnce(new Error("DP stack overflow"));

    const errorDPChallenge = {
      ...mockDPChallenge,
      starterCode: 'throw new Error("DP stack overflow");',
    };

    render(<DPChallengeLayout challenge={errorDPChallenge} />);

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));
    await waitFor(() => {
      expect(screen.getByText(/❌ DP stack overflow/i)).toBeInTheDocument();
    });
  });

  test('meets accessibility guidelines for navigation and buttons', () => {
    render(<DPChallengeLayout challenge={mockDPChallenge} />);

    const backLink = screen.getByRole('link', { name: /back to challenges/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/challenges');
  });
});
