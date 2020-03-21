const db = {
  user: [{ id: 1, name: 'Carlos' }],
};

const list = async (table) => db[table];
const get = async (table, id) => {
  const col = await list(table);
  return col.filter((item) => item.id === id)[0] || null;
};
const update = async (table, data) => {
  db[table].push(data);
};
const remove = async (table, id) => {
  return true;
};

module.exports = {
  list,
  get,
  update,
  remove,
};
