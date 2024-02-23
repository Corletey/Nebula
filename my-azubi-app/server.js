const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
  db.run('CREATE TABLE students (name TEXT, email TEXT, cohort TEXT, ranking INTEGER)');
});

app.get('/api/health-check', (req, res) => {
  res.send('OK');
});

app.post('/api/test-db-connection', (req, res) => {
  const { host, user, password, database } = req.body;
  const db = new sqlite3.Database(`${database}.db`, (err) => {
    if (err) {
      res.status(500).send('Database connection failed.');
    } else {
      res.send('Database connection successful!');
    }
  });
});

app.get('/api/students', (req, res) => {
  db.all('SELECT * FROM students', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Mock backend server listening at http://localhost:${port}`);
});