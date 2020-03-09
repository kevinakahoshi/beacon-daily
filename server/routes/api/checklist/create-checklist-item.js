const express = require('express');
const db = require('../../../database');
const router = express.Router();

router.post('/', (req, res, next) => {
  const userId = req.body.userId;
  const checklistItem = req.body.checklistItem;
  const isCompleted = false;
  const sqlQuery = `
            INSERT INTO checklist (userId, checklistItem, isCompleted)
            VALUES ($1, $2, $3)
          `;
  const params = [
    userId,
    checklistItem,
    isCompleted
  ];
  db.query(sqlQuery, params)
    .then(result => res.status(201).json({
      message: 'Checklist item created successfully'
    }))
    .catch(err => next(err));
});

module.exports = router;
