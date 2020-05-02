const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const { api } = require('../config.js');

const user = require('./components/user/network');
const auth = require('./components/auth/network');
// const post = require('../post/components/post/network');

const errors = require('../network/errors');

const app = express();

const swaggerDoc = require('./swagger.json');

app.use(bodyParser.json());

// router
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/user', user);
app.use('/api/auth', auth);
// app.use('/api/post', post);

app.use(errors);

app.listen(api.port, () => {
  console.log('Api escuchando en el puerto', api.port);
});
