const express = require("express");
const multer = require("multer");
const db = require("../db");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/schoolEvents/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Create Event API
router.post("/", upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO school_event (title, description, image) VALUES (?, ?, ?)";
  db.query(sql, [title, description, image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({ message: "Event created successfully", id: result.insertId });
  });
});

// Get All Events API
router.get("/", (req, res) => {
  db.query("SELECT * FROM school_event ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Update Event API
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;

  // If image is provided, update it along with title and description
  let sql, values;

  if (image) {
    sql =
      "UPDATE school_event SET title = ?, description = ?, image = ? WHERE id = ?";
    values = [title, description, image, id];
  } else {
    sql = "UPDATE school_event SET title = ?, description = ? WHERE id = ?";
    values = [title, description, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Event updated successfully" });
  });
});

// Delete Event
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM school_event WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Event deleted" });
  });
});

module.exports = router;
