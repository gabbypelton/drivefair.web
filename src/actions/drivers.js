import Axios from "axios";

import types from "./types";

export const getActiveDrivers = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ACTIVE_DRIVERS });
    const response = await Axios.get("/drivers/active");
    dispatch({
      type: types.GET_ACTIVE_DRIVERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_ACTIVE_DRIVERS_FAIL,
      payload: error.response ? error.response.data : { error },
    });
  }
};
