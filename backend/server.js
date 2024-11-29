require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const goalsRoutes = require('./routes/goals');

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use(express.json());
app.use('/api/goals', goalsRoutes);

// Connect to DB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.log(error);
  });

// Export the app for serverless
module.exports = app;