const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { body: { username, password } } = req;
    const token = await controller.login(username, password);
    response.success(req, res, token, 200);
  } catch (error) {
    console.log(error);
    response.success(req, res, 'Error Login', 400);
  }
};

router.post('/login', login);

// router.get('/:id', (req, res) => {
//   const user = controller.get(req.params.id);
//   response.success(req, res, controller.list(), 200);
// });

module.exports = router;
