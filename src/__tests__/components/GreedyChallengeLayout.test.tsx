import React from 'react';
import { render, screen, fireEvent, waitFor } from '../testUtils';
import GreedyChallengeLayout from '../../components/GreedyChallengeLayout';
import useChallengeJudge from '../../hooks/useChallengeJudge';
import * as safeStorage from '../../utils/safeStorage';

const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

jest.mock('../../hooks/useChallengeJudge', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGreedyChallenge = {
  id: 'greedy-01',
  title: 'Assign Cookies',
  slug: 'assign-cookies',
  difficulty: 'Easy' as const,
  category: 'Greedy' as const,
  timeLimit: '10 min',
  description: 'Give each child at most one cookie.',
  constraints: ['1 <= g.length, s.length <= 3 * 10^4'],
  starterCode: 'function findContentChildren(g, s) {\n  return 0;\n}',
  solution: 'function findContentChildren(g, s) {\n  return 0;\n}',
  examples: [
    { input: 'g = [1,2,3], s = [1,1]', output: '1', explanation: 'One child content' },
  ],
  testCases: [
    { input: 'g = [1,2,3], s = [1,1]', expected: '1', description: 'Sample Case' },
  ],
  timeComplexity: 'O(N log N) — Sorting children and cookies',
  spaceComplexity: 'O(1) — Constant extra space',
  hint: 'Sort both arrays first',
};

describe('GreedyChallengeLayout', () => {
  const mockRunJudge = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockRunJudge.mockReset();
    (useChallengeJudge as jest.Mock).mockReturnValue({
      runJudge: mockRunJudge,
      judgeCases: [],
    });
  });

  test('renders initial problem details and title', () => {
    render(<GreedyChallengeLayout challenge={mockGreedyChallenge} />);

    expect(screen.getByText('Back to Challenges')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: mockGreedyChallenge.title })).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  test('only marks a challenge solved after a successful judge run', async () => {
    const markSpy = jest.spyOn(safeStorage, 'markChallengeSolved');
    mockRunJudge.mockResolvedValueOnce([
      { pass: true, output: '1', expected: '1', runtimeMs: 5, description: 'Sample Case' },
    ]);

    render(<GreedyChallengeLayout challenge={mockGreedyChallenge} />);

    const solveButton = screen.getByRole('button', { name: /mark as solved/i });
    expect(solveButton).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));

    await waitFor(() => {
      expect(solveButton).toBeEnabled();
    });

    fireEvent.click(solveButton);

    expect(markSpy).toHaveBeenCalledWith(mockGreedyChallenge.id, mockGreedyChallenge.title);
    expect(alertSpy).toHaveBeenCalledWith('Marked as solved!');
  });
});
