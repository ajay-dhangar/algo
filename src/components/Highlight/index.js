import React from 'react';

function getContrastColor(color) {
  if (!color) return '#fff';
  
  let hex = color.trim().toLowerCase();
  
  const namedColors = {
    yellow: '#ffff00',
    cyan: '#00ffff',
    white: '#ffffff',
    lime: '#00ff00',
    orange: '#ffa500',
    pink: '#ffc0cb',
    lightblue: '#add8e6',
    lightgreen: '#90ee90',
    lightyellow: '#ffffe0',
    lightcyan: '#e0ffff',
    gold: '#ffd700',
  };
  
  if (namedColors[hex]) {
    hex = namedColors[hex];
  }
  
  if (hex.startsWith('#')) {
    let cleanHex = hex.slice(1);
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? '#000' : '#fff';
    }
  }
  
  const rgbMatch = hex.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000' : '#fff';
  }
  
  if (hex.startsWith('light') || ['yellow', 'cyan', 'lime', 'white', 'pink', 'gold'].includes(hex)) {
    return '#000';
  }
  
  return '#fff';
}

export default function Highlight({ children, color, textColor }) {
  const finalTextColor = textColor || getContrastColor(color);

  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: finalTextColor,
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
}