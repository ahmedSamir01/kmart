export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const REMOVE_PRODUCTS = "REMOVE_PRODUCTS";

export const addProduct = (e) => ({
  type: ADD_PRODUCT,
  payload: e,
});

export const removeProduct = (e) => ({
  type: REMOVE_PRODUCT,
  payload: e,
});

export const removeProducts = (e) => ({
  type: REMOVE_PRODUCTS,
  payload: e,
});
