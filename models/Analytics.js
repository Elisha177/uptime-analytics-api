const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  data: { type: String, enum: ['0', '1'], required: true }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
