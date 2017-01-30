const {
  APP_PORT = 8002,
  NODE_ENV = 'development',
  COLLECTORS_ADDRESS = 'http://collectors:8001',
  DB_NAME = 'acl',
  DB_ADDRESS = 'mongodb://web.awc.local:27017',
  TOKEN_SECRET = 'SUPER_IMPORTANT_TO_OVERRIDE_IN_PROD_ENV',
} = process.env;

module.exports = {
  APP_PORT, COLLECTORS_ADDRESS, NODE_ENV, DB_NAME, DB_ADDRESS, TOKEN_SECRET,
};
