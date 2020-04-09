import types from "./types";
import Axios from "axios";

export const addToCart = (menuItem, modifications) => dispatch => {
  dispatch({ type: types.ADD_TO_CART, payload: {menuItem, modifications} });
  dispatch(saveCart());
};

export const sendOrder = (orderId, modifications) => (dispatch) => {};

export const saveCart = () => dispatch => {
  dispatch({ type: types.SAVE_CART });
}
