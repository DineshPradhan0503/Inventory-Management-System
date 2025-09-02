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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { getCategories, addCategory, updateCategory, deleteCategory, reset } from '../features/categories/categorySlice';

function CategoriesPage() {
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const { categories, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
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

    const handleAddCategory = () => {
        setSelectedCategory(null);
        setName('');
        setShowForm(true);
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setName(category.name);
        setShowForm(true);
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(deleteCategory(id));
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setSelectedCategory(null);
        setName('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            dispatch(updateCategory({ id: selectedCategory.id, name }));
        } else {
            dispatch(addCategory({ name }));
        }
        handleCloseForm();
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" component="h1">
                        Categories
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddCategory}
                    >
                        Add Category
                    </Button>
                </Box>

                <Typography variant="body1" color="text.secondary">
                    Manage your product categories
                </Typography>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="categories table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell component="th" scope="row">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => handleEditCategory(category)}
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleDeleteCategory(category.id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog
                open={showForm}
                onClose={handleCloseForm}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {selectedCategory ? 'Edit Category' : 'Add New Category'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Category Name"
                            name="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <DialogActions>
                            <Button onClick={handleCloseForm}>Cancel</Button>
                            <Button type="submit" variant="contained">
                                {selectedCategory ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default CategoriesPage;
