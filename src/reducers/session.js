import types from "../actions/types";

const initialState = {
  profile: {},
  userType: "",
  token: "",
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
    case types.SEND_CONFIRMATION_EMAIL:
      return { ...state, isLoading: true };

    case types.LOG_IN_FAIL:
    case types.NEW_VENDOR_FAIL:
    case types.NEW_CUSTOMER_FAIL:
    case types.SEND_CONFIRMATION_EMAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        isLoggedIn: false,
      };

    case types.EDIT_VENDOR_FAIL:
      return { ...state, isLoading: false };

    case types.LOG_IN_SUCCESS:
    case types.NEW_VENDOR_SUCCESS:
    case types.NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        userType: payload.userType,
        profile: payload.profile,
        emailIsConfirmed: payload.emailIsConfirmed,
        isLoading: false,
        isLoggedIn: true,
      };
      
    case type.SEND_CONFIRMATION_EMAIL_SUCCESS:
      return {
        ...state,
        emailConfirmationSent: true
      }

    case types.EDIT_VENDOR_SUCCESS:
      return {
        ...state,
        profile: payload.savedVendor,
        isLoading: false,
      };

    case types.LOG_OUT:
      return { ...initialState };

    default:
      return state;
  }
};
