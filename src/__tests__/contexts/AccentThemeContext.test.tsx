import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import {
  AccentThemeProvider,
  useAccentTheme,
  useCodeTheme,
} from '../../contexts/AccentThemeContext';
import {
  ACCENT_THEME_STORAGE_KEY,
  ACCENT_THEME_ATTRIBUTE,
  ACCENT_THEME_EVENT,
} from '../../utils/accentTheme';
import {
  CODE_THEME_STORAGE_KEY,
  CODE_THEME_ATTRIBUTE,
  CODE_THEME_EVENT,
} from '../../utils/codeTheme';

function TestConsumer() {
  const { accentTheme, setAccentTheme } = useAccentTheme();
  const { codeTheme, setCodeTheme } = useCodeTheme();

  return (
    <div>
      <span data-testid="accent-display">{accentTheme}</span>
      <span data-testid="code-display">{codeTheme}</span>
      <button onClick={() => setAccentTheme('neon')}>Set Accent Neon</button>
      <button onClick={() => setAccentTheme('high-contrast')}>Set Accent High Contrast</button>
      <button onClick={() => setAccentTheme('default')}>Set Accent Default</button>
      <button onClick={() => setCodeTheme('midnight')}>Set Code Midnight</button>
      <button onClick={() => setCodeTheme('solarized')}>Set Code Solarized</button>
      <button onClick={() => setCodeTheme('default')}>Set Code Default</button>
    </div>
  );
}

describe('AccentThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute(ACCENT_THEME_ATTRIBUTE);
    document.documentElement.removeAttribute(CODE_THEME_ATTRIBUTE);
  });

  test('initializes with "default" when no attribute or storage is present', () => {
    render(
      <AccentThemeProvider>
        <TestConsumer />
      </AccentThemeProvider>
    );

    expect(screen.getByTestId('accent-display')).toHaveTextContent('default');
    expect(screen.getByTestId('code-display')).toHaveTextContent('default');
  });

  test('synchronizes initial state with pre-hydrated DOM attribute (SSR inline script simulation)', () => {
    document.documentElement.setAttribute(ACCENT_THEME_ATTRIBUTE, 'neon');
    document.documentElement.setAttribute(CODE_THEME_ATTRIBUTE, 'midnight');

    render(
      <AccentThemeProvider>
        <TestConsumer />
      </AccentThemeProvider>
    );

    expect(screen.getByTestId('accent-display')).toHaveTextContent('neon');
    expect(screen.getByTestId('code-display')).toHaveTextContent('midnight');
  });

  test('updates accent theme, persists to storage, updates DOM attribute, and dispatches event', () => {
    const listener = jest.fn();
    window.addEventListener(ACCENT_THEME_EVENT, listener);

    render(
      <AccentThemeProvider>
        <TestConsumer />
      </AccentThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Set Accent Neon' }));

    expect(screen.getByTestId('accent-display')).toHaveTextContent('neon');
    expect(document.documentElement.getAttribute(ACCENT_THEME_ATTRIBUTE)).toBe('neon');
    expect(localStorage.getItem(ACCENT_THEME_STORAGE_KEY)).toBe('neon');
    expect(listener).toHaveBeenCalled();

    window.removeEventListener(ACCENT_THEME_EVENT, listener);
  });

  test('updates code theme, persists to storage, and updates DOM attribute', () => {
    const listener = jest.fn();
    window.addEventListener(CODE_THEME_EVENT, listener);

    render(
      <AccentThemeProvider>
        <TestConsumer />
      </AccentThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Set Code Midnight' }));

    expect(screen.getByTestId('code-display')).toHaveTextContent('midnight');
    expect(document.documentElement.getAttribute(CODE_THEME_ATTRIBUTE)).toBe('midnight');
    expect(localStorage.getItem(CODE_THEME_STORAGE_KEY)).toBe('midnight');
    expect(listener).toHaveBeenCalled();

    window.removeEventListener(CODE_THEME_EVENT, listener);
  });

  test('resets accent and code theme to default', () => {
    localStorage.setItem(ACCENT_THEME_STORAGE_KEY, 'neon');
    localStorage.setItem(CODE_THEME_STORAGE_KEY, 'solarized');

    render(
      <AccentThemeProvider>
        <TestConsumer />
      </AccentThemeProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Set Accent Default' }));
    expect(screen.getByTestId('accent-display')).toHaveTextContent('default');
    expect(document.documentElement.getAttribute(ACCENT_THEME_ATTRIBUTE)).toBeNull();
    expect(localStorage.getItem(ACCENT_THEME_STORAGE_KEY)).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Set Code Default' }));
    expect(screen.getByTestId('code-display')).toHaveTextContent('default');
    expect(document.documentElement.getAttribute(CODE_THEME_ATTRIBUTE)).toBeNull();
    expect(localStorage.getItem(CODE_THEME_STORAGE_KEY)).toBeNull();
  });

  test('reacts to intra-app custom event changes', () => {
    render(
      <AccentThemeProvider>
        <TestConsumer />
      </AccentThemeProvider>
    );

    act(() => {
      window.dispatchEvent(
        new CustomEvent(ACCENT_THEME_EVENT, { detail: 'high-contrast' })
      );
    });
    expect(screen.getByTestId('accent-display')).toHaveTextContent('high-contrast');

    act(() => {
      window.dispatchEvent(
        new CustomEvent(CODE_THEME_EVENT, { detail: 'solarized' })
      );
    });
    expect(screen.getByTestId('code-display')).toHaveTextContent('solarized');
  });

  test('reacts to window storage event', () => {
    render(
      <AccentThemeProvider>
        <TestConsumer />
      </AccentThemeProvider>
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: ACCENT_THEME_STORAGE_KEY,
          newValue: 'neon',
        })
      );
    });
    expect(screen.getByTestId('accent-display')).toHaveTextContent('neon');
    expect(document.documentElement.getAttribute(ACCENT_THEME_ATTRIBUTE)).toBe('neon');

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: CODE_THEME_STORAGE_KEY,
          newValue: 'midnight',
        })
      );
    });
    expect(screen.getByTestId('code-display')).toHaveTextContent('midnight');
    expect(document.documentElement.getAttribute(CODE_THEME_ATTRIBUTE)).toBe('midnight');
  });

  test('fallback works safely when used outside AccentThemeProvider', () => {
    render(<TestConsumer />);

    expect(screen.getByTestId('accent-display')).toHaveTextContent('default');
    expect(screen.getByTestId('code-display')).toHaveTextContent('default');

    fireEvent.click(screen.getByRole('button', { name: 'Set Accent Neon' }));
    expect(document.documentElement.getAttribute(ACCENT_THEME_ATTRIBUTE)).toBe('neon');
    expect(localStorage.getItem(ACCENT_THEME_STORAGE_KEY)).toBe('neon');
  });
});
