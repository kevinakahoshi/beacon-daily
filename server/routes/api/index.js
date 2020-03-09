const express = require('express');
const checklist = require('./checklist');
const router = express.Router();

router.use('/checklist/', checklist);

module.exports = router;
