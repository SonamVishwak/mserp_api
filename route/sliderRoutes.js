const express = require("express");
const multer = require("multer");
const db = require("./../db");
const path = require("path");
const router = express.Router();

// Multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/web/slider",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Insert
router.post("/add", upload.single("image"), (req, res) => {
  const { heading, title, subtitle } = req.body;
  const image = req.file ? req.file.filename : null;
  const query =
    "INSERT INTO sliders (heading, title, subtitle, image) VALUES (?, ?, ?, ?)";
  db.query(query, [heading, title, subtitle, image], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true, id: result.insertId });
  });
});

// Fetch all
router.get("/all", (req, res) => {
  db.query("SELECT * FROM sliders ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Delete
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM sliders WHERE id = ?";
  db.query(query, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});

// Update
router.put("/:id", upload.single("image"), (req, res) => {
  const { heading, title, subtitle } = req.body;
  const image = req.file ? req.file.filename : null;
  const id = req.params.id;

  const fields = ["heading = ?", "title = ?", "subtitle = ?"];
  const values = [heading, title, subtitle];

  if (image) {
    fields.push("image = ?");
    values.push(image);
  }

  values.push(id);

  const query = `UPDATE sliders SET ${fields.join(", ")} WHERE id = ?`;
  db.query(query, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});


module.exports = router;
