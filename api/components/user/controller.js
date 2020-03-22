const nanoid = require('nanoid');
const store = require('../../../store/dummy');

const auth = require('../auth');

const table = 'user';

module.exports = (injectedStore) => {
  let db = injectedStore;

  if (!db) {
    db = store;
  }

  const list = () => store.list(table);

  const getUserById = (id) => store.get(table, id);

  const deleteUserById = (id) => {
    if (!id) {
      throw Error;
    }

    return store.remove(table, id);
  };

  const addUser = async (body) => {
    const user = {
      username: body.username,
      name: body.name,
      password: body.password,
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
        password: user.password,
      });
    }

    return store.upsert(table, user);
  };

  return {
    list,
    getUserById,
    deleteUserById,
    addUser,
  };
};
