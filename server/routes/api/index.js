const express = require('express');
const ClientError = require('../../client-error');
const healthCheck = require('./health-check');
const checklist = require('./checklist');
const user = require('./user');
const router = express.Router();

router.use('/health-check', healthCheck);
router.use('/checklist', checklist);
router.use('/user', user);
router.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

module.exports = router;
