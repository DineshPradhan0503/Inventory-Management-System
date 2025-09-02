import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import { Search as SearchIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';

function SaleHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  const { sales } = useSelector((state) => state.sales);
  const { products } = useSelector((state) => state.products);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter sales based on search term and date
  const filteredSales = sales
    ? sales.filter(sale => {
        const product = products.find(p => p.id === sale.productId);
        const productName = product ? product.name.toLowerCase() : '';
        const matchesSearch = productName.includes(searchTerm.toLowerCase()) || 
                              sale.productId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = filterDate
          ? new Date(sale.saleDate).toISOString().split('T')[0] === filterDate
          : true;
        return matchesSearch && matchesDate;
      })
    : [];

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          placeholder="Search by product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sales table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{getProductName(sale.productId)}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell>${sale.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`$${(sale.quantity * sale.price).toFixed(2)}`} 
                        color="success" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(sale.saleDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{sale.userId}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredSales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {filteredSales.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="textSecondary">
            No sales records found
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default SaleHistory;