// routes/events.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE EVENT
router.post('/add', (req, res) => {
  const { title, heading, date } = req.body;
  const query = 'INSERT INTO events (title, heading, date) VALUES (?, ?, ?)';
  db.query(query, [title, heading, date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, message: 'Event added', id: result.insertId });
  });
});

// GET ALL EVENTS
router.get('/all', (req, res) => {
  db.query('SELECT * FROM events ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// GET SINGLE EVENT BY ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM events WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Event not found' });
    res.json(result[0]);
  });
});

// UPDATE EVENT
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, heading, date } = req.body;
  const query = 'UPDATE events SET title = ?, heading = ?, date = ? WHERE id = ?';
  db.query(query, [title, heading, date, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, message: 'Event updated' });
  });
});

// DELETE EVENT
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM events WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, message: 'Event deleted' });
  });
});

module.exports = router;
 