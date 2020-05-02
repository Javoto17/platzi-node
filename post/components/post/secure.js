const auth = require('../../../auth');
const store = require('../../../store/mysql');

const checkAuth = (action) => {
  async function middleware(req, res, next) {
    const {
      params: { id },
    } = req;

    switch (action) {
      case 'update': {
        const post = await store.get('post', id);
        auth.check.own(req, post[0].user);
        next();
        break;
      }
      case 'logged':
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
