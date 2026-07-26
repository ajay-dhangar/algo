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
