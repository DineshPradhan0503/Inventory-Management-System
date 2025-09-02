import axios from 'axios';

const API_URL = 'http://localhost:8080/api/sales/';

// Get all sales
const getSales = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'all', config);
  return response.data;
};

// Create new sale
const createSale = async (saleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'record', saleData, config);
  return response.data;
};

const saleService = {
  getSales,
  createSale,
};

export default saleService; // This is the default export