const React = require('react');

module.exports = {
  Link: ({ to, children, ...props }) =>
    React.createElement('a', { href: to, ...props }, children),
  BrowserOnly: ({ children, fallback }) => {
    if (typeof children === 'function') {
      try {
        const res = children();
        if (res) return res;
      } catch {
        return fallback;
      }
    }
    return fallback;
  },
  useDocusaurusContext: () => ({
    siteConfig: {
      title: 'Algo',
      customFields: { apiBaseUrl: 'https://api.example.com' },
    },
  }),
};
