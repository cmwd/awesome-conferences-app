const {
  APP_PORT = 8002,
  NODE_ENV = 'development',
  COLLECTORS_ADDRESS = 'http://collectors:8001',
  DB_NAME = 'acl',
  DB_URL = 'mongodb://localhost:27017',
} = process.env;

module.exports = {
  APP_PORT, COLLECTORS_ADDRESS, NODE_ENV, DB_NAME, DB_URL,
};
