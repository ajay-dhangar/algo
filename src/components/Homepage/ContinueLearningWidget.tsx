import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { getLastVisited, type LastVisitedItem } from '../../utils/safeStorage';

/* ------------------------------------------------------------------ */
/*  Relative time formatter (no extra deps)                            */
/* ------------------------------------------------------------------ */
function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  if (Number.isNaN(diff)) return '';
  const m = Math.floor(diff / 60_000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? 's' : ''} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? 's' : ''} ago`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ContinueLearningWidget(): React.ReactElement | null {
  const [item, setItem] = useState<LastVisitedItem | null>(null);
  const [relTime, setRelTime] = useState<string>('');
  const [visible, setVisible] = useState(false);

  const refresh = () => {
    const latest = getLastVisited();
    setItem(latest);
    if (latest) setRelTime(formatRelativeTime(latest.visitedAt));
  };

  // Initial load + listen for navigation updates
  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener('lastVisitedUpdated', handler);
    window.addEventListener('progressUpdated', handler);
    window.addEventListener('quizCompleted', handler);
    return () => {
      window.removeEventListener('lastVisitedUpdated', handler);
      window.removeEventListener('progressUpdated', handler);
      window.removeEventListener('quizCompleted', handler);
    };
  }, []);

  // Animate in after first paint
  useEffect(() => {
    if (item) {
      const t = setTimeout(() => setVisible(true), 80);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [item?.id]);

  // Keep relative time ticking
  useEffect(() => {
    if (!item) return;
    const interval = setInterval(() => {
      setRelTime(formatRelativeTime(item.visitedAt));
    }, 60_000);
    return () => clearInterval(interval);
  }, [item]);

  if (!item) return null;

  const isDoc = item.type === 'doc';

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
      }}
    >
      <Link
        to={item.url}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px',
            padding: '20px 24px',
            background: 'linear-gradient(135deg, var(--ifm-color-primary-darkest) 0%, var(--ifm-color-primary-dark) 100%)',
            border: '1px solid var(--ifm-color-primary-dark)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 14px 40px rgba(0,0,0,0.26)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
          }}
        >
          {/* Decorative glow blob */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Header row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              flexWrap: 'wrap',
              gap: '6px',
            }}
          >
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              ↩ Continue where you left off
            </span>

            <span
              style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.45)',
                fontWeight: 500,
              }}
            >
              {relTime}
            </span>
          </div>

          {/* Title */}
          <p
            style={{
              margin: '0 0 12px',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.35,
              maxWidth: '90%',
            }}
          >
            {item.title}
          </p>

          {/* Footer row: reading time + status pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {item.readingTime && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.65)',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  padding: '3px 10px',
                }}
              >
                ⏱ {item.readingTime}
              </span>
            )}

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: item.isCompleted ? 'rgba(74,222,128,0.95)' : 'rgba(250,204,21,0.95)',
                background: item.isCompleted
                  ? 'rgba(74,222,128,0.12)'
                  : 'rgba(250,204,21,0.12)',
                border: `1px solid ${item.isCompleted ? 'rgba(74,222,128,0.3)' : 'rgba(250,204,21,0.3)'}`,
                borderRadius: '8px',
                padding: '3px 10px',
              }}
            >
              {item.isCompleted ? '✓ Mastered' : '● In Progress'}
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '8px',
                padding: '3px 10px',
              }}
            >
              {isDoc ? '📄 Doc' : '🧠 Quiz'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
