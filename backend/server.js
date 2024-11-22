const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const categoryRoutes = require('./router/CategoryRoutes');
const productRoutes = require('./router/ProductRoutes');

// Use routes
app.use('/api', categoryRoutes); // Route for categories
app.use('/api', productRoutes);  // Route for products

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Projected')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Database connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
