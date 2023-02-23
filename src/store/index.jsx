import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./reducers/cartReducer";
import productsReducer from "./reducers/productsReducers";

const allReducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
);

export default store;
