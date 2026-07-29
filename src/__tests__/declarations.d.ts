declare module '@theme/DocCard' {
  import type { PropSidebarItemCategory, PropSidebarItemLink } from '@docusaurus/plugin-content-docs';
  import React from 'react';
  export interface Props {
    item: PropSidebarItemLink | PropSidebarItemCategory;
  }
  export default function DocCard(props: Props): React.ReactNode;
}

declare module '@theme/Layout' {
  import React from 'react';
  export interface Props {
    children?: React.ReactNode;
    title?: string;
    description?: string;
  }
  export default function Layout(props: Props): JSX.Element;
}

declare module '@docusaurus/*';
declare module '@theme/*';
declare module '@generated/*';
declare module '@monaco-editor/react';
