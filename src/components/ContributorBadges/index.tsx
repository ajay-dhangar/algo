import React, { useEffect, useRef, useState } from "react";
import {
  EarnedBadge,
  buildReadmeMarkdown,
  buildShieldsBadgeUrl,
  topBadge,
} from "../../utils/prAchievements";
import styles from "./styles.module.css";

/** Small row of earned-badge chips, e.g. shown on a contributor card */
export const BadgeRow: React.FC<{ badges: EarnedBadge[] }> = ({ badges }) => {
  if (badges.length === 0) return null;
  return (
    <div className={styles.badgeRow}>
      {badges.map((badge) => (
        <span
          key={badge.id}
          className={styles.badgeChip}
          title={badge.description}
        >
          <span aria-hidden="true">{badge.emoji}</span>
          {badge.label}
        </span>
      ))}
    </div>
  );
};

interface ReadmeBadgeButtonProps {
  username: string;
  mergedPRCount: number;
  badges: EarnedBadge[];
}

/**
 * "Get README Badge" button — opens a small popover with a live shields.io
 * preview and copy-pasteable markdown the contributor can drop into their
 * own GitHub profile README. shields.io renders the badge image directly
 * from the URL, so no backend/hosting is needed on our side.
 */
export const ReadmeBadgeButton: React.FC<ReadmeBadgeButtonProps> = ({
  username,
  mergedPRCount,
  badges,
}) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  // Outside-click dismiss
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Keyboard dismiss (Escape key)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus management: move focus into the popover when it opens
  useEffect(() => {
    if (open && copyButtonRef.current) {
      copyButtonRef.current.focus();
    }
  }, [open]);

  const best = topBadge(badges);
  if (!best || mergedPRCount === 0) return null;

  const imgUrl = buildShieldsBadgeUrl("Algo", `${best.label} (${mergedPRCount} PRs)`, best.color);
  const markdown = buildReadmeMarkdown(username, best, mergedPRCount);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the code box below still lets them select + copy manually
    }
  };

  return (
    <div className={styles.readmeBadgeWrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.readmeBadgeButton}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span aria-hidden="true">🎖️</span>
        README Badge
      </button>

      {open && (
        <div 
          className={styles.popover} 
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="README badge markdown"
        >
          <p className={styles.popoverTitle}>Add this to your README</p>
          <div className={styles.popoverPreview}>
            <img src={imgUrl} alt={`${best.label} badge`} />
          </div>
          <div className={styles.popoverCodeBox}>
            <code className={styles.popoverCode}>{markdown}</code>
          </div>
          <button type="button" className={styles.copyButton} onClick={handleCopy} ref={copyButtonRef}>
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
        </div>
      )}
    </div>
  );
};
