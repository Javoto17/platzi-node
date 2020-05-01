const nanoid = require('nanoid');
const store = require('../../../store/mysql');

const auth = require('../auth');

const table = 'user';

module.exports = (injectedStore) => {
  let db = injectedStore;

  if (!db) {
    db = store;
  }

  const list = () => db.list(table);

  const getUserById = (id) => db.get(table, id);

  const deleteUserById = (id) => {
    if (!id) {
      throw Error;
    }

    return db.remove(table, id);
  };

  const addUser = async (body) => {
    const user = {
      username: body.username,
      name: body.name,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return db.upsert(table, user);
  };

  const followUser = (from, to) => {
    return store.upsert(`${table}_follow`, {
      user_from: from,
      user_to: to,
    });
  };

  const getFollowing = (user) => {
    const join = {
      [table]: 'user_to',
    };

    const query = { user_from: user };

    return db.query(`${table}_follow`, query, join);
  };

  return {
    list,
    getUserById,
    deleteUserById,
    addUser,
    followUser,
    getFollowing,
  };
};
