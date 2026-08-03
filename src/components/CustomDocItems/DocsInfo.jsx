import React from "react";
import { useLocation } from "react-router-dom";
import {
  FiEdit3,
  FiPrinter,
  FiAlertCircle,
  FiClock,
  FiCalendar,
  FiUser,
} from "react-icons/fi";
import styles from "./styles.module.css";
import ShareButton from "./ShareButton";

function DocsInfo({ docsPluginId, ...props }) {
  const location = useLocation();
  
  const openDocIssueURL = `https://github.com/ajay-dhangar/algo/issues/new?assignees=&labels=&template=---doc-error-report.md&title=Issue with ajay-dhangar.github.io/algo${encodeURIComponent(location.pathname)}`;

  const formatDocDate = (dateVal) => {
    if (!dateVal) return null;
    
    const dateObj = new Date(dateVal);
    
    // Check if the date object is invalid
    if (isNaN(dateObj.getTime())) return null;
    
    // Format to a clean, readable string (e.g., "Oct 24, 2026" or your local format)
    return dateObj.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRelativeTime = (dateVal) => {
  if (!dateVal) return "";

  const now = new Date();
  const updated = new Date(dateVal);

  const diffTime = now.getTime() - updated.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;

  const months = Math.floor(diffDays / 30);

  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months / 12);

  return years === 1 ? "1 year ago" : `${years} years ago`;
};

  const formattedDate = formatDocDate(props.lastUpdatedAt);
  const relativeDate = getRelativeTime(props.lastUpdatedAt);
  const hasMeta = !!(formattedDate || props.lastUpdatedBy || props.readingTimeInWords);

  return (
    <div className={`${styles.docsInfoWrapper} my-4`}>
      <div className={styles.docsInfoContainer}>
        {/* Left Section – Meta Info */}
        {hasMeta && (
          <div className={styles.metaInfo}>
            {formattedDate && (
              <span className={styles.metaItem}>
  <FiCalendar className={styles.icon} />

  <strong>Last Updated:</strong>&nbsp;

  <time
    dateTime={new Date(props.lastUpdatedAt).toISOString()}
    title={new Date(props.lastUpdatedAt).toLocaleString()}
  >
    {formattedDate}
  </time>

  <span style={{ color: "#888", marginLeft: "6px" }}>
    ({relativeDate})
  </span>
</span>
            )}
            {props.readingTimeInWords && (
              <span className={styles.metaItem}>
                <FiClock className={styles.icon} /> {props.readingTimeInWords}
              </span>
            )}
            {props.lastUpdatedBy && (
              <span className={styles.metaItem}>
  <FiUser className={styles.icon} />

  <strong>Updated By:</strong>&nbsp;

  {props.lastUpdatedBy}
</span>
            )}
          </div>
        )}

        {/* Right Section – Actions */}
        <div className={`${styles.actions} no-print`}>
          {props.editUrl && (
            <a
              href={props.editUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.actionBtn}
            >
              <FiEdit3 className={styles.icon} />
              Edit
            </a>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            className={styles.actionBtn}
            aria-label="Print this page"
          >
            <FiPrinter className={styles.icon} />
            Print
          </button>

          <a
            href={openDocIssueURL}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.actionBtn}
          >
            <FiAlertCircle className={styles.icon} />
            Report
          </a>

          <ShareButton title={props.title} />
        </div>
      </div>
    </div>
  );
}

export default DocsInfo;