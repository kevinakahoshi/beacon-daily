const express = require('express');
const db = require('../../../database');
const router = express.Router();

router.patch('/', (req, res, next) => {
  const checklistItemId = req.body.checklistItemId;

  const getQuery = `
    SELECT *
      FROM checklist
      WHERE checklistItemId = $1
  `;

  const getParams = [
    checklistItemId
  ];

  db.query(getQuery, getParams)
    .then(result => {
      const isCompleted = !result.rows[0].iscompleted;
      const updateQuery = `
        UPDATE checklist
            SET isCompleted = $1
          WHERE checklistItemId = $2
      `;
      const updateParams = [
        isCompleted,
        checklistItemId
      ];
      db.query(updateQuery, updateParams)
        .then(result => res.json({
          message: 'Checklist item updated successfully'
        }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = router;
