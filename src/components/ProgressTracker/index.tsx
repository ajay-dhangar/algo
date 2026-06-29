import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { FiCheckCircle, FiCircle, FiTrendingUp, FiAward } from 'react-icons/fi';
import { safeJsonParse } from '../../utils/safeStorage';

interface Props {
  topicId: string;
  topicTitle: string;
}

export default function ProgressTracker({ topicId, topicTitle }: Props) {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);

  // Safely check and read state from localStorage
  useEffect(() => {
    try {
      const progress = safeJsonParse<{ [key: string]: any }>('algo_progress', {});
      setIsCompleted(!!progress[topicId]);
    } catch (error) {
      console.error('[Algo Progress] Failed to parse engine storage state:', error);
    }
  }, [topicId]);

  // Handle local state modification and sync globally
  const toggleProgress = useCallback(() => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    setAnimate(true);
    
    setTimeout(() => setAnimate(false), 250);

    try {
      const progress = safeJsonParse<{ [key: string]: any }>('algo_progress', {});
      
      // Sync structured telemetry object schema
      progress[topicId] = nextState;
      progress[`${topicId}_title`] = topicTitle;
      progress[`${topicId}_updatedAt`] = new Date().toISOString();
      
      localStorage.setItem('algo_progress', JSON.stringify(progress));

      // Dispatch unified pipeline context updates across component domains
      window.dispatchEvent(
        new CustomEvent('progressUpdated', {
          detail: { topicId, completed: nextState, title: topicTitle },
        })
      );
    } catch (error) {
      console.error('[Algo Progress] Failed to write engine storage state:', error);
    }
  }, [isCompleted, topicId, topicTitle]);

  return (
    <div
      className={clsx('no-print margin-top--lg')}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '14px 20px',
        borderRadius: '12px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        backgroundColor: 'var(--ifm-card-background-color)',
        boxShadow: 'var(--ifm-global-shadow-sm)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Informational Tracking Metadata Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '260px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '36px',
            width: '36px',
            borderRadius: '8px',
            backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'var(--ifm-color-emphasis-100)',
            border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'var(--ifm-color-emphasis-200)'}`,
            color: isCompleted ? 'var(--ifm-color-success)' : 'var(--ifm-color-primary)',
            transition: 'all 0.2s ease',
          }}
        >
          {isCompleted ? <FiAward size={18} /> : <FiTrendingUp size={18} />}
        </div>

        <div>
          <span
            style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              opacity: 0.5,
            }}
          >
            Telemetry Integration
          </span>
          <p
            style={{
              margin: 0,
              fontSize: '0.9rem',
              fontWeight: isCompleted ? 600 : 500,
              color: isCompleted ? 'var(--ifm-color-success-darker)' : 'var(--ifm-heading-color)',
            }}
          >
            {isCompleted ? (
              <span>🎉 Optimization Mastered! Node checkpoint successfully compiled.</span>
            ) : (
              <span>Completed working through this block? Sync progress to workspace.</span>
            )}
          </p>
        </div>
      </div>

      {/* Modern High-Fidelity Button Interface */}
      <button
        type="button"
        onClick={toggleProgress}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '8px 16px',
          fontSize: '0.85rem',
          fontWeight: 700,
          borderRadius: '10px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          border: '1px solid transparent',
          backgroundColor: isCompleted ? 'var(--ifm-color-success)' : 'var(--ifm-color-emphasis-100)',
          color: isCompleted ? '#ffffff' : 'var(--ifm-heading-color)',
          borderColor: isCompleted ? 'var(--ifm-color-success-dark)' : 'var(--ifm-color-emphasis-300)',
          transform: animate ? 'scale(0.96)' : 'scale(1)',
          boxShadow: isCompleted ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none',
          transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onMouseEnter={(e) => {
          if (!isCompleted) {
            e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-200)';
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-400)';
          } else {
            e.currentTarget.style.opacity = '0.9';
          }
        }}
        onMouseLeave={(e) => {
          if (!isCompleted) {
            e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
          } else {
            e.currentTarget.style.opacity = '1';
          }
        }}
      >
        {isCompleted ? (
          <>
            <FiCheckCircle size={16} strokeWidth={2.5} />
            <span>Mastery Verified</span>
          </>
        ) : (
          <>
            <FiCircle size={16} strokeWidth={2.5} />
            <span>Commit to Profile</span>
          </>
        )}
      </button>
    </div>
  );
}