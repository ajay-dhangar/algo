import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import ThemePicker from '@site/src/components/ThemePicker';
import CodeThemePicker from '@site/src/components/CodeThemePicker';
import CursorSwitcher from '@site/src/components/CursorSwitcher';
import NavbarAuthButton from '@site/src/components/NavbarAuthButton';

export default {
  ...ComponentTypes,
  'custom-themePicker': ThemePicker,
  'custom-codeThemePicker': CodeThemePicker,
  'custom-cursorSwitcher': CursorSwitcher,
  'custom-authButton': NavbarAuthButton,
};
