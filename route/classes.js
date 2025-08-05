const express = require("express");
const router = express.Router();
const db = require("../db");
// import express, router, db...
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      c.id,
      c.name,
      c.educational_program,
      c.medium_id,
      m.name AS medium_name,
      c.shift_id,
      s.name AS shift_name,
      c.stream_id,
      st.name AS stream_name,
      c.section_id,
      sec.name AS section_name,
      c.created_at
    FROM classes c
    LEFT JOIN mediums m ON c.medium_id = m.id
    LEFT JOIN shifts s ON c.shift_id = s.id
    LEFT JOIN stream st ON c.stream_id = st.id
    LEFT JOIN sections sec ON c.section_id = sec.id
    ORDER BY c.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const data = results.map((row, index) => ({
      key: row.id,
      srNo: index + 1,
      name: row.name,
      educational_program: row.educational_program,
      medium_id: row.medium_id,
      medium: row.medium_name,
      shift_id: row.shift_id,
      shift: row.shift_name,
      stream_id: row.stream_id,
      stream: row.stream_name,
      section_id: row.section_id,
      section: row.section_name,
      createdAt: row.created_at,
    }));

    res.json(data);
  });
});

router.post("/", (req, res) => {
  let {
    name,
    educational_program,
    medium_id,
    section_id,
    shift_id,
    stream_id,
  } = req.body;

  const sql =
    "INSERT INTO classes (name, educational_program, medium_id, section_id, shift_id, stream_id) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [name, educational_program, medium_id, section_id, shift_id, stream_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    educational_program,
    medium_id,
    section_id,
    shift_id,
    stream_id,
  } = req.body;
  const sql =
    "UPDATE classes SET name=?, educational_program=?, medium_id=?, section_id=?, shift_id=?, stream_id=? WHERE id=?";
  db.query(
    sql,
    [name, educational_program, medium_id, section_id, shift_id, stream_id, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM classes WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

module.exports = router;
