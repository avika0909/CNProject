const express = require("express");
const router = express.Router();
const db = require("../db");

// SIGNUP
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) return res.status(500).send("Error during signup");
    res.status(200).send("User registered successfully");
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).send("Login error");
    if (result.length > 0) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

module.exports = router;
