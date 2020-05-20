import types from "../actions/types";

const initialState = {
  activeDrivers: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_ACTIVE_DRIVERS:
      return { ...state, ...payload, isLoading: true };
    case types.GET_ACTIVE_DRIVERS_FAIL:
      return { ...state, error: payload.error, isLoading: false };
    case types.GET_ACTIVE_DRIVERS_SUCCESS:
      return {
        ...state,
        activeDrivers: [...payload.drivers],
        isLoading: false,
      };
    case "DISMISS_DRIVERS_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
