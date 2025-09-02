import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { getSales, reset } from '../features/sales/saleSlice';
import { getProducts } from '../features/products/productSlice';
import SaleForm from '../components/sales/SaleForm';
import SaleHistory from '../components/sales/SaleHistory';

function SalesPage() {
  const dispatch = useDispatch();

  const { sales, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.sales
  );
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSales());
    dispatch(getProducts());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sales Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Record and view sales history
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Sale Form */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCartIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Record New Sale</Typography>
              </Box>
              <SaleForm />
            </CardContent>
          </Card>
        </Grid>

        {/* Sales History */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales History
              </Typography>
              <SaleHistory />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SalesPage;