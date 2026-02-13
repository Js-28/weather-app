const cache = {};

const setCache = (key, data, ttl = 5 * 60 * 1000) => { // default 5 min
  cache[key] = { data, expiry: Date.now() + ttl };
};

const getCache = (key) => {
  const cached = cache[key];
  if (cached && cached.expiry > Date.now()) return cached.data;
  return null;
};

module.exports = { setCache, getCache };
