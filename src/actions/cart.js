import types from "./types";
import Axios from "axios";

export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART });
    const response = await Axios.get("/orders/cart");
    dispatch({ type: types.GET_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_CART_FAIL, payload: { error } });
  }
};

export const addToCart = (menuItem, modifications, price, vendorId) => async (
  dispatch
) => {
  const orderItem = { menuItem, modifications, price };
  try {
    dispatch({ type: types.ADD_TO_CART });
    const response = await Axios.post("/orders/addToCart", {
      orderItem,
      vendorId,
    });
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.ADD_TO_CART_FAIL, payload: { error } });
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
    dispatch({ type: types.REMOVE_FROM_CART_FAIL, payload: { error } });
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
      payload: { orderMethod },
    });
  } catch (error) {
    dispatch({ type: types.TOGGLE_ORDER_METHOD_FAIL, payload: { error } });
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
    dispatch({ type: types.PAY_FAIL, payload: { error } });
  }
};

export const toggleReadyToPay = (readyToPay) => (dispatch) => {
  dispatch({ type: types.TOGGLE_READY_TO_PAY, payload: { readyToPay } });
};
