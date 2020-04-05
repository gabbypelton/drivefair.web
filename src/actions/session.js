import Axios from "axios";
import types from "./types";

export const loginCustomer = ({email, password}) => async (dispatch) => {
  dispatch({ type: types.LOGIN_CUSTOMER });
  try {
    const authResponse = await Axios.post("/customers/login", {email, password});
    const { token } = authResponse.data;
    localStorage.setItem('authToken', token)
    dispatch({ type: types.LOGIN_CUSTOMER_SUCCESS, payload: authResponse });
  } catch (error) {
    dispatch({ type: types.LOGIN_CUSTOMER_FAIL, error });
  }
};

export const loginVendor = ({email, password}) => async (dispatch) => {
  dispatch({ type: types.LOGIN_VENDOR });
  try {
    const authResponse = await Axios.post("/vendors/login", {email, password});
    const { token } = authResponse.data;
    localStorage.setItem('authToken', token)
    dispatch({ type: types.LOGIN_VENDOR_SUCCESS, payload: authResponse });
  } catch (error) {
    dispatch({ type: types.LOGIN_VENDOR_FAIL, error });
  }
};
