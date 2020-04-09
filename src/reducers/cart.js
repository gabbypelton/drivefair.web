import types from "../actions/types";

let initialState = {
  items: [],
};

const savedCart = JSON.parse(localStorage.getItem("cart"));
if (savedCart) initialState = savedCart;

let currentIndex = 0;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, { ...payload, key: currentIndex++ }],
      };
    case "SELECT_VENDOR":
      return { ...initialState };
    case "SAVE_CART":
      localStorage.setItem("cart", JSON.stringify(state));
      return { ...state };
    default:
      return state;
  }
};
