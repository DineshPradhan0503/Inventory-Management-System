import axios from 'axios';

const API_URL = '/api/reports';

const exportStockPdf = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
    };
    const response = await axios.get(`${API_URL}/stock/export/pdf`, config);
    return response.data;
};

const exportStockExcel = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
    };
    const response = await axios.get(`${API_URL}/stock/export/excel`, config);
    return response.data;
};

const exportApi = {
    exportStockPdf,
    exportStockExcel,
};

export default exportApi;
