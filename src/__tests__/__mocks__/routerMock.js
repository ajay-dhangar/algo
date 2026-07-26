const React = require('react');

module.exports = {
  useHistory: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    location: { pathname: '/' },
  }),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
  }),
  Link: ({ to, children, ...props }) =>
    React.createElement('a', { href: to, ...props }, children),
};
