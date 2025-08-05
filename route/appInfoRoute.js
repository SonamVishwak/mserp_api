// routes/appRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // Your DB config connection

router.get("/", async (req, res) => {
  try {
    db.query("SELECT * FROM apps ORDER BY created_at DESC", (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images." });
  }
});
// Get app by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM apps WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch app", details: err.message });
  }
});

// Add new app
router.post("/", async (req, res) => {
  const { heading, title, link } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO apps (heading, title, link) VALUES (?, ?, ?)",
      [heading, title, link]
    );

    // Safely handle insertId
    const insertId = result.insertId || result[0]?.insertId;

    res.json({ message: "App created", id: insertId });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add app",
      details: err.message,
    });
  }
});

// Update app
router.put("/:id", async (req, res) => {
  const { heading, title, link } = req.body;
  try {
    await db.query(
      "UPDATE apps SET heading = ?, title = ?, link = ? WHERE id = ?",
      [heading, title, link, req.params.id]
    );
    res.json({ message: "App updated" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update app", details: err.message });
  }
});

// Delete app
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM apps WHERE id = ?", [req.params.id]);
    res.json({ message: "App deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete app", details: err.message });
  }
});

module.exports = router;
