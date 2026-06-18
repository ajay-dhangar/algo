import React, {type ReactNode} from 'react';
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
import Link from '@docusaurus/Link'; // Added for smooth SPA routing

import type {Props} from '@theme/DocCard';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

function getFallbackEmojiIcon(
  item: PropSidebarItemLink | PropSidebarItemCategory,
): string {
  if (item.type === 'category') {
    return '🗃';
  }
  return isInternalUrl(item.href) ? '📄️' : '🔗';
}

function getIconTitleProps(
  item: PropSidebarItemLink | PropSidebarItemCategory,
): {icon: ReactNode; title: string} {
  const extracted = extractLeadingEmoji(item.label);
  const emoji = extracted.emoji ?? getFallbackEmojiIcon(item);
  return {
    icon: emoji,
    title: extracted.rest.trim(),
  };
}

// ✨ OUR CUSTOM ENHANCED CATEGORY CARD ✨
function CardCategory({item}: {item: PropSidebarItemCategory}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();

  if (!href) {
    return null;
  }

  const { icon, title } = getIconTitleProps(item);
  const itemCountText = categoryItemsPlural(item.items.length);
  // Pulls your custom description from the _category_.json file
  const customDescription = item.customProps?.description || item.description;

  return (
    <Link
      href={href}
      className={`card padding--lg ${item.className || ''}`}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none' }}
    >
      {/* Header: Icon & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--ifm-heading-color)' }}>{title}</h3>
      </div>

      {/* Subtitle: Item Count */}
      <span style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '12px', fontWeight: '500' }}>
        {itemCountText}
      </span>

      {/* Dynamic Description */}
      {customDescription && (
         <p style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)', flexGrow: 1, marginBottom: '20px', lineHeight: '1.5' }}>
           {customDescription}
         </p>
      )}

      {/* Persistent CTA Button */}
      <div style={{ marginTop: 'auto', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--ifm-color-primary)' }}>
        Learn More &rarr;
      </div>
    </Link>
  );
}

function CardLink({item}: {item: PropSidebarItemLink}): ReactNode {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <Layout
      item={item}
      className={item.className}
      href={item.href}
      description={item.description ?? doc?.description}
      {...getIconTitleProps(item)}
    />
  );
}

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}