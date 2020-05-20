import types from "../actions/types";

const initialState = {
  activeOrders: [],
  readyOrders: [],
  orderHistory: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ACTIVE_ORDERS:
    case types.GET_READY_ORDERS:
    case types.GET_ORDER_HISTORY:
    case types.REFUND_ORDER:
    case types.CUSTOMER_PICK_UP_ORDER:
      return { ...state, ...payload, isLoading: true };
    case types.GET_ACTIVE_ORDERS_FAIL:
    case types.GET_READY_ORDERS_FAIL:
    case types.GET_ORDER_HISTORY_FAIL:
    case types.REFUND_ORDER_FAIL:
    case types.CUSTOMER_PICK_UP_ORDER_FAIL:
      return { ...state, error: payload.error, isLoading: false };
    case types.GET_ACTIVE_ORDERS_SUCCESS:
    case types.ACCEPT_ORDER_SUCCESS:
      return {
        ...state,
        activeOrders: [...payload.activeOrders],
        isLoading: false,
      };
    case types.GET_READY_ORDERS_SUCCESS:
      return {
        ...state,
        readyOrders: [...payload.readyOrders],
        isLoading: false,
      };
    case types.GET_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        orderHistory: [...payload.orderHistory],
        isLoading: false,
      };
    case types.READY_ORDER_SUCCESS:
      return {
        ...state,
        activeOrders: [...payload.activeOrders],
        readyOrders: [...payload.readyOrders],
        isLoading: false,
      };
    case types.DELIVER_ORDER_SUCCESS:
    case types.CUSTOMER_PICK_UP_ORDER_SUCCESS:
      return {
        ...state,
        orderHistory: [...payload.orderHistory],
        readyOrders: [...payload.readyOrders],
        isLoading: false,
      };
    case types.REFUND_ORDER_SUCCESS:
      return {
        ...state,
        activeOrders: [...payload.activeOrders],
        readyOrders: [...payload.readyOrders],
        orderHistory: [...payload.orderHistory],
        isLoading: false,
      };
    case "DISMISS_ORDERS_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
