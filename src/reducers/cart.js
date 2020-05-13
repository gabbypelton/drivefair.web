import types from "../actions/types";

const initialState = {
  orderItems: [],
  inProgress: true,
  error: {},
  readyToPay: false,
  method: "PICKUP",
  total: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CREATE_CART:
    case types.ADD_TO_CART:
    case types.REMOVE_FROM_CART:
    case types.GET_CART:
    case types.TOGGLE_ORDER_METHOD:
    case types.PAY:
      return { ...state, isLoading: true };
    case types.CREATE_CART_SUCCESS:
    case types.ADD_TO_CART_SUCCESS:
    case types.REMOVE_FROM_CART_SUCCESS:
    case types.GET_CART_SUCCESS:
      return { ...state, ...payload.savedCart, isLoading: false };
    case types.CREATE_CART_FAIL:
    case types.ADD_TO_CART_FAIL:
    case types.REMOVE_FROM_CART_FAIL:
    case types.GET_CART_FAIL:
    case types.TOGGLE_ORDER_METHOD_FAIL:
    case types.PAY_FAIL:
      return { ...state, ...payload, isLoading: false };
    case types.TOGGLE_READY_TO_PAY:
      return { ...state, readyToPay: payload.readyToPay };
    case types.SEND_CART:
      return { ...state, inProgress: true };
    case types.SEND_CART_FAIL:
      return { ...state, inProgress: false, error: payload.error };
    case types.SEND_CART_SUCCESS:
      return { ...state, inProgress: false, items: [] };
    case types.TOGGLE_ORDER_METHOD_SUCCESS:
      return { ...state, method: payload.orderMethod, isLoading: false };
    case types.PAY_SUCCESS:
      return { ...initialState };
    default:
      return state;
  }
};
