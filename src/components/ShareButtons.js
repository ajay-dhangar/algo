import React from 'react';

const ShareButtons = () => {
  // Ensure this code only runs in browser
  if (typeof window === 'undefined') {
    return null;
  }

  const shareUrl = window.location.href;
  const shareTitle = 'Check out this algorithm on Algo';

  const handleShare = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('✅ Link copied to clipboard!');
  };

  const buttonStyle = {
    background: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 14px',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '0 4px'
  };

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      marginTop: '30px',
      marginBottom: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <button
        onClick={() => handleShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`)}
        style={{ ...buttonStyle, background: '#1DA1F2' }}
      >
        🐦 Twitter
      </button>
      <button
        onClick={() => handleShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)}
        style={{ ...buttonStyle, background: '#0077B5' }}
      >
        🔗 LinkedIn
      </button>
      <button
        onClick={() => handleShare(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)}
        style={{ ...buttonStyle, background: '#4267B2' }}
      >
        📘 Facebook
      </button>
      <button
        onClick={handleCopyLink}
        style={{ ...buttonStyle, background: '#28a745' }}
      >
        📋 Copy Link
      </button>
    </div>
  );
};

export default ShareButtons;