import pino from 'pino';
import { NODE_ENV } from 'config';

let pretty;
const isProdEnv = NODE_ENV.toUpperCase() === 'PRODUCTION';
const isTestEnv = NODE_ENV.toUpperCase() === 'TEST';

if (!isProdEnv && !isTestEnv) {
  pretty = pino.pretty();
  pretty.pipe(process.stdout);
}

export default pino({
  name: 'WEB APP',
  enabled: !isTestEnv,
  level: 'info',
}, pretty);
