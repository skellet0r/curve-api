import memoize from 'memoizee';

const formatJsonError = (err) => (
  { err: err.toString ? err.toString() : err }
);

const fn = (cb, options = {}) => {
  const {
    maxAge: maxAgeSec = null, // Caching duration, in seconds
  } = options;

  const callback = maxAgeSec !== null ?
    memoize(async (query) => cb(query), {
      promise: true,
      maxAge: maxAgeSec * 1000,
      normalizer: ([query]) => JSON.stringify(query), // Separate cache entries for each route & query params,
    }) : cb;

  return async (req, res) => (
    Promise.resolve(callback(req.query))
      .then((json) => res.status(200).json(json))
      .catch((err) => res.status(500).json(formatJsonError(err)))
  );
};

export {
  fn,
  formatJsonError,
};