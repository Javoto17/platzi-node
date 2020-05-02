const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

const list = (table) => {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) return reject();

      let res = data || null;

      if (data) {
        res = JSON.parse(data);
      }
      return resolve(res);
    });
  });
};

const get = async (table, id) => {
  const key = `${table}_${id}`;

  const data = await list(key);

  return data;
};

const upsert = (table, data) => {
  let key = table;

  if (data && data.id) {
    key = `${key}_${data.id}`;
  }

  client.setex(key, 10, JSON.stringify(data));
};

module.exports = {
  list,
  get,
  upsert,
};
