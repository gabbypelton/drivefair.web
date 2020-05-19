import types from "./types";
import { getMenu } from "./menu";
import Axios from "axios";

import { setBearerToken } from "../services/http";

export const newVendor = (details) => async (dispatch) => {
  dispatch({ type: types.NEW_VENDOR });
  try {
    const response = await Axios.post("/vendors/register", details);
    localStorage.clear();
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("userType", "vendor");
    setBearerToken(response.data.token);
    dispatch({ type: types.NEW_VENDOR_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.NEW_VENDOR_FAIL, payload: { error } });
  }
};

export const getVendors = () => async (dispatch) => {
  dispatch({ type: types.GET_VENDORS });
  try {
    const response = await Axios.get("/vendors");
    dispatch({ type: types.GET_VENDORS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_VENDORS_FAIL, payload: { error } });
  }
};

export const selectVendor = (vendorId) => (dispatch) => {
  localStorage.setItem("selectedVendorId", vendorId);
  dispatch(getMenu(vendorId));
  dispatch({ type: types.SELECT_VENDOR, payload: { vendorId } });
};

export const editVendor = (changes) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_VENDOR });
    const response = await Axios.post("/vendors/editVendor", changes);
    dispatch({ type: types.EDIT_VENDOR_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.EDIT_VENDOR_FAIL, payload: { error } });
  }
};
