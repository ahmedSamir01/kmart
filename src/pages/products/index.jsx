import Card from "components/card";
import { useShopList } from "hooks/useShop";

function Products() {
  const { isLoading, data, isError, error } = useShopList();

  if (isLoading) {
    return <h2>loading...</h2>;
  }
  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  return (
    <section className="mt-5">
      <div className="container-fluid">
        <div className="row w-100 g-0">
          {data?.length ? (
            data.map((item) => (
              <div className="cart-item col-md-4 col px-4 mb-5" key={item.id}>
                <Card {...item} readOnly={true} isAdmin={false} />
              </div>
            ))
          ) : (
            <p>No data to show</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;
