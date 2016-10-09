const {
  BASE_PATH = '',
  APP_PORT = 8000,
  BACKEND_API_URL = 'http://api.awc.local',
  FRONTEND_API_URL = 'http://api.awc.local',
  NODE_ENV = 'development',
  TOKEN_SECRET = 'SUPER_IMPORTANT_TO_OVERRIDE_IN_PROD_ENV',
  AUTH_GITHUB_ID = '49b75f9d45a59b0f4715',
  AUTH_GITHUB_SECRET = 'b66722c2b8376153b6e2dda00fab2cfae51bed75',
  AUTH_GITHUB_CALLBACK = 'http://localhost:8000/user/login/github',
} = process.env;

module.exports = {
  BASE_PATH,
  APP_PORT,
  BACKEND_API_URL,
  FRONTEND_API_URL,
  NODE_ENV,
  TOKEN_SECRET,
  AUTH_GITHUB_ID,
  AUTH_GITHUB_SECRET,
  AUTH_GITHUB_CALLBACK,
};
