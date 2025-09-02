import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import saleService from './saleService';

// Get all sales
export const getSales = createAsyncThunk(
  'sales/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      return await saleService.getSales(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new sale
export const createSale = createAsyncThunk(
  'sales/create',
  async (saleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.jwt;
      return await saleService.createSale(saleData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  sales: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const saleSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sales = action.payload;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sales.push(action.payload);
      })
      .addCase(createSale.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = saleSlice.actions;
export default saleSlice.reducer;