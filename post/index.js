const express = require('express');
const bodyParser = require('body-parser');
// const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');

const post = require('./components/post/network');

const errors = require('../network/errors');

const app = express();

// const swaggerDoc = require('./swagger.json');

app.use(bodyParser.json());

// router
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
  console.log('Api escuchando en el puerto', config.post.port);
});
