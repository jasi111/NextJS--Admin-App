import React from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAction, setName, setImage, resetCategoryForm } from "@/Redux/slices/product/addCategorySlice";
import { RootState } from "@/Redux/store/store";
import { AppDispatch } from "@/Redux/store/store";

interface AddCategoryModalProps {
  open: boolean;
  handleClose: () => void;
  handleCategoryAdded: (newCategory: any) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  handleClose,
  handleCategoryAdded,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { name, image, loading, error } = useSelector(
    (state: RootState) => state.addCategory
  );

  // const handleAddCategory = () => {
  //   if (!name) {
  //     alert("Category name is required");
  //     return;
  //   }
  //   console.log("Dispatching addCategoryAction");
  //   dispatch(addCategoryAction({ name, image })).then((response: any) => {
  //     console.log("Add Category Response:", response);
  //     if (response?.payload) {
  //       handleCategoryAdded(response.payload);
  //     }
  //     dispatch(resetCategoryForm()); 
  //     handleClose();
  //   });
  // };
  const handleAddCategory = () => {
    if (!name) {
      alert("Category name is required");
      return;
    }
    console.log("Dispatching addCategoryAction");
    dispatch(addCategoryAction({ name, image }))
      .unwrap()
      .then((response: any) => {
        console.log("Category added successfully:", response);
        handleCategoryAdded(response); 
        dispatch(resetCategoryForm());
        handleClose();
      })
      .catch((error: string) => {
        console.error("Failed to add category:", error);
        alert(`Error: ${error}`);
      });
  };
  

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Add New Category</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => dispatch(setImage(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : (
          <Button variant="contained" fullWidth onClick={handleAddCategory}>
            Add Category
          </Button>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
