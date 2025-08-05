const express = require("express");
const router = express.Router();
const db = require("../db");
router.get("/", (req, res) => {
  db.query("SELECT id, name FROM sections", (err, results) => {
    if (err) return res.status(500).send(err);
    const data = results.map((row, index) => ({
      key: row.id,
      no: index + 1,
      name: row.name,
    }));
    res.json(data);
  });
});

// Create new section
router.post("/", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO sections (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true, id: result.insertId });
  });
});

// Delete section
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM sections WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

// Update section
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query(
    "UPDATE sections SET name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    }
  );
});
module.exports = router