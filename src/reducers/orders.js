import types from "../actions/types";

const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case types.GET_ORDERS:
    return { ...state, ...payload }

  default:
    return state
  }
}
