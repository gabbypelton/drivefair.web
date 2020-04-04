import { createStore, combineReducers } from "redux";
import customer from "./customer";
import orders from "./orders";
import vendors from "./vendors";
import session from "./session";

const rootReducer = combineReducers({
  customer,
  orders,
  vendors,
  session
})

export default createStore(rootReducer);
