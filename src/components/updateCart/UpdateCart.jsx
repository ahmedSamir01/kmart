import SweetAlert from "components/sweetAlert";
import { useCartItem, useMutateCartItem } from "hooks/useCart";
import React from "react";
import Spinner from "shared/Spinner";

function UpdateCart({ shopItem }) {
  const { data, isLoading, refetch } = useCartItem(shopItem?.code);
  const { mutate: UpdateProductCount } = useMutateCartItem(shopItem?.code);

  const handleClick = () => {
    const { code, title, description, image } = shopItem;
    const productBody = data || { code, title, description, image };

    const requestBody = {
      options: { method: data ? "DELETE" : "POST", body: productBody },
      onError: (err) => {
        console.error(err);
      },
      onSuccess: () => {
        SweetAlert(() => refetch());
      },
    };
    // Mutate Cart
    UpdateProductCount(requestBody);
  };

  return (
    <div className="col-md-6 align-items-center d-flex ps-5">
      <button
        onClick={handleClick}
        className={`btn btn-${
          isLoading ? "secondary" : data ? "danger" : "success"
        } px-4 py-2`}
        disabled={isLoading}
      >
        {isLoading ? (
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
