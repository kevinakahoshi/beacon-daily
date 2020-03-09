const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../../database');
const ClientError = require('../../../client-error');
const router = express.Router();

router.get('/get-user', (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(200).json(null);
  }
});

router.post('/create-an-account', (req, res, next) => {
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
      .then(result => res.status(201).json({ message: 'User created successfully' }))
      .catch(err => next(err));
    if (err) {
      console.error(err);
    }
  });
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const sqlQuery = `
    SELECT *
      FROM users
      WHERE email = $1
  `;

  const params = [
    email
  ];

  db.query(sqlQuery, params)
    .then(result => {
      if (result) {
        bcrypt.compare(req.body.password, result.rows[0].password)
          .then(response => {
            if (response) {
              const user = {
                email: result.rows[0].email,
                firstname: result.rows[0].firstname,
                lastname: result.rows[0].lastname,
                userid: result.rows[0].userid
              };
              req.session.user = user;
              res.status(200).json(user);
            } else {
              next(new ClientError('Incorrect email or password', 400));
            }
          });
      }
    })
    .catch(err => next(err));
});

router.post('/logout', (req, res, next) => {
  if (req.session.user) {
    delete req.session.user;
    res.status(200).json('User has been logged out');
  } else {
    next(new ClientError('No user was logged in', 200));
  }
});

module.exports = router;
