const express = require('express');
const ClientError = require('../../../client-error');
const router = express.Router();

router.post('/', (req, res, next) => {
  if (req.session.user) {
    delete req.session.user;
    res.status(200).json('User has been logged out');
  } else {
    next(new ClientError('No user was logged in', 200));
  }
});

module.exports = router;
