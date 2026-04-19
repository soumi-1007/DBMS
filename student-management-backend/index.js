const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your MySQL username
  password: 'Mohana@143', // Update with your MySQL password
  database: 'student_activity_db' // Update with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes

// Students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/students', (req, res) => {
  const { name, email, department } = req.body;
  db.query('INSERT INTO students (name, email, department) VALUES (?, ?, ?)',
    [name, email, department], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, name, email, department });
  });
});

// Events
app.get('/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Faculty
app.get('/faculty', (req, res) => {
  db.query('SELECT * FROM faculty', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Participation
app.get('/participation', (req, res) => {
  db.query('SELECT * FROM participation', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Achievements
app.get('/achievements', (req, res) => {
  db.query('SELECT * FROM achievements', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Registration log
app.get('/registration-log', (req, res) => {
  db.query('SELECT * FROM registration_log', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Register student (procedure)
app.post('/register', (req, res) => {
  const { student_id, event_id } = req.body;
  db.query('CALL register_student(?, ?)', [student_id, event_id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Student registered successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});