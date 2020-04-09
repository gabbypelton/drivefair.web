const actionsObj = {};
const asyncActions = [
  "GET_CUSTOMER_PROFILE",
  "NEW_CUSTOMER",
  "NEW_VENDOR",
  "GET_VENDORS",
  "GET_VENDOR_PROFILE",
  "SELECT_VENDOR",
  "ADD_MENU_ITEM",
  "REMOVE_MENU_ITEM",
  "ADD_TO_CART",
  "REMOVE_FROM_CART",
  "SAVE_CART",
  "REMOVE_FROM_CART",
  "SEND_ORDER",
  "LOG_IN",
];
const syncActions = [
  "LOG_OUT"
];

syncActions.forEach((key) => {
  actionsObj[key] = key;
});

asyncActions.forEach((key) => {
  actionsObj[key] = key;
  actionsObj[`${key}_FAIL`] = `${key}_FAIL`;
  actionsObj[`${key}_SUCCESS`] = `${key}_SUCCESS`;
});

export default actionsObj;
