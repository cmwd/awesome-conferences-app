const pino = require('pino');
const { NODE_ENV } = require('config');

let pretty;
const isProdEnv = NODE_ENV.toUpperCase() === 'PRODUCTION';
const isTestEnv = NODE_ENV.toUpperCase() === 'TEST';

if (!isProdEnv && !isTestEnv) {
  pretty = pino.pretty();
  pretty.pipe(process.stdout);
}

module.exports = pino({
  name: 'API',
  enabled: !isTestEnv,
  level: isProdEnv ? 'info' : 'trace',
}, pretty);
