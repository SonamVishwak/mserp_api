const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Create Medium
router.post("/", (req, res) => {
  const { name } = req.body;
  const sql = "INSERT INTO mediums (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error("Error inserting medium:", err);
      return res.status(500).json({ error: "Insert failed" });
    }
    res.json({ message: "Medium created", id: result.insertId });
  });
});

// ✅ Get All Mediums
router.get("/", (req, res) => {
  db.query("SELECT * FROM mediums ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch" });
    res.json(results);
  });
});

// ✅ Update Medium
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body; 
  const sql = "UPDATE mediums SET name = ? WHERE id = ?";
  db.query(sql, [name, id], (err) => {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "Medium updated" });
  });
});

// ✅ Delete Medium
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM mediums WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ message: "Medium deleted" });
  });
});

module.exports = router;
