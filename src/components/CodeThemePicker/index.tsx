import React, { useEffect, useRef, useState, useCallback } from 'react';
import clsx from 'clsx';
import { FiCheck, FiCode, FiChevronDown } from 'react-icons/fi';
import {
  CODE_THEMES,
  applyCodeTheme,
  getStoredCodeTheme,
  storeCodeTheme,
  type CodeTheme,
} from '../../utils/codeTheme';
import styles from './styles.module.css';

interface CodeThemePickerProps {
  /** Injected by NavbarItem swizzle: enables full-width layout inside Docusaurus mobile drawer */
  isMobile?: boolean;
  className?: string;
}

export default function CodeThemePicker({
  isMobile = false,
  className,
}: CodeThemePickerProps): JSX.Element {
  const [activeTheme, setActiveTheme] = useState<CodeTheme>('default');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state with local storage / Docusaurus head script
  useEffect(() => {
    setActiveTheme(getStoredCodeTheme());
  }, []);

  // Keyboard and outside click listeners
  useEffect(() => {
    if (!isOpen || isMobile) return undefined;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
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
  }, [isOpen, isMobile]);

  const selectTheme = useCallback((theme: CodeTheme) => {
    setActiveTheme(theme);
    applyCodeTheme(theme);
    storeCodeTheme(theme);
    setIsOpen(false);
  }, []);

  const activeOption =
    CODE_THEMES.find((t) => t.value === activeTheme) || CODE_THEMES[0];

  // ---------------------------------------------------------------------------
  // 1. MOBILE DRAWER VIEW (Rendered inside Docusaurus Mobile Menu)
  // ---------------------------------------------------------------------------
  if (isMobile) {
    return (
      <div className={clsx(styles.mobileContainer, className)}>
        <div className={styles.mobileHeader}>
          <span className={styles.mobileTitle}>Code Block Theme</span>
          <span className={styles.mobileActiveLabel}>{activeOption.label}</span>
        </div>
        <div
          className={styles.mobileGrid}
          role="radiogroup"
          aria-label="Code Theme Options"
        >
          {CODE_THEMES.map((option) => {
            const isSelected = activeTheme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={option.label}
                title={`${option.label} - ${option.description}`}
                className={clsx(
                  styles.mobileItem,
                  isSelected && styles.activeItem
                )}
                onClick={() => selectTheme(option.value)}
              >
                <span
                  className={styles.codeBadge}
                  data-theme={option.value}
                  aria-hidden="true"
                >
                  {`{}`}
                </span>
                <span className={styles.mobileItemLabel}>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. DESKTOP POPOVER VIEW (Navbar Dropdown)
  // ---------------------------------------------------------------------------
  return (
    <div ref={containerRef} className={clsx(styles.container, className)}>
      <button
        type="button"
        className={clsx(styles.trigger, isOpen && styles.triggerActive)}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Code theme: ${activeOption.label}`}
        title={`Code Syntax Theme: ${activeOption.label}`}
      >
        <span className={styles.triggerIconWrapper}>
          <FiCode className={styles.codeIcon} />
          {/* Active dot indicator */}
          <span className={styles.activeDot} />
        </span>
        <FiChevronDown
          className={clsx(styles.chevronIcon, isOpen && styles.chevronOpen)}
        />
      </button>

      {isOpen && (
        <div
          className={styles.menu}
          role="menu"
          aria-label="Code syntax theme options"
        >
          <div className={styles.menuHeader}>
            <span>Syntax Highlighting</span>
            <span className={styles.headerTag}>Prism</span>
          </div>

          {CODE_THEMES.map((option) => {
            const isSelected = activeTheme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                className={clsx(
                  styles.menuItem,
                  isSelected && styles.menuItemActive
                )}
                onClick={() => selectTheme(option.value)}
              >
                {/* Mini Visual Code Tag */}
                <span
                  className={styles.codeBadge}
                  data-theme={option.value}
                  aria-hidden="true"
                >
                  {`</>`}
                </span>

                <span className={styles.menuItemText}>
                  <span className={styles.menuItemLabel}>{option.label}</span>
                  <span className={styles.menuItemDescription}>
                    {option.description}
                  </span>
                </span>

                {isSelected && <FiCheck className={styles.checkIcon} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}