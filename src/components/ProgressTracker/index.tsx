import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { safeJsonParse } from '../../utils/safeStorage';


interface Props {
  topicId: string;
  topicTitle: string;
}

export default function ProgressTracker({ topicId, topicTitle }: Props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    try {
      const progress = safeJsonParse<{ [key: string]: any }>('algo_progress', {});
      setIsCompleted(!!progress[topicId]);
    } catch (e) {
      console.error('Error loading progress:', e);
    }
  }, [topicId]);

  const toggle = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    if (newStatus) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300); // Reduced animation latency
    }
    try {
      const progress = safeJsonParse<{ [key: string]: any }>('algo_progress', {});
      progress[topicId] = newStatus;
      progress[`${topicId}_title`] = topicTitle;
      localStorage.setItem('algo_progress', JSON.stringify(progress));
      window.dispatchEvent(new CustomEvent('progressUpdated', {
        detail: { topicId, completed: newStatus, title: topicTitle }
      }));
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  };

  return (
    <div 
      className={clsx(
        'alert',
        isCompleted ? 'alert--success' : 'alert--info',
        'docusaurus-mt-lg',
        'no-print'
      )}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '16px 24px',
        borderRadius: 'var(--ifm-alert-border-radius)',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: 'var(--ifm-global-shadow-sm)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {/* Informational Text Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '240px', flex: 1 }}>
        {isCompleted ? (
          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ifm-color-success-darker)' }}>
            🎉 Great work! Topic mastered.
          </span>
        ) : (
          <span style={{ fontSize: '0.95rem', color: 'var(--ifm-color-info-darker)' }}>
            Finished reading? Mark this topic as complete.
          </span>
        )}
      </div>

      {/* Interactive Button Section */}
      <button
        onClick={toggle}
        className={clsx(
          'button',
          isCompleted ? 'button--success' : 'button--outline button--info',
          'button--md'
        )}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          transform: animate ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s, border-color 0.2s',
          cursor: 'pointer',
        }}
      >
        {isCompleted ? (
          <>
            <FaCheckCircle style={{ verticalAlign: 'middle' }} /> 
            <span>Completed!</span>
          </>
        ) : (
          <>
            <FaRegCircle style={{ verticalAlign: 'middle' }} /> 
            <span>Mark as Complete</span>
          </>
        )}
      </button>
    </div>
  );
}
