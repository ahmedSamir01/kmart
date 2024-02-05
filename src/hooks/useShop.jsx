import { SHOP_API_URL } from "constants";
import { request } from "server/axios-utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

const _limit = 6;

const fetchShopList = ({ queryKey }) => {
  const pageNumber = queryKey[1];
  return request({
    url: SHOP_API_URL,
    params: { _limit, _page: pageNumber },
  });
};
const fetchShopItem = ({ queryKey }) => {
  const itemId = queryKey[1];
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
export function useShopItem({ id, pageNumber }) {
  const queryClient = useQueryClient();

  return useQuery(["shop-item", id], fetchShopItem, {
    select: (data) => data.data,
    // staleTime: 10000,
    initialData: () => {
      const item = queryClient
        .getQueryData(["shop-list", pageNumber])
        ?.data?.find((li) => li.id === parseInt(id));
      return item ? { data: item } : undefined;
    },
  });
}
export function useMutateShopList() {
  return useMutation("shop-list", mutateShopList, {
    onMutate: () => {},
    onError: () => {},
    onSettled: () => {},
  });
}
