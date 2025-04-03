const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Blog = require('./models/Blog');
const User = require('./models/User');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: true, // Allow all origins temporarily for debugging
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Add a pre-flight OPTIONS handler
app.options('*', cors(corsOptions));

// Root route handler
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Bloganza API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      blogs: '/api/blogs'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Catch-all route handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    availableRoutes: {
      root: '/',
      auth: '/api/auth',
      blogs: '/api/blogs'
    }
  });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 