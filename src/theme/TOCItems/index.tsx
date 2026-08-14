import React, { type ReactNode, useMemo } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  useTOCHighlight,
  useFilteredAndTreeifiedTOC,
} from '@docusaurus/theme-common/internal';
import TOCItemTree from './Tree';
import { useTOCHighlightObserver, TOCHighlightObserverConfig } from '../../hooks/useTOCHighlightObserver';

export interface TOCItem {
  readonly id: string;
  readonly value: string;
  readonly level: number;
  readonly children: readonly TOCItem[];
}

export interface Props {
  readonly toc: readonly TOCItem[];
  readonly className?: string;
  readonly linkClassName?: string;
  readonly linkActiveClassName?: string;
  readonly minHeadingLevel?: number;
  readonly maxHeadingLevel?: number;
}

/**
 * Themed Table of Contents items component. Renders a tree of heading links
 * with active-section highlighting via IntersectionObserver.
 */
const TOCItems = ({
  toc,
  className = 'table-of-contents table-of-contents__left-border',
  linkClassName = 'table-of-contents__link',
  linkActiveClassName = undefined,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}: Props): ReactNode => {
  let themeConfig: { tableOfContents?: { minHeadingLevel?: number; maxHeadingLevel?: number } } = {};
  try {
    if (typeof useThemeConfig === 'function') {
      themeConfig = useThemeConfig() || {};
    }
  } catch {
    // Fallback if theme context is not initialized
  }

  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents?.minHeadingLevel ?? 2;
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents?.maxHeadingLevel ?? 4;

  let tocTree: readonly TOCItem[] = toc as unknown as readonly TOCItem[] || [];
  try {
    if (typeof useFilteredAndTreeifiedTOC === 'function') {
      tocTree = useFilteredAndTreeifiedTOC({
        toc: toc as unknown as Parameters<typeof useFilteredAndTreeifiedTOC>[0]['toc'],
        minHeadingLevel,
        maxHeadingLevel,
      });
    }
  } catch {
    // Fallback
  }

  const tocHighlightConfig: TOCHighlightObserverConfig | undefined = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      };
    }
    return undefined;
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);

  if (typeof useTOCHighlight === 'function') {
    try {
      useTOCHighlight(tocHighlightConfig as unknown as Parameters<typeof useTOCHighlight>[0]);
    } catch {
      // Fallback
    }
  }

  useTOCHighlightObserver(tocHighlightConfig);

  return (
    <TOCItemTree
      toc={tocTree}
      className={className}
      linkClassName={linkClassName}
      {...props}
    />
  );
};

export default TOCItems;
