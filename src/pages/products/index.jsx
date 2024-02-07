import Card from "components/card";
import { useShopList } from "hooks/useShop";
import { useState } from "react";
import Spinner from "shared/Spinner";

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

  const handlePagination = ({ type }) => {
    const newPage = type === "next" ? pageNumber + 1 : pageNumber - 1;
    window.history.pushState(null, null, `?page=${newPage}`);
    setPageNumber(newPage);
  };

  return (
    <section className="mt-5">
      <div className="container-fluid">
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
          <div className="pagination-bar px-4">
            <button
              onClick={() => handlePagination({ type: "prev" })}
              disabled={pageNumber === 1}
            >
              Prev Page
            </button>
            <button
              onClick={() => handlePagination({ type: "next" })}
              disabled={!data?.length}
            >
              Next Page
            </button>{" "}
            {isFetching && <Spinner size="sm" />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
