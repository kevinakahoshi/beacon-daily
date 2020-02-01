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

app.get('/api/checklist', (req, res, next) => {
  const sqlQuery = 'SELECT * FROM users INNER JOIN checklist ON users.userId = checklist.userId';
  db.query(sqlQuery)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/create-checklist-item', (req, res, next) => {
  const userId = parseInt(req.body.userId);
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
