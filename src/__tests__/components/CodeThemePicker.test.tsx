import React from 'react';
import { render, screen, waitFor } from '../testUtils';
import userEvent from '@testing-library/user-event';
import CodeThemePicker from '../../components/CodeThemePicker';
import { CODE_THEME_STORAGE_KEY } from '../../utils/codeTheme';

describe('CodeThemePicker', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-code-theme');
  });

  test('opens the menu with all code theme options', async () => {
    const user = userEvent.setup();
    render(<CodeThemePicker />);

    await user.click(screen.getByRole('button', { name: /choose a code theme/i }));

    expect(screen.getByRole('menuitemradio', { name: /default/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: /midnight/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: /solarized/i })).toBeInTheDocument();
  });

  test('selecting "Midnight" applies the attribute and persists to localStorage', async () => {
    const user = userEvent.setup();
    render(<CodeThemePicker />);

    await user.click(screen.getByRole('button', { name: /choose a code theme/i }));
    await user.click(screen.getByRole('menuitemradio', { name: /midnight/i }));

    expect(document.documentElement.getAttribute('data-code-theme')).toBe('midnight');
    expect(localStorage.getItem(CODE_THEME_STORAGE_KEY)).toBe('midnight');
    expect(screen.queryByRole('menuitemradio', { name: /midnight/i })).not.toBeInTheDocument();
  });

  test('selecting "Default" clears the attribute and localStorage', async () => {
    localStorage.setItem(CODE_THEME_STORAGE_KEY, 'solarized');
    document.documentElement.setAttribute('data-code-theme', 'solarized');

    const user = userEvent.setup();
    render(<CodeThemePicker />);

    await user.click(screen.getByRole('button', { name: /choose a code theme/i }));
    await user.click(screen.getByRole('menuitemradio', { name: /^default/i }));

    expect(document.documentElement.getAttribute('data-code-theme')).toBeNull();
    expect(localStorage.getItem(CODE_THEME_STORAGE_KEY)).toBeNull();
  });

  test('reflects the persisted theme as checked on mount', async () => {
    localStorage.setItem(CODE_THEME_STORAGE_KEY, 'solarized');
    const user = userEvent.setup();
    render(<CodeThemePicker />);

    await user.click(screen.getByRole('button', { name: /choose a code theme/i }));

    await waitFor(() =>
      expect(screen.getByRole('menuitemradio', { name: /solarized/i })).toHaveAttribute('aria-checked', 'true'),
    );
  });

  test('closes the menu on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <CodeThemePicker />
        <button type="button">Outside</button>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: /choose a code theme/i }));
    expect(screen.getByRole('menuitemradio', { name: /midnight/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Outside' }));

    expect(screen.queryByRole('menuitemradio', { name: /midnight/i })).not.toBeInTheDocument();
  });
});
