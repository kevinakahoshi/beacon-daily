const express = require('express');
const db = require('../../../database');
const router = express.Router();

router.get('/:id?', (req, res, next) => {
  let userId = null;
  if (req.session.userId) {
    userId = req.session.userId;
  } else {
    userId = parseInt(req.params.id);
  }
  let sqlQuery = null;
  const params = [];
  if (!userId) {
    sqlQuery = `
        SELECT *
          FROM users
    INNER JOIN checklist
            ON users.userId = checklist.userId
  `;
  } else {
    sqlQuery = `
        SELECT *
          FROM checklist
         WHERE userId = $1
      ORDER BY checklistItemId
      `;
    params.push(userId);
  }
  db.query(sqlQuery, params)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

module.exports = router;
