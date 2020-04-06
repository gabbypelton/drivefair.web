import types from "./types";
import Axios from "axios";

import {setBearerToken} from "../services/http";

export const newVendor = (details) => async (dispatch) => {
  dispatch({ type: types.NEW_CUSTOMER });
  try {
    const response = await Axios.post("/vendors/register", details);
    setBearerToken(response.data.token);
    dispatch({ type: types.NEW_CUSTOMER_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.NEW_CUSTOMER_FAIL, error });
  }
};