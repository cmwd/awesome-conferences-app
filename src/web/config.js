const {
  APP_PORT = 8000,
  BACKEND_API_URL = 'http://api:8002',
  FRONTEND_API_URL = 'http://api.awesome-conferences.com',
  NODE_ENV = 'development',
} = process.env;

module.exports = {
  APP_PORT, BACKEND_API_URL, FRONTEND_API_URL, NODE_ENV,
};
