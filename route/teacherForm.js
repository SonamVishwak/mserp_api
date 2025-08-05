const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../db");
const fs = require("fs");
const bcrypt = require("bcrypt");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "uploads/teacher/",
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

// CREATE: Insert new teacher
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      mobile,
      dob,
      email,
      qualification,
      currentAddress,
      permanentAddress,
      salary,
      password,
    } = req.body;

    const image_url = req.file ? `/uploads/teacher/${req.file.filename}` : null;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO teachers 
      (first_name, last_name, gender, mobile, dob, email, qualification, current_address, permanent_address, image_url, salary, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        firstName,
        lastName,
        gender,
        mobile,
        dob,
        email,
        qualification,
        currentAddress,
        permanentAddress,
        image_url,
        salary,
        hashedPassword,
      ],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Teacher added successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// READ: Fetch all teachers (excluding password for security)
router.get("/", (req, res) => {
  const sql =
    "SELECT id, first_name, last_name, gender, mobile, dob, email, qualification, current_address, permanent_address, image_url, salary FROM teachers ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

// UPDATE: Update teacher by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  const teacherId = req.params.id;
  const {
    first_name,
    last_name,
    gender,
    mobile,
    dob,
    email,
    qualification,
    current_address,
    permanent_address,
    salary,
    password,
  } = req.body;

  let image_url = null;
  if (req.file) {
    image_url = `/uploads/teacher/${req.file.filename}`;
  }

  const getOldImageQuery = "SELECT image_url FROM teachers WHERE id = ?";
  db.query(getOldImageQuery, [teacherId], async (err, data) => {
    if (err) return res.status(500).json({ error: err });

    const oldImage = data[0]?.image_url;
    if (image_url && oldImage) {
      const imagePath = path.join(__dirname, "..", oldImage);
      fs.unlink(imagePath, (unlinkErr) => {});
    }

    // Hash new password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const sql = `
      UPDATE teachers SET 
        first_name = ?, last_name = ?, gender = ?, mobile = ?, dob = ?, email = ?, 
        qualification = ?, current_address = ?, permanent_address = ?, salary = ?,
        image_url = COALESCE(?, image_url),
        password = COALESCE(?, password)
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        first_name,
        last_name,
        gender,
        mobile,
        dob,
        email,
        qualification,
        current_address,
        permanent_address,
        salary,
        image_url,
        hashedPassword,
        teacherId,
      ],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Teacher updated successfully" });
      }
    );
  });
});

// DELETE: Delete teacher by ID
router.delete("/:id", (req, res) => {
  const teacherId = req.params.id;

  const getImageQuery = "SELECT image_url FROM teachers WHERE id = ?";
  db.query(getImageQuery, [teacherId], (err, data) => {
    if (err) return res.status(500).json({ error: err });

    const imageUrl = data[0]?.image_url;
    if (imageUrl) {
      const imagePath = path.join(__dirname, "..", imageUrl);
      fs.unlink(imagePath, (unlinkErr) => {});
    }

    const deleteQuery = "DELETE FROM teachers WHERE id = ?";
    db.query(deleteQuery, [teacherId], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Teacher deleted successfully" });
    });
  });
});

module.exports = router;
