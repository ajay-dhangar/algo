import React, { useEffect, useRef, useState } from "react";
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import DocsInfo from '../../../components/CustomDocItems/DocsInfo';
import { useDoc } from "@docusaurus/plugin-content-docs/client";

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const [readingTimeInWords, setReadingTimeInWords] = useState<string>("");
  const { metadata } = useDoc();

  const {
    title,
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
    // readingTime,
  } = metadata;

  useEffect(() => {
    if (contentRef.current) {
      // 2. Fixed: Implemented an inline pure client-side word count algorithm 
      // (Average reading speed: 200 words per minute)
      const text = contentRef.current.innerText || "";
      const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      const minutes = Math.ceil(words / 200);

      setReadingTimeInWords(`${minutes} min read`);
    }
  }, [props]); // Triggers calculation on markdown page route switches

  return (
    <>
      <DocsInfo
        lastUpdatedAt={lastUpdatedAt}
        lastUpdatedBy={lastUpdatedBy}
        readingTimeInWords={readingTimeInWords}
        editUrl={editUrl}
        title={title}
      />
      <div ref={contentRef}>
        <Content {...props} />
      </div>
    </>
  );
}