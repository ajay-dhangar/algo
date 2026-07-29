const handler = {
  get: (target, prop) => {
    if (prop === '__esModule') return true;
    if (prop === 'default') return new Proxy({}, handler);
    return typeof prop === 'string' ? prop : undefined;
  },
};
module.exports = new Proxy({}, handler);
