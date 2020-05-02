const fetch = require('request');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function request(method, table, data = {}) {
    let url = `${URL}/${table}`;
    let body = '';

    console.log(data);

    if (method === 'GET' && data) {
      if (data.id) {
        url += `/${data.id}`;
      }
    } else if (data) {
      body = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      fetch(
        {
          method,
          headers: {
            'content-type': 'application/json',
          },
          url,
          body,
        },
        (err, req, res) => {
          if (err) {
            console.error('Error DB remote', err);
            return reject(err.message);
          }
          const resp = JSON.parse(res);
          return resolve(resp.body);
        },
      );
    });
  }

  function list(table) {
    return request('GET', table);
  }

  function get(table, id) {
    console.log('boom');
    return request('GET', table, { id });
  }

  function insert(table, data) {
    return request('POST', table, data);
  }

  function update(table, data) {
    return request('PUT', table, data);
  }

  function upsert(table, data) {
    if (data.id) {
      return update(table, data);
    }

    return insert(table, data);
  }

  function query(table, data, join) {
    return request('POST', `${table}/query`, { query: data, join });
  }

  return {
    list,
    insert,
    update,
    upsert,
    get,
    query,
  };
}

module.exports = createRemoteDB;
