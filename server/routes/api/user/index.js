const express = require('express');
const getUser = require('./get-user');
const createAnAccount = require('./create-an-account');
const login = require('./login');
const logout = require('./logout');
const router = express.Router();

router.use('/get-user', getUser);
router.use('/create-an-account', createAnAccount);
router.use('/login', login);
router.use('/logout', logout);

module.exports = router;
