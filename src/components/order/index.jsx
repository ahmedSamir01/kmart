import { useCartItem, useMutateCartItem } from "hooks/useCart";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import Spinner from "shared/Spinner";

function Order({ itemData }) {
  // const queryClient = useQueryClient();
  const [count, setCount] = useState(0);
  const { data } = useCartItem(itemData?.code);

  // Init item count
  useEffect(() => {
    data?.count && setCount(data.count);
  }, [data?.count]);

  const { mutate: UpdateProductCount, isLoading } = useMutateCartItem(
    itemData?.code
  );

  const handleSuccess = (response, updateCount) => {
    // queryClient.setQueryData(["cart-item", itemData?.code], (oldQueryData) => {
    //   console.log({ ...oldQueryData, data: [response?.data] });
    //   return {
    //     ...oldQueryData,
    //     data: [response?.data],
    //   };
    // });
    // console.log(response);
    updateCount();
  };

  const handleAdd = () => {
    // general shop product data
    const { code, title, description, image } = itemData;

    // request body
    const productBody = count ? data : { code, title, description, image };

    const options = {
      method: count ? "PUT" : "POST",
      body: { ...productBody, count: count + 1 },
    };
    UpdateProductCount({
      options,
      onSuccess: (response) =>
        handleSuccess(response, () => setCount((count) => count + 1)),
      onError: (err) => console.error(err),
    });
  };

  const handleRemove = () => {
    const handleResponse = {
      onSuccess: (response) =>
        handleSuccess(response, () => setCount((count) => count - 1)),
      onError: (err) => console.error(err),
    };
    if (count > 1) {
      UpdateProductCount({
        options: {
          method: "PUT",
          body: { ...data, count: count - 1 },
        },
        ...handleResponse,
      });
    } else if (count === 1) {
      UpdateProductCount({
        options: { method: "DELETE", body: { ...data, count: count - 1 } },
        ...handleResponse,
      });
    }
  };

  return (
    <>
      <button
        disabled={isLoading}
        className="btn px-2 py-1 border me-2 bg-success"
        onClick={handleAdd}
      >
        <i className="fa fa-plus text-white" />
      </button>
      <button
        disabled={isLoading}
        className="btn px-2 py-1 border me-3 bg-danger"
        onClick={handleRemove}
      >
        <i className="fa fa-minus text-white" />
      </button>
      <span>{count}</span>
      {isLoading && <Spinner size="sm" />}
    </>
  );
}

export default Order;
