const React = require('react');
module.exports = {
  Layout: ({ children, title }) =>
    React.createElement('div', { 'data-testid': 'docusaurus-layout', 'data-title': title }, children),
};
