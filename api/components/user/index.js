const ctrl = require('./controller');

// const store = require('../../../store/mysql');
const config = require('../../../config');

const store =
  config.remoteDB === true
    ? require('../../../store/remote-mysql')
    : require('../../../store/mysql');

const cache =
  config.remoteDB === true
    ? require('../../../store/remote-cache')
    : require('../../../store/redis');

module.exports = ctrl(store, cache);
