const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const listOfUsers = await controller.list();
    response.success(req, res, listOfUsers, 200);
  } catch (error) {
    response.success(req, res, error.message, 200);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = controller.getUserById(id);
    response.success(req, res, user, 200);
  } catch (error) {
    response.success(req, res, error.message, 200);
  }
});

// router.get('/:id', (req, res) => {
//   const user = controller.get(req.params.id);
//   response.success(req, res, controller.list(), 200);
// });

module.exports = router;
