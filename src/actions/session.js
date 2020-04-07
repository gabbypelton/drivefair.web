import Axios from "axios";
import types from "./types";
import { setBearerToken } from "../services/http";

export const loginCustomer = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOG_IN });
  try {
    const authResponse = await Axios.post("/customers/login", {
      email,
      password,
    });
    const { token } = authResponse.data;
    localStorage.clear();
    localStorage.setItem("authToken", token);
    localStorage.setItem("userType", "customer");
    setBearerToken(token);
    dispatch({ type: types.LOG_IN_SUCCESS, payload: authResponse.data });
  } catch (error) {
    dispatch({ type: types.LOG_IN_FAIL, error });
  }
};

export const loginVendor = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOG_IN });
  try {
    const authResponse = await Axios.post("/vendors/login", {
      email,
      password,
    });
    const { token } = authResponse.data;
    localStorage.clear();
    localStorage.setItem("authToken", token);
    localStorage.setItem("userType", "vendor");
    setBearerToken(token);
    dispatch({ type: types.LOG_IN_SUCCESS, payload: authResponse.data });
  } catch (error) {
    dispatch({ type: types.LOG_IN_FAIL, error });
  }
};

export const loginWithToken = (token, userType) => async (dispatch) => {
  dispatch({ type: types.LOG_IN });
  try {
    setBearerToken(token);
    const authResponse = await Axios.get(`/${userType}s/me`);
    dispatch({ type: types.LOG_IN_SUCCESS, payload: authResponse.data });
  } catch (error) {
    dispatch({ type: types.LOG_IN_FAIL, error });
  }
};

export const logout = ()  => dispatch => {
  setBearerToken("");
  localStorage.clear();
  dispatch({ type: types.LOG_OUT})
}