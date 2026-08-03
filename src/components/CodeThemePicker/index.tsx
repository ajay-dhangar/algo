import React, { useEffect, useRef, useState } from 'react';
import { FiCheck, FiCode } from 'react-icons/fi';
import {
  CODE_THEMES,
  applyCodeTheme,
  getStoredCodeTheme,
  storeCodeTheme,
  type CodeTheme,
} from '../../utils/codeTheme';
import styles from './styles.module.css';

export default function CodeThemePicker(): JSX.Element {
  const [activeTheme, setActiveTheme] = useState<CodeTheme>('default');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTheme(getStoredCodeTheme());
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

  const selectTheme = (theme: CodeTheme) => {
    setActiveTheme(theme);
    applyCodeTheme(theme);
    storeCodeTheme(theme);
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
        aria-label="Choose a code theme"
        title="Choose a code theme"
      >
        <FiCode size={18} />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu" aria-label="Code theme options">
          {CODE_THEMES.map((option) => (
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
