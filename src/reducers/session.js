import types from "../actions/types";

const initialState = {
  isLoggedIn: false,
  inProgress: false,
  error: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOG_IN:
      return { ...state, inProgress: true };
    case types.LOG_IN_FAIL:
      return { ...state, inProgress: false, isLoggedIn: false };
    case types.LOG_IN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        inProgress: false,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};
