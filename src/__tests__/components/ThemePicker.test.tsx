import React from 'react';
import { render, screen, waitFor } from '../testUtils';
import userEvent from '@testing-library/user-event';
import ThemePicker from '../../components/ThemePicker';
import { ACCENT_THEME_STORAGE_KEY } from '../../utils/accentTheme';

describe('ThemePicker', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-accent-theme');
  });

  test('opens the menu with all three theme options', async () => {
    const user = userEvent.setup();
    render(<ThemePicker />);

    await user.click(screen.getByRole('button', { name: /choose a color theme/i }));

    expect(screen.getByRole('menuitemradio', { name: /default/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: /high contrast/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitemradio', { name: /neon/i })).toBeInTheDocument();
  });

  test('selecting "Neon" applies the attribute and persists to localStorage', async () => {
    const user = userEvent.setup();
    render(<ThemePicker />);

    await user.click(screen.getByRole('button', { name: /choose a color theme/i }));
    await user.click(screen.getByRole('menuitemradio', { name: /neon/i }));

    expect(document.documentElement.getAttribute('data-accent-theme')).toBe('neon');
    expect(localStorage.getItem(ACCENT_THEME_STORAGE_KEY)).toBe('neon');
    // Selecting closes the menu.
    expect(screen.queryByRole('menuitemradio', { name: /neon/i })).not.toBeInTheDocument();
  });

  test('selecting "Default" clears the attribute and localStorage', async () => {
    localStorage.setItem(ACCENT_THEME_STORAGE_KEY, 'high-contrast');
    document.documentElement.setAttribute('data-accent-theme', 'high-contrast');

    const user = userEvent.setup();
    render(<ThemePicker />);

    await user.click(screen.getByRole('button', { name: /choose a color theme/i }));
    await user.click(screen.getByRole('menuitemradio', { name: /^default/i }));

    expect(document.documentElement.getAttribute('data-accent-theme')).toBeNull();
    expect(localStorage.getItem(ACCENT_THEME_STORAGE_KEY)).toBeNull();
  });

  test('reflects the persisted theme as checked on mount', async () => {
    localStorage.setItem(ACCENT_THEME_STORAGE_KEY, 'high-contrast');
    const user = userEvent.setup();
    render(<ThemePicker />);

    await user.click(screen.getByRole('button', { name: /choose a color theme/i }));

    await waitFor(() =>
      expect(screen.getByRole('menuitemradio', { name: /high contrast/i })).toHaveAttribute('aria-checked', 'true'),
    );
  });

  test('closes the menu on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <ThemePicker />
        <button type="button">Outside</button>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: /choose a color theme/i }));
    expect(screen.getByRole('menuitemradio', { name: /neon/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Outside' }));

    expect(screen.queryByRole('menuitemradio', { name: /neon/i })).not.toBeInTheDocument();
  });
});
