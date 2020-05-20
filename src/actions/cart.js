import types from "./types";
import Axios from "axios";

export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART });
    const response = await Axios.get("/orders/cart");
    dispatch({ type: types.GET_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: types.GET_CART_FAIL,
      payload: error.response ? error.response.data : { error },
    });
  }
};

export const addToCart = (menuItemId, modifications, vendorId) => async (
  dispatch
) => {
  try {
    dispatch({ type: types.ADD_TO_CART });
    const response = await Axios.post("/orders/addToCart", {
      menuItemId,
      modifications,
      vendorId,
    });
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: types.ADD_TO_CART_FAIL,
      payload: error.response ? error.response.data : { error },
    });
  }
};

export const removeFromCart = (orderItemId) => async (dispatch) => {
  try {
    dispatch({ type: types.REMOVE_FROM_CART });
    const response = await Axios.post("/orders/removeFromCart", {
      orderItemId,
    });
    dispatch({ type: types.REMOVE_FROM_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: types.REMOVE_FROM_CART_FAIL,
      payload: error.response ? error.response.data : { error },
    });
  }
};

export const toggleOrderMethod = (orderMethod) => async (dispatch) => {
  try {
    dispatch({ type: types.TOGGLE_ORDER_METHOD });
    const response = await Axios.post("/orders/customerSetOrderMethod", {
      orderMethod,
    });
    dispatch({
      type: types.TOGGLE_ORDER_METHOD_SUCCESS,
      payload: { ...response.data, orderMethod },
    });
  } catch (error) {
    dispatch({
      type: types.TOGGLE_ORDER_METHOD_FAIL,
      payload: error.response ? error.response.data : { error },
    });
  }
};

export const setTip = (tipAmount) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_TIP });
    const response = await Axios.post("/orders/setTip", {
      tipAmount,
    });
    dispatch({
      type: types.SET_TIP_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.SET_TIP_FAIL,
      payload: error.response ? error.response.data : { error },
    });
  }
};

export const pay = (paymentDetails) => async (dispatch) => {
  try {
    dispatch({ type: types.PAY });
    const response = await Axios.post("/orders/pay", {
      paymentDetails,
    });
    dispatch({ type: types.PAY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: types.PAY_FAIL,
      payload: error.response ? error.response.data : { error },
    });
  }
};

export const toggleReadyToPay = (readyToPay) => (dispatch) => {
  dispatch({ type: types.TOGGLE_READY_TO_PAY, payload: { readyToPay } });
};
