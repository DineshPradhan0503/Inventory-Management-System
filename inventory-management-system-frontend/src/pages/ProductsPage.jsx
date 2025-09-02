import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Paper,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { getProducts, reset } from '../features/products/productSlice';
import { getCategories } from '../features/categories/categorySlice';
import ProductForm from '../components/products/ProductForm';

function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockStatusFilter, setStockStatusFilter] = useState('');
  const dispatch = useDispatch();

  const { products, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Implement delete functionality
      toast.info('Delete functionality to be implemented');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedAndFilteredProducts = products
    ? products
        .filter(product => {
          const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());

          const categoryMatch = categoryFilter ? product.category === categoryFilter : true;

          const stockStatusMatch = stockStatusFilter ?
            (stockStatusFilter === 'inStock' && product.stock > product.threshold) ||
            (stockStatusFilter === 'lowStock' && product.stock <= product.threshold && product.stock > 0) ||
            (stockStatusFilter === 'outOfStock' && product.stock === 0) :
            true;

          return searchMatch && categoryMatch && stockStatusMatch;
        })
        .sort((a, b) => {
          if (order === 'asc') {
            return a[orderBy] > b[orderBy] ? 1 : -1;
          }
          return a[orderBy] < b[orderBy] ? 1 : -1;
        })
    : [];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Products
          </Typography>
          {user && user.role === 'ROLE_ADMIN' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          )}
        </Box>
        
        <Typography variant="body1" color="text.secondary">
          Manage your product inventory
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
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
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Category"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Stock Status</InputLabel>
          <Select
            value={stockStatusFilter}
            onChange={(e) => setStockStatusFilter(e.target.value)}
            label="Stock Status"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="inStock">In Stock</MenuItem>
            <MenuItem value="lowStock">Low Stock</MenuItem>
            <MenuItem value="outOfStock">Out of Stock</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === 'name' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'category' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'category'}
                    direction={orderBy === 'category' ? order : 'asc'}
                    onClick={() => handleSort('category')}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell sortDirection={orderBy === 'price' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'price'}
                    direction={orderBy === 'price' ? order : 'asc'}
                    onClick={() => handleSort('price')}
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'stock' ? order : false}>
                  <TableSortLabel
                    active={orderBy === 'stock'}
                    direction={orderBy === 'stock' ? order : 'asc'}
                    onClick={() => handleSort('stock')}
                  >
                    Stock
                  </TableSortLabel>
                </TableCell>
                <TableCell>Threshold</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFilteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: product.stock === 0 ? 'rgba(255, 0, 0, 0.1)' : product.stock <= product.threshold ? 'rgba(255, 152, 0, 0.1)' : 'inherit'
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {product.stock === 0 ? (
                        <Chip label="Out of Stock" color="error" size="small" />
                      ) : product.stock <= product.threshold ? (
                        <Chip label={`Low Stock (${product.stock})`} color="warning" size="small" />
                      ) : (
                        <Chip label="In Stock" color="success" size="small" />
                      )}
                    </TableCell>
                    <TableCell>{product.threshold}</TableCell>
                    <TableCell>
                      {user && user.role === 'ROLE_ADMIN' && (
                        <>
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditProduct(product)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteProduct(product.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={sortedAndFilteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog 
        open={showForm} 
        onClose={handleCloseForm}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <ProductForm 
            product={selectedProduct} 
            onClose={handleCloseForm} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProductsPage;