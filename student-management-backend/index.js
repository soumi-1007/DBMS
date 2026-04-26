const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Mohana@143',
  database: process.env.DB_NAME || 'student_activity_db',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes

// ========== STUDENTS ==========
app.get('/students', (req, res) => {
  db.query('SELECT s.*, d.dept_name FROM students s LEFT JOIN departments d ON s.dept_id = d.dept_id', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/students', (req, res) => {
  const { name, email, dept_id, year } = req.body;
  db.query('INSERT INTO students (name, email, dept_id, year) VALUES (?, ?, ?, ?)',
    [name, email, dept_id, year], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ student_id: result.insertId, name, email, dept_id, year });
  });
});

app.put('/students/:id', (req, res) => {
  const { name, email, dept_id, year } = req.body;
  db.query('UPDATE students SET name = ?, email = ?, dept_id = ?, year = ? WHERE student_id = ?',
    [name, email, dept_id, year, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Student updated successfully' });
  });
});

app.delete('/students/:id', (req, res) => {
  db.query('DELETE FROM students WHERE student_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Student deleted successfully' });
  });
});

// ========== EVENTS ==========
app.get('/events', (req, res) => {
  db.query(`SELECT e.*, f.faculty_name, a.activity_type
    FROM events e 
    LEFT JOIN faculty f ON e.faculty_id = f.faculty_id 
    LEFT JOIN activities a ON e.activity_id = a.activity_id`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      // Transform activity_type to full names
      const transformedResults = results.map(event => ({
        ...event,
        activity_type_display: event.activity_type === 'Co' ? 'Curricular' : event.activity_type === 'Extra' ? 'Extra-Curricular' : event.activity_type
      }));
      res.json(transformedResults);
    });
});

app.get('/events/filter/:type', (req, res) => {
  const type = req.params.type === 'curricular' ? 'Co' : 'Extra';
  db.query(`SELECT e.*, f.faculty_name, a.activity_type
    FROM events e 
    LEFT JOIN faculty f ON e.faculty_id = f.faculty_id 
    LEFT JOIN activities a ON e.activity_id = a.activity_id
    WHERE a.activity_type = ?`,
    [type],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      const transformedResults = results.map(event => ({
        ...event,
        activity_type_display: event.activity_type === 'Co' ? 'Curricular' : 'Extra-Curricular'
      }));
      res.json(transformedResults);
    });
});

app.post('/events', (req, res) => {
  const { activity_id, event_name, date, location, faculty_id } = req.body;
  db.query('INSERT INTO events (activity_id, event_name, date, location, faculty_id) VALUES (?, ?, ?, ?, ?)',
    [activity_id, event_name, date, location, faculty_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ event_id: result.insertId, activity_id, event_name, date, location, faculty_id });
  });
});

app.put('/events/:id', (req, res) => {
  const { activity_id, event_name, date, location, faculty_id } = req.body;
  db.query('UPDATE events SET activity_id = ?, event_name = ?, date = ?, location = ?, faculty_id = ? WHERE event_id = ?',
    [activity_id, event_name, date, location, faculty_id, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Event updated successfully' });
  });
});

app.delete('/events/:id', (req, res) => {
  db.query('DELETE FROM events WHERE event_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Event deleted successfully' });
  });
});

// ========== FACULTY ==========
app.get('/faculty', (req, res) => {
  db.query('SELECT f.*, d.dept_name FROM faculty f LEFT JOIN departments d ON f.dept_id = d.dept_id',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});

app.post('/faculty', (req, res) => {
  const { faculty_name, dept_id } = req.body;
  db.query('INSERT INTO faculty (faculty_name, dept_id) VALUES (?, ?)',
    [faculty_name, dept_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ faculty_id: result.insertId, faculty_name, dept_id });
  });
});

app.put('/faculty/:id', (req, res) => {
  const { faculty_name, dept_id } = req.body;
  db.query('UPDATE faculty SET faculty_name = ?, dept_id = ? WHERE faculty_id = ?',
    [faculty_name, dept_id, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Faculty updated successfully' });
  });
});

app.delete('/faculty/:id', (req, res) => {
  db.query('DELETE FROM faculty WHERE faculty_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Faculty deleted successfully' });
  });
});

// ========== PARTICIPATION ==========
app.get('/participation', (req, res) => {
  db.query(`SELECT p.*, s.name, e.event_name, a.activity_type
    FROM participation p
    LEFT JOIN students s ON p.student_id = s.student_id
    LEFT JOIN events e ON p.event_id = e.event_id
    LEFT JOIN activities a ON e.activity_id = a.activity_id`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      const transformedResults = results.map(p => ({
        ...p,
        activity_type_display: p.activity_type === 'Co' ? 'Curricular' : p.activity_type === 'Extra' ? 'Extra-Curricular' : p.activity_type
      }));
      res.json(transformedResults);
    });
});

app.get('/participation/filter/:type', (req, res) => {
  const type = req.params.type === 'curricular' ? 'Co' : 'Extra';
  db.query(`SELECT p.*, s.name, e.event_name, a.activity_type
    FROM participation p
    LEFT JOIN students s ON p.student_id = s.student_id
    LEFT JOIN events e ON p.event_id = e.event_id
    LEFT JOIN activities a ON e.activity_id = a.activity_id
    WHERE a.activity_type = ?`,
    [type],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      const transformedResults = results.map(p => ({
        ...p,
        activity_type_display: p.activity_type === 'Co' ? 'Curricular' : 'Extra-Curricular'
      }));
      res.json(transformedResults);
    });
});

app.post('/participation', (req, res) => {
  const { student_id, event_id, role, status } = req.body;
  db.query('INSERT INTO participation (student_id, event_id, role, status) VALUES (?, ?, ?, ?)',
    [student_id, event_id, role, status], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ participation_id: result.insertId, student_id, event_id, role, status });
  });
});

app.put('/participation/:id', (req, res) => {
  const { student_id, event_id, role, status } = req.body;
  db.query('UPDATE participation SET student_id = ?, event_id = ?, role = ?, status = ? WHERE participation_id = ?',
    [student_id, event_id, role, status, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Participation updated successfully' });
  });
});

app.delete('/participation/:id', (req, res) => {
  db.query('DELETE FROM participation WHERE participation_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Participation deleted successfully' });
  });
});

// ========== ACHIEVEMENTS ==========
app.get('/achievements', (req, res) => {
  db.query(`SELECT a.*, s.name as participant_name, e.event_name
    FROM achievements a
    LEFT JOIN participation p ON a.participation_id = p.participation_id
    LEFT JOIN students s ON p.student_id = s.student_id
    LEFT JOIN events e ON p.event_id = e.event_id`, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ========== ACTIVITIES (Curricular/Extra-curricular) ==========
app.get('/activities', (req, res) => {
  db.query('SELECT * FROM activities', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ========== DASHBOARD ==========
app.get('/dashboard', (req, res) => {
  db.query(`SELECT 
    (SELECT COUNT(*) FROM students) as total_students,
    (SELECT COUNT(*) FROM events) as total_events,
    (SELECT COUNT(*) FROM participation) as total_participation,
    (SELECT COUNT(*) FROM faculty) as total_faculty`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results[0]);
    });
});

// Register student (procedure)
app.post('/register', (req, res) => {
  const { student_id, event_id } = req.body;
  db.query('CALL register_student(?, ?)', [student_id, event_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Student registered successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});