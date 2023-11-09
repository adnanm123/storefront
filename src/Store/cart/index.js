import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateInventory } from '../products'
import axios from 'axios';

export const addToCartAndUpdateInventory = createAsyncThunk(
  'cart/addToCartAndUpdateInventory',
  async (product, { dispatch, getState }) => {
    dispatch(addToCart(product));

    try {
      const response = await axios.put(`https://api-js401.herokuapp.com/api/v1/products/${product._id}`, {
        inStock: product.inStock - 1,
      });
      if (response.status === 200) {
        dispatch(updateInventory({
          _id: product._id,
          inStock: response.data.inStock 
        }));
      }
    } catch (error) {

      console.error('Failed to update inventory:', error);
  
    }
  }
);

export const removeFromCartAndUpdateInventory = createAsyncThunk(
  'cart/removeFromCartAndUpdateInventory',
  async (product, { dispatch, getState }) => {
    const currentQuantityInCart = getState().cart.items[product._id]?.quantity || 0;

    if (currentQuantityInCart > 0) {
      dispatch(removeFromCart(product._id));

      try {
        const response = await axios.put(`https://api-js401.herokuapp.com/api/v1/products/${product._id}`, {
          inStock: product.inStock ,
        });
        if (response.status === 200) {
          dispatch(updateInventory({
            _id: product._id,
            inStock: response.data.inStock 
          }));
          console.log(product.inStock);
          console.log(currentQuantityInCart);
        }
      } catch (error) {
        console.error('Failed to update inventory when removing from cart:', error);
      }
    }
  }
);




const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
  },
  reducers: {
    // Reducer to add an item to the cart
    addToCart(state, action) {
      const { _id, name, price } = action.payload;
      if (state.items[_id]) {
        state.items[_id].quantity += 1;
      } else {
        state.items[_id] = { ...action.payload, quantity: 1 };
      }
    },
    // Reducer to remove an item from the cart
    removeFromCart(state, action) {
      delete state.items[action.payload];
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAndUpdateInventory.fulfilled, (state, action) => {
      })
      .addCase(addToCartAndUpdateInventory.rejected, (state, action) => {
      })
      .addCase(removeFromCartAndUpdateInventory.fulfilled, (state, action) => {
      })
      .addCase(removeFromCartAndUpdateInventory.rejected, (state, action) => {
      });
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;