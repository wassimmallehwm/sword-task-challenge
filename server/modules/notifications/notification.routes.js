const express = require('express');
const { authenticated } = require('../../security/middlewares');
const { getList, countUnread, read} = require('./notification.controller');
const router = express.Router();

router.get('/count', authenticated, countUnread);

router.get('/read/:id', authenticated, read);

router.get('/list', authenticated, getList);

module.exports = router;