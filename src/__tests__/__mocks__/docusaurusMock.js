const React = require('react');

const Link = ({ to, children, ...props }) =>
  React.createElement('a', { href: to, ...props }, children);

const BrowserOnly = ({ children, fallback }) => {
  if (typeof children === 'function') {
    try {
      const res = children();
      if (res) return res;
    } catch {
      return fallback;
    }
  }
  return fallback;
};

const Translate = ({ children }) => children;
const translate = ({ message }) => message;

module.exports = {
  __esModule: true,
  default: Translate,
  Translate,
  translate,
  Link,
  BrowserOnly,
  useColorMode: () => ({ colorMode: 'dark', setColorMode: () => {} }),
  useDocusaurusContext: () => ({
    siteConfig: {
      title: 'Algo',
      customFields: { apiBaseUrl: 'https://api.example.com' },
    },
  }),
  useDocById: () => ({ description: 'Doc description' }),
  findFirstSidebarItemLink: (item) => item.href || '/docs/fallback',
  extractLeadingEmoji: (label) => ({ emoji: undefined, rest: label }),
  useDocCardDescriptionCategoryItemsPlural: () => (count) => `${count} items`,
};
