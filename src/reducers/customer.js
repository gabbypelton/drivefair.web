import types from "../actions/types";

const initialState = {
  addresses: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "NEW_CUSTOMER":
      return { ...state, ...payload };
    case types.ADD_ADDRESS:
    case types.REMOVE_ADDRESS:
    case types.EDIT_ADDRESS:
    case types.GET_ADDRESSES:
      return { ...state, isLoading: true };
    case types.ADD_ADDRESS_FAIL:
    case types.REMOVE_ADDRESS_FAIL:
    case types.EDIT_ADDRESS_FAIL:
    case types.GET_ADDRESSES_FAIL:
      return { ...state, isLoading: false };
    case types.ADD_ADDRESS_SUCCESS:
    case types.REMOVE_ADDRESS_SUCCESS:
    case types.EDIT_ADDRESS_SUCCESS:
    case types.GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: [...payload.addresses],
        isLoading: false,
      };
    default:
      return state;
  }
};
