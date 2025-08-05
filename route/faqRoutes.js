const express = require("express");
const router = express.Router();
const db = require("../db"); // your DB connection

// Create FAQ
router.post("/add", async (req, res) => {
  const { question, answer } = req.body;
  try {
    await db.query("INSERT INTO faqs (question, answer) VALUES (?, ?)", [
      question,
      answer,
    ]);
    res.status(201).json({ message: "FAQ created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create FAQ", details: err });
  }
});

// Fetch all FAQs
router.get("/", async (req, res) => {
  try {
    db.query("SELECT * FROM faqs ORDER BY created_at DESC", (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images." });
  }
});

// Fetch FAQ by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM faqs WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "FAQ not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch FAQ", details: err });
  }
});

// Update FAQ
router.put("/:id", async (req, res) => {
  const { question, answer } = req.body;
  try {
    await db.query("UPDATE faqs SET question = ?, answer = ? WHERE id = ?", [
      question,
      answer,
      req.params.id,
    ]);
    res.json({ message: "FAQ updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update FAQ", details: err });
  }
});

// Delete FAQ
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM faqs WHERE id = ?", [req.params.id]);
    res.json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete FAQ", details: err });
  }
});

module.exports = router;
