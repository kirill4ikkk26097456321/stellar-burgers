import { rootReducer } from '../../store';

describe('rootReducer', () => {
  it('should return the initial state of the entire store when called with an unknown action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state.ingredients).toEqual({
      items: [],
      isLoading: false,
      error: null
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(state.order).toEqual({
      orderRequest: false,
      orderModalData: null,
      error: null
    });

    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null
    });

    expect(state.user).toEqual({
      user: null,
      isAuthChecked: false,
      isLoading: false,
      error: null
    });

    expect(state.userOrders).toEqual({
      orders: [],
      isLoading: false,
      error: null,
      currentOrder: null,
      isCurrentOrderLoading: false
    });
  });
});
