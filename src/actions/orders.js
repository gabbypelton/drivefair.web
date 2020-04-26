import types from "./types";
import Axios from "axios";

export const getActiveOrders = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ACTIVE_ORDERS });
    const response = await Axios.get("/orders/activeOrders");
    dispatch({ type: types.GET_ACTIVE_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_ACTIVE_ORDERS_FAIL, payload: { error } });
  }
};

export const completeOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: types.COMPLETE_ORDER });
    const response = await Axios.post("/orders/completeOrder", { orderId });
    dispatch({ type: types.COMPLETE_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.COMPLETE_ORDER_FAIL, payload: { error } });
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELIVER_ORDER });
    const response = await Axios.post("/orders/deliverOrder", { orderId });
    dispatch({ type: types.DELIVER_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.DELIVER_ORDER_FAIL, payload: { error } });
  }
};

export const refundOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: types.REFUND });
    const response = await Axios.post("/orders/refundOrder", { orderId });
    dispatch({ type: types.REFUND_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.REFUND_FAIL, payload: { error } });
  }
};
