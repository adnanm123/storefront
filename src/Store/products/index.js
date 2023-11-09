import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch products from the API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://api-js401.herokuapp.com/api/v1/products');
    const data = await response.json();
    console.log(data.results);
    return data.results;
  }
);

const initialState = {
  list: [],
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.list = action.payload;
    },
    addProduct(state, action) {
      state.list.push(action.payload);
    },
    updateInventory(state, action) {
      const index = state.list.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.list[index].inStock = action.payload.inStock;
      }
    },

    removeProduct(state, action) {
      const index = state.list.findIndex(p => p._id === action.payload);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setProducts, addProduct, updateInventory, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;