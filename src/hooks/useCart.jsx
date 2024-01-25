import { CART_API_URL } from "constants";
import { request } from "server/axios-utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchCartList = () => {
  return request({ url: CART_API_URL });
};
const fetchCartItem = ({ queryKey }) => {
  const itemCode = queryKey[1];
  return request({ url: `${CART_API_URL}/?code=${itemCode}` });
};
const mutateCartList = ({ options, onSuccess, onError }) => {
  console.log({ options, onSuccess, onError });
  return request({
    url:
      options?.method === "POST"
        ? `${CART_API_URL}`
        : `${CART_API_URL}/${options?.body?.id}`,
    method: options?.method,
    data: options?.body,
  })
    .then(onSuccess)
    .catch(onError);
};

export function useCartList() {
  return useQuery("cart-list", fetchCartList, {});
}
export function useCartItem(itemCode) {
  return useQuery(["cart-item", itemCode], fetchCartItem, {
    select: (data) => data.data[0],
    staleTime: 10000,
  });
}
export function useMutateCartList() {
  return useMutation("cart-list", mutateCartList);
}
