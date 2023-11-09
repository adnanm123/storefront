import { describe, it, expect, beforeEach, vi } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  initialState
} from './index';

vi.mock('axios');

const product = {
  _id: '1',
  name: 'Product 1',
  price: 10,
  inStock: 10,
};

describe('cartSlice', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
        items: {},
      });
    });

    it('should handle adding items to the cart', () => {
      const state = cartReducer(initialState, addToCart(product));
      expect(state.items[product._id]).toEqual({ ...product, quantity: 1 });
    });

    it('should handle removing items from the cart', () => {
      const state = cartReducer({ items: { [product._id]: { ...product, quantity: 1 } } }, removeFromCart(product._id));
      expect(state.items[product._id]).toBeUndefined();
    });
  });
});