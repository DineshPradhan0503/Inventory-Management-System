import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories/';

// Get all categories
const getCategories = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Add category
const addCategory = async (categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, categoryData, config);
    return response.data;
};

// Update category
const updateCategory = async (id, categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + id, categoryData, config);
    return response.data;
};

// Delete category
const deleteCategory = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};


const categoryService = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
};

export default categoryService;
