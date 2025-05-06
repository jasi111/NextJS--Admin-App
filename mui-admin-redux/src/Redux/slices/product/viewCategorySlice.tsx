import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categories: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'viewCategory/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'viewCategory',
  initialState,
  reducers: {
    addCategoryAction: (state, action: PayloadAction<any>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addCategoryAction, deleteCategory } = categorySlice.actions;

export default categorySlice.reducer;
