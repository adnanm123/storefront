import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import categoriesReducer from './categories';
import productsReducer from './products';
import cartReducer from './cart';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});