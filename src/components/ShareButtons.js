import React, { useState } from 'react';

const ShareButtons = () => {
  if (typeof window === 'undefined') return null;
  const [showOptions, setShowOptions] = useState(false);
  const shareUrl = window.location.href;
  const shareTitle = document.querySelector('h1')?.innerText || 'Check out this algorithm on Algo';

  const shareLinks = [
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`, icon: '🐦' },
    { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, icon: '🔗' },
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, icon: '📘' },
    { name: 'Email', url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`, icon: '✉️' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('✅ Link copied!');
    setShowOptions(false);
  };

  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      float: 'right',
      marginTop: '5px'
    }}>
      <span
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
        style={{
          cursor: 'pointer',
          color: '#0066cc',
          fontSize: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        📤 Share
      </span>

      {showOptions && (
        <div
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
          style={{
            position: 'absolute',
            top: '25px',
            right: '0',
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '6px',
            padding: '8px',
            zIndex: 1000,
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            border: '1px solid #ddd',
            whiteSpace: 'nowrap'
          }}
        >
          {shareLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#333',
                textDecoration: 'none',
                padding: '4px 10px',
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderRadius: '4px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {link.icon} {link.name}
            </a>
          ))}
          <button
            onClick={handleCopy}
            style={{
              background: 'none',
              border: 'none',
              color: '#333',
              padding: '4px 10px',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            📋 Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;