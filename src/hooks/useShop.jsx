import { SHOP_API_URL } from "constants";
import { request } from "server/axios-utils";
import { useMutation, useQuery } from "react-query";

const fetchShopList = ({ queryKey }) => {
  const pageNumber = queryKey[1];
  return request({
    url: SHOP_API_URL,
    params: { _limit: 6, _page: pageNumber },
  });
};
const fetchShopItem = (itemId) => {
  return request({ url: `${SHOP_API_URL}/${itemId}` });
};
const mutateShopList = (item) => {
  return request({ url: SHOP_API_URL, method: "post", data: item });
};

export function useShopList(pageNumber) {
  return useQuery(["shop-list", pageNumber], fetchShopList, {
    select: (data) => data.data,
    staleTime: 10000,
    keepPreviousData: true,
  });
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
