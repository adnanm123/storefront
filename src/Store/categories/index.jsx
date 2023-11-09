import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch categories from the API
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('https://api-js401.herokuapp.com/api/v1/categories');
    const data = await response.json();
    return data.results;
  }
);

const initialState = {
  list: [],
  activeCategory: null,
  loading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategory(state, action) {
      const category = state.list.find(cat => cat.name === action.payload);
      if (category) {
        state.activeCategory = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;