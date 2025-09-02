import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reports/';

// Get stock report
const getStockReport = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'stock', config);
  return response.data;
};

// Get daily sales report
const getDailySales = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'sales/daily', config);
  return response.data;
};

// Get monthly sales report
const getMonthlySales = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'sales/monthly', config);
  return response.data;
};

// Get top products
const getTopProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'top-products', config);
  return response.data;
};

const reportService = {
  getStockReport,
  getDailySales,
  getMonthlySales,
  getTopProducts,
};

export default reportService;