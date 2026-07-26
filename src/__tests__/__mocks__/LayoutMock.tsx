import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <div data-testid="docusaurus-layout" data-title={title} data-description={description}>
      {children}
    </div>
  );
}
