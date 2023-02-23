import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REMOVE_PRODUCTS,
} from "../actions/cartActions";

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
      const foundedProduct = state.find((e) => e.id === action.payload.id);
      if (foundedProduct) {
        const newList = state.map((e) => {
          if (e.id === action.payload.id) {
            return { ...foundedProduct, quantity: foundedProduct.quantity + 1 };
          } else {
            return e;
          }
        });
        return newList;
      } else {
        return state.concat([{ ...action.payload, quantity: 1 }]);
      }
    case REMOVE_PRODUCT:
      return state.filter((e) => e.id !== action.payload);
    case REMOVE_PRODUCTS:
      return [];
    default:
      return state;
  }
}
