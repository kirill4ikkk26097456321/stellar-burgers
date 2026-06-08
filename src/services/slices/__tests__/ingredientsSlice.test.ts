import reducer from '../ingredientsSlice';
import { fetchIngredients } from '../ingredientsSlice';

describe('ingredientsSlice reducer', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null
  };

  it('should return the initial state when called with an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const expectedState = {
      ...initialState,
      isLoading: true,
      error: null
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Bun',
        type: 'bun',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 10,
        price: 10,
        image: 'url',
        image_mobile: 'url',
        image_large: 'url'
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const expectedState = {
      ...initialState,
      items: mockIngredients,
      isLoading: false
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    };

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: errorMessage
    };

    const state = reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
