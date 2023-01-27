const router = require('express').Router();
const { authenticated } = require('../../security/middlewares');
const { create, getAll, list, getById, update, remove } = require('./task.controller');

router.post('/', authenticated, create);

router.get('/', authenticated, getAll);

router.get('/list', authenticated, list);

router.get('/:id', authenticated, getById);

router.put('/:id', authenticated, update);

router.delete('/:id', authenticated, remove);


module.exports = router;