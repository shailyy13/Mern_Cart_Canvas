const Product = require('../model/Product');

// Controller to add a new product
const addProduct = async (req, res) => {
    try {
        const { name, price, categoryId } = req.body;

        if (!name || !price || !categoryId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newProduct = new Product({
            name,
            price,
            category: categoryId,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ 
            message: 'Product added successfully!', 
            product: savedProduct 
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Controller to get all products with category populated
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name'); // Populate category name
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { addProduct, getProducts };
