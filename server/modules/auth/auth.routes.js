const router = require('express').Router();
const { refreshToken } = require('../../security/middlewares');
const { login, refresh_token} = require('./auth.controller');

router.post('/login', login);

router.post('/refresh-token', refreshToken, refresh_token);

module.exports = router;