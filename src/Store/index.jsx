import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories';
import productsReducer from './products';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  }
});
