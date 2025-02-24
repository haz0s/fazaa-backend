// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();

// Health-check endpoint
router.get('/health', (req, res) => {
res.send('Server is up and running.');
});

module.exports = router;
