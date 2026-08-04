import React from 'react';
import Metadata from '@theme-original/DocItem/Metadata';
import Head from '@docusaurus/Head';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function MetadataWrapper(props) {
  const { frontMatter } = useDoc();
  const { description, tags } = frontMatter;

  let ogDescription = description || '';
  if (tags && tags.length > 0) {
    const tagsString = tags.map(tag => (typeof tag === 'string' ? tag : tag.label || '')).join(', ');
    ogDescription = ogDescription ? `${ogDescription} | Tags: ${tagsString}` : `Tags: ${tagsString}`;
  }

  return (
    <>
      <Metadata {...props} />
      {ogDescription && (
        <Head>
          <meta property="og:description" content={ogDescription} />
          <meta name="twitter:description" content={ogDescription} />
        </Head>
      )}
    </>
  );
}
