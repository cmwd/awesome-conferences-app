import logger from 'bunyan-request-logger';

const loggerSettings = {
  name: 'WEB',
  logParams: false,
};

export default logger(loggerSettings);
