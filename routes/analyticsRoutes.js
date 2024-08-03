const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

router.get('/', async (req, res) => {
  try {
    const data = await Analytics.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfYear: { $toDate: "$timestamp" } },
            hour: { $hour: { $toDate: "$timestamp" } },
            date: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$timestamp" } } }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.date": 1, "_id.hour": 1 }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
