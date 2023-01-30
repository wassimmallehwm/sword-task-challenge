const express = require('express');
const { authenticated, manager } = require('../../security/middlewares');
const { getList, countUnread, read} = require('./notification.controller');
const router = express.Router();

router.get('/count', authenticated, manager, countUnread);

router.get('/read/:id', authenticated, manager, read);

router.get('/', authenticated, manager, getList);

module.exports = router;