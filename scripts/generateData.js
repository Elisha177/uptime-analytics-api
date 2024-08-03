const fs = require('fs');
const faker = require('faker'); // For generating random data
const moment = require('moment');

const generateTimestamp = (start, end) => moment(start + Math.random() * (end - start)).valueOf();
const randomData = () => Math.random() > 0.5 ? '0' : '1';
const randomState = () => Math.random() > 0.5 ? 'connected' : 'disconnected';

const generateAnalyticalData = () => {
  const data = [];
  let lastTimestamp = moment().subtract(2, 'months').valueOf();
  while (lastTimestamp < Date.now()) {
    data.push({
      timestamp: generateTimestamp(lastTimestamp, Date.now()),
      data: randomData()
    });
    lastTimestamp += 60000; // 1 minute interval
  }
  fs.writeFileSync('analytical_data.json', JSON.stringify(data, null, 2));
};

const generateUptimeData = () => {
  const data = [];
  let lastTimestamp = moment().subtract(2, 'months').valueOf();
  let currentState = null;
  while (lastTimestamp < Date.now()) {
    const newState = randomState();
    if (newState !== currentState) {
      data.push({
        timestamp: lastTimestamp,
        state: newState
      });
      currentState = newState;
      lastTimestamp += Math.floor(Math.random() * (3600000)); // Random time between 0-1 hour
    }
  }
  fs.writeFileSync('uptime_data.json', JSON.stringify(data, null, 2));
};

// Run data generation
generateAnalyticalData();
generateUptimeData();
