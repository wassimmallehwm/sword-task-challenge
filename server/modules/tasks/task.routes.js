const router = require('express').Router();
const RedisCaching = require('../../config/RedisCaching');
const { authenticated, manager } = require('../../security/middlewares');
const { create, list, update, remove } = require('./task.controller');

router.post('/', authenticated, create);

router.post('/list', authenticated, RedisCaching.getCachedData, list);

router.put('/:id', authenticated, update);

router.delete('/:id', authenticated, manager, remove);


module.exports = router;