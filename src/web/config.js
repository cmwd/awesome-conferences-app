module.exports = {
  APP_PORT: process.env.NODE_PORT || 8000,
  BACKEND_API_URL: 'http://api:8002',
  FRONTEND_API_URL: process.env.API_URL || 'http://api.awesome-conferences.com',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
