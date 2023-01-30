const router = require('express').Router();
const RedisCaching = require('../../config/RedisCaching');
const { authenticated, manager } = require('../../security/middlewares');
const { list } = require('./user.controller');

router.post('/list', authenticated, manager, RedisCaching.getCachedData, list);


module.exports = router;