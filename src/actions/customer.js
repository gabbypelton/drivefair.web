import types from "./types";
import Axios from "axios";
import { setBearerToken } from "../services/http";

export const newCustomer = (details) => async (dispatch) => {
  dispatch({ type: types.NEW_CUSTOMER });
  try {
    const response = await Axios.post("/customers/register", details);
    localStorage.clear();
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("userType", "vendor");
    setBearerToken(response.data.token);
    dispatch({ type: types.NEW_CUSTOMER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.NEW_CUSTOMER_FAIL, error });
  }
};

export const editAddress = (addressId, changes) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_ADDRESS });
    const response = await Axios.post("/customers/editAddress", {
      addressId,
      changes,
    });
    dispatch({ type: types.EDIT_ADDRESS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.EDIT_ADDRESS_FAIL, payload: { error } });
  }
};

export const addAddress = (properties) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_ADDRESS });
    const response = await Axios.post("/customers/addAddress", properties);
    dispatch({ type: types.ADD_ADDRESS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.ADD_ADDRESS_FAIL, payload: { error } });
  }
};

export const removeAddress = (addressId) => async (dispatch) => {
  try {
    dispatch({ type: types.REMOVE_ADDRESS });
    const response = await Axios.post("/customers/removeAddress", {
      addressId,
    });
    dispatch({
      type: types.REMOVE_ADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.REMOVE_ADDRESS_FAIL, payload: { error } });
  }
};

export const selectAddress = (addressId) => async (dispatch) => {
  try {
    dispatch({ type: types.SELECT_ADDRESS });
    const response = await Axios.post("/customers/selectAddress", {
      addressId,
    });
    dispatch({
      type: types.SELECT_ADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.SELECT_ADDRESS_FAIL, payload: { error } });
  }
};

export const getAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ADDRESSES });
    const response = await Axios.get("/customers/addresses");
    dispatch({
      type: types.GET_ADDRESSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ADDRESSES_FAIL, payload: { error } });
  }
};
