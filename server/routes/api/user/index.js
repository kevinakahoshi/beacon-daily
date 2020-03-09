const express = require('express');
// const bcrypt = require('bcrypt');
const getUser = require('./get-user');
const createAnAccount = require('./create-an-account');
const login = require('./login');
// const db = require('../../../database');
const ClientError = require('../../../client-error');
const router = express.Router();

router.use('/get-user', getUser);
router.use('/create-an-account', createAnAccount);
router.use('/login', login);

router.post('/logout', (req, res, next) => {
  if (req.session.user) {
    delete req.session.user;
    res.status(200).json('User has been logged out');
  } else {
    next(new ClientError('No user was logged in', 200));
  }
});

module.exports = router;
