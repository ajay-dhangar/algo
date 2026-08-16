export type CodeTheme = 'default' | 'midnight' | 'solarized';

export const CODE_THEME_STORAGE_KEY = 'algo-code-theme';
export const CODE_THEME_ATTRIBUTE = 'data-code-theme';
export const CODE_THEME_EVENT = 'algo-code-theme-change';

export interface CodeThemeOption {
  value: CodeTheme;
  label: string;
  description: string;
}

export const CODE_THEMES: CodeThemeOption[] = [
  { value: 'default', label: 'Default', description: 'Use the default site code block styling' },
  { value: 'midnight', label: 'Midnight', description: 'Dark code blocks with cool blue accents' },
  { value: 'solarized', label: 'Solarized', description: 'Soft low-contrast syntax styling for long reading sessions' },
];

export function isCodeTheme(value: string | null): value is CodeTheme {
  return value === 'default' || value === 'midnight' || value === 'solarized';
}

export function getStoredCodeTheme(): CodeTheme {
  if (typeof window === 'undefined') return 'default';
  try {
    if (typeof document !== 'undefined') {
      const attr = document.documentElement.getAttribute(CODE_THEME_ATTRIBUTE);
      if (attr && isCodeTheme(attr)) {
        return attr;
      }
    }
    const stored = window.localStorage.getItem(CODE_THEME_STORAGE_KEY);
    return isCodeTheme(stored) ? stored : 'default';
  } catch {
    return 'default';
  }
}

export function storeCodeTheme(theme: CodeTheme): void {
  if (typeof window === 'undefined') return;
  try {
    if (theme === 'default') {
      window.localStorage.removeItem(CODE_THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(CODE_THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Ignore persistence failures.
  }
}

export function applyCodeTheme(theme: CodeTheme): void {
  if (typeof document === 'undefined') return;
  if (theme === 'default') {
    document.documentElement.removeAttribute(CODE_THEME_ATTRIBUTE);
  } else {
    document.documentElement.setAttribute(CODE_THEME_ATTRIBUTE, theme);
  }

  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent(CODE_THEME_EVENT, { detail: theme }));
    } catch {
      // Ignore in environments where CustomEvent might be restricted
    }
  }
}

