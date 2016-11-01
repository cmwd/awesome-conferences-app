const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../config');

const TOKEN_DEFAULTS = {
  expiresIn: '120m',
};
const generateToken = (payload, config) =>
  jwt.sign(payload, TOKEN_SECRET, Object.assign({}, TOKEN_DEFAULTS, config));

module.exports = { generateToken };
