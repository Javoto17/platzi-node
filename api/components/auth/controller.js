// const nanoid = require('nanoid');

const bcrypt = require('bcrypt');

const store = require('../../../store/mysql');

const auth = require('../../../auth');

const table = 'auth';

module.exports = (injectedStore) => {
  let db = injectedStore;

  if (!db) {
    db = store;
  }

  const login = async (username, password) => {
    const data = await store.query(table, { username });

    const user = { ...data[0] };

    return bcrypt.compare(password, user.password).then(
      (equals) => {
        if (equals === true) {
          return auth.sign(user);
        }
        throw new Error('Data invalid');
      },
      () => {
        throw new Error('Error bcrypt');
      },
    );
  };

  const upsert = async (data) => {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 10);
    }

    return store.upsert(table, authData);
  };

  return {
    upsert,
    login,
  };
};
