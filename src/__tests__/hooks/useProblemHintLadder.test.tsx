import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useProblemHintLadder } from '../../hooks/useProblemHintLadder';

function TestComponent({ problemId, totalStages }: { problemId: string; totalStages: number }) {
  const {
    currentStageIndex,
    canRevealNextStage,
    isFullyRevealed,
    revealNextStage,
    resetHintLadder,
    record,
  } = useProblemHintLadder(problemId, totalStages);

  return (
    <div>
      <div data-testid="stage-index">{currentStageIndex}</div>
      <div data-testid="can-reveal">{String(canRevealNextStage)}</div>
      <div data-testid="is-fully-revealed">{String(isFullyRevealed)}</div>
      <div data-testid="record-updated-at">{record.updatedAt}</div>
      <button type="button" onClick={revealNextStage}>
        Reveal
      </button>
      <button type="button" onClick={resetHintLadder}>
        Reset
      </button>
    </div>
  );
}

describe('useProblemHintLadder', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with no revealed stage and stores progress to localStorage', () => {
    render(<TestComponent problemId="two-sum-problem" totalStages={3} />);

    expect(screen.getByTestId('stage-index').textContent).toBe('-1');
    expect(screen.getByTestId('can-reveal').textContent).toBe('true');
    expect(screen.getByTestId('is-fully-revealed').textContent).toBe('false');

    fireEvent.click(screen.getByRole('button', { name: /reveal/i }));

    expect(screen.getByTestId('stage-index').textContent).toBe('0');
    expect(screen.getByTestId('can-reveal').textContent).toBe('true');
    expect(screen.getByTestId('is-fully-revealed').textContent).toBe('false');

    const raw = localStorage.getItem('algo.dsa.hint-ladder.v1');
    expect(raw).not.toBeNull();
    const stored = JSON.parse(raw ?? '{}');
    expect(stored['two-sum-problem'].stageIndex).toBe(0);
    expect(Array.isArray(stored['two-sum-problem'].revealedAt)).toBe(true);
  });

  it('can reveal through all stages and reset', () => {
    render(<TestComponent problemId="two-sum-problem" totalStages={2} />);

    fireEvent.click(screen.getByRole('button', { name: /reveal/i }));
    expect(screen.getByTestId('stage-index').textContent).toBe('0');

    fireEvent.click(screen.getByRole('button', { name: /reveal/i }));
    expect(screen.getByTestId('stage-index').textContent).toBe('1');
    expect(screen.getByTestId('can-reveal').textContent).toBe('false');
    expect(screen.getByTestId('is-fully-revealed').textContent).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByTestId('stage-index').textContent).toBe('-1');
    expect(screen.getByTestId('can-reveal').textContent).toBe('true');
  });
});
