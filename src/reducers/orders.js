import types from "../actions/types";

const initialState = {
  activeOrders: [],
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ACTIVE_ORDERS:
      return { ...state, ...payload, isLoading: true };
    case types.GET_ACTIVE_ORDERS_FAIL:
      return { ...state, ...payload, isLoading: false };
    case types.GET_ACTIVE_ORDERS_SUCCESS:
      return { ...state, activeOrders: payload.activeOrders, isLoading: false };

    default:
      return state;
  }
};
