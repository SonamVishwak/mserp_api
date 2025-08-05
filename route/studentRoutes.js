const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs"); // For hashing passwords
const db = require("../db");

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/web/student_reg");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/add",
  upload.fields([
    { name: "image" },
    { name: "father_image" },
    { name: "mother_image" },
    { name: "guardian_image" },
  ]),
  async (req, res) => {
    try {
      const data = req.body;
      const files = req.files;

      // Validate password
      if (!data.password) {
        return res.status(400).json({ error: "Password is required" });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const query = `
        INSERT INTO students (
          first_name, last_name, mobile_number, gender, dob, class, category, gr_number, admission_date, image, 
          current_address, permanent_address,
          father_email, father_mobile, father_first_name, father_last_name, father_dob, father_occupation, father_image,
          mother_email, mother_mobile, mother_first_name, mother_last_name, mother_dob, mother_occupation, mother_image,
          guardian_email, guardian_mobile, guardian_first_name, guardian_last_name, guardian_dob, guardian_gender, guardian_occupation, guardian_image,
          stream, medium, section, email, password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.first_name,
        data.last_name,
        data.mobile_number,
        data.gender,
        data.dob,
        data.class,
        data.category,
        data.gr_number,
        data.admission_date,
        files?.image?.[0]?.filename || null,

        data.current_address,
        data.permanent_address,

        data.father_email,
        data.father_mobile,
        data.father_first_name,
        data.father_last_name,
        data.father_dob,
        data.father_occupation,
        files?.father_image?.[0]?.filename || null,

        data.mother_email,
        data.mother_mobile,
        data.mother_first_name,
        data.mother_last_name,
        data.mother_dob,
        data.mother_occupation,
        files?.mother_image?.[0]?.filename || null,

        data.guardian_email,
        data.guardian_mobile,
        data.guardian_first_name,
        data.guardian_last_name,
        data.guardian_dob,
        data.guardian_gender,
        data.guardian_occupation,
        files?.guardian_image?.[0]?.filename || null,

        data.stream,
        data.medium,
        data.section,
        data.email,
        hashedPassword,
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("DB Insert Error:", err);
          return res.status(500).json({
            error: "Error inserting student data",
            details: err.message,
          });
        }

        res.status(201).json({
          message: "Student registered successfully",
          student_id: result.insertId,
        });
      });
    } catch (error) {
      console.error("API Error:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
);
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM students WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("DB Get Error:", err);
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(result[0]);
  });
});

router.get("/", (req, res) => {
  const query = `
    SELECT 
      students.id,
      students.first_name,
      students.last_name,
      students.mobile_number,
      students.gender,
      DATE_FORMAT(students.dob, '%Y-%m-%d') AS dob,
      students.class,
      students.category,
      students.gr_number,
      DATE_FORMAT(students.admission_date, '%Y-%m-%d') AS admission_date,
      students.image,
      students.current_address,
      students.permanent_address,
      students.father_email,
      students.father_mobile,
      students.father_first_name,
      students.father_last_name,
      DATE_FORMAT(students.father_dob, '%Y-%m-%d') AS father_dob,
      students.father_occupation,
      students.father_image,
      students.mother_email,
      students.mother_mobile,
      students.mother_first_name,
      students.mother_last_name,
      DATE_FORMAT(students.mother_dob, '%Y-%m-%d') AS mother_dob,
      students.mother_occupation,
      students.mother_image,
      students.guardian_email,
      students.guardian_mobile,
      students.guardian_first_name,
      students.guardian_last_name,
      DATE_FORMAT(students.guardian_dob, '%Y-%m-%d') AS guardian_dob,
      students.guardian_gender,
      students.guardian_occupation,
      students.guardian_image,
      students.created_at,
      mediums.name AS medium_name,
      stream.name AS stream_name,
      students.section,
      students.email,
      students.password
    FROM students
    LEFT JOIN mediums ON students.medium = mediums.id
    LEFT JOIN stream ON students.stream = stream.id
    ORDER BY students.id DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(200).json(results);
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM students WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Delete Error:", err);
      return res
        .status(500)
        .json({ error: "Database delete error", details: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  });
});
router.put(
  "/update/:id",
  upload.fields([
    { name: "image" },
    { name: "father_image" },
    { name: "mother_image" },
    { name: "guardian_image" },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const files = req.files;

      // Optional: Hash password if provided
      let hashedPassword = null;
      if (data.password) {
        hashedPassword = await bcrypt.hash(data.password, 10);
      }

      const query = `
        UPDATE students SET
          first_name=?, last_name=?, mobile_number=?, gender=?, dob=?, class=?,
          category=?, gr_number=?, admission_date=?, image=?, current_address=?, permanent_address=?,
          father_email=?, father_mobile=?, father_first_name=?, father_last_name=?, father_dob=?, father_occupation=?, father_image=?,
          mother_email=?, mother_mobile=?, mother_first_name=?, mother_last_name=?, mother_dob=?, mother_occupation=?, mother_image=?,
          guardian_email=?, guardian_mobile=?, guardian_first_name=?, guardian_last_name=?, guardian_dob=?, guardian_gender=?, guardian_occupation=?, guardian_image=?,
          stream=?, medium=?, section=?, email=?
          ${hashedPassword ? ", password=?" : ""}
        WHERE id=?
      `;

      const values = [
        data.first_name,
        data.last_name,
        data.mobile_number,
        data.gender,
        data.dob,
        data.class,
        data.category,
        data.gr_number,
        data.admission_date,
        files?.image?.[0]?.filename || data.old_image || null,

        data.current_address,
        data.permanent_address,

        data.father_email,
        data.father_mobile,
        data.father_first_name,
        data.father_last_name,
        data.father_dob,
        data.father_occupation,
        files?.father_image?.[0]?.filename || data.old_father_image || null,

        data.mother_email,
        data.mother_mobile,
        data.mother_first_name,
        data.mother_last_name,
        data.mother_dob,
        data.mother_occupation,
        files?.mother_image?.[0]?.filename || data.old_mother_image || null,

        data.guardian_email,
        data.guardian_mobile,
        data.guardian_first_name,
        data.guardian_last_name,
        data.guardian_dob,
        data.guardian_gender,
        data.guardian_occupation,
        files?.guardian_image?.[0]?.filename || data.old_guardian_image || null,

        data.stream,
        data.medium,
        data.section,
        data.email,
      ];

      if (hashedPassword) values.push(hashedPassword);
      values.push(id);

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Update Error:", err);
          return res
            .status(500)
            .json({ error: "Database update error", details: err.message });
        }

        res.status(200).json({ message: "Student updated successfully" });
      });
    } catch (error) {
      console.error("Update API Error:", error);
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
);

module.exports = router;
