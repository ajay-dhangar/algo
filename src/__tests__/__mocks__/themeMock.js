const React = require('react');

const Layout = ({ children, title }) =>
  React.createElement('div', { 'data-testid': 'docusaurus-layout', 'data-title': title }, children);

module.exports = {
  __esModule: true,
  default: Layout,
  Layout,
};
