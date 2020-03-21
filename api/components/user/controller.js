const store = require('../../../store/dummy');

const table = 'user';

module.exports = (injectedStore) => {
  let db = injectedStore;

  if (!db) {
    db = store;
  }

  const list = () => store.list(table);
  const getUserById = (id) => store.get(table, id);

  return {
    list,
    getUserById,
  };
};
