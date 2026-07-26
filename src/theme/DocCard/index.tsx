import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {
  extractLeadingEmoji,
  useDocCardDescriptionCategoryItemsPlural,
} from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Layout from '@theme/DocCard/Layout';

import styles from './styles.module.css';

import type { Props } from '@theme/DocCard';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

function getFallbackEmojiIcon(
  item: PropSidebarItemLink | PropSidebarItemCategory,
): string {
  if (item.type === 'category') {
    return '🗃️';
  }
  return isInternalUrl(item.href) ? '📄️' : '🔗';
}

function getIconTitleProps(
  item: PropSidebarItemLink | PropSidebarItemCategory,
): { icon: ReactNode; title: string } {
  const extracted = extractLeadingEmoji(item.label);
  const emoji = extracted.emoji ?? getFallbackEmojiIcon(item);
  return {
    icon: emoji,
    title: extracted.rest.trim(),
  };
}

function CardCategory({ item }: { item: PropSidebarItemCategory }): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();

  if (!href) {
    return null;
  }

  const { icon, title } = getIconTitleProps(item);
  const itemCountText = categoryItemsPlural(item.items?.length ?? 0);
  
  // Clean fallback if no custom description is explicitly provided
  const description = item.customProps?.description ?? `${itemCountText} available`;

  return (
    <div className={clsx(styles.responsiveCardWrapper, item.className)}>
      <Layout
        item={item}
        href={href}
        icon={icon}
        title={title}
        description={description}
      >
        {/* Modern Interactive Footer Injection */}
        <div className={styles.categoryFooter}>
          <span className={styles.categoryBadge}>{itemCountText}</span>
          <span className={styles.learnMoreAction}>
            <Translate
              id="theme.DocCard.categoryDescription.learnMore"
              description="The label for the link to a category page from a card">
              Explore
            </Translate>
            <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </Layout>
    </div>
  );
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactNode {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <div className={styles.responsiveCardWrapper, item.className}>
      <Layout
        item={item}
        href={item.href}
        description={item.description ?? doc?.description}
        {...getIconTitleProps(item)}
      />
    </div>
  );
}

export default function DocCard({ item }: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
