const auth = require('../../../auth');

const checkAuth = (action) => {
  function middleware(req, res, next) {
    const {
      body: { id },
    } = req;
    const owner = id;

    switch (action) {
      case 'update':
        auth.check.own(req, owner);
        next();
        break;
      case 'follow':
        auth.check.logged(req);
        next();
        break;
      default:
        next();
    }
  }
  return middleware;
};

module.exports = checkAuth;
