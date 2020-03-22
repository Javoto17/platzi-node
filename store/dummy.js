const db = {
  user: [{ id: 1, name: 'Carlos' }],
};

const list = async (table) => db[table] || [];
const get = async (table, id) => {
  const col = await list(table);
  return col.filter((item) => item.id === id)[0] || null;
};

const upsert = async (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(data);
};

const remove = async (table, id) => db[table].filter((user) => user.id !== Number(id));

const query = async (table, q) => {
  const col = await list(table);
  const keys = Object.keys(q);
  const key = keys[0];

  return col.filter((item) => item[key] === q[key] || null)[0];
};


module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
