require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const MONGO_URI = 'mongodb+srv://elishaebe177:RrDNn3ZFnTvVvVqW@cluster0.b98ltqp.mongodb.net/uptime-analytics-api?retryWrites=true&w=majority';
console.log('MONGO_URI:', MONGO_URI);  // Hardcoded for testing

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const uptimeRoutes = require('./routes/uptimeRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');

// Use routes
app.use('/api/uptime', authMiddleware, uptimeRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
