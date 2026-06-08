import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('constructorSlice reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const mockBun: TIngredient = {
    _id: 'bun-1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockIngredient1: TIngredient = {
    _id: 'ing-1',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const mockIngredient2: TIngredient = {
    _id: 'ing-2',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  };

  it('should return the initial state when called with an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  describe('addIngredient', () => {
    it('should handle adding a bun', () => {
      const action = addIngredient(mockBun);
      const state = reducer(initialState, action);

      expect(state.bun).toBeDefined();
      expect(state.bun?._id).toBe(mockBun._id);
      expect(state.bun?.id).toBeDefined();
      expect(state.ingredients).toHaveLength(0);
    });

    it('should handle adding a normal ingredient', () => {
      const action = addIngredient(mockIngredient1);
      const state = reducer(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe(mockIngredient1._id);
      expect(state.ingredients[0].id).toBeDefined();
    });
  });

  describe('removeIngredient', () => {
    it('should handle removing an ingredient by id', () => {
      const constructorIngredient: TConstructorIngredient = {
        ...mockIngredient1,
        id: 'unique-id-123'
      };

      const stateWithIngredient = {
        bun: null,
        ingredients: [constructorIngredient]
      };

      const action = removeIngredient('unique-id-123');
      const state = reducer(stateWithIngredient, action);

      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('moveIngredient', () => {
    it('should handle moving an ingredient down the list', () => {
      const ing1: TConstructorIngredient = { ...mockIngredient1, id: 'id-1' };
      const ing2: TConstructorIngredient = { ...mockIngredient2, id: 'id-2' };

      const stateWithIngredients = {
        bun: null,
        ingredients: [ing1, ing2]
      };

      const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
      const state = reducer(stateWithIngredients, action);

      expect(state.ingredients).toEqual([ing2, ing1]);
    });

    it('should handle moving an ingredient up the list', () => {
      const ing1: TConstructorIngredient = { ...mockIngredient1, id: 'id-1' };
      const ing2: TConstructorIngredient = { ...mockIngredient2, id: 'id-2' };

      const stateWithIngredients = {
        bun: null,
        ingredients: [ing1, ing2]
      };

      const action = moveIngredient({ fromIndex: 1, toIndex: 0 });
      const state = reducer(stateWithIngredients, action);

      expect(state.ingredients).toEqual([ing2, ing1]);
    });
  });
});
