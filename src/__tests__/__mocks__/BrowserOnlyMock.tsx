import React from 'react';

interface BrowserOnlyProps {
  children?: () => React.ReactNode;
  fallback?: React.ReactNode;
}

export default function BrowserOnly({ children, fallback }: BrowserOnlyProps) {
  if (typeof children === 'function') {
    try {
      const res = children();
      if (res) return <>{res}</>;
    } catch {
      return <>{fallback}</>;
    }
  }
  return <>{fallback}</>;
}
