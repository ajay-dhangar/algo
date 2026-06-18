import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/DocCard/Description';

import styles from './styles.module.css';

export default function DocCardDescription({description}: Props): ReactNode {
  return (
    <p
      className={clsx(
        'text--truncate',
        ThemeClassNames.docs.docCard.description,
        styles.cardDescription,
      )}
      title={description}>
      {description}
    </p>
  );
}
