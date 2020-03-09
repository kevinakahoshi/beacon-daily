const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(200).json(null);
  }
});

module.exports = router;
