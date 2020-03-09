const express = require('express');
const db = require('../../../database');
const router = express.Router();

router.delete('/', (req, res, next) => {
  const checklistItemId = req.body.checklistItemId;
  const sqlQuery = `
          DELETE FROM checklist
                WHERE checklistItemId = $1
        `;
  const params = [
    checklistItemId
  ];
  db.query(sqlQuery, params)
    .then(result => res.status(202).json({
      message: 'Checklist item deleted successfully'
    }))
    .catch(err => next(err));
});

module.exports = router;
