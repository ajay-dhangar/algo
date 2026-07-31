import {
  ACCENT_THEME_STORAGE_KEY,
  applyAccentTheme,
  getStoredAccentTheme,
  storeAccentTheme,
} from '../../utils/accentTheme';

describe('accentTheme utils', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-accent-theme');
  });

  describe('getStoredAccentTheme', () => {
    test('returns "default" when nothing is stored', () => {
      expect(getStoredAccentTheme()).toBe('default');
    });

    test('returns the stored theme when valid', () => {
      localStorage.setItem(ACCENT_THEME_STORAGE_KEY, 'neon');
      expect(getStoredAccentTheme()).toBe('neon');
    });

    test('falls back to "default" for an invalid/corrupted value', () => {
      localStorage.setItem(ACCENT_THEME_STORAGE_KEY, 'not-a-real-theme');
      expect(getStoredAccentTheme()).toBe('default');
    });
  });

  describe('storeAccentTheme', () => {
    test('persists a non-default theme', () => {
      storeAccentTheme('high-contrast');
      expect(localStorage.getItem(ACCENT_THEME_STORAGE_KEY)).toBe('high-contrast');
    });

    test('clears storage when set back to "default"', () => {
      localStorage.setItem(ACCENT_THEME_STORAGE_KEY, 'neon');
      storeAccentTheme('default');
      expect(localStorage.getItem(ACCENT_THEME_STORAGE_KEY)).toBeNull();
    });
  });

  describe('applyAccentTheme', () => {
    test('sets the data-accent-theme attribute for a non-default theme', () => {
      applyAccentTheme('neon');
      expect(document.documentElement.getAttribute('data-accent-theme')).toBe('neon');
    });

    test('removes the attribute for "default"', () => {
      document.documentElement.setAttribute('data-accent-theme', 'high-contrast');
      applyAccentTheme('default');
      expect(document.documentElement.getAttribute('data-accent-theme')).toBeNull();
    });
  });
});
