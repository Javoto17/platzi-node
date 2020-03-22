const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

const list = async (req, res) => {
  try {
    const listOfUsers = await controller.list();
    response.success(req, res, listOfUsers, 200);
  } catch (error) {
    response.success(req, res, error.message, 200);
  }
};


const upsert = async (req, res) => {
  try {
    const { body } = req;
    const userAdded = await controller.addUser(body);
    response.success(req, res, userAdded, 200);
  } catch (error) {
    response.success(req, res, error.message, 200);
  }
};


const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = controller.getUserById(id);
    response.success(req, res, user, 200);
  } catch (error) {
    response.success(req, res, error.message, 200);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = controller.deleteUserById(id);
    response.success(req, res, user, 200);
  } catch (error) {
    response.success(req, res, error.message, 200);
  }
};

router.get('/', list);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

// router.get('/:id', (req, res) => {
//   const user = controller.get(req.params.id);
//   response.success(req, res, controller.list(), 200);
// });

module.exports = router;
