const express = require('express');
const { create, getAll, getTopFive, getById, getList, update, remove, countUnread, readAll, read} = require('./notification.controller');
const router = express.Router();

router.post('/', create);

// router.get('/top-five', auth, withAdminRoles, getTopFive);

// router.get('/count', auth, withAdminRoles, countUnread);

// router.get('/read', auth, withAdminRoles, readAll);

// router.get('/read/:id', auth, read);

router.get('/', getAll);

router.get('/list', getList);

router.get('/:id', getById);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;