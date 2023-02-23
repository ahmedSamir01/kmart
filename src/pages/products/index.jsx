import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetcher } from "store/actions/productsActions";
import Card from "components/card";

function Products() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.products);

  useEffect(() => {
    dispatch(fetcher());
  }, []);

  return (
    <section className="mt-5">
      <div className="container-fluid">
        <div className="row w-100 g-0">
          {items?.length ? (
            items.map((item) => (
              <div className="cart-item col-md-4 col px-4 mb-5" key={item.id}>
                <Card {...item} />
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
