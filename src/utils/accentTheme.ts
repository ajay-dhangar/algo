export type AccentTheme = 'default' | 'high-contrast' | 'neon';

export const ACCENT_THEME_STORAGE_KEY = 'algo-accent-theme';
export const ACCENT_THEME_ATTRIBUTE = 'data-accent-theme';
export const ACCENT_THEME_EVENT = 'algo-accent-theme-change';

export interface AccentThemeOption {
  value: AccentTheme;
  label: string;
  description: string;
}

export const ACCENT_THEMES: AccentThemeOption[] = [
  { value: 'default', label: 'Default', description: "Docusaurus's standard light/dark theme" },
  { value: 'high-contrast', label: 'High Contrast', description: 'Maximum contrast for low vision & accessibility' },
  { value: 'neon', label: 'Neon', description: 'Cyan & purple cyberpunk accent' },
];

export function isAccentTheme(value: string | null): value is AccentTheme {
  return value === 'default' || value === 'high-contrast' || value === 'neon';
}

/** Reads the persisted accent theme, defaulting to 'default' if unset/invalid/unavailable. */
export function getStoredAccentTheme(): AccentTheme {
  if (typeof window === 'undefined') return 'default';
  try {
    if (typeof document !== 'undefined') {
      const attr = document.documentElement.getAttribute(ACCENT_THEME_ATTRIBUTE);
      if (attr && isAccentTheme(attr)) {
        return attr;
      }
    }
    const stored = window.localStorage.getItem(ACCENT_THEME_STORAGE_KEY);
    return isAccentTheme(stored) ? stored : 'default';
  } catch {
    // localStorage can throw in private-browsing modes or when disabled by policy.
    return 'default';
  }
}

export function storeAccentTheme(theme: AccentTheme): void {
  if (typeof window === 'undefined') return;
  try {
    if (theme === 'default') {
      window.localStorage.removeItem(ACCENT_THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(ACCENT_THEME_STORAGE_KEY, theme);
    }
  } catch {
    // Ignore — the theme will simply not persist across reloads.
  }
}

/** Applies (or clears) the `data-accent-theme` attribute that custom.css keys off of. */
export function applyAccentTheme(theme: AccentTheme): void {
  if (typeof document === 'undefined') return;
  if (theme === 'default') {
    document.documentElement.removeAttribute(ACCENT_THEME_ATTRIBUTE);
  } else {
    document.documentElement.setAttribute(ACCENT_THEME_ATTRIBUTE, theme);
  }

  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent(ACCENT_THEME_EVENT, { detail: theme }));
    } catch {
      // Ignore in environments where CustomEvent might be restricted
    }
  }
}

