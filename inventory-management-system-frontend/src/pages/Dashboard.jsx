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
  Inventory,
  PointOfSale,
  Assessment,
  AddShoppingCart,
  Add,
  BarChart
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getKpis, reset as reportReset } from '../features/reports/reportSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { kpis, isLoading, isError, message } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getKpis());

    return () => {
      dispatch(reportReset());
    };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
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
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', height: '100%' }} elevation={3}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>
              <Inventory />
            </Avatar>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h4" component="div">
                {kpis.totalProducts}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', height: '100%' }} elevation={3}>
            <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mr: 2 }}>
              <PointOfSale />
            </Avatar>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                Total Sales
              </Typography>
              <Typography variant="h4" component="div">
                ${kpis.totalSales.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', height: '100%' }} elevation={3}>
            <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56, mr: 2 }}>
              <Assessment />
            </Avatar>
            <Box>
              <Typography color="textSecondary" gutterBottom>
                Stock Value
              </Typography>
              <Typography variant="h4" component="div">
                ${kpis.totalStockValue.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                component={Link}
                to="/products"
              >
                Add Product
              </Button>
              <Button
                variant="contained"
                startIcon={<AddShoppingCart />}
                component={Link}
                to="/sales"
              >
                Record Sale
              </Button>
              <Button
                variant="contained"
                startIcon={<BarChart />}
                component={Link}
                to="/reports"
              >
                View Reports
              </Button>
            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
}

export default Dashboard;