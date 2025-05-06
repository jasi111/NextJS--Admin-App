import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/Redux/store/store';
import { fetchCategories, deleteCategory } from '@/Redux/slices/product/viewCategorySlice';
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCategoryModal from './AddCategoryModal';  

interface CategoryModalProps {
  open: boolean;
  handleClose: () => void;
  handleCategoryAdded: (newCategory: any) => void;  
}

const CategoryModal: React.FC<CategoryModalProps> = ({ open, handleClose, handleCategoryAdded }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.viewCategory);
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      dispatch(fetchCategories());
    }
  }, [open, dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
  };

  const handleAddCategoryOpen = () => {
    setAddCategoryModalOpen(true);  
  };

  const handleAddCategoryClose = () => {
    setAddCategoryModalOpen(false);  
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="category-modal-title"
        aria-describedby="category-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            maxHeight: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography id="category-modal-title" variant="h6">
              Categories
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Button variant="contained" onClick={handleAddCategoryOpen}>
              Add New Category
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}
            sx={{
              maxHeight: 400, // Set an appropriate height constraint
              overflowY: 'auto', // Allow vertical scrolling for the table
            }}>
              <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Category Name</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell component="th" scope="row">
                          {category.name}
                        </TableCell>
                        <TableCell align="left">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(category.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No categories available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ textAlign: 'right', mt: 3 }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <AddCategoryModal
        open={addCategoryModalOpen}
        handleClose={handleAddCategoryClose}
        handleCategoryAdded={handleCategoryAdded}  
      />
    </>
  );
};

export default CategoryModal;
