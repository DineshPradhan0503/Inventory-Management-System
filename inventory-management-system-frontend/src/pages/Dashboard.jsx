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
                  {kpis.totalProducts}
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
                  ${kpis.totalSales.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 2, color: 'info.main' }}>
                <FaChartLine size={32} />
              </Box>
              <Box>
                <Typography color="textSecondary" gutterBottom>
                  Stock Value
                </Typography>
                <Typography variant="h4" component="div">
                  ${kpis.totalStockValue.toFixed(2)}
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

      </Grid>
    </Box>
  );
}

export default Dashboard;