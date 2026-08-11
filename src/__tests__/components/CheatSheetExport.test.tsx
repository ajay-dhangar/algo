import React from 'react';
import { render, screen, waitFor } from '../testUtils';
import userEvent from '@testing-library/user-event';
import CheatSheetExport from '../../components/CheatSheetExport';

const mockCanvas = {
  width: 800,
  height: 2000,
  toDataURL: jest.fn(() => 'data:image/png;base64,mock'),
  toBlob: jest.fn((cb: (blob: Blob | null) => void) => cb(new Blob(['mock'], { type: 'image/png' }))),
};

const html2canvasMock = jest.fn((_options?: unknown) => mockCanvas);
const addImageMock = jest.fn();
const addPageMock = jest.fn();
const saveMock = jest.fn();

jest.mock('html2canvas', () => ({
  __esModule: true,
  default: (options: unknown) => html2canvasMock(options),
}));

jest.mock('jspdf', () => ({
  __esModule: true,
  jsPDF: jest.fn().mockImplementation(() => ({
    addImage: addImageMock,
    addPage: addPageMock,
    save: saveMock,
  })),
}));

function renderWithContent() {
  return render(
    <div className="markdown">
      <CheatSheetExport title="Python Cheatsheet" />
    </div>,
  );
}

describe('CheatSheetExport', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders download and copy actions', () => {
    renderWithContent();

    expect(screen.getByRole('button', { name: /download python cheatsheet as pdf/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy python cheatsheet as an image/i })).toBeInTheDocument();
  });

  test('exports a PDF using the captured canvas and a slugified filename', async () => {
    const user = userEvent.setup();
    renderWithContent();

    await user.click(screen.getByRole('button', { name: /download python cheatsheet as pdf/i }));

    await waitFor(() => expect(saveMock).toHaveBeenCalledWith('python-cheatsheet.pdf'));
    expect(html2canvasMock).toHaveBeenCalled();
    expect(addImageMock).toHaveBeenCalled();
  });

  test('copies the captured canvas to the clipboard when supported', async () => {
    const user = userEvent.setup();
    // userEvent.setup() installs its own navigator.clipboard stub, so our
    // mock must be applied afterwards or it gets overwritten.
    const writeMock = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { write: writeMock },
      configurable: true,
    });
    (window as any).ClipboardItem = jest.fn().mockImplementation((data) => data);

    renderWithContent();

    await user.click(screen.getByRole('button', { name: /copy python cheatsheet as an image/i }));

    await waitFor(() => expect(writeMock).toHaveBeenCalledTimes(1));
  });

  test('shows an error state when the content to capture cannot be found', async () => {
    const user = userEvent.setup();
    // Deliberately render without a ".markdown" ancestor so the selector misses.
    render(<CheatSheetExport title="Python Cheatsheet" />);

    await user.click(screen.getByRole('button', { name: /download python cheatsheet as pdf/i }));

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /download python cheatsheet as pdf/i })).toHaveTextContent(
        /try again/i,
      ),
    );
  });
});
