const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a new category
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const sql = "INSERT INTO student_category (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, name });
  });
});

// Get all categories
router.get("/", (req, res) => {
  db.query("SELECT * FROM student_category ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Delete category by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM student_category WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Category deleted" });
  });
});

// Update category
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });

  db.query(
    "UPDATE student_category SET name = ? WHERE id = ?",
    [name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Category updated" });
    }
  );
});

module.exports = router;
