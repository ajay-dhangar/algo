import React from 'react';
import { render, screen, fireEvent, waitFor } from '../testUtils';
import TreeChallengeLayout from '../../components/TreeChallenge';
import useChallengeJudge from '../../hooks/useChallengeJudge';
import * as safeStorage from '../../utils/safeStorage';

const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

jest.mock('../../hooks/useChallengeJudge', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockTreeChallenge = {
  id: 'tree-01',
  title: 'Maximum Depth of Binary Tree',
  slug: 'maximum-depth-of-binary-tree',
  difficulty: 'Easy' as const,
  category: 'Trees' as const,
  timeLimit: '10 min',
  description: 'Find the maximum depth of a binary tree.',
  constraints: ['The number of nodes in the tree is in the range [0, 10^4].'],
  starterCode: 'function maxDepth(root) {\n  return 0;\n}',
  solution: 'function maxDepth(root) {\n  return 0;\n}',
  examples: [
    { input: 'root = [3,9,20,null,null,15,7]', output: '3', explanation: 'Tree depth is 3' },
  ],
  testCases: [
    { input: 'root = [3,9,20,null,null,15,7]', expected: '3', description: 'Sample Tree' },
  ],
  timeComplexity: 'O(N) — Visit each node once',
  spaceComplexity: 'O(H) — Height of tree for stack',
  hint: 'Use recursion or BFS level order traversal',
};

describe('TreeChallengeLayout', () => {
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
    render(<TreeChallengeLayout challenge={mockTreeChallenge} />);

    expect(screen.getByText('Back to Challenges')).toBeInTheDocument();
    expect(screen.getByText(mockTreeChallenge.title)).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  test('only marks a challenge solved after a successful judge run', async () => {
    const markSpy = jest.spyOn(safeStorage, 'markChallengeSolved');
    mockRunJudge.mockResolvedValueOnce([
      { pass: true, output: '3', expected: '3', runtimeMs: 5, description: 'Sample Tree' },
    ]);

    render(<TreeChallengeLayout challenge={mockTreeChallenge} />);

    const solveButton = screen.getByRole('button', { name: /mark as solved/i });
    expect(solveButton).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /run code/i }));

    await waitFor(() => {
      expect(solveButton).toBeEnabled();
    });

    fireEvent.click(solveButton);

    expect(markSpy).toHaveBeenCalledWith(mockTreeChallenge.id, mockTreeChallenge.title);
    expect(alertSpy).toHaveBeenCalledWith('Marked as solved!');
  });
});
