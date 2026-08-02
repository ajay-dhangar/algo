import { applyCodeTheme, CODE_THEME_STORAGE_KEY, getStoredCodeTheme, storeCodeTheme } from '../../utils/codeTheme';

describe('codeTheme utils', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-code-theme');
  });

  describe('getStoredCodeTheme', () => {
    test('returns "default" when nothing is stored', () => {
      expect(getStoredCodeTheme()).toBe('default');
    });

    test('returns the stored theme when valid', () => {
      localStorage.setItem(CODE_THEME_STORAGE_KEY, 'solarized');
      expect(getStoredCodeTheme()).toBe('solarized');
    });

    test('falls back to "default" for an invalid/corrupted value', () => {
      localStorage.setItem(CODE_THEME_STORAGE_KEY, 'not-a-real-theme');
      expect(getStoredCodeTheme()).toBe('default');
    });
  });

  describe('storeCodeTheme', () => {
    test('persists a non-default theme', () => {
      storeCodeTheme('midnight');
      expect(localStorage.getItem(CODE_THEME_STORAGE_KEY)).toBe('midnight');
    });

    test('clears storage when set back to "default"', () => {
      localStorage.setItem(CODE_THEME_STORAGE_KEY, 'solarized');
      storeCodeTheme('default');
      expect(localStorage.getItem(CODE_THEME_STORAGE_KEY)).toBeNull();
    });
  });

  describe('applyCodeTheme', () => {
    test('sets the data-code-theme attribute for a non-default theme', () => {
      applyCodeTheme('midnight');
      expect(document.documentElement.getAttribute('data-code-theme')).toBe('midnight');
    });

    test('removes the attribute for "default"', () => {
      document.documentElement.setAttribute('data-code-theme', 'solarized');
      applyCodeTheme('default');
      expect(document.documentElement.getAttribute('data-code-theme')).toBeNull();
    });
  });
});
