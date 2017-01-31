const {
  APP_PORT = 8002,
  NODE_ENV = 'development',
  DB_NAME = 'acl',
  DB_ADDRESS = 'mongodb://web.awc.local:27017',
} = process.env;

module.exports = {
  APP_PORT,
  NODE_ENV,
  DB_NAME,
  DB_ADDRESS,
};
