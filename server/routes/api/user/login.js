const express = require('express');
const bcrypt = require('bcrypt');
const ClientError = require('../../../client-error');
const db = require('../../../database');
const router = express.Router();

router.post('/', (req, res, next) => {
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

module.exports = router;
