const express = require('express');
const db = require('../../../database');
const router = express.Router();

router.get('/get-checklist/:id?', (req, res, next) => {
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

router.post('/create-checklist-item', (req, res, next) => {
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
    .then(result => res.status(201).json({ message: 'Checklist item created successfully' }))
    .catch(err => next(err));
});

router.patch('/update-checklist-item', (req, res, next) => {
  const updatedChecklistItem = req.body.updatedChecklistItem;
  const checklistItemId = req.body.checklistItemId;

  const sqlQuery = `
            UPDATE checklist
               SET checklistItem = $1
             WHERE checklistItemId = $2
          `;
  const params = [
    updatedChecklistItem,
    checklistItemId
  ];
  db.query(sqlQuery, params)
    .then(result => res.status(202).json({ message: 'Checklist item updated successfully' }))
    .catch(err => next(err));
});

router.delete('/delete-checklist-item', (req, res, next) => {
  const checklistItemId = req.body.checklistItemId;
  const sqlQuery = `
          DELETE FROM checklist
                WHERE checklistItemId = $1
        `;
  const params = [
    checklistItemId
  ];
  db.query(sqlQuery, params)
    .then(result => res.status(202).json({ message: 'Checklist item deleted successfully' }))
    .catch(err => next(err));
});

module.exports = router;
