import React, { useState, useEffect } from 'react';

interface Props {
  topicId: string;
  topicTitle: string;
}

export default function ProgressTracker({ topicId, topicTitle }: Props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('algo_progress');
      if (saved) {
        const progress = JSON.parse(saved);
        setIsCompleted(!!progress[topicId]);
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
  }, [topicId]);

  const toggle = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    if (newStatus) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }
    try {
      const saved = localStorage.getItem('algo_progress');
      const progress = saved ? JSON.parse(saved) : {};
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
    <div style={{
      margin: '28px 0 12px',
      padding: '14px 20px',
      background: isCompleted
        ? 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)'
        : 'linear-gradient(135deg, #e8f0fe 0%, #f0f4ff 100%)',
      borderRadius: '10px',
      border: `1.5px solid ${isCompleted ? '#81c784' : '#4a90d9'}`,
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      transition: 'all 0.4s ease',
      boxShadow: isCompleted
        ? '0 2px 8px rgba(76,175,80,0.12)'
        : '0 2px 8px rgba(74,144,217,0.12)'
    }}>
      <button
        onClick={toggle}
        style={{
          background: isCompleted
            ? 'linear-gradient(135deg, #43a047, #2e7d32)'
            : 'linear-gradient(135deg, #1976d2, #1565c0)',
          color: 'white',
          padding: '9px 20px',
          border: 'none',
          borderRadius: '7px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          letterSpacing: '0.3px',
          boxShadow: isCompleted
            ? '0 3px 8px rgba(46,125,50,0.35)'
            : '0 3px 8px rgba(21,101,192,0.35)',
          transform: animate ? 'scale(1.08)' : 'scale(1)',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap' as const
        }}
      >
        {isCompleted ? '✅ Completed!' : '📌 Mark as Complete'}
      </button>
      {isCompleted ? (
        <span style={{
          color: '#2e7d32',
          fontWeight: '600',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          🎉 Great work! Topic mastered.
        </span>
      ) : (
        <span style={{ color: '#1565c0', fontSize: '13px', opacity: 0.8 }}>
          Finished reading? Mark this topic as complete.
        </span>
      )}
    </div>
  );
}