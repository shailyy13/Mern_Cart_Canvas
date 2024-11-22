import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Importing the updated pastel CSS file

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        categoryId: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch categories and products on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('Failed to load categories.');
            }

            try {
                const productsResponse = await axios.get('http://localhost:5000/api/products');
                setProducts(productsResponse.data);
                setFilteredProducts(productsResponse.data); // Initially show all products
            } catch (error) {
                console.error('Error fetching products:', error);
                setErrorMessage('Failed to load products.');
            }
        };

        fetchData();
    }, []);

    // Handle category selection to filter products
    const handleCategorySelect = (categoryId) => {
        setNewProduct(prevState => ({ ...prevState, categoryId })); // Update only the categoryId
        if (categoryId) {
            setFilteredProducts(products.filter(product => product.category._id === categoryId));
        } else {
            setFilteredProducts(products); // Show all products if no category is selected
        }
    };

    // Handle input changes for category and product forms
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCategoryInputChange = (e) => {
        setNewCategory(e.target.value);
    };

    // Submit new category
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        if (!newCategory) {
            alert('Category name is required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/add/category', { name: newCategory });
            alert('Category added successfully!');
            setCategories([...categories, response.data.category]); // Update categories list
            setNewCategory(''); // Reset category form
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    // Submit new product
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const { name, price, categoryId } = newProduct;
        if (!name || !price || !categoryId) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/add/product', { name, price, categoryId });
            alert('Product added successfully!');
            setProducts([...products, response.data.product]); // Update products list
            setFilteredProducts([...products, response.data.product]); // Update filtered products list
            setNewProduct({ name: '', price: '', categoryId: '' }); // Reset product form
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="homepage-container">
            <h1>Cart Canvas</h1>
            <h3>Art supplies and materials</h3>
            
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

            <div className="section">
                <h2>Add Category</h2>
                <form onSubmit={handleCategorySubmit} className="form">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={handleCategoryInputChange}
                        placeholder="Enter category name"
                        required
                        className="input-field"
                    />
                    <button type="submit" className="button">Add Category</button>
                </form>

                <h3>Available Categories</h3>
                {categories.length > 0 ? (
                    categories.map(category => (
                        <button
                            key={category._id}
                            onClick={() => handleCategorySelect(category._id)}
                            className="category-button"
                        >
                            {category.name}
                        </button>
                    ))
                ) : (
                    <p>Loading categories...</p>
                )}
            </div>

            <h2>Products</h2>
            <div>
                <h3>Filter by Category</h3>
                <button onClick={() => handleCategorySelect('')} className="category-button">All Products</button>
                {categories.map(category => (
                    <button
                        key={category._id}
                        onClick={() => handleCategorySelect(category._id)}
                        className="category-button"
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product._id} className="product-card">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            
                        </div>
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div>

            <h2>Add New Product</h2>
            <form onSubmit={handleProductSubmit} className="form">
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <label>Category</label>
                    <select
                        name="categoryId"
                        value={newProduct.categoryId}
                        onChange={handleInputChange}
                        required
                        className="select-field"
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="button">Add Product</button>
            </form>
        </div>
    );
};

export default HomePage;
