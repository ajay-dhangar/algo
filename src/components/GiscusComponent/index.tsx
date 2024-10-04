import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

/**
 * GiscusComponent
 * 
 * A React component that integrates Giscus for GitHub discussions.
 * 
 * @returns {JSX.Element} The rendered component
 */
export default function GiscusComponent() {
  const { colorMode } = useColorMode(); // Retrieves the current color mode from Docusaurus theme

  return (
    <div className="giscus-component">
      <Giscus
        id="giscus"
        repo="ajay-dhangar/algo"
        repoId="R_kgDOK224hg"
        category="General"
        categoryId="DIC_kwDOK224hs4CjEDd"
        mapping="pathname"
        term="Welcome to Algo Discussions! Please feel free to ask questions, share ideas, and discuss anything related to Algo."
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}