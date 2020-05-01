const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

const list = async (req, res, next) => {
  try {
    const listOfUsers = await controller.list();
    response.success(req, res, listOfUsers, 200);
  } catch (error) {
    next(error);
  }
};

const upsert = async (req, res, next) => {
  try {
    const { body } = req;
    const userAdded = await controller.addUser(body);
    response.success(req, res, userAdded, 200);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await controller.getUserById(id);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await controller.deleteUserById(id);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
};

const followUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const followId = req.params.id;
    const followed = await controller.followUser(userId, followId);
    response.success(req, res, followed, 201);
  } catch (error) {
    next(error);
  }
};

const getFollowing = async (req, res, next) => {
  try {
    const following = await controller.getFollowing(req.params.id);
    response.success(req, res, following, 200);
  } catch (error) {
    next(error);
  }
};

router.get('/', list);
router.put('/', secure('update'), upsert);
router.post('/', upsert);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.get('/:id/following/', secure('follow'), getFollowing);
router.post('/follow/:id/', secure('follow'), followUser);

module.exports = router;
