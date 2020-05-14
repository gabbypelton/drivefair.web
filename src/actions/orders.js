import types from "./types";
import Axios from "axios";

export const getActiveOrders = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ACTIVE_ORDERS });
    const response = await Axios.get("/orders/active");
    dispatch({ type: types.GET_ACTIVE_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_ACTIVE_ORDERS_FAIL, payload: { error } });
  }
};

export const getReadyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_READY_ORDERS });
    const response = await Axios.get("/orders/ready");
    dispatch({
      type: types.GET_READY_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_READY_ORDERS_FAIL, payload: { error } });
  }
};

export const getOrderHistory = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_HISTORY });
    const response = await Axios.get("/orders/history");
    dispatch({
      type: types.GET_ORDER_HISTORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_HISTORY_FAIL, payload: { error } });
  }
};

export const acceptOrder = ({
  orderId,
  selectedDriverId,
  timeToReady,
}) => async (dispatch) => {
  try {
    dispatch({ type: types.ACCEPT_ORDER });
    const response = await Axios.post("/orders/acceptOrder", {
      orderId,
      selectedDriverId,
      timeToReady,
    });
    dispatch({ type: types.ACCEPT_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.ACCEPT_ORDER_FAIL, payload: { error } });
  }
};

export const readyOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: types.READY_ORDER });
    const response = await Axios.post("/orders/readyOrder", { orderId });
    dispatch({ type: types.READY_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.READY_ORDER_FAIL, payload: { error } });
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

export const refundOrder = ({ orderId, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.REFUND_ORDER });
    const response = await Axios.post("/orders/refundOrder", {
      orderId,
      password,
    });
    dispatch({ type: types.REFUND_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.REFUND_ORDER_FAIL, payload: { error } });
  }
};
