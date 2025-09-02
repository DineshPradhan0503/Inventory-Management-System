import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { 
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon
} from '@mui/icons-material';
import {
  getStockReport,
  getDailySales,
  getMonthlySales,
  getTopProducts,
  reset,
} from '../features/reports/reportSlice';
import SalesChart from '../components/reports/SalesChart';
import StockChart from '../components/reports/StockChart';

function ReportsPage() {
  const dispatch = useDispatch();

  const {
    stockReport,
    dailySales,
    monthlySales,
    topProducts,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.reports);

  useEffect(() => {
    dispatch(getStockReport());
    dispatch(getDailySales());
    dispatch(getMonthlySales());
    dispatch(getTopProducts());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleExportPDF = () => {
    // Implement PDF export functionality
    toast.info('PDF export functionality to be implemented');
  };

  const handleExportExcel = () => {
    // Implement Excel export functionality
    toast.info('Excel export functionality to be implemented');
  };

  if (isLoading) {
    return <div>Loading reports...</div>;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Reports & Analytics
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              startIcon={<PdfIcon />}
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<ExcelIcon />}
              onClick={handleExportExcel}
            >
              Export Excel
            </Button>
          </Box>
        </Box>
        <Typography variant="body1" color="text.secondary">
          View inventory and sales reports
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Sales Charts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Sales
              </Typography>
              <SalesChart data={dailySales} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Sales
              </Typography>
              <SalesChart data={monthlySales} />
            </CardContent>
          </Card>
        </Grid>

        {/* Stock Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Stock Levels
              </Typography>
              <StockChart data={stockReport} />
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Selling Products
              </Typography>
              <TableContainer>
                <Table aria-label="top products table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Total Sold</TableCell>
                      <TableCell>Current Stock</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product, index) => {
                      const stockProduct = stockReport.find(p => p.name === product.productName);
                      return (
                        <TableRow key={index}>
                          <TableCell>{product.productName}</TableCell>
                          <TableCell>{product.totalSold}</TableCell>
                          <TableCell>
                            {stockProduct ? stockProduct.stock : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {stockProduct && stockProduct.stock <= stockProduct.threshold ? (
                              <Chip label="Low Stock" color="warning" size="small" />
                            ) : (
                              <Chip label="In Stock" color="success" size="small" />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ReportsPage;