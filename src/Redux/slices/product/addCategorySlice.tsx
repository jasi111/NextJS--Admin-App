import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const addCategoryAction = createAsyncThunk(
//   "addCategory/addCategoryAction",
//   async (
//     { name, image }: { name: string; image: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await fetch("https://api.escuelajs.co/api/v1/categories/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, image }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to add category");
//       }
//       return await response.json();
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


export const addCategoryAction = createAsyncThunk(
  "addCategory/addCategoryAction",
  async (
    { name, image }: { name: string; image: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("Sending API request:", { name, image });
      const response = await fetch("https://api.escuelajs.co/api/v1/categories/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.error("API Error:", error);
        throw new Error(error.message || "Failed to add category");
      }
      const data = await response.json();
      console.log("API Response:", data);
      return data;
    } catch (error: any) {
      console.error("Error in addCategoryAction:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface CategoryState {
  categories: any[];
  loading: boolean;
  error: string | null;
  name: string;
  image: string;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  name: "",
  image: "",
};

const categorySlice = createSlice({
  name: "addCategory",
  initialState,
  reducers: {
    setName: (state, action) => {
      console.log("Setting Name:", action.payload);
      state.name = action.payload;
    },
    setImage: (state, action) => {
      console.log("Setting Image:", action.payload);
      state.image = action.payload;
    },
    resetCategoryForm: (state) => {
      console.log("Resetting Category Form");
      state.name = "";
      state.image = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryAction.fulfilled, (state, action) => {
        console.log("Redux Fulfilled Payload:", action.payload);
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setName, setImage, resetCategoryForm } = categorySlice.actions;

export default categorySlice.reducer;
