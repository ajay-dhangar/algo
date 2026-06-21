import React from 'react';
import clsx from 'clsx';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TagsListInline from '@theme/TagsListInline';
import type { Props } from '@theme/DocItem/Footer';
import ProgressTracker from '@site/src/components/ProgressTracker';

export default function DocItemFooter(props: Props): JSX.Element | null {
  const { metadata } = useDoc();
  const { tags } = metadata;

  const topicId = metadata.id.replace(/\//g, '-');
  const topicTitle = metadata.title;

  const canRenderTags = tags && tags.length > 0;

  if (!canRenderTags) {
    return (
      <>
        <ProgressTracker topicId={topicId} topicTitle={topicTitle} />
      </>
    );
  }

  return (
    <>
    
      <ProgressTracker topicId={topicId} topicTitle={topicTitle} />

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
