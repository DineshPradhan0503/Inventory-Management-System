import axios from 'axios';

const API_URL = '/api/reports';

const getKpis = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [totalProducts, totalStockValue, totalSales] = await Promise.all([
    axios.get(`${API_URL}/kpi/total-products`, config),
    axios.get(`${API_URL}/kpi/total-stock-value`, config),
    axios.get(`${API_URL}/kpi/total-sales`, config),
  ]);

  return {
    totalProducts: totalProducts.data,
    totalStockValue: totalStockValue.data,
    totalSales: totalSales.data,
  };
};

const reportApi = {
  getKpis,
};

export default reportApi;
