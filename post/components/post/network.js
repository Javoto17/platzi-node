const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');
const secure = require('./secure');

const router = express.Router();

const getListOfPost = async (req, res, next) => {
  try {
    const listOfPost = await controller.list();
    response.success(req, res, listOfPost, 200);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listOfPost = await controller.getPostById(id);
    response.success(req, res, listOfPost, 200);
  } catch (error) {
    next(error);
  }
};

const upsertPost = async (req, res, next) => {
  try {
    const { body, user } = req;
    const post = await controller.upsertPost(user, body);
    response.success(req, res, post, 200);
  } catch (error) {
    next(error);
  }
};

router.get('/', getListOfPost);
router.get('/:id', getPostById);
router.put('/:id', secure('update'), upsertPost);
router.post('/', secure('logged'), upsertPost);

module.exports = router;
