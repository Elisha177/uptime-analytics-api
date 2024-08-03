const mongoose = require('mongoose');

const uptimeSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  state: { type: String, enum: ['connected', 'disconnected'], required: true }
});

module.exports = mongoose.model('Uptime', uptimeSchema);
