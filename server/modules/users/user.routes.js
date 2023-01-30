const router = require('express').Router();
const { authenticated, manager } = require('../../security/middlewares');
const { list } = require('./user.controller');

router.post('/list', authenticated, manager, list);


module.exports = router;