import React from 'react';

export default function ComplexityCard({ best, average, worst, space }) {
  if (!best && !average && !worst && !space) return null;

  return (
    <div className="margin-bottom--md" style={{
      border: '1px solid var(--ifm-color-emphasis-300)',
      borderRadius: 'var(--ifm-global-radius)',
      padding: '1rem',
      backgroundColor: 'var(--ifm-background-surface-color)'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        Complexity Analysis
      </h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
        {best && (
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--ifm-color-success)' }}>Time (Best)</div>
            <code style={{ fontSize: '1rem' }}>{best}</code>
          </div>
        )}
        {average && (
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--ifm-color-warning)' }}>Time (Average)</div>
            <code style={{ fontSize: '1rem' }}>{average}</code>
          </div>
        )}
        {worst && (
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--ifm-color-danger)' }}>Time (Worst)</div>
            <code style={{ fontSize: '1rem' }}>{worst}</code>
          </div>
        )}
        {space && (
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--ifm-color-info)' }}>Space</div>
            <code style={{ fontSize: '1rem' }}>{space}</code>
          </div>
        )}
      </div>
    </div>
  );
}
