import { describe, it, expect, vi, beforeEach } from 'vitest';
import productsReducer, {
  setProducts,
  addProduct,
  updateInventory,
  removeProduct,
  fetchProducts,
  initialState
} from './index';
import { configureStore } from '@reduxjs/toolkit';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [{ _id: '1', name: 'Product 1', inStock: 10 }] }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('productsSlice', () => {
  describe('reducers and actions', () => {
    it('should set the products list', () => {

      const products = [{ _id: '1', name: 'Product 1', inStock: 10 }];

      const nextState = productsReducer(initialState, setProducts(products));

      expect(nextState.list).toEqual(products);
    });

    it('should add a product', () => {

      const newProduct = { _id: '2', name: 'Product 2', inStock: 5 };

      const nextState = productsReducer(initialState, addProduct(newProduct));

      expect(nextState.list).toContainEqual(newProduct);
    });

    it('should update a product inventory', () => {

      const existingProduct = { _id: '1', name: 'Product 1', inStock: 10 };
      const initialStateWithProduct = { ...initialState, list: [existingProduct] };
      const updatedInventory = { _id: '1', inStock: 8 };

      const nextState = productsReducer(initialStateWithProduct, updateInventory(updatedInventory));

      expect(nextState.list[0].inStock).toBe(updatedInventory.inStock);
    });

    it('should remove a product', () => {

      const existingProduct = { _id: '1', name: 'Product 1', inStock: 10 };
      const initialStateWithProduct = { ...initialState, list: [existingProduct] };

      const nextState = productsReducer(initialStateWithProduct, removeProduct(existingProduct._id));

      expect(nextState.list).not.toContainEqual(existingProduct);
    });
  });

  describe('fetchProducts thunk', () => {
    it('should fetch products', async () => {

      const store = configureStore({ reducer: { products: productsReducer } });
  
      await store.dispatch(fetchProducts());

      const state = store.getState().products;
      expect(state.list).toEqual([{ _id: '1', name: 'Product 1', inStock: 10 }]);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
  
});