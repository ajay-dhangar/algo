const React = require('react');

function translate(descriptor, values) {
  let msg = typeof descriptor === 'string' ? descriptor : descriptor?.message || '';
  if (values && typeof values === 'object') {
    Object.entries(values).forEach(([k, v]) => {
      msg = msg.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    });
  }
  return msg;
}

const Translate = ({ children, message }) => React.createElement(React.Fragment, null, children || message || null);

const Link = ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children);

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
};
