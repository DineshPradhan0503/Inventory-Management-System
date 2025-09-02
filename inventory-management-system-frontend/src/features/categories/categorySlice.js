import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initialState = {
    categories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get all categories
export const getCategories = createAsyncThunk('categories/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.jwt;
        return await categoryService.getCategories(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Add category
export const addCategory = createAsyncThunk('categories/add', async (categoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.jwt;
        return await categoryService.addCategory(categoryData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update category
export const updateCategory = createAsyncThunk('categories/update', async (categoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.jwt;
        return await categoryService.updateCategory(categoryData.id, categoryData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete category
export const deleteCategory = createAsyncThunk('categories/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.jwt;
        return await categoryService.deleteCategory(id, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories = state.categories.map((category) =>
                    category.id === action.payload.id ? action.payload : category
                );
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories = state.categories.filter(
                    (category) => category.id !== action.payload
                );
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
