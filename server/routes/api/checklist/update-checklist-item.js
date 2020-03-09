const express = require('express');
const db = require('../../../database');
const router = express.Router();

router.patch('/', (req, res, next) => {
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
    .then(result => res.status(202).json({
      message: 'Checklist item updated successfully'
    }))
    .catch(err => next(err));
});

module.exports = router;
