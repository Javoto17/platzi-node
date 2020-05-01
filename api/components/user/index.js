const ctrl = require('./controller');

// const store = require('../../../store/mysql');
const store = require('../../../mysql/remote-mysql');

module.exports = ctrl(store);
