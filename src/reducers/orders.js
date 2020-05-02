import types from "../actions/types";

const initialState = {
  activeOrders: [],
  completedOrders: [],
  orderHistory: [],
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ACTIVE_ORDERS:
    case types.GET_COMPLETED_ORDERS:
    case types.GET_ORDER_HISTORY:
      return { ...state, ...payload, isLoading: true };
    case types.GET_ACTIVE_ORDERS_FAIL:
    case types.GET_COMPLETED_ORDERS_FAIL:
    case types.GET_ORDER_HISTORY_FAIL:
      return { ...state, error: payload.error, isLoading: false };
    case types.GET_ACTIVE_ORDERS_SUCCESS:
      return {
        ...state,
        activeOrders: [...payload.activeOrders],
        isLoading: false,
      };
    case types.GET_COMPLETED_ORDERS_SUCCESS:
      return {
        ...state,
        completedOrders: [...payload.completedOrders],
        isLoading: false,
      };
    case types.COMPLETE_ORDER_SUCCESS:
      return {
        ...state,
        activeOrders: [...payload.activeOrders],
        completedOrders: [...payload.completedOrders],
        isLoading: false,
      };
    case types.DELIVER_ORDER_SUCCESS:
      return {
        ...state,
        orderHistory: [...payload.orderHistory],
        completedOrders: [...payload.completedOrders],
        isLoading: false,
      };
    default:
      return state;
  }
};
