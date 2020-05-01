const jwt = require('jsonwebtoken');

const config = require('../config');

const { secret } = config.jwt;

const err = require('../utils/error');

const sign = (data) => jwt.sign(data, secret);

const verify = (token) => jwt.verify(token, secret);

function getToken(auth) {
  console.log(auth);
  if (!auth) {
    throw err('Come without token', 401);
  }
  if (auth.indexOf('Bearer ') === -1) {
    throw err('Invalid format', 401);
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
  own: async (req, owner) => {
    const decoded = decodeHeader(req);
    if (decoded.id !== owner) {
      throw err('You dont have permission for do it', 401);
    }
  },
  logged: (req) => {
    const decoded = decodeHeader(req);
    if (!decoded) {
      throw err('You have to logged for do it', 401);
    }
  },
};

module.exports = {
  sign,
  check,
};
