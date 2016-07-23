require('dotenv').config();
require('./src/database');
require('seneca')().use(require('./src/handlers'));
