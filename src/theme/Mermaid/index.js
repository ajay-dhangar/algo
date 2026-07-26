import React from 'react';
import Mermaid from '@theme-original/Mermaid';
import { useColorMode } from '@docusaurus/theme-common';

export default function MermaidWrapper(props) {
  const { colorMode } = useColorMode();

  return (
    <>
      <Mermaid key={colorMode} {...props} />
    </>
  );
}
