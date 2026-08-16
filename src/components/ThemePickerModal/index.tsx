import React, { useRef } from "react";
import { FiCheck, FiDroplet, FiCode, FiX } from "react-icons/fi";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import {
  ACCENT_THEMES,
  type AccentTheme,
} from "../../utils/accentTheme";
import {
  CODE_THEMES,
  type CodeTheme,
} from "../../utils/codeTheme";
import { useAccentTheme, useCodeTheme } from "../../contexts/AccentThemeContext";
import styles from "./ThemePickerModal.module.css";

interface ThemePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemePickerModal({ isOpen, onClose }: ThemePickerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, { isOpen, onClose });

  const { accentTheme: activeAccent, setAccentTheme } = useAccentTheme();
  const { codeTheme: activeCode, setCodeTheme } = useCodeTheme();

  const selectAccent = (theme: AccentTheme) => {
    setAccentTheme(theme);
  };

  const selectCode = (theme: CodeTheme) => {
    setCodeTheme(theme);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={styles.overlay}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-picker-modal-title"
        className={styles.modal}
      >
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 id="theme-picker-modal-title" className={styles.title}>
              Theme Picker
            </h2>
            <p className={styles.subtitle}>
              Customize your accent color and code block appearance
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close theme picker"
            className={styles.closeButton}
          >
            <FiX size={18} />
          </button>
        </div>

        <div className={styles.body}>
          {/* Accent Theme Section */}
          <section aria-labelledby="accent-theme-heading" className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiDroplet size={15} className={styles.sectionIcon} />
              <h3 id="accent-theme-heading" className={styles.sectionTitle}>
                Accent Color
              </h3>
            </div>
            <div className={styles.optionList} role="group" aria-label="Accent color options">
              {ACCENT_THEMES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={activeAccent === option.value}
                  onClick={() => selectAccent(option.value)}
                  className={styles.option}
                  data-active={activeAccent === option.value ? "true" : undefined}
                >
                  <span
                    className={styles.swatch}
                    data-swatch={option.value}
                    aria-hidden="true"
                  />
                  <span className={styles.optionText}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    <span className={styles.optionDesc}>{option.description}</span>
                  </span>
                  {activeAccent === option.value && (
                    <FiCheck size={15} className={styles.checkIcon} />
                  )}
                </button>
              ))}
            </div>
          </section>

          <div className={styles.divider} aria-hidden="true" />

          {/* Code Theme Section */}
          <section aria-labelledby="code-theme-heading" className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiCode size={15} className={styles.sectionIcon} />
              <h3 id="code-theme-heading" className={styles.sectionTitle}>
                Code Block Style
              </h3>
            </div>
            <div className={styles.optionList} role="group" aria-label="Code theme options">
              {CODE_THEMES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={activeCode === option.value}
                  onClick={() => selectCode(option.value)}
                  className={styles.option}
                  data-active={activeCode === option.value ? "true" : undefined}
                >
                  <span
                    className={styles.swatch}
                    data-code-swatch={option.value}
                    aria-hidden="true"
                  />
                  <span className={styles.optionText}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    <span className={styles.optionDesc}>{option.description}</span>
                  </span>
                  {activeCode === option.value && (
                    <FiCheck size={15} className={styles.checkIcon} />
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer hint */}
        <div className={styles.footer}>
          <kbd className={styles.kbdHint}>T</kbd>
          <span className={styles.footerText}>or</span>
          <kbd className={styles.kbdHint}>Ctrl</kbd>
          <span className={styles.footerText}>+</span>
          <kbd className={styles.kbdHint}>Shift</kbd>
          <span className={styles.footerText}>+</span>
          <kbd className={styles.kbdHint}>T</kbd>
          <span className={styles.footerText}>to toggle · changes apply instantly &amp; persist</span>
        </div>
      </div>
    </div>
  );
}
