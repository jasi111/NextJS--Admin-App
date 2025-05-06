'use client'
import React, { useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, addProductMethod, setProductData, resetProductState } from "@/Redux/slices/product/addSlice";
import { AppDispatch, RootState } from "@/Redux/store/store";
import { SelectChangeEvent } from "@mui/material";

const AddProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, success, error, categories } = useSelector((state: RootState) => state.addProduct);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    dispatch(setProductData({ [name!]: name === "price" || name === "categoryId" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProductMethod(product));
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" mb={3} textAlign="center">
        Add Product
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={product.title}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
          >
            {categories.map((category: any) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Image URL"
          name="images"
          value={product.images[0]}
          onChange={(e) => dispatch(setProductData({ images: [e.target.value] }))}
          margin="normal"
          required
        />

        {success && (
          <Typography color="success.main" textAlign="center" mt={2}>
            Product added successfully!
          </Typography>
        )}

        {error && (
          <Typography color="error.main" textAlign="center" mt={2}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
