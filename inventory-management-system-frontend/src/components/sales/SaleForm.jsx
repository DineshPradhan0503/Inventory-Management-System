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
  Paper,
  Grid,
} from '@mui/material';
import { createSale } from '../../features/sales/saleSlice';
import { getProducts } from '../../features/products/productSlice';

function SaleForm() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading, isSuccess } = useSelector((state) => state.sales);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    productId: '',
    quantity: 1,
  });

  const { productId, quantity } = formData;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Sale recorded successfully!');
      setFormData({
        productId: '',
        quantity: 1,
      });
    }
  }, [isSuccess]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const saleData = {
      ...formData,
      userId: user.username,
    };

    dispatch(createSale(saleData));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Record New Sale
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Product</InputLabel>
                <Select
                  name="productId"
                  value={productId}
                  onChange={onChange}
                  label="Product"
                >
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} (Stock: {product.stock})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={quantity}
                onChange={onChange}
                inputProps={{ min: 1 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Recording...' : 'Record Sale'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default SaleForm;