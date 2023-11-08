import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateInventory } from '../products'; 

export const addToCartAndUpdateInventory = createAsyncThunk(
    'products/addToCartAndUpdateInventory',
    async (product, { dispatch, getState }) => {
      dispatch(addToCart(product));
      const currentProduct = getState().products.list.find(p => p.id === product.id);
      if (currentProduct.inventoryCount > 0) {
        dispatch(updateInventory({ id: product.id, inventoryCount: currentProduct.inventoryCount - 1 }));
      }
    }
  );

const initialState = {
  items: {}, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, name, price } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = { ...action.payload, quantity: 1 };
      }
    },
    removeFromCart(state, action) {
      delete state.items[action.payload];
    },
    clearCart(state) {
      state.items = {};
    },

  },
  extraReducers: (builder) => {
    builder.addCase(addToCartAndUpdateInventory.fulfilled, (state, action) => {
    });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;