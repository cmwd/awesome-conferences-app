const HEADERS_CONFIG = {
  'Access-Control-Allow-Origin': process.env.NODE_EXTERNAL_HOST,
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
};

const configMiddleware = (req, res, next) => {
  Object.keys(HEADERS_CONFIG).forEach(key =>
    res.header(key, HEADERS_CONFIG[key]));
  next();
};

module.exports = app => {
  app.disable('x-powered-by');
  app.use(configMiddleware);
};
