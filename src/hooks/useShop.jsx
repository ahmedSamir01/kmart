import { SHOP_API_URL } from "constants";
import { request } from "server/axios-utils";
import { useMutation, useQuery } from "react-query";

const fetchShopList = () => {
  return request({ url: SHOP_API_URL });
};
const fetchShopItem = (itemId) => {
  return request({ url: `${SHOP_API_URL}/${itemId}` });
};
const mutateShopList = (item) => {
  return request({ url: SHOP_API_URL, method: "post", data: item });
};

export function useShopList() {
  return useQuery("shop-list", fetchShopList, { select: (data) => data.data });
}
export function useShopItem(itemId) {
  return useQuery("shop-item", [fetchShopItem, itemId], {});
}
export function useMutateShopList() {
  return useMutation("shop-list", mutateShopList, {
    onMutate: () => {},
    onError: () => {},
    onSettled: () => {},
  });
}
