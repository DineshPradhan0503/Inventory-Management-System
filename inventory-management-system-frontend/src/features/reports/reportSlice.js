import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportApi from '../../api/reportApi';

// Get stock report
export const getStockReport = createAsyncThunk(
  'reports/getStock',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      return await reportService.getStockReport(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get daily sales report
export const getDailySales = createAsyncThunk(
  'reports/getDailySales',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      return await reportService.getDailySales(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get monthly sales report
export const getMonthlySales = createAsyncThunk(
  'reports/getMonthlySales',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      return await reportService.getMonthlySales(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get top products
export const getTopProducts = createAsyncThunk(
  'reports/getTopProducts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      return await reportService.getTopProducts(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get KPIs
export const getKpis = createAsyncThunk('reports/getKpis', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.jwt;
    return await reportApi.getKpis(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  stockReport: [],
  dailySales: [],
  monthlySales: [],
  topProducts: [],
  kpis: {
    totalProducts: 0,
    totalStockValue: 0,
    totalSales: 0,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stockReport = action.payload;
      })
      .addCase(getStockReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDailySales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDailySales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dailySales = action.payload;
      })
      .addCase(getDailySales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMonthlySales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlySales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.monthlySales = action.payload;
      })
      .addCase(getMonthlySales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTopProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.topProducts = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getKpis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKpis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.kpis = action.payload;
      })
      .addCase(getKpis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = reportSlice.actions;
export default reportSlice.reducer;