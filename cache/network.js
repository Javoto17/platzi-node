const express = require('express');

const response = require('../network/response');
const store = require('../store/redis');

const router = express.Router();

const list = async (req, res) => {
  const data = await store.list(req.params.table);
  response.success(req, res, data, 200);
};

const get = async (req, res) => {
  const data = await store.get(req.params.table, req.params.id);
  response.success(req, res, data, 200);
};

// const insert = async (req, res) => {
//   const data = await store.insert(req.params.table, req.body);
//   response.success(req, res, data, 200);
// };

const upsert = async (req, res) => {
  const data = await store.upsert(req.params.table, req.body);
  response.success(req, res, data, 200);
};

// const query = async (req, res) => {
//   const data = await store.query(
//     req.params.table,
//     req.body.query,
//     req.body.join,
//   );
//   response.success(req, res, data, 200);
// };

router.get('/:table', list);
router.get('/:table/:id', get);
router.put('/:table', upsert);
// router.post('/:table', insert);
// router.post('/:table/query', query);

module.exports = router;
