import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import ProgressTracker from '@site/src/components/ProgressTracker';
// import NotesSection from '@site/src/components/NotesSection';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  const { metadata } = useDoc();
  const topicId = metadata.id.replace(/\//g, '-');
  const topicTitle = metadata.title;

  return (
    <>
      {/* <Footer {...props} /> */}
      <ProgressTracker topicId={topicId} topicTitle={topicTitle} />
      {/* <NotesSection topicId={topicId} /> */}
    </>
  );
}