const express = require("express");
const router = express.Router();
const db = require("../db"); // your mysql2 connection

// Fetch all shifts
router.get("/", (req, res) => {
  db.query(
    "SELECT id, name, start_time AS startTime, end_time AS endTime, status FROM shifts",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      const data = results.map((row, idx) => ({
        key: row.id,
        name: row.name,
        startTime: row.startTime,
        endTime: row.endTime,
        status: row.status,
      }));
      res.json(data);
    }
  );
});

// Create shift
router.post("/", (req, res) => {
  const { name, startTime, endTime } = req.body;
  db.query(
    "INSERT INTO shifts (name, start_time, end_time) VALUES (?, ?, ?)",
    [name, startTime, endTime],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId });
    }
  );
});

// Update
router.put("/:id", (req, res) => {
  const { name, startTime, endTime, status } = req.body;
  db.query(
    "UPDATE shifts SET name=?, start_time=?, end_time=?, status=? WHERE id=?",
    [name, startTime, endTime, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Delete
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM shifts WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: true });
  });
});

module.exports = router;
