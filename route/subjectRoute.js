const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../db");

// Image Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/subject/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

/** Get all subjects */
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      subjects.id, 
      mediums.name AS medium, 
      subjects.name, 
      subjects.type, 
      subjects.code, 
      subjects.background, 
      subjects.image_url, 
      subjects.created_at 
    FROM 
      subjects 
    JOIN 
      mediums 
    ON 
      subjects.medium = mediums.id 
    ORDER BY 
      subjects.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching subjects", details: err });
    }
    res.json(results);
  });
});


/** Get subject by ID */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM subjects WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching subject", details: err });
    if (results.length === 0) return res.status(404).json({ error: "Subject not found" });
    res.json(results[0]);
  });
});

/** Insert subject */ 
router.post("/", upload.single("image"), (req, res) => {
  const { medium, name, type, code, background } = req.body;
  const image_url = req.file ? `/uploads/subject/${req.file.filename}` : null;

  db.query(
    "INSERT INTO subjects (medium, name, type, code, background, image_url) VALUES (?, ?, ?, ?, ?, ?)",
    [medium, name, type, code, background, image_url],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error inserting subject", details: err });
      res.json({ id: result.insertId, message: "Subject added successfully" });
    }
  );
});

/** Update subject */
router.put("/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { medium, name, type, code, background } = req.body;
  const image_url = req.file ? `/uploads/subject/${req.file.filename}` : null;

  const updateQuery = image_url
    ? "UPDATE subjects SET medium=?, name=?, type=?, code=?, background=?, image_url=? WHERE id=?"
    : "UPDATE subjects SET medium=?, name=?, type=?, code=?, background=? WHERE id=?";

  const values = image_url
    ? [medium, name, type, code, background, image_url, id]
    : [medium, name, type, code, background, id];

  db.query(updateQuery, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Error updating subject", details: err });
    res.json({ message: "Subject updated successfully" });
  });
});

/** Delete subject */
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM subjects WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error deleting subject", details: err });
    res.json({ message: "Subject deleted successfully" });
  });
});

module.exports = router;
