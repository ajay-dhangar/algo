import React from 'react';
import DocItem from '@theme-original/DocItem';
import ShareButtons from '@site/src/components/ShareButtons';

export default function DocItemWrapper(props) {
  const { content: DocContent } = props;
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <h1 style={{ margin: 0 }}>{props.content.metadata?.title || 'Document'}</h1>
        <ShareButtons />
      </div>
      <DocItem {...props} />
    </>
  );
}