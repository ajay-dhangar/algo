import React, { useEffect, useRef, useState } from 'react';
import MDXContent from '@theme/MDXContent';
import Heading from '@theme/Heading';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocsInfo from '../../../components/CustomDocItems/DocsInfo';
import CheatSheetExportActions from '../../../components/CheatSheetExportActions';

interface Props {
  children: React.ReactNode;
}

export default function DocItemContent({ children }: Props): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const [readingTimeInWords, setReadingTimeInWords] = useState<string>('');
  
  const { metadata } = useDoc();
  const { title, editUrl, lastUpdatedAt, lastUpdatedBy, frontMatter } = metadata;
  const isCheatSheet = metadata.id.startsWith('cheatsheets/');

  // We hide the default title if specified by front matter
  const hideTitle = frontMatter.hide_title;

  useEffect(() => {
    if (contentRef.current) {
      const text = contentRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter((w) => w.length > 0).length;
      const minutes = Math.ceil(words / 200);
      setReadingTimeInWords(`${minutes} min read`);
    }
  }, [children]);

  return (
    <div ref={contentRef} className="markdown" data-cheatsheet-export-surface={isCheatSheet ? true : undefined}>
      {!hideTitle && (
        <header className="doc-header-banner">
          <Heading as="h1">{title}</Heading>
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

      {isCheatSheet && <CheatSheetExportActions targetRef={contentRef} />}

      <MDXContent>{children}</MDXContent>
    </div>
  );
}
