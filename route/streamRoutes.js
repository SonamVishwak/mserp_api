const express = require("express");
const router = express.Router();
const db = require("../db");

// GET with pagination and search
router.get("/", (req, res) => {
  db.query("SELECT id, name FROM stream", (err, results) => {
    if (err)
      return res.status(500).json({ error: "Database error", details: err });

    const data = results.map((row, index) => ({
      key: row.id,
      no: index + 1,
      name: row.name,
    }));

    res.json(data);
  });
});

// POST - Create
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    await db.query("INSERT INTO stream (name) VALUES (?)", [name]);
    res.json({ message: "Stream created" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create stream", details: err.message });
  }
});

// PUT - Update
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    await db.query("UPDATE stream SET name = ? WHERE id = ?", [
      name,
      req.params.id,
    ]);
    res.json({ message: "Stream updated" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update stream", details: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM stream WHERE id = ?", [req.params.id]);
    res.json({ message: "Stream deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete stream", details: err.message });
  }
});

module.exports = router;
