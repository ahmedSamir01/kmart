import SweetAlert from "components/sweetAlert";
import { useCartItem, useMutateCartItem } from "hooks/useCart";
import React from "react";
import Spinner from "shared/Spinner";

function UpdateCart({ shopItem }) {
  const { data, isLoading, refetch } = useCartItem(shopItem?.code);
  const { mutate: UpdateProductCount, isLoading: mutateLoading } =
    useMutateCartItem();

  const handleClick = () => {
    const { code, title, description, image } = shopItem;
    const productBody = data || { code, title, description, image, count: 1 };

    const requestBody = {
      options: { method: data ? "DELETE" : "POST", body: productBody },
      onError: (err) => {
        console.error(err);
      },
      onSuccess: async () => {
        await refetch();
        SweetAlert();
      },
    };
    // Mutate Cart
    UpdateProductCount(requestBody);
  };

  return (
    <div className="col-md-6 align-items-center d-flex ps-md-5 mt-4">
      <button
        onClick={handleClick}
        className={`update-cart-list-btn btn btn-${
          isLoading || mutateLoading ? "secondary" : data ? "danger" : "success"
        } px-4 py-2`}
        disabled={isLoading || mutateLoading}
      >
        {isLoading || mutateLoading ? (
          <Spinner size="sm" />
        ) : data ? (
          "Remove From Cart"
        ) : (
          "Add To Cart"
        )}
      </button>
    </div>
  );
}

export default UpdateCart;
