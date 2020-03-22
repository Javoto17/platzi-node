// const nanoid = require('nanoid');

const bcrypt = require('bcrypt');

const store = require('../../../store/dummy');

const auth = require('../../../auth');

const table = 'auth';

module.exports = (injectedStore) => {
  let db = injectedStore;

  if (!db) {
    db = store;
  }

  const login = async (username, password) => {
    const data = await store.query(table, { username });
    console.log('data', data);

    return bcrypt.compare(password, data.password).then((equals) => {
      if (equals === true) {
        return auth.sign(data);
      }
      throw new Error('Data invalid');
    }, () => {
      throw new Error('Data invalid');
    });
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
