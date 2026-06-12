import React from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import DocsInfo from '../../../components/CustomDocItems/DocsInfo';
import { useDoc } from "@docusaurus/plugin-content-docs/client";

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): JSX.Element {
  // Grab metadata natively provided by Docusaurus client API
  const { metadata } = useDoc();
  
  const {
    title,
    editUrl,
    lastUpdatedAt,
    lastUpdatedBy,
    readingTime,
  } = metadata;

  const displayReadingTime = readingTime 
    ? `${Math.ceil(readingTime)} min read` 
    : undefined;

  return (
    <>
      <DocsInfo
        lastUpdatedAt={lastUpdatedAt}
        lastUpdatedBy={lastUpdatedBy}
        readingTimeInWords={displayReadingTime}
        editUrl={editUrl}
        title={title}
      />
      <Content {...props} />
    </>
  );
}