const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controller/ProductController');

// Route to add a product
router.post('/add/product', addProduct);

// Route to get all products
router.get('/products', getProducts);

module.exports = router;
