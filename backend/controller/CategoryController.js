const Category = require('../model/category');  // Import the Category model

// Controller to add a new category
const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Category name is required.' });

        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ message: 'Category added successfully!', category: newCategory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding category' });
    }
};

// Controller to get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

module.exports = { addCategory, getCategories };
