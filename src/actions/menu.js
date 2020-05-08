import Axios from "axios";
import types from "./types";

export const editMenuItem = (menuItemId, changes) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_MENU_ITEM });
    const response = await Axios.post("/vendors/editMenuItem", {
      menuItemId,
      changes,
    });
    if (response.data.error) {
      return dispatch({
        type: types.EDIT_MENU_ITEM_FAIL,
        payload: { error: response.data.error },
      });
    }
    dispatch({ type: types.EDIT_MENU_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.EDIT_MENU_ITEM_FAIL, payload: { error } });
  }
};

export const addMenuItem = (properties) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_MENU_ITEM });
    const response = await Axios.post("/vendors/addMenuItem", properties);
    if (response.data.error) {
      return dispatch({
        type: types.EDIT_MENU_ITEM_FAIL,
        payload: { error: response.data.error },
      });
    }
    dispatch({ type: types.ADD_MENU_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.ADD_MENU_ITEM_FAIL, payload: { error } });
  }
};

export const removeMenuItem = (menuItemId) => async (dispatch) => {
  try {
    dispatch({ type: types.REMOVE_MENU_ITEM });
    const response = await Axios.post("/vendors/removeMenuItem", {
      menuItemId,
    });
    if (response.data.error) {
      return dispatch({
        type: types.EDIT_MENU_ITEM_FAIL,
        payload: { error: response.data.error },
      });
    }
    dispatch({ type: types.REMOVE_MENU_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.REMOVE_MENU_ITEM_FAIL, payload: { error } });
  }
};

export const editModification = (modificationId, changes) => async (
  dispatch
) => {
  try {
    dispatch({ type: types.EDIT_MODIFICATION });
    const response = await Axios.post("/vendors/editModification", {
      modificationId,
      changes,
    });
    if (response.data.error) {
      return dispatch({
        type: types.EDIT_MENU_ITEM_FAIL,
        payload: { error: response.data.error },
      });
    }
    dispatch({ type: types.EDIT_MODIFICATION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.EDIT_MODIFICATION_FAIL, payload: { error } });
  }
};

export const addModification = (properties) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_MODIFICATION });
    const response = await Axios.post("/vendors/addModification", properties);
    if (response.data.error) {
      return dispatch({
        type: types.EDIT_MENU_ITEM_FAIL,
        payload: { error: response.data.error },
      });
    }
    dispatch({ type: types.ADD_MODIFICATION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.ADD_MODIFICATION_FAIL, payload: { error } });
  }
};

export const removeModification = (modificationId) => async (dispatch) => {
  try {
    dispatch({ type: types.REMOVE_MODIFICATION });
    const response = await Axios.post("/vendors/removeModification", {
      modificationId,
    });
    dispatch({
      type: types.REMOVE_MODIFICATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.REMOVE_MODIFICATION_FAIL, payload: { error } });
  }
};

export const getMenu = (vendorId) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_MENU });
    const response = await Axios.get(
      `/vendors/menu?${vendorId ? "vendorId=" + vendorId : ""}`
    );
    dispatch({ type: types.GET_MENU_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_MENU_FAIL, payload: { error } });
  }
};

export const searchMenu = (searchString) => async (dispatch) => {
  dispatch({ type: types.SEARCH_MENU, payload: { searchString } });
};
