import React, {JSX, type ReactNode, type ComponentProps} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type SvgIconProps = ComponentProps<'svg'> & {
  viewBox?: string;
  size?: 'inherit' | 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  svgClass?: string;
  colorAttr?: string;
  children: ReactNode;
};

export default function Svg(props: SvgIconProps): JSX.Element {
  const {
    svgClass,
    colorAttr,
    children,
    color = 'inherit',
    size = 'medium',
    viewBox = '0 0 24 24',
    ...rest
  } = props;

  return (
    <svg
      viewBox={viewBox}
      color={colorAttr}
      aria-hidden
      className={clsx(styles.svgIcon, styles[color], styles[size], svgClass)}
      {...rest}
    >
      {children}
    </svg>
  );
}