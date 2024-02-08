import Paginator from "components/paginator";
import Card from "components/card";
import { useShopList } from "hooks/useShop";
import { useState } from "react";

function Products() {
  const searchParams = new URLSearchParams(window.location.search);
  const page = parseInt(searchParams.get("page"));
  const [pageNumber, setPageNumber] = useState(page || 1);
  const { isLoading, data, isError, error, isFetching } =
    useShopList(pageNumber);

  if (isLoading) {
    return <h2>loading...</h2>;
  }
  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <section className="mt-5 products-section">
      <div className="row w-100 g-0">
        {data?.length ? (
          data.map((item) => (
            <div className="cart-item col-md-4 col px-4 mb-5" key={item.id}>
              <Card
                {...item}
                readOnly={true}
                isAdmin={false}
                pageNumber={pageNumber}
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

export default Products;
