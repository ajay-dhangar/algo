import React from 'react';
import { render, screen } from '../testUtils';
import userEvent from '@testing-library/user-event';
import QuizResultActions from '../../components/Quiz/QuizResultActions';

jest.mock('../../utils/shareResultImage', () => ({
  __esModule: true,
  renderShareCardToPngBlob: jest.fn(async () => new Blob(['mock-png'], { type: 'image/png' })),
}));

describe('QuizResultActions', () => {
  test('renders back link, retry, and share buttons', () => {
    render(<QuizResultActions onRetry={jest.fn()} topic="Graph Algorithms" score={9} total={10} />);

    expect(screen.getByRole('link', { name: /back to quizzes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share result/i })).toBeInTheDocument();
  });

  test('calls onRetry when "Try Again" is clicked', async () => {
    const onRetry = jest.fn();
    const user = userEvent.setup();
    render(<QuizResultActions onRetry={onRetry} topic="Graph Algorithms" score={9} total={10} />);

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test('opens the share modal with the correct topic and score when "Share Result" is clicked', async () => {
    const user = userEvent.setup();
    render(<QuizResultActions onRetry={jest.fn()} topic="Graph Algorithms" score={9} total={10} />);

    expect(screen.queryByText('Share your result')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /share result/i }));

    expect(screen.getByText('Share your result')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /scored 9 out of 10 on the graph algorithms quiz/i })).toBeInTheDocument();
  });
});
