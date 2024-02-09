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
const mutateShopList = ({ options, onSuccess, onError }) => {
  return request(
    {
      url: `${SHOP_API_URL}/${options?.body?.id}`,
      method: options?.method,
    },
    { delay: true }
  )
    .then(onSuccess)
    .catch(onError);
};

export function useShopList(pageNumber) {
  return useQuery(["shop-list", pageNumber], fetchShopList, {
    select: (data) => data.data,
    staleTime: 10000,
    keepPreviousData: true,
    refetchInterval: 30000,
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
  const queryClient = useQueryClient();

  return useMutation(mutateShopList, {
    onSuccess: () => {
      queryClient.invalidateQueries("shop-list");
    },
  });
}
