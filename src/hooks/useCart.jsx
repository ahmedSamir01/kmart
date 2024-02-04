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
const mutateCartItem = ({ options, onSuccess, onError }) => {
  return request(
    {
      url:
        options?.method === "POST"
          ? `${CART_API_URL}`
          : `${CART_API_URL}/${options?.body?.id}`,
      method: options?.method,
      data: options?.body,
    },
    { delay: true }
  )
    .then(onSuccess)
    .catch(onError);
};

export function useCartList() {
  return useQuery("cart-list", fetchCartList, {});
}
export function useCartItem(itemCode) {
  return useQuery(["cart-item", itemCode], fetchCartItem, {
    select: (data) => data.data[0],
  });
}
export function useMutateCartItem() {
  const queryClient = useQueryClient();
  return useMutation(mutateCartItem, {
    onSuccess: (item) => {
      // queryClient.invalidateQueries("cart-list");
      const cartList = queryClient.getQueryData("cart-list");

      // Iterate through pages and update the item if found
      if (cartList && Array.isArray(cartList.pages)) {
        const updatedPages = cartList.pages.map((page) => {
          if (page.data) {
            const updatedData = page.data.map((existingItem) =>
              existingItem.id === item.data.id ? item.data : existingItem
            );
            return { data: updatedData };
          }
          return page;
        });
        console.log({ item, cartList, updatedPages });
        // Update the query data with the modified pages
        queryClient.setQueryData("cart-list", (prevData) => ({
          pages: updatedPages,
          pageParams: prevData.pageParams,
        }));
      }
    },
  });
}
