const router = require('express').Router();
const { authenticated } = require('../../security/middlewares');
const { create, getAll, list, getById, update, remove } = require('./task.controller');

router.post('/', authenticated, create);

router.get('/', getAll);

router.get('/list', list);

router.get('/:id', getById);

router.put('/:id', update);

router.delete('/:id', remove);


module.exports = router;