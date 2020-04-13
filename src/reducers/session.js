import types from "../actions/types";

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  error: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOG_IN:
      return { ...state, isLoading: true };
    case types.LOG_IN_FAIL:
      return { ...state, isLoading: false, isLoggedIn: false };
    case types.LOG_IN_SUCCESS ||
      types.NEW_VENDOR_SUCCESS ||
      types.NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};
