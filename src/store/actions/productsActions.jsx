export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = (e) => ({
  type: GET_PRODUCTS,
  payload: e,
});

export const fetcher = () => {
  return async (dispatch) => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    dispatch(getProducts(data));
  };
};
