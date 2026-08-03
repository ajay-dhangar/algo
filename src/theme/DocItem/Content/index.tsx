import React, { useEffect, useRef, useState } from 'react';
import MDXContent from '@theme/MDXContent';
import Heading from '@theme/Heading';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocsInfo from '../../../components/CustomDocItems/DocsInfo';
import CheatSheetExport from '../../../components/CheatSheetExport';
import BookmarkButton from '../../../components/BookmarkButton';
import ReadingProgressBar from '../../../components/ReadingProgressBar';
import { useLocation } from "@docusaurus/router";

export default function DocItemContent({ children }: { children?: React.ReactNode }): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const [readingTimeInWords, setReadingTimeInWords] = useState<string>('');
  
  const { metadata } = useDoc();
  const location = useLocation();

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
  useEffect(() => {
  if (!contentRef.current) return;

  const params = new URLSearchParams(location.search);

  const keyword =
    params.get("q") ||
    params.get("query") ||
    params.get("search");

  if (!keyword) return;

  const regex = new RegExp(`(${keyword})`, "gi");

  const walker = document.createTreeWalker(
    contentRef.current,
    NodeFilter.SHOW_TEXT
  );

  const nodes: Text[] = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  nodes.forEach((node) => {
    if (!node.parentElement) return;

    if (
      node.parentElement.tagName === "SCRIPT" ||
      node.parentElement.tagName === "STYLE"
    ) {
      return;
    }

    if (regex.test(node.textContent || "")) {
      const span = document.createElement("span");

      span.innerHTML = (node.textContent || "").replace(
        regex,
        `<mark class="search-highlight">$1</mark>`
      );

      node.parentNode?.replaceChild(span, node);
    }
  });
}, [location.search]);

  return (
    <div ref={contentRef} className="markdown">
      {!hideTitle && (
        <header className="doc-header-banner">
          <Heading as="h1">{title}</Heading>

          <BookmarkButton
            title={title}
            path={metadata.permalink}
          />

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