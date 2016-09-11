function errorHandler(err, req, res, next) {
  const body = {
    status: err.statusCode || 500,
    message: err.message,
  };

  if (req.app.get('env') === 'development') {
    body.stack = err.stack;
  }

  res.status(body.status).json(body);
}

module.exports = errorHandler;
