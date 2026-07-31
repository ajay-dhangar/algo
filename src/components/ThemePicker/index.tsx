import React, { useEffect, useRef, useState } from 'react';
import { FiCheck, FiDroplet } from 'react-icons/fi';
import {
  ACCENT_THEMES,
  applyAccentTheme,
  getStoredAccentTheme,
  storeAccentTheme,
  type AccentTheme,
} from '../../utils/accentTheme';
import styles from './styles.module.css';

export default function ThemePicker(): JSX.Element {
  const [activeTheme, setActiveTheme] = useState<AccentTheme>('default');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync UI state with whatever was applied by the head-init script (see
  // docusaurus.config.js) or set in a previous visit, once we're mounted.
  useEffect(() => {
    setActiveTheme(getStoredAccentTheme());
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const selectTheme = (theme: AccentTheme) => {
    setActiveTheme(theme);
    applyAccentTheme(theme);
    storeAccentTheme(theme);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Choose a color theme"
        title="Choose a color theme"
      >
        <FiDroplet size={18} />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu" aria-label="Color theme options">
          {ACCENT_THEMES.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={activeTheme === option.value}
              className={styles.menuItem}
              onClick={() => selectTheme(option.value)}
            >
              <span className={styles.swatch} data-swatch={option.value} aria-hidden="true" />
              <span className={styles.menuItemText}>
                <span className={styles.menuItemLabel}>{option.label}</span>
                <span className={styles.menuItemDescription}>{option.description}</span>
              </span>
              {activeTheme === option.value && <FiCheck size={16} className={styles.checkIcon} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
