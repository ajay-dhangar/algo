import React, { JSX } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function PwaReloadPopup({ onReload }: { onReload: () => void }): JSX.Element | null {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        backgroundColor: 'var(--ifm-color-primary)',
        color: '#fff',
        borderRadius: '8px',
        padding: '12px 20px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.9rem',
        fontWeight: 500,
      }}
    >
      <span>A new version of {siteConfig.title} is available.</span>
      <button
        onClick={onReload}
        style={{
          background: '#fff',
          color: 'var(--ifm-color-primary)',
          border: 'none',
          borderRadius: '6px',
          padding: '6px 14px',
          fontWeight: 700,
          cursor: 'pointer',
          fontSize: '0.85rem',
        }}
      >
        Reload
      </button>
    </div>
  );
}
