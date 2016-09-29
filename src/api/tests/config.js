const pathAlias = require('path-alias');

pathAlias.setAlias('controller', '../src/controller');
pathAlias.setAlias('model', '../src/model');
pathAlias.setAlias('resources', './_resources');


global.CONFIG = {
  REQUEST_TIMEOUT: 5000,
};
