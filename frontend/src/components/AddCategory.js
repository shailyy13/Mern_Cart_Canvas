// AddCategory.js
import './AddCategory.css'
import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/add/category', { name });
            setMessage(response.data.message);
            setName('');
        } catch (error) {
            console.error('Error adding category:', error.response?.data || error.message);
            setMessage('Failed to add category.');
        }
    };

    return (
        <div>
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    required
                />
                <button type="submit">Add Category</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddCategory;
