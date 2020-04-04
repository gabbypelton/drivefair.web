const actionsObj = {};
const asyncActions = [
  "GET_CUSTOMER",
  "NEW_CUSTOMER",
  "NEW_ORDER",
  "ADD_MENU_ITEM",
  "REMOVE_MENU_ITEM",
  "ADD_ORDER_ITEM",
  "REMOVE_ORDER_ITEM",
  "LOG_IN",
];
const syncActions = [
  "LOGOUT"
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
