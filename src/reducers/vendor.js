import types from "../actions/types";

const initialState = {
  isLoading: false,
  vendors: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.NEW_VENDOR:
      return { ...state, ...payload };
    case types.GET_VENDORS:
      return { ...state, isLoading: true };
    case types.GET_VENDORS_SUCCESS:
      return { ...state, isLoading: false, vendors: payload.vendors };
    case types.GET_VENDORS_FAIL:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
