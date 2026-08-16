import React from 'react';
import { render, screen, fireEvent, waitFor } from '../testUtils';
import CodeThemePicker from '../../components/CodeThemePicker';
import { CODE_THEME_STORAGE_KEY } from '../../utils/codeTheme';

describe('CodeThemePicker', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-code-theme');
  });

  test('opens the menu with all code theme options', async () => {
    render(<CodeThemePicker />);

    fireEvent.click(screen.getByRole('button', { name: /code theme/i }));

    expect(screen.getByRole('menuitemradio', { name: /default/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: /midnight/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: /solarized/i })).toBeInTheDocument();
  });

  test('selecting "Midnight" applies the attribute and persists to localStorage', async () => {
    render(<CodeThemePicker />);

    fireEvent.click(screen.getByRole('button', { name: /code theme/i }));
    fireEvent.click(screen.getByRole('menuitemradio', { name: /midnight/i }));

    expect(document.documentElement.getAttribute('data-code-theme')).toBe('midnight');
    expect(localStorage.getItem(CODE_THEME_STORAGE_KEY)).toBe('midnight');
    expect(screen.queryByRole('menuitemradio', { name: /midnight/i })).not.toBeInTheDocument();
  });

  test('selecting "Default" clears the attribute and localStorage', async () => {
    localStorage.setItem(CODE_THEME_STORAGE_KEY, 'solarized');
    document.documentElement.setAttribute('data-code-theme', 'solarized');

    render(<CodeThemePicker />);

    fireEvent.click(screen.getByRole('button', { name: /code theme/i }));
    fireEvent.click(screen.getByRole('menuitemradio', { name: /^default/i }));

    expect(document.documentElement.getAttribute('data-code-theme')).toBeNull();
    expect(localStorage.getItem(CODE_THEME_STORAGE_KEY)).toBeNull();
  });

  test('reflects the persisted theme as checked on mount', async () => {
    localStorage.setItem(CODE_THEME_STORAGE_KEY, 'solarized');
    document.documentElement.setAttribute('data-code-theme', 'solarized');

    render(<CodeThemePicker />);

    fireEvent.click(screen.getByRole('button', { name: /code theme/i }));

    await waitFor(() =>
      expect(screen.getByRole('menuitemradio', { name: /solarized/i })).toHaveAttribute('aria-checked', 'true'),
    );
  });

  test('closes the menu on outside click', async () => {
    render(
      <div>
        <CodeThemePicker />
        <button type="button">Outside</button>
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: /code theme/i }));
    expect(screen.getByRole('menuitemradio', { name: /midnight/i })).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));

    expect(screen.queryByRole('menuitemradio', { name: /midnight/i })).not.toBeInTheDocument();
  });
});

