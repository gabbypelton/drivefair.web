import types from "./types";
import Axios from "axios";

export const addToCart = (menuItem, modifications) => (dispatch) => {
  dispatch({ type: types.ADD_TO_CART, payload: { menuItem, modifications } });
  dispatch(saveCart());
};

export const removeFromCart = (key) => (dispatch) => {
  dispatch({ type: types.REMOVE_FROM_CART, payload: { key } });
  dispatch(saveCart());
};

export const sendOrder = (orderItems, vendorId, method) => async (dispatch) => {
  try {
    dispatch({ type: types.SEND_ORDER });
    const sentOrder = await Axios.post("/orders/new", {
      orderItems,
      vendorId,
      method,
    });
    dispatch({ type: types.SEND_ORDER_SUCCESS, payload: sentOrder.data });
  } catch (error) {
    dispatch({ type: types.SEND_ORDER_ERROR, error });
  }
};

export const saveCart = () => (dispatch) => {
  dispatch({ type: types.SAVE_CART });
};
