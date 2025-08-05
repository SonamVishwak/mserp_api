const express = require("express");
const multer = require("multer");
const db = require("../db");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Ensure upload directory exists
const dir = path.join(__dirname, "../uploads/web/about");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, name);
  },
});
const upload = multer({ storage });

// ✅ GET
router.get("/fetch", (req, res) => {
  db.query("SELECT * FROM about_us LIMIT 1", (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) res.send(result[0]);
    else res.status(404).send();
  });
});

// ✅ INSERT
router.post(
  "/add",
  upload.fields([
    { name: "about_image" },
    { name: "mission_image" },
    { name: "vision_image" },
  ]),
  (req, res) => {
    const { heading, about_desc, mission_desc, vision_desc } = req.body;
    const aboutImage = req.files?.about_image?.[0]?.filename || "";
    const missionImage = req.files?.mission_image?.[0]?.filename || "";
    const visionImage = req.files?.vision_image?.[0]?.filename || "";

    const query = `INSERT INTO about_us (heading, about_desc, mission_desc, vision_desc, about_image, mission_image, vision_image)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [ 
      heading,
      about_desc,
      mission_desc,
      vision_desc,
      aboutImage,
      missionImage,
      visionImage,
    ];
    db.query(query, values, (err) => {
      if (err) return res.status(500).send(err);
      res.send({ success: true, message: "Inserted successfully" });
    });
  }
);

// ✅ UPDATE
router.put(
  "/update",
  upload.fields([
    { name: "about_image" },
    { name: "mission_image" },
    { name: "vision_image" },
  ]),
  (req, res) => {
    const { id, heading, about_desc, mission_desc, vision_desc } = req.body;

    if (!id) return res.status(400).json({ error: "ID is required" });

    const updates = [];
    const values = [];

    if (heading) updates.push("heading = ?"), values.push(heading);
    if (about_desc) updates.push("about_desc = ?"), values.push(about_desc);
    if (mission_desc)
      updates.push("mission_desc = ?"), values.push(mission_desc);
    if (vision_desc) updates.push("vision_desc = ?"), values.push(vision_desc);

    if (req.files?.about_image?.[0])
      updates.push("about_image = ?"),
        values.push(req.files.about_image[0].filename);
    if (req.files?.mission_image?.[0])
      updates.push("mission_image = ?"),
        values.push(req.files.mission_image[0].filename);
    if (req.files?.vision_image?.[0])
      updates.push("vision_image = ?"),
        values.push(req.files.vision_image[0].filename);

    if (updates.length === 0)
      return res.status(400).json({ error: "Nothing to update" });

    values.push(id); // WHERE clause

    const query = `UPDATE about_us SET ${updates.join(", ")} WHERE id = ?`;

    db.query(query, values, (err) => {
      if (err) return res.status(500).json({ error: "Update failed" });
      res.json({ success: true, message: "Updated successfully" });
    });
  }
);

module.exports = router;
