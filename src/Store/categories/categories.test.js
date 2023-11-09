import { describe, it, expect, vi, beforeEach } from 'vitest';
import categoriesReducer, {
  selectCategory,
  fetchCategories,
  initialState 
} from './index';

// Mock the server response
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: ['electronics', 'food', 'clothes'] }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('categoriesSlice', () => {
    describe('reducers and actions', () => {
      
      it('should update the active category', () => {
        const previousState = { ...initialState, list: [{ name: 'electronics' }, { name: 'food' }, { name: 'clothes' }] };
        const categoryToSelect = 'food';
        const nextState = categoriesReducer(previousState, selectCategory(categoryToSelect));
        expect(nextState.activeCategory).toEqual(categoryToSelect);
      });
    });
  
  });
  