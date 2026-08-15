import React, { useEffect, useRef, useState, useCallback } from 'react';
import clsx from 'clsx';
import { FiCheck, FiDroplet, FiChevronDown } from 'react-icons/fi';
import {
  ACCENT_THEMES,
  applyAccentTheme,
  getStoredAccentTheme,
  storeAccentTheme,
  type AccentTheme,
} from '../../utils/accentTheme';
import styles from './styles.module.css';

interface ThemePickerProps {
  /** Enables full-width grid layout when rendered inside mobile drawer */
  isMobile?: boolean;
  className?: string;
}

export default function ThemePicker({
  isMobile = false,
  className,
}: ThemePickerProps): JSX.Element {
  const [activeTheme, setActiveTheme] = useState<AccentTheme>('default');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state with local storage on mount
  useEffect(() => {
    setActiveTheme(getStoredAccentTheme());
  }, []);

  // Handle outside click & escape key
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

  const selectTheme = useCallback((theme: AccentTheme) => {
    setActiveTheme(theme);
    applyAccentTheme(theme);
    storeAccentTheme(theme);
    setIsOpen(false);
  }, []);

  const activeOption =
    ACCENT_THEMES.find((t) => t.value === activeTheme) || ACCENT_THEMES[0];

  // ---------------------------------------------------------------------------
  // MOBILE DRAWER VARIANT (Grid View)
  // ---------------------------------------------------------------------------
  if (isMobile) {
    return (
      <div className={clsx(styles.mobileContainer, className)}>
        <div className={styles.mobileHeader}>
          <span className={styles.mobileTitle}>Accent Theme</span>
          <span className={styles.mobileActiveLabel}>{activeOption.label}</span>
        </div>
        <div className={styles.mobileGrid} role="radiogroup" aria-label="Accent Themes">
          {ACCENT_THEMES.map((option) => {
            const isSelected = activeTheme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={option.label}
                title={`${option.label} - ${option.description}`}
                className={clsx(styles.mobileItem, isSelected && styles.activeItem)}
                onClick={() => selectTheme(option.value)}
              >
                <span
                  className={styles.swatch}
                  data-swatch={option.value}
                  aria-hidden="true"
                />
                <span className={styles.mobileItemLabel}>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // DESKTOP POPOVER VARIANT
  // ---------------------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, className)}
    >
      <button
        type="button"
        className={clsx(styles.trigger, isOpen && styles.triggerActive)}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={`Current accent theme: ${activeOption.label}`}
        title={`Accent Theme: ${activeOption.label}`}
      >
        <span className={styles.triggerIconWrapper}>
          <FiDroplet className={styles.dropletIcon} />
          {/* Visual Swatch Indicator on Trigger */}
          <span
            className={styles.triggerSwatch}
            data-swatch={activeTheme}
            aria-hidden="true"
          />
        </span>
        <FiChevronDown
          className={clsx(styles.chevronIcon, isOpen && styles.chevronOpen)}
        />
      </button>

      {isOpen && (
        <div
          className={styles.menu}
          role="menu"
          aria-label="Color theme options"
        >
          <div className={styles.menuHeader}>Accent Theme</div>

          {ACCENT_THEMES.map((option) => {
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
                <span
                  className={styles.swatch}
                  data-swatch={option.value}
                  aria-hidden="true"
                />
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