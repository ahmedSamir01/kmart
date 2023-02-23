import { GET_PRODUCTS } from "../actions/productsActions";

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}
