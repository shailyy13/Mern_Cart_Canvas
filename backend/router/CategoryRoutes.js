const express = require('express');
const router = express.Router();

// Import controllers
const { addCategory, getCategories } = require('../controller/CategoryController');
const { addProduct, getProducts } = require('../controller/ProductController');

// Category Routes
router.get('/categories', getCategories);
router.post('/add/category', addCategory);

// Product Routes
router.get('/products', getProducts);
router.post('/add/product', addProduct);

module.exports = router;  // Ensure this is exporting the router correctly
