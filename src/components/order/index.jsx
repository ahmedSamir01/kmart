/* eslint-disable react-hooks/exhaustive-deps */
import { useMutateCartItem } from "hooks/useCart";
import Spinner from "shared/Spinner";
// import { useQueryClient } from "react-query";

function Order({ itemData }) {
  const { count } = itemData;

  const { mutate: UpdateProductCount, isLoading } = useMutateCartItem();

  const handleAdd = () => {
    const options = {
      method: "PUT",
      body: { ...itemData, count: count + 1 },
    };
    UpdateProductCount({
      options,
      onError: (err) => console.error(err),
    });
  };

  const handleRemove = () => {
    // const handleResponse = {
    //   onSuccess: () => closeSpinner(() => setCount((count) => count - 1)),
    //   onError: (err) => console.error(err),
    // };
    // if (count > 1) {
    //   setIsloading(true);
    //   UpdateProductCount({
    //     options: {
    //       method: "PUT",
    //       body: { ...data, count: count - 1 },
    //     },
    //     ...handleResponse,
    //   });
    // } else if (count === 1) {
    //   setIsloading(true);
    //   UpdateProductCount({
    //     options: { method: "DELETE", body: { ...data, count: count - 1 } },
    //     ...handleResponse,
    //   });
    // }
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
      <span className="me-3">{count}</span>
      {isLoading ? <Spinner size="sm" /> : null}
    </>
  );
}

export default Order;

// const handleSuccess = (response, updateCount) => {
//   queryClient.setQueryData(["cart-item", itemData?.code], (oldQueryData) => {
//     console.log({ ...oldQueryData, data: [response?.data] });
//     return {
//       ...oldQueryData,
//       data: [response?.data],
//     };
//   });
//   console.log(response);

//   updateCount();
// };
