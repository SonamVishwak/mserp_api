const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL connection

// Create Holiday
router.post("/", (req, res) => {
  const { title, description, date } = req.body;
  const sql =
    "INSERT INTO school_holidays (title, description, date) VALUES (?, ?, ?)";
  db.query(sql, [title, description, date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Holiday created", id: result.insertId });
  });
});

// Get All Holidays
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM school_holidays ORDER BY date DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// Delete Holiday
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM school_holidays WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Holiday deleted" });
  });
});

// Update Holiday
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;
  const sql =
    "UPDATE school_holidays SET title = ?, description = ?, date = ? WHERE id = ?";
  db.query(sql, [title, description, date, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Holiday updated" });
  });
});

module.exports = router;
