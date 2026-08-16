import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import {
  type AccentTheme,
  ACCENT_THEME_STORAGE_KEY,
  ACCENT_THEME_EVENT,
  getStoredAccentTheme,
  storeAccentTheme,
  applyAccentTheme,
  isAccentTheme,
} from '../utils/accentTheme';
import {
  type CodeTheme,
  CODE_THEME_STORAGE_KEY,
  CODE_THEME_EVENT,
  getStoredCodeTheme,
  storeCodeTheme,
  applyCodeTheme,
  isCodeTheme,
} from '../utils/codeTheme';

export interface AccentThemeContextType {
  accentTheme: AccentTheme;
  setAccentTheme: (theme: AccentTheme) => void;
  codeTheme: CodeTheme;
  setCodeTheme: (theme: CodeTheme) => void;
}

const AccentThemeContext = createContext<AccentThemeContextType | undefined>(undefined);

export interface AccentThemeProviderProps {
  children: ReactNode;
}

export function AccentThemeProvider({ children }: AccentThemeProviderProps): JSX.Element {
  const [accentTheme, setAccentThemeState] = useState<AccentTheme>(() => getStoredAccentTheme());
  const [codeTheme, setCodeThemeState] = useState<CodeTheme>(() => getStoredCodeTheme());

  const setAccentTheme = useCallback((theme: AccentTheme) => {
    setAccentThemeState(theme);
    applyAccentTheme(theme);
    storeAccentTheme(theme);
  }, []);

  const setCodeTheme = useCallback((theme: CodeTheme) => {
    setCodeThemeState(theme);
    applyCodeTheme(theme);
    storeCodeTheme(theme);
  }, []);

  useEffect(() => {
    // Synchronize initial state on mount with DOM attribute or localStorage
    const currentAccent = getStoredAccentTheme();
    setAccentThemeState(currentAccent);
    applyAccentTheme(currentAccent);

    const currentCode = getStoredCodeTheme();
    setCodeThemeState(currentCode);
    applyCodeTheme(currentCode);

    // Listen for custom event within the same window
    const handleAccentChange = (e: Event) => {
      const customEvent = e as CustomEvent<AccentTheme>;
      if (customEvent.detail && isAccentTheme(customEvent.detail)) {
        setAccentThemeState(customEvent.detail);
      } else {
        setAccentThemeState(getStoredAccentTheme());
      }
    };

    const handleCodeChange = (e: Event) => {
      const customEvent = e as CustomEvent<CodeTheme>;
      if (customEvent.detail && isCodeTheme(customEvent.detail)) {
        setCodeThemeState(customEvent.detail);
      } else {
        setCodeThemeState(getStoredCodeTheme());
      }
    };

    // Listen for storage events across tabs/windows
    const handleStorage = (e: StorageEvent) => {
      if (e.key === ACCENT_THEME_STORAGE_KEY) {
        const newAccent = isAccentTheme(e.newValue) ? e.newValue : 'default';
        setAccentThemeState(newAccent);
        applyAccentTheme(newAccent);
      } else if (e.key === CODE_THEME_STORAGE_KEY) {
        const newCode = isCodeTheme(e.newValue) ? e.newValue : 'default';
        setCodeThemeState(newCode);
        applyCodeTheme(newCode);
      }
    };

    window.addEventListener(ACCENT_THEME_EVENT, handleAccentChange);
    window.addEventListener(CODE_THEME_EVENT, handleCodeChange);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(ACCENT_THEME_EVENT, handleAccentChange);
      window.removeEventListener(CODE_THEME_EVENT, handleCodeChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const contextValue = useMemo<AccentThemeContextType>(
    () => ({
      accentTheme,
      setAccentTheme,
      codeTheme,
      setCodeTheme,
    }),
    [accentTheme, setAccentTheme, codeTheme, setCodeTheme]
  );

  return (
    <AccentThemeContext.Provider value={contextValue}>
      {children}
    </AccentThemeContext.Provider>
  );
}

export function useAccentTheme(): {
  accentTheme: AccentTheme;
  setAccentTheme: (theme: AccentTheme) => void;
} {
  const context = useContext(AccentThemeContext);
  if (!context) {
    // Fallback if rendered outside provider (e.g. isolated test or standalone component)
    return {
      accentTheme: getStoredAccentTheme(),
      setAccentTheme: (theme: AccentTheme) => {
        applyAccentTheme(theme);
        storeAccentTheme(theme);
      },
    };
  }
  return {
    accentTheme: context.accentTheme,
    setAccentTheme: context.setAccentTheme,
  };
}

export function useCodeTheme(): {
  codeTheme: CodeTheme;
  setCodeTheme: (theme: CodeTheme) => void;
} {
  const context = useContext(AccentThemeContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      codeTheme: getStoredCodeTheme(),
      setCodeTheme: (theme: CodeTheme) => {
        applyCodeTheme(theme);
        storeCodeTheme(theme);
      },
    };
  }
  return {
    codeTheme: context.codeTheme,
    setCodeTheme: context.setCodeTheme,
  };
}

export default AccentThemeContext;
