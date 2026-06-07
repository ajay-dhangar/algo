import React from 'react';
import Info from '@theme-original/Admonition/Icon/Info';
import type InfoType from '@theme/Admonition/Icon/Info';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof InfoType>;

export default function InfoWrapper(props: Props): JSX.Element {
  return (
    <>
      <Info {...props} />
    </>
  );
}
