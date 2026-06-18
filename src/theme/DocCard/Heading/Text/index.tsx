import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/DocCard/Heading/Text';

import styles from './styles.module.css';

export default function DocCardHeadingText({title}: Props): ReactNode {
  return (
    <span
      className={clsx(
        'text--truncate',

        ThemeClassNames.docs.docCard.title,
        styles.cardTitleText,
      )}>
      {title}
    </span>
  );
}
