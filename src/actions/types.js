const actionsObj = {};
const asyncActions = [
  "GET_CUSTOMER_PROFILE",
  "NEW_CUSTOMER",
  "NEW_VENDOR",
  "GET_VENDORS",
  "GET_VENDOR_PROFILE",
  "NEW_ORDER",
  "ADD_MENU_ITEM",
  "REMOVE_MENU_ITEM",
  "ADD_ORDER_ITEM",
  "REMOVE_ORDER_ITEM",
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
