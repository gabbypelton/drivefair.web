import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import customer from "./customer";
import orders from "./orders";
import vendor from "./vendor";
import session from "./session";
import cart from "./cart";
import menu from "./menu";
import drivers from "./drivers";

const rootReducer = combineReducers({
  customer,
  menu,
  orders,
  vendor,
  session,
  cart,
  drivers
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

export default store;