import types from "./types";
import Axios from "axios";

import { setBearerToken } from "../services/http";

export const newVendor = (details) => async (dispatch) => {
  dispatch({ type: types.NEW_VENDOR });
  try {
    const response = await Axios.post("/vendors/register", details);
    localStorage.clear();
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("sessionUri", "vendors");
    setBearerToken(response.data.token);
    dispatch({ type: types.NEW_VENDOR_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.NEW_VENDOR_FAIL, error });
  }
};

export const getVendors = () => async (dispatch) => {
  dispatch({ type: types.GET_VENDORS });
  try {
    const response = await Axios.get("/vendors");
    dispatch({ type: types.GET_VENDORS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_VENDORS_FAIL, error });
  }
};

export const selectVendor = (vendorId) => (dispatch) => {
  dispatch({ type: types.SELECT_VENDOR, payload: { vendorId } });
};
