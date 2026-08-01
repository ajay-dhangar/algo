import React, { useEffect, useRef, useState } from 'react';
import MDXContent from '@theme/MDXContent';
import Heading from '@theme/Heading';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocsInfo from '../../../components/CustomDocItems/DocsInfo';
import CheatSheetExport from '../../../components/CheatSheetExport';

export default function DocItemContent({ children }: { children?: React.ReactNode }): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const [readingTimeInWords, setReadingTimeInWords] = useState<string>('');
  
  const { metadata } = useDoc();

const {
  title,
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  frontMatter,
} = metadata;

const difficulty =
  typeof (frontMatter as any).difficulty === "string"
    ? (frontMatter as any).difficulty
    : undefined;

  // We hide the default title if specified by front matter
  const hideTitle = frontMatter.hide_title;

  // Cheat sheet pages get quick "Download PDF" / "Copy as image" actions so
  // readers can save an offline, print-friendly reference without leaving the site.
  const isCheatSheet = metadata.id.startsWith('cheatsheets/');

  useEffect(() => {
    if (contentRef.current) {
      const text = contentRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
      const minutes = Math.ceil(words / 200);
      setReadingTimeInWords(`${minutes} min read`);
    }
  }, [children]);

  return (
    <div ref={contentRef} className="markdown">
      {!hideTitle && (
        <header className="doc-header-banner">
          <Heading as="h1">{title}</Heading>

{difficulty && (
  <div style={{ marginTop: "10px" }}>
    <span
      className={`difficulty-badge ${difficulty?.toLowerCase()}`}
    >
      {difficulty}
    </span>
  </div>
)}
        </header>
      )}

      <DocsInfo
        lastUpdatedAt={lastUpdatedAt}
        lastUpdatedBy={lastUpdatedBy}
        readingTimeInWords={readingTimeInWords}
        editUrl={editUrl}
        title={title}
        docsPluginId="default"
      />

      <MDXContent>{children}</MDXContent>
    </div>
  );
}
