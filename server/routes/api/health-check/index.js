const express = require('express');
const router = require(express.Router());
const db = require('./routes/database');

const healthCheck = router.use((req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

// const healthCheck = (req, res, next) => db.query('select \'successfully connected\' as "message"')
//   .then(result => res.status(200).json(result.rows[0]))
//   .catch(err => next(err));

module.exports = healthCheck;
