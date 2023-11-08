import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [

    { id: 1, category: 'electronics', name: 'TV', description: 'A large screen TV', price: 799.99, inventoryCount: 25 },
    { id: 2, category: 'electronics', name: 'Macbook', description: 'A high-end laptop', price: 1299.99, inventoryCount: 5 },
    { id: 3, category: 'food', name: 'Banana', description: 'A yellow banana', price:0.29, inventoryCount: 200 },
    { id: 4, category: 'food', name: 'Cookie', description: 'A delicious cookie', price: 5.99, inventoryCount: 250 },

  ],
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
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index].inventoryCount = action.payload.inventoryCount;
      }
    },

    removeProduct(state, action) {
      const index = state.list.findIndex(p => p.id === action.payload);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
  },
});

export const { setProducts, addProduct, updateInventory, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;