const express = require('express');
const db = require('../../../database');
const router = express.Router();

router.get('/', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

module.exports = router;
