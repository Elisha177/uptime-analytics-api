const express = require('express');
const router = express.Router();
const Uptime = require('../models/Uptime');

router.get('/', async (req, res) => {
  try {
    const data = await Uptime.find().sort('timestamp');
    const formattedData = formatUptimeData(data);
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const formatUptimeData = (data) => {
  let formatted = [];
  let lastEntry = null;

  data.forEach(entry => {
    if (lastEntry && lastEntry.state === entry.state) {
      lastEntry.duration = entry.timestamp - lastEntry.timestamp;
    } else {
      if (lastEntry) {
        formatted.push(lastEntry);
      }
      lastEntry = {
        state: entry.state,
        timestamp: entry.timestamp,
        duration: 0
      };
    }
  });

  if (lastEntry) {
    formatted.push(lastEntry);
  }

  return formatted;
};

module.exports = router;
