import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/DocCard/Heading/Text';

import styles from './styles.module.css';

export default function DocCardHeadingText({ title }: Props): ReactNode {
  return (
    <h3
      className={clsx(
        'text--truncate', // Kept for safety, but optimized in CSS
        ThemeClassNames.docs.docCard.title,
        styles.cardTitleText
      )}
      title={title} /* Native tooltip UX if text ever accidentally overflows */
    >
      {title}
    </h3>
  );
}
