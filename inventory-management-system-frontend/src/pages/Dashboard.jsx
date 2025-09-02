import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  Paper,
  Chip
} from '@mui/material';
import { 
  FaBox, 
  FaShoppingCart, 
  FaExclamationTriangle,
  FaChartLine,
  FaPlus
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getProducts, reset as productReset } from '../features/products/productSlice';
import { getSales, reset as saleReset } from '../features/sales/saleSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { products, isLoading: productLoading, isError: productError } = useSelector(
    (state) => state.products
  );
  const { sales, isLoading: saleLoading, isError: saleError } = useSelector(
    (state) => state.sales
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getProducts());
    dispatch(getSales());

    return () => {
      dispatch(productReset());
      dispatch(saleReset());
    };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (productError) {
      toast.error(productError);
    }
    if (saleError) {
      toast.error(saleError);
    }
  }, [productError, saleError]);

  // Calculate metrics
  const totalProducts = products ? products.length : 0;
  const totalSales = sales ? sales.length : 0;
  const lowStockProducts = products
    ? products.filter((product) => product.stock <= product.threshold).length
    : 0;

  if (productLoading || saleLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6">
          Welcome back, {user && user.username}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 2, color: 'primary.main' }}>
                <FaBox size={32} />
              </Box>
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Total Products
                </Typography>
                <Typography variant="h4" component="div">
                  {totalProducts}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 2, color: 'success.main' }}>
                <FaShoppingCart size={32} />
              </Box>
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Total Sales
                </Typography>
                <Typography variant="h4" component="div">
                  {totalSales}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 2, color: 'warning.main' }}>
                <FaExclamationTriangle size={32} />
              </Box>
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Low Stock Products
                </Typography>
                <Typography variant="h4" component="div">
                  {lowStockProducts}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="contained" 
                  startIcon={<FaPlus />}
                  component={Link}
                  to="/products"
                  size="small"
                >
                  Add Product
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<FaShoppingCart />}
                  component={Link}
                  to="/sales"
                  size="small"
                >
                  Record Sale
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<FaChartLine />}
                  component={Link}
                  to="/reports"
                  size="small"
                >
                  View Reports
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Low Stock Alerts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Low Stock Alerts
            </Typography>
            {products && products.filter(p => p.stock <= p.threshold).length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {products
                  .filter(product => product.stock <= product.threshold)
                  .map(product => (
                    <Chip 
                      key={product.id}
                      label={`${product.name} (${product.stock} left)`}
                      color="warning"
                      variant="outlined"
                    />
                  ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No products with low stock at the moment.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;