const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../../database');
const router = express.Router();

router.post('/', (req, res, next) => {
  const saltRounds = 12;
  const sqlQuery = `
    INSERT INTO users (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
  `;

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = hash;
    const params = [
      firstName,
      lastName,
      email,
      password
    ];
    db.query(sqlQuery, params)
      .then(result => res.status(201).json({
        message: 'User created successfully'
      }))
      .catch(err => next(err));
    if (err) {
      console.error(err);
    }
  });
});

module.exports = router;
