import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';

const mockCategoriesReducer = () => ({
  list: [
    { name: 'electronics', displayName: 'Electronics', description: 'Electronic devices' },
    { name: 'food', displayName: 'Food', description: 'Groceries' },
  ],
  activeCategory: null,
});

const mockProductsReducer = () => ({
  list: [
    { id: 1, category: 'electronics', name: 'TV', description: 'A large screen TV', price: 799.99, inventoryCount: 10 },
    { id: 2, category: 'electronics', name: 'Macbook', description: 'A high-end laptop', price: 1299.99, inventoryCount: 5 },
  ],
});

const createMockStore = () => {
  return configureStore({
    reducer: {
      categories: mockCategoriesReducer,
      products: mockProductsReducer,
      cart: () => ({
          items: {}, 
        }),
    },
  });
};

describe('App', () => {

let store;
beforeAll(() => {
  store = createMockStore();
});

  it('renders Header component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('OUR STORE')).toBeInTheDocument();
  });

  it('renders Categories component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByRole('button', { name: /Electronics/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Food/i })).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/© 2023 Virtual Store/)).toBeInTheDocument();
  });
});