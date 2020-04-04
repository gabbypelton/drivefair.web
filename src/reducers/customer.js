import types from "../actions/types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "NEW_CUSTOMER":
      return { ...state, ...payload };

    default:
      return state;
  }
};
