const nanoid = require('nanoid');
const store = require('../../../store/mysql');

const table = 'post';

module.exports = (injectedStore) => {
  let db = injectedStore;

  if (!db) {
    db = store;
  }

  const list = () => store.list(table);

  const getPostById = (id) => store.get(table, id);

  const upsertPost = (user, body) => {
    const post = {
      title: body.title,
      user: user.id,
    };

    if (body.id) {
      post.id = body.id;
    } else {
      post.id = nanoid();
    }

    return store.upsert(table, post);
  };

  return {
    list,
    getPostById,
    upsertPost,
  };
};
