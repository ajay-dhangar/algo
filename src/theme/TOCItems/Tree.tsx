import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';

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
  readonly isChild?: boolean;
}

function TOCItemTree({
  toc,
  className,
  linkClassName,
  isChild,
}: Props): ReactNode {
  if (!toc.length) {
    return null;
  }
  return (
    <ul className={isChild ? undefined : className}>
      {toc.map((heading: TOCItem) => (
        <li key={heading.id}>
          <Link
            to={`#${heading.id}`}
            className={linkClassName ?? undefined}
            dangerouslySetInnerHTML={{ __html: heading.value }}
          />
          <TOCItemTree
            isChild
            toc={heading.children}
            className={className}
            linkClassName={linkClassName}
          />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(TOCItemTree);
