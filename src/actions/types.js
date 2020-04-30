const actionsObj = {};

const asyncActions = [
  "ADD_MODIFICATION",
  "REMOVE_MODIFICATION",
  "EDIT_MODIFICATION",
  "ADD_MENU_ITEM",
  "REMOVE_MENU_ITEM",
  "EDIT_MENU_ITEM",
  "GET_MENU",
  "GET_CUSTOMER_PROFILE",
  "NEW_CUSTOMER",
  "NEW_VENDOR",
  "GET_VENDORS",
  "GET_VENDOR_PROFILE",
  "EDIT_VENDOR",
  "SELECT_VENDOR",
  "ADD_TO_CART",
  "UPDATE_CART",
  "REMOVE_FROM_CART",
  "SAVE_CART",
  "GET_CART",
  "REMOVE_FROM_CART",
  "PAY",
  "TOGGLE_ORDER_METHOD",
  "GET_ACTIVE_ORDERS",
  "LOG_IN",
  "SEND_CONFIRMATION_EMAIL"
];
const syncActions = ["LOG_OUT", "TOGGLE_READY_TO_PAY"];

syncActions.forEach((key) => {
  actionsObj[key] = key;
});

asyncActions.forEach((key) => {
  actionsObj[key] = key;
  actionsObj[`${key}_FAIL`] = `${key}_FAIL`;
  actionsObj[`${key}_SUCCESS`] = `${key}_SUCCESS`;
});

export default actionsObj;
