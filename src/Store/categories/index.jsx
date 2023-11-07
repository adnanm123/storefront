import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [
      { name: 'electronics', displayName: 'Electronics', description: 'Electronic devices' },
      { name: 'food', displayName: 'Food', description: 'Groceries' },
    ],
    activeCategory: null
  };

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.list = action.payload;
    },
    selectCategory(state, action) {
      const category = state.list.find(cat => cat.name === action.payload);
      if (category) {
        state.activeCategory = action.payload;
      }
    }
  }
});

export const { setCategories, selectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
