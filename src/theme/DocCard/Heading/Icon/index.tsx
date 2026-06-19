import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/DocCard/Heading/Icon';

import styles from './styles.module.css';

export default function DocCardHeadingIcon({ icon }: Props): ReactNode {
  return (
    <span
      className={clsx(
        ThemeClassNames.docs.docCard.icon, 
        styles.cardTitleIconWrapper
      )}
    >
      <span className={styles.cardTitleIconInner}>
        {icon}
      </span>
    </span>
  );
}
