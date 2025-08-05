// routes/appRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db");
// 📌 Get all semesters
router.get("/", (req, res) => {
  db.query("SELECT * FROM semesters", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// 📌 Add new semester
router.post("/", (req, res) => {
  const { name, startMonth, endMonth, status } = req.body;
  const sql =
    "INSERT INTO semesters (name, start_month, end_month, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, startMonth, endMonth, status], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, ...req.body });
  });
});

// 📌 Update semester
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, startMonth, endMonth, status } = req.body;
  const sql =
    "UPDATE semesters SET name = ?, start_month = ?, end_month = ?, status = ? WHERE id = ?";
  db.query(sql, [name, startMonth, endMonth, status, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

// 📌 Delete semester
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM semesters WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

module.exports = router