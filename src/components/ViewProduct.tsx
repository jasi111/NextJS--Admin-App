'use client';

import { Table, TableBody, TableCell, TableHead, Pagination, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProductThunk, updateProductThunk, Product } from '@/Redux/slices/product/viewSlice';
import { AppDispatch, RootState } from '@/Redux/store/store';

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.viewProduct);

  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProductData, setEditProductData] = useState<Product | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleOpenDialog = (id: number) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedProductId(null);
    setOpenDialog(false);
  };

  const handleDelete = () => {
    if (selectedProductId !== null) {
      dispatch(deleteProductThunk(selectedProductId));
      handleCloseDialog();
    }
  };

  const handleOpenEditDialog = (product: Product) => {
    setEditProductData(product);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setEditProductData(null);
    setOpenEditDialog(false);
  };

  const handleUpdateProduct = () => {
    if (editProductData) {
      dispatch(updateProductThunk(editProductData));
      setOpenSnackbar(true);
      handleCloseEditDialog();
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {paginatedProducts.map((product) => (
                <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>
            <Button onClick={() => handleOpenEditDialog(product)} color="primary" variant="contained">
          Update
        </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                sx={{ mt: 1 }}
                onClick={() => handleOpenDialog(product.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Pagination
      count={Math.ceil(products.length / itemsPerPage)} 
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
    />
    {/* Confirmation Dialog */}
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle sx={{ color: "error.main" }}>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this product? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary" variant="outlined">
          No
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>

    {/* Edit Product Dialog */}
    <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={editProductData?.title || ''}
          onChange={(e) => setEditProductData({ ...editProductData!, title: e.target.value })}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          value={editProductData?.price || ''}
          onChange={(e) => {
              const newPrice = parseFloat(e.target.value);
                     setEditProductData({
                ...editProductData!,
                price: isNaN(newPrice) ? 0 : newPrice
              });
            }}
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditDialog} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleUpdateProduct} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>

    <Snackbar
open={openSnackbar}
autoHideDuration={500} 
onClose={() => setOpenSnackbar(false)}
anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
>
<Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
  Product updated successfully!
</Alert>
</Snackbar>
  </Paper>
  );
}
