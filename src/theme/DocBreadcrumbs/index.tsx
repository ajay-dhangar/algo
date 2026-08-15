import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import {
  useSidebarBreadcrumbs,
  useDoc,
} from '@docusaurus/plugin-content-docs/client';

import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';

import BookmarkButton from '../../components/BookmarkButton';
import { GitHubBtns } from '../../components/GitHubBtns';

import styles from './styles.module.css';

// Constants
const REPO_NAME = 'ajay-dhangar/algo';

interface BreadcrumbsItemLinkProps {
  children: ReactNode;
  href?: string;
  isLast: boolean;
}

/**
 * Renders the actual content/link inside an individual breadcrumb item.
 */
function BreadcrumbsItemLink({
  children,
  href,
  isLast,
}: BreadcrumbsItemLinkProps): ReactNode {
  const className = clsx('breadcrumbs__link', {
    [styles.activeItem]: isLast,
    [styles.breadcrumbLink]: !isLast,
  });

  if (isLast) {
    return (
      <span className={className} aria-current="page">
        {children}
      </span>
    );
  }

  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

interface BreadcrumbsItemProps {
  children: ReactNode;
  active?: boolean;
}

/**
 * Wrapper for individual breadcrumb `<li>` items.
 */
function BreadcrumbsItem({ children, active }: BreadcrumbsItemProps): ReactNode {
  return (
    <li
      className={clsx('breadcrumbs__item', styles.breadcrumbItem, {
        'breadcrumbs__item--active': active,
      })}
    >
      {children}
    </li>
  );
}

/**
 * Enhanced DocBreadcrumbs Component
 */
export default function DocBreadcrumbs(): ReactNode {
  const { metadata } = useDoc();
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();

  // If there are no breadcrumbs to display, omit component
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  const ariaLabel = translate({
    id: 'theme.docs.breadcrumbs.navAriaLabel',
    message: 'Breadcrumbs',
    description: 'The ARIA label for the breadcrumbs',
  });

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />

      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbContainer
        )}
        aria-label={ariaLabel}
      >
        {/* Left Action: GitHub Star */}
        <div className={clsx(styles.actionGroup, styles.leftAction)}>
          <GitHubBtns
            action="star"
            href={`https://github.com/${REPO_NAME}`}
            targetName={REPO_NAME}
          />
        </div>

        {/* Center/Main: Breadcrumbs Trail */}
        <div className={styles.breadcrumbsWrapper}>
          <ol className={clsx('breadcrumbs', styles.breadcrumbsList)}>
            {homePageRoute && <HomeBreadcrumbItem />}

            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              const href =
                item.type === 'category' && item.linkUnlisted
                  ? undefined
                  : item.href;

              return (
                <BreadcrumbsItem key={item.href ?? idx} active={isLast}>
                  <BreadcrumbsItemLink href={href} isLast={isLast}>
                    {item.label}
                  </BreadcrumbsItemLink>
                </BreadcrumbsItem>
              );
            })}
          </ol>
        </div>

        {/* Right Action: Bookmark Button */}
        <div className={clsx(styles.actionGroup, styles.rightAction)}>
          <BookmarkButton
            title={metadata.title}
            path={metadata.permalink}
          />
        </div>
      </nav>
    </>
  );
}