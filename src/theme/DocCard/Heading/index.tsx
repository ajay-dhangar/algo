import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Icon from '@theme/DocCard/Heading/Icon';
import Text from '@theme/DocCard/Heading/Text';
import type { Props } from '@theme/DocCard/Heading';

import styles from './styles.module.css';

export default function DocCardHeading({ item, title, icon }: Props): ReactNode {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docCard.heading, 
        styles.cardHeaderContainer
      )}
    >
      {icon && (
        <div className={styles.iconWrapper}>
          <Icon item={item} icon={icon} />
        </div>
      )}
      <div className={styles.textWrapper}>
        <Text item={item} title={title} />
      </div>
    </div>
  );
}
