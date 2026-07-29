import React from 'react';
import { render } from '@testing-library/react';
import DocCard from '../../theme/DocCard';
import styles from '../../theme/DocCard/styles.module.css';
import type { PropSidebarItemLink, PropSidebarItemCategory } from '@docusaurus/plugin-content-docs';

describe('DocCard Component', () => {
  test('CardLink applies styles.responsiveCardWrapper when item.className is undefined', () => {
    const defaultLinkItem: PropSidebarItemLink = {
      type: 'link',
      label: 'Binary Search',
      href: '/docs/binary-search',
      docId: 'binary-search',
    };

    const { container } = render(<DocCard item={defaultLinkItem} />);
    const wrapperDiv = container.firstElementChild as HTMLElement;

    expect(wrapperDiv).toBeInTheDocument();
    expect(wrapperDiv).toHaveClass(styles.responsiveCardWrapper);
  });

  test('CardCategory applies styles.responsiveCardWrapper when item.className is undefined', () => {
    const defaultCategoryItem: PropSidebarItemCategory = {
      type: 'category',
      label: 'Algorithms',
      href: '/docs/category/algorithms',
      collapsed: false,
      collapsible: true,
      items: [],
    };

    const { container } = render(<DocCard item={defaultCategoryItem} />);
    const wrapperDiv = container.firstElementChild as HTMLElement;

    expect(wrapperDiv).toBeInTheDocument();
    expect(wrapperDiv).toHaveClass(styles.responsiveCardWrapper);
  });

  test('CardLink composes both styles.responsiveCardWrapper and custom item.className when present', () => {
    const customLinkItem: PropSidebarItemLink = {
      type: 'link',
      label: 'Array Data Structure',
      href: '/docs/arrays',
      docId: 'arrays',
      className: 'custom-link-class',
      description: 'Learn array operations and time complexities.',
    };

    const { container } = render(<DocCard item={customLinkItem} />);
    const wrapperDiv = container.firstElementChild as HTMLElement;

    expect(wrapperDiv).toBeInTheDocument();
    expect(wrapperDiv).toHaveClass(styles.responsiveCardWrapper);
    expect(wrapperDiv).toHaveClass('custom-link-class');
  });

  test('CardCategory composes both styles.responsiveCardWrapper and custom item.className when present', () => {
    const customCategoryItem: PropSidebarItemCategory = {
      type: 'category',
      label: 'Data Structures',
      href: '/docs/category/data-structures',
      className: 'custom-category-class',
      collapsed: false,
      collapsible: true,
      items: [
        { type: 'link', label: 'Arrays', href: '/docs/arrays', docId: 'arrays' },
      ],
    };

    const { container } = render(<DocCard item={customCategoryItem} />);
    const wrapperDiv = container.firstElementChild as HTMLElement;

    expect(wrapperDiv).toBeInTheDocument();
    expect(wrapperDiv).toHaveClass(styles.responsiveCardWrapper);
    expect(wrapperDiv).toHaveClass('custom-category-class');
  });

  test('CardLink wrapper class composition matches CardCategory behavior', () => {
    const linkItem: PropSidebarItemLink = {
      type: 'link',
      label: 'Linked List',
      href: '/docs/linked-list',
      docId: 'linked-list',
      className: 'shared-theme-class',
    };

    const categoryItem: PropSidebarItemCategory = {
      type: 'category',
      label: 'Linear Data Structures',
      href: '/docs/category/linear',
      className: 'shared-theme-class',
      collapsed: false,
      collapsible: true,
      items: [],
    };

    const { container: linkContainer } = render(<DocCard item={linkItem} />);
    const { container: categoryContainer } = render(<DocCard item={categoryItem} />);

    const linkWrapper = linkContainer.firstElementChild as HTMLElement;
    const categoryWrapper = categoryContainer.firstElementChild as HTMLElement;

    expect(linkWrapper.className).toBe(categoryWrapper.className);
    expect(linkWrapper).toHaveClass(styles.responsiveCardWrapper);
    expect(linkWrapper).toHaveClass('shared-theme-class');
  });
});
