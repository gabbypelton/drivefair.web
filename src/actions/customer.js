import types from "./types";

export const getCustomer = (payload) => ({
  type: types.GET_CUSTOMER,
  payload
})

export const newCustomer = (payload) => ({
  type: types.NEW_CUSTOMER,
  payload
})
  