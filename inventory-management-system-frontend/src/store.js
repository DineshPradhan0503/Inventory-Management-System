import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productReducer from './features/products/productSlice';
import saleReducer from './features/sales/saleSlice';
import reportReducer from './features/reports/reportSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    sales: saleReducer,
    reports: reportReducer,
  },
});