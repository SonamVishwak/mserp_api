// routes/appRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../db");
router.get("/", (req, res) => {
  db.query("SELECT * FROM leave_settings", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// ADD new leave setting
router.post("/", (req, res) => {
  const { sessionYear, month, totalLeaves, leaveDates } = req.body;

  const sql =
    "INSERT INTO leave_settings (session_year, month, total_leaves, leave_dates) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [sessionYear, month, totalLeaves, JSON.stringify(leaveDates)],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Leave added" });
    }
  );
});

// UPDATE leave setting
router.put("/:id", (req, res) => {
  const { sessionYear, month, totalLeaves, leaveDates } = req.body;
  const id = req.params.id;

  const sql =
    "UPDATE leave_settings SET session_year=?, month=?, total_leaves=?, leave_dates=? WHERE id=?";
  db.query(
    sql,
    [sessionYear, month, totalLeaves, JSON.stringify(leaveDates), id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Leave updated" });
    }
  );
});

// DELETE leave setting
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM leave_settings WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Leave deleted" });
    }
  );
});
module.exports = router;
