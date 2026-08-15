import React, { type ComponentType } from 'react';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { useWindowSize } from '@docusaurus/theme-common';
import ThemePicker from '@site/src/components/ThemePicker';
import CodeThemePicker from '@site/src/components/CodeThemePicker';
import CursorSwitcher from '@site/src/components/CursorSwitcher';
import NavbarAuthButton from '@site/src/components/NavbarAuthButton';

/**
 * Standardized props injected into custom navbar child components
 */
export interface CustomNavbarComponentProps {
  isMobile?: boolean;
  isDrawerOpen?: boolean;
  [key: string]: unknown;
}

/**
 * Interface for Responsive Wrapper Props
 */
interface ResponsiveNavbarItemProps {
  /** The React component to render */
  Component: ComponentType<CustomNavbarComponentProps>;
  /** Optional override to hide component on touch/mobile screens entirely */
  hideOnMobile?: boolean;
  /** Pass-through props from Docusaurus config */
  [key: string]: unknown;
}

/**
 * Responsive Wrapper Component
 * Handles layout adaptation based on viewport width (Desktop/Tablet/Mobile)
 * and whether the item is being rendered inside the Mobile Drawer Menu.
 */
const ResponsiveNavbarItem: React.FC<ResponsiveNavbarItemProps> = ({
  Component,
  hideOnMobile = false,
  ...props
}) => {
  const windowSize = useWindowSize(); // Returns 'mobile' | 'desktop'
  const mobileSidebar = useNavbarMobileSidebar(); // Detects mobile drawer state

  const isMobile = windowSize === 'mobile';
  const isDrawerOpen = mobileSidebar.shown;

  // Option to completely disable desktop-only features (e.g., Cursor Switcher) on mobile
  if (isMobile && hideOnMobile) {
    return null;
  }

  // Hide custom items from the narrow top header bar when on mobile view.
  // Only display them inside the slide-out Mobile Drawer Menu.
  if (isMobile && !isDrawerOpen) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: isMobile ? '100%' : 'auto',
        padding: isMobile ? '0.5rem 0' : '0 0.25rem',
      }}
    >
      <Component {...props} isMobile={isMobile} isDrawerOpen={isDrawerOpen} />
    </div>
  );
};

/**
 * Exporting swizzled NavbarItem ComponentTypes
 */
const customComponentTypes = {
  ...ComponentTypes,

  'custom-themePicker': (props: Record<string, unknown>): JSX.Element => (
    <ResponsiveNavbarItem Component={ThemePicker} {...props} />
  ),

  'custom-codeThemePicker': (props: Record<string, unknown>): JSX.Element => (
    <ResponsiveNavbarItem Component={CodeThemePicker} {...props} />
  ),

  // Cursor switchers aren't needed on touch-based mobile screens
  'custom-cursorSwitcher': (props: Record<string, unknown>): JSX.Element => (
    <ResponsiveNavbarItem Component={CursorSwitcher} hideOnMobile {...props} />
  ),

  'custom-authButton': (props: Record<string, unknown>): JSX.Element => (
    <ResponsiveNavbarItem Component={NavbarAuthButton} {...props} />
  ),
};

export default customComponentTypes;