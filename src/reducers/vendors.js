import types from "../actions/types";


const initialState = {

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case types.NEW_VENDOR:
    return { ...state, ...payload }

  default:
    return state
  }
}
