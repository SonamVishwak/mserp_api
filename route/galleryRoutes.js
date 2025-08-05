// routes/galleryRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db"); // your db connection file
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/web/gallery"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "")}`),
});

const upload = multer({ storage });

// Upload images
router.post("/upload", upload.array("images"), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0)
      return res.status(400).json({ message: "No images uploaded." });

    const values = files.map((file) => [file.filename]);
    await db.query("INSERT INTO gallery (image_url) VALUES ?", [values]);

    res.status(201).json({ message: "Images uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// Get all images
router.get("/", async (req, res) => {
  try {
    db.query("SELECT * FROM gallery ORDER BY id DESC", (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images." });
  }
});

// Delete image
router.delete("/:id", async (req, res) => {
  const query = "DELETE FROM gallery WHERE id = ?";
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});

module.exports = router;
