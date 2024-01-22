import { CART_API_URL } from "constants";
import { request } from "server/axios-utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

const fetchCartList = () => {
  return request({ url: CART_API_URL });
};
const fetchCartItem = ({ queryKey }) => {
  const itemId = queryKey[1];
  return request({ url: `${CART_API_URL}/${itemId}` });
};
const mutateCartList = (item) => {
  return request({ url: CART_API_URL, method: "post", data: item });
};

export function useCartList() {
  return useQuery("cart-list", fetchCartList, {});
}
export function useCartItem(itemId) {
  return useQuery(["cart-item", itemId], fetchCartItem, {
    select: (data) => data.data,
    staleTime: 10000,
  });
}
export function useMutateCartList() {
  return useMutation("cart-list", mutateCartList, {
    onMutate: () => {},
    onError: () => {},
    onSettled: () => {},
  });
}
