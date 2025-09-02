import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products/';

// Get all products
const getProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'all', config);
  return response.data;
};

// Create new product
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'add', productData, config);
  return response.data;
};

// Update product
const updateProduct = async (id, productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `update/${id}`, productData, config);
  return response.data;
};

// Delete product
const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + `delete/${id}`, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;