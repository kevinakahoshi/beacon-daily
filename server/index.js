require('dotenv/config');
const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/get-checklist/:id?', (req, res, next) => {
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
    `;
    params.push(userId);
  }
  db.query(sqlQuery, params)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/get-user', (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(200).json(null);
  }
});

app.post('/api/create-an-account', (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const sqlQuery = `
    INSERT INTO users (firstname, lastname, email, password)
         VALUES ($1, $2, $3, $4)
  `;
  const params = [
    firstName,
    lastName,
    email,
    password
  ];
  db.query(sqlQuery, params)
    .then(result => res.status(201).json({ message: 'User created successfully' }))
    .catch(err => next(err));
});

app.post('/api/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlQuery = `
    SELECT *
      FROM users
     WHERE email = $1
       AND password = $2
  `;
  const params = [
    email,
    password
  ];
  db.query(sqlQuery, params)
    .then(result => {
      if (result) {
        const user = {
          email: result.rows[0].email,
          firstname: result.rows[0].firstname,
          lastname: result.rows[0].lastname,
          userid: result.rows[0].userid
        };
        req.session.user = user;
        // req.session = JSON.parse(res.session, null, 2);
        res.status(200).json(user);
      }
    })
    .catch(err => next(err));
});

app.post('/api/create-checklist-item', (req, res, next) => {
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

app.put('/api/update-checklist-item', (req, res, next) => {
  const checklistItemId = req.body.checklistItemId;
  const updatedChecklistItem = req.body.updatedChecklistItem;
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

app.put('/api/toggle-complete', (req, res, next) => {
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
        .then(result => res.json({ message: 'Checklist item updated successfully' }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.delete('/api/delete-checklist-item', (req, res, next) => {
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

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
