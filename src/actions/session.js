import Axios from "axios";
import types from "./types";
import { setBearerToken } from "../services/http";

export const loginCustomer = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOG_IN });
  try {
    const response = await Axios.post("/customers/login", {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.clear();
    localStorage.setItem("authToken", token);
    localStorage.setItem("userType", "customer");
    setBearerToken(token);
    dispatch(loginWithToken(token, "customer"));
  } catch (error) {
    dispatch({ type: types.LOG_IN_FAIL, payload: { error } });
  }
};

export const loginVendor = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOG_IN });
  try {
    const response = await Axios.post("/vendors/login", {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.clear();
    localStorage.setItem("authToken", token);
    localStorage.setItem("userType", "vendor");
    setBearerToken(token);
    dispatch(loginWithToken(token, "vendor"));
  } catch (error) {
    dispatch({ type: types.LOG_IN_FAIL, payload: { error } });
  }
};

export const loginWithToken = (token, userType) => async (dispatch) => {
  dispatch({ type: types.LOG_IN });
  try {
    setBearerToken(token);
    const response = await Axios.get(`/${userType}s/me`);
    if (!response.data || !response.data.profile) {
      localStorage.clear();
      dispatch({ type: types.LOG_IN_FAIL, payload: { ...response.data } });
    }
    dispatch({
      type: types.LOG_IN_SUCCESS,
      payload: { ...response.data, userType, token },
    });
  } catch (error) {
    localStorage.clear();
    dispatch({ type: types.LOG_IN_FAIL, payload: { error } });
  }
};

export const sendConfirmationEmail = (userType) => async (dispatch) => {
  dispatch({ type: types.SEND_CONFIRMATION_EMAIL });
  try {
    const response = await Axios.post(`/${userType}s/sendConfirmationEmail`);
    dispatch({
      type: types.SEND_CONFIRMATION_EMAIL_SUCCESS,
      payload: { ...response },
    });
  } catch (error) {
    dispatch({ type: types.SEND_CONFIRMATION_EMAIL_FAIL, payload: { error } });
  }
};

export const logout = () => (dispatch) => {
  setBearerToken("");
  localStorage.clear();
  dispatch({ type: types.LOG_OUT });
};
