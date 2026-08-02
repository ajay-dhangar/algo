import React, { JSX } from 'react';
import clsx from 'clsx';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TagsListInline from '@theme/TagsListInline';
// Props type is not exported by the current Docusaurus version
type Props = Record<string, never>;
import ProgressTracker from '@site/src/components/ProgressTracker';
import DocInlineQuiz from '@site/src/components/DocInlineQuiz';
import RelatedProblems from '@site/src/components/RelatedProblems';

export default function DocItemFooter(props: Props): JSX.Element | null {
  const { metadata } = useDoc();
  console.log(metadata);
  const { tags } = metadata;

  const topicId = metadata.id.replace(/\//g, '-');
  const topicTitle = metadata.title;

  const canRenderTags = tags && tags.length > 0;

  if (!canRenderTags) {
    return (
      <>
        <DocInlineQuiz />
        <ProgressTracker topicId={topicId} topicTitle={topicTitle} />
        <RelatedProblems />
      </>
    );
  }

  return (
    <>
      <DocInlineQuiz />

      <ProgressTracker topicId={topicId} topicTitle={topicTitle} />

      <RelatedProblems />

      <footer
        className={clsx(
          'docusaurus-mt-lg',
          'row',
        )}>
        {canRenderTags && (
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        )}
      </footer>
    </>
  );
}

