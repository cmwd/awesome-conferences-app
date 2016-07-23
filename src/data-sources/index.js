require('dotenv').config();
require('./config');
require('./src/database');
require('seneca')().use(require('./src/handlers'));
