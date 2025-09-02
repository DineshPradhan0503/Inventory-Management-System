import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';
import { createProduct, updateProduct } from '../../features/products/productSlice';

function ProductForm({ product, onClose }) {
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: 0,
    stock: 0,
    threshold: 0,
  });

  const { name, category, description, price, stock, threshold } = formData;

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(product ? 'Product updated successfully!' : 'Product created successfully!');
      onClose();
    }
  }, [isSuccess, onClose, product]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (product) {
      dispatch(updateProduct({ id: product.id, productData: formData }));
    } else {
      dispatch(createProduct(formData));
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {product ? 'Edit Product' : 'Add New Product'}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={category}
                  onChange={onChange}
                  label="Category"
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Clothing">Clothing</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Books">Books</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={description}
                onChange={onChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price ($)"
                name="price"
                type="number"
                value={price}
                onChange={onChange}
                inputProps={{ min: 0, step: 0.01 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={stock}
                onChange={onChange}
                inputProps={{ min: 0 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Low Stock Threshold"
                name="threshold"
                type="number"
                value={threshold}
                onChange={onChange}
                inputProps={{ min: 0 }}
                required
                helperText="Alert when stock falls below this value"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default ProductForm;