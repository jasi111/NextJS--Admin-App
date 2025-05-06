import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { deleteProduct } from '@/pages/api/deleteProduct';
import { updateProduct } from '@/pages/api/updateProduct';

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://api.escuelajs.co/api/v1/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return (await response.json()) as Product[];
});

export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    await deleteProduct(id);
    return id; // Return the deleted product ID to remove it from the state
  }
);

export const updateProductThunk = createAsyncThunk(
  'products/updateProduct',
  async (updatedProduct: Product) => {
    const response = await updateProduct(updatedProduct);
    return response; 
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(deleteProductThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(updateProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      });
  },
});

export default productsSlice.reducer;
