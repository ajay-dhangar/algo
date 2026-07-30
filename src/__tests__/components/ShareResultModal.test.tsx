import React from 'react';
import { render, screen, waitFor } from '../testUtils';
import userEvent from '@testing-library/user-event';
import ShareResultModal from '../../components/Quiz/ShareResultModal';

const mockBlob = new Blob(['mock-png'], { type: 'image/png' });
const renderShareCardToPngBlobMock = jest.fn(async (_topic?: string, _score?: number, _total?: number, _siteName?: string) => mockBlob);

jest.mock('../../utils/shareResultImage', () => ({
  __esModule: true,
  renderShareCardToPngBlob: (topic: string, score: number, total: number, siteName?: string) =>
    renderShareCardToPngBlobMock(topic, score, total, siteName),
}));

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  topic: 'Graph Algorithms',
  score: 9,
  total: 10,
};

describe('ShareResultModal', () => {
  let openSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    openSpy.mockRestore();
  });

  test('renders nothing when closed', () => {
    render(<ShareResultModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Share your result')).not.toBeInTheDocument();
  });

  test('renders the preview card and action buttons when open', () => {
    render(<ShareResultModal {...defaultProps} />);

    expect(screen.getByText('Share your result')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download png/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy image/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share on x/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share on linkedin/i })).toBeInTheDocument();
    // The live preview renders an accessible SVG describing the result.
    expect(screen.getByRole('img', { name: /scored 9 out of 10 on the graph algorithms quiz/i })).toBeInTheDocument();
  });

  test('downloads a PNG using the shared rendering utility', async () => {
    const user = userEvent.setup();
    render(<ShareResultModal {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /download png/i }));

    await waitFor(() => expect(renderShareCardToPngBlobMock).toHaveBeenCalledWith('Graph Algorithms', 9, 10, 'Algo'));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /downloaded/i })).toBeInTheDocument(),
    );
  });

  test('opens the X (Twitter) share intent with the score in the tweet text', async () => {
    const user = userEvent.setup();
    render(<ShareResultModal {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /share on x/i }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url] = openSpy.mock.calls[0];
    expect(url).toContain('twitter.com/intent/tweet');
    expect(decodeURIComponent(url)).toContain('I scored 9/10 on the Graph Algorithms quiz on Algo!');
  });

  test('opens the LinkedIn share endpoint', async () => {
    const user = userEvent.setup();
    render(<ShareResultModal {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /share on linkedin/i }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url] = openSpy.mock.calls[0];
    expect(url).toContain('linkedin.com/sharing/share-offsite');
  });

  test('calls onClose when clicking the backdrop or close button', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(<ShareResultModal {...defaultProps} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: /close share dialog/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
