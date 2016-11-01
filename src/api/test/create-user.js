const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');

module.exports = payload =>
  jwt.sign(payload, TOKEN_SECRET, {});
