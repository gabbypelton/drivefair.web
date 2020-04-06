import Axios from "axios";
import types from "./types";

export const loginCustomer = ({email, password}) => async (dispatch) => {
  dispatch({ type: types.LOG_IN });
  try {
    const authResponse = await Axios.post("/customers/login", {email, password});
    const { token } = authResponse.data;
    localStorage.clear();
    localStorage.setItem('authToken', token);
    dispatch({ type: types.LOG_IN_SUCCESS, payload: authResponse.data });
  } catch (error) {
    dispatch({ type: types.LOG_IN_FAIL, error });
  }
};

export const loginVendor = ({email, password}) => async (dispatch) => {
  dispatch({ type: types.LOG_IN });
  try {
    const authResponse = await Axios.post("/vendors/login", {email, password});
    const { token } = authResponse.data;
    localStorage.clear();
    localStorage.setItem('authToken', token);
    dispatch({ type: types.LOG_IN_SUCCESS, payload: authResponse.data });
  } catch (error) {
    dispatch({ type: types.LOG_IN_FAIL, error });
  }
};
