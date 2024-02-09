import Card from "components/card";
import { CART_API_URL } from "constants";
import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { request } from "server/axios-utils";

const fetchCartItems = ({ pageParam = 1 }) => {
  return request({ url: `${CART_API_URL}?_limit=2&_page=${pageParam}` });
};

function Cart() {
  // data here contains a list of pages
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["cart-list"], fetchCartItems, {
    getNextPageParam: (lastPage, pages) =>
      !lastPage?.data?.length ? undefined : pages.length + 1,
    // !pages[pages?.length - 1]?.data?.length ? undefined : pages.length + 1,
    select: (data) => data?.pages,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <section className="mt-5">
      <div className="container-fluid">
        <div className="row w-100 g-0">
          {data?.length
            ? data.map((item, i) => (
                <Fragment key={i}>
                  {item?.data?.length
                    ? item.data.map((item) => (
                        <div
                          className="cart-item col-md-4 col px-4 mb-5"
                          key={item.id}
                        >
                          <Card {...item} readOnly={false} isAdmin={false} />
                        </div>
                      ))
                    : null}
                </Fragment>
              ))
            : null}
          {!data[0]?.data?.length ? <p>No data to show</p> : null}
        </div>
        <div>
          <button
            className="btn btn-primary ms-4"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            Load more
          </button>
        </div>
        {/* only show when first fetch */}
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
    </section>
  );
}

export default Cart;
