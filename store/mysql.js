const mysql = require('mysql');

const config = require('../config');

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// Connection

let connection;

function handleCon() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.log('[db error]', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('DB connect');
    }
  });

  connection.on('error', (err) => {
    console.log('[db error]');
    setTimeout(handleCon, 2000);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} where id='${id}'`, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      },
    );
  });
}

async function upsert(table, data) {
  if (data && data.id) {
    const row = await get(table, data.id);

    if (row.length === 0) {
      return insert(table, data);
    }

    return update(table, data);
  }

  return insert(table, data);
}

function query(table, data, join) {
  let joinQuery = '';

  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} where ${table}.?`,
      data,
      (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      },
    );
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
  insert,
  update,
};
