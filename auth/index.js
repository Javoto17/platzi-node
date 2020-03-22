const jwt = require('jsonwebtoken');

const config = require('../config');

const { secret } = config.jwt;

const err = require('../utils/error');

const sign = (data) => jwt.sign(data, secret);

const verify = (token) => jwt.verify(token, secret);

function getToken(auth) {
  console.log(auth);
  if (!auth) {
    throw new Error('Come without token');
  }
  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Invalid format');
  }
  const token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

const check = {
  own(req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if (decoded.id !== owner) {
      throw err('You dont have permission for do it', 401);
    }
  },
};

module.exports = {
  sign,
  check,
};
