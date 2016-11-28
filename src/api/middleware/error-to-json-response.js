const createError = require('http-errors');

const normalizeError = (errObj) => {
  const status = errObj.statusCode || errObj.status || 500;
  const message = errObj.message || createError[status]().message;

  return Object.assign({}, errObj, { status, message });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (errObj, req, res, next) => {
  let status = null;
  const err = normalizeError(errObj);

  status = {
    ok: false,
    status: err.status,
    message: err.message,
  };

  if (status.status >= 500) {
    req.log.fatal(errObj.stack);
  }

  if (process.env.NODE_ENV === 'test' && status.status >= 500) {
    console.error(errObj);
  }

  res
    .status(status.status)
    .json({ status });
};

module.exports = errorHandler;
