const express = require('express');
const healthCheck = require('./health-check');
const checklist = require('./checklist');
const user = require('./user');
const router = express.Router();

router.use('/health-check', healthCheck);
router.use('/checklist/', checklist);
router.use('/user/', user);

module.exports = router;
