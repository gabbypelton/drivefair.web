import types from "../actions/types";

const initialState = {
  activeDrivers: [],
  isLoading: false,
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

    default:
      return state;
  }
};
