const express = require('express');
const router = express.Router();

// Add your API routes here
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router; 