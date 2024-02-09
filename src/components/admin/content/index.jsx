import SweetAlert from "components/sweetAlert";
import Card from "components/card";
import { useMutateShopList, useShopList } from "hooks/useShop";
import { useState } from "react";
import Paginator from "components/paginator";

export default function Content() {
  const searchParams = new URLSearchParams(window.location.search);
  const page = parseInt(searchParams.get("page"));
  const [pageNumber, setPageNumber] = useState(page || 1);

  const { isLoading, data, isError, error, isFetching } =
    useShopList(pageNumber);

  const { mutate: RemoveProduct } = useMutateShopList(pageNumber);

  if (isLoading) {
    return <h2>loading...</h2>;
  }
  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  const deleteProduct = (id, setIsLoading) => {
    setIsLoading(true);
    RemoveProduct({
      options: {
        method: "DELETE",
        body: { id },
      },
      onSuccess: () => SweetAlert(() => {}),
      onError: (err) => console.error(err),
      finally: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <section className="h-100">
      <div className="row w-100 h-100">
        {data?.length ? (
          data.map((item) => (
            <div className="cart-item col-md-4 col px-4 mb-5" key={item.id}>
              <Card
                {...item}
                readOnly={false}
                isAdmin={true}
                handleDelete={deleteProduct}
              />
            </div>
          ))
        ) : (
          <p className="px-4">No data to show</p>
        )}
        <Paginator
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          isFetching={isFetching}
          data={data}
        />
      </div>
    </section>
  );
}
