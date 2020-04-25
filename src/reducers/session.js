import types from "../actions/types";

const initialState = {
  profile: {},
  isLoggedIn: false,
  isLoading: false,
  error: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOG_IN:
    case types.EDIT_VENDOR:
    case types.NEW_VENDOR:
    case types.NEW_CUSTOMER:
      return { ...state, isLoading: true };

    case types.LOG_IN_FAIL:
    case types.NEW_VENDOR_FAIL:
    case types.NEW_CUSTOMER_FAIL:
      return { ...state, isLoading: false, isLoggedIn: false };

    case types.EDIT_VENDOR_FAIL:
      return { ...state, isLoading: false };

    case types.LOG_IN_SUCCESS:
    case types.NEW_VENDOR_SUCCESS:
    case types.NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false,
        isLoggedIn: true,
      };

    case types.EDIT_VENDOR_SUCCESS:
      return {
        ...state,
        profile: payload.savedVendor,
        isLoading: false,
      };

    default:
      return state;
  }
};
