import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Initial State
interface ProductState {
  product: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  };
  loading: boolean;
  success: boolean;
  error: string | null;
  categories: { id: number; name: string }[];
}

const initialState: ProductState = {
  product: {
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [""],
  },
  loading: false,
  success: false,
  error: null,
  categories: [],
};

// Async Thunk for Fetching Categories
export const fetchCategories = createAsyncThunk(
  "addProduct/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for Adding Product
export const addProductMethod = createAsyncThunk(
  "addProduct/addProductSlice",
  async (product: ProductState["product"], { rejectWithValue }) => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to add product");
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const addSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    setProductData: (state, action: PayloadAction<Partial<ProductState["product"]>>) => {
      state.product = { ...state.product, ...action.payload };
    },
    resetProductState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Product
      .addCase(addProductMethod.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addProductMethod.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addProductMethod.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProductData, resetProductState } = addSlice.actions;
export default addSlice.reducer;
