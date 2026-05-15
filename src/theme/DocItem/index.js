import React from 'react';
import DocItem from '@theme-original/DocItem';
import ShareButtons from '@site/src/components/ShareButtons';

export default function DocItemWrapper(props) {
  return (
    <>
      <DocItem {...props} />
      <ShareButtons />
    </>
  );
}