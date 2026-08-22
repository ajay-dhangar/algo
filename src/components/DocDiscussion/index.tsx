import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import GiscusComponent from '@site/src/components/GiscusComponent';
import clsx from 'clsx';
import styles from './styles.module.css';

interface DocDiscussionProps {
  /**
   * Page title, used only for the section heading copy.
   */
  title?: string;
}

export default function DocDiscussion({ title }: DocDiscussionProps): JSX.Element {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);

  return (
    <section className={styles.discussionSection}>
      {/* ========================================================================= */}
      {/* 1. INTERACTIVE RATING WIDGET LAYER                                        */}
      {/* ========================================================================= */}
      <div className={styles.feedbackWidget}>
        <h3 className={styles.feedbackHeading}>Was this page helpful?</h3>
        <div className={styles.feedbackActions}>
          <button
            type="button"
            className={clsx(styles.feedbackBtn, styles.btnHelpful, {
              [styles.btnActive]: feedback === 'helpful',
            })}
            onClick={() => setFeedback('helpful')}
          >
            <span>👍</span> Yes, helpful
          </button>
          <button
            type="button"
            className={clsx(styles.feedbackBtn, styles.btnNotHelpful, {
              [styles.btnActive]: feedback === 'not-helpful',
            })}
            onClick={() => setFeedback('not-helpful')}
          >
            <span>👎</span> Needs work
          </button>
        </div>

        {/* Dynamic Contextual Guidance Statements Based On Selection */}
        {feedback === 'helpful' && (
          <p className={clsx(styles.contextNote, styles.fadeText)}>
            Awesome! Share your thoughts or extensions below with the team. ✨
          </p>
        )}
        {feedback === 'not-helpful' && (
          <p className={clsx(styles.contextNote, styles.fadeText)}>
            Spot an error? You can also open a formal{' '}
            <Link to="https://github.com/ajay-dhangar/algo/issues" target="_blank" className={styles.inlineIssueLink}>
              GitHub Issue
            </Link>{' '}
            for explicit tracking.
          </p>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. REFINED DISCUSSIONS FORUM ENGINE CARD                                  */}
      {/* ========================================================================= */}
      <div className={styles.discussionCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerTitleRow}>
            <span className={styles.iconBubble}>💬</span>
            <h2 className={styles.mainHeading}>Discuss this page</h2>
          </div>
          <p className={styles.subtextHeading}>
            Have a question or spot something confusing{title ? ` in "${title}"` : ''}? Ask below. 
            Backed by GitHub Discussions—maintainers receive system notifications directly.
          </p>
        </div>

        <div className={styles.giscusContainer}>
          <GiscusComponent />
        </div>
      </div>
    </section>
  );
}
