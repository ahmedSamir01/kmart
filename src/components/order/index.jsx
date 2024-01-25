import { useCartItem } from "hooks/useCart";
import { useEffect, useState } from "react";
import FetchData from "server/FetchData";
import Spinner from "shared/Spinner";

function Order({ itemData }) {
  const [count, setCount] = useState(0);
  const [isloading, setIsloading] = useState(false);

  const { data } = useCartItem(itemData?.code);

  useEffect(() => {
    data?.count && setCount(data.count);
  }, [data?.count]);

  function closeSpinner(counterSet) {
    setTimeout(() => {
      setIsloading(false);
      counterSet();
    }, 1000);
  }

  const handleAdd = () => {
    setIsloading(true);

    const options = {
      method: count ? "PUT" : "POST",
      body: JSON.stringify({
        ...data,
        count: count ? count + 1 : 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    FetchData(count ? `/shopping-items/${data.id}` : `/shopping-items`, options)
      .then(() => closeSpinner(() => setCount((count) => count + 1)))
      .catch((err) => console.error(err));
  };

  const handleRemove = () => {
    if (count > 1) {
      setIsloading(true);
      const options = {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          count: count - 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      FetchData(`/shopping-items/${data.id}`, options)
        .then(() => {
          closeSpinner(() => setCount((count) => count - 1));
        })
        .catch((err) => console.error(err));
    } else if (count === 1) {
      setIsloading(true);
      FetchData(`/shopping-items/${data.id}`, { method: "DELETE" })
        .then(() => {
          closeSpinner(() => setCount((count) => count - 1));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <button
        disabled={isloading}
        className="btn px-2 py-1 border me-2 bg-success"
        onClick={handleAdd}
      >
        <i className="fa fa-plus text-white" />
      </button>
      <button
        disabled={isloading}
        className="btn px-2 py-1 border me-3 bg-danger"
        onClick={handleRemove}
      >
        <i className="fa fa-minus text-white" />
      </button>
      <span>{count}</span>
      {isloading && <Spinner size="sm" />}
    </>
  );
}

export default Order;
