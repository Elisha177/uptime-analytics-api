const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

router.post('/login', (req, res) => {
  // Dummy authentication
  const { username, password } = req.body;
  if (username === 'test' && password === 'password') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/logout', (req, res) => {
  // Handle token revocation if necessary
  res.status(200).json({ message: 'Logged out' });
});

module.exports = router;
