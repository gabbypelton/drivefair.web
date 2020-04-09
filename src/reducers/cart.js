import types from "../actions/types";

let initialState = {
  items: [],
};

const savedCart = JSON.parse(localStorage.getItem("cart"));
if (savedCart) initialState = savedCart;

let currentIndex = 0;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, { ...payload, key: currentIndex++ }],
      };
    case types.REMOVE_FROM_CART:
      return {
        ...state,
        items: [...(state.items.filter(orderItem => orderItem.key !== payload.key))],
      };
    case types.SELECT_VENDOR:
      localStorage.removeItem("cart");
      return { ...initialState };
    case types.SAVE_CART:
      localStorage.setItem("cart", JSON.stringify({...state}));
      return { ...state };
    default:
      return state;
  }
};
