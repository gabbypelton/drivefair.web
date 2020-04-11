import types from "../actions/types";

const savedCart = JSON.parse(localStorage.getItem("cart"));

const baseState = {
  items: [],
  inProgress: true,
  error: {},
  readyToPay: false,
  orderMethod: "pickup",
  total: 0
};

const initialState = {
  ...baseState,
  ...savedCart
}

let currentIndex = 0;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, { ...payload, key: currentIndex++ }],
        total: state.total + payload.price
      };
    case types.REMOVE_FROM_CART:
      return {
        ...state,
        items: [
          ...state.items.filter((orderItem) => orderItem.key !== payload.key),
        ],
      };
    case types.SELECT_VENDOR:
      localStorage.removeItem("cart");
      return { ...initialState };
    case types.SAVE_CART:
      localStorage.setItem("cart", JSON.stringify({ ...state }));
      return { ...state };
    case types.TOGGLE_READY_TO_PAY:
      return { ...state, readyToPay: payload.readyToPay }
    case types.SEND_ORDER:
      return { ...state, inProgress: true };
    case types.SEND_ORDER_FAIL:
      return { ...state, inProgress: false, error: payload.error };
    case types.SEND_ORDER_SUCCESS:
      return { ...state, inProgress: false, items: [] };
    case types.TOGGLE_ORDER_METHOD:
      return { ...state, orderMethod: payload.orderMethod }
    default:
      return state;
  }
};
