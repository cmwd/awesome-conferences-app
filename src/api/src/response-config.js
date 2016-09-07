const HEADERS_CONFIG = {
  'Access-Control-Allow-Origin': process.env.NODE_EXTERNAL_HOST,
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
};

const headersConfigMiddleware = (req, res, next) => {
  Object
    .keys(HEADERS_CONFIG)
    .forEach(key => res.header(key, HEADERS_CONFIG[key]));
  next();
};

function requestConfig(app) {
  app.disable('x-powered-by')
    .use(headersConfigMiddleware);
}

module.exports = requestConfig;
